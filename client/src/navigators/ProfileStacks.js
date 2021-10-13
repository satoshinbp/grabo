import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from '../screens/Profile'

const ProdileStack = createNativeStackNavigator()

export default () => {
  return (
    <ProdileStack.Navigator>
      <ProdileStack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </ProdileStack.Navigator>
  )
}
