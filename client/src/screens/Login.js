import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { TouchableOpacity } from 'react-native'
import { Center, Image, Heading, Text } from 'native-base'
import * as Google from 'expo-google-app-auth'
import { GOOGLE_ANDROID_CLIENT_ID, GOOGLE_IOS_CLIENT_ID } from '@env'
import { login } from '../features/auth'
import Loading from '../components/Loading'

export default () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

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
      } else {
        throw new Error('Google sign in was canceled')
      }
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }

  if (loading) return <Loading />
  return (
    <Center flex={1} px={4} bg="primary.500">
      <Heading mb={4}>Welcome to Grabo!</Heading>
      <TouchableOpacity activeOpacity={0.8} onPress={handleGoogleSignin}>
        <Image
          source={require('../assets/btn_google_signin_light_normal.png')}
          w="232px"
          resizeMode="contain"
          alt="sign in with google"
        />
      </TouchableOpacity>
    </Center>
  )
}
