import Header from './components/header/Header'
import { saveAs } from 'file-saver'
import {
  Button,
  Card,
  Col,
  Loading,
  Modal,
  NextUIProvider,
  Row,
  Text
} from '@nextui-org/react'
import { createTheme } from '@nextui-org/react'
import useDarkMode from 'use-dark-mode'
import { useState } from 'react'
import AppOverlay from './components/appOverlay/AppOverlay'
import Main from './components/main/Main'

const darkTheme = createTheme({
  type: 'dark'
})

const lightTheme = createTheme({
  type: 'light'
})

const App = () => {
  const darkMode = useDarkMode(false)
  const [photos, setPhotos] = useState<Array<Photo>>([])
  const [loading, setLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [currentImage, setCurrentImage] = useState<Photo>({})
  const [modalOpen, setModalOpen] = useState(false)
  const [download, setDownload] = useState(false)

  const downloadImage = async () => {
    setDownload(true)
    const image = await fetch(currentImage.src?.large || '')
    const imgBlob = await image.blob()
    const imgURL = URL.createObjectURL(imgBlob)
    saveAs(imgURL, currentImage.id?.toString())
    setDownload(false)
  }

  return (
    <>
      <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
        <Header
          darkMode={darkMode.value}
          setDarkMode={darkMode.toggle}
          photos={photos}
          loading={loading}
          searchValue={searchValue}
          setSearchValue={(value) => setSearchValue(value)}
          setLoading={(value) => setLoading(value)}
          setPhotos={(value) => setPhotos(value)}
        />
        <Main
          photos={photos}
          loading={loading}
          searchValue={searchValue}
          setCurrentImage={(value) => setCurrentImage(value)}
          setModalOpen={(value) => setModalOpen(value)}
          setPhotos={(newValue) =>
            setPhotos((prevValue) => {
              return [...prevValue, ...newValue]
            })
          }
        />
        <AppOverlay darkMode={darkMode.value} />
        <Modal
          closeButton
          onClose={() => setModalOpen(false)}
          aria-labelledby='modal-title'
          blur
          noPadding
          style={{
            padding: 0
          }}
          open={modalOpen}
        >
          <Modal.Body
            css={{
              overflow: 'visible'
            }}
          >
            <Card
              cover
              css={{ position: 'relative', margin: 0, maxHeight: '90vh' }}
            >
              <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
                <Col>
                  <Text
                    size={12}
                    weight='bold'
                    transform='uppercase'
                    color='#ffffffAA'
                    css={{
                      textShadow: '1px 1px 2px #00000026'
                    }}
                  >
                    {currentImage.alt}
                  </Text>
                  <Text
                    h4
                    color='white'
                    css={{
                      textShadow: '1px 1px 2px #00000026'
                    }}
                  >
                    {currentImage.description}
                  </Text>
                </Col>
              </Card.Header>
              <Card.Image
                src={currentImage.src?.medium || ''}
                alt={currentImage.alt}
                width='100%'
                height='100%'
              />
              <Card.Footer
                blur
                css={{
                  position: 'absolute',
                  bgBlur: '#0f1114',
                  borderTop: '$borderWeights$light solid $gray700',
                  bottom: 0,
                  zIndex: 1
                }}
              >
                <Row>
                  <Col>
                    <Row>
                      <Col span={3}>
                        <Card.Image
                          src={currentImage.photographer_url || ''}
                          css={{ background: 'black' }}
                          height={40}
                          width={40}
                          alt='Breathing app icon'
                        />
                      </Col>
                      <Col css={{ paddingLeft: '5px' }}>
                        <Text color='#d1d1d1' size={12}>
                          {currentImage.name}
                        </Text>
                        <Text color='#d1d1d1' size={12}>
                          {currentImage.location}
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row justify='flex-end'>
                      <Button
                        flat
                        auto
                        rounded
                        css={{ color: '$primary' }}
                        onClick={downloadImage}
                      >
                        {download ? (
                          <Loading size='sm' color='white' />
                        ) : (
                          <Text
                            css={{ color: 'inherit' }}
                            size={12}
                            weight='bold'
                            transform='uppercase'
                          >
                            Download
                          </Text>
                        )}
                      </Button>
                    </Row>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
          </Modal.Body>
        </Modal>
      </NextUIProvider>
    </>
  )
}

export default App
