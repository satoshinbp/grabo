import React from 'react'
import { connect } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStacks from './HomeStacks'
import GroupsStacks from './GroupsStacks'
import ScanStacks from './ScanStacks'
import FavsStacks from './FavsStacks'
import ProfileStacks from './ProfileStacks'
import Login from '../components/Login'
import MyCamera from '../components/Camera'

const Tab = createBottomTabNavigator()

const Tabs = ({ isAuthenticated }) => {
  return isAuthenticated ? (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStacks} options={{ headerShown: false }} />
      <Tab.Screen name="Groups" component={GroupsStacks} options={{ headerShown: false }} />
      <Tab.Screen name="Scan" component={ScanStacks} options={{ headerShown: false }} />
      <Tab.Screen name="Favs" component={FavsStacks} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileStacks} options={{ headerShown: false }} />
    </Tab.Navigator>
  ) : (
    <Login />
    //<MyCamera />
  )
}
const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.id,
})

export default connect(mapStateToProps)(Tabs)
