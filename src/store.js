import { configureStore } from '@reduxjs/toolkit'
import dataFetchReducer from './HOCSlices/apiSlice'
import filtersReducer from './HOCSlices/filterSlice'


export default configureStore({
  reducer: {
    api: dataFetchReducer,
    filters: filtersReducer
  }
})
