import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getOcrText, searchProducts } from '../api/product'

export const addImage = createAsyncThunk('image/add', async ({ base64, uri }) => {
  const { locale, descriptions } = await getOcrText(base64)
  const keywords = [...new Set(descriptions)] // to remove keyword duplication
  // await searchProducts(keywords) // WIP
  return { keywords, uri, locale }
})

const initialStateValue = {
  texts: [],
  uris: [],
  code: '',
}

const imageSlice = createSlice({
  name: 'image',
  initialState: { value: initialStateValue, loading: false, status: 'idle' },
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
      state.status = 'idle'
    },
  },
  extraReducers: {
    [addImage.pending]: (state) => {
      state.loading = true
    },
    [addImage.fulfilled]: (state, action) => {
      action.payload.keywords.forEach((keyword) => {
        if (!state.value.texts.includes(keyword)) {
          state.value.texts.push(keyword)
        }
      })
      state.value.uris.push(action.payload.uri)
      state.value.code = action.payload.locale
      state.loading = false
      state.status = 'success'
    },
    [addImage.rejected]: (state) => {
      state.loading = false
      state.status = 'fail'
    },
  },
})

export const { updateCode, deleteImage, clearImage } = imageSlice.actions
export default imageSlice.reducer
