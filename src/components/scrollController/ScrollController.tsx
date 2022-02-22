import { Container, Loading } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import axios from '../../api/axios'
import { debounce } from '../../utils'

interface ScrollControllerProps {
  setPhotos: (value: Array<Photo>) => void
  photos: Array<Photo>
}

const ScrollController = ({ photos, setPhotos }: ScrollControllerProps) => {
  const [show, setShow] = useState(false)
  let mainRef = null as unknown as HTMLElement
  let page = 2
  const getData = () => {
    debounce(async () => {
      setShow(true)

      if (mainRef.scrollTop / (page - 1) >= 700) {
        const {
          data: { results }
        } = await axios.get(`/search/photos?page=${page}&per_page=9&query=cats`)

        page++

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
      }
      setShow(false)
    }, 200)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    mainRef = document.getElementById('main') as unknown as HTMLElement
    mainRef.addEventListener('scroll', getData)

    return () => {
      mainRef.removeEventListener('scroll', getData)
    }
  }, [])

  return (
    <Container
      css={{
        position: 'fixed',
        bottom: 20,
        left: 0,
        width: '100vw',
        maxWidth: '100vw'
      }}
      display='flex'
      justify='center'
    >
      {show && <Loading type='points' size='xl' />}
    </Container>
  )
}

export default ScrollController
