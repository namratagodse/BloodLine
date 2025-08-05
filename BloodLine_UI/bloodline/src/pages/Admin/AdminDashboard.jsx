// src/pages/Admin/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAdminDashboardCounts } from '../../Services/AdminDashboardService'; 

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    feedbackCount: 0,
    donorCount: 0,
    receiverCount: 0,
    bloodBankCount: 0,
    bloodInventoryCount: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardCounts = async () => {
      try {
        const data = await getAdminDashboardCounts();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard counts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardCounts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleAddBloodBank = () => {
    navigate('/admin-adduser');
  };

  const dashboardCards = [
    { title: 'Feedbacks', value: stats.feedbackCount, route: '/admin-allfeedbacks', color: 'secondary' },
    { title: 'Donors', value: stats.donorCount, route: '/admin-alldonors', color: 'success' },
    { title: 'Receivers', value: stats.receiverCount, route: '/admin-allreceivers', color: 'warning' },
    { title: 'Blood Banks', value: stats.bloodBankCount, route: '/admin-allbloodbanks', color: 'danger' },
    { title: 'Blood Inventory Units', value: stats.bloodInventoryCount, route: '/admin-allbloodinventory', color: 'dark' },
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
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row className="g-4">
            {dashboardCards.map((card, index) => (
            <Col md={4} key={index}>
              <Card
                className={`text-white text-center shadow bg-${card.color}`}
                style={{ cursor: 'pointer', height: '160px' }}
                onClick={() => handleCardClick(card.route)}
              >
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                  <Card.Title className="fs-5">{card.title}</Card.Title>
                  <h2 className="fw-bold">{card.value}</h2>
                </Card.Body>
              </Card>
            </Col>
          ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default AdminDashboard;
