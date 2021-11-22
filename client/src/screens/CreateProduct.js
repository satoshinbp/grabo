import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
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
import { MaterialIcons } from '@expo/vector-icons'
import { updateCode, deleteImage, clearImage } from '../features/image'
import { createProduct } from '../features/product'
import groups from '../utils/groups'
import fixedQuestions from '../utils/questions'
import Loading from '../components/Loading'

export default () => {
  const navigation = useNavigation()

  const { token, user } = useSelector((state) => state.auth)
  const { texts, uris, code } = useSelector((state) => state.image.value)
  const { loading } = useSelector((state) => state.product)
  const dispatch = useDispatch()

  const [highlitedQuestions, setHighlitedQuestions] = useState([])
  const [uniqQuestions, setUniqQuestions] = useState([])

  const openCamera = () => {
    if (uris.length >= 3) {
      alert('You can upload up to 3 images')
    } else {
      navigation.navigate('Scan')
    }
  }

  const addQuestion = () => setUniqQuestions([...uniqQuestions, ''])
  const changeQuestion = (index, text) => setUniqQuestions(uniqQuestions.map((q, i) => (i === index ? text : q)))
  const removeQuestion = (index) => setUniqQuestions(uniqQuestions.filter((_, i) => i !== index))

  const cancelProduct = () =>
    Alert.alert('Alert', 'Are you sure to cancel posting this product?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'OK',
        onPress: () => {
          dispatch(clearImage())
          setHighlitedQuestions([])
          setUniqQuestions([])
          navigation.navigate('Scan')
        },
      },
    ])

  const submitProduct = async () => {
    try {
      const params = {
        userId: user._id,
        code,
        url: uris,
        text: texts,
        highlitedQuestions,
        uniqQuestions,
      }

      dispatch(createProduct({ token, params }))
      setHighlitedQuestions([])
      setUniqQuestions([])
      navigation.navigate('Scan')
    } catch (e) {
      cosole.error(e)
    }
  }

  // FormContorl might be useful rather thatn Box, to be considered
  if (loading) return <Loading />
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
              {uris.length > 0 ? (
                <HStack space={2}>
                  {uris.map((uri, index) => (
                    <Box key={uri} position="relative" w="100px" h="100px">
                      <Image source={{ uri }} alt="picked image" w="100%" h="100%" borderRadius="lg" />
                      <Center
                        position="absolute"
                        top={1}
                        right={1}
                        w="30px"
                        h="30px"
                        borderRadius="full"
                        bg="primary.500"
                      >
                        <MaterialIcons
                          name="delete"
                          size={18}
                          color="black"
                          onPress={() => dispatch(deleteImage({ index }))}
                        />
                      </Center>
                    </Box>
                  ))}
                </HStack>
              ) : (
                <Text>At lease one picture is required.</Text>
              )}
              <Button onPress={openCamera}>{uris.length > 0 ? 'Take another picture' : 'Take a picture'}</Button>
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
            <Text fontSize="md" bold>
              Language
            </Text>
            <Select
              marginLeft="2"
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
            <Text fontSize="md" bold>
              Choose which default questions to highlight
            </Text>
            <Checkbox.Group marginLeft="2" onChange={setHighlitedQuestions} value={highlitedQuestions}>
              {fixedQuestions.map((question, index) => (
                <Checkbox value={index}>{question}</Checkbox>
              ))}
            </Checkbox.Group>
          </View>

          <View>
            <Text fontSize="md" bold>
              Ask your own question
            </Text>
            <VStack marginLeft="2" space={2} alignItems="center">
              {uniqQuestions.map((uniqQuestion, index) => (
                <HStack key={index} alignItems="center" space={2}>
                  <Input
                    placeholder="Write your own question here"
                    blurOnSubmit={true}
                    returnKeyType="done"
                    onSubmitEditing={() => Keyboard.dismiss()}
                    value={uniqQuestion}
                    onChangeText={(e) => changeQuestion(index, e)}
                    flex={1}
                    alignItems="center"
                  />
                  <MaterialIcons name="delete" size={18} color="black" onPress={() => removeQuestion(index)} />
                </HStack>
              ))}
              <Center w="36px" h="36px" borderRadius="full" bg="primary.500" my="2">
                <AddIcon size="4" onPress={addQuestion} />
              </Center>
            </VStack>
          </View>

          <Button variant="primary" isDisabled={uris.length === 0} onPress={submitProduct}>
            Create a Product
          </Button>
          <Button variant="primary" bg="white" onPress={cancelProduct}>
            Cancel
          </Button>
        </VStack>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}
