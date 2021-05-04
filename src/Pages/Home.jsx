import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Filters from '../Features/Filters'
import { SimpleLineChart, SimpleMultiLineChart } from '../Components/LineCharts'
import { SimpleBarChart, SimpleStackedBarChart } from '../Components/BarCharts'
import { useState } from 'react';

const Home = () => {
  const [data, setData] = useState([{
    label: '2021-06-03',
    y1: 5,
    y2: 15,
    y3: 5

  },
  {
    label: '2021-07-04',
    y1: 5,
    y2: 5,
    y3: 5
  },
  {
    label: '2021-08-04',
    y1: 15,
    y2: 5,
    y3: 5
  },
  {
    label: '2021-09-05',
    y1: 15,
    y2: 15,
    y3: 5
  },
  {
    label: '2021-09-06',
    y1: 5,
    y2: 5,
    y3: 5
  },
  {
    label: '2021-10-07',
    y1: 5,
    y2: 5,
    y3: 15
  },
  {
    label: '2021-11-08',
    y1: 15,
    y2: 15,
    y3: 5
  },
  {
    label: '2021-12-09',
    y1: 5,
    y2: 5,
    y3: 15
  },
  ])

  const [comparableData, setComparableData] = useState([
      {
    label: '2021-07-04',
    type: 'BTC',
    y1: 5,
    y2: 5,
    y3: 5
  },
  {
    label: '2021-08-04',
    type: 'BTC',
    y1: 15,
    y2: 5,
    y3: 5
  },
  {
    label: '2021-09-05',
    type: 'BTC',
    y1: 5,
    y2: 15,
    y3: 5
  },
  {
    label: '2021-09-06',
    type: 'BTC',
    y1: 5,
    y2: 5,
    y3: 5
  },
  {
    label: '2021-10-07',
    type: 'BTC',
    y1: 5,
    y2: 5,
    y3: 5
  },
  {
    label: '2021-11-08',
    type: 'BTC',
    y1: 5,
    y2: 5,
    y3: 5
  },
  {
    label: '2021-12-09',
    type: 'BTC',
    y1: 5,
    y2: 5,
    y3: 5
  },
  {
    label: '2021-07-04',
    type: 'ADA',
    y1: 5,
    y2: 5,
    y3: 15
  },
  {
    label: '2021-08-01',
    type: 'ADA',
    y1: 15,
    y2: 15,
    y3: 5
  },
  {
    label: '2021-09-08',
    type: 'ADA',
    y1: 15,
    y2: 5,
    y3: 15
  },
  {
    label: '2021-09-15',
    type: 'ADA',
    y1: 5,
    y2: 15,
    y3: 15
  },
  {
    label: '2021-10-07',
    type: 'ADA',
    y1: 5,
    y2: 5,
    y3: 5
  },
  {
    label: '2021-11-08',
    type: 'ADA',
    y1: 10,
    y2: 15,
    y3: 5
  },
  {
    label: '2021-12-09',
    type: 'ADA',
    y1: 5,
    y2: 10,
    y3: 15
  }
  ])

  const changeData = () => {
    setData(data.map(o => { return { ...o, y1: (Math.random() * 15), y2: (Math.random() * 15), y3: (Math.random() * 15) } }))
    setComparableData(comparableData.map(o => { return { ...o, y1: (Math.random() * 15), y2: (Math.random() * 15), y3: (Math.random() * 15) } }))
  }

  return (
    <Container fluid>
      <Card className='mb-3'>
        <Card.Body>
          <Filters />
          <Button onClick={changeData}>Change Data</Button>
            Single Charts
          <Row>
            <Col><SimpleLineChart chartData={data} /></Col>
            <Col><SimpleStackedBarChart chartData={data} /></Col>
            <Col><SimpleBarChart chartData={data} /></Col>
          </Row>
            Comparable Charts
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
