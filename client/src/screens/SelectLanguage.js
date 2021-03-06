import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/core'
import { View, ScrollView, Box, Center, VStack, HStack, Heading, Text, Radio, Button } from 'native-base'
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
    setCode(image.code)
  }, [image.code])

  return (
    <ScrollView>
      <View variant="wrapper">
        <VStack variant="container">
          <Heading size="md">{isTextDetected ? 'Text detected!' : 'Sorry! The language is not detectable!'}</Heading>
          <Text>
            {isTextDetected
              ? 'Press next button to continue or change language if you think the detected language is wrong.'
              : 'Create a new product by selecting a language that grabo currently support from the list below.'}
          </Text>

          <Radio.Group name="Group" value={code} onChange={(value) => setCode(value)} flex={1}>
            {groups.map((group) => (
              <Box variant="listItemBar" borderLeftWidth="10px" alignSelf="stretch" key={group.code}>
                <HStack space={3} alignItems="center">
                  <Center size={12} bg="primary.500" borderRadius="full">
                    <Text fontSize="xl" bold>
                      {group.code}
                    </Text>
                  </Center>
                  <Text fontSize="md" textAlign="center" bold>
                    {group.language}
                  </Text>
                  <Radio value={group.code} ml="auto" accessibilityLabel={group.language} />
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
            size="fixed"
            alignSelf="center"
          >
            Next
          </Button>
        </VStack>
      </View>
    </ScrollView>
  )
}
