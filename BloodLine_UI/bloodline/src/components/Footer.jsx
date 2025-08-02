import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-dark text-white py-3 border-top border-warning">
      <Container>
        <Row>
          {/* Column 1: About */}
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="fw-bold">BloodLine</h5>
            <p className="mb-1">
              A platform to connect blood donors and receivers with nearby centers.
            </p>
            <small className="text-muted">
              &copy; {new Date().getFullYear()} BloodLine. All rights reserved.
            </small>
          </Col>

          {/* Column 2: Quick Links */}
          <Col md={4} className="mb-4 mb-md-0">
            <h6 className="fw-semibold">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/about-donation" className="text-white text-decoration-none d-block py-1">About Blood Donation</a></li>
              <li><a href="/availability" className="text-white text-decoration-none d-block py-1">Blood Availability</a></li>
              <li><a href="/login" className="text-white text-decoration-none d-block py-1">Login</a></li>
              <li><a href="/register" className="text-white text-decoration-none d-block py-1">Registration</a></li>

            </ul>
          </Col>

          {/* Column 3: Contact + Social */}
          <Col md={4}>
            <h6 className="fw-semibold">Contact Us</h6>
            <p className="mb-1">Email: support@bloodline.org</p>
            <p>Phone: +91-12345-67890</p>

            <div className="d-flex gap-3 mt-2">
              <a href="https://facebook.com" className="text-white">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" className="text-white">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" className="text-white">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" className="text-white">
                <FaLinkedin size={24} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
