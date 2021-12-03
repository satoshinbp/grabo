import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Animated, Dimensions } from 'react-native'
import { View, Box, Center, Button, HStack, VStack, Text, Pressable } from 'native-base'
import { useIsFocused } from '@react-navigation/native'
import { Camera } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import { addImage } from '../features/image'
import Loading from '../components/Loading'
import GalleryIcon from '../assets/icons/Gallery'

const windowWidth = Dimensions.get('window').width

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
    <HStack w="100%" px={8} justifyContent="space-between" alignItems="center">
      <Box w="36px" h="36px" />
      <Button
        isDisabled={!hasPermission}
        onPress={takePicture}
        width="62px"
        height="62px"
        borderRadius="full"
        bg="white"
        shadow={2}
        alignSelf="center"
        _pressed={{
          bg: `muted.200`,
        }}
      >
        <Box w="52px" h="52px" borderWidth="2px" borderColor="primary.500" borderRadius="full" />
      </Button>
      <Pressable
        variant="icon"
        borderWidth="1.5px"
        shadow={2}
        bg="white"
        borderColor="primary.500"
        onPress={openImagePickerAsync}
      >
        <Center size="8">
          <GalleryIcon width="36px" />
        </Center>
      </Pressable>
    </HStack>
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
    <VStack variant="container" flex={1} justifyContent="space-between" alignItems="center" my={12}>
      <Camera ref={cameraRef} ratio="1:1" width={windowWidth} height={windowWidth} alignSelf="center" />
      {actionButtons}
    </VStack>
  )
}
