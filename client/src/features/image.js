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
      state.code = action.payload.code
    },
    deleteImage: (state, action) => {
      state.ocrText = state.ocrText.filter((_, index) => index !== action.payload.index)
      state.uris = state.uris.filter((_, index) => index !== action.payload.index)
    },
    clearImage: (state) => {
      state = initialStateValue
    },
  },
})

export const { addImage, deleteImage, clearImage } = imageSlice.actions
export default imageSlice.reducer
