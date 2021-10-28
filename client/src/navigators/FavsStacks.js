import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Favs from '../screens/Favs'

const FavsStack = createNativeStackNavigator()

export default () => {
  return (
    <FavsStack.Navigator>
      <FavsStack.Screen name="Favorites" component={Favs} options={{ headerShown: false }} />
    </FavsStack.Navigator>
  )
}
