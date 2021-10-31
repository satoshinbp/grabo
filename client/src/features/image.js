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
    },
    updateCode: (state, action) => {
      state.value.code = action.payload
    },
  },
})

export const { addImage, updateCode } = imageSlice.actions
export default imageSlice.reducer
