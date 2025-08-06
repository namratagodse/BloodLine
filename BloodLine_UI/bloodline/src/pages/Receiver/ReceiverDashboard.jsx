import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReceiverDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [bloodBanks, setBloodBanks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      /*
      const [reqData, bankData] = await Promise.all([
        await getReceiverRequests(),       // API: /api/requests/receiver
        await getAvailableBloodBanks(),    // API: /api/bloodbanks
      ]);
      setRequests(reqData);
      setBloodBanks(bankData);
      */
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="container" style={{ marginTop: '90px', marginBottom: '140px' }}>
      <h2 className="text-start text-dark mb-5">Receiver Dashboard</h2>

      <div className="row justify-content-center">
        {/* Raise New Request Card */}
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
            onClick={() => navigate('/receiver-raiserequest')}
          >
            <div className="card-body text-center">
              <h4 className="card-title">Raise New Request</h4>
              <p className="mt-3">Click to proceed &rarr;</p>
            </div>
          </div>
        </div>

        {/* My Requests Card */}
        <div className="col-md-6 mb-4">
          <div
            className="card shadow-sm h-100 text-white"
            style={{
              backgroundColor: '#28a745',
              minHeight: '200px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '50px'
            }}
            onClick={() => navigate('/receiver-myrequests')}
          >
            <div className="card-body text-center">
              <h4 className="card-title">My Requests</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiverDashboard;
