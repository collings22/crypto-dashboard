import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react'
import Button from 'react-bootstrap/Button'
import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap'

const Users = () => {
  const [users, setUsers] = useState([])
  const { getAccessTokenSilently } = useAuth0()

  const callSecureApi = async () => {
    const token = await getAccessTokenSilently()
    // const claims = await getIdTokenClaims()

    const response = await fetch('https://localhost:44338/api/users/private-scoped',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

    const responseData = await response.json()
    setUsers(responseData)
  }

  return users && (
    <Container fluid>
      <Card className='mb-3'>
        <Card.Body>
          <Button onClick={callSecureApi}>Get API Data</Button>
          <h2>Users</h2>
          {JSON.stringify(users, null, 2)}
        </Card.Body>
      </Card>
    </Container>
  )
}

export default withAuthenticationRequired(Users, {
  onRedirecting: () => <Spinner />
})
