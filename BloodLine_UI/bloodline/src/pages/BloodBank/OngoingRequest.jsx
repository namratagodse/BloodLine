import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Table,
  Spinner,
  Toast,
  ToastContainer,
  Dropdown,
  DropdownButton,
  Button
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // make sure you import this

const OngoingRequest = () => {
  const [OngoingRequests, setOngoingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

const fetchOngoingRequests = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found.");
      return;
    }

    const decoded = jwtDecode(token);
    const bloodBankId = decoded.UserID; // 🔑 assuming userid is your BloodBankId

    const response = await axios.get(
      `https://localhost:7282/api/BloodRequest/getbystatuswithuser/Ongoing/${bloodBankId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setOngoingRequests(response.data);
  } catch (error) {
    console.error("Error fetching Ongoing requests:", error);
  } finally {
    setLoading(false);
  }
};
 const handleStatusUpdate = async (requestId, newStatus) => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      "https://localhost:7282/api/BloodRequest/updatestatus",
      {
        requestId: requestId,
        status: newStatus,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setToastMessage(`Request marked as ${newStatus}`);
    setShowToast(true);

    // Remove the updated request from the list
    setOngoingRequests(prev =>
      prev.filter(request => request.requestId !== requestId)
    );
  } catch (error) {
    console.error("Error updating request status:", error);
  }
};




  useEffect(() => {
    fetchOngoingRequests();
  }, []);

  return (
    <>
      <Card className="mt-4">
        <Card.Header>
          <h4 className="mb-0">Ongoing Blood Requests</h4>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : OngoingRequests.length === 0 ? (
            <p>No Ongoing requests found.</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Requester Name</th>
                  <th>Blood Group</th>
                  <th>Quantity</th>
                  <th>Reason</th>
                  <th>Current Status</th>
                  <th>Update Status</th>
                </tr>
              </thead>
              <tbody>
                {OngoingRequests.map((request, index) => (
                  <tr key={request.requestId}>
                    <td>{index + 1}</td>
                    <td>{request.requesterName}</td>
                    <td>{request.bloodGroup}</td>
                    <td>{request.unitsRequired}</td>
                    <td>{request.reason}</td>
                    <td style={{ color: "orange" }}>{request.status}</td>
                    <td>
                      <DropdownButton
                        id={`dropdown-${request.requestId}`}
                        title="Update"
                        variant="secondary"
                        size="sm"
                      >
                        <Dropdown.Item
                          onClick={() =>
                            handleStatusUpdate(request.requestId, "Approved")
                          }
                        >
                          Approve
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleStatusUpdate(request.requestId, "Rejected")
                          }
                        >
                          Reject
                        </Dropdown.Item>
                      </DropdownButton>
                    </td>
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

      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default OngoingRequest;
