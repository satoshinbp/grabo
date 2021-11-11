import React, { useState, useEffect } from 'react'
import { TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import { MaterialIcons } from '@expo/vector-icons'
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
  AddIcon,
  CloseIcon,
} from 'native-base'
import { postImage, postProduct } from '../api/product'
import groups from '../utils/groups'
import fixedQuestions from '../utils/questions'
import { updateCode, deleteImage, deleteProduct } from '../features/image'
import { fetchUsersByGroup } from '../api/auth'

// =========    Please leave this sheets comments as a reference ==========================

export default (props) => {
  const dispatch = useDispatch()
  const image = useSelector((state) => state.image)
  const { token, user } = useSelector((state) => state.auth)
  // const [, setImage] = useState(props.route.params.imageUrl)
  const code = image.value.code
  const [highlitedQuestions, setHighlitedQuestions] = useState([])
  const [uniqQuestions, setUniqQuestions] = useState([])

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
    params.append('image', { uri: image.value.imageUrl[0], name: 'uploadedImage.jpeg', type: 'image/jpeg' })
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

  const handleSubmit = async () => {
    const params = {
      userId: user._id,
      code: image.value.code,
      url: image.value.imageUrl,
      text: image.value.ocrText,
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
    props.navigation.navigate('Scan', {})
    props.navigation.navigate('Product', { id: res.data._id })
    dispatch(deleteProduct())
    setHighlitedQuestions([])
    setUniqQuestions([])
  }

  const onImageRemove = (index) => {
    dispatch(deleteImage({ index: index }))
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
          props.navigation.navigate('Scan', {})
        },
      },
    ])

  const onCancel = () => {
    deleteAlert()
  }

  const addImage = () => {
    if (image.value.imageUrl.length >= 3) {
      alert('You can upload up to 3 images')
    } else {
      props.navigation.navigate('Scan', {})
    }
  }

  const handleChange = (i, text) => {
    const newUniqQuestions = [...uniqQuestions]
    newUniqQuestions[i] = text
    setUniqQuestions(newUniqQuestions)
  }

  const addFormFields = () => {
    setUniqQuestions([...uniqQuestions, ''])
  }

  const removeFormFields = (i) => {
    const newUniqQuestions = [...uniqQuestions]
    newUniqQuestions.splice(i, 1)
    setUniqQuestions(newUniqQuestions)
  }

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <Box>
            <Heading mb="10">Product Information</Heading>
          </Box>
          <Box>
            <Text>Image</Text>
            <Button onPress={addImage}>Add Image </Button>
            {/* display selected image */}

            {image.value.imageUrl
              ? image.value.imageUrl.map((image, index) => (
                  <Box key={image}>
                    <Image source={{ uri: image }} alt="picked image" style={{ width: 100, height: 100 }} />
                    <MaterialIcons name="delete" size={24} color="black" onPress={() => onImageRemove(index)} />
                  </Box>
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
              <Checkbox.Group onChange={setHighlitedQuestions} value={highlitedQuestions}>
                {fixedQuestions.map((question, index) => (
                  <Checkbox value={index}>{question}</Checkbox>
                ))}
              </Checkbox.Group>
            </VStack>
          </Box>
          <Box>
            <Text>Ask your own question</Text>
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

                {index ? <CloseIcon size="4" onPress={() => removeFormFields(index)} /> : null}
              </Box>
            ))}
            <AddIcon size="4" onPress={addFormFields} />,
          </Box>
          <Button onPress={onCancel}>Cancel</Button>
          <Button onPress={handleSubmit}>Create a Product</Button>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}
