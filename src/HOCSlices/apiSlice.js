import { createSlice } from '@reduxjs/toolkit'
import { fetchCoinData } from './apiThunk'

export const dataFetchSlice = createSlice({
  name: 'api',
  initialState: {
    data: [], status: 'idle', error: null,
  },
  reducers: {

  },
  extraReducers: {
    [fetchCoinData.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error
    },
    [fetchCoinData.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchCoinData.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.data = action.payload
    }
  }
})

export default dataFetchSlice.reducer
