import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  getAllReceivers,
  toggleUserStatus,
  deleteUser,
  updateUser,
} from "../../Services/UserService";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";

function ReceiverList() {
  const navigate = useNavigate();
  const [receivers, setReceivers] = useState([]);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const fetchReceivers = async () => {
    try {
      const data = await getAllReceivers();
      setReceivers(data);
    } catch (error) {
      console.error("Failed to fetch receivers", error);
    }
  };

  useEffect(() => {
    fetchReceivers();
  }, []);

  const handleToggleStatus = async (id) => {
    try {
      await toggleUserStatus(id);
      fetchReceivers();
    } catch (error) {
      console.error("Failed to toggle status", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this receiver?")) {
      try {
        await deleteUser(id);
        fetchReceivers();
      toast.success("Receiver delete successfully!");
    } catch (error) {
        console.error("Delete failed", error);
        toast.error("Failed to delete donor.");
    }
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setEditModalShow(true);
  };

  const handleUpdate = async () => {
    try {
      await updateUser(editUser);
      setEditModalShow(false);
      fetchReceivers();
    toast.success("Receiver updated successfully!");
    } catch (error) {
        console.error("Update failed", error);
        toast.error("Failed to update donor.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mt-4">
<div className="d-flex justify-content-between align-items-center mb-3">
        <h2>All Receivers</h2>
        <Button
            variant="secondary"
            onClick={() => navigate("/admin-dashboard")}
        >
            Back
        </Button>
        </div>      
        <div className="table-responsive">
        <table className="table table-bordered table-hover">
            <thead style={{ backgroundColor: "#343a40", color: "white", textAlign: "center" }}>
          <tr>
            <th><strong>Full Name</strong></th>
            <th><strong>Email</strong></th>
            <th><strong>Phone</strong></th>
            <th><strong>Gender</strong></th>
            <th><strong>Date of Birth</strong></th>
            <th><strong>Blood Group</strong></th>
            <th><strong>Address</strong></th>
            <th><strong>City</strong></th>
            <th><strong>District</strong></th>
            <th><strong>State</strong></th>
            <th><strong>Pincode</strong></th>
            <th><strong>Status</strong></th>
            <th><strong>Action</strong></th>
          </tr>
        </thead>
        <tbody>
          {receivers.map((receiver) => (
            <tr key={receiver.userID}>
              <td>{receiver.fullName}</td>
              <td>{receiver.email}</td>
              <td>{receiver.phoneNumber}</td>
              <td>{receiver.gender}</td>
              <td>
                  {receiver.dateOfBirth
                    ? new Date(receiver.dateOfBirth).toLocaleDateString()
                    : ""}
                </td>
              <td>{receiver.bloodGroup}</td>
              <td>{receiver.address}</td>
              <td>{receiver.city}</td>
              <td>{receiver.district}</td>
              <td>{receiver.state}</td>
              <td>{receiver.pincode}</td>
              <td>
                <Button
                  variant={receiver.isActive ? "success" : "secondary"}
                  onClick={() => handleToggleStatus(receiver.userID)}
                >
                  {receiver.isActive ? (
                    <FaToggleOn size={20} />
                  ) : (
                    <FaToggleOff size={20} />
                  )}
                </Button>
              </td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEdit(receiver)}
                  className="me-2"
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(receiver.userID)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Modal show={editModalShow} onHide={() => setEditModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Receiver</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editUser && (
            <Form>
              <Form.Group controlId="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={editUser.fullName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={editUser.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  value={editUser.phoneNumber}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  type="text"
                  name="gender"
                  value={editUser.gender}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="bloodGroup">
                <Form.Label>Blood Group</Form.Label>
                <Form.Control
                  type="text"
                  name="bloodGroup"
                  value={editUser.bloodGroup}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModalShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ReceiverList;
