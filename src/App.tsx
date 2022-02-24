import Header from './components/header/Header'
import { saveAs } from 'file-saver'
import { NextUIProvider } from '@nextui-org/react'
import { createTheme } from '@nextui-org/react'
import useDarkMode from 'use-dark-mode'
import { useState } from 'react'
import AppOverlay from './components/appOverlay/AppOverlay'
import Main from './components/main/Main'
import AppModal from './components/appModal/Modal'

const darkTheme = createTheme({
  type: 'dark'
})

const lightTheme = createTheme({
  type: 'light'
})

const App = () => {
  const darkMode = useDarkMode(false)
  const [photos, setPhotos] = useState<Array<Photo>>([])
  const [loading, setLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [currentImage, setCurrentImage] = useState<Photo>({})
  const [modalOpen, setModalOpen] = useState(false)
  const [download, setDownload] = useState(false)
  const [alreadyRender, setAlreadyRender] = useState(false)

  const downloadImage = async () => {
    setDownload(true)
    const image = await fetch(currentImage.src?.large || '')
    const imgBlob = await image.blob()
    const imgURL = URL.createObjectURL(imgBlob)
    saveAs(imgURL, currentImage.id?.toString())
    setDownload(false)
  }

  return (
    <>
      <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
        <Header
          darkMode={darkMode.value}
          setDarkMode={darkMode.toggle}
          photos={photos}
          loading={loading}
          searchValue={searchValue}
          setSearchValue={(value) => setSearchValue(value)}
          setLoading={(value) => setLoading(value)}
          setPhotos={(value) => setPhotos(value)}
          setAlreadyRender={(value) => setAlreadyRender(value)}
        />
        <Main
          photos={photos}
          loading={loading}
          searchValue={searchValue}
          alreadyRender={alreadyRender}
          setCurrentImage={(value) => setCurrentImage(value)}
          setModalOpen={(value) => setModalOpen(value)}
          setPhotos={(newValue) =>
            setPhotos((prevValue) => {
              return [...prevValue, ...newValue]
            })
          }
        />
        <AppOverlay darkMode={darkMode.value} />
        <AppModal
          currentImage={currentImage}
          download={download}
          downloadImage={downloadImage}
          modalOpen={modalOpen}
          setModalOpen={(value) => setModalOpen(value)}
        />
      </NextUIProvider>
    </>
  )
}

export default App
