import { Card, Text } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import Masonry from 'react-masonry-css'
import useDarkMode from 'use-dark-mode'
import axios from '../../api/axios'
import { useMediaQuery } from '../../hooks'
import styles from './Styles.module.css'

const Home = () => {
  const { width } = useMediaQuery()
  const [photos, setPhotos] = useState<Array<Photo>>([])
  const { value } = useDarkMode()
  const [count, setCount] = useState(1)
  const breakpointColumnsObj = {
    default: 4,
    1100: 4,
    900: 3,
    700: 2
  }

  useEffect(() => {
    ;(async () => {
      if (count !== 1) return
      setCount(2)
      const {
        data: { results }
      } = await axios.get(`/search/photos?page=1&per_page=18&query=cats`)
      //   } = await axios.get('/photos/random?count=10')
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
    })()
  })

  return (
    <>
      <Text
        h1
        className={styles.H1}
        css={{
          position: 'sticky',
          backgroundImage: value
            ? 'linear-gradient( 45deg,pink,rgb(122, 151, 247), rgb(215, 147, 255),rgb(125, 170, 253),pink)'
            : 'linear-gradient( 45deg,pink,blue, rgb(215, 147, 255),blue,pink)',
          top: '20px',
          fontSize: width >= 600 ? '4.5rem' : '3rem'
        }}
      >
        Search For Awesome Photos
      </Text>
      <Masonry
        style={{
          backdropFilter: 'blur(10px)',
          transform: 'translateY(30px)'
          //   transform: 'scale(.8) translateY(-q00px)'
        }}
        breakpointCols={breakpointColumnsObj}
        className={styles.MasonryGrid}
        columnClassName={styles.MasonryGridColumn}
      >
        {photos.map((photo, index) => {
          return (
            <Card clickable cover key={index}>
              <Card.Image
                src={photo.src?.medium || ''}
                alt={photo.alt}
                width='100%'
                height='100%'
              />
            </Card>
          )
        })}
      </Masonry>
    </>
  )
}

export default Home
