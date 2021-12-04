import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SplashScreen from 'expo-splash-screen'
import { patchUser } from '../api/auth'
import { setAppReady, setUser, addNotification } from '../features/auth'
import { setProductsByGroup, setProductsByUserId, setProductsByFavoredUserId } from '../features/product'
import Tabs from '../navigators/Tabs'
import Onboarding from '../screens/Onboarding'
import Login from '../screens/Login'
import Loading from '../components/Loading'
import Header from '../components/Header'
import { setProductFromNotification } from '../features/product'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

export default () => {
  const dispatch = useDispatch()
  const { token, isReady, signingIn, signingOut, user } = useSelector((state) => state.auth)

  const notificationListener = useRef()
  const responseListener = useRef()

  const [isFirstLaunch, setIsFirstLaunch] = useState(false)

  const registerForPushNotifications = async () => {
    let token

    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!')
        return
      }
      token = (await Notifications.getExpoPushTokenAsync()).data
    } else {
      alert('Must use physical device for Push Notifications')
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      })
    }

    return token
  }

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

    if (token) {
      dispatch(setProductsByGroup({ token, codes: user?.groups }))
      dispatch(setProductsByUserId({ token, userId: user?._id }))
      dispatch(setProductsByFavoredUserId({ token, userId: user?._id }))

      registerForPushNotifications().then((expotoken) => {
        // Listen to receive notification while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
          // dispatch(addNotification(notification))
        })

        // Listen for the user to tap on or interact with a notification while the app is foregrounded, backgrounded, or killed
        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
          dispatch(
            setProductFromNotification({
              token,
              type: response.notification.request.content.body,
              id: response.notification.request.content.data.productId,
            })
          )
        })
        const params = {
          notificationToken: expotoken,
          isNotificationOn: true,
        }
        patchUser(token, user._id, params)

        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current)
          Notifications.removeNotificationSubscription(responseListener.current)(<Tabs />)
        }
      })
    }
  }, [token])

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
      <Header />
      <Tabs />
    </>
  )
}
