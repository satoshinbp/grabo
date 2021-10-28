import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { StyleSheet } from 'react-native'
import { Button } from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import { sendImgToCloudVision } from '../utils/api'
import { setOcrText, setImageUrl, setCode } from '../features/image'

export default (props) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const dispatch = useDispatch()

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
    try {
      const newOcrText = await sendImgToCloudVision(pickerResult.base64)
      // props.setImageUrl(pickerResult.uri)
      // props.setOcrText(newOcrText.description)
      dispatch(setOcrText(newOcrText.description))
      dispatch(setImageUrl(pickerResult.uri))
      dispatch(setCode(newOcrText.locale))
      // props.setLanguage(newOcrText.locale)
      setSelectedImage({ localUri: pickerResult.uri })
      props.navigation.navigate('SelectLanguage', {
        // code: newOcrText.locale,
        // text: newOcrText.description,
        // imageUrl: pickerResult.uri,
      })
    } catch (e) {
      alert('please try another photo')
    }
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
