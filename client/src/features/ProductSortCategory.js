import { createSlice } from '@reduxjs/toolkit'

const sortCategorySlice = createSlice({
  name: 'sortCategory',

  initialState: {
    isSortedByDate: true, // sort by date or highlight
  },

  reducers: {
    switchSortCategory: (state, param) => {
      state.isSortedByDate = param.payload
    },
  },
})

const { actions, reducer } = sortCategorySlice
export const { switchSortCategory } = actions
export default reducer
