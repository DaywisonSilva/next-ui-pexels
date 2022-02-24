import { Container, Loading } from '@nextui-org/react'
import React, { useCallback, useEffect, useState } from 'react'
import axios from '../../api/axios'
import { useMediaQuery } from '../../hooks'
import { debounce } from '../../utils'
interface ScrollObserverProps {
  mainRef: React.RefObject<HTMLElement>
  searchValue: string
  setPhotos: (value: Array<Photo>) => void
}

const ScrollObserver = ({
  searchValue,
  setPhotos,
  mainRef
}: ScrollObserverProps) => {
  const [show, setShow] = useState(false)
  const [page, setPage] = useState(2)
  const { width } = useMediaQuery()

  useEffect(() => {
    setPage(2)
    setPhotos([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  const getData = useCallback(() => {
    debounce(async () => {
      setShow(true)

      if (
        (mainRef.current?.scrollTop || 0) / (page - 1) >=
        (width <= 600 ? 800 : 1500)
      ) {
        setPage((prevPage) => {
          return prevPage + 1
        })
        const {
          data: { results }
        } = await axios.get(
          `/search/photos?page=${page}&per_page=18&query=${searchValue}`
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

        setPhotos(mappedData)
      }
      setShow(false)
    }, 200)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, page])

  useEffect(() => {
    mainRef.current?.addEventListener('scroll', getData)

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mainRef.current?.removeEventListener('scroll', getData)
    }
  }, [getData, mainRef])

  return (
    <Container
      onClick={getData}
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

export default ScrollObserver
