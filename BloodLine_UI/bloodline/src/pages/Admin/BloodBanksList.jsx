import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  getAllBloodBanks,
  toggleUserStatus,
  deleteUser,
  updateUser,
} from "../../Services/UserService";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";

function BloodBankList() {
  const navigate = useNavigate();
  const [bloodBanks, setBloodBanks] = useState([]);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const fetchBloodBanks = async () => {
    try {
      const data = await getAllBloodBanks();
      setBloodBanks(data);
    } catch (error) {
      console.error("Failed to fetch blood banks", error);
    }
  };

  useEffect(() => {
    fetchBloodBanks();
  }, []);

  const handleToggleStatus = async (id) => {
    try {
      await toggleUserStatus(id);
      fetchBloodBanks();
    } catch (error) {
      console.error("Failed to toggle status", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blood bank?")) {
      try {
        await deleteUser(id);
        fetchBloodBanks();
      } catch (error) {
        console.error("Failed to delete user", error);
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
      fetchBloodBanks();
    } catch (error) {
      console.error("Failed to update user", error);
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
        <h2>All Blood Banks</h2>
        <Button
          variant="secondary"
          onClick={() => navigate("/admin-dashboard")}
        >
          Back
        </Button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead
            style={{
              backgroundColor: "#343a40",
              color: "white",
              textAlign: "center",
            }}
          >
            <tr>
              <th><strong>Full Name</strong></th>
              <th><strong>Email</strong></th>
              <th><strong>Phone</strong></th>
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
            {bloodBanks.map((bank) => (
              <tr key={bank.userID}>
                <td>{bank.fullName}</td>
                <td>{bank.email}</td>
                <td>{bank.phoneNumber}</td>
                <td>{bank.address}</td>
                <td>{bank.city}</td>
                <td>{bank.district}</td>
                <td>{bank.state}</td>
                <td>{bank.pincode}</td>
                <td>
                  <Button
                    variant={bank.isActive ? "success" : "secondary"}
                    onClick={() => handleToggleStatus(bank.userID)}
                  >
                    {bank.isActive ? (
                      <FaToggleOn size={20} />
                    ) : (
                      <FaToggleOff size={20} />
                    )}
                  </Button>
                </td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(bank)}
                    className="me-2"
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(bank.userID)}
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
          <Modal.Title>Edit Blood Bank</Modal.Title>
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

export default BloodBankList;
