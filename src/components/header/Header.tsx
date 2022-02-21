import { Button, Container, Grid, Input, Switch } from '@nextui-org/react'
import { useEffect, useState } from 'react'
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

  useEffect(() => {
    if (!searchValue) return
    debounce(async () => {
      const {
        data: { photos }
      }: {
        data: {
          photos: Array<Photo>
        }
      } = await axios.get(`/search?page=1&per_page=10&query=${searchValue}`)
      setPhotos(photos)
    }, 700)
  }, [searchValue, setPhotos])

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
            labelPlaceholder='Search photos'
            contentRight={
              <Button
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
