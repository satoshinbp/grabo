import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyProducts from '../screens/MyProducts'
import Product from '../screens/Product'

const HomeStack = createNativeStackNavigator()

export default () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="My Products" component={MyProducts} />
      <HomeStack.Screen name="Product" component={Product} />
    </HomeStack.Navigator>
  )
}
