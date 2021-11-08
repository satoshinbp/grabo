import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Groups from '../screens/Groups'
import Group from '../screens/Group'
import Product from '../screens/Product'
import GroupsSetting from '../screens/GroupsSetting'

const GroupStack = createNativeStackNavigator()

export default () => {
  return (
    <GroupStack.Navigator>
      <GroupStack.Screen name="Groups" component={Groups} options={{ headerShown: false }} />
      <GroupStack.Screen name="Group" component={Group} options={({ route }) => ({ title: route.params.language })} />
      <GroupStack.Screen name="Product" component={Product} />
      <GroupStack.Screen name="Groups Setting" component={GroupsSetting} options={{ title: 'Join / Leave Group' }} />
    </GroupStack.Navigator>
  )
}
