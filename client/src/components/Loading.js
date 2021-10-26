import React from 'react'
import { Center, HStack, Heading, Spinner } from 'native-base'

export default () => (
  <Center mt={16}>
    <HStack space={2} alignItems="center">
      <Spinner accessibilityLabel="Loading" />
      <Heading color="primary.500" fontSize="md">
        Loading
      </Heading>
    </HStack>
  </Center>
)
