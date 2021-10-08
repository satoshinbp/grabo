import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSelector } from 'react-redux'
import HomeStacks from './HomeStacks'
import GroupsStacks from './GroupsStacks'
import ScanStacks from './ScanStacks'
import FavsStacks from './FavsStacks'
import ProfileStacks from './ProfileStacks'

const Tab = createBottomTabNavigator()

export default () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStacks} options={{ headerShown: false }} />
      <Tab.Screen name="Groups" component={GroupsStacks} options={{ headerShown: false }} />
      <Tab.Screen name="Scan" component={ScanStacks} options={{ headerShown: false }} />
      <Tab.Screen name="Favs" component={FavsStacks} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileStacks} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}
