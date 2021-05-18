import { configureStore } from '@reduxjs/toolkit'
import dataFetchReducer from './Redux/apiSlice'
import filtersReducer from './Redux/filterSlice'

export default configureStore({
  reducer: {
    api: dataFetchReducer,
    filters: filtersReducer
  }
})
