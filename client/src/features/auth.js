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

export const updateGroup = createAsyncThunk('users/updateGroup', async (token, params) => {
  const user = await updateUser(token, params)
  return user.data.groups
})

const initialUserState = {
  googleId: '',
  name: '',
  email: '',
  image: '',
  groups: [],
  favProducts: [],
  notifications: [],
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialUserState,
    token: null,
    loading: false,
    appIsReady: false,
    signingIn: false,
    signingOut: false,
  },
  reducers: {
    setAppReady: (state, action) => {
      state.appIsReady = true
    },
  },
  extraReducers: {
    [setUser.fulfilled]: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.appIsReady = true
    },
    [setUser.rejected]: (state, action) => {
      state.error = true
      state.appIsReady = true
    },
    [login.pending]: (state, action) => {
      state.signingIn = true
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.appIsReady = true
      state.signingIn = false
    },
    [login.rejected]: (state, action) => {
      state.signingIn = false
    },
    [logout.pending]: (state, action) => {
      state.signingOut = true
    },
    [logout.fulfilled]: (state, action) => {
      state.user = initialUserState
      state.token = null
      state.signingOut = false
    },
    [logout.rejected]: (state, action) => {
      state.signingOut = false
    },
    [updateGroup.pending]: (state, action) => {
      state.loading = true
    },
    [updateGroup.fulfilled]: (state, action) => {
      state.user = { ...state.user, groups: action.payload }
      state.loading = false
    },
    [updateGroup.rejected]: (state, action) => {
      state.loading = false
    },
  },
})

export const { setAppReady } = authSlice.actions
export default authSlice.reducer
