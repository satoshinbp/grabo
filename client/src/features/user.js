import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as SecureStore from 'expo-secure-store'
import axios from 'axios'
import { SERVER_ROOT_URI } from '@env'
import { updateUser } from '../utils/api'
// SERVER_ROOT_URI might not work depends on dev environment
// In that case, replace SERVER_ROOT_URI to "<your network IP address>:<PORT>""

export const login = createAsyncThunk('users/login', async (idToken) => {
  const res = await axios.post(`${SERVER_ROOT_URI}/auth/google`, { idToken })
  const { token, user } = res.data
  await SecureStore.setItemAsync('token', token)
  return user
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

const userSlice = createSlice({
  name: 'user',
  initialState: { user: initialUserState, loading: false },

  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload
      state.loading = false
    },
    [login.rejected]: (state, action) => {
      state.loading = false
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

export default userSlice.reducer
