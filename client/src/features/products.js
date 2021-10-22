import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '@env'

export const fetchProductById = createAsyncThunk('product/fetchById', async (id, thunkAPI) => {
  try {
    const { data } = await axios.get(`${API_URL}/products/${id}`)
    return data
  } catch (err) {
    throw err
  }
})

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
  initialState: { product: {}, products: [], loading: false },
  extraReducers: {
    [fetchProductById.pending]: (state, action) => {
      state.loading = true
    },
    [fetchProductById.fulfilled]: (state, action) => {
      state.product = action.payload
      state.loading = false
    },
    [fetchProductById.rejected]: (state, action) => {
      state.loading = false
    },
    [fetchProductsByGroup.pending]: (state, action) => {
      state.loading = true
    },
    [fetchProductsByGroup.fulfilled]: (state, action) => {
      state.products = action.payload
      state.loading = false
    },
    [fetchProductsByGroup.rejected]: (state, action) => {
      state.loading = false
    },
  },
})

export default productsSlice.reducer
