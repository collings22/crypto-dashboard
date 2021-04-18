import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchCoinData = createAsyncThunk('api/fetchCoinData', async () => {
  return await axios(`http://rest-sandbox.coinapi.io/v1/assets?apikey=0471F36D-9235-4055-B7B8-A6E25A4D54F4`)
    .then(res => {
        console.log(res.data)
        console.log(Object.keys(res.data).map(i => res.data[i]))
        return Object.keys(res.data).map(i => res.data[i])
    })
    .catch(err => Promise.reject(err))
},
{
  condition: (e, { getState, extra }) => {
    const state = getState()
    const fetchStatus = state.api.status
    if (fetchStatus === 'fulfilled' || fetchStatus === 'loading') {
      return false
    }
  }
})



