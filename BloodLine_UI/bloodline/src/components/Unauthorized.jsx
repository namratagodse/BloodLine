import React from 'react';
import { Container } from 'react-bootstrap';

const Unauthorized = () => {
  return (
    <Container className="text-center mt-5">
      <h2 className="text-danger">403 - Unauthorized</h2>
      <p>You do not have permission to access this page.</p>
    </Container>
  );
};

export default Unauthorized;
