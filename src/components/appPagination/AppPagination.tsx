import { Container, Pagination } from '@nextui-org/react'
// import { useContext } from 'react'
// import { PaginationContext } from '../../context'
import { useMediaQuery } from '../../hooks'
import './Styles.css'

interface AppPaginationProps {
  darkMode: boolean
}

const AppPagination = ({ darkMode }: AppPaginationProps) => {
  const screen = useMediaQuery()
  // const AppPaginationContext = useContext(PaginationContext)

  return (
    <>
      <Container
        justify='center'
        display='flex'
        css={{
          position: 'fixed',
          bottom: '20px',
          left: '$10'
        }}
      >
        <div
          className={
            darkMode ? 'overlay overlay--dark' : 'overlay overlay--light'
          }
        ></div>
        <Pagination
          shadow
          total={10}
          initialPage={3}
          loop
          size={screen.width > 600 ? 'lg' : 'sm'}
        />
      </Container>
    </>
  )
}

export default AppPagination
