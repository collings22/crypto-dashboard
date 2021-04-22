import { createSlice } from '@reduxjs/toolkit'
import { fetchCoinData } from './apiThunk'

export const dataFetchSlice = createSlice({
  name: 'api',
  initialState: {
    data: [{
      asset_id: "BTC",
      name: "Bitcoin"
    },
    {
      asset_id: "ADA",
      name: "Cardano"
    },
    {
      asset_id: "ETH",
      name: "Ethereum"
    },
    {
      asset_id: "DOT",
      name: "Polkadot"
    },
    {
      asset_id: "eGLD",
      name: "Elrond"
    },
    {
      asset_id: "LINK",
      name: "Chainlink"
    },
    {
      asset_id: "DOGE",
      name: "Dogecoin"
    },
    {
      asset_id: "NU",
      name: "NuCypher"
    },
    {
      asset_id: "LTC",
      name: "Litecoin"
    },
    {
      asset_id: "ALGO",
      name: "Algorand"
    },
    {
      asset_id: "VET",
      name: "VeChain"
    },
    {
      asset_id: "SOL",
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
