import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import Tabs from './src/navigators/Tabs'

// theme context shall be used for consistant UI design

export default () => {
  return (
    <NativeBaseProvider>
      {/* <NavigationContainer theme={theme}> */}
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </NativeBaseProvider>
  )
}
