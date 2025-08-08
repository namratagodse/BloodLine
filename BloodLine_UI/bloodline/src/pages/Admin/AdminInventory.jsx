import axios from "axios";
import React, { useEffect, useState } from "react";
import { getAllBloodBanks } from "../../Services/UserService";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminInventory = () => {
  const [bloodBanks, setBloodBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [inventory, setInventory] = useState([]);
  const navigate = useNavigate();

  // Load all blood banks on page load
  useEffect(() => {
    getAllBloodBanks()
      .then((banks) => {
        console.log("Blood banks from API:", banks);
        setBloodBanks(banks); // Already an array from API
      })
      .catch((err) => console.error("Failed to fetch blood banks", err));
  }, []);

  // Fetch inventory whenever a blood bank is selected
  useEffect(() => {
    if (selectedBank) {
      axios
        .get(
          `https://localhost:7282/api/BloodInventory/GetInventoryByBloodBankId/${selectedBank}`
        )
        .then((res) => {
          console.log("Inventory for bank:", res.data);
          setInventory(res.data);
        })
        .catch((err) => console.error("Failed to fetch inventory", err));
    }
  }, [selectedBank]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Admin Blood Inventory</h2>

      {/* Blood bank dropdown */}
      <div className="row mb-4">
        <div className="col-md-6 offset-md-3">
          <select
            className="form-select"
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
          >
            <option value="">Select Blood Bank</option>
            {bloodBanks.map((bank) => (
              <option key={bank.userID} value={bank.userID}>
                {bank.fullName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Inventory table */}
      {selectedBank && (
        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>Blood Bank</th>
                <th>Blood Group</th>
                <th>Units</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {inventory.length > 0 ? (
                inventory.map((item) => (
                  <tr key={item.inventoryID}>
                    <td>{item.bloodBankName}</td>
                    <td>{item.bloodGroup}</td>
                    <td>{item.unitsAvailable}</td>
                    <td>
                      {item.lastUpdated
                        ? new Date(item.lastUpdated).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No inventory data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <div className="text-center mt-5">
        <Button variant="secondary" onClick={() => navigate("/admin-dashboard")}>
          Back to Dashboard
        </Button>
      </div>
    </div>
    
  );
};

export default AdminInventory;
