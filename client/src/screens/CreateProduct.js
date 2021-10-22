import React, { useState } from 'react'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import { View, Box, Heading, Select, VStack, CheckIcon, Checkbox, Input, Text, Button } from 'native-base'
import groups from '../utils/groups'

export default (props) => {
  const [code, setCode] = useState(props.route.params.code)
  const [highlitedQuestion, setHighlitedQuestion] = useState([])
  const [uniqQuestion, setUniqQuestion] = useState('')

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>
        <Box>
          <Heading mb="10">Product Information</Heading>
        </Box>
        <Box>
          <Text>Image</Text>
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
