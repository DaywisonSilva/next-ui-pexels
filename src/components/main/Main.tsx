import { Card, Loading, useTheme } from '@nextui-org/react'
import Masonry from 'react-masonry-css'
import styles from './Main.module.css'

interface MainProps {
  photos: Array<Photo>
}

const Main = ({ photos }: MainProps) => {
  const { isDark } = useTheme()

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2
  }

  return (
    <main
      id='main'
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
              />
            </Card>
          )
        })}
      </Masonry>
      {!photos.length && (
        <div className={styles.overlay}>
          <Loading size='xl' />
        </div>
      )}
      <div className={styles.onlyScrollController} id='scrollController'></div>
    </main>
  )
}

export default Main
