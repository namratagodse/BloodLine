import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Table, Spinner, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RejectedRequest = () => {
  const [rejectedRequests, setRejectedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

const fetchRejectedRequests = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found.");
      return;
    }

    const decoded = jwtDecode(token);
    const bloodBankId = decoded.UserID; // 🔑 assuming userid is your BloodBankId

    const response = await axios.get(
      `https://localhost:7282/api/BloodRequest/getbystatuswithuser/Rejected/${bloodBankId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setRejectedRequests(response.data);
  } catch (error) {
    console.error("Error fetching rejected requests:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchRejectedRequests();
  }, []);

  return (
    <Card className="mt-4">
      <Card.Header>
        <h4 className="mb-0">Rejected Blood Requests</h4>
      </Card.Header>
      <Card.Body>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="danger" />
          </div>
        ) : rejectedRequests.length === 0 ? (
          <p>No rejected requests found.</p>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Requester Name</th>
                <th>Blood Group</th>
                <th>Quantity</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rejectedRequests.map((request, index) => (
                <tr key={request.requestId}>
                  <td>{index + 1}</td>
                  <td>{request.requesterName}</td>
                  <td>{request.bloodGroup}</td>
                  <td>{request.unitsRequired}</td>
                  <td>{request.reason}</td>
                  <td style={{ color: "red" }}>{request.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        <div className="text-end mt-4">
          <Button
            variant="secondary"
            onClick={() => navigate("/bloodbank-dashboard")}
            style={{ backgroundColor: "blue", borderColor: "blue" }}
          >
            Back
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RejectedRequest;
