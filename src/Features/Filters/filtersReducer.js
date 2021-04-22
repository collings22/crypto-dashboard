export const selectAllCryptos = (state) => {
    let data = state.api.data
    /*data = data.map(o => {
        if (o.type_is_crypto === 1 && o.volume_1mth_usd > 1000000000) return { ...o, name: o.name, id: o.asset_id }
        return undefined
    }).filter(obj => obj !== undefined)

    data = data.filter(o => o.name !== undefined)*/

    let selectedCryptos = state.filters.cryptos

    let selectedInArrayFirst = data.filter(a => selectedCryptos.includes(a.asset_id))

    let mergedArrayWithSelectedAtStartOfArray = [...selectedInArrayFirst, ...data]

    return mergedArrayWithSelectedAtStartOfArray.filter((v,i,a)=> a.findIndex(t=>(t.asset_id === v.asset_id))===i)
}
