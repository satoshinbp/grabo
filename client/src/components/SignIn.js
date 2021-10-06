import React from 'react'
import { View, Button } from 'native-base'

export default ({ signInWithGoogle }) => {
  return (
    <View mt={24}>
      <Button onPress={() => signInWithGoogle()}>Sign in with Google</Button>
    </View>
  )
}
