import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DonorLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Add login logic here
    alert('Donor Login submitted');
  };

  const handleRegister = () => {
    navigate('/register-donor');
  };

  return (
    <div style={{ marginTop: '100px', marginBottom: '80px' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="p-4 shadow border-danger">
              <Row>
                {/* Login Block */}
                <Col md={6} className="border-end">
                  <h4 className="text-center text-danger mb-4">Donor Login</h4>
                  <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Button variant="danger" type="submit" className="w-100">
                      Login
                    </Button>
                  </Form>
                </Col>

                {/* Register Block */}
                <Col
                  md={6}
                  className="d-flex flex-column justify-content-center align-items-center text-center"
                >
                  <h5 className="mb-3">New to BloodLine?</h5>
                  <p className="mb-4">Register now to donate and help save lives!</p>
                  <Button variant="outline-danger" onClick={handleRegister}>
                    Register as Donor
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DonorLogin;
