import * as Google from 'expo-google-app-auth'
import { ANDROID_CLIENT_ID } from '@env'

const authConfig = {
  androidClientId: ANDROID_CLIENT_ID,
  // iosClientId: YOUR_CLIENT_ID_HERE,
}

export const login = (user) => {
  return {
    type: 'LOGIN',
    user,
  }
}

export const signInWithGoogle = () => {
  return (dispatch) => {
    Google.logInAsync(authConfig)
      .then((result) => {
        if (result.type === 'success') {
          const user = {
            accessToken: result.accessToken,
            id: result.user.id,
            name: result.user.name,
            email: result.user.email,
          }
          dispatch(login(user))
        } else {
          console.log('Login cancelled')
        }
      })
      .catch((err) => console.log(err))
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT',
  }
}

// signOutWithGoogle is not working, WIP
export const signOutWithGoogle = () => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken
    Google.logOutAsync({ accessToken, ...authConfig })
      .then((result) => {
        console.log(result)
        if (result.type === 'success') {
          dispatch(logout())
        } else {
          console.log('Logout cancelled', result)
        }
      })
      .catch((err) => console.log(err))
  }
}
