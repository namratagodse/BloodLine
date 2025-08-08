import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { registerUser } from '../Services/RegisterService';
import { getAllStates, getDistrictsByState } from '../Services/LocationService'; // using same service as AddUser

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    bloodGroup: '',
    address: '',
    state: '',
    district: '',
    city: '',
    pincode: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState('');

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState(null);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  useEffect(() => {
    getAllStates()
      .then((res) => setStates(res))
      .catch((err) => console.error('Error fetching states', err));
  }, []);

  useEffect(() => {
    if (selectedStateId) {
      getDistrictsByState(selectedStateId)
        .then((res) => setDistricts(res))
        .catch((err) => console.error('Error fetching districts', err));
    } else {
      setDistricts([]);
    }
  }, [selectedStateId]);

  const validateForm = () => {
    const newErrors = {};
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8}$/; // updated length to exactly 8
    const phoneRegex = /^[0-9]{10}$/; // only 10 digits
    const pincodeRegex = /^[0-9]{6}$/; // only 6 digits
    const emailRegex = /^[a-z0-9]+@[a-z0-9]+\.(com)$/; // lowercase, digits, must end with .com

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email must be lowercase, digits, and end with .com';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood Group is required';
    if (!formData.role) newErrors.role = 'Role is required';

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!pincodeRegex.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be exactly 6 digits';
    }

    if (!formData.password || !passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must contain 1 capital letter, 1 number, 1 special char, and be exactly 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'state') {
      const selected = states.find((s) => s.stateName === value);
      setSelectedStateId(selected?.stateId || null);
      setFormData((prev) => ({ ...prev, state: value, district: '', city: '' }));
      return;
    }

    if (name === 'district') {
      setFormData((prev) => ({ ...prev, district: value, city: '' }));
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formValidationErrors = validateForm();

    if (Object.keys(formValidationErrors).length === 0) {
      try {
        await registerUser(formData);
        toast.success('Registration Successful!');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          gender: '',
          dob: '',
          bloodGroup: '',
          address: '',
          state: '',
          district: '',
          city: '',
          pincode: '',
          password: '',
          confirmPassword: '',
          role: '',
        });
        setErrors({});
        setSelectedStateId(null);
        setDistricts([]);
      } catch (error) {
        toast.error(error.message || 'Registration failed');
      }
    } else {
      setErrors(formValidationErrors);
    }
  };

  return (
    <div className="mt-5 pt-4">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={7}>
            <div className="border rounded p-4 shadow">
              <h3 className="text-start mb-4 text-danger fw-bold">Registration</h3>
              {submitted && <Alert variant="success">Registration Successful!</Alert>}
              {apiError && <Alert variant="danger">{apiError}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Form.Group className="mb-4">
                    <Form.Label>Role*</Form.Label>
                    <Form.Select name="role" value={formData.role} onChange={handleChange} isInvalid={!!errors.role}>
                      <option value="">-- Select Role --</option>
                      <option value="Donor">Donor</option>
                      <option value="Receiver">Receiver</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{errors.role}</Form.Control.Feedback>
                  </Form.Group>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name*</Form.Label>
                      <Form.Control type="text" name="fullName" value={formData.fullName} onChange={handleChange} isInvalid={!!errors.fullName} />
                      <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email*</Form.Label>
                      <Form.Control
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={(e) => {
                          // only lowercase letters, numbers, @ and .
                          const val = e.target.value.replace(/[^a-z0-9@.]/g, '');
                          setFormData({ ...formData, email: val });
                        }}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number*</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={formData.phone}
                        maxLength={10}
                        onChange={(e) => {
                          const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                          setFormData({ ...formData, phone: onlyNums });
                        }}
                        isInvalid={!!errors.phone}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phone}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Gender*</Form.Label>
                      <Form.Select name="gender" value={formData.gender} onChange={handleChange} isInvalid={!!errors.gender}>
                        <option value="">-- Select Gender --</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Date of Birth*</Form.Label>
                      <Form.Control type="date" name="dob" value={formData.dob} onChange={handleChange} isInvalid={!!errors.dob} />
                      <Form.Control.Feedback type="invalid">{errors.dob}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Blood Group*</Form.Label>
                      <Form.Select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} isInvalid={!!errors.bloodGroup}>
                        <option value="">-- Select Blood Group --</option>
                        {bloodGroups.map((group) => (
                          <option key={group}>{group}</option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">{errors.bloodGroup}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control as="textarea" name="address" rows={2} value={formData.address} onChange={handleChange} />
                </Form.Group>

                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>State</Form.Label>
                      <Form.Select name="state" value={formData.state} onChange={handleChange}>
                        <option value="">-- Select State --</option>
                        {states.map((state) => (
                          <option key={state.stateId} value={state.stateName}>
                            {state.stateName}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>District</Form.Label>
                      <Form.Select name="district" value={formData.district} onChange={handleChange} disabled={!formData.state}>
                        <option value="">-- Select District --</option>
                        {districts.map((district) => (
                          <option key={district.districtId} value={district.districtName}>
                            {district.districtName}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Pincode</Form.Label>
                      <Form.Control
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        maxLength={6}
                        onChange={(e) => {
                          const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                          setFormData({ ...formData, pincode: onlyNums });
                        }}
                        isInvalid={!!errors.pincode}
                      />
                      <Form.Control.Feedback type="invalid">{errors.pincode}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Password*</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        maxLength={8}
                        onChange={(e) => {
                          // Limit to 8 chars
                          const val = e.target.value.slice(0, 8);
                          setFormData({ ...formData, password: val });
                        }}
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password*</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    maxLength={8}
                    onChange={(e) => {
                      const val = e.target.value.slice(0, 8);
                      setFormData({ ...formData, confirmPassword: val });
                    }}
                    isInvalid={!!errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                </Form.Group>

                <div className="text-center">
                  <Button type="submit" variant="danger">Register</Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
