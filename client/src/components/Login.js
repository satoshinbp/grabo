import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Text, Spinner } from 'native-base'
import { signInWithGoogle } from '../features/user'
import { useNavigation } from '@react-navigation/native'

import * as Google from 'expo-google-app-auth'

export default () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  // const user = {
  //   googleId: '',
  //   name: 'John Doe',
  //   image: [],
  //   groups: ['ja', 'hi'],
  //   _id: '6172435c2b4fc5a8bcd3e349',
  // }

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleGoogleSignin = async () => {
    setLoading(true)
    const config = {
      iosClientId: '810909098640-2gkbdnctuv2ao9sicv7e5o9pi4ctq5jj.apps.googleusercontent.com',
      androidClientId: '810909098640-tr2kvtsq69m9r7lnvn8go7hbcddq842e.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    }

    try {
      const result = await Google.logInAsync(config)
      const { type, user } = result
      if (type === 'success') {
        const googleId = user.id
        const name = user.name
        const email = user.email
        const image = user.photoUrl
        // navigation.navigate('Groups', { id, email, name, photoUrl })
        dispatch(signInWithGoogle({ googleId, name, email, image }))
      } else {
        setErrorMessage('Google sign in was canceled')
      }
      setLoading(false)
    } catch (e) {
      console.log(e)
      setErrorMessage('An error occured. Check your network and try again')
      setLoading(false)
    }
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
