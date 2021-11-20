import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Notification from '../screens/Notification'

const NotificationStack = createNativeStackNavigator()

export default () => {
  return (
    <NotificationStack.Navigator screenOptions={{ headerShown: false }}>
      <NotificationStack.Screen name="Notification" component={Notification} />
    </NotificationStack.Navigator>
  )
}
