import Header from './components/header/Header'
import { NextUIProvider } from '@nextui-org/react'
import { createTheme } from '@nextui-org/react'
import useDarkMode from 'use-dark-mode'
import { useState } from 'react'
import { PaginationContext } from './context'
import AppOverlay from './components/appOverlay/AppOverlay'
import Main from './components/main/Main'
import ScrollController from './components/scrollController/ScrollController'

const darkTheme = createTheme({
  type: 'dark'
})

const lightTheme = createTheme({
  type: 'light'
})

const App = () => {
  const darkMode = useDarkMode(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [photos, setPhotos] = useState<Array<Photo>>([])

  return (
    <>
      <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
        <PaginationContext.Provider
          value={{
            currentPage,
            setCurrentPage: (value) => setCurrentPage(value)
          }}
        >
          <Header
            darkMode={darkMode.value}
            setDarkMode={darkMode.toggle}
            photos={photos}
            setPhotos={(value) => setPhotos(value)}
          />
          <Main photos={photos} />
          <AppOverlay darkMode={darkMode.value} />
          <ScrollController
            photos={photos}
            setPhotos={(newValue) =>
              setPhotos((prevValue) => {
                return [...prevValue, ...newValue]
              })
            }
          />
        </PaginationContext.Provider>
      </NextUIProvider>
    </>
  )
}

export default App
