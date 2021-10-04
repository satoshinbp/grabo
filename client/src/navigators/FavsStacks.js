import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Favs from '../screens/Favs';
import SubScreen from '../screens/SubScreen';

// After setting up RouteConfigs and StackNavigatorConfig in tabs navigator, stack navigators might be removed
const FavsStack = createNativeStackNavigator();

export default () => {
  return (
    <FavsStack.Navigator>
      <FavsStack.Screen name="Favs Screen" component={Favs} options={{ headerShown: false }} />
      <FavsStack.Screen name="Sub Screen" component={SubScreen} />
    </FavsStack.Navigator>
  );
};
