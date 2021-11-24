import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { searchProducts } from '../api/product'
import { getOcrText } from '../api/image'
import * as RootNavigation from '../navigators/RootNavigation'
import lodash from 'lodash'

export const addImage = createAsyncThunk('image/add', async ({ base64, uri }, { getState }) => {
  const { locale, descriptions } = await getOcrText(base64)
  const { image } = getState()
  const texts = [...image.value.texts, ...descriptions]
  const keywords = lodash.sortedUniq(texts.sort()) // to sort and remove keywords duplication
  // await searchProducts(keywords) // WIP
  RootNavigation.navigate('SelectLanguage')
  return { keywords, uri, locale }
})

const initialStateValue = {
  texts: [],
  uris: [],
  code: '',
}

const imageSlice = createSlice({
  name: 'image',
  initialState: { value: initialStateValue, loading: false, error: '' },
  reducers: {
    updateCode: (state, action) => {
      state.value.code = action.payload
    },
    deleteImage: (state, action) => {
      state.value.texts = state.value.texts.filter((_, index) => index !== action.payload.index)
      state.value.uris = state.value.uris.filter((_, index) => index !== action.payload.index)
    },
    clearImage: (state) => {
      state.value = initialStateValue
    },
  },
  extraReducers: {
    [addImage.pending]: (state) => {
      state.loading = true
    },
    [addImage.fulfilled]: (state, action) => {
      state.value.texts = action.payload.keywords
      state.value.uris.push(action.payload.uri)
      state.value.code = action.payload.locale
      state.error = ''
      state.loading = false
    },
    [addImage.rejected]: (state) => {
      state.error = 'Failed. Please try another photo.'
      state.loading = false
    },
  },
})

export const { updateCode, deleteImage, clearImage } = imageSlice.actions
export default imageSlice.reducer
