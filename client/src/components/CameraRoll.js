import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import { sendImgToCloudVision } from '../utils/api'

export default (props) => {
  const [selectedImage, setSelectedImage] = useState(null)

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync()

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!')
      return
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({ base64: true })
    if (pickerResult.cancelled === true) {
      return
    }
    // console.log(pickerResult.base64)
    const newOcrText = await sendImgToCloudVision(pickerResult.base64)
    props.setOcrText(newOcrText.description)
    props.setLanguage(newOcrText.locale)
    setSelectedImage({ localUri: pickerResult.uri })
  }

  return (
    <Button style={styles.button} onPress={openImagePickerAsync}>
      Pick a photo
    </Button>
  )
}

const styles = StyleSheet.create({
  button: {
    flex: 0.5,
    margin: 10,
    marginBottom: 30,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
})
