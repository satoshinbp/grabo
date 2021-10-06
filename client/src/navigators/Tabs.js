import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Header from '../components/Header'
import HomeStacks from '../navigators/HomeStacks'
import GroupsStacks from '../navigators/GroupsStacks'
import ScanStacks from '../navigators/ScanStacks'
import FavsStacks from '../navigators/FavsStacks'
import ProfileStacks from '../navigators/ProfileStacks'

const Tab = createBottomTabNavigator()

export default () => {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStacks} options={{ headerShown: false }} />
        <Tab.Screen name="Groups" component={GroupsStacks} options={{ headerShown: false }} />
        <Tab.Screen name="Scan" component={ScanStacks} options={{ headerShown: false }} />
        <Tab.Screen name="Favs" component={FavsStacks} options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={ProfileStacks} options={{ headerShown: false }} />
      </Tab.Navigator>
    </>
  )
}
