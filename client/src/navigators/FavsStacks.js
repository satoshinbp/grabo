import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Favs from '../screens/Favs'
import Product from '../screens/Product'

const FavsStack = createNativeStackNavigator()

export default () => {
  return (
    <FavsStack.Navigator screenOptions={{ headerShown: false }}>
      <FavsStack.Screen name="Favorites" component={Favs} />
      <FavsStack.Screen name="Favorite" component={Product} />
    </FavsStack.Navigator>
  )
}
