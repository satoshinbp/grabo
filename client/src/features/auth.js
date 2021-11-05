import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as SecureStore from 'expo-secure-store'
import axios from 'axios'
import { SERVER_ROOT_URI } from '@env'
import { updateUser } from '../utils/api'
// SERVER_ROOT_URI might not work depends on dev environment
// In that case, replace SERVER_ROOT_URI to "<your network IP address>:<PORT>""

export const fetchCurrentUser = createAsyncThunk('users/fetch', async (token) => {
  const res = await axios.get(`${SERVER_ROOT_URI}/api/users`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const user = res.data
  return { user, token }
})

export const login = createAsyncThunk('users/login', async (idToken) => {
  const res = await axios.post(`${SERVER_ROOT_URI}/auth/google`, { idToken })
  const { user, token } = res.data
  await SecureStore.setItemAsync('token', token)
  return { user, token }
})

export const logout = createAsyncThunk('users/logout', async () => {
  await SecureStore.deleteItemAsync('token')
})

export const updateGroup = createAsyncThunk('users/updateGroup', async (params) => {
  const user = await updateUser(params)
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
    [fetchCurrentUser.fulfilled]: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.appIsReady = true
    },
    [fetchCurrentUser.rejected]: (state, action) => {
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
