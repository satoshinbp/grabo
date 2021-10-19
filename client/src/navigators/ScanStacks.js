import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CreateProduct from '../screens/CreateProduct'
import SelectLanguage from '../screens/SelectLanguage'

const ScanStack = createNativeStackNavigator()

export default () => {
  return (
    <ScanStack.Navigator>
      <ScanStack.Screen name="CreateProduct" component={CreateProduct} options={{ headerShown: false }} />
      <ScanStack.Screen name="SelectLanguage" component={SelectLanguage} options={{ headerShown: false }} />
    </ScanStack.Navigator>
  )
}
