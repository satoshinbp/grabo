import { createSlice } from '@reduxjs/toolkit'
import { fetchProductsByGroup } from '../utils/api'

const initialStateValue = []

const productsSlice = createSlice({
  name: 'products',
  initialState: { value: initialStateValue },
  reducers: {
    setProductsByGroup: (state, action) => {
      const fetchedProducts = fetchProductsByGroup(action.payload)
      state.value = fetchedProducts
    },
  },
})

export const { setProductsByGroup } = productsSlice.actions
export default productsSlice.reducer
