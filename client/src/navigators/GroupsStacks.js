import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Groups from '../screens/Groups'
import Group from '../screens/Group'
import Product from '../screens/Product'
import GroupsSetting from '../screens/GroupsSetting'

const GroupStack = createNativeStackNavigator()

export default () => {
  return (
    <GroupStack.Navigator screenOptions={{ headerShown: false }}>
      <GroupStack.Screen name="Groups" component={Groups} />
      <GroupStack.Screen name="Group" component={Group} options={({ route }) => ({ title: route.params.language })} />
      <GroupStack.Screen name="GroupProduct" component={Product} />
      <GroupStack.Screen name="GroupsSetting" component={GroupsSetting} options={{ title: 'Join / Leave Group' }} />
    </GroupStack.Navigator>
  )
}
