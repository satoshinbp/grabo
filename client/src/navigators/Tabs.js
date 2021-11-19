import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { setProductsByUserId, setProductsByFavoredUserId } from '../features/product'
import ProductsStacks from './ProductsStacks'
import GroupsStacks from './GroupsStacks'
import ScanStacks from './ScanStacks'
import FavsStacks from './FavsStacks'
import ProfileStacks from './ProfileStacks'
import TabBar from '../components/TabBar'
import GroupIcon from '../assets/icons/Group'
import PostIcon from '../assets/icons/Post'
import ScanIcon from '../assets/icons/Scan'
import FavIcon from '../assets/icons/Fav'
import ProfileIcon from '../assets/icons/Profile'

const Tab = createBottomTabNavigator()

export default () => {
  const dispatch = useDispatch()
  const { token, user } = useSelector((state) => state.auth)

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="GroupsTab"
        component={GroupsStacks}
        options={{ tabBarLabel: 'Groups', tabBarIcon: ({ width }) => <GroupIcon width={width} /> }}
      />
      <Tab.Screen
        name="MyProductsTab"
        component={ProductsStacks}
        options={{
          tabBarLabel: 'My Products',
          tabBarIcon: ({ width }) => <PostIcon width={width} />,
        }}
        listeners={{ tabPress: () => dispatch(setProductsByUserId({ token, userId: user._id })) }}
      />
      <Tab.Screen
        name="ScanTab"
        component={ScanStacks}
        options={{ tabBarLabel: 'Scan', tabBarIcon: ({ width }) => <ScanIcon width={width} /> }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavsStacks}
        options={{ tabBarLabel: 'Favorites', tabBarIcon: ({ width }) => <FavIcon width={width} /> }}
        listeners={{ tabPress: () => dispatch(setProductsByFavoredUserId({ token, userId: user._id })) }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStacks}
        options={{ tabBarLabel: 'Profile', tabBarIcon: ({ width }) => <ProfileIcon width={width} /> }}
      />
    </Tab.Navigator>
  )
}
