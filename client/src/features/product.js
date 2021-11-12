import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SERVER_ROOT_URI } from '@env'
import {
  fetchProductById,
  fetchProductsByGroup,
  fetchProductsByUserId,
  fetchProductsByFavoredUserId,
  addAnswer,
  addUniqQuestion,
  updateHighlight,
} from '../api/product'
// SERVER_ROOT_URI might not work depends on dev environment
// In that case, replace SERVER_ROOT_URI to "<your network IP address>:<PORT>""

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

export const setProductWithNewAnswer = createAsyncThunk('products/setAnswer', async ({ token, params }) => {
  try {
    const data = await addAnswer(token, params)
    return data
  } catch (e) {
    console.error(e)
  }
})

export const setProductWithNewQuestion = createAsyncThunk('products/setQuestion', async ({ token, params }) => {
  try {
    const data = await addUniqQuestion(token, params)
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
    [setProductsByFavoredUserId.pending]: (state, action) => {
      state.loading = true
    },
    [setProductsByFavoredUserId.fulfilled]: (state, action) => {
      state.products = action.payload
      state.loading = false
    },
    [setProductsByFavoredUserId.rejected]: (state, action) => {
      state.loading = false
    },
    [setProductWithNewAnswer.pending]: (state, action) => {
      state.loading = true
    },
    [setProductWithNewAnswer.fulfilled]: (state, action) => {
      state.product = action.payload.data
      state.loading = false
    },
    [setProductWithNewAnswer.rejected]: (state, action) => {
      state.loading = false
    },
    [setProductWithNewQuestion.pending]: (state, action) => {
      state.loading = true
    },
    [setProductWithNewQuestion.fulfilled]: (state, action) => {
      state.product = action.payload.data
      state.loading = false
    },
    [setProductWithNewQuestion.rejected]: (state, action) => {
      state.loading = false
    },
  },
})

export default productSlice.reducer
