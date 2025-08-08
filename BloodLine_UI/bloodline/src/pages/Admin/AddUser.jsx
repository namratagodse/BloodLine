import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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

    // Restrict phone number to digits only (max 10)
    if (name === "phoneNumber") {
      if (/^\d{0,10}$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }

    // Restrict pincode to digits only (max 6)
    if (name === "pincode") {
      if (/^\d{0,6}$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }

    // State selection logic
    if (name === "state") {
      if (value) {
        const selected = states.find((s) => s.stateName === value);
        setSelectedStateId(selected?.stateId || null);
      } else {
        setSelectedStateId(null);
        setDistricts([]);
      }
    }

    // Default update
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/; // min 8 chars
    const phoneRegex = /^[0-9]{10}$/;
    const cityRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.com$/;
    if (!formData.role) errors.role = "Role is required";
    if (!formData.fullName.trim()) errors.fullName = "Full Name is required";

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Email must contain @ and end with .com";
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      errors.phoneNumber = "Phone number must be exactly 10 digits";
    }

    if (formData.role !== "BloodBank") {
      if (!formData.gender) errors.gender = "Gender is required";
      if (!formData.dateOfBirth) {
        errors.dateOfBirth = "Date of Birth is required";
      } else {
        // Age check
        const today = new Date();
        const dob = new Date(formData.dateOfBirth);
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
          age--;
        }
        if (age < 18) {
          errors.dateOfBirth =
            "You must be at least 18 years old to register";
        }
      }
      if (!formData.bloodGroup) errors.bloodGroup = "Blood Group is required";
    }

    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.state) errors.state = "State is required";
    if (!formData.district) errors.district = "District is required";
    if (!formData.city.trim()) {
      errors.city = "City is required";
    } else if (!cityRegex.test(formData.city)) {
      errors.city = "City must contain only letters";
    }
    if (!formData.pincode.trim()) errors.pincode = "Pincode is required";

    if (!formData.password || !passwordRegex.test(formData.password)) {
      errors.password =
        "Password must be at least 8 characters and contain a capital letter, number, and special character";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((err) => toast.error(err));
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
      Password: formData.password,
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
      toast.error(
        "Error: " + (error.response?.data?.message || "Something went wrong")
      );
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
                      required
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
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Blood Group</Form.Label>
                    <Form.Select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      required
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
                    <option
                      key={district.districtId}
                      value={district.districtName}
                    >
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
       <div className="text-center mt-5">
              <Button variant="secondary" onClick={() => navigate("/admin-dashboard")}>
                Back to Dashboard
              </Button>
            </div>
    </Container>
  );
};

export default AddUser;
