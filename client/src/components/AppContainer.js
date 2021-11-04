import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as SecureStore from 'expo-secure-store'
import { fetchCurrentUser } from '../features/auth'
import Splash from '../screens/Splash'
import Login from '../screens/Login'
import Header from '../components/Header'
import Tabs from '../navigators/Tabs'

export default () => {
  const dispatch = useDispatch()
  const { token, appReady } = useSelector((state) => state.auth)

  useEffect(() => {
    const getCurrentUser = async () => {
      let tempToken

      try {
        tempToken = await SecureStore.getItemAsync('token')
      } catch (e) {
        console.error(e)
      }

      if (tempToken) {
        dispatch(fetchCurrentUser(tempToken))
      }
    }

    getCurrentUser()
  }, [])

  if (!appReady) return <Splash />
  if (!token) return <Login />
  return (
    <>
      <Header />
      <Tabs />
    </>
  )
}
