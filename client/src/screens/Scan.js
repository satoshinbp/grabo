import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Button, HStack, VStack, Text } from 'native-base'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { Camera } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import { addImage } from '../features/image'
import Loading from '../components/Loading'

export default () => {
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const { loading, status } = useSelector((state) => state.image)
  const dispatch = useDispatch()

  const cameraRef = useRef(null)
  const [hasPermission, setHasPermission] = useState(null)

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    }

    getPermission()
  }, [])

  useEffect(() => {
    if (status === 'fail') {
      alert('Failed. Please try another photo.')
    }
    if (status === 'success') {
      navigation.navigate('SelectLanguage')
    }
  }, [status])

  const takePicture = async () => {
    if (!cameraRef) return
    try {
      const { base64, uri } = await cameraRef.current.takePictureAsync({ base64: true })
      dispatch(addImage({ base64, uri }))
    } catch (e) {
      alert('Failed. Please try another photo.')
    }
  }

  const openImagePickerAsync = async () => {
    try {
      const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (!granted) {
        alert('Permission to access camera roll is required.')
        return
      }
      const { cancelled, base64, uri } = await ImagePicker.launchImageLibraryAsync({ base64: true })
      if (cancelled) return
      dispatch(addImage({ base64, uri }))
    } catch (e) {
      alert('Failed. Please try another photo.')
    }
  }

  const actionButtons = (
    <>
      <Button variant="gallery" flex={1} onPress={openImagePickerAsync}>
        Gallery
      </Button>
      <Button variant="scan" flex={1} isDisabled={!hasPermission} onPress={takePicture}>
        Snap
      </Button>
    </>
  )

  if (!isFocused) return <View />
  if (loading) return <Loading />
  if (!hasPermission) {
    return (
      <View variant="wrapper">
        <VStack justifyContent="flex-end" h="100%">
          {hasPermission === false && (
            <Text flex={1} my={2}>
              No access to camera
            </Text>
          )}
          {actionButtons}
        </VStack>
      </View>
    )
  }
  return (
    <Camera flex={1} ref={cameraRef}>
      <View variant="wrapper" justifyContent="flex-end">
        {actionButtons}
      </View>
    </Camera>
  )
}
