import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Table, Spinner } from "react-bootstrap";

const ApprovedRequest = () => {
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApprovedRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://localhost:7282/api/BloodRequest/getbystatuswithuser/Approved",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApprovedRequests(response.data);
    } catch (error) {
      console.error("Error fetching approved requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedRequests();
  }, []);

  return (
    <Card className="mt-4">
      <Card.Header>
        <h4 className="mb-0">Approved Blood Requests</h4>
      </Card.Header>
      <Card.Body>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="success" />
          </div>
        ) : approvedRequests.length === 0 ? (
          <p>No approved requests found.</p>
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
              {approvedRequests.map((request, index) => (
                <tr key={request.requestId}>
                  <td>{index + 1}</td>
                  <td>{request.requesterName}</td>
                  <td>{request.bloodGroup}</td>
                  <td>{request.unitsRequired}</td>
                  <td>{request.reason}</td>
                  <td style={{ color: "green" }}>{request.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};

export default ApprovedRequest;
