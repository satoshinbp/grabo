import React from 'react'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import userReducer from './src/features/user'
import productsReducer from './src/features/products'
import imageReducer from './src/features/image'
import Tabs from './src/navigators/Tabs'
import Header from './src/components/Header'

const store = createStore(
  combineReducers({
    user: userReducer,
    products: productsReducer,
    image: imageReducer,
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
