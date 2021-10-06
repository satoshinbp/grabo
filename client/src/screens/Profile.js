import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, VStack, Divider, Heading, Button } from 'native-base'
import Logout from '../components/Logout'

export default () => {
  const navigation = useNavigation()

  return (
    <View h="100%" flex={1} px={4} bg="#fff">
      <VStack alignItems="center" space={4} w="100%" h="100%" mt={4} divider={<Divider />}>
        <Heading>Profile</Heading>
        <Logout />
        <Button onPress={() => navigation.navigate('Sub Screen', { title: 'Profile' })} w="100%">
          Sub Screen
        </Button>
      </VStack>
    </View>
  )
}
