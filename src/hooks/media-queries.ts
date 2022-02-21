import { useEffect, useState } from 'react'
import { debounce } from '../utils'

const useMediaQuery = () => {
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  const getSizeScreen = () => {
    debounce(() => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }, 500)
  }

  useEffect(() => {
    window.addEventListener('resize', getSizeScreen)

    return () => {
      window.removeEventListener('resize', getSizeScreen)
    }
  }, [])

  return {
    width,
    height
  }
}

export default useMediaQuery
