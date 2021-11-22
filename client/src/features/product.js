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
import { patchUser } from '../api/auth'
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
      const { auth } = getState()
      const imageParams = new FormData()
      imageParams.append('image', { uri: image.value.uris[0], name: 'uploadedImage.jpeg', type: 'image/jpeg' })
      await postImage(token, imageParams)
      const data = await postProduct(token, productParams)

      const fetchedUsers = await fetchUsersByGroup(token, image.value.code)

      const notificationParams = {
        notifications: {
          read: false,
          message: `Help ${auth.user.firstName} to find this product`,
          productId: data._id,
        },
      }
      fetchedUsers.map((user) => patchUser(token, user._id, notificationParams))

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

export const addUserToHighlightFixed = createAsyncThunk(
  'products/postUserToHighlightFixed',
  async ({ token, params }) => {
    try {
      const data = await postUserToHighlightFixed(token, params)
      return data
    } catch (e) {
      console.error(e)
    }
  }
)

export const addUserToHighlightUniq = createAsyncThunk(
  'products/postUserToHighlightUniq',
  async ({ token, params }) => {
    try {
      const data = await postUserToHighlightUniq(token, params)
      return data
    } catch (e) {
      console.error(e)
    }
  }
)

export const removeUserFromHighlightFixed = createAsyncThunk(
  'products/deleteUserFromHighlightFixed',
  async ({ token, params }) => {
    try {
      const data = await deleteUserFromHighlightFixed(token, params)
      return data
    } catch (e) {
      console.error(e)
    }
  }
)

export const removeUserFromHighlightUniq = createAsyncThunk(
  'products/deleteUserFromHighlightUniq',
  async ({ token, params }) => {
    try {
      const data = await deleteUserFromHighlightUniq(token, params)
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

export const removeUserFromFavorite = createAsyncThunk('products/removeUserFromFavorite', async ({ token, params }) => {
  try {
    const data = await deleteUserFromFavorite(token, params)
    return data
  } catch (e) {
    console.error(e)
  }
})

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
    [addAnswerToUniqQn.rejected]: (state) => {
      state.loading = false
    },
    [addUserToHighlightFixed.pending]: (state) => {
      state.loading = true
    },
    [addUserToHighlightFixed.fulfilled]: (state, action) => {
      state.product = action.payload
      state.loading = false
    },
    [addUserToHighlightFixed.rejected]: (state) => {
      state.loading = false
    },
    [addUserToHighlightUniq.pending]: (state, action) => {
      state.loading = true
    },
    [addUserToHighlightUniq.fulfilled]: (state, action) => {
      state.product = action.payload
      state.loading = false
    },
    [addUserToHighlightUniq.rejected]: (state) => {
      state.loading = false
    },
    [removeUserFromHighlightFixed.pending]: (state) => {
      state.loading = true
    },
    [removeUserFromHighlightFixed.fulfilled]: (state, action) => {
      state.product = action.payload
      state.loading = false
    },
    [removeUserFromHighlightFixed.rejected]: (state) => {
      state.loading = false
    },
    [removeUserFromHighlightUniq.pending]: (state) => {
      state.loading = true
    },
    [removeUserFromHighlightUniq.fulfilled]: (state, action) => {
      state.product = action.payload
      state.loading = false
    },
    [removeUserFromHighlightUniq.rejected]: (state) => {
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
