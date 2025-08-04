import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { toast } from "react-toastify";

const AddUser = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    bloodGroup: "",
    address: "",
    state: "",
    district: "",
    city: "",
    pincode: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState(null);

  useEffect(() => {
    axios
      .get("https://localhost:7282/api/location/states")
      .then((res) => setStates(res.data))
      .catch((err) => console.error("Error fetching states", err));
  }, []);

  useEffect(() => {
    if (selectedStateId) {
      axios
        .get(`https://localhost:7282/api/location/districts/${selectedStateId}`)
        .then((res) => setDistricts(res.data))
        .catch((err) => console.error("Error fetching districts", err));
    } else {
      setDistricts([]);
    }
  }, [selectedStateId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "state") {
      const selected = states.find((s) => s.stateName === value);
      setSelectedStateId(selected?.stateId || null);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    toast.error("Passwords do not match.");
    return;
  }

  const payload = {
  FullName: formData.fullName,
  Email: formData.email,
  PhoneNumber: formData.phoneNumber,
  Address: formData.address,
  State: formData.state,
  District: formData.district,
  City: formData.city,
  Pincode: formData.pincode,
  Role: formData.role,
  PasswordHash: formData.password,
  Action: "Insert",
};

if (formData.role !== "BloodBank") {
  payload.Gender = formData.gender;
  payload.DateOfBirth = formData.dateOfBirth;
  payload.BloodGroup = formData.bloodGroup;
}


  try {
    const response = await axios.post(
      "https://localhost:7282/api/user/register",
      payload
    );

    if (response.status === 200) {
      toast.success("User registered successfully!");
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        dateOfBirth: "",
        bloodGroup: "",
        address: "",
        state: "",
        district: "",
        city: "",
        pincode: "",
        role: "",
        password: "",
        confirmPassword: "",
      });
      setSelectedStateId(null);
      setDistricts([]);
    }
  } catch (error) {
    console.error("Registration failed:", error);
    toast.error("Error: " + (error.response?.data?.message || "Something went wrong"));
  }
};

  return (
    <Container className="my-4">
      <Card className="shadow p-4">
        <Row className="align-items-center mb-3">
          <Col>
            <h3 className="mb-0">Add New User</h3>
          </Col>
          <Col md="4" className="text-end">
            <Form.Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Role --</option>
              <option value="Donor">Donor</option>
              <option value="Receiver">Receiver</option>
              <option value="BloodBank">BloodBank</option>
            </Form.Select>
          </Col>
        </Row>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {formData.role !== "BloodBank" && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      
                    >
                      <option value="">-- Select Gender --</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Blood Group</Form.Label>
                    <Form.Select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      
                    >
                      <option value="">-- Select Blood Group --</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </Form.Select>
                  </Form.Group>
                </>
              )}
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>State</Form.Label>
                <Form.Select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select State --</option>
                  {states.map((state) => (
                    <option key={state.stateId} value={state.stateName}>
                      {state.stateName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>District</Form.Label>
                <Form.Select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select District --</option>
                  {districts.map((district) => (
                    <option key={district.districtId} value={district.districtName}>
                      {district.districtName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="text-end">
            <Button variant="primary" type="submit">
              Add User
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default AddUser;
