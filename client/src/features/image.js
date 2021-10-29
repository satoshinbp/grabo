import { createSlice } from '@reduxjs/toolkit'

const initialStateValue = {
  ocrText: [],
  imageUrl: [],
  code: [],
}

const imageSlice = createSlice({
  name: 'image',
  initialState: { value: initialStateValue },
  reducers: {
    setOcrText: (state, action) => {
      state.value.ocrText.push(action.payload)
    },
    setImageUrl: (state, action) => {
      state.value.imageUrl.push(action.payload)
    },
    setCode: (state, action) => {
      state.value.code = action.payload
    },
  },
})

export const { setOcrText, setImageUrl, setCode } = imageSlice.actions
export default imageSlice.reducer
