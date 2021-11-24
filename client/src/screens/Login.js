import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { TouchableOpacity, ImageBackground } from 'react-native'
import { View, VStack, Image, Heading, Text } from 'native-base'
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
    <ImageBackground
      source={require('../assets/images/splash.png')}
      resizeMode="cover"
      style={{ width: '100%', height: '100%', backgroundColor: '#E5E5E5' }}
    >
      <VStack flex={1} justifyContent="space-between" alignItems="center" py={20}>
        <Heading>Welcome to</Heading>
        <View>
          <Text fontSize="2xl" textAlign="center" bold>
            Let's sign in
          </Text>
          <TouchableOpacity activeOpacity={0.8} onPress={handleGoogleSignin}>
            <Image
              source={require('../assets/images/btn_google_signin_light_normal.png')}
              w="232px"
              resizeMode="contain"
              alt="sign in with google"
            />
          </TouchableOpacity>
        </View>
      </VStack>
    </ImageBackground>
  )
}
