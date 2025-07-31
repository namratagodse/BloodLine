// src/components/CustomNavbar.js
import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CustomNavbar() {
  return (
    <Navbar expand="lg" style={{ backgroundColor: '#9B1C2E' }} variant="dark" className="border-bottom border-warning shadow-sm">
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

            <NavDropdown title="Want to Donate Blood" id="donate-dropdown" className="px-3">
              <NavDropdown.Item as={Link} to="/donor-login">
                Donor Login
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/about-donation">
                About Blood Donation
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Want to Receive Blood" id="receive-dropdown" className="px-3">
              <NavDropdown.Item as={Link} to="/receiver-login">
                Receiver Login
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/center-login" className="px-3">
              Blood Center Login
            </Nav.Link>

            <Nav.Link as={Link} to="/admin" className="px-3">
              System Access
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
