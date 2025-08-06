import React, { useEffect, useState } from "react";
import {
  getAllStates,
  getDistrictsByState
} from "../../Services/LocationService";
import {
  submitBloodRequest,
  getAvailableBloodBanks
} from "../../Services/BloodRequestService";
import { jwtDecode } from "jwt-decode";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Modal,
  Alert,
  Spinner,
  Card,
  Table
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RaiseBloodRequest = () => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [unitsRequired, setUnitsRequired] = useState("");
  const [bloodBanks, setBloodBanks] = useState([]);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedBloodBank, setSelectedBloodBank] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [requiredDate, setRequiredDate] = useState("");

  const bloodGroups = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ];

  useEffect(() => {
    const fetchStates = async () => {
      const data = await getAllStates();
      console.log("Raw data from getAllStates:", data);
      setStates(data);
    };
    fetchStates();
  }, []);

  const handleStateChange = async (e) => {
    const stateId = e.target.value;
    setSelectedState(stateId);
    setSelectedDistrict("");
    setDistricts([]);
    const data = await getDistrictsByState(stateId);
    setDistricts(data);
  };

  const handleSearch = async () => {
    if (!selectedState || !selectedDistrict || !bloodGroup || !unitsRequired) {
      setAlertMessage("Please fill in all fields.");
      setShowAlert(true);
      return;
    }

    const districtObj = districts.find(
      (d) => d.districtId.toString() === selectedDistrict.toString()
    );
    const districtName = districtObj?.districtName;

    if (!districtName) {
      setAlertMessage("Invalid district selected.");
      setShowAlert(true);
      return;
    }

    setLoading(true);
    try {
      const data = await getAvailableBloodBanks(
        districtName,
        bloodGroup,
        unitsRequired
      );
      setBloodBanks(data);
      if (data.length === 0) {
        setAlertMessage("No blood banks available for the selected criteria.");
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage("Error fetching blood banks.");
      setShowAlert(true);
    }
    setLoading(false);
  };

  const handleRaiseRequestClick = (bloodBank) => {
    setSelectedBloodBank(bloodBank);
    setShowRequestForm(true);
  };

  const handleSubmitRequest = async () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const donorId = decoded.UserID;

      const requestModel = {
        requesterId: donorId,
        bloodBankId: selectedBloodBank.bloodBankId,
        bloodGroup: bloodGroup,
        unitsRequired: parseInt(unitsRequired),
        reason: reason,
        requiredDate: requiredDate,
        };

      await submitBloodRequest(requestModel);
    toast.success("Blood request submitted successfully!"); // ✅ Toast here
    setShowAlert(true);
    setShowRequestForm(false);
  } catch (error) {
    setAlertMessage("Failed to submit blood request.");
    setShowAlert(true);
  }
  };

  return (
    <Container style={{marginTop: '80px'}}>
      <h3>Raise a Blood Request</h3>
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>State</Form.Label>
              <Form.Select value={selectedState} onChange={handleStateChange}>
                <option value="">Select State</option>
                {states &&
                  states.map((state) => (
                    <option key={state.stateId} value={state.stateId}>
                      {state.stateName}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>District</Form.Label>
              <Form.Select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
              >
                <option value="">Select District</option>
                {districts &&
                  districts.map((district) => (
                    <option
                      key={district.districtId}
                      value={district.districtId}
                    >
                      {district.districtName}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Blood Group</Form.Label>
              <Form.Select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option value="">Select Blood Group</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Units Required</Form.Label>
              <Form.Control
                type="number"
                value={unitsRequired}
                onChange={(e) => setUnitsRequired(e.target.value)}
                min={1}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" onClick={handleSearch}>
          Search Blood Banks
        </Button>
      </Form>

      {loading ? (
        <Spinner animation="border" className="mt-3" />
      ) : (
        bloodBanks.length > 0 && (
        <Table striped bordered hover className="mt-3">
        <thead>
            <tr>
            <th style={{ backgroundColor: "#9B1C2E", color: "white" }}>Blood Bank Name</th>
            <th style={{ backgroundColor: "#9B1C2E", color: "white" }}>District</th>
            <th style={{ backgroundColor: "#9B1C2E", color: "white" }}>Action</th>
            </tr>
        </thead>
        <tbody>
            {bloodBanks.map((bank) => (
            <tr key={bank.bloodBankId}>
                <td>{bank.bloodBankName}</td>
                <td>{bank.district}</td>
                <td>
                <Button variant="primary" onClick={() => handleRaiseRequestClick(bank)}>
                    Raise Request
                </Button>
                </td>
            </tr>
            ))}
        </tbody>
        </Table>

        )
      )}

      <Modal show={showRequestForm} onHide={() => setShowRequestForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Blood Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Units Required</Form.Label>
              <Form.Control type="number" value={unitsRequired} disabled />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Blood Group</Form.Label>
              <Form.Control type="text" value={bloodGroup} disabled />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Reason for Request</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Required Date</Form.Label>
              <Form.Control
                type="date"
                value={requiredDate}
                onChange={(e) => setRequiredDate(e.target.value)}
              />
            </Form.Group>

            <p className="mt-3">
              You are about to request <strong>{unitsRequired}</strong> units of{" "}
              <strong>{bloodGroup}</strong> blood from{" "}
              <strong>{selectedBloodBank?.BloodBankName}</strong>.
            </p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRequestForm(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitRequest}>
            Confirm Request
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RaiseBloodRequest;
