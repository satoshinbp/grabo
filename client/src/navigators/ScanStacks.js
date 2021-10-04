import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Scan from '../screens/Scan';
import SubScreen from '../screens/SubScreen';

// After setting up RouteConfigs and StackNavigatorConfig in tabs navigator, stack navigators might be removed
const ScanStack = createNativeStackNavigator();

export default () => {
  return (
    <ScanStack.Navigator>
      <ScanStack.Screen name="Scan Screen" component={Scan} options={{ headerShown: false }} />
      <ScanStack.Screen name="Sub Screen" component={SubScreen} />
    </ScanStack.Navigator>
  );
};
