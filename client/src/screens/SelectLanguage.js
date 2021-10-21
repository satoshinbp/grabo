import React, { useState, useEffect } from 'react'
import { Center, Box, Heading, Text, Radio } from 'native-base'
import groups from '../utils/groups'

export default (props) => {
  const [isTextDetected, setIsTextDetected] = useState(false)
  const [value, setValue] = useState(props.route.params.code)

  useEffect(() => {
    groups.map((group) => {
      if (group.code === props.route.params.code) {
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
        <Radio.Group name="Group" value={value} onChange={(nextValue) => setValue(nextValue)}>
          {groups.map((group) => (
            <Radio value={group.code}>{group.language}</Radio>
          ))}
        </Radio.Group>
      </Center>
    </>
  )
}
