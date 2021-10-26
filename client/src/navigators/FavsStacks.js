import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CreateProduct from '../screens/CreateProduct'

const FavsStack = createNativeStackNavigator()

//CreateProduct shall be replaced to Favorites
export default () => {
  return (
    <FavsStack.Navigator>
      <FavsStack.Screen name="Favorites" component={CreateProduct} options={{ headerShown: false }} />
    </FavsStack.Navigator>
  )
}
