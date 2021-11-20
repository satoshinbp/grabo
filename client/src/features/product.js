import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  fetchProductById,
  fetchProductsByGroup,
  fetchProductsByUserId,
  fetchProductsByFavoredUserId,
  addUniqQuestion,
  addAnswerToFixedQn,
  addAnswerToUniqQn,
  addUserToUniqQnHighlight,
  addUserToFixedQnHighlight,
  removeUserFromFixedQnHighlight,
  removeUserFromUniqQnHighlight,
  addUserToFav,
  removeUserFromFav,
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

export const addAnswerToFixedQuestion = createAsyncThunk(
  'products/addFixedQuestionAnswer',
  async ({ token, id, params }) => {
    try {
      const data = await addAnswerToFixedQn(token, id, params)
      return data
    } catch (e) {
      console.error(e)
    }
  }
)

export const addAnswerToUniqQuestion = createAsyncThunk(
  'products/addUniqQuestionAnswer',
  async ({ token, id, params }) => {
    try {
      const data = await addAnswerToUniqQn(token, id, params)
      return data
    } catch (e) {
      console.error(e)
    }
  }
)

export const addNewQuestion = createAsyncThunk('products/addQuestion', async ({ token, id, params }) => {
  try {
    const data = await addUniqQuestion(token, id, params)
    return data
  } catch (e) {
    console.error(e)
  }
})

export const addUserToFixedQuestionHighlight = createAsyncThunk(
  'products/addUserToFixedQnHighlight',
  async ({ token, id, params }) => {
    try {
      const data = await addUserToFixedQnHighlight(token, id, params)
      return data
    } catch (e) {
      console.error(e)
    }
  }
)

export const addUserToUniqQuestionHighlight = createAsyncThunk(
  'products/addUserToUniqQnHighlight',
  async ({ token, id, params }) => {
    try {
      const data = await addUserToUniqQnHighlight(token, id, params)
      return data
    } catch (e) {
      console.error(e)
    }
  }
)

export const removeUserFromFixedQuestionHighlight = createAsyncThunk(
  'products/removeUserFromFixedQnHighlight',
  async ({ token, id, userId, questionIndex }) => {
    try {
      const data = await removeUserFromFixedQnHighlight(token, id, userId, questionIndex)
      return data
    } catch (e) {
      console.error(e)
    }
  }
)

export const removeUserFromUniqQuestionHighlight = createAsyncThunk(
  'products/removeUserFromUniqQnHighlight',
  async ({ token, id, userId, questionIndex }) => {
    try {
      const data = await removeUserFromUniqQnHighlight(token, id, userId, questionIndex)
      return data
    } catch (e) {
      console.error(e)
    }
  }
)

export const addUserToFavorite = createAsyncThunk('products/addUserToFavorite', async ({ token, id, params }) => {
  try {
    const data = await addUserToFav(token, id, params)
    return data
  } catch (e) {
    console.error(e)
  }
})

export const removeUserFromFavorite = createAsyncThunk(
  'products/removeUserFromFavorite',
  async ({ token, id, userId }) => {
    try {
      const data = await removeUserFromFav(token, id, userId)
      return data
    } catch (e) {
      console.error(e)
    }
  }
)

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
    [addAnswerToFixedQuestion.pending]: (state, action) => {
      state.loading = true
    },
    [addAnswerToFixedQuestion.fulfilled]: (state, action) => {
      state.product = action.payload
      state.loading = false
    },
    [addAnswerToFixedQuestion.rejected]: (state, action) => {
      state.loading = false
    },
    [addAnswerToUniqQuestion.pending]: (state, action) => {
      state.loading = true
    },
    [addAnswerToUniqQuestion.fulfilled]: (state, action) => {
      state.product = action.payload
      state.loading = false
    },
    [addAnswerToUniqQuestion.rejected]: (state, action) => {
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
    [addUserToFixedQuestionHighlight.pending]: (state, action) => {
      state.loading = true
    },
    [addUserToFixedQuestionHighlight.fulfilled]: (state, action) => {
      state.product = action.payload
      state.loading = false
    },
    [addUserToFixedQuestionHighlight.rejected]: (state, action) => {
      state.loading = false
    },
    [addUserToUniqQuestionHighlight.pending]: (state, action) => {
      state.loading = true
    },
    [addUserToUniqQuestionHighlight.fulfilled]: (state, action) => {
      state.product = action.payload
      state.loading = false
    },
    [addUserToUniqQuestionHighlight.rejected]: (state, action) => {
      state.loading = false
    },
    [removeUserFromFixedQuestionHighlight.pending]: (state, action) => {
      state.loading = true
    },
    [removeUserFromFixedQuestionHighlight.fulfilled]: (state, action) => {
      state.product = action.payload
      state.loading = false
    },
    [removeUserFromFixedQuestionHighlight.rejected]: (state, action) => {
      state.loading = false
    },
    [removeUserFromUniqQuestionHighlight.pending]: (state, action) => {
      state.loading = true
    },
    [removeUserFromUniqQuestionHighlight.fulfilled]: (state, action) => {
      state.product = action.payload
      state.loading = false
    },
    [removeUserFromUniqQuestionHighlight.rejected]: (state, action) => {
      state.loading = false
    },
    [addUserToFavorite.pending]: (state, action) => {
      state.loading = true
    },
    [addUserToFavorite.fulfilled]: (state, action) => {
      state.product = action.payload
      state.loading = false
    },
    [addUserToFavorite.rejected]: (state, action) => {
      state.loading = false
    },
    [removeUserFromFavorite.pending]: (state, action) => {
      state.loading = true
    },
    [removeUserFromFavorite.fulfilled]: (state, action) => {
      state.product = action.payload
      state.loading = false
    },
    [removeUserFromFavorite.rejected]: (state, action) => {
      state.loading = false
    },
  },
})

export default productSlice.reducer
