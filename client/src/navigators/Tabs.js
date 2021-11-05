import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProductsStacks from './ProductsStacks'
import GroupsStacks from './GroupsStacks'
import ScanStacks from './ScanStacks'
import FavsStacks from './FavsStacks'
import ProfileStacks from './ProfileStacks'
import Loading from '../components/Loading'
import { fetchProductsByUserId } from '../features/product'

const Tab = createBottomTabNavigator()

export default () => {
  const dispatch = useDispatch()
  const { user, loading } = useSelector((state) => state.auth)

  if (loading) return <Loading />
  return (
    <Tab.Navigator>
      <Tab.Screen name="Groups Tab" component={GroupsStacks} options={{ tabBarLabel: 'Groups', headerShown: false }} />
      <Tab.Screen
        name="My Products Tab"
        component={ProductsStacks}
        options={{ tabBarLabel: 'My Products', headerShown: false }}
        listeners={{
          tabPress: () => dispatch(fetchProductsByUserId(user._id)),
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
