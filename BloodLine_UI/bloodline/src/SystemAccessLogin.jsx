import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';

function SystemAccessLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Add system access login logic
    console.log('System Access Login:', email, password);
  };

  return (
    <div className="mt-5 pt-2">
    <Container style={{ maxWidth: '450px', marginTop: '100px', marginBottom: '80px' }}>
      <Card className="shadow-lg">
        <Card.Body>
          <h3 className="text-center text-danger mb-4">System Access Login</h3>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="systemEmail">
              <Form.Label>Email address<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="systemPassword">
              <Form.Label>Password<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="danger" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
    </div>
  );
}

export default SystemAccessLogin;
