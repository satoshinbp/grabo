import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Text, View, Button } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { Camera } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import { addImage, updateCode } from '../features/image'
import { sendImgToCloudVision } from '../api/product'

export default () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const cameraRef = useRef(null)
  const [hasPermission, setHasPermission] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    }

    getPermission()
  }, [])

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const { base64, uri } = await cameraRef.current.takePictureAsync({ base64: true })
        const { description, locale } = await sendImgToCloudVision(base64)

        dispatch(addImage({ text: description, imageUrl: uri }))
        dispatch(updateCode(locale))

        navigation.navigate('SelectLanguage')
      } catch (e) {
        alert('Failed. Please take it again.')
      }
    }
  }

  const openImagePickerAsync = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync()

      if (!permissionResult.granted) {
        alert('Permission to access camera roll is required!')
        return
      }

      const { cancelled, base64, uri } = await ImagePicker.launchImageLibraryAsync({ base64: true })
      if (cancelled) return
      const { description, locale } = await sendImgToCloudVision(base64)

      dispatch(addImage({ text: description, imageUrl: uri }))
      dispatch(updateCode(locale))
      setSelectedImage({ localUri: uri })

      navigation.navigate('SelectLanguage')
    } catch (e) {
      console.error(e)
      alert('please try another photo')
    }
  }

  if (!hasPermission) return <Text>No access to camera</Text>
  return (
    <View h="100%" flex={1} bg="#fff">
      <Camera flex={1} flexDirection="row" ref={cameraRef}>
        <Button flex={0.5} m={2.5} mb={7.5} alignSelf="flex-end" alignItems="center" onPress={takePicture}>
          Snap
        </Button>
        <Button flex={0.5} m={2.5} mb={7.5} alignSelf="flex-end" alignItems="center" onPress={openImagePickerAsync}>
          Pick a photo
        </Button>
      </Camera>
    </View>
  )
}
