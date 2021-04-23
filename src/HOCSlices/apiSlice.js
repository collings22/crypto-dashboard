import { createSlice } from '@reduxjs/toolkit'
import { fetchCoinData } from './apiThunk'

export const dataFetchSlice = createSlice({
  name: 'api',
  initialState: {
    data: [{
      id: "BTC",
      name: "Bitcoin"
    },
    {
      id: "ADA",
      name: "Cardano"
    },
    {
      id: "ETH",
      name: "Ethereum"
    },
    {
      id: "DOT",
      name: "Polkadot"
    },
    {
      id: "eGLD",
      name: "Elrond"
    },
    {
      id: "LINK",
      name: "Chainlink"
    },
    {
      id: "DOGE",
      name: "Dogecoin"
    },
    {
      id: "NU",
      name: "NuCypher"
    },
    {
      id: "LTC",
      name: "Litecoin"
    },
    {
      id: "ALGO",
      name: "Algorand"
    },
    {
      id: "VET",
      name: "VeChain"
    },
    {
      id: "SOL",
      name: "Solana"
    }
  ], status: 'idle', error: null,
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
