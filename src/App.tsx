import Header from './components/header/Header'
import { NextUIProvider, Pagination } from '@nextui-org/react'
import { createTheme } from '@nextui-org/react'
import useDarkMode from 'use-dark-mode'
import { useState } from 'react'
import { PaginationContext } from './context'
import AppPagination from './components/appPagination/AppPagination'
import Main from './components/main/Main'

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
          <AppPagination darkMode={darkMode.value} />
        </PaginationContext.Provider>
      </NextUIProvider>
    </>
  )
}

export default App
