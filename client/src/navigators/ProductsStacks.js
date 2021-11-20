import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyProducts from '../screens/MyProducts'
import Product from '../screens/Product'

const MyProductsStack = createNativeStackNavigator()

export default () => {
  return (
    <MyProductsStack.Navigator screenOptions={{ headerShown: false }}>
      <MyProductsStack.Screen name="MyProducts" component={MyProducts} />
      <MyProductsStack.Screen name="MyProduct" component={Product} />
    </MyProductsStack.Navigator>
  )
}
