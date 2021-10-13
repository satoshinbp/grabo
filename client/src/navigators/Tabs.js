import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProductsStacks from './ProductsStacks'
import GroupsStacks from './GroupsStacks'
import ScanStacks from './ScanStacks'
import FavsStacks from './FavsStacks'
import ProfileStacks from './ProfileStacks'
import Login from '../components/Login'
import MyCamera from '../components/Camera'

const Tab = createBottomTabNavigator()

export default () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="My Products" component={ProductsStacks} options={{ headerShown: false }} />
      <Tab.Screen name="My Groups" component={GroupsStacks} options={{ headerShown: false }} />
      <Tab.Screen name="Scan" component={ScanStacks} options={{ headerShown: false }} />
      <Tab.Screen name="Favorites" component={FavsStacks} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileStacks} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}
