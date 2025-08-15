import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Table, Spinner, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TotalRequests = () => {
  const [allRequests, setAllRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAllRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://bloodlinecdac-aya6f2gja8emghg2.canadacentral-01.azurewebsites.net/api/BloodRequest/getallwithuser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAllRequests(response.data);
    } catch (error) {
      console.error("Error fetching all requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRequests();
  }, []);

  return (
    <Card className="mt-4">
      <Card.Header>
        <h4 className="mb-0">All Blood Requests</h4>
      </Card.Header>
      <Card.Body>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : allRequests.length === 0 ? (
          <p>No requests found.</p>
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
              {allRequests.map((request, index) => (
                <tr key={request.requestId}>
                  <td>{index + 1}</td>
                  <td>{request.requesterName}</td>
                  <td>{request.bloodGroup}</td>
                  <td>{request.unitsRequired}</td>
                  <td>{request.reason}</td>
                  <td
                    style={{
                      color:
                        request.status === "Approved"
                          ? "green"
                          : request.status === "Rejected"
                          ? "red"
                          : "orange",
                    }}
                  >
                    {request.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {/* Back Button */}
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

export default TotalRequests;
