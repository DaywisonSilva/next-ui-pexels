import { Card, Container, Grid } from '@nextui-org/react'

interface MainProps {
  photos: Array<Photo>
}

const Main = ({ photos }: MainProps) => {
  return (
    <main>
      <Container>
        <Grid.Container gap={1} css={{ marginBottom: '$20' }}>
          {photos.map((photo) => {
            return (
              <Grid xs={6} sm={4} key={photo.id}>
                <Card cover clickable>
                  <Card.Image
                    showSkeleton
                    src={photo.src?.medium || ''}
                    width='100%'
                    height={'100%'}
                  />
                </Card>
              </Grid>
            )
          })}
        </Grid.Container>
      </Container>
    </main>
  )
}

export default Main
