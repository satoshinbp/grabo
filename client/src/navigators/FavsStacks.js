import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Favs from '../screens/Favs'
import SubScreen from '../screens/SubScreen'

const FavsStack = createNativeStackNavigator()

export default () => {
  return (
    <FavsStack.Navigator>
      <FavsStack.Screen name="Favs Screen" component={Favs} options={{ headerShown: false }} />
      <FavsStack.Screen name="Sub Screen" component={SubScreen} />
    </FavsStack.Navigator>
  )
}
