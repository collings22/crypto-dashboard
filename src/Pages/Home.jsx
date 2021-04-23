import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Filters from '../Features/Filters'
import { SimpleLineChart } from '../Components/LineCharts'
import { SimpleBarChart } from '../Components/BarCharts'

const Home = () => {
  let data = [{
    label: '2021-06-03',
    y: 10
  },
  {
    label: '2021-07-04',
    y: 4
  },
  {
    label: '2021-08-04',
    y: 6
  },
  {
    label: '2021-09-05',
    y: 4
  },
  {
    label: '2021-09-06',
    y: 14
  },
  {
    label: '2021-10-07',
    y: 2
  },
  {
    label: '2021-11-08',
    y: 2
  },
  {
    label: '2021-12-09',
    y: 7
  },
  ]


  return (
    <Container fluid>
      <Card className='mb-3'>
        <Card.Body>
          <Filters />
          <Row>
            <Col><SimpleLineChart chartData={data} /></Col>
            <Col><SimpleBarChart chartData={data} /></Col>
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
