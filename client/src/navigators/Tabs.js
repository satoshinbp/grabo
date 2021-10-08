import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSelector } from 'react-redux'
import HomeStacks from './HomeStacks'
import GroupsStacks from './GroupsStacks'
import ScanStacks from './ScanStacks'
import FavsStacks from './FavsStacks'
import ProfileStacks from './ProfileStacks'
import Login from '../components/Login'

const Tab = createBottomTabNavigator()

const userSelector = (state) => state.user

export default () => {
  const user = useSelector(userSelector)

  return user.id ? (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStacks} options={{ headerShown: false }} />
      <Tab.Screen name="Groups" component={GroupsStacks} options={{ headerShown: false }} />
      <Tab.Screen name="Scan" component={ScanStacks} options={{ headerShown: false }} />
      <Tab.Screen name="Favs" component={FavsStacks} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileStacks} options={{ headerShown: false }} />
    </Tab.Navigator>
  ) : (
    <Login />
  )
}
