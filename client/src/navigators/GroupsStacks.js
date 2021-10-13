import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Groups from '../screens/Groups'
import Group from '../screens/Group'
import Product from '../screens/Product'

const GroupStack = createNativeStackNavigator()

export default () => {
  return (
    <GroupStack.Navigator>
      <GroupStack.Screen name="Groups" component={Groups} options={{ headerShown: false }} />
      <GroupStack.Screen name="Group" component={Group} />
      <GroupStack.Screen name="Product" component={Product} />
    </GroupStack.Navigator>
  )
}
