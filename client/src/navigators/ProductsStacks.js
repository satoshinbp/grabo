import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Products from '../screens/Products'
import SubScreen from '../screens/SubScreen'

const HomeStack = createNativeStackNavigator()

export default () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Products Screen" component={Products} options={{ headerShown: false }} />
      <HomeStack.Screen name="Sub Screen" component={SubScreen} />
    </HomeStack.Navigator>
  )
}
