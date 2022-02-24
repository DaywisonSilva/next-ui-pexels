import { Card, Text } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import Masonry from 'react-masonry-css'
import axios from '../../api/axios'
import { useMediaQuery } from '../../hooks'
import styles from './Styles.module.css'

const Home = () => {
  const { width } = useMediaQuery()
  const [photos, setPhotos] = useState<Array<Photo>>([])
  const breakpointColumnsObj = {
    default: 4,
    1100: 4,
    900: 3,
    700: 2
  }

  useEffect(() => {
    ;(async () => {
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
        css={{
          position: 'sticky',
          top: '20px',
          textGradient: `45deg, $blue500 ${
            width >= 600 ? '-5%' : '10%'
          }, $pink500 50%`,
          fontSize: width >= 600 ? '4rem' : '3rem',
          textAlign: 'center'
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
