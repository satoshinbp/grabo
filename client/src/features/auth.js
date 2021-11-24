import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as SecureStore from 'expo-secure-store'
import { signInWithGoogle, fetchUser, patchUser } from '../api/auth'

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

export const updateUser = createAsyncThunk('users/update', async ({ token, id, params }) => {
  const user = await patchUser(token, id, params)
  return user
})

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
  },
})

export const { setAppReady } = authSlice.actions
export default authSlice.reducer
