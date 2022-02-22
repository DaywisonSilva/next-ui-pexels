import { Button, Container, Grid, Input, Switch } from '@nextui-org/react'
import { useState } from 'react'
import axios from '../../api/axios'
import { debounce } from '../../utils'
import Logo from '../../assets/img/Logo.svg'

interface HeaderProps {
  darkMode: boolean
  photos: Array<Photo>
  setPhotos: (value: Array<Photo>) => void
  setDarkMode: () => void
}

const Header = ({ darkMode, setDarkMode, photos, setPhotos }: HeaderProps) => {
  const [searchValue, setSearchValue] = useState('')

  const getPhotos = () => {
    if (!searchValue) return

    debounce(async () => {
      setPhotos([])
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
        }) => {
          return {
            alt: result.alt_description,
            avg_color: result.color,
            height: result.height,
            id: result.id,
            liked: false,
            photographer: '',
            photographer_id: 0,
            photographer_url: '',
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

      setPhotos(mappedData)
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
          <Input
            css={{
              width: 'calc(100% - 150px)'
            }}
            shadow
            size='xl'
            onChange={(e) => setSearchValue(e.target.value)}
            clearable
            status='primary'
            placeholder='search photos...'
            contentRight={
              <Button
                onClick={getPhotos}
                icon={<span className='material-icons'>search</span>}
                css={{ padding: 4 }}
                auto
                flat
              />
            }
          />
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
