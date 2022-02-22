import styles from './AppOverlay.module.css'

interface AppPaginationProps {
  darkMode: boolean
}

const Overlay = ({ darkMode }: AppPaginationProps) => {
  return (
    <div
      className={
        darkMode
          ? `${styles.overlay} ${styles.overlayDark}`
          : `${styles.overlay} ${styles.overlayLight}`
      }
    ></div>
  )
}

export default Overlay
