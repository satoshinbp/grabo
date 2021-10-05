import React from 'react'
import { useRoute } from '@react-navigation/core'
import { View, VStack, Divider, Heading } from 'native-base'

export default () => {
  const route = useRoute()

  return (
    <View h="100%" flex={1} px={4} bg="#fff">
      <VStack alignItems="center" space={1} w="100%" h="100%" mt={4} divider={<Divider />}>
        <Heading>{`${route.params.title} Sub`}</Heading>
      </VStack>
    </View>
  )
}
