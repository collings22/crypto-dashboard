import { createSlice } from '@reduxjs/toolkit'

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    cryptos: [],
    timePeriod: null
  },
  reducers: {
    setTimePeriod: (state, action) => state.timePeriod = action.payload.value,
    clearCryptoFilter: (state, action) => {
    state.cryptos = []
    },
    toggleCryptoFilter: (state, action) => {
      if (state.cryptos.includes(action.payload)) {
        state.cryptos = state.cryptos.filter(el => el !== action.payload)
      }
      else {
        state.cryptos.push(action.payload)
      }
    }
  }
})



export const selectTimePeriod = state => state.filters.timePeriod
export const selectFilteredCryptos = state => state.filters.cryptos

export const { toggleCryptoFilter, clearCryptoFilter, setTimePeriod } = filtersSlice.actions

export default filtersSlice.reducer
