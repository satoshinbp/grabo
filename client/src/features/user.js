import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '@env'

export const signInWithGoogle = createAsyncThunk('users/signin', async ({ googleId, name, email, image }, thunkAPI) => {
  try {
    const res = await axios.post(`${API_URL}/auth/google`, { googleId, name, email, image })
    const { token, user } = res.data
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
    [signInWithGoogle.pending]: (state, action) => {
      state.loading = true
    },
    [signInWithGoogle.fulfilled]: (state, action) => {
      state.user = action.payload
      state.loading = false
    },
    [signInWithGoogle.rejected]: (state, action) => {
      state.loading = false
    },
  },
})

export const { login, logout, updateGroup } = userSlice.actions
export default userSlice.reducer
