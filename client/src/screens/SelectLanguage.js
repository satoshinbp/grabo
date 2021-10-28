import React, { useState, useEffect } from 'react'
import { Center, Box, Heading, Text, Radio, Button } from 'native-base'
import groups from '../utils/groups'
import { useSelector, useDispatch } from 'react-redux'
import { setCode } from '../features/image'

export default (props) => {
  const dispatch = useDispatch()
  const [isTextDetected, setIsTextDetected] = useState(false)
  const image = useSelector((state) => state.image)
  const value = image.code
  // console.log(image)

  useEffect(() => {
    groups.map((group) => {
      if (group.code === image.code) {
        setIsTextDetected(true)
      }
    })
  }, [])

  return (
    <>
      <Box>
        <Heading>Select Language</Heading>
        {isTextDetected ? (
          <>
            <Text>Text detected!</Text>
            <Text>Press create a product button</Text>
          </>
        ) : (
          <>
            <Text>Sorry! The language is not detectable!</Text>
            <Text>Create a new product by selecting a language from the list below</Text>
          </>
        )}
      </Box>

      <Center flex={1} px="3">
        <Radio.Group name="Group" value={value} onChange={(nextValue) => dispatch(setCode(nextValue))}>
          {groups.map((group) => (
            <Radio value={group.code}>{group.language}</Radio>
          ))}
        </Radio.Group>
        <Button
          onPress={() =>
            props.navigation.navigate('CreateProduct', {
              // code: value,
              // text: props.route.params.text,
              // imageUrl: props.route.params.imageUrl,
            })
          }
        >
          Create a Product
        </Button>
      </Center>
    </>
  )
}
