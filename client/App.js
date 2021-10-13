import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import userReducer from './src/features/user'
import Tabs from './src/navigators/Tabs'
import Header from './src/components/Header'

const store = createStore(
  combineReducers({
    user: userReducer,
  }),
  applyMiddleware(thunk)
)

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
