// BloodBankDonations.jsx
import React, { useEffect, useState } from 'react';
import { getDonationsByBloodBank, addToInventory } from '../../Services/DonationService';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const AllDonations = () => {
  const [donations, setDonations] = useState([]);
  const [bloodBankId, setBloodBankId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setBloodBankId(decoded.UserID);
    }
  }, []);

  useEffect(() => {
    if (bloodBankId) {
      fetchDonations();
    }
  }, [bloodBankId]);

  const fetchDonations = async () => {
    try {
      const res = await getDonationsByBloodBank(bloodBankId);
      setDonations(res.data);
    } catch (err) {
      console.error("Failed to fetch donations", err);
    }
  };

  const handleAddToInventory = async (donationId) => {
    try {
      await addToInventory(donationId);
      toast.success("Donation successfully added to inventory!");
      fetchDonations(); // Refresh table after update
    } catch (err) {
      console.error("Add to inventory failed", err);
      toast.error("Failed to add donation to inventory");
    }
  };

  return (
    <div className="container mt-4" style={{marginBottom: '100px'}}>
      <h2>All Donations</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Donor Name</th>
            <th>Blood Group</th>
            <th>Units</th>
            <th>Donation Date</th>
            <th>NextDonation Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {donations.map(({ donationID, donorName, bloodGroup, unitsDonated, donationDate, nextDonationDate,isAddedToInventory }) => (
            <tr key={donationID}>
              <td>{donorName}</td>
              <td>{bloodGroup}</td>
              <td>{unitsDonated}</td>
              <td>{new Date(donationDate).toLocaleDateString()}</td>
              <td>{new Date(nextDonationDate).toLocaleDateString()}</td>
              <td>
                <button
                  className={`btn btn-${isAddedToInventory ? 'success' : 'secondary'}`}
                  disabled
                >
                  {isAddedToInventory ? 'Added' : 'Pending'}
                </button>
              </td>
              <td>
                {!isAddedToInventory && (
                  <button
                    className="btn btn-warning"
                    onClick={() => handleAddToInventory(donationID)}
                  >
                    Add to Inventory
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-end mt-4">
          <Button
            variant="secondary"
            onClick={() => navigate("/bloodbank-dashboard")}
            style={{ backgroundColor: "blue", borderColor: "blue" }}
          >
            Back
          </Button>
        </div>
    </div>
  );
};

export default AllDonations;
