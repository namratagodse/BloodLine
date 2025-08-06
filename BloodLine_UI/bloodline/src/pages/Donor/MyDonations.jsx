import React, { useEffect, useState } from "react";
import { getDonationsByDonorId } from "../../Services/DonationService";
import { Card, Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

const MyDonations = () => {
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
    <div style={{ marginTop: "80px" }}>
      <Container className="mt-5">
        <h2 className="text-center mb-2">My Donations</h2>
        <p className="text-center text-danger fw-bold mb-4">
          Look at your last donation and donate after 3 months
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
          <Row>
            {donations.map((donation, index) => (
              <Col key={index} md={12} className="mb-4">
                <Card className="shadow border rounded">
                  <Card.Body style={{ backgroundColor: "#FFF5F7" }}>
                    <Card.Title style={{ color: "#9B1C2E" }}>
                      Donation #{index + 1}
                    </Card.Title>
                    <hr />
                    <p><strong>Units Donated:</strong> {donation.unitsDonated}</p>
                    <p><strong>Blood Group:</strong> {donation.bloodGroup}</p>
                    <p><strong>Donation Date:</strong> {new Date(donation.donationDate).toLocaleDateString()}</p>
                    <p><strong>Blood Bank:</strong> {donation.bloodBankName || "N/A"}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default MyDonations;
