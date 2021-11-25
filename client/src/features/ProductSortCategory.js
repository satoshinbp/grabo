import { createSlice } from '@reduxjs/toolkit'
import * as RootNavigation from '../navigators/RootNavigation'
import lodash from 'lodash'
import { ParallaxImage } from 'react-native-snap-carousel'

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
