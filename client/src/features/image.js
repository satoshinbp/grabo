import { createSlice } from '@reduxjs/toolkit'

// const initialStateValue = {
//   ocrText: '',
//   imageUrl: '',
//   code: '',
// }
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
      state.ocrText = action.payload
    },
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload
    },
    setCode: (state, action) => {
      state.code = action.payload
    },
  },
})

// const imageSlice = createSlice({
//   name: 'image',
//   initialState: { value: initialStateValue },
//   reducers: {
//     setOcrText: (state, action) => {
//       state.ocrText = state.ocrText.push(action.payload)
//     },
//     setImageUrl: (state, action) => {
//       state.imageUrl = state.imageUrl.push(action.payload)
//     },
//     setCode: (state, action) => {
//       state.code = state.code.push(action.payload)
//     },
//   },
// })

export const { setOcrText, setImageUrl, setCode } = imageSlice.actions
export default imageSlice.reducer
