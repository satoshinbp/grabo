import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { Button, Text, Spinner } from 'native-base'
import * as Google from 'expo-google-app-auth'
import { GOOGLE_ANDROID_CLIENT_ID, GOOGLE_IOS_CLIENT_ID } from '@env'
import { login } from '../features/user'

export default () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleGoogleSignin = async () => {
    setLoading(true)

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
        navigation.navigate('Groups')
      } else {
        setErrorMessage('Google sign in was canceled')
      }
    } catch (e) {
      console.log(e)
      setErrorMessage('An error occured. Check your network and try again')
    }
    setLoading(false)
  }

  return (
    <>
      {loading ? (
        <Button disabled w="100%">
          <Spinner />
        </Button>
      ) : (
        <Button onPress={handleGoogleSignin} w="100%">
          Sign in with Google
        </Button>
      )}
      {errorMessage ? <Text>{errorMessage}</Text> : null}
    </>
  )
}
