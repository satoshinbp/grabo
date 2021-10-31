import React from 'react'
import { useDispatch } from 'react-redux'
import { Center, Button } from 'native-base'
import * as Google from 'expo-google-app-auth'
import { GOOGLE_ANDROID_CLIENT_ID, GOOGLE_IOS_CLIENT_ID } from '@env'
import { login } from '../features/auth'

export default () => {
  const dispatch = useDispatch()

  const handleGoogleSignin = async () => {
    const config = {
      androidClientId: GOOGLE_ANDROID_CLIENT_ID,
      iosClientId: GOOGLE_IOS_CLIENT_ID,
      scopes: ['profile', 'email'],
    }

    try {
      const result = await Google.logInAsync(config)
      const { type, idToken } = result

      if (type === 'success') {
        dispatch(login(idToken))
      } else {
        throw new Error('Google sign in was canceled')
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Center flex={1} px="4">
      <Button onPress={handleGoogleSignin} w="100%">
        Sign in with Google
      </Button>
    </Center>
  )
}
