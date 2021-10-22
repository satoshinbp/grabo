import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '@env'

export const fetchProductsByGroup = createAsyncThunk('products/fetchByGroup', async (group, thunkAPI) => {
  try {
    const { data } = await axios.get(`${API_URL}/products/group/${group}`)
    return data
  } catch (err) {
    throw err
  }
})

const productsSlice = createSlice({
  name: 'products',
  initialState: { data: [], loading: false },
  extraReducers: {
    [fetchProductsByGroup.pending]: (state, action) => {
      state.loading = true
    },
    [fetchProductsByGroup.fulfilled]: (state, action) => {
      state.data = action.payload
      state.loading = false
    },
    [fetchProductsByGroup.rejected]: (state, action) => {
      state.loading = false
    },
  },
})

export default productsSlice.reducer
