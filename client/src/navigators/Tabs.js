import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProductsStacks from './ProductsStacks'
import GroupsStacks from './GroupsStacks'
import ScanStacks from './ScanStacks'
import FavsStacks from './FavsStacks'
import ProfileStacks from './ProfileStacks'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProductsByUserId } from '../features/products'

const Tab = createBottomTabNavigator()

export default () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.value)
  return (
    <Tab.Navigator>
      <Tab.Screen name="Groups Tab" component={GroupsStacks} options={{ tabBarLabel: 'Groups', headerShown: false }} />
      <Tab.Screen
        name="My Products Tab"
        component={ProductsStacks}
        options={{ tabBarLabel: 'My Products', headerShown: false }}
        listeners={{
          tabPress: () => {
            dispatch(fetchProductsByUserId(user.mongoId))
          },
        }}
      />
      <Tab.Screen name="Scan Tab" component={ScanStacks} options={{ tabBarLabel: 'Scan', headerShown: false }} />
      <Tab.Screen
        name="Favorites Tab"
        component={FavsStacks}
        options={{ tabBarLabel: 'Favorites', headerShown: false }}
      />
      <Tab.Screen
        name="Profile Tab"
        component={ProfileStacks}
        options={{ tabBarLabel: 'Profile', headerShown: false }}
      />
    </Tab.Navigator>
  )
}
