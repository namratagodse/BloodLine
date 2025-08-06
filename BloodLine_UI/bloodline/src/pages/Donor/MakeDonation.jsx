// src/pages/Donor/MakeDonation.jsx

import React, { useEffect, useState } from "react";
import {
  getAllStates,
  getDistrictsByState,
  getBloodBanksByDistrict,
} from "../../Services/LocationService";
import { insertDonation } from "../../Services/DonationService";

const MakeDonation = () => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [bloodBanks, setBloodBanks] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedBloodBank, setSelectedBloodBank] = useState(null);
  const [showInlineForm, setShowInlineForm] = useState(null); // bloodBankId of open form

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
    setShowInlineForm(bank.userID);
    setDonationDetails({
      unitsdonated: "",
      bloodGroup: "",
    });
  };

  const handleDonationInputChange = (e) => {
    const { name, value } = e.target;
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
      // Reset or show success
    } catch (error) {
      console.error("Donation submission failed:", error);
    }
  };

  return (
    <div className="container mt-5">
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

                    {showInlineForm === bank.userID && (
                      <form
                        onSubmit={handleDonationSubmit}
                        className="mt-2 d-flex flex-column"
                      >
                        <input
                          type="number"
                          name="unitsdonated"
                          placeholder="Units"
                          className="form-control mb-2"
                          value={donationDetails.unitsdonated}
                          onChange={handleDonationInputChange}
                          required
                        />
                        <input
                          type="text"
                          name="bloodGroup"
                          placeholder="Blood Group"
                          className="form-control mb-2"
                          value={donationDetails.bloodGroup}
                          onChange={handleDonationInputChange}
                          required
                        />
                        <button type="submit" className="btn btn-success">
                          Submit Donation
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MakeDonation;
