import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from '../screens/Profile'
import SubScreen from '../screens/SubScreen'

const ProdileStack = createNativeStackNavigator()

export default () => {
  return (
    <ProdileStack.Navigator>
      <ProdileStack.Screen name="Profile Screen" component={Profile} options={{ headerShown: false }} />
      <ProdileStack.Screen name="Sub Screen" component={SubScreen} />
    </ProdileStack.Navigator>
  )
}
