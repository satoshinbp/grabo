import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { SERVER_ROOT_URI } from '@env'

export const fetchProductById = createAsyncThunk('products/fetchById', async (id, thunkAPI) => {
  try {
    const { data } = await axios.get(`${SERVER_ROOT_URI}/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  } catch (err) {
    throw err
  }
})

export const fetchProductsByGroup = createAsyncThunk('products/fetchByGroup', async (group, thunkAPI) => {
  try {
    const { data } = await axios.get(`${SERVER_ROOT_URI}/api/products/group/${group}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  } catch (err) {
    throw err
  }
})

export const fetchProductsByUserId = createAsyncThunk('products/fetchByUserId', async (userId, thunkAPI) => {
  try {
    const { data } = await axios.get(`${SERVER_ROOT_URI}/api/products/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  } catch (err) {
    throw err
  }
})

const productSlice = createSlice({
  name: 'product',
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
    [fetchProductsByUserId.pending]: (state, action) => {
      state.loading = true
    },
    [fetchProductsByUserId.fulfilled]: (state, action) => {
      state.products = action.payload
      state.loading = false
    },
    [fetchProductsByUserId.rejected]: (state, action) => {
      state.loading = false
    },
  },
})

export default productSlice.reducer
