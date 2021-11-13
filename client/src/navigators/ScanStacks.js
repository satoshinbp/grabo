import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Scan from '../screens/Scan'
import SelectLanguage from '../screens/SelectLanguage'
import CreateProduct from '../screens/CreateProduct'

const ScanStack = createNativeStackNavigator()

export default () => {
  return (
    <ScanStack.Navigator screenOptions={{ headerShown: false }}>
      <ScanStack.Screen name="Scan" component={Scan} />
      <ScanStack.Screen name="SelectLanguage" component={SelectLanguage} />
      <ScanStack.Screen name="CreateProduct" component={CreateProduct} />
    </ScanStack.Navigator>
  )
}
