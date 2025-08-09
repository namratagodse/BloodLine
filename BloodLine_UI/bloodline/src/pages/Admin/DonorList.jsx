import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  getAllDonors,
  toggleUserStatus,
  deleteUser,
  updateUser,
} from "../../Services/UserService";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";


const DonorList = () => {
  const navigate = useNavigate();
  const [donors, setDonors] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    fetchDonors();
    fetchStates();
  }, []);

  const fetchDonors = async () => {
    try {
      const data = await getAllDonors();
      setDonors(data);
    } catch (error) {
      console.error("Failed to fetch donors", error);
    }
  };

  const fetchStates = async () => {
    const res = await axios.get("https://localhost:7282/api/location/states");
    setStates(res.data);
  };

  const fetchDistrictsByStateId = async (stateId) => {
    const res = await axios.get(
      `https://localhost:7282/api/location/districts/${stateId}`
    );
    setDistricts(res.data);
  };

  const handleToggleStatus = async (userId) => {
    try {
      await toggleUserStatus(userId);
      setDonors((prev) =>
        prev.map((donor) =>
          donor.userID === userId
            ? { ...donor, isActive: !donor.isActive }
            : donor
        )
      );
    } catch (error) {
      console.error("Failed to toggle status", error);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this donor?")) return;
    try {
      await deleteUser(userId);
      setDonors((prev) => prev.filter((donor) => donor.userID !== userId));
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const openEditModal = async (donor) => {
    setEditFormData({ ...donor });

    const selectedState = states.find((s) => s.stateName === donor.state);
    if (selectedState) {
      await fetchDistrictsByStateId(selectedState.stateId);
    }

    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "state") {
      const selectedState = states.find((s) => s.stateName === value);
      if (selectedState) {
        fetchDistrictsByStateId(selectedState.stateId);
      }
      setEditFormData((prev) => ({
        ...prev,
        district: "",
      }));
    }
  };

  const handleUpdateUser = async () => {
  try {
    await updateUser(editFormData);
    setShowEditModal(false);
    fetchDonors();
    toast.success("Donor updated successfully!");
  } catch (error) {
    console.error("Update failed", error);
    toast.error("Failed to update donor.");
  }
};


  return (
    <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>All Donors</h2>
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
        <th><strong>Aadhaar No.</strong></th>
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
            {donors.map((donor) => (
              <tr key={donor.userID}>
                <td>{donor.fullName}</td>
                <td>{donor.email}</td>
                <td>{donor.phoneNumber}</td>
                <td>{donor.aadhaarNumber}</td>
                <td>{donor.gender}</td>
                <td>
                  {donor.dateOfBirth
                    ? new Date(donor.dateOfBirth).toLocaleDateString()
                    : ""}
                </td>
                <td>{donor.bloodGroup}</td>
                <td>{donor.address}</td>
                <td>{donor.city}</td>
                <td>{donor.district}</td>
                <td>{donor.state}</td>
                <td>{donor.pincode}</td>
                <td>
                                <Button
                                  variant={donor.isActive ? "success" : "secondary"}
                                  onClick={() => handleToggleStatus(donor.userID)}
                                >
                                  {donor.isActive ? (
                                    <FaToggleOn size={20} />
                                  ) : (
                                    <FaToggleOff size={20} />
                                  )}
                                </Button>
                              </td>
                <td>
                                <Button
                                  variant="warning"
                                  onClick={() => openEditModal(donor)}
                                  className="me-2"
                                >
                                  <FaEdit />
                                </Button>
                                <Button
                                  variant="danger"
                                  onClick={() => handleDelete(donor.userID)}
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
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Donor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                name="fullName"
                value={editFormData.fullName || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phoneNumber"
                value={editFormData.phoneNumber || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Aadhaar No.</Form.Label>
              <Form.Control
                name="aadhaarNumber"
                value={editFormData.aadhaarNumber || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                value={editFormData.address || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control
                name="city"
                value={editFormData.city || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>State</Form.Label>
              <Form.Control
                as="select"
                name="state"
                value={editFormData.state || ""}
                onChange={handleEditChange}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.stateId} value={state.stateName}>
                    {state.stateName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>District</Form.Label>
              <Form.Control
                as="select"
                name="district"
                value={editFormData.district || ""}
                onChange={handleEditChange}
              >
                <option value="">Select District</option>
                {districts.map((district) => (
                  <option key={district.districtId} value={district.districtName}>
                    {district.districtName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                name="pincode"
                value={editFormData.pincode || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            {/* Add more fields if needed */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DonorList;
