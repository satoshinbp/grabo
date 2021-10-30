import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as SecureStore from 'expo-secure-store'
import axios from 'axios'
import { SERVER_ROOT_URI } from '@env'
// SERVER_ROOT_URI might not work depends on dev environment
// In that case, replace SERVER_ROOT_URI to "<your network IP address>:<PORT>""

export const login = createAsyncThunk('users/signin', async (idToken, thunkAPI) => {
  try {
    const res = await axios.post(`${SERVER_ROOT_URI}/auth/google`, { idToken })
    const { token, user } = res.data
    await SecureStore.setItemAsync('token', token)
    return user
  } catch (err) {
    throw err
  }
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
  reducers: {
    logout: (state, action) => {
      state.user = initialUserState
    },
    updateGroup: (state, action) => {
      state.user = { ...state.user, groups: action.payload }
    },
  },
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
  },
})

export const { logout, updateGroup } = userSlice.actions
export default userSlice.reducer
