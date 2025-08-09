import React, { useState } from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';

const bloodCompatibility = {
  'A+': { take: ['O+', 'O-', 'A+', 'A-'], give: ['A+', 'AB+'] },
  'O+': { take: ['O+', 'O-'], give: ['O+', 'A+', 'B+', 'AB+'] },
  'B+': { take: ['O+', 'O-', 'B+', 'B-'], give: ['B+', 'AB+'] },
  'AB+': { take: ['Everyone'], give: ['AB+'] },
  'A-': { take: ['O-', 'A-'], give: ['A+', 'A-', 'AB+', 'AB-'] },
  'O-': { take: ['O-'], give: ['Everyone'] },
  'B-': { take: ['O-', 'B-'], give: ['B+', 'B-', 'AB+', 'AB-'] },
  'AB-': { take: ['O-', 'A-', 'B-', 'AB-'], give: ['AB+', 'AB-'] },
  'Bombay Blood': { take: ['Bombay Blood'], give: ['Bombay Blood'] },

};

function DonationInfo() {
  const [selected, setSelected] = useState('A+');
  const { take, give } = bloodCompatibility[selected];

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #ffe6e6 0%, #fff5f5 100%)',
        padding: '60px 0',
      }}
    >
      <Container>
        <h2 className="text-center text-danger fw-bold mb-5">Learn About Donation</h2>

        {/* Blood group buttons */}
        <div className="d-flex flex-wrap justify-content-center mb-5">
          {Object.keys(bloodCompatibility).map(type => (
            <Button
              key={type}
              variant={selected === type ? 'danger' : 'outline-danger'}
              className="m-2 fw-bold"
              style={{
                padding: '12px 22px',
                fontSize: '1.25rem',
                borderWidth: '2px',
                minWidth: '75px',
              }}
              onClick={() => setSelected(type)}
            >
              {type}
            </Button>
          ))}
        </div>

        {/* Info and Image */}
        <Row className="align-items-center">
          <Col md={6}>
            <div
              className="p-4 mb-4 rounded shadow-sm"
              style={{
                backgroundColor: '#ffeeba',
                fontSize: '1.25rem',
              }}
            >
              <h4 className="text-dark fw-bold mb-2">You can take from</h4>
              <p className="mb-0">{Array.isArray(take) ? take.join('   ') : take}</p>
            </div>

            <div
              className="p-4 rounded shadow-sm"
              style={{
                backgroundColor: '#bee5eb',
                fontSize: '1.25rem',
              }}
            >
              <h4 className="text-dark fw-bold mb-2">You can give to</h4>
              <p className="mb-0">{Array.isArray(give) ? give.join('   ') : give}</p>
            </div>
          </Col>

          <Col md={6} className="text-center">
            <img
              src="/images/doctor.png"
              alt="Donate Blood"
              className="img-fluid"
              style={{ maxHeight: '320px' }}
            />
            <p className="text-muted mt-3 fs-5">
              One Blood Donation can save up to{' '}
              <span className="text-danger fw-bold">Three Lives</span>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DonationInfo;
