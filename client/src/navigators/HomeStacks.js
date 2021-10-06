import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import SubScreen from '../screens/SubScreen'

const HomeStack = createNativeStackNavigator()

export default () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home Screen" component={Home} options={{ headerShown: false }} />
      <HomeStack.Screen name="Sub Screen" component={SubScreen} />
    </HomeStack.Navigator>
  )
}
