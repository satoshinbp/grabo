import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, Radio, Button, SunIcon, Heading, Box, HStack, Center, ScrollView } from 'native-base'
import { updateCode } from '../features/image'
import groups from '../utils/groups'
import Loading from '../components/Loading'

export default (props) => {
  const { value, loading } = useSelector((state) => state.image)
  const { code } = value
  const dispatch = useDispatch()

  const [isTextDetected, setIsTextDetected] = useState(false)

  useEffect(() => {
    groups.map((group) => {
      if (group.code === code) {
        setIsTextDetected(true)
      }
    })
  }, [])

  if (loading) return <Loading />
  return (
    <ScrollView variant="wrapper">
      <Heading size="sm" my={2}>
        {isTextDetected ? (
          <>
            <Text fontSize="lg" bold>
              Text detected!{'\n'}
            </Text>
            <Text>Press next button to continue or change language if you think the detected language is wrong.</Text>
          </>
        ) : (
          <>
            <Text fontSize="lg" bold>
              Sorry! The language is not detectable!{'\n'}
            </Text>
            <Text>Create a new product by selecting a language that we currently support from the list below.</Text>
          </>
        )}
      </Heading>

      <View>
        <Radio.Group name="Group" value={code} onChange={(newCode) => dispatch(updateCode(newCode))} flex={1}>
          {groups.map((group) => (
            <Box variant="listItemBarColored" alignSelf="stretch">
              <HStack space={3} alignItems="center">
                <Center size={12} bg="primary.500" borderRadius="full">
                  <SunIcon size={8} />
                </Center>
                <Text fontSize="md" bold>
                  {group.language}
                </Text>
                <Radio value={group.code} marginLeft="auto"></Radio>
              </HStack>
            </Box>
          ))}
        </Radio.Group>
        <Button variant="primary" onPress={() => props.navigation.navigate('CreateProduct')}>
          Next
        </Button>
      </View>
    </ScrollView>
  )
}
