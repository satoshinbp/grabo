import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  fetchProductById,
  fetchProductsByGroup,
  fetchProductsByUserId,
  fetchProductsByFavoredUserId,
  addAnswer,
  addUniqQuestion,
  updateHighlight,
  updateFavorite,
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

export const addNewAnswer = createAsyncThunk('products/addAnswer', async ({ token, params }) => {
  try {
    const data = await addAnswer(token, params)
    return data
  } catch (e) {
    console.error(e)
  }
})

export const addNewQuestion = createAsyncThunk('products/addQuestion', async ({ token, params }) => {
  try {
    const data = await addUniqQuestion(token, params)
    return data
  } catch (e) {
    console.error(e)
  }
})

export const updateQuestionHighlight = createAsyncThunk('products/updateHighlight', async ({ token, params }) => {
  try {
    const data = await updateHighlight(token, params)
    return data
  } catch (e) {
    console.error(e)
  }
})

export const updateProductFavorite = createAsyncThunk('products/updateFavorite', async ({ token, params }) => {
  try {
    const data = await updateFavorite(token, params)
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
    [addNewAnswer.pending]: (state, action) => {
      state.loading = true
    },
    [addNewAnswer.fulfilled]: (state, action) => {
      state.product = action.payload
      state.loading = false
    },
    [addNewAnswer.rejected]: (state, action) => {
      state.loading = false
    },
    [addNewQuestion.pending]: (state, action) => {
      state.loading = true
    },
    [addNewQuestion.fulfilled]: (state, action) => {
      state.product = action.payload
      state.loading = false
    },
    [addNewQuestion.rejected]: (state, action) => {
      state.loading = false
    },
    [updateQuestionHighlight.pending]: (state, action) => {
      state.loading = true
    },
    [updateQuestionHighlight.fulfilled]: (state, action) => {
      state.product = action.payload
      state.loading = false
    },
    [updateQuestionHighlight.rejected]: (state, action) => {
      state.loading = false
    },
    [updateProductFavorite.pending]: (state, action) => {
      state.loading = true
    },
    [updateProductFavorite.fulfilled]: (state, action) => {
      state.product = action.payload
      state.loading = false
    },
    [updateProductFavorite.rejected]: (state, action) => {
      state.loading = false
    },
  },
})

export default productSlice.reducer
