import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Spinner, Alert, Button } from "react-bootstrap";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

const BloodInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not logged in");
          setLoading(false);
          return;
        }

        const decoded = jwtDecode(token);
        const bloodBankId = decoded?.UserID;

        const response = await axios.get(
          `https://bloodlinecdac-aya6f2gja8emghg2.canadacentral-01.azurewebsites.net/api/BloodInventory/GetInventoryByBloodBankId/${bloodBankId}`
        );
        setInventory(response.data);
      } catch (err) {
        console.error("Error fetching inventory:", err);
        setError("Failed to load blood inventory.");
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  if (loading) return <Spinner animation="border" variant="danger" />;

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-4">
      <h3 className="text-center text-danger mb-4">Blood Inventory</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>Blood Group</th>
            <th>Units Available</th>
            <th>Last Updated</th>
            <th>Blood Bank</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={index} className="text-center">
              <td>{item.bloodGroup}</td>
              <td>{item.unitsAvailable}</td>
              <td>{new Date(item.lastUpdated).toLocaleString()}</td>
              <td>{item.bloodBankName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-end mt-4">
          <Button
            variant="secondary"
            onClick={() => navigate("/bloodbank-dashboard")}
            style={{ backgroundColor: "blue", borderColor: "blue" }}
          >
            Back
          </Button>
        </div>
    </Container>
    
  );
};

export default BloodInventory;
