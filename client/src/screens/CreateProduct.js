import React, { useState } from 'react'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { View, Box, Heading, Select, VStack, CheckIcon, Checkbox, Input, Text, Button, Image } from 'native-base'
import { postImage } from '../utils/api'
import groups from '../utils/groups'

export default (props) => {
  const [image, setImage] = useState(null)
  const [code, setCode] = useState(props.route.params.code)
  const [highlitedQuestion, setHighlitedQuestion] = useState([])
  const [uniqQuestion, setUniqQuestion] = useState('')

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const uploadImage = async () => {
    const params = new FormData()
    params.append('image', { uri: image.replace('file://', ''), name: 'uploadedImage.jpeg', type: 'image/jpeg' })
    const res = await postImage(params)
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>
        <Box>
          <Heading mb="10">Product Information</Heading>
        </Box>
        <Box>
          <Text>Image</Text>
          <Button onPress={pickImage} w="100%">
            Choose pic
          </Button>
          <Button onPress={uploadImage} w="100%">
            upload
          </Button>
          {/* display selected image */}
          <Image source={{ uri: image }} alt="image" style={{ width: 300, height: 300 }} />
          {/* example of fetched image from S3 */}
          <Image
            source={{ uri: 'https://grabo1.s3.amazonaws.com/1634460715953' }}
            alt="image"
            style={{ width: 300, height: 300 }}
          />
        </Box>
        <Box>
          <Text>Language</Text>
          <VStack mb="10" space={4}>
            <Select
              selectedValue={code}
              minWidth="200"
              placeholder="Choose Language"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => setCode(itemValue)}
            >
              {groups.map((group) => (
                <Select.Item value={group.code} label={group.language} />
              ))}
            </Select>
          </VStack>
        </Box>
        <Box>
          <Text>Choose which default questions to highlight</Text>
          <VStack mb="10" space={4}>
            <Checkbox.Group onChange={setHighlitedQuestion} value={highlitedQuestion}>
              <Checkbox value={0}>What is the name of this product?</Checkbox>
              <Checkbox value={1}>Who is the maker of this product?</Checkbox>
              <Checkbox value={2}>What is the taste of this product?</Checkbox>
              <Checkbox value={3}>What is this product used for?</Checkbox>
              <Checkbox value={4}>Please review this product.</Checkbox>
            </Checkbox.Group>
          </VStack>
        </Box>
        <Box>
          <Text>Ask your own question</Text>
          <Input
            mb="10"
            placeholder="Write your own question here"
            blurOnSubmit={true}
            returnKeyType="done"
            onSubmitEditing={() => {
              Keyboard.dismiss()
            }}
            alignItems="center"
            value={uniqQuestion}
            onChangeText={(text) => setUniqQuestion(text)}
          />
        </Box>
        <Button>Create a Product</Button>
      </View>
    </TouchableWithoutFeedback>
  )
}
