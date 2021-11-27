import React from 'react'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { NavigationContainer } from '@react-navigation/native'
import { LogBox } from 'react-native'
import { NativeBaseProvider, extendTheme } from 'native-base'
import authReducer from './src/features/auth'
import imageReducer from './src/features/image'
import productReducer from './src/features/product'
import AppContainer from './src/components/AppContainer'
import { navigationRef } from './src/navigators/RootNavigation'

LogBox.ignoreAllLogs()

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
            flex: 1,
            px: 3,
          }),
        },
      },
      ScrollView: {
        variants: {
          wrapper: () => ({
            flex: 1,
            px: 3,
          }),
        },
      },
      Box: {
        variants: {
          listItemBarPlain: () => ({
            my: 1.5,
            px: 3.5,
            py: 2.5,
            borderRadius: 'md',
            backgroundColor: 'white',
            shadow: 2,
          }),
          listItemBarColored: () => ({
            my: 1.5,
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
      VStack: {
        variants: {
          container: {
            my: 3,
            space: 3,
          },
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
          fab: (props) => {
            // Copied from variant "solid". More sustainable if it could be extended from variant "solid".
            const { colorScheme: c } = props
            let bg = `${c}.500`
            return {
              _web: {
                outlineWidth: '0',
              },
              bg,
              _hover: {
                bg: `${c}.600`,
              },
              _pressed: {
                bg: `${c}.700`,
              },
              _focus: {
                bg: `${c}.600`,
              },
              _loading: {
                bg: 'warmGray.50',
                opacity: '50',
              },
              _disabled: { bg: 'trueGray.300' },

              // Original code below
              position: 'absolute',
              bottom: 4,
              right: 4,
              width: '84px',
              height: '84px',
              borderRadius: 'full',
              shadow: 2,
              _text: {
                color: 'black',
                textAlign: 'center',
              },
            }
          },
        },
      },
      TextArea: {
        baseStyle: {
          bg: 'muted.100',
          color: 'muted.500',
          fontSize: 'sm',
        },
      },
    },
  })

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer ref={navigationRef}>
          <AppContainer />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  )
}
