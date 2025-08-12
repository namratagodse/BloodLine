
import React, { useState } from "react";

const DonorDashboard = () => {
  const headerRed = "#a6192e";
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    setShowResults(true);
  };

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
        <button style={{ backgroundColor: headerRed }} className="text-white px-4 py-2 rounded hover:opacity-90">Sign Out</button>
      </div>

      {/* Scoreboard */}
      <div className="max-w-xl mx-auto mt-10 text-center border border-gray-300 rounded p-6 shadow">
        <div className="text-xl font-semibold" style={{ color: headerRed }}>Your Donation Summary</div>
        <div className="mt-4">
          <p><span className="font-medium">Blood Group:</span> B+ve</p>
          <p><span className="font-medium">Total Units Donated:</span> 7</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-xl mx-auto mt-10 space-y-4">
        <select className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-700">
          <option value="">Select State</option>
          <option>Maharashtra</option>
          <option>Gujarat</option>
          <option>Delhi</option>
        </select>

        <select className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-700">
          <option value="">Select District</option>
          <option>Pune</option>
          <option>Ahmedabad</option>
          <option>New Delhi</option>
        </select>

        <button
          onClick={handleSearch}
          style={{ backgroundColor: headerRed }}
          className="w-full text-white px-4 py-3 rounded hover:opacity-90"
        >
          Search
        </button>
      </div>

      {/* Donation Table */}
      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: headerRed }}>Last Donations</h2>
        <table className="w-full text-left border border-gray-200">
          <thead style={{ backgroundColor: headerRed }} className="text-white">
            <tr>
              <th className="py-2 px-4">Last Donation</th>
              <th className="py-2 px-4">Acknowledgement</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 px-4">2025-06-12</td>
              <td className="py-2 px-4">
                <button style={{ backgroundColor: headerRed }} className="text-white px-3 py-1 rounded hover:opacity-90">
                  Download
                </button>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4">2025-03-08</td>
              <td className="py-2 px-4">
                <button style={{ backgroundColor: headerRed }} className="text-white px-3 py-1 rounded hover:opacity-90">
                  Download
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonorDashboard;
