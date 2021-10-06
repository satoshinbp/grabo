import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import configureStore from './src/store/configureStore'
import Tabs from './src/navigators/Tabs'
import Header from './src/components/Header'

const store = configureStore()

export default () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        {/* <NavigationContainer theme={theme}> */}
        <NavigationContainer>
          <Header />
          <Tabs />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  )
}
