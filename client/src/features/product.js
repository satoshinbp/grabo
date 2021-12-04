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

export const setProductsByGroup = createAsyncThunk('products/setByGroup', async ({ token, codes }) => {
  const fetchedProducts = await Promise.all(codes.map((code) => fetchProductsByGroup(token, code)))
  const products = lodash.flatten(fetchedProducts).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  return lodash.flatten(products)
})

export const setProductFromNotification = createAsyncThunk('products/setById', async ({ token, id }) => {
  const product = await fetchProductById(token, id)
  RootNavigation.navigate('GroupsTab', { screen: 'GroupProduct', params: { id } })
  return product
})

export const setProductsByUserId = createAsyncThunk('products/setByUserId', async ({ token, userId }) => {
  const fetchedProducts = await fetchProductsByUserId(token, userId)
  const products = fetchedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  return products
})

export const setProductsByFavoredUserId = createAsyncThunk('products/setByFavoredUserId', async ({ token, userId }) => {
  const fetchedProducts = await fetchProductsByFavoredUserId(token, userId)
  const products = fetchedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  return products
})

const sendPushNotification = async (expoPushToken, productId) => {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Help',
    body: 'Someone is waiting for your help!',
    data: { productId: productId },
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

    const postImagePromises = image.value.uris.map((uri) => {
      const imageParams = new FormData()
      imageParams.append('image', { uri, name: 'uploadedImage.jpeg', type: 'image/jpeg' })
      return postImage(token, imageParams)
    })
    const urls = await Promise.all(postImagePromises)

    productParams.urls = urls
    const product = await postProduct(token, productParams)

    const fetchedUsers = await fetchUsersByGroup(token, image.value.code)
    const notificationParams = {
      notifications: {
        read: false,
        message: `Help ${auth.user.firstName} to find this product`,
        productId: product._id,
      },
    }
    const patchUserPromises = fetchedUsers.map((user) => patchUser(token, user._id, notificationParams))
    await Promise.all(patchUserPromises)

    const notifiedUsers = fetchedUsers.filter((user) => user.isNotificationOn)
    const notificationTokens = notifiedUsers.map((user) => user.notificationToken)
    const notificationPromises = notificationTokens.map((token) => sendPushNotification(token, product._id))
    await Promise.all(notificationPromises)

    dispatch(clearImage())
    // RootNavigation.navigate('MyProductsTab')
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

export const unsaveProduct = createAsyncThunk('products/unsave', async ({ token, route, params }) => {
  const product = await deleteUserFromFavorite(token, params)
  if (route === 'Favorite') {
    RootNavigation.navigate('Favorites')
  }
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
  const groupedProductIndex = lodash.findIndex(state.groupedProducts, { _id: product._id })
  if (groupedProductIndex !== -1) {
    state.groupedProducts[groupedProductIndex] = product
  }

  const postedProductIndex = lodash.findIndex(state.postedProducts, { _id: product._id })
  if (postedProductIndex !== -1) {
    state.postedProducts[postedProductIndex] = product
  }

  const savedProductIndex = lodash.findIndex(state.savedProducts, { _id: product._id })
  if (savedProductIndex !== -1) {
    state.savedProducts[savedProductIndex] = product
  }

  state.loading = false
}
const selectProductsByRoute = (route) => {
  switch (route) {
    case 'Group':
      return 'groupedProducts'
    case 'MyProducts':
      return 'postedProducts'
    case 'Favorites':
      return 'savedProducts'
    default:
      return null
  }
}

const productSlice = createSlice({
  name: 'product',
  initialState: { groupedProducts: [], postedProducts: [], savedProducts: [], loading: false },
  reducers: {
    sortProductsByDate: (state, action) => {
      const productsType = selectProductsByRoute(action.payload)
      state[productsType].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    },
    sortProductsByHighlight: (state, action) => {
      const productsType = selectProductsByRoute(action.payload)
      let highlightSum = 0

      const productsWithHighlightSum = state[productsType].map((product) => {
        product.fixedQandAs.forEach((question) => {
          highlightSum += question.highlightedBy.length
        })
        product.uniqQandAs.forEach((question) => {
          highlightSum += question.highlightedBy.length
        })
        return { ...product, highlightSum }
      })

      state[productsType] = productsWithHighlightSum.sort((a, b) => b.highlightSum - a.highlightSum)
    },
  },
  extraReducers: {
    [setProductsByGroup.pending]: (state) => startLoading(state),
    [setProductsByGroup.rejected]: (state) => finishLoading(state),
    [setProductsByGroup.fulfilled]: (state, action) => setProducts(state, 'groupedProducts', action.payload),

    [setProductFromNotification.pending]: (state) => startLoading(state),
    [setProductFromNotification.rejected]: (state) => finishLoading(state),
    [setProductFromNotification.fulfilled]: (state, action) => {
      state.groupedProducts.push(action.payload)
      state.loading = false
    },

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
      updateProduct(state, action.payload)
    },

    [unsaveProduct.pending]: (state) => startLoading(state),
    [unsaveProduct.rejected]: (state) => finishLoading(state),
    [unsaveProduct.fulfilled]: (state, action) => {
      state.savedProducts = state.savedProducts.filter((product) => product._id !== action.payload._id)
      updateProduct(state, action.payload)
    },
  },
})

export const { sortProductsByDate, sortProductsByHighlight } = productSlice.actions
export default productSlice.reducer
