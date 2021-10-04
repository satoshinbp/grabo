import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import SubScreen from '../screens/SubScreen';

// After setting up RouteConfigs and StackNavigatorConfig in tabs navigator, stack navigators might be removed
const HomeStack = createNativeStackNavigator();

export default () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home Screen" component={Home} options={{ headerShown: false }} />
      <HomeStack.Screen name="Sub Screen" component={SubScreen} />
    </HomeStack.Navigator>
  );
};
