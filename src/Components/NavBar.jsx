import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const NavBar = () => {

    return (
        <Navbar collapseOnSelect expand='lg' className='mb-3' bg='dark' variant='dark'>
            <Navbar.Brand href={(document.location.pathname.includes('Home') ? '' : `/Home`)}>RocketDan</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav className='mr-auto'>
                    <Nav.Link href={(document.location.pathname.includes('About') ? '' : `/About`)}>About</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar