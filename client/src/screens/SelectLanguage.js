import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/core'
import { View, ScrollView, Box, Center, VStack, HStack, Heading, Text, Radio, Button, SunIcon } from 'native-base'
import { updateCode } from '../features/image'
import groups from '../utils/groups'

export default () => {
  const navigation = useNavigation()

  const image = useSelector((state) => state.image.value)
  const dispatch = useDispatch()

  const [isTextDetected, setIsTextDetected] = useState(false)
  const [code, setCode] = useState(image.code)

  useEffect(() => {
    groups.map((group) => {
      if (group.code === image.code) {
        setIsTextDetected(true)
      }
    })
  }, [image.code])

  return (
    <ScrollView variant="wrapper">
      <VStack variant="container">
        <View>
          <Heading size="md">{isTextDetected ? 'Text detected!' : 'Sorry! The language is not detectable!'}</Heading>
          <Text>
            {isTextDetected
              ? 'Press next button to continue or change language if you think the detected language is wrong.'
              : 'Create a new product by selecting a language that we currently support from the list below.'}
          </Text>
        </View>

        <Radio.Group name="Group" value={code} onChange={(value) => setCode(value)} flex={1}>
          {groups.map((group) => (
            <Box variant="listItemBarColored" alignSelf="stretch" key={group.code}>
              <HStack space={3} alignItems="center">
                <Center size={12} bg="primary.500" borderRadius="full">
                  <Text fontSize="md" bold>
                    {group.code}
                  </Text>
                </Center>
                <Text fontSize="md" bold>
                  {group.language}
                </Text>
                <Radio value={group.code} marginLeft="auto" accessibilityLabel={group.language} />
              </HStack>
            </Box>
          ))}
        </Radio.Group>

        <Button
          isDisabled={!code}
          onPress={() => {
            dispatch(updateCode(code))
            navigation.navigate('CreateProduct')
          }}
        >
          Next
        </Button>
      </VStack>
    </ScrollView>
  )
}
