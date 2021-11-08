import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyProducts from '../screens/MyProducts'
import MyProduct from '../screens/MyProduct'

const HomeStack = createNativeStackNavigator()

export default () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="My Products" component={MyProducts} options={{ headerShown: false }} />
      <HomeStack.Screen name="My Product" component={MyProduct} />
    </HomeStack.Navigator>
  )
}
