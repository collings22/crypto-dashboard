import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Filters from '../Features/Filters'
import { SimpleLineChart } from '../Components/LineCharts'
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

  const changeData = () => {
    setData(data.map(o => { return { ...o, y1: (Math.random() * 15), y2: (Math.random() * 15), y3: (Math.random() * 15) } }))
  }

  return (
    <Container fluid>
      <Card className='mb-3'>
        <Card.Body>
          <Filters />
          <Button onClick={changeData}>Change Data</Button>
          <Row>
            <Col><SimpleLineChart chartData={data} /></Col>
            <Col><SimpleStackedBarChart chartData={data} /></Col>
          </Row>
          <Row>
            <Col><SimpleLineChart chartData={data} /></Col>
            <Col><SimpleBarChart chartData={data} /></Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Home
