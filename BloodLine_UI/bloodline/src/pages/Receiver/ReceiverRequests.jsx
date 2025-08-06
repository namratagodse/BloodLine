import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const ReceiverRequests = () => {
  const headerRed = "#a6192e";

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    setRequests([
      {
        bloodBank: "Red Cross",
        bloodGroup: "A+",
        units: 2,
        status: "Pending",
      },
      {
        bloodBank: "LifeCare Bank",
        bloodGroup: "O-",
        units: 1,
        status: "Approved",
      },
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-warning fw-semibold";
      case "Approved":
        return "text-success fw-semibold";
      case "Rejected":
        return "text-danger fw-semibold";
      default:
        return "text-secondary";
    }
  };

  return (
    <div className="bg-white min-vh-100 py-5" style={{marginTop: '60px'}}>
      <div className="container text-center mb-4">
        <h2 style={{ color: headerRed }}>Sent Blood Requests</h2>
      </div>

      <div className="container d-flex justify-content-center">
        <div className="table-responsive" style={{ maxWidth: "1000px", width: "100%" }}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th style={{ backgroundColor: '#9B1C2E', color: "white" }}>Blood Bank</th>
                <th style={{ backgroundColor: '#9B1C2E', color: "white" }}>Blood Group</th>
                <th style={{ backgroundColor: '#9B1C2E', color: "white" }}>Units</th>
                <th style={{ backgroundColor: '#9B1C2E', color: "white" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr key={index}>
                  <td>{request.bloodBank}</td>
                  <td>{request.bloodGroup}</td>
                  <td>{request.units}</td>
                  <td className={getStatusColor(request.status)}>{request.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReceiverRequests;
