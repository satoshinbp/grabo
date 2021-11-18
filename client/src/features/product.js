import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  fetchProductById,
  fetchProductsByGroup,
  fetchProductsByUserId,
  fetchProductsByFavoredUserId,
  addUniqQuestion,
  updateFavorite,
  addAnswerForFixedQuestion,
  addAnswerForUniqQuestion,
  addUserToUniqQnHighlight,
  addUserToFixedQnHighlight,
  removeUserFromFixedQnHighlight,
  removeUserFromUniqQnHighlight,
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

/*
export const addNewAnswer = createAsyncThunk('products/addAnswer', async ({ token, id, params }) => {
  try {
    const data = await addAnswer(token, id, params)
    return data
  } catch (e) {
    console.error(e)
  }
})*/

export const addNewAnswerForFixedQuestion = createAsyncThunk(
  'products/addFixedQuestionAnswer',
  async ({ token, id, params }) => {
    try {
      const data = await addAnswerForFixedQuestion(token, id, params)
      return data
    } catch (e) {
      console.error(e)
    }
  }
)

export const addNewAnswerForUniqQuestion = createAsyncThunk(
  'products/addUniqQuestionAnswer',
  async ({ token, id, params }) => {
    try {
      const data = await addAnswerForUniqQuestion(token, id, params)
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
/*
export const updateQuestionHighlight = createAsyncThunk('products/updateHighlight', async ({ token, id, params }) => {
  try {
    const data = await updateHighlight(token, id, params)
    return data
  } catch (e) {
    console.error(e)
  }
})*/

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
      console.log(data)
      return data
    } catch (e) {
      console.error(e)
    }
  }
)

export const removeUserFromFixedQuestionHighlight = createAsyncThunk(
  'products/removeUserFromFixedQnHighlight',
  async ({ token, id, params }) => {
    try {
      const data = await removeUserFromFixedQnHighlight(token, id, params)
      return data
    } catch (e) {
      console.error(e)
    }
  }
)

export const removeUserFromUniqQuestionHighlight = createAsyncThunk(
  'products/removeUserFromUniqQnHighlight',
  async ({ token, id, params }) => {
    try {
      const data = await removeUserFromUniqQnHighlight(token, id, params)
      console.log(data)
      return data
    } catch (e) {
      console.error(e)
    }
  }
)

export const updateProductFavorite = createAsyncThunk('products/updateFavorite', async ({ token, id, params }) => {
  try {
    const data = await updateFavorite(token, id, params)
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
    /*
    [addNewAnswer.pending]: (state, action) => {
      state.loading = true
    },
    [addNewAnswer.fulfilled]: (state, action) => {
      state.product = action.payload
      state.loading = false
    },
    [addNewAnswer.rejected]: (state, action) => {
      state.loading = false
    },*/
    [addNewAnswerForFixedQuestion.pending]: (state, action) => {
      state.loading = true
    },
    [addNewAnswerForFixedQuestion.fulfilled]: (state, action) => {
      state.product = action.payload
      state.loading = false
    },
    [addNewAnswerForFixedQuestion.rejected]: (state, action) => {
      state.loading = false
    },
    [addNewAnswerForUniqQuestion.pending]: (state, action) => {
      state.loading = true
    },
    [addNewAnswerForUniqQuestion.fulfilled]: (state, action) => {
      state.product = action.payload
      state.loading = false
    },
    [addNewAnswerForUniqQuestion.rejected]: (state, action) => {
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
    /*
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
    */
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
