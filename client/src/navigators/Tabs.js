import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProductsStacks from './ProductsStacks'
import GroupsStacks from './GroupsStacks'
import ScanStacks from './ScanStacks'
import FavsStacks from './FavsStacks'
import ProfileStacks from './ProfileStacks'
import Loading from '../components/Loading'
import TabBar from '../components/TabBar'
import { setProductsByUserId, setProductsByFavoredUserId } from '../features/product'

const Tab = createBottomTabNavigator()

export default () => {
  const dispatch = useDispatch()
  const { token, user } = useSelector((state) => state.auth)

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="Groups Tab" component={GroupsStacks} options={{ tabBarLabel: 'Groups' }} />
      <Tab.Screen
        name="My Products Tab"
        component={ProductsStacks}
        options={{ tabBarLabel: 'My Products' }}
        listeners={{
          tabPress: () => dispatch(setProductsByUserId({ token, userId: user._id })),
        }}
      />
      <Tab.Screen name="Scan Tab" component={ScanStacks} options={{ tabBarLabel: 'Scan' }} />
      <Tab.Screen
        name="Favorites Tab"
        component={FavsStacks}
        options={{ tabBarLabel: 'Favorites' }}
        listeners={{
          tabPress: () => dispatch(setProductsByFavoredUserId({ token, userId: user._id })),
        }}
      />
      <Tab.Screen name="Profile Tab" component={ProfileStacks} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  )
}
