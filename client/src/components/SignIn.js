import React from 'react'
import { View, VStack, Button } from 'native-base'

export default ({ signInWithGoogle }) => {
  return (
    <View h="100%" flex={1} px={4} bg="#fff">
      <VStack alignItems="center" space={4} w="100%" h="100%" mt={4}>
        <Button onPress={() => signInWithGoogle()} w="100%">
          Sign in with Google
        </Button>
      </VStack>
    </View>
  )
}
