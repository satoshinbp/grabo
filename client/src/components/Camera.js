import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native'
import { Text, View, Button } from 'native-base'
import { Camera } from 'expo-camera'
import { REACT_APP_VISION_API_KEY } from '@env'

const MyCamera = () => {
  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [ocrText, setOcrText] = useState('')
  const cameraRef = useRef(null)

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  const takePicture = async () => {
    if (cameraRef) {
      const options = { base64: true }
      let photo = await cameraRef.current.takePictureAsync(options)
      console.log(photo.uri)
      // send data to cloudVision
      sendCloudVision(photo.base64)
    }
  }

  const sendCloudVision = async (image) => {
    const body = JSON.stringify({
      requests: [
        {
          features: [{ type: 'TEXT_DETECTION', maxResults: 1 }],
          image: {
            content: image,
          },
          imageContext: {
            languageHints: ['ja', 'ko', 'fr', 'zh', 'hi', 'pa', 'uk', 'fa'],
          },
        },
      ],
    })
    const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${REACT_APP_VISION_API_KEY}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: body,
    })
    const resJson = await response.json()
    console.log(resJson.responses[0].textAnnotations[0])

    setOcrText(resJson.responses[0].textAnnotations[0].description)
  }

  return (
    <View h="100%" flex={1} bg="#fff">
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <Button style={styles.button} onPress={takePicture}>
          Snap
        </Button>
        <Button
          style={styles.button}
          onPress={() => {
            setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)
          }}
        >
          Flip
        </Button>
      </Camera>
    </View>
  )
}
const styles = StyleSheet.create({
  camera: {
    flex: 1,
    flexDirection: 'row',
  },

  button: {
    flex: 0.5,
    margin: 10,
    marginBottom: 30,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
})

export default MyCamera
