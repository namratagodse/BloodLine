import React from 'react';

const AdminDashboard = () => {
  // Dummy data
  const bloodRequests = 24;
  const donationRequests = 16;
  const bloodInventory = [
    { bloodGroup: 'A+', units: 12 },
    { bloodGroup: 'B+', units: 8 },
    { bloodGroup: 'O-', units: 5 },
  ];

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Admin Dashboard</h2>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5 className="card-title">Blood Requests</h5>
              <p className="display-6 text-danger">{bloodRequests}</p>
              <p className="card-text">Pending blood requests in system.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5 className="card-title">Donation Requests</h5>
              <p className="display-6 text-success">{donationRequests}</p>
              <p className="card-text">Upcoming donation appointments.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5 className="card-title">Blood Inventory</h5>
              <ul className="list-unstyled">
                {bloodInventory.map((item, i) => (
                  <li key={i}>
                    <strong>{item.bloodGroup}</strong>: {item.units} units
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
