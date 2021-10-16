import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Scan from '../screens/Scan'

const ScanStack = createNativeStackNavigator()

export default () => {
  return (
    <ScanStack.Navigator>
      <ScanStack.Screen name="Scan" component={Scan} options={{ headerShown: false }} />
      <ScanStack.Screen name="SelectLanguage" component={SelectLanguage} options={{ headerShown: false }} />
    </ScanStack.Navigator>
  )
}
