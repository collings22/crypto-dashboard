import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Filters from '../Features/Filters'

const Home = () => {
  
    return (
      <Container fluid>
        <Card className='mb-3'>
          <Card.Body>
            <Filters/>
          </Card.Body>
        </Card>
      </Container>
    )
  }
  
  export default Home
