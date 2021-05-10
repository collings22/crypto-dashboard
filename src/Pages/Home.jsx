import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Filters from '../Features/Filters'
import { SimpleLineChart, SimpleMultiLineChart } from '../Components/LineCharts'
import { SimpleBarChart, SimpleStackedBarChart } from '../Components/BarCharts'
import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'

const Home = () => {
  const dispatch = useDispatch()

  const data = useSelector((state) => state.api.data)
  const filteredCryptos = useSelector((state) => state.filters.cryptos)
  const comparableData = data.filter(f => filteredCryptos.includes(f.type))

  const [singleChartFilter, setSingleChartFilter] = useState(filteredCryptos[0])

  useEffect(() => {
    if (!filteredCryptos.includes(singleChartFilter) && filteredCryptos.length > 0) setSingleChartFilter(filteredCryptos[filteredCryptos.length - 1])
    else if (filteredCryptos.length === 0) setSingleChartFilter(null)
  }, [filteredCryptos, singleChartFilter])

  const handleFilterSingleChart = d => setSingleChartFilter(d)

  return (
    <Container fluid>
      <Button style={{ border: 'white solid 2px', bottom: '25px', boxShadow: '5px 5px 10px 1px #888888', right: '15px', zIndex: 1, position: 'fixed' }} onClick={e => dispatch({ type: 'api/randomiseCryptoData', payload: data })}>Randomise Data</Button>
      <Card className='mb-3'>
        <Card.Body>
          <Filters />
          <br />
          <h2>{singleChartFilter}</h2>
          <Row>
            <Col><SimpleLineChart chartData={comparableData.filter(f => f.type === singleChartFilter)} /></Col>
            <Col><SimpleStackedBarChart chartData={comparableData.filter(f => f.type === singleChartFilter)} /></Col>
            <Col><SimpleBarChart chartData={comparableData.filter(f => f.type === singleChartFilter)} /></Col>
          </Row>
          <hr />
          <Row>
            <Col><SimpleMultiLineChart handleFilterSingleViewChartsCallback={handleFilterSingleChart} chartData={comparableData} /></Col>
            <Col><SimpleMultiLineChart handleFilterSingleViewChartsCallback={handleFilterSingleChart} chartData={comparableData} /></Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Home
