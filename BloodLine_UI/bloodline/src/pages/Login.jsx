import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { loginUser } from '../Services/LoginService';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);

      if (data && data.token) {
        localStorage.setItem("token", data.token);
        toast.success("Login successful!");

        // 👇 Decode token to get role
        const decoded = jwtDecode(data.token);
        const role = decoded.role || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        // 👇 Navigate based on role
        if (role === 'Admin') {
            navigate("/admin-dashboard");
          } else if (role === 'Donor') {
            navigate("/donor-dashboard");
          } else if (role === 'Receiver') {
            navigate("/receiver-dashboard");
          } else {
             toast.error("Unknown user role.");
          }
      } else {
        toast.error("Login failed: No token received.");
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="mt-5 pt-2">
      <Container style={{ maxWidth: '450px', marginTop: '100px', marginBottom: '80px' }}>
        <Card className="shadow-lg">
          <Card.Body>
            <h3 className="text-center text-danger mb-4">Login</h3>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
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

export default Login;
