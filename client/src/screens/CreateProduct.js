import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import {
  View,
  ScrollView,
  Box,
  Center,
  VStack,
  HStack,
  CheckIcon,
  Checkbox,
  Input,
  Select,
  Heading,
  Text,
  Image,
  Button,
  AddIcon,
} from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import { updateCode, deleteImage, clearProduct } from '../features/image'
import { fetchUsersByGroup } from '../api/auth'
import { postImage, postProduct } from '../api/product'
import groups from '../utils/groups'
import fixedQuestions from '../utils/questions'

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

  const sendPushNotification = async (expoPushToken) => {
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
    try {
      await uploadImage()

      const params = {
        userId: user._id,
        code,
        url: imageUrl,
        text: ocrText,
        highlitedQuestions: highlitedQuestions,
        uniqQuestions: uniqQuestions,
      }

      const res = await postProduct(token, params)

      const fetchedUsers = await fetchUsersByGroup(token, code)
      const notificationTokens = await fetchedUsers.map((user) => user.notificationToken)
      notificationTokens.map((token) => sendPushNotification(token))

      dispatch(clearProduct())
      setHighlitedQuestions([])
      setUniqQuestions([])

      navigation.navigate('Scan')
      navigation.navigate('Product', { id: res.data._id })
    } catch (e) {
      cosole.error(e)
    }
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
          dispatch(clearProduct())
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
        <VStack variant="container">
          <Heading>Product Information</Heading>

          <View>
            <Text fontSize="lg" bold>
              Image
            </Text>
            <VStack alignItems="center" space={2}>
              {/* display selected image */}
              {imageUrl.length > 0 ? (
                imageUrl.map((image, index) => (
                  <Box key={image} position="relative" w="100px" h="100px">
                    <Image source={{ uri: image }} alt="picked image" w="100%" h="100%" borderRadius="lg" />
                    <Center
                      position="absolute"
                      top={1}
                      right={1}
                      w="30px"
                      h="30px"
                      borderRadius="full"
                      bg="primary.500"
                    >
                      <MaterialIcons name="delete" size={18} color="black" onPress={() => onImageRemove(index)} />
                    </Center>
                  </Box>
                ))
              ) : (
                <Text>At lease one picture is required.</Text>
              )}
              <Button onPress={addImage}>{imageUrl.length > 0 ? 'Take another pircute' : 'Take a picture'}</Button>
            </VStack>
            {/* leave this comment */}
            {/* example of fetched image from S3 */}
            {/* <Image
              source={{ uri: 'https://grabo1.s3.amazonaws.com/1634460715953' }}
              alt="image"
              style={{ width: 300, height: 300 }}
            /> */}
          </View>

          <View>
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
          </View>

          <View>
            <Text fontSize="lg" bold>
              Choose which default questions to highlight
            </Text>
            <Checkbox.Group onChange={setHighlitedQuestions} value={highlitedQuestions}>
              {fixedQuestions.map((question, index) => (
                <Checkbox value={index}>{question}</Checkbox>
              ))}
            </Checkbox.Group>
          </View>

          <View>
            <Text fontSize="lg" bold>
              Ask your own question
            </Text>
            <VStack space={2} alignItems="center">
              {uniqQuestions.map((uniqQuestion, index) => (
                <HStack key={index} alignItems="center" space={2}>
                  <Input
                    placeholder="Write your own question here"
                    blurOnSubmit={true}
                    returnKeyType="done"
                    onSubmitEditing={() => Keyboard.dismiss()}
                    value={uniqQuestion}
                    onChangeText={(e) => handleChange(index, e)}
                    flex={1}
                    alignItems="center"
                  />
                  <MaterialIcons name="delete" size={18} color="black" onPress={() => removeFormFields(index)} />
                </HStack>
              ))}
              <Center w="36px" h="36px" borderRadius="full" bg="primary.500">
                <AddIcon size="4" onPress={addFormFields} />
              </Center>
            </VStack>
          </View>

          <Button variant="primary" onPress={onCancel}>
            Cancel
          </Button>

          <Button variant="primary" isDisabled={imageUrl.length === 0} onPress={handleSubmit}>
            Create a Product
          </Button>
        </VStack>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}
