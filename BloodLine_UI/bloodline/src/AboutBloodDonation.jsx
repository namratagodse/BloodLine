import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function AboutBloodDonation() {
  return (
    <div style={{ marginTop: '90px', paddingBottom: '30px' }}>
      <Container>
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h1 className="text-center text-danger fw-bold">About Blood Donation</h1>
            <p className="text-center text-muted">“A single pint can save three lives, a single gesture can create a million smiles.”</p>
          </Col>
        </Row>

        {/* Why Donate */}
        <Row className="mb-5">
          <Col>
            <h3 className="text-danger">Why Donate Blood?</h3>
            <p>
              Blood donation is a noble act that helps save lives. Donated blood is used during surgeries,
              trauma care, cancer treatments, and for patients with blood disorders. Regular blood donation also
              has health benefits for the donor, such as improved iron regulation and stimulation of new blood cell production.
            </p>
          </Col>
        </Row>

        {/* Eligibility */}
        <Row className="mb-5">
          <Col>
            <h3 className="text-danger">Who Can Donate?</h3>
            <ul>
              <li>Age between 18–65 years</li>
              <li>Minimum weight of 45 kg</li>
              <li>Healthy and not suffering from any major illness</li>
              <li>Minimum 90 days gap between donations (males), 120 days (females)</li>
            </ul>
          </Col>
        </Row>

        {/* Types of Donations */}
        <Row className="mb-5">
          <Col>
            <h3 className="text-danger">Types of Blood Donation</h3>
            <ul>
              <li><strong>Whole Blood:</strong> Standard donation, contains all components.</li>
              <li><strong>Platelet Donation:</strong> For cancer patients, extracted using apheresis.</li>
              <li><strong>Plasma Donation:</strong> Used for burn and trauma victims.</li>
              <li><strong>Double Red Cells:</strong> Two units of red cells collected, longer recovery time.</li>
            </ul>
          </Col>
        </Row>

        {/* Compatibility Chart */}
        <Row className="mb-5">
          <Col>
            <h3 className="text-danger">Blood Compatibility</h3>
            <div className="table-responsive">
              <table className="table table-bordered text-center">
                <thead className="table-danger">
                  <tr>
                    <th>Blood Group</th>
                    <th>Can Donate To</th>
                    <th>Can Receive From</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>O−</td><td>All</td><td>O−</td></tr>
                  <tr><td>O+</td><td>O+, A+, B+, AB+</td><td>O+, O−</td></tr>
                  <tr><td>A−</td><td>A+, A−, AB+, AB−</td><td>A−, O−</td></tr>
                  <tr><td>A+</td><td>A+, AB+</td><td>A+, A−, O+, O−</td></tr>
                  <tr><td>B−</td><td>B+, B−, AB+, AB−</td><td>B−, O−</td></tr>
                  <tr><td>B+</td><td>B+, AB+</td><td>B+, B−, O+, O−</td></tr>
                  <tr><td>AB−</td><td>AB+, AB−</td><td>A−, B−, AB−, O−</td></tr>
                  <tr><td>AB+</td><td>AB+</td><td>All</td></tr>
                </tbody>
              </table>
            </div>
          </Col>
        </Row>

        {/* Donation Process */}
        <Row>
          <Col>
            <h3 className="text-danger">How the Donation Works</h3>
            <ol>
              <li>Donor registration and basic health check-up</li>
              <li>Blood donation (typically 15-20 minutes)</li>
              <li>Refreshment and rest</li>
              <li>Blood testing and component separation</li>
              <li>Storage and availability in blood bank</li>
            </ol>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AboutBloodDonation;
