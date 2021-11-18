import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from '../screens/Profile'
import Account from '../screens/Account'

const ProdileStack = createNativeStackNavigator()

export default () => {
  return (
    <ProdileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProdileStack.Screen name="Profile" component={Profile} />
      <ProdileStack.Screen name="Account" component={Account} />
    </ProdileStack.Navigator>
  )
}
