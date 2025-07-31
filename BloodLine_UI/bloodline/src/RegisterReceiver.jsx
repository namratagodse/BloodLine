import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

function RegisterReceiver() {
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
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const stateDistrictCity = {
    Maharashtra: {
      Pune: ['Pune City', 'Hinjewadi', 'Wakad'],
      Mumbai: ['Andheri', 'Borivali', 'Thane']
    },
    Karnataka: {
      Bengaluru: ['Whitefield', 'Indiranagar'],
      Mysuru: ['VV Mohalla', 'JP Nagar']
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood Group is required';
    if (!formData.password || !passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must contain a capital letter, number, and special character';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    // Clear city and district if state changes
    if (name === 'state') {
      setFormData((prev) => ({ ...prev, district: '', city: '' }));
    } else if (name === 'district') {
      setFormData((prev) => ({ ...prev, city: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formValidationErrors = validateForm();

    if (Object.keys(formValidationErrors).length === 0) {
      console.log('Form Submitted', formData);
      setSubmitted(true);
      setErrors({});
    } else {
      setErrors(formValidationErrors);
      setSubmitted(false);
    }
  };

  return (
    <div className="mt-5 pt-4">
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={7}>
          <div className="border rounded p-4 shadow">
            <h3 className="text-center mb-4 text-danger fw-bold">Receiver Registration</h3>
            {submitted && <Alert variant="success">Registration Successful!</Alert>}

            <Form onSubmit={handleSubmit}>
              <Row>
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
                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} isInvalid={!!errors.email} />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number*</Form.Label>
                    <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} isInvalid={!!errors.phone} />
                    <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
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
                      {Object.keys(stateDistrictCity).map((state) => (
                        <option key={state}>{state}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>District</Form.Label>
                    <Form.Select name="district" value={formData.district} onChange={handleChange} disabled={!formData.state}>
                      <option value="">-- Select District --</option>
                      {formData.state &&
                        Object.keys(stateDistrictCity[formData.state]).map((district) => (
                          <option key={district}>{district}</option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Select name="city" value={formData.city} onChange={handleChange} disabled={!formData.district}>
                      <option value="">-- Select City --</option>
                      {formData.state && formData.district &&
                        stateDistrictCity[formData.state][formData.district].map((city) => (
                          <option key={city}>{city}</option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control type="text" name="pincode" value={formData.pincode} onChange={handleChange} />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Password*</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
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
                  onChange={handleChange}
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

export default RegisterReceiver;
