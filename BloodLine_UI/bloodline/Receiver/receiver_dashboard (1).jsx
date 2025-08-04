import React, { useState } from "react";

const ReceiverDashboard = () => {
  const headerRed = "#a6192e";
  const [showResults, setShowResults] = useState(false);
  const [requestsSent, setRequestsSent] = useState([]);

  const handleSearch = () => {
    setShowResults(true);
  };

  const handleRequest = (index) => {
    setRequestsSent((prev) => [...prev, index]);
  };

  const bloodGroups = [
    "AB -ve", "AB +ve", "A -ve", "A +ve", "B -ve", "B +ve",
    "Oh -ve", "Oh +ve", "O -ve", "O +ve", "All Blood Groups"
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <nav style={{ backgroundColor: headerRed }} className="text-white px-6 py-4 flex items-center">
        <div className="text-2xl font-bold">BloodLine</div>
      </nav>

      {/* Welcome and Sign Out Row */}
      <div className="flex justify-between items-center px-6 mt-4">
        <div className="text-lg font-medium" style={{ color: headerRed }}>
          Welcome Himanshu Dapurkar!!
        </div>
        <button style={{ backgroundColor: headerRed }} className="text-white px-4 py-2 rounded hover:opacity-90">
          Sign Out
        </button>
      </div>

      {/* Form Section */}
      <div className="max-w-md mx-auto mt-10">
        <div className="mb-4">
          <label className="block mb-2 font-medium">State</label>
          <select className="w-full border px-4 py-2 rounded">
            <option>Select State</option>
            <option>Maharashtra</option>
            <option>Delhi</option>
            <option>Karnataka</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">District</label>
          <select className="w-full border px-4 py-2 rounded">
            <option>Select District</option>
            <option>Pune</option>
            <option>Mumbai</option>
            <option>Nagpur</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-medium">Blood Group</label>
          <select className="w-full border px-4 py-2 rounded">
            <option value="">Select Blood Group</option>
            {bloodGroups.map((group, idx) => (
              <option key={idx}>{group}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSearch}
          style={{ backgroundColor: headerRed }}
          className="w-full text-white px-4 py-2 rounded hover:opacity-90"
        >
          Search
        </button>
      </div>

      {/* Results Table */}
      {showResults && (
        <div className="max-w-4xl mx-auto my-10">
          <h2 className="text-xl font-semibold text-center mb-6" style={{ color: headerRed }}>
            Search Results
          </h2>
          <table className="w-full text-left border border-gray-200">
            <thead style={{ backgroundColor: headerRed }} className="text-white">
              <tr>
                <th className="py-2 px-4">Sr No</th>
                <th className="py-2 px-4">Blood Bank</th>
                <th className="py-2 px-4">Availability</th>
                <th className="py-2 px-4">Request</th>
              </tr>
            </thead>
            <tbody>
              {["Red Cross", "City Hospital", "LifeCare Bank"].map((bank, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{bank}</td>
                  <td className="py-2 px-4">Yes</td>
                  <td className="py-2 px-4">
                    {requestsSent.includes(index) ? (
                      <button
                        className="bg-gray-400 text-white px-3 py-1 rounded cursor-default"
                        disabled
                      >
                        Request Sent
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRequest(index)}
                        style={{ backgroundColor: headerRed }}
                        className="text-white px-3 py-1 rounded hover:opacity-90"
                      >
                        Raise a Request
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReceiverDashboard;
