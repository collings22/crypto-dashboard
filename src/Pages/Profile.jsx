import { useAuth0 } from '@auth0/auth0-react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

const Profile = () => {
  const { user, isLoading } = useAuth0()
  console.log(user)

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (

    <Container>
      <Row>
        <Col>
          <img src={user.picture} alt={user.name} />
        </Col>
        <Col><h2>{user.name}</h2>
        </Col>
        <Col><h2>{user.email}</h2>
        </Col>
      </Row>
      <Row>
        {JSON.stringify(user, null, 2)}
      </Row>
    </Container>

  )
}

export default Profile
