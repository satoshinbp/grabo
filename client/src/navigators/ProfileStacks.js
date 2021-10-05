import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from '../screens/Profile'
import SubScreen from '../screens/SubScreen'

// After setting up RouteConfigs and StackNavigatorConfig in tabs navigator, stack navigators might be removed
const ProdileStack = createNativeStackNavigator()

export default () => {
  return (
    <ProdileStack.Navigator>
      <ProdileStack.Screen name="Profile Screen" component={Profile} options={{ headerShown: false }} />
      <ProdileStack.Screen name="Sub Screen" component={SubScreen} />
    </ProdileStack.Navigator>
  )
}
