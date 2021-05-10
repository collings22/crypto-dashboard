import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'
import LoginButton from './LoginButton'
import { useAuth0 } from '@auth0/auth0-react'
import LogoutButton from './LogoutButton'

const NavBar = () => {
  const { isAuthenticated } = useAuth0()

  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      className='mb-3'
      bg='dark'
      variant='dark'
    >
      <Navbar.Brand>
        <Link to='/' className='text-link'>RocketDan</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className='mr-auto' as='ul'>
          <Nav.Item as='li'>
            <Nav.Link>
              <Link
                className='text-link'
                to={
                  document.location.pathname.includes('About') ? '' : '/About'
                }
              >
                About
              </Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as='li'>
            <Nav.Link>
              <Link
                className='text-link'
                to={
                  document.location.pathname.includes('Profile')
                    ? ''
                    : '/Profile'
                }
              >
                Profile
              </Link>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <div className='mr-sm-2'>
          {isAuthenticated
            ? <LogoutButton />
            : <LoginButton />}

        </div>
      </Navbar.Collapse>

    </Navbar>
  )
}

export default NavBar
