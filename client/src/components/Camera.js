import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native'
import { Text, View, Button } from 'native-base'
import { Camera } from 'expo-camera'
import CameraRoll from '../components/CameraRoll'
import { sendImgToCloudVision } from '../utils/api'

export default (props) => {
  const [hasPermission, setHasPermission] = useState(null)
  const [ocrText, setOcrText] = useState('')
  const [language, setLanguage] = useState('')
  const cameraRef = useRef(null)

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true })
      console.log('Photo URI: ', photo.uri)

      try {
        const newOcrText = await sendImgToCloudVision(photo.base64)
        setOcrText(newOcrText.description)
        setLanguage(newOcrText.locale)
        props.navigation.navigate('SelectLanguage', {
          code: newOcrText.locale,
          text: newOcrText.description,
        })
      } catch (e) {
        alert('Failed. Please take it again')
      }
    }
  }

  if (hasPermission === null) return <View />
  if (hasPermission === false) return <Text>No access to camera</Text>
  return (
    <View h="100%" flex={1} bg="#fff">
      <Camera style={styles.camera} ref={cameraRef}>
        <Button style={styles.button} onPress={takePicture}>
          Snap
        </Button>
        <CameraRoll navigation={props.navigation} text={ocrText} setOcrText={setOcrText} setLanguage={setLanguage} />
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
