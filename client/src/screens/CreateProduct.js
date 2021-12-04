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
  FormControl,
  Pressable,
} from 'native-base'
import TrashIcon from '../assets/icons/Trash'
import { updateCode, deleteImage, clearImage } from '../features/image'
import { createProduct } from '../features/product'
import groups from '../utils/groups'
import fixedQuestions from '../utils/questions'

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

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <VStack flex={1} space={3} m={3} px={3} py={3} bg="white" borderRadius="md" shadow={2}>
          <Heading size="md">Product Information</Heading>

          <View>
            <Text fontSize="md" bold mb={4}>
              Image
            </Text>
            <VStack alignItems="center" space={2}>
              {uris.length > 0 ? (
                <HStack space={2}>
                  {uris.map((uri, index) => (
                    <Box key={uri} position="relative" w="100px" h="100px">
                      <Image source={{ uri }} alt="picked image" w="100%" h="100%" borderRadius="lg" />
                      <Button
                        position="absolute"
                        top={1}
                        right={1}
                        padding={0.5}
                        borderRadius="full"
                        bg="white"
                        _pressed={{
                          bg: `muted.300`,
                        }}
                        onPress={() => dispatch(deleteImage({ index }))}
                      >
                        <Center size={6}>
                          <TrashIcon width="20px" />
                        </Center>
                      </Button>
                    </Box>
                  ))}
                </HStack>
              ) : (
                <Text>At lease one picture is required.</Text>
              )}
              {uris.length > 3 && <Text color="error.500"> Pick up 3 images.</Text>}
              <Button onPress={openCamera}>Add Image</Button>
            </VStack>
            {/* leave this comment */}
            {/* example of fetched image from S3 */}
            {/* <Image
              source={{ uri: 'https://grabo1.s3.amazonaws.com/1634460715953' }}
              alt="image"
              style={{ width: 300, height: 300 }}
            /> */}
          </View>

          <FormControl>
            <FormControl.Label _text={{ fontSize: 'md', fontWeight: 'bold' }}>Language</FormControl.Label>
            <Select
              placeholder="Choose Language"
              selectedValue={code}
              onValueChange={(nextValue) => dispatch(updateCode(nextValue))}
              minWidth="200px"
              mt={1}
              ml={2}
              _selectedItem={{
                bg: 'primary.500',
                endIcon: <CheckIcon size="5" color="black" />,
                _text: {
                  color: 'black',
                },
              }}
            >
              {groups.map((group) => (
                <Select.Item value={group.code} label={group.language} />
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormControl.Label _text={{ fontSize: 'md', fontWeight: 'bold' }}>
              Choose which default questions to highlight
            </FormControl.Label>
            <Checkbox.Group ml={2} onChange={setHighlitedQuestions} value={highlitedQuestions}>
              {fixedQuestions.map((question, index) => (
                <Checkbox color="primary.500" value={index}>
                  {question}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </FormControl>

          <FormControl>
            <FormControl.Label _text={{ fontSize: 'md', fontWeight: 'bold' }}>Ask your own question</FormControl.Label>
            <VStack marginLeft={2} space={2} alignItems="center">
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

                  <Pressable variant="icon" bg="transparent" onPress={() => removeQuestion(index)}>
                    <TrashIcon width="24px" />
                  </Pressable>
                </HStack>
              ))}
              <Center w="36px" h="36px" borderRadius="full" bg="primary.500" my={2}>
                <AddIcon size={4} onPress={addQuestion} />
              </Center>
            </VStack>
          </FormControl>

          <Button.Group w="100%" direction="column" space={2}>
            <Button
              isDisabled={uris.length === 0 || uris.length > 3}
              onPress={submitProduct}
              size="fixed"
              alignSelf="center"
            >
              Submit
            </Button>
            <Button
              variant="outline"
              onPress={cancelProduct}
              _text={{ color: 'black' }}
              size="fixed"
              alignSelf="center"
            >
              Cancel
            </Button>
          </Button.Group>
        </VStack>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}
