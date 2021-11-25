import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Button, HStack, VStack, Text } from 'native-base'
import { useIsFocused } from '@react-navigation/native'
import { Camera } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import { addImage } from '../features/image'
import Loading from '../components/Loading'

export default () => {
  const isFocused = useIsFocused()

  const { loading: imageLoading, error } = useSelector((state) => state.image)
  const { loading: productLoading } = useSelector((state) => state.product)
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
    if (error) {
      alert(error)
    }
  }, [error])

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
      <Button
        position="absolute"
        top="4"
        right="4"
        width="84px"
        height="42px"
        backgroundColor="primary.500"
        shadow="2"
        flex={1}
        onPress={openImagePickerAsync}
      >
        Gallery
      </Button>
      <Button
        position="absolute"
        bottom="4"
        alignSelf="center"
        width="84px"
        height="84px"
        borderRadius="full"
        backgroundColor="primary.500"
        shadow="2"
        flex={1}
        isDisabled={!hasPermission}
        onPress={takePicture}
      ></Button>
    </>
  )

  if (!isFocused) return <View />
  if (imageLoading || productLoading) return <Loading />
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
