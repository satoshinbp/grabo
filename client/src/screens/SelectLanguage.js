import React, { useState } from 'react'
import { Center, Box, Heading, Text } from 'native-base'
import LanguageGroups from '../components/LanguageGroups'

export default (props) => {
  const [isTextDetected, setIsTextDetected] = useState(false)
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
        <LanguageGroups
          code={props.route.params.code}
          text={props.route.params.text}
          setIsTextDetected={setIsTextDetected}
        />
      </Center>
    </>
  )
}
