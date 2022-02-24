import {
  Button,
  Container,
  Grid,
  Input,
  Loading,
  Switch
} from '@nextui-org/react'
import React from 'react'
import axios from '../../api/axios'
import { debounce } from '../../utils'
import Logo from '../../assets/img/Logo.svg'

interface HeaderProps {
  darkMode: boolean
  photos: Array<Photo>
  loading: boolean
  searchValue: string
  setSearchValue: (value: string) => void
  setLoading: (value: boolean) => void
  setPhotos: (value: Array<Photo>) => void
  setDarkMode: () => void
  setAlreadyRender: (value: boolean) => void
}

const Header = ({
  darkMode,
  photos,
  loading,
  searchValue,
  setDarkMode,
  setSearchValue,
  setPhotos,
  setLoading,
  setAlreadyRender
}: HeaderProps) => {
  const getPhotos = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchValue) return

    debounce(async () => {
      setPhotos([])
      setLoading(true)
      // const {
      //   data: { photos }
      // }: {
      //   data: {
      //     photos: Array<Photo>
      //   }(`/search?page=1&per_page=10&query=${searchValue}`)
      // } = await axios.get(`/search?page=1&per_page=10&query=${searchValue}`)
      // setPhotos(photos)

      const {
        data: { results }
      } = await axios.get(
        `/search/photos?page=1&per_page=18&query=${searchValue}`
      )

      const mappedData = results.map(
        (result: {
          id: string
          alt_description: string
          description: string
          color: string
          height: number
          width: number
          urls: {
            full: string
            raw: string
            regular: string
            small: string
            small_s3: string
            thumb: string
          }
          user: {
            name: string
            location: string
            profile_image: {
              large: string
              medium: string
              small: string
            }
          }
        }) => {
          return {
            description: result.description,
            location: result.user.location,
            name: result.user.name,
            // remove desription
            alt: result.alt_description,
            avg_color: result.color,
            height: result.height,
            id: result.id,
            liked: false,
            photographer: '',
            photographer_id: 0,
            photographer_url: result.user.profile_image.medium,
            src: {
              landscape: result.urls.raw,
              large: result.urls.full,
              large2x: '',
              medium: result.urls.small,
              original: '',
              portrait: '',
              small: '',
              tiny: ''
            },
            url: '',
            width: result.width
          }
        }
      )

      setAlreadyRender(true)
      setPhotos(mappedData)
      setLoading(false)
    }, 700)
  }

  return (
    <header>
      <Container>
        <Grid.Container
          justify='space-between'
          alignItems='center'
          css={{
            paddingTop: '50px',
            marginBottom: '20px'
          }}
        >
          <img
            src={Logo}
            alt='$#'
            style={{
              width: '50px'
            }}
          />
          <form
            onSubmit={(e) => getPhotos(e)}
            style={{
              width: 'calc(100% - 150px)'
            }}
          >
            <Input
              css={{
                width: '100%'
              }}
              shadow
              aria-label='Search Photos'
              size='xl'
              onChange={(e) => setSearchValue(e.target.value)}
              clearable
              status='primary'
              placeholder='search photos...'
              contentRight={
                loading ? (
                  <Loading size='xs' />
                ) : (
                  <Button
                    type='submit'
                    icon={<span className='material-icons'>search</span>}
                    css={{ padding: 4 }}
                    auto
                    flat
                  />
                )
              }
            />
          </form>
          <Switch
            checked={darkMode}
            size='xl'
            onChange={() => setDarkMode()}
            iconOn={<span className='material-icons'>dark_mode</span>}
            iconOff={<span className='material-icons'>light_mode</span>}
          />
        </Grid.Container>
      </Container>
    </header>
  )
}

export default Header
