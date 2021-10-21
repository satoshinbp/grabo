import { createSlice } from '@reduxjs/toolkit'

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
    setLanguageGroup: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { login, logout, setLanguageGroup } = userSlice.actions
export default userSlice.reducer
