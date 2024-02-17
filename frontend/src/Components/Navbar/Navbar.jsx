import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css'

const NavBar = () => {
  return (
   <>
   <div className="header">
      <Navbar className="navbar">
        <Container>
          <h1>hi</h1>
          {/* <Navbar.Brand href="#home">
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav> */}
        </Container>
      </Navbar>
   </div>
    
   </>
  )
}

export default NavBar

