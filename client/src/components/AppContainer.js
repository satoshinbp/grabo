import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as SecureStore from 'expo-secure-store'
import * as SplashScreen from 'expo-splash-screen'
import { setAppReady, setUser } from '../features/auth'
import Login from '../screens/Login'
import Loading from '../components/Loading'
import Header from '../components/Header'
import Tabs from '../navigators/Tabs'

export default () => {
  const dispatch = useDispatch()
  const { token, appIsReady, signingIn, signingOut } = useSelector((state) => state.auth)

  useEffect(() => {
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
  }, [appIsReady])

  if (!appIsReady) return null
  if (signingIn || signingOut) return <Loading />
  if (!token) return <Login />
  return (
    <>
      <Header />
      <Tabs />
    </>
  )
}
