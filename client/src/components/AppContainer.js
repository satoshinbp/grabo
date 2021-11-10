import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SplashScreen from 'expo-splash-screen'
import { setAppReady, setUser } from '../features/auth'
import Login from '../screens/Login'
import Loading from '../components/Loading'
import Tabs from '../navigators/Tabs'
import Onboarding from '../screens/Onboarding'

export default () => {
  const { token, isReady, signingIn, signingOut } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [isFirstLaunch, setIsFirstLaunch] = useState(false)

  useEffect(() => {
    // AsyncStorage.clear() // This is to test onboarding slides.
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value) {
        setIsFirstLaunch(false)
      } else {
        AsyncStorage.setItem('alreadyLaunched', 'true')
        setIsFirstLaunch(true)
      }
    })

    const getCurrentUser = async () => {
      try {
        await SplashScreen.preventAutoHideAsync()
        let tempToken
        tempToken = await SecureStore.getItemAsync('token')

        if (tempToken) {
          dispatch(setUser(tempToken))
        } else {
          dispatch(setAppReady())
        }
      } catch (e) {
        console.error(e)
        dispatch(setAppReady())
      }
    }

    getCurrentUser()
  }, [])

  useEffect(() => {
    const hideSplashScreen = async () => {
      await SplashScreen.hideAsync()
    }

    hideSplashScreen()
  }, [isReady])

  if (isFirstLaunch) return <Onboarding setIsFirstLaunch={setIsFirstLaunch} />
  if (!isReady) return null
  if (signingIn || signingOut) return <Loading />
  if (!token) return <Login />
  return (
    <>
      <Tabs />
    </>
  )
}
