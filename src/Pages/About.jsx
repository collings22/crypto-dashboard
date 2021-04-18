import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

const About = () => {
    document.title = 'About - DC'
  
    return (
      <Container fluid>
        <Card className='mb-3'>
          <Card.Body>
            About Page
          </Card.Body>
        </Card>
      </Container>
    )
  }
  
  export default About
