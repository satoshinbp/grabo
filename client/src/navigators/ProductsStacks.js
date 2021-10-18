import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Products from '../screens/Products'

const HomeStack = createNativeStackNavigator()

export default () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="My Products" component={Products} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  )
}
