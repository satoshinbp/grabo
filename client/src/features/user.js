import { createSlice } from '@reduxjs/toolkit'
import { updateUser } from '../utils/api'

const initialStateValue = {
  googleId: '',
  name: '',
  image: '',
  groups: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState: { value: initialStateValue },
  reducers: {
    login: (state, action) => {
      state.value = action.payload
    },
    logout: (state, action) => {
      state.value = initialStateValue
    },
    updateGroup: (state, action) => {
      state.value = { ...state.value, groups: action.payload }
    },
  },
})

export const groupUpdate = () => async (dispatch) => {
  try {
    dispatch(updateGroup())
  } catch (error) {
    console.log(error)
  }
}

export const { login, logout, updateGroup } = userSlice.actions
export default userSlice.reducer
