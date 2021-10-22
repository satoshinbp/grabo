import React, { useState } from 'react'
import { Box, View, VStack, Divider, Image, Button, Heading } from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import { postImage } from '../utils/api'

export default () => {
  const [image, setImage] = useState('')

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setImage(result.uri.replace('file://', ''))
    }
  }

  const uploadImage = async () => {
    const params = new FormData()
    params.append('image', { uri: image, name: 'uploadedImage.jpeg', type: 'image/jpeg' })
    const res = await postImage(params)
  }

  return (
    <View h="100%" flex={1} px={4} bg="#fff">
      <Box>
        <Heading>My Products</Heading>
      </Box>
      <VStack alignItems="center" space={4} w="100%" h="100%" mt={4} divider={<Divider />}>
        <Button onPress={pickImage} w="100%">
          Choose pic
        </Button>
        <Button onPress={uploadImage} w="100%">
          upload
        </Button>
        {/* display selected image */}
        {image ? <Image source={{ uri: image }} alt="picked image" style={{ width: 300, height: 300 }} /> : null}
        {/* example of fetched image from S3 */}
        <Image
          source={{ uri: 'https://grabo1.s3.amazonaws.com/1634460715953' }}
          alt="image"
          style={{ width: 300, height: 300 }}
        />
      </VStack>
    </View>
  )
}
