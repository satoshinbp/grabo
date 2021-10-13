import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, VStack, Divider, Heading, Text, Button } from 'native-base'
import products from '../mocks/products' // mock data to be removed once backend is ready

export default () => {
  const dispatch = useDispatch()

  return (
    <View h="100%" flex={1} px={4} bg="#fff">
      <VStack alignItems="center" space={4} w="100%" h="100%" mt={4} divider={<Divider />}>
        <Heading>Groups</Heading>
      </VStack>
    </View>
  )
}
