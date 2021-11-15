import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  fetchProductById,
  fetchProductsByGroup,
  fetchProductsByUserId,
  fetchProductsByFavoredUserId,
} from '../api/product'

export const setProduct = createAsyncThunk('product/set', async ({ token, id }) => {
  try {
    const data = await fetchProductById(token, id)
    return data
  } catch (e) {
    console.error(e)
  }
})

export const setProductsByGroup = createAsyncThunk('products/setByGroup', async ({ token, code }) => {
  try {
    const data = await fetchProductsByGroup(token, code)
    return data
  } catch (e) {
    console.error(e)
  }
})

export const setProductsByUserId = createAsyncThunk('products/setByUserId', async ({ token, userId }) => {
  try {
    const data = await fetchProductsByUserId(token, userId)
    return data
  } catch (e) {
    console.error(e)
  }
})

export const setProductsByFavoredUserId = createAsyncThunk('products/setByFavoredUserId', async ({ token, userId }) => {
  try {
    const data = await fetchProductsByFavoredUserId(token, userId)
    return data
  } catch (e) {
    console.error(e)
  }
})

const productSlice = createSlice({
  name: 'product',
  initialState: { product: {}, products: [], loading: false },
  extraReducers: {
    [setProduct.pending]: (state) => {
      state.loading = true
    },
    [setProduct.fulfilled]: (state, action) => {
      state.product = action.payload
      state.loading = false
    },
    [setProduct.rejected]: (state) => {
      state.loading = false
    },
    [setProductsByGroup.pending]: (state) => {
      state.loading = true
    },
    [setProductsByGroup.fulfilled]: (state, action) => {
      state.products = action.payload
      state.loading = false
    },
    [setProductsByGroup.rejected]: (state) => {
      state.loading = false
    },
    [setProductsByUserId.pending]: (state) => {
      state.loading = true
    },
    [setProductsByUserId.fulfilled]: (state, action) => {
      state.products = action.payload
      state.loading = false
    },
    [setProductsByUserId.rejected]: (state) => {
      state.loading = false
    },
    [setProductsByFavoredUserId.pending]: (state) => {
      state.loading = true
    },
    [setProductsByFavoredUserId.fulfilled]: (state, action) => {
      state.products = action.payload
      state.loading = false
    },
    [setProductsByFavoredUserId.rejected]: (state) => {
      state.loading = false
    },
  },
})

export default productSlice.reducer
