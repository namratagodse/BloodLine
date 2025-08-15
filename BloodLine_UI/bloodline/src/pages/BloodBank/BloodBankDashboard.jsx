import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BloodBankDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalRequests: 0,
    totalInventory: 0,
    ongoingRequests: 0,
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
        `https://bloodlinecdac-aya6f2gja8emghg2.canadacentral-01.azurewebsites.net/api/dashboard/bloodbank/${bloodBankId}`
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
        <Col md={4}>
          <Card
            className="text-center p-3 shadow-sm text-white"
            style={{ backgroundColor: "#007bff", cursor: "pointer" }}
            onClick={() => handleCardClick("/bloodbank-requests/all")}
          >
            <h4>Total Requests</h4>
          </Card>
        </Col>

        <Col md={4}>
          <Card
            className="text-center p-3 shadow-sm text-white"
            style={{ backgroundColor: "#28a745", cursor: "pointer" }}
            onClick={() => handleCardClick("/bloodbank-inventory")}
          >
            <h4>Total Inventory</h4>
          </Card>
        </Col>

        <Col md={4}>
          <Card
            className="text-center p-3 shadow-sm text-white"
            style={{ backgroundColor: "#ffc107", cursor: "pointer" }}
            onClick={() => handleCardClick("/bloodbank-requests/Ongoing")}
          >
            <h4>Ongoing Requests</h4>
          </Card>
        </Col>

        <Col md={4}>
          <Card
            className="text-center p-3 shadow-sm text-white"
            style={{ backgroundColor: "#17a2b8", cursor: "pointer" }}
            onClick={() => handleCardClick("/bloodbank-requests/Approved")}
          >
            <h4>Approved Requests</h4>
          </Card>
        </Col>

        <Col md={4}>
          <Card
            className="text-center p-3 shadow-sm text-white"
            style={{ backgroundColor: "#dc3545", cursor: "pointer" }}
            onClick={() => handleCardClick("/bloodbank-requests/Rejected")}
          >
            <h4>Rejected Requests</h4>
          </Card>
        </Col>

        <Col md={4}>
          <Card
            className="text-center p-3 shadow-sm text-white"
            style={{ backgroundColor: "#6f42c1", cursor: "pointer" }}
            onClick={() => handleCardClick("/bloodbank-alldonations")}
          >
            <h4>All Donations</h4>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BloodBankDashboard;
