import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Filters from '../Features/Filters'
import { SimpleLineChart, SimpleMultiLineChart } from '../Components/LineCharts'
import { SimpleBarChart, SimpleStackedBarChart } from '../Components/BarCharts'
import { useSelector, useDispatch } from 'react-redux'

const Home = () => {
  const dispatch = useDispatch()

  const data = useSelector((state) => state.api.data)
  const filteredCryptos = useSelector((state) => state.filters.cryptos)
  const comparableData = data.filter(f => filteredCryptos.includes(f.type))

  return (
    <Container fluid>
      <Button onClick={e => dispatch({type: 'api/randomiseCryptoData', payload: data})}>Randomise Data</Button>

      <Card className='mb-3'>
        <Card.Body>
          <Filters />
          <Row>
            <Col><SimpleLineChart chartData={comparableData} /></Col>
            <Col><SimpleStackedBarChart chartData={comparableData} /></Col>
            <Col><SimpleBarChart chartData={comparableData} /></Col>
          </Row>
          <Row>
            <Col><SimpleMultiLineChart chartData={comparableData} /></Col>
            <Col><SimpleMultiLineChart chartData={comparableData} /></Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Home
