import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { StyleSheet } from 'react-native'
import { Text, View, Button } from 'native-base'
import { Camera } from 'expo-camera'
import CameraRoll from '../components/CameraRoll'
import { sendImgToCloudVision } from '../utils/api'
import { setOcrText, setImageUrl, setCode } from '../features/image'

export default (props) => {
  const [hasPermission, setHasPermission] = useState(null)
  // const [ocrText, setOcrText] = useState('')
  // const [language, setLanguage] = useState('')
  // const [imageUrl, setImageUrl] = useState('')
  const cameraRef = useRef(null)
  const dispatch = useDispatch()

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
        // setImageUrl(photo.uri)
        // setOcrText(newOcrText.description)
        dispatch(setOcrText(newOcrText.description))
        dispatch(setImageUrl(photo.uri))
        dispatch(setCode(newOcrText.locale))
        // setLanguage(newOcrText.locale)
        props.navigation.navigate('SelectLanguage', {
          // code: newOcrText.locale,
          // text: newOcrText.description,
          // imageUrl: photo.uri,
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
        <CameraRoll
          navigation={props.navigation}
          // text={ocrText}
          // setOcrText={setOcrText}
          // setLanguage={setLanguage}
          // imageUrl={imageUrl}
          // setImageUrl={setImageUrl}
        />
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
