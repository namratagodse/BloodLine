// src/pages/Admin/AdminDashboard.jsx
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AdminDashboard({ stats }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); // Redirect to home
  };

  const handleAddBloodBank = () => {
    navigate('/admin-adduser'); // Redirect to Blood Bank Registration page
  };

  const dashboardCards = [
    { title: 'Feedbacks', value: stats.feedbackCount, route: '/admin/feedbacks', color: 'secondary' },
    { title: 'Donors', value: stats.donorCount, route: '/admin-alldonors', color: 'success' },
    { title: 'Receivers', value: stats.receiverCount, route: '/admin/receivers', color: 'warning' },
    { title: 'Blood Banks', value: stats.bloodBankCount, route: '/admin/blood-banks', color: 'danger' },
    { title: 'Blood Inventory Units', value: stats.bloodInventoryCount, route: '/admin/blood-inventory', color: 'dark' },
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  const cardStyle = {
    cursor: 'pointer',
    height: '160px',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  };

  return (
    <div>
      {/* Top Bar */}
      <div className="d-flex justify-content-between align-items-center p-3 bg-primary text-white">
        <h3 className="m-0">Admin Dashboard</h3>
        <div>
          <Button variant="light" className="me-2" onClick={handleAddBloodBank}>
            Add User
          </Button>
          <Button variant="light" onClick={handleLogout}>Logout</Button>
        </div>
      </div>

      {/* Stats Section */}
      <Container className="mt-4">
        <Row className="g-4">
          {dashboardCards.map((card, index) => (
            <Col md={4} key={index}>
              <Card
                className={`text-center shadow bg-${card.color}`}
                style={cardStyle}
                onClick={() => handleCardClick(card.route)}
              >
                <Card.Body>
                  <Card.Title className="fs-5">{card.title}</Card.Title>
                  <h2 className="fw-bold">{card.value}</h2>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default AdminDashboard;
