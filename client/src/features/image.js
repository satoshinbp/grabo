import { createSlice } from '@reduxjs/toolkit'

const initialStateValue = {
  ocrText: [],
  imageUrl: [],
  code: '',
}

const imageSlice = createSlice({
  name: 'image',
  initialState: { value: initialStateValue },
  reducers: {
    addImage: (state, action) => {
      state.value.ocrText.push(action.payload.text)
      state.value.imageUrl.push(action.payload.imageUrl)
      console.log(state.value.ocrText)
    },
    deleteImage: (state, action) => {
      state.value.ocrText = state.value.ocrText.filter((ocrText, index) => index !== action.payload.index)
      state.value.imageUrl = state.value.imageUrl.filter((imageUrl, index) => index !== action.payload.index)
    },

    updateCode: (state, action) => {
      state.value.code = action.payload
    },
  },
})

export const { addImage, updateCode, deleteImage } = imageSlice.actions
export default imageSlice.reducer
