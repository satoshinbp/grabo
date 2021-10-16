import React, { useState } from 'react'
import { Radio, Center, NativeBaseProvider, Box, Heading, Text } from 'native-base'
import groups from '../utils/groups'

export const LanguageGroups = () => {
  const [value, setValue] = useState('')

  return (
    <Radio.Group
      name="Group"
      value={value}
      onChange={(nextValue) => {
        setValue(nextValue)
      }}
    >
      {groups.map((language) => (
        <Radio value={language.code}>{language.language}</Radio>
      ))}
    </Radio.Group>
  )
}

export default () => {
  return (
    <>
      <Box>
        <Heading>Select Language</Heading>
        <Text>Create a new product by selecting a language from the list below</Text>
      </Box>
      <NativeBaseProvider>
        <Center flex={1} px="3">
          <LanguageGroups />
        </Center>
      </NativeBaseProvider>
    </>
  )
}
