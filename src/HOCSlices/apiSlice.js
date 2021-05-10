import { createSlice } from '@reduxjs/toolkit'
import { fetchCoinData } from './apiThunk'

export const dataFetchSlice = createSlice({
  name: 'api',
  initialState: {
    data: [
      {
        label: '2021-05-01',
        type: 'DOT',
        USD: 5,
        GBP: 0,
        BTC: 10
      },
      {
        label: '2021-05-02',
        type: 'DOT',
        USD: 5,
        GBP: 0,
        BTC: 0
      },
      {
        label: '2021-05-03',
        type: 'DOT',
        USD: 0,
        GBP: 15,
        BTC: 0
      },
      {
        label: '2021-05-04',
        type: 'DOT',
        USD: 0,
        GBP: 5,
        BTC: 5
      },
      {
        label: '2021-05-05',
        type: 'DOT',
        USD: 15,
        GBP: 15,
        BTC: 0
      },
      {
        label: '2021-05-06',
        type: 'DOT',
        USD: 0,
        GBP: 10,
        BTC: 0
      },
      {
        label: '2021-05-01',
        type: 'ADA',
        USD: 0,
        GBP: 10,
        BTC: 10
      },
      {
        label: '2021-05-02',
        type: 'ADA',
        USD: 15,
        GBP: 10,
        BTC: 10
      },
      {
        label: '2021-05-03',
        type: 'ADA',
        USD: 10,
        GBP: 15,
        BTC: 10
      },
      {
        label: '2021-05-04',
        type: 'ADA',
        USD: 15,
        GBP: 15,
        BTC: 5
      },
      {
        label: '2021-05-05',
        type: 'ADA',
        USD: 5,
        GBP: 15,
        BTC: 15
      },
      {
        label: '2021-05-06',
        type: 'ADA',
        USD: 0,
        GBP: 0,
        BTC: 0
      },
      {
        label: '2021-05-01',
        type: 'BTC',
        USD: 15,
        GBP: 0,
        BTC: 10
      },
      {
        label: '2021-05-02',
        type: 'BTC',
        USD: 5,
        GBP: 10,
        BTC: 10
      },
      {
        label: '2021-05-03',
        type: 'BTC',
        USD: 0,
        GBP: 15,
        BTC: 10
      },
      {
        label: '2021-05-04',
        type: 'BTC',
        USD: 15,
        GBP: 15,
        BTC: 15
      },
      {
        label: '2021-05-05',
        type: 'BTC',
        USD: 5,
        GBP: 15,
        BTC: 15
      },
      {
        label: '2021-05-06',
        type: 'BTC',
        USD: 0,
        GBP: 10,
        BTC: 10
      },
      {
        label: '2021-05-01',
        type: 'eGLD',
        USD: 5,
        GBP: 10,
        BTC: 10
      },
      {
        label: '2021-05-02',
        type: 'eGLD',
        USD: 5,
        GBP: 10,
        BTC: 10
      },
      {
        label: '2021-05-03',
        type: 'eGLD',
        USD: 10,
        GBP: 15,
        BTC: 10
      },
      {
        label: '2021-05-04',
        type: 'eGLD',
        USD: 15,
        GBP: 15,
        BTC: 0
      },
      {
        label: '2021-05-05',
        type: 'eGLD',
        USD: 15,
        GBP: 0,
        BTC: 15
      },
      {
        label: '2021-05-06',
        type: 'eGLD',
        USD: 10,
        GBP: 15,
        BTC: 0
      },
      {
        label: '2021-05-01',
        type: 'ETH',
        USD: 5,
        GBP: 0,
        BTC: 5
      },
      {
        label: '2021-05-02',
        type: 'ETH',
        USD: 5,
        GBP: 5,
        BTC: 10
      },
      {
        label: '2021-05-03',
        type: 'ETH',
        USD: 5,
        GBP: 15,
        BTC: 0
      },
      {
        label: '2021-05-04',
        type: 'ETH',
        USD: 0,
        GBP: 5,
        BTC: 0
      },
      {
        label: '2021-05-05',
        type: 'ETH',
        USD: 10,
        GBP: 15,
        BTC: 0
      },
      {
        label: '2021-05-06',
        type: 'ETH',
        USD: 0,
        GBP: 10,
        BTC: 0
      }

    ],
    status: 'idle',
    error: null
  },
  reducers: {
    randomiseCryptoData: (state, action) => {
      const currentData = action.payload
      const randomisedData = currentData.map(o => { return { ...o, USD: Math.round(Math.random() * 15), GBP: Math.round(Math.random() * 15), BTC: Math.round(Math.random() * 15) } })
      state.data = randomisedData
    }
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
