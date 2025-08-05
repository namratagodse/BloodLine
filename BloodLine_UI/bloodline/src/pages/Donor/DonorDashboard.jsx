import React from 'react';
import { useNavigate } from 'react-router-dom';

const DonorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ marginTop: '90px', marginBottom: '140px' }}>
      <h2 className="text-start text-dark mb-5">Donor Dashboard</h2>

      <div className="row justify-content-center">
        {/* Make New Donation Card */}
        <div className="col-md-6 mb-4">
          <div
            className="card shadow-sm h-100 text-white"
            style={{
              backgroundColor: '#007bff',
              minHeight: '200px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '50px'
            }}
            onClick={() => navigate('/donor/donate')}
          >
            <div className="card-body text-center">
              <h4 className="card-title">Make New Donation</h4>
              <p className="mt-3">Click to proceed &rarr;</p>
            </div>
          </div>
        </div>

        {/* My Donations Card */}
        <div className="col-md-6 mb-4">
          <div
            className="card shadow-sm h-100 text-white"
            style={{
              backgroundColor: '#28a745',
              minHeight: '200px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '50px'
            }}
          >
            <div className="card-body text-center">
              <h4 className="card-title">My Donations</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
