import React from 'react'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider, extendTheme } from 'native-base'
import authReducer from './src/features/auth'
import imageReducer from './src/features/image'
import productReducer from './src/features/product'
import AppContainer from './src/components/AppContainer'

const store = createStore(
  combineReducers({
    auth: authReducer,
    image: imageReducer,
    product: productReducer,
  }),
  applyMiddleware(thunk)
)

export default () => {
  const theme = extendTheme({
    colors: {
      primary: {
        50: '#ffffdc',
        100: '#fff0b4',
        200: '#ffe68c',
        300: '#ffdc64',
        400: '#ffd23c',
        500: '#ffc814',
        600: '#e6b000',
        700: '#b38900',
        800: '#806200',
        900: '#4e3b00',
      },
    },
    fonts: {
      heading: 'Roboto',
      body: 'Roboto',
      mono: 'Roboto',
    },
    components: {
      View: {
        variants: {
          wrapper: () => ({
            px: 3,
          }),
        },
      },
      Box: {
        variants: {
          listItemPlain: ({ index }) => ({
            mt: index === 0 ? 1.5 : 0,
            mb: 3,
            px: 3.5,
            py: 2.5,
            borderRadius: 'md',
            backgroundColor: 'white',
            shadow: 2,
          }),
          listItemColored: ({ index }) => ({
            mt: index === 0 ? 1.5 : 0,
            mb: 3,
            px: 3.5,
            py: 2.5,
            borderLeftWidth: '10px',
            borderColor: 'primary.500',
            borderRadius: 'md',
            bg: 'white',
            shadow: 2,
          }),
          productCard: () => ({
            rounded: 'lg',
            overflow: 'hidden',
            width: '72px',
            height: '72px',
          }),
        },
      },
      Button: {
        baseStyle: {
          _text: {
            color: 'black',
            textAlign: 'center',
          },
        },
        variants: {
          fab: () => ({
            position: 'absolute',
            bottom: 4,
            right: 4,
            width: '80px',
            height: '80px',
            borderRadius: 'full',
            backgroundColor: 'primary.500',
            shadow: 5,
            _text: {
              color: 'black',
              textAlign: 'center',
            },
          }),
        },
      },
    },
  })

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <AppContainer />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  )
}
