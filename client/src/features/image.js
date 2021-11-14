import { createSlice } from '@reduxjs/toolkit'

const initialStateValue = {
  ocrText: [],
  uris: [],
  code: '',
}

const imageSlice = createSlice({
  name: 'image',
  initialState: initialStateValue,
  reducers: {
    addImage: (state, action) => {
      action.payload.keywords.forEach((keyword) => {
        if (!state.ocrText.includes(keyword)) {
          state.ocrText.push(keyword)
        }
      })
      state.uris.push(action.payload.uri)
    },
    deleteImage: (state, action) => {
      state.ocrText = state.ocrText.filter((_, index) => index !== action.payload.index)
      state.uris = state.uris.filter((_, index) => index !== action.payload.index)
    },
    clearProduct: (state) => {
      state = initialStateValue
    },
    updateCode: (state, action) => {
      state.code = action.payload
    },
  },
})

export const { addImage, updateCode, deleteImage, uploadImage, clearProduct } = imageSlice.actions
export default imageSlice.reducer
