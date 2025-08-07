import React, { useEffect, useState } from "react";
import { Table, Button, Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized");
          setLoading(false);
          return;
        }

        const decoded = jwtDecode(token);
        const requesterId = decoded.UserID;

        const response = await axios.get(`https://localhost:7282/api/BloodRequest/GetRequestsByRequesterId/${requesterId}`);
        setRequests(response.data);
      } catch (err) {
        setError("Failed to load requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Container style={{marginTop: '80px', marginBottom: '80px'}}>
      <h2 className="text-center mb-4">My Blood Requests</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      ) : requests.length === 0 ? (
        <Alert variant="info" className="text-center">
          You haven't made any blood requests yet.
        </Alert>
      ) : (
                <Table striped bordered hover responsive className="mt-3">
        <thead>
            <tr className="text-center">
            <th>Sr.No</th>
            <th>Requester ID</th>
            <th>Requester</th>
            <th>BloodBank ID</th>
            <th>Blood Bank</th>
            <th>Units</th>
            <th>Blood Group</th>
            <th>Required Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Created At</th>
            </tr>
        </thead>
        <tbody>
            {requests.map((req, index) => (
            <tr key={req.requestId} className="text-center">
                <td>{index + 1}</td>
                <td>{req.requestId}</td>
                <td>{req.requesterName}</td>
                <td>{req.bloodBankId}</td>
                <td>{req.bloodBankName}</td>
                <td>{req.unitsRequired}</td>
                <td>{req.bloodGroup}</td>
                <td>{formatDate(req.requiredDate)}</td>
                <td>{req.reason}</td>
                <td><span className="badge bg-secondary">{req.status}</span></td>
                <td>{formatDate(req.createdAt)}</td>
            </tr>
            ))}
        </tbody>
        </Table>

      )}

      <div className="text-center mt-5">
        <Button variant="secondary" onClick={() => navigate("/receiver-dashboard")}>
          Back to Dashboard
        </Button>
      </div>
    </Container>
  );
};

export default MyRequests;
