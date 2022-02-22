import { Button, Card, Loading, useTheme } from '@nextui-org/react'
import { useRef } from 'react'
import Masonry from 'react-masonry-css'
import ScrollObserver from '../scrollObserver/ScrollObserver'
import styles from './Main.module.css'

interface MainProps {
  searchValue: string
  photos: Array<Photo>
  loading: boolean
  setModalOpen: (value: boolean) => void
  setCurrentImage: (value: Photo) => void
  setPhotos: (value: Array<Photo>) => void
}

const Main = ({
  photos,
  loading,
  searchValue,
  setModalOpen,
  setCurrentImage,
  setPhotos
}: MainProps) => {
  const { isDark } = useTheme()
  const refMain = useRef<HTMLElement>(null)

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2
  }

  return (
    <main
      ref={refMain}
      className={
        isDark
          ? `${styles.main} ${styles.scrollbarDark}`
          : `${styles.main} ${styles.scrollbarLight}`
      }
    >
      <Masonry
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
                onClick={() => {
                  setModalOpen(true)
                  setCurrentImage(photo)
                }}
              />
            </Card>
          )
        })}
      </Masonry>
      {loading && (
        <div className={styles.overlay}>
          <Loading size='xl' />
        </div>
      )}
      <div className={styles.onlyScrollController} id='scrollController'></div>
      <ScrollObserver
        mainRef={refMain}
        searchValue={searchValue}
        setPhotos={(value) => setPhotos(value)}
      />
    </main>
  )
}

export default Main
