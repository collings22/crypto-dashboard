import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectAllCryptos } from './filtersReducer'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import { selectFilteredCryptos } from '../../HOCSlices/filterSlice'

const Filters = () => {
    const dispatch = useDispatch()

    const [filterCount, setFilterCount] = useState(5)

    let data = useSelector((state) => selectAllCryptos(state))
    const filters = useSelector((state) => selectFilteredCryptos(state))

    const toggleFilter = e => dispatch({ type: 'filters/toggleCryptoFilter', payload: e.target.value })
    const moreCryptoFilters = () => setFilterCount(filterCount + 5)

    return (
        <Accordion defaultActiveKey="99">
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Cryptos
      </Accordion.Toggle>|
      <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        Volume
      </Accordion.Toggle>|
      <Accordion.Toggle as={Button} variant="link" eventKey="2">
                        Time Period
      </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Buttons data={data.slice(0, filterCount)} filtered={filters} handleToggle={toggleFilter} />
                        <Button style={{ margin: '4px' }} onClick={moreCryptoFilters} variant="outline-primary" key="more">. . .</Button>
                    </Card.Body>
                </Accordion.Collapse>

                <Accordion.Collapse eventKey="1">
                    <Card.Body>
                   Placeholder
                    </Card.Body>
                </Accordion.Collapse>

                <Accordion.Collapse eventKey="2">
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
        <Button style={{ margin: '4px' }} onClick={props.handleToggle} value={asset.asset_id} variant={props.filtered.includes(asset.asset_id) ? "primary" : "outline-primary"} key={asset.asset_id}>{asset.name}</Button>
    )
    );
}

export default Filters
