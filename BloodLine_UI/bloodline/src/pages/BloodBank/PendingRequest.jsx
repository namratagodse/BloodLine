import React, { useEffect, useState } from 'react';
import { getRequestsByStatus } from '../services/BloodRequestService';

const RejectedRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRejectedRequests = async () => {
      const data = await getRequestsByStatus("Rejected");
      setRequests(data);
    };

    fetchRejectedRequests();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Rejected Blood Requests</h3>
      {requests.length === 0 ? (
        <p>No rejected requests found.</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Request ID</th>
              <th>User Name</th>
              <th>Blood Group</th>
              <th>Units Required</th>
              <th>Reason</th>
              <th>Required Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.requestId}>
                <td>{req.requestId}</td>
                <td>{req.fullName}</td>
                <td>{req.bloodGroup}</td>
                <td>{req.unitsRequired}</td>
                <td>{req.reason}</td>
                <td>{new Date(req.requiredDate).toLocaleDateString()}</td>
                <td>{req.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RejectedRequest;
