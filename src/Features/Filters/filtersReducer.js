export const selectAllCryptos = (state) => {
    let data = state.api.data
    data = data.map(o => {
        if (o.type_is_crypto === 1 && o.volume_1mth_usd > 1000000000) return { ...o, name: o.name, id: o.asset_id }
        return undefined
    }).filter(obj => obj !== undefined)

    return data.sort((a, b) => a.id > b.id)
}
