import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as SecureStore from 'expo-secure-store'
import { fetchUser, updateUser, signInWithGoogle } from '../api/auth'

export const setUser = createAsyncThunk('users/fetch', async (token, thunkAPI) => {
  const user = await fetchUser(token)
  return { user, token }
})

export const login = createAsyncThunk('users/login', async (idToken, thunkAPI) => {
  const { user, token } = await signInWithGoogle(idToken)
  await SecureStore.setItemAsync('token', token)
  return { user, token }
})

export const logout = createAsyncThunk('users/logout', async () => {
  await SecureStore.deleteItemAsync('token')
})

export const updateGroup = createAsyncThunk('users/updateGroup', async ({ token, params }, thunkAPI) => {
  const user = await updateUser(token, params)
  return user.data.groups
})

export const updateIsNotificationOn = createAsyncThunk(
  'users/updateNotification',
  async ({ token, params }, thunkAPI) => {
    const user = await updateUser(token, params)
    return user.data.isNotificationOn
  }
)

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
    setAppReady: (state, action) => {
      state.isReady = true
    },
  },
  extraReducers: {
    [setUser.fulfilled]: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isReady = true
    },
    [setUser.rejected]: (state, action) => {
      state.error = true
      state.isReady = true
    },
    [login.pending]: (state, action) => {
      state.signingIn = true
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isReady = true
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
    [updateIsNotificationOn.pending]: (state, action) => {
      state.loading = true
    },
    [updateIsNotificationOn.fulfilled]: (state, action) => {
      state.user = { ...state.user, isNotificationOn: action.payload }
      state.loading = false
    },
    [updateIsNotificationOn.rejected]: (state, action) => {
      state.loading = false
    },
  },
})

export const { setAppReady } = authSlice.actions
export default authSlice.reducer
