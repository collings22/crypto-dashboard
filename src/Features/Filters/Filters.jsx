import Button from 'react-bootstrap/Button'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllCryptos } from './filtersReducer'
import Card from 'react-bootstrap/Card'
import { selectFilteredCryptos, toggleCryptoFilter } from '../../HOCSlices/filterSlice'

const Filters = () => {
    const dispatch = useDispatch()

    const data = useSelector((state) => selectAllCryptos(state))
    const filters = useSelector((state) => selectFilteredCryptos(state))

    const toggleFilter = e => dispatch({type: 'filters/toggleCryptoFilter', payload: e.target.value})

    return (
        <Card.Body>
            <Buttons data={data} filtered={filters} handleClick={toggleFilter} />
        </Card.Body>
    )
}

const Buttons = (props) => {

    return props.data.map((asset) => (
        <Button style={{ margin: '4px' }} onClick={props.handleClick} value={asset.asset_id} variant={props.filtered.includes(asset.asset_id) ? "primary" : "outline-primary"} key={asset.asset_id}>{asset.name}</Button>
    ));
}

export default Filters
