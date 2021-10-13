import { createSlice } from '@reduxjs/toolkit'
import products from '../mocks/products'

const initialStateValue = []

const productsSlice = createSlice({
  name: 'products',
  initialState: { value: initialStateValue },
  reducers: {
    setProducts: (state, action) => {
      state.value = products
    },
    addProducts: (state, action) => {
      state.value.push(action.payload)
    },
  },
})

export const { setProducts, addProducts } = productsSlice.actions
export default productsSlice.reducer
