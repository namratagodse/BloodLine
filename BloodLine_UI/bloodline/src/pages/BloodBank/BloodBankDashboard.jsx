import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BloodBankDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalRequests: 0,
    totalInventory: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    rejectedRequests: 0
  });

  const navigate = useNavigate();

  const bloodBankId = localStorage.getItem("userId"); // adjust based on login system

  useEffect(() => {
    if (bloodBankId) {
      fetchDashboardData();
    }
  }, [bloodBankId]);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7282/api/dashboard/bloodbank/${bloodBankId}`
      );
      setDashboardData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    }
  };

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <Container className="mt-4">
      <Row className="g-4">
        <Col md={6} lg={3}>
          <Card
            className="text-center p-3 shadow-sm"
            onClick={() => handleCardClick("/bloodbank-requests")}
            style={{ cursor: "pointer" }}
          >
            <h4>Total Requests</h4>
            <h2>{dashboardData.totalRequests}</h2>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card
            className="text-center p-3 shadow-sm"
            onClick={() => handleCardClick("/bloodbank-inventory")}
            style={{ cursor: "pointer" }}
          >
            <h4>Total Inventory</h4>
            <h2>{dashboardData.totalInventory}</h2>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card
            className="text-center p-3 shadow-sm"
            onClick={() => handleCardClick("/bloodbank-requests/Pending")}
            style={{ cursor: "pointer" }}
          >
            <h4>Pending Requests</h4>
            <h2>{dashboardData.pendingRequests}</h2>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card
            className="text-center p-3 shadow-sm"
            onClick={() => handleCardClick("/bloodbank-requests/Approved")}
            style={{ cursor: "pointer" }}
          >
            <h4>Approved Requests</h4>
            <h2>{dashboardData.approvedRequests}</h2>
          </Card>
        </Col>

         <Col md={6} lg={3}>
          <Card
            className="text-center p-3 shadow-sm"
            onClick={() => handleCardClick("/bloodbank-requests/Rejected")}
            style={{ cursor: "pointer" }}
          >
            <h4>Rejected Requests</h4>
            <h2>{dashboardData.rejectedRequests}</h2>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BloodBankDashboard;
