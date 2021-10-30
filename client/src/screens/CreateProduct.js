import React, { useState } from 'react'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import {
  View,
  Box,
  Heading,
  Select,
  VStack,
  CheckIcon,
  Checkbox,
  Input,
  Text,
  Button,
  Image,
  ScrollView,
} from 'native-base'
import { postImage, postProduct } from '../utils/api'
import groups from '../utils/groups'
import fixedQuestions from '../utils/questions'
import { updateCode } from '../features/image'

// =========    Please leave this sheets comments as a reference ==========================

export default (props) => {
  const dispatch = useDispatch()
  const image = useSelector((state) => state.image)
  // const [, setImage] = useState(props.route.params.imageUrl)
  const code = image.value.code
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
      setImage(result.uri.replace('file://', ''))
    }
  }

  const uploadImage = async () => {
    const params = new FormData()
    // params.append('image', { uri: image, name: 'uploadedImage.jpeg', type: 'image/jpeg' })
    params.append('image', { uri: image.imageUrl, name: 'uploadedImage.jpeg', type: 'image/jpeg' })
    const res = await postImage(params)
  }

  const handleSubmit = async () => {
    // const params = {
    //   group: code,
    //   // keywords: [image.ocrText],
    //   keywords: image.ocrText,
    //   // userId, // userId shall be provided once autheintication gets ready
    //   images: [
    //     {
    //       url: image.imageUrl,
    //       report: { wrong: 0, affiliate: 0, threats: 0, privacy: 0 },
    //     },
    //   ],
    //   fixedQandAs: fixedQuestions.map((question, index) => ({
    //     question: {
    //       description: question,
    //       report: { wrong: 0, affiliate: 0, threats: 0, privacy: 0 },
    //     },
    //     answers: [],
    //     highlightedBy: highlitedQuestion.includes(index) ? [] : [], // replace first empty array with real userId once autheintication gets ready [userId]
    //   })),
    //   uniqQandAs: [
    //     {
    //       question: {
    //         userId: null, // userId shall be provided once autheintication gets ready
    //         description: uniqQuestion || 'this is test description',
    //         report: { wrong: 0, affiliate: 0, threats: 0, privacy: 0 },
    //       },
    //       answers: [],
    //       highlightedBy: uniqQuestion ? [] : [], // replace first empty array with real userId later [userId]
    //     },
    //   ],
    // }

    const params = {
      code: image.value.code,
      url: image.value.imageUrl,
      text: image.value.ocrText,
      highlitedQuestion: highlitedQuestion,
      uniqQuestion: uniqQuestion,
    }

    const res = await postProduct(params)
  }

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <Box>
            <Heading mb="10">Product Information1</Heading>
          </Box>
          <Box>
            <Text>Image</Text>
            <Button onPress={pickImage} w="100%">
              Choose pic
            </Button>
            <Button onPress={uploadImage} w="100%">
              upload
            </Button>
            <Button onPress={() => props.navigation.navigate('Scan', {})}>Camera</Button>
            {/* display selected image */}
            {image.value.imageUrl
              ? image.value.imageUrl.map((image) => (
                  <Image source={{ uri: image }} alt="picked image" style={{ width: 100, height: 100 }} />
                ))
              : null}
            {/* leave this comment */}
            {/* example of fetched image from S3 */}
            {/* <Image
            source={{ uri: 'https://grabo1.s3.amazonaws.com/1634460715953' }}
            alt="image"
            style={{ width: 300, height: 300 }}
          /> */}
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
                onValueChange={(nextValue) => dispatch(updateCode(nextValue))}
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
                {fixedQuestions.map((question, index) => (
                  <Checkbox value={index}>{question}</Checkbox>
                ))}
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
          <Button onPress={handleSubmit}>Create a Product</Button>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}
