import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'
import { View, VStack, Divider, Heading, Button } from 'native-base'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'

export default () => {
  const navigation = useNavigation()
  const [image, setImage] = useState(null)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const uploadImage = (files) => {
    let params = new FormData()
    params.append('image', { uri: image.replace('file://', ''), name: 'gazo.jpeg', type: 'image/jpeg' })
    axios
      .post('http://10.0.0.33:8000/api/image', params, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((result) => {
        console.log(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <View h="100%" flex={1} px={4} bg="#fff">
      <VStack alignItems="center" space={4} w="100%" h="100%" mt={4} divider={<Divider />}>
        <Heading>Image check!!</Heading>
        <Button onPress={() => navigation.navigate('Sub Scadddddreen', { title: 'Home' })} w="100%">
          Sub Screen
        </Button>
        <Button onPress={pickImage} w="100%">
          Choose pica
        </Button>
        <Button onPress={uploadImage} w="100%">
          upload
        </Button>
        <Image
          source={{ uri: 'https://grabo1.s3.amazonaws.com/1634460715953' }}
          // source={{ uri: image }}
          alt="image"
          style={{ width: 300, height: 300 }}
        />
      </VStack>
    </View>
  )
}
