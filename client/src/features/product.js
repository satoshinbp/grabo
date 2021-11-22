import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchUsersByGroup } from '../api/auth'
import {
  fetchProductsByGroup,
  fetchProductsByUserId,
  fetchProductsByFavoredUserId,
  postProduct,
  postQuestionUniq,
  postAnswerFixed,
  postAnswerUniq,
  postUserToHighlightFixed,
  postUserToHighlightUniq,
  deleteUserFromHighlightFixed,
  deleteUserFromHighlightUniq,
  postUserToFavorite,
  deleteUserFromFavorite,
} from '../api/product'
import { postImage } from '../api/image'
import { clearImage } from './image'
import * as RootNavigation from '../navigators/RootNavigation'
import lodash from 'lodash'

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

const sendPushNotification = async (expoPushToken) => {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Help',
    body: 'Someone need your help!',
    data: { someData: 'goes here' },
  }

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
}

export const createProduct = createAsyncThunk(
  'products/create',
  async ({ token, params: productParams }, { getState, dispatch }) => {
    try {
      const { image } = getState()
      const imageParams = new FormData()
      imageParams.append('image', { uri: image.value.uris[0], name: 'uploadedImage.jpeg', type: 'image/jpeg' })
      await postImage(token, imageParams)
      const data = await postProduct(token, productParams)

      const fetchedUsers = await fetchUsersByGroup(token, image.value.code)
      const notifiedUsers = fetchedUsers.filter((user) => user.isNotificationOn)
      const notificationTokens = await notifiedUsers.map((user) => user.notificationToken)
      notificationTokens.map((token) => sendPushNotification(token))

      dispatch(clearImage())

      RootNavigation.navigate('MyProductsTab', { screen: 'MyProduct', params: { id: data._id } })

      return data
    } catch (e) {
      console.error(e)
    }
  }
)

export const addQuestion = createAsyncThunk('products/addQuestion', async ({ token, params }) => {
  try {
    const data = await postQuestionUniq(token, params)
    return data
  } catch (e) {
    console.error(e)
  }
})

export const addAnswerToFixedQn = createAsyncThunk('products/addFixedQuestionAnswer', async ({ token, params }) => {
  try {
    const data = await postAnswerFixed(token, params)
    return data
  } catch (e) {
    console.error(e)
  }
})

export const addAnswerToUniqQn = createAsyncThunk('products/addUniqQuestionAnswer', async ({ token, params }) => {
  try {
    const data = await postAnswerUniq(token, params)
    return data
  } catch (e) {
    console.error(e)
  }
})

export const addUserToFixedQuestionHighlight = createAsyncThunk(
  'products/postUserToHighlightFixed',
  async ({ token, id, params }) => {
    try {
      const data = await postUserToHighlightFixed(token, id, params)
      return data
    } catch (e) {
      console.error(e)
    }
  }
)

export const addUserToUniqQuestionHighlight = createAsyncThunk(
  'products/postUserToHighlightUniq',
  async ({ token, id, params }) => {
    try {
      const data = await postUserToHighlightUniq(token, id, params)
      return data
    } catch (e) {
      console.error(e)
    }
  }
)

export const removeUserFromFixedQuestionHighlight = createAsyncThunk(
  'products/deleteUserFromHighlightFixed',
  async ({ token, id, userId, questionIndex }) => {
    try {
      const data = await deleteUserFromHighlightFixed(token, id, userId, questionIndex)
      return data
    } catch (e) {
      console.error(e)
    }
  }
)

export const removeUserFromUniqQuestionHighlight = createAsyncThunk(
  'products/deleteUserFromHighlightUniq',
  async ({ token, id, userId, questionIndex }) => {
    try {
      const data = await deleteUserFromHighlightUniq(token, id, userId, questionIndex)
      return data
    } catch (e) {
      console.error(e)
    }
  }
)

export const addUserToFavorite = createAsyncThunk('products/addUserToFavorite', async ({ token, params }) => {
  try {
    const data = await postUserToFavorite(token, params)
    return data
  } catch (e) {
    console.error(e)
  }
})

export const removeUserFromFavorite = createAsyncThunk(
  'products/removeUserFromFavorite',
  async ({ token, productId, userId }) => {
    try {
      const data = await deleteUserFromFavorite(token, productId, userId)
      return data
    } catch (e) {
      console.error(e)
    }
  }
)

const productSlice = createSlice({
  name: 'product',
  initialState: { groupedProducts: [], postedProducts: [], savedProducts: [], loading: false },
  extraReducers: {
    [setProductsByGroup.pending]: (state) => {
      state.loading = true
    },
    [setProductsByGroup.fulfilled]: (state, action) => {
      state.groupedProducts = action.payload
      state.loading = false
    },
    [setProductsByGroup.rejected]: (state) => {
      state.loading = false
    },
    [setProductsByUserId.pending]: (state) => {
      state.loading = true
    },
    [setProductsByUserId.fulfilled]: (state, action) => {
      state.postedProducts = action.payload
      state.loading = false
    },
    [setProductsByUserId.rejected]: (state) => {
      state.loading = false
    },
    [setProductsByFavoredUserId.pending]: (state) => {
      state.loading = true
    },
    [setProductsByFavoredUserId.fulfilled]: (state, action) => {
      state.savedProducts = action.payload
      state.loading = false
    },
    [setProductsByFavoredUserId.rejected]: (state) => {
      state.loading = false
    },
    [createProduct.pending]: (state) => {
      state.loading = true
    },
    [createProduct.fulfilled]: (state, action) => {
      state.postedProducts.push(action.payload)
      state.loading = false
    },
    [createProduct.rejected]: (state) => {
      state.loading = false
    },
    [addQuestion.pending]: (state) => {
      state.loading = true
    },
    [addQuestion.fulfilled]: (state, action) => {
      const productIndex = lodash.findIndex(state.groupedProducts, { _id: action.payload._id })
      state.groupedProducts[productIndex] = action.payload
      state.loading = false
    },
    [addQuestion.rejected]: (state) => {
      state.loading = false
    },
    [addAnswerToFixedQn.pending]: (state) => {
      state.loading = true
    },
    [addAnswerToFixedQn.fulfilled]: (state, action) => {
      const productIndex = lodash.findIndex(state.groupedProducts, { _id: action.payload._id })
      state.groupedProducts[productIndex] = action.payload
      state.loading = false
    },
    [addAnswerToFixedQn.rejected]: (state) => {
      state.loading = false
    },
    [addAnswerToUniqQn.pending]: (state) => {
      state.loading = true
    },
    [addAnswerToUniqQn.fulfilled]: (state, action) => {
      const productIndex = lodash.findIndex(state.groupedProducts, { _id: action.payload._id })
      state.groupedProducts[productIndex] = action.payload
      state.loading = false
    },
    [addAnswerToUniqQn.rejected]: (state, action) => {
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
    [addUserToFavorite.pending]: (state) => {
      state.loading = true
    },
    [addUserToFavorite.fulfilled]: (state, action) => {
      state.savedProducts.push(action.payload)
      state.loading = false
    },
    [addUserToFavorite.rejected]: (state) => {
      state.loading = false
    },
    [removeUserFromFavorite.pending]: (state) => {
      state.loading = true
    },
    [removeUserFromFavorite.fulfilled]: (state, action) => {
      state.savedProducts = state.savedProducts.filter((product) => product._id !== action.payload._id)
      state.loading = false
    },
    [removeUserFromFavorite.rejected]: (state) => {
      state.loading = false
    },
  },
})

export default productSlice.reducer
