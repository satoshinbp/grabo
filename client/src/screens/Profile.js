import React from 'react'
import { useSelector } from 'react-redux'
import { View, VStack, Divider, Heading, Text } from 'native-base'
import Login from '../components/Login'
import Logout from '../components/Logout'

export default () => {
  const user = useSelector((state) => state.user.value)

  return (
    <View h="100%" flex={1} px={4} bg="#fff">
      <VStack alignItems="center" space={4} w="100%" h="100%" mt={4} divider={<Divider />}>
        <Heading>Profile</Heading>
        <Text>Name: {user.name}</Text>
        <Login />
        <Logout />
      </VStack>
    </View>
  )
}
