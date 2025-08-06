import React, { useEffect, useState } from "react";
import {
  getAllStates,
  getDistrictsByState,
  getBloodBanksByDistrict,
} from "../../Services/LocationService";
import { insertDonation } from "../../Services/DonationService";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 


const MakeDonation = () => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [bloodBanks, setBloodBanks] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedBloodBank, setSelectedBloodBank] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const [donationDetails, setDonationDetails] = useState({
    unitsdonated: "",
    bloodGroup: "",
  });

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.UserID || null;
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchStates = async () => {
      const data = await getAllStates();
      setStates(data);
    };
    fetchStates();
  }, []);

  const handleStateChange = async (e) => {
    const selectedStateId = parseInt(e.target.value);
    setSelectedState(selectedStateId);

    if (!isNaN(selectedStateId)) {
      const data = await getDistrictsByState(selectedStateId);
      setDistricts(data);
      setSelectedDistrict("");
      setBloodBanks([]);
    }
  };

  const handleDistrictChange = async (e) => {
    const districtName = e.target.value;
    setSelectedDistrict(districtName);

    if (districtName) {
      const data = await getBloodBanksByDistrict(districtName);
      setBloodBanks(data);
    }
  };

  const handleDonateClick = (bank) => {
    setSelectedBloodBank(bank);
    setDonationDetails({
      unitsdonated: "",
      bloodGroup: "",
    });
    setShowPopup(true);
  };

  const handleDonationInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "unitsdonated" && parseInt(value) > 3) return;

    setDonationDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleDonationSubmit = async (e) => {
  e.preventDefault();

  const donationData = {
    donorId: parseInt(getUserIdFromToken()),
    bloodBankId: parseInt(selectedBloodBank.userID),
    unitsdonated: parseInt(donationDetails.unitsdonated),
    bloodGroup: donationDetails.bloodGroup,
  };

  try {
    const response = await insertDonation(donationData);
    console.log("Donation successful:", response);
    setShowPopup(false);
    toast.success("Donated successfully!"); // ✅ Added toast here
  } catch (error) {
    console.error("Donation submission failed:", error);
  }
};


  return (
    <div className="container" style={{marginTop: '80px'}}>
      <h2>Make a New Donation</h2>

      {/* State Dropdown */}
      <div className="mb-3">
        <label>Select State:</label>
        <select
          className="form-select"
          value={selectedState}
          onChange={handleStateChange}
        >
          <option value="">Select State</option>
          {Array.isArray(states) &&
            states.map((state) => (
              <option key={state.stateId} value={state.stateId}>
                {state.stateName}
              </option>
            ))}
        </select>
      </div>

      {/* District Dropdown */}
      <div className="mb-3">
        <label>Select District:</label>
        <select
          className="form-select"
          value={selectedDistrict}
          onChange={handleDistrictChange}
        >
          <option value="">Select District</option>
          {Array.isArray(districts) &&
            districts.map((district) => (
              <option key={district.districtId} value={district.districtName}>
                {district.districtName}
              </option>
            ))}
        </select>
      </div>

      {/* Blood Bank List */}
      {bloodBanks.length > 0 && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(bloodBanks) &&
              bloodBanks.map((bank) => (
                <tr key={bank.userID}>
                  <td>{bank.fullName}</td>
                  <td>{bank.address}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleDonateClick(bank)}
                    >
                      Donate
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      {/* Popup Modal */}
      <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Submit Donation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleDonationSubmit}>
            <div className="mb-3">
              <input
                type="number"
                name="unitsdonated"
                placeholder="Units (Max 2 as 1 unit = 300ml)"
                className="form-control"
                value={donationDetails.unitsdonated}
                onChange={handleDonationInputChange}
                required
                min={1}
                max={2}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="bloodGroup"
                placeholder="Blood Group"
                className="form-control"
                value={donationDetails.bloodGroup}
                onChange={handleDonationInputChange}
                required
              />
            </div>
            <div className="text-end">
              <Button variant="secondary" onClick={() => setShowPopup(false)}>
                Cancel
              </Button>{" "}
              <Button type="submit" variant="success">
                Submit
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MakeDonation;
