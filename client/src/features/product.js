import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchUsersByGroup } from '../api/auth'
import {
  fetchProductById,
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
import lodash, { keys, cloneDeep } from 'lodash'

export const setProductsByGroup = createAsyncThunk('products/setByGroup', async ({ token, code }) => {
  const products = await fetchProductsByGroup(token, code)
  return products
})

export const setProductsByUserId = createAsyncThunk('products/setByUserId', async ({ token, userId }) => {
  const products = await fetchProductsByUserId(token, userId)
  return products
})

export const setProductsByFavoredUserId = createAsyncThunk('products/setByFavoredUserId', async ({ token, userId }) => {
  const products = await fetchProductsByFavoredUserId(token, userId)
  return products
})

export const navigateGroupProductById = createAsyncThunk('products/setById', async ({ token, id }) => {
  const product = await fetchProductById(token, id)
  RootNavigation.navigate('GroupsTab', { screen: 'GroupProduct', params: { id: product._id } })
  return product
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
    const { image } = getState()
    const { auth } = getState()
    const imageParams = new FormData()
    imageParams.append('image', { uri: image.value.uris[0], name: 'uploadedImage.jpeg', type: 'image/jpeg' })
    await postImage(token, imageParams)
    const product = await postProduct(token, productParams)

    const fetchedUsers = await fetchUsersByGroup(token, image.value.code)

    const notificationParams = {
      notifications: {
        read: false,
        message: `Help ${auth.user.firstName} to find this product`,
        productId: product._id,
      },
    }
    fetchedUsers.map((user) => patchUser(token, user._id, notificationParams))

    const notifiedUsers = fetchedUsers.filter((user) => user.isNotificationOn)
    const notificationTokens = await notifiedUsers.map((user) => user.notificationToken)
    notificationTokens.map((token) => sendPushNotification(token))

    dispatch(clearImage())

    RootNavigation.navigate('MyProductsTab', { screen: 'MyProduct', params: { id: product._id } })

    return product
  }
)

export const addQuestion = createAsyncThunk('products/addQuestion', async ({ token, params }) => {
  const product = await postQuestionUniq(token, params)
  return product
})

export const addAnswer = createAsyncThunk('products/addAnswer', async ({ token, params }) => {
  const product = await postAnswer(token, params)
  return product
})

export const highlightQuestion = createAsyncThunk('products/highlightQuestion', async ({ token, params }) => {
  const product = await postUserToHighlight(token, params)
  return product
})

export const unhighlightQuestion = createAsyncThunk('products/unhighlightQuestion', async ({ token, params }) => {
  const product = await deleteUserFromHighlight(token, params)
  return product
})

export const saveProduct = createAsyncThunk('products/save', async ({ token, params }) => {
  const product = await postUserToFavorite(token, params)
  return product
})

export const unsaveProduct = createAsyncThunk('products/unsave', async ({ token, params }) => {
  const product = await deleteUserFromFavorite(token, params)
  return product
})

const startLoading = (state) => {
  state.loading = true
}
const finishLoading = (state) => {
  state.loading = false
}
const setProducts = (state, category, products) => {
  state[category] = products
  state.loading = false
}
const updateProduct = (state, product) => {
  const groupedIroductIndex = lodash.findIndex(state.groupedProducts, { _id: product._id })
  state.groupedProducts[groupedIroductIndex] = product

  const postedIroductIndex = lodash.findIndex(state.postedProducts, { _id: product._id })
  if (postedIroductIndex !== -1) {
    state.postedProducts[postedIroductIndex] = product
  }

  const savedProductIndex = lodash.findIndex(state.savedProducts, { _id: product._id })
  if (savedProductIndex !== -1) {
    state.savedProducts[savedProductIndex] = product
  }

  state.loading = false
}

const productSlice = createSlice({
  name: 'product',
  initialState: { groupedProducts: [], postedProducts: [], savedProducts: [], loading: false },
  reducers: {
    sortGroupedProductsByDate: (state) => {
      state.groupedProducts = state.groupedProducts.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
    },
    sortGroupedProductsByHighlight: (state) => {
      let totalHighlightForEachProduct = []
      let sum
      let copiedProducts = cloneDeep(state.groupedProducts)
      let sortedGroupedProducts = []
      // extract total number of highlights from each product
      for (let i = 0; i < state.groupedProducts.length; i++) {
        sum = 0
        // fixed QandAs highlight total
        for (let j = 0; j < state.groupedProducts[i].fixedQandAs.length; j++) {
          sum += state.groupedProducts[i].fixedQandAs[j].highlightedBy.length
        }
        // uniq QandAs highlight total
        for (let k = 0; k < state.groupedProducts[i].uniqQandAs.length; k++) {
          sum += state.groupedProducts[i].uniqQandAs[k].highlightedBy.length
        }
        // store total highlight and product index
        totalHighlightForEachProduct.push({ totalHighlight: sum, index: totalHighlightForEachProduct.length })
      }

      // sort total highlight numbers by descending order
      totalHighlightForEachProduct.sort((a, b) => {
        return b.totalHighlight - a.totalHighlight
      })
      console.log('totalHighlightForEachProduct', totalHighlightForEachProduct)

      for (let i = 0; i < totalHighlightForEachProduct.length; i++) {
        sortedGroupedProducts.push(copiedProducts[totalHighlightForEachProduct[i].index])
      }
      console.log(sortedGroupedProducts)
      state.groupedProducts = sortedGroupedProducts
    },
  },
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

    [navigateGroupProductById.pending]: (state) => startLoading(state),
    [navigateGroupProductById.rejected]: (state) => finishLoading(state),
    [navigateGroupProductById.fulfilled]: (state, action) => {
      state.groupedProducts = [action.payload]
      state.loading = false
    },

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

export const { sortGroupedProductsByDate, sortGroupedProductsByHighlight } = productSlice.actions
export default productSlice.reducer
