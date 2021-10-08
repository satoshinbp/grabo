import React from 'react'
import { View, VStack, Button, Link } from 'native-base'
import { useDispatch } from 'react-redux'
import { startLogin } from '../actions/userActions'
import { API_URL } from '@env'

export default () => {
  const dispatch = useDispatch()

  return (
    <View h="100%" flex={1} px={4} bg="#fff">
      <VStack alignItems="center" space={4} w="100%" h="100%" mt={4}>
        <Link mt={4} href={`${API_URL}/auth/google`}>
          Sign in with Google
        </Link>
        {/* <Button onPress={dispatch(startLogin())} w="100%">
          Sign in with Google
        </Button> */}
      </VStack>
    </View>
  )
}
