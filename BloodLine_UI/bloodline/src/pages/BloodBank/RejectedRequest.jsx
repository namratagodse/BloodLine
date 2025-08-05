import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Table, Spinner } from "react-bootstrap";

const RejectedRequest = () => {
  const [rejectedRequests, setRejectedRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRejectedRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://localhost:7282/api/BloodRequest/getbystatuswithuser/Rejected",
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
                <td>{request.requesterName}</td> {/* ✅ Correct */}
                <td>{request.bloodGroup}</td>
                <td>{request.unitsRequired}</td> {/* ✅ Correct */}
                <td>{request.reason}</td>
                <td style={{ color: 'red' }}>{request.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};

export default RejectedRequest;
