import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SERVER_ROOT_URI } from '@env'
import { fetchProductById, fetchProductsByGroup, fetchProductsByUserId } from '../api/product'
// SERVER_ROOT_URI might not work depends on dev environment
// In that case, replace SERVER_ROOT_URI to "<your network IP address>:<PORT>""

export const setProduct = createAsyncThunk('products/fetchById', async ({ token, id }, thunkAPI) => {
  try {
    const data = await fetchProductById(token, id)
    return data
  } catch (e) {
    console.error(e)
  }
})

export const setProductsByGroup = createAsyncThunk('products/fetchByGroup', async ({ token, code }, thunkAPI) => {
  try {
    const data = await fetchProductsByGroup(token, code)
    return data
  } catch (e) {
    console.error(e)
  }
})

export const setProductsByUserId = createAsyncThunk('products/fetchByUserId', async ({ token, userId }, thunkAPI) => {
  try {
    const data = fetchProductsByUserId(token, userId)
    return data
  } catch (e) {
    console.error(e)
  }
})

const productSlice = createSlice({
  name: 'product',
  initialState: { product: {}, products: [], loading: false },
  extraReducers: {
    [setProduct.pending]: (state, action) => {
      state.loading = true
    },
    [setProduct.fulfilled]: (state, action) => {
      state.product = action.payload
      state.loading = false
    },
    [setProduct.rejected]: (state, action) => {
      state.loading = false
    },
    [setProductsByGroup.pending]: (state, action) => {
      state.loading = true
    },
    [setProductsByGroup.fulfilled]: (state, action) => {
      state.products = action.payload
      state.loading = false
    },
    [setProductsByGroup.rejected]: (state, action) => {
      state.loading = false
    },
    [setProductsByUserId.pending]: (state, action) => {
      state.loading = true
    },
    [setProductsByUserId.fulfilled]: (state, action) => {
      state.products = action.payload
      state.loading = false
    },
    [setProductsByUserId.rejected]: (state, action) => {
      state.loading = false
    },
  },
})

export default productSlice.reducer
