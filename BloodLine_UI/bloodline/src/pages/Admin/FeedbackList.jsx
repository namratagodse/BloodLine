import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAllFeedbacks, deleteFeedback, updateFeedback } from "../../Services/UserService";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

function FeedbackList() {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({ feedbackID: null, feedbackText: '', rating: '' });

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

  const handleDelete = async (id) => {
  try {
    await deleteFeedback(id);
    toast.success("Feedback deleted successfully");
    fetchFeedbacks(); // Refresh list
  } catch (error) {
    console.error("Delete failed", error);
    toast.error("Failed to delete feedback");
  }
};

  const handleEditClick = (fb) => {
    setEditData({ feedbackID: fb.feedbackID, feedbackText: fb.feedbackText, rating: fb.rating });
    setEditModal(true);
  };

  const handleEditSave = async () => {
  try {
    const updatedData = {
      ...editData,
      rating: parseInt(editData.rating, 10), // Convert rating to number
    };

    await updateFeedback(updatedData);
    fetchFeedbacks();
    setEditModal(false);
    toast.success("Feedback updated successfully");
  } catch (error) {
    console.error("Update failed", error);
    toast.error("Failed to update feedback");
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length === 0 ? (
              <tr><td colSpan="5" className="text-center">No feedback found</td></tr>
            ) : (
              feedbacks.map((fb) => (
                <tr key={fb.feedbackID}>
                  <td>{fb.fullName}</td>
                  <td>{fb.role}</td>
                  <td>{fb.rating}</td>
                  <td>{fb.feedbackText}</td>
                  <td className="text-center align-middle">
                    <Button
                      variant="warning"
                      onClick={() => handleEditClick(fb)}
                      className="me-2"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(fb.feedbackID)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Edit Modal */}
      <Modal show={editModal} onHide={() => setEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Feedback</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={editData.feedbackText}
              onChange={(e) => setEditData({ ...editData, feedbackText: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              value={editData.rating}
              onChange={(e) => setEditData({ ...editData, rating: e.target.value })}
              min={1}
              max={5}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleEditSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FeedbackList;
