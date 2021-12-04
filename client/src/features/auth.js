import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { signInWithGoogle, fetchUserByToken, patchUser, setNotificationTrue } from '../api/auth'

export const setUser = createAsyncThunk('users/fetch', async (token) => {
  const user = await fetchUserByToken(token)
  return { token, user }
})

export const login = createAsyncThunk('users/login', async (idToken) => {
  const { token, user } = await signInWithGoogle(idToken)
  await SecureStore.setItemAsync('token', token)
  return { token, user }
})

export const logout = createAsyncThunk('users/logout', async () => {
  await SecureStore.deleteItemAsync('token')
  AsyncStorage.clear() // This is to show onboarding slides on demo.
})

export const updateUser = createAsyncThunk('users/update', async ({ token, id, params }) => {
  const user = await patchUser(token, id, params)
  return user
})

export const readNotification = createAsyncThunk(
  'users/notification',
  async ({ token, userId, notificationId, params }) => {
    const user = await setNotificationTrue(token, userId, notificationId, params)
    return user
  }
)

const initialUserState = {
  googleId: '',
  firstName: '',
  lastName: '',
  email: '',
  image: '',
  groups: [],
  favProducts: [],
  notifications: [],
  isNotificationOn: true,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    token: null,
    user: initialUserState,
    isReady: false,
    signingIn: false,
    signingOut: false,
  },
  reducers: {
    setAppReady: (state) => {
      state.isReady = true
    },
    addNotification: (state, action) => {
      state.user.notifications.push(action.payload)
    },
  },
  extraReducers: {
    [setUser.fulfilled]: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isReady = true
    },
    [setUser.rejected]: (state) => {
      state.error = true
      state.isReady = true
    },

    [login.pending]: (state) => {
      state.signingIn = true
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isReady = true
      state.signingIn = false
    },
    [login.rejected]: (state) => {
      state.signingIn = false
    },

    [logout.pending]: (state) => {
      state.signingOut = true
    },
    [logout.fulfilled]: (state) => {
      state.user = initialUserState
      state.token = null
      state.signingOut = false
    },
    [logout.rejected]: (state) => {
      state.signingOut = false
    },

    [updateUser.pending]: (state) => {
      state.loading = true
    },
    [updateUser.fulfilled]: (state, action) => {
      state.user = action.payload
      state.loading = false
    },
    [updateUser.rejected]: (state) => {
      state.loading = false
    },

    [readNotification.pending]: (state) => {
      state.loading = true
    },
    [readNotification.fulfilled]: (state, action) => {
      state.user = action.payload
      state.loading = false
    },
    [readNotification.rejected]: (state) => {
      state.loading = false
    },
  },
})

export const { setAppReady, addNotification } = authSlice.actions
export default authSlice.reducer
