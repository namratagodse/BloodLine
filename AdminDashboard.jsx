import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function AdminDashboard({ stats, onLogout }) {
  return (
    <div>
      {/* Top Bar */}
      <div className="d-flex justify-content-between align-items-center p-3 bg-primary text-white">
        <h3 className="m-0">Admin Dashboard</h3>
        <Button variant="light" onClick={onLogout}>Logout</Button>
      </div>

      {/* Stats Section */}
      <Container className="mt-4">
        <Row className="g-4">
          <Col md={4}>
            <Card className="text-center shadow">
              <Card.Body>
                <Card.Title>Feedbacks</Card.Title>
                <h2>{stats.feedbackCount}</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow">
              <Card.Body>
                <Card.Title>Donors</Card.Title>
                <h2>{stats.donorCount}</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow">
              <Card.Body>
                <Card.Title>Receivers</Card.Title>
                <h2>{stats.receiverCount}</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="text-center shadow">
              <Card.Body>
                <Card.Title>Blood Banks</Card.Title>
                <h2>{stats.bloodBankCount}</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="text-center shadow">
              <Card.Body>
                <Card.Title>Blood Inventory Units</Card.Title>
                <h2>{stats.bloodInventoryCount}</h2>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminDashboard;
