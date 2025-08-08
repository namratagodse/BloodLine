import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAllFeedbacks } from "../../Services/UserService";

function FeedbackList() {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const data = await getAllFeedbacks();
      setFeedbacks(data);
    } catch (error) {
      console.error("Failed to fetch feedbacks", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>All Feedbacks</h2>
        <Button variant="secondary" onClick={() => navigate("/admin-dashboard")}>
          Back
        </Button>
      </div>

      <div className="table-responsive">
        <Table bordered hover>
          <thead style={{ backgroundColor: "#343a40", color: "white", textAlign: "center" }}>
            <tr>
              <th>Full Name</th>
              <th>Role</th>
              <th>Rating</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No feedback found
                </td>
              </tr>
            ) : (
              feedbacks.map((fb) => (
                <tr key={fb.feedbackID}>
                  <td>{fb.fullName}</td>
                  <td>{fb.role}</td>
                  <td>{fb.rating}</td>
                  <td>{fb.feedbackText}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default FeedbackList;
