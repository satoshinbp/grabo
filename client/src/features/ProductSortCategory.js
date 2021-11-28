import { createSlice } from '@reduxjs/toolkit'

const sortCategorySlice = createSlice({
  name: 'sortCategory',

  initialState: {
    categoryIsDate: true, // sort by date or highlight
  },

  reducers: {
    switchSortCategory: (state, param) => {
      state.categoryIsDate = param.payload
    },
  },
})

const { actions, reducer } = sortCategorySlice
export const { switchSortCategory } = actions
export default reducer
