import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectAllCryptos } from './filtersReducer'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Accordion from 'react-bootstrap/Accordion'
import { selectFilteredCryptos } from '../../HOCSlices/filterSlice'

const Filters = () => {
    const dispatch = useDispatch()

    const [filterCount, setFilterCount] = useState(5)

    let data = useSelector((state) => selectAllCryptos(state))
    const filters = useSelector((state) => selectFilteredCryptos(state))
   
    const handleReduxAction = (actionType, obj) => dispatch({ type: actionType, payload: obj.target.value })
    const moreCryptoFilters = () => setFilterCount(filterCount + 1)

    return (
        <Accordion defaultActiveKey="0">
            <Card>
                <Card.Header style={{display: 'inline-flex'}}>
                    <Accordion.Toggle style={{bordeRadius: '0 !important'}} as={Card.Header} variant="info" eventKey="0">
                        Cryptos{' '}
                        <Badge variant="light">{filters.length}</Badge>
      </Accordion.Toggle>
      <Accordion.Toggle style={{bordeRadius: '0 !important'}} as={Card.Header} variant="info" eventKey="1">
                        Period{' '}
                        <Badge variant="light">{filters.length}wks</Badge>
      </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Badge style={{ float: 'right' }} pill variant="danger" type='filters/clearCryptoFilter' onClick={e => handleReduxAction('filters/clearCryptoFilter', e)}>
                            Clear
                        </Badge>
                        <Buttons data={data.slice(0, filterCount)} filtered={filters} type='filters/toggleCryptoFilter' handleToggle={handleReduxAction} />
                        <Button style={{ margin: '4px' }} hidden={data.length === filterCount ? true : false} onClick={moreCryptoFilters} variant="outline-info" key="more">. . .</Button>
                    </Card.Body>
                </Accordion.Collapse>

                <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        Placeholder
                    </Card.Body>
                </Accordion.Collapse>

            </Card>
        </Accordion>
    )
}

const Buttons = (props) => {
    return props.data.map((asset) =>
    (
        <Button style={{ margin: '4px' }} onClick={e => props.handleToggle(props.type, e)} value={asset.asset_id} variant={props.filtered.includes(asset.asset_id) ? "info" : "outline-info"} key={"_" + asset.asset_id}>{asset.name}</Button>
    )
    );
}

export default Filters
