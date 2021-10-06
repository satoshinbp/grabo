import React from 'react'
import { View, VStack, Button } from 'native-base'
import { connect } from 'react-redux'
import { signInWithGoogle } from '../actions/authActions'

const Login = ({ signInWithGoogle }) => (
  <View h="100%" flex={1} px={4} bg="#fff">
    <VStack alignItems="center" space={4} w="100%" h="100%" mt={4}>
      <Button onPress={signInWithGoogle} w="100%">
        Sign in with Google
      </Button>
    </VStack>
  </View>
)

const mapDispatchToProps = (dispatch) => ({
  signInWithGoogle: () => dispatch(signInWithGoogle()),
})

export default connect(undefined, mapDispatchToProps)(Login)
