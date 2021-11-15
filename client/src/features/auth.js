import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as SecureStore from 'expo-secure-store'
import { fetchUser, updateUser, signInWithGoogle } from '../api/auth'

export const setUser = createAsyncThunk('users/fetch', async (token) => {
  const user = await fetchUser(token)
  return { user, token }
})

export const login = createAsyncThunk('users/login', async (idToken) => {
  const { user, token } = await signInWithGoogle(idToken)
  await SecureStore.setItemAsync('token', token)
  return { user, token }
})

export const logout = createAsyncThunk('users/logout', async () => {
  await SecureStore.deleteItemAsync('token')
})

export const updateGroup = createAsyncThunk('users/updateGroup', async ({ token, params }) => {
  const { groups } = await updateUser(token, params)
  return groups
})

export const updateIsNotificationOn = createAsyncThunk('users/updateNotification', async ({ token, params }) => {
  const { isNotificationOn } = await updateUser(token, params)
  return isNotificationOn
})

const initialUserState = {
  googleId: '',
  name: '',
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
    user: initialUserState,
    token: null,
    loading: false,
    isReady: false,
    signingIn: false,
    signingOut: false,
  },
  reducers: {
    setAppReady: (state) => {
      state.isReady = true
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
    [updateGroup.pending]: (state) => {
      state.loading = true
    },
    [updateGroup.fulfilled]: (state, action) => {
      state.user = { ...state.user, groups: action.payload }
      state.loading = false
    },
    [updateGroup.rejected]: (state) => {
      state.loading = false
    },
    [updateIsNotificationOn.pending]: (state) => {
      state.loading = true
    },
    [updateIsNotificationOn.fulfilled]: (state, action) => {
      state.user.isNotificationOn = action.payload
      state.loading = false
    },
    [updateIsNotificationOn.rejected]: (state) => {
      state.loading = false
    },
  },
})

export const { setAppReady } = authSlice.actions
export default authSlice.reducer
