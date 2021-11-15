import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SplashScreen from 'expo-splash-screen'
import { setAppReady, setUser } from '../features/auth'
import Login from '../screens/Login'
import Loading from '../components/Loading'
import Header from '../components/Header'
import Tabs from '../navigators/Tabs'
import Onboarding from '../screens/Onboarding'
import { updateUser } from '../api/auth'

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
  const [isFirstLaunch, setIsFirstLaunch] = useState(false)
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

  async function registerForPushNotificationsAsync() {
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
      console.log('notificationtoken', token)
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
      //notificationの確認
      registerForPushNotificationsAsync().then((expotoken) => {
        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification)
        })

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response)
        })
        const params = {
          notificationToken: expotoken,
          user_id: user?._id,
        }
        updateUser(token, params)

        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current)
          Notifications.removeNotificationSubscription(responseListener.current)(
            <>
              <Tabs />
            </>
          )
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
