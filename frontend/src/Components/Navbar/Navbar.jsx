import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import img from '../../assets/CartX-logos/logo-transparent-png.png'
import './Navbar.css'

const NavBar = () => {
  return (
   <>
   <div className="header">
      <Navbar className="navbar">
        <Container>
          <Navbar.Brand href="#home">
            <img className="logo" src={ img } alt="CartX Logo" width="60"height="60"/>
          </Navbar.Brand>
          <SearchBar className="searchbar"/>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
   </div>
    
   </>
  )
}

export default NavBar

