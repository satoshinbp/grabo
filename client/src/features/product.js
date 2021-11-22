import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchUsersByGroup } from '../api/auth'
import {
  fetchProductsByGroup,
  fetchProductsByUserId,
  fetchProductsByFavoredUserId,
  postProduct,
  postQuestionUniq,
  postAnswer,
  postUserToHighlight,
  deleteUserFromHighlight,
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

export const addAnswer = createAsyncThunk('products/addAnswer', async ({ token, params }) => {
  try {
    const data = await postAnswer(token, params)
    return data
  } catch (e) {
    console.error(e)
  }
})

export const highlightQuestion = createAsyncThunk('products/highlightQuestion', async ({ token, params }) => {
  try {
    const data = await postUserToHighlight(token, params)
    return data
  } catch (e) {
    console.error(e)
  }
})

export const unhighlightQuestion = createAsyncThunk('products/unhighlightQuestion', async ({ token, params }) => {
  try {
    const data = await deleteUserFromHighlight(token, params)
    return data
  } catch (e) {
    console.error(e)
  }
})

export const saveProduct = createAsyncThunk('products/save', async ({ token, params }) => {
  try {
    const data = await postUserToFavorite(token, params)
    return data
  } catch (e) {
    console.error(e)
  }
})

export const unsaveProduct = createAsyncThunk('products/unsave', async ({ token, params }) => {
  try {
    const data = await deleteUserFromFavorite(token, params)
    return data
  } catch (e) {
    console.error(e)
  }
})

const startLoading = (state) => {
  state.loading = true
}
const finishLoading = (state) => {
  state.loading = true
}
const setProducts = (state, category, products) => {
  state[category] = products
  state.loading = false
}
const updateProduct = (state, product) => {
  const productIndex = lodash.findIndex(state.groupedProducts, { _id: product._id })
  state.groupedProducts[productIndex] = product
  state.loading = false
}

const productSlice = createSlice({
  name: 'product',
  initialState: { groupedProducts: [], postedProducts: [], savedProducts: [], loading: false },
  extraReducers: {
    [setProductsByGroup.pending]: (state) => startLoading(state),
    [setProductsByGroup.rejected]: (state) => finishLoading(state),
    [setProductsByGroup.fulfilled]: (state, action) => setProducts(state, 'groupedProducts', action.payload),

    [setProductsByUserId.pending]: (state) => startLoading(state),
    [setProductsByUserId.rejected]: (state) => finishLoading(state),
    [setProductsByUserId.fulfilled]: (state, action) => setProducts(state, 'postedProducts', action.payload),

    [setProductsByFavoredUserId.pending]: (state) => startLoading(state),
    [setProductsByFavoredUserId.rejected]: (state) => finishLoading(state),
    [setProductsByFavoredUserId.fulfilled]: (state, action) => setProducts(state, 'savedProducts', action.payload),

    [createProduct.pending]: (state) => startLoading(state),
    [createProduct.rejected]: (state) => finishLoading(state),
    [createProduct.fulfilled]: (state, action) => {
      state.postedProducts.push(action.payload)
      state.loading = false
    },

    [addQuestion.pending]: (state) => startLoading(state),
    [addQuestion.rejected]: (state) => finishLoading(state),
    [addQuestion.fulfilled]: (state, action) => updateProduct(state, action.payload),

    [addAnswer.pending]: (state) => startLoading(state),
    [addAnswer.rejected]: (state) => finishLoading(state),
    [addAnswer.fulfilled]: (state, action) => updateProduct(state, action.payload),

    [highlightQuestion.pending]: (state) => startLoading(state),
    [highlightQuestion.rejected]: (state) => finishLoading(state),
    [highlightQuestion.fulfilled]: (state, action) => updateProduct(state, action.payload),

    [unhighlightQuestion.pending]: (state) => startLoading(state),
    [unhighlightQuestion.rejected]: (state) => finishLoading(state),
    [unhighlightQuestion.fulfilled]: (state, action) => updateProduct(state, action.payload),

    [saveProduct.pending]: (state) => startLoading(state),
    [saveProduct.rejected]: (state) => finishLoading(state),
    [saveProduct.fulfilled]: (state, action) => {
      state.savedProducts.push(action.payload)
      state.loading = false
    },

    [unsaveProduct.pending]: (state) => startLoading(state),
    [unsaveProduct.rejected]: (state) => finishLoading(state),
    [unsaveProduct.fulfilled]: (state, action) => {
      state.savedProducts = state.savedProducts.filter((product) => product._id !== action.payload._id)
      state.loading = false
    },
  },
})

export default productSlice.reducer
