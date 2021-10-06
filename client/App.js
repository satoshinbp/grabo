import React, { useState } from 'react'
import * as Google from 'expo-google-app-auth'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import Tabs from './src/navigators/Tabs'
import Header from './src/components/Header'
import SignIn from './src/components/SignIn'
import { ANDROID_CLIENT_ID } from '@env'

export default () => {
  const [user, setUser] = useState({
    signedIn: false,
    name: '',
  })

  const signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: ANDROID_CLIENT_ID,
        // iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ['profile', 'email'],
      })

      if (result.type === 'success') {
        setUser({
          signedIn: true,
          name: result.user.name,
        })
        console.log(result.user)
        return result.accessToken
      } else {
        return { cancelled: true }
      }
    } catch (e) {
      return { error: true }
    }
  }

  return (
    <NativeBaseProvider>
      {/* <NavigationContainer theme={theme}> */}
      <NavigationContainer>
        <Header />
        {user.signedIn ? <Tabs user={user} /> : <SignIn signInWithGoogle={signInWithGoogle} />}
      </NavigationContainer>
    </NativeBaseProvider>
  )
}
