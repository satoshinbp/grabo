import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import {
  View,
  ScrollView,
  Box,
  VStack,
  CheckIcon,
  Checkbox,
  Input,
  Select,
  Heading,
  Text,
  Image,
  Button,
  AddIcon,
  CloseIcon,
} from 'native-base'
import { updateCode, deleteImage, deleteProduct } from '../features/image'
import { postImage, postProduct } from '../api/product'
import groups from '../utils/groups'
import fixedQuestions from '../utils/questions'
import { fetchUsersByGroup } from '../api/auth'

// ========== Please leave comments as a reference ========== //
export default () => {
  const { token, user } = useSelector((state) => state.auth)
  const { code, imageUrl, ocrText } = useSelector((state) => state.image.value)
  const dispatch = useDispatch()

  const navigation = useNavigation()

  // const [, setImage] = useState(props.route.params.imageUrl)
  const [highlitedQuestions, setHighlitedQuestions] = useState([])
  const [uniqQuestions, setUniqQuestions] = useState([])

  const uploadImage = async () => {
    const params = new FormData()
    params.append('image', { uri: imageUrl[0], name: 'uploadedImage.jpeg', type: 'image/jpeg' })
    const res = await postImage(token, params)
  }

  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Help',
      body: 'Someone need your help!',
      data: { someData: 'goes here' },
    }

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
  }

  const onCancel = () => deleteAlert()

  const handleSubmit = async () => {
    const params = {
      userId: user._id,
      code,
      url: imageUrl,
      text: ocrText,
      highlitedQuestions: highlitedQuestions,
      uniqQuestions: uniqQuestions,
    }

    uploadImage()
    const res = await postProduct(token, params)
    const fetchUsers = await fetchUsersByGroup(token, image.value.code)
    // const fetch = await fetchUser(token)
    // console.log(fetchUsers)
    const notificationTokens = await fetchUsers.map((user) => user.notificationToken)
    // console.log(notificationTokens)
    notificationTokens.map((token) => sendPushNotification(token))
    navigation.navigate('Product', { id: res.data._id })
    dispatch(deleteProduct())
    setHighlitedQuestions([])
    setUniqQuestions([])
  }

  const deleteAlert = () =>
    Alert.alert('Alert', 'Are you sure to delete this product', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          dispatch(deleteProduct())
          setHighlitedQuestions([])
          setUniqQuestion('')
          navigation.navigate('Scan')
        },
      },
    ])

  const addImage = () => {
    if (imageUrl.length >= 3) {
      alert('You can upload up to 3 images')
    } else {
      navigation.navigate('Scan')
    }
  }
  const onImageRemove = (index) => dispatch(deleteImage({ index }))

  const handleChange = (i, text) => {
    const newUniqQuestions = [...uniqQuestions]
    newUniqQuestions[i] = text
    setUniqQuestions(newUniqQuestions)
  }

  const addFormFields = () => setUniqQuestions([...uniqQuestions, ''])

  const removeFormFields = (i) => {
    const newUniqQuestions = [...uniqQuestions]
    newUniqQuestions.splice(i, 1)
    setUniqQuestions(newUniqQuestions)
  }

  // Icon position to be fixed
  // FormContorl might be useful rather thatn Box, to be considered
  return (
    <ScrollView variant="wrapper">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <VStack space={2} my={2}>
          <Heading>Product Information</Heading>

          <Box>
            <Text fontSize="lg" bold>
              Image
            </Text>
            <VStack alignItems="center" space={2}>
              {/* display selected image */}
              {imageUrl.length > 0 &&
                imageUrl.map((image, index) => (
                  <Box key={image} position="relative" w="100px" h="100px">
                    <Image source={{ uri: image }} alt="picked image" w="100%" h="100%" borderRadius="lg" />
                    <MaterialIcons
                      name="delete"
                      size={24}
                      color="black"
                      position="absolute"
                      top={2}
                      right={2}
                      onPress={() => onImageRemove(index)}
                    />
                  </Box>
                ))}
              <Button onPress={addImage}>Take another picture</Button>
            </VStack>
            {/* leave this comment */}
            {/* example of fetched image from S3 */}
            {/* <Image
              source={{ uri: 'https://grabo1.s3.amazonaws.com/1634460715953' }}
              alt="image"
              style={{ width: 300, height: 300 }}
            /> */}
          </Box>

          <Box>
            <Text fontSize="lg" bold>
              Language
            </Text>
            <Select
              selectedValue={code}
              minWidth="200px"
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
          </Box>

          <Box>
            <Text fontSize="lg" bold>
              Choose which default questions to highlight
            </Text>
            <Checkbox.Group onChange={setHighlitedQuestions} value={highlitedQuestions}>
              {fixedQuestions.map((question, index) => (
                <Checkbox value={index}>{question}</Checkbox>
              ))}
            </Checkbox.Group>
          </Box>

          <Box>
            <Text fontSize="lg" bold>
              Ask your own question
            </Text>
            {uniqQuestions.map((uniqQuestion, index) => (
              <Box key={index}>
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
                  onChangeText={(e) => handleChange(index, e)}
                />

                {index && <CloseIcon size={4} onPress={() => removeFormFields(index)} />}
              </Box>
            ))}
            <AddIcon size="4" onPress={addFormFields} />
          </Box>

          <Button variant="primary" onPress={onCancel}>
            Cancel
          </Button>

          <Button variant="primary" onPress={handleSubmit}>
            Create a Product
          </Button>
        </VStack>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}
