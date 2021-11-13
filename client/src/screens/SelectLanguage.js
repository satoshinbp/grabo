import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, VStack, Text, Radio, Button } from 'native-base'
import { updateCode } from '../features/image'
import groups from '../utils/groups'

export default (props) => {
  const { code } = useSelector((state) => state.image.value)
  const dispatch = useDispatch()

  const [isTextDetected, setIsTextDetected] = useState(false)

  useEffect(() => {
    groups.map((group) => {
      if (group.code === code) {
        setIsTextDetected(true)
      }
    })
  }, [])

  return (
    <View variant="wrapper">
      <VStack variant="container">
        <View>
          {isTextDetected ? (
            <>
              <Text fontSize="lg" bold>
                Text detected!
              </Text>
              <Text>Press next button to continue or change language if you think the detected language is wrong.</Text>
            </>
          ) : (
            <>
              <Text fontSize="lg" bold>
                Sorry! The language is not detectable!
              </Text>
              <Text>Create a new product by selecting a language that we currently support from the list below.</Text>
            </>
          )}
        </View>
        <View>
          <Radio.Group name="Group" value={code} onChange={(nextValue) => dispatch(updateCode(nextValue))}>
            {groups.map((group) => (
              <Radio value={group.code}>{group.language}</Radio>
            ))}
          </Radio.Group>
        </View>
        <View>
          <Button variant="primary" onPress={() => props.navigation.navigate('CreateProduct')}>
            Next
          </Button>
        </View>
      </VStack>
    </View>
  )
}
