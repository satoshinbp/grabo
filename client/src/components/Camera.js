import React, { useState, useEffect, useRef } from 'react'
import { Camera } from 'expo-camera'
import { StyleSheet } from 'react-native'
import { Text, View, Button } from 'native-base'

export default () => {
  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [ocrText, setOcrText] = useState('')
  const cameraRef = useRef(null)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const takePicture = async () => {
    if (cameraRef) {
      console.log(cameraRef)

      const photo = await cameraRef.current.takePictureAsync({ base64: true })
      console.log('Photo URI: ', photo.uri)
      const newOcrText = await sendImgToCloudVision(photo.base64)
      setOcrText(newOcrText)
    }
  }

  if (hasPermission === null) return <View />
  if (hasPermission === false) return <Text>No access to camera</Text>
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
