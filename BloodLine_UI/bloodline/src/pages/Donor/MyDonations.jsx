import React, { useEffect, useState } from "react";
import { getDonationsByDonorId } from "../../Services/DonationService";
import { Card, Container, Row, Col, Table, Spinner, Alert } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"; // ✅ Added
import { Button } from "react-bootstrap";

const MyDonations = () => {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  let donorId = null;
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      donorId = parseInt(decoded?.UserID);
      console.log("Donor ID from token:", donorId);
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }

  useEffect(() => {
    if (!donorId || isNaN(donorId)) {
      setError("Invalid donor ID.");
      setLoading(false);
      return;
    }

    getDonationsByDonorId(donorId)
      .then((res) => {
        setDonations(res);
        setLoading(false);
      })
      .catch((err) => {
        setError("No donations found or failed to fetch data.");
        setLoading(false);
      });
  }, [donorId]);

  return (
    <div style={{ marginTop: "80px", marginBottom: '50px' }}>
      <Container className="mt-5">
        <h2 className="text-center mb-2">My Donations</h2>
        <p className="text-center text-danger fw-bold mb-4">
          Look at your last donation and donate onwards next donation date
        </p>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        ) : donations.length === 0 ? (
          <Alert variant="info" className="text-center">
            No donations yet.
          </Alert>
        ) : (
                <Table striped bordered hover responsive className="mt-3">
        <thead>
            <tr className="text-center">
            <th>Sr. No</th>
            <th>Units Donated</th>
            <th>Blood Group</th>
            <th>Donation Date</th>
            <th>NextDonation Date</th>
            <th>Blood Bank</th>
            </tr>
        </thead>
        <tbody>
            {donations.map((donation, index) => (
            <tr key={index} className="text-center">
                <td>{index + 1}</td>
                <td>{donation.unitsDonated}</td>
                <td>{donation.bloodGroup}</td>
                <td>{new Date(donation.donationDate).toLocaleDateString()}</td>
                <td>{new Date(donation.nextDonationDate).toLocaleDateString()}</td>
                <td>{donation.bloodBankName || "N/A"}</td>
            </tr>
            ))}
        </tbody>
        </Table>
        )}
      </Container>
      <div className="text-center mt-4">
                  <Button variant="secondary" onClick={() => navigate("/donor-dashboard")}>
                    Back to Dashboard
                  </Button>
                </div>
    </div>
    
  );
};

export default MyDonations;
