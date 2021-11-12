import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Box, Text, Radio, Button } from 'native-base'
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
      <Box variant="container">
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
      </Box>
      <Box variant="container">
        <Radio.Group name="Group" value={code} onChange={(nextValue) => dispatch(updateCode(nextValue))}>
          {groups.map((group) => (
            <Radio value={group.code}>{group.language}</Radio>
          ))}
        </Radio.Group>
      </Box>
      <Box variant="container">
        <Button variant="primary" onPress={() => props.navigation.navigate('CreateProduct')}>
          Next
        </Button>
      </Box>
    </View>
  )
}
