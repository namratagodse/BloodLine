import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AdminDashboard({ stats, onLogout }) {
  const navigate = useNavigate();

  // Updated colors to remove blue tones
  const dashboardCards = [
    { title: 'Feedbacks', value: stats.feedbackCount, route: '/admin/feedbacks', color: 'secondary' },
    { title: 'Donors', value: stats.donorCount, route: '/admin/donors', color: 'success' },
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
        <Button variant="light" onClick={onLogout}>Logout</Button>
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
