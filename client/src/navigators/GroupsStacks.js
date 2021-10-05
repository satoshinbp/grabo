import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Groups from '../screens/Groups'
import SubScreen from '../screens/SubScreen'

// After setting up RouteConfigs and StackNavigatorConfig in tabs navigator, stack navigators might be removed
const GroupStack = createNativeStackNavigator()

export default () => {
  return (
    <GroupStack.Navigator>
      <GroupStack.Screen name="Groups Screen" component={Groups} options={{ headerShown: false }} />
      <GroupStack.Screen name="Sub Screen" component={SubScreen} />
    </GroupStack.Navigator>
  )
}
