import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CustomNavbar() {
  return (
    <Navbar
      expand="lg"
      fixed="top"  
      style={{ backgroundColor: '#9B1C2E' }}
      variant="dark"
      className="border-bottom border-warning shadow-sm"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
          BloodLine
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="px-3">Home</Nav.Link>

            <Nav.Link as={Link} to="/availability" className="px-3">
              Blood Availability
            </Nav.Link>

            <Nav.Link as={Link} to="/about-blood-donation" className="px-3">
              About Blood Donation
            </Nav.Link>
            <Nav.Link as={Link} to="/feedback" className="px-3">
              Feedback
            </Nav.Link>
            <Nav.Link as={Link} to="/register" className="px-3">
              Registration
            </Nav.Link>

            <Nav.Link as={Link} to="/login" className="px-3">
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
