import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Header from '../components/Header';
import HomeStacks from '../navigators/HomeStacks';
import GroupsStacks from '../navigators/GroupsStacks';
import ScanStacks from '../navigators/ScanStacks';
import FavsStacks from '../navigators/FavsStacks';
import ProfileStacks from '../navigators/ProfileStacks';

const Tab = createBottomTabNavigator(); // RouteConfigs and StackNavigatorConfig to be set
// After setting up RouteConfigs and StackNavigatorConfig, stack navigators might be removed

export default () => {
  return (
    <>
      <Header />
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStacks} />
        <Tab.Screen name="Groups" component={GroupsStacks} />
        <Tab.Screen name="Scan" component={ScanStacks} />
        <Tab.Screen name="Favs" component={FavsStacks} />
        <Tab.Screen name="Profile" component={ProfileStacks} />
      </Tab.Navigator>
    </>
  );
};
