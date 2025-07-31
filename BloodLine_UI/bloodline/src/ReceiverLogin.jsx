// src/ReceiverLogin.js
import React from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ReceiverLogin() {
  return (
     <div className="mt-5 pt-5">
    <Container className="my-5" style={{ marginTop: '100px' , marginBottom: '80px' }}>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="border border-danger shadow-lg">
            <Card.Body>
              <Row>
                {/* Register Block */}
                <Col md={6} className="border-end">
                  <h5 className="fw-bold mb-4">New Receiver?</h5>
                  <p>If you're new, register yourself to request blood easily.</p>
                  <Button as={Link} to="/register-receiver" variant="danger">
                    Register
                  </Button>
                </Col>

                {/* Login Block */}
                <Col md={6}>
                  <h5 className="fw-bold mb-4">Already Registered?</h5>
                  <Form>
                    <Form.Group className="mb-3" controlId="receiverEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="receiverPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" required />
                    </Form.Group>

                    <Button variant="danger" type="submit" className="w-100">
                      Login
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default ReceiverLogin;
