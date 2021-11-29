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
    <>
      <Pressable position="absolute" bottom={4} right={4} onPress={openImagePickerAsync}>
        <Center
          width="48px"
          height="48px"
          borderRadius="full"
          bg="primary.500"
          _pressed={{
            bg: 'primary.700',
          }}
        >
          <GalleryIcon width="48px" />
        </Center>
      </Pressable>

      <Button
        isDisabled={!hasPermission}
        onPress={takePicture}
        position="absolute"
        bottom={4}
        width="84px"
        height="84px"
        borderRadius="full"
        bg="white"
        shadow={2}
        alignSelf="center"
        _pressed={{
          bg: `muted.200`,
        }}
      >
        <Box w="68px" h="68px" borderWidth="4px" borderColor="primary.500" borderRadius="full" />
      </Button>
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
    <View flex={1} pt={12}>
      <Camera ref={cameraRef} ratio="1:1" width={windowWidth * 0.96} height={windowWidth * 0.96} alignSelf="center" />
      {actionButtons}
    </View>
  )
}
