import React, { useState } from 'react'
import { Center, Box, Heading, Text } from 'native-base'
import LanguageGroups from '../components/LanguageGroups'

export default () => {
  return (
    <>
      <Box>
        <Heading>Select Language</Heading>
        <Text>Create a new product by selecting a language from the list below</Text>
      </Box>
      <Center flex={1} px="3">
        <LanguageGroups />
      </Center>
    </>
  )
}
