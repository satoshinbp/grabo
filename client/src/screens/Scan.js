import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { View, Button, HStack } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { Camera } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import { addImage, updateCode } from '../features/image'
import { sendImgToCloudVision } from '../api/product'
import Loading from '../components/Loading'

export default () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const cameraRef = useRef(null)
  const [hasPermission, setHasPermission] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    }

    getPermission()
  }, [])

  const takePicture = async () => {
    if (!cameraRef) return

    try {
      const { base64, uri } = await cameraRef.current.takePictureAsync({ base64: true })

      setLoading(true)
      const { description, locale } = await sendImgToCloudVision(base64)
      setLoading(false)

      dispatch(addImage({ text: description, imageUrl: uri }))
      dispatch(updateCode(locale))

      navigation.navigate('SelectLanguage')
    } catch (e) {
      alert('Failed. Please take it again.')
      setLoading(false)
    }
  }

  const openImagePickerAsync = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (!permissionResult.granted) {
        alert('Permission to access camera roll is required.')
        return
      }

      const { cancelled, base64, uri } = await ImagePicker.launchImageLibraryAsync({ base64: true })
      if (cancelled) return

      setLoading(true)
      const { description, locale } = await sendImgToCloudVision(base64)
      setLoading(false)

      dispatch(addImage({ text: description, imageUrl: uri }))
      dispatch(updateCode(locale))

      navigation.navigate('SelectLanguage')
    } catch (e) {
      alert('Fialed. Please try another photo.')
      setLoading(false)
    }
  }

  if (loading) return <Loading />
  return (
    <View h="100%" flex={1} bg="#fff">
      <Camera flex={1} justifyContent="flex-end" alignItems="center" ref={cameraRef}>
        <HStack m={2} space={2}>
          <Button flex={1} isDisabled={!hasPermission} onPress={takePicture}>
            Snap
          </Button>
          <Button flex={1} onPress={openImagePickerAsync}>
            Gallery
          </Button>
        </HStack>
      </Camera>
    </View>
  )
}
