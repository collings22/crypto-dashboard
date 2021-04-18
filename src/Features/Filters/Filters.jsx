import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectAllCryptos } from './filtersReducer'
import Card from 'react-bootstrap/Card'
import { selectFilteredCryptos } from '../../HOCSlices/filterSlice'

const Filters = () => {
    const dispatch = useDispatch()

    const [filterCount, setFilterCount] = useState(5)

    let data = useSelector((state) => selectAllCryptos(state))
    const filters = useSelector((state) => selectFilteredCryptos(state))

    const toggleFilter = e => dispatch({ type: 'filters/toggleCryptoFilter', payload: e.target.value })
    const moreCryptoFilters = e => setFilterCount(filterCount + 5)

    return (
        <Card.Body>
            <Buttons data={data.slice(0, filterCount)} filtered={filters} handleToggle={toggleFilter} />
            <Button style={{ margin: '4px' }} onClick={moreCryptoFilters} value={5} variant="outline-primary" key="more">. . .</Button>
        </Card.Body>
    )
}

const Buttons = (props) => {
    return props.data.map((asset) =>
        (
            <Button style={{ margin: '4px' }} onClick={props.handleToggle} value={asset.asset_id} variant={props.filtered.includes(asset.asset_id) ? "primary" : "outline-primary"} key={asset.asset_id}>{asset.name}</Button>
        )
    );
}

export default Filters
