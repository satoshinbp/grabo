import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { SERVER_ROOT_URI } from '@env'
import * as SecureStore from 'expo-secure-store'

export const login = createAsyncThunk('users/signin', async (idToken, thunkAPI) => {
  try {
    const res = await axios.post(`${SERVER_ROOT_URI}/auth/google`, { idToken }) // it doesn't work on Android, need to investigate
    const { token, user } = res.data
    await SecureStore.setItemAsync('token', token)
    return user // shall be replaced. user data to be fetched by token
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
