import React, { useState } from "react";

const DonorDashboard = () => {
  const headerRed = "#a6192e";
  const donorBloodGroup = "B+ve"; // This can be dynamic
  const totalUnitsDonated = 4;

  const [showResults, setShowResults] = useState(false);
  const [lastDonations] = useState([
    { date: "2025-01-15" },
    { date: "2024-10-10" },
  ]);

  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");

  const calculateNextDonation = (lastDate) => {
    const date = new Date(lastDate);
    date.setMonth(date.getMonth() + 3);
    return date.toISOString().split("T")[0];
  };

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
        <button style={{ backgroundColor: headerRed }} className="text-white px-4 py-2 rounded hover:opacity-90">
          Sign Out
        </button>
      </div>

      {/* Scorecard */}
      <div className="max-w-4xl mx-auto my-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="shadow-lg p-6 rounded-2xl" style={{ borderTop: `5px solid ${headerRed}` }}>
          <div className="text-gray-500">Blood Group</div>
          <div className="text-xl font-semibold" style={{ color: headerRed }}>{donorBloodGroup}</div>
        </div>
        <div className="shadow-lg p-6 rounded-2xl" style={{ borderTop: `5px solid ${headerRed}` }}>
          <div className="text-gray-500">Total Units Donated</div>
          <div className="text-xl font-semibold" style={{ color: headerRed }}>{totalUnitsDonated}</div>
        </div>
        <div className="shadow-lg p-6 rounded-2xl" style={{ borderTop: `5px solid ${headerRed}` }}>
          <div className="text-gray-500">Next Donation Date</div>
          <div className="text-xl font-semibold" style={{ color: headerRed }}>
            {calculateNextDonation(lastDonations[0].date)}
          </div>
        </div>
      </div>

      {/* Last Donation Table */}
      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-xl font-semibold text-center mb-6" style={{ color: headerRed }}>
          Donation History
        </h2>
        <table className="w-full text-left border border-gray-200">
          <thead style={{ backgroundColor: headerRed }} className="text-white">
            <tr>
              <th className="py-2 px-4">Last Donation</th>
              <th className="py-2 px-4">Acknowledgement</th>
            </tr>
          </thead>
          <tbody>
            {lastDonations.map((donation, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{donation.date}</td>
                <td className="py-2 px-4">
                  <button className="bg-gray-300 px-3 py-1 rounded hover:opacity-80">Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Search Section */}
      <div className="max-w-md mx-auto mt-14">
        <h2 className="text-xl font-semibold mb-4 text-center" style={{ color: headerRed }}>
          Search Blood Banks in Need
        </h2>
        <div className="mb-4">
          <label className="block mb-2 font-medium">State</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="">Select State</option>
            <option>Maharashtra</option>
            <option>Delhi</option>
            <option>Karnataka</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-medium">District</label>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="">Select District</option>
            <option>Pune</option>
            <option>Mumbai</option>
            <option>Nagpur</option>
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

      {/* Search Results */}
      {showResults && (
        <div className="max-w-4xl mx-auto my-10">
          <h2 className="text-xl font-semibold text-center mb-6" style={{ color: headerRed }}>
            Blood Banks in {district || "your area"} Needing {donorBloodGroup}
          </h2>
          <table className="w-full text-left border border-gray-200">
            <thead style={{ backgroundColor: headerRed }} className="text-white">
              <tr>
                <th className="py-2 px-4">Sr No</th>
                <th className="py-2 px-4">Blood Bank</th>
                <th className="py-2 px-4">Required Blood</th>
              </tr>
            </thead>
            <tbody>
              {["City Blood Bank", "Care Hospital Bank", "HealthLife Blood Bank"].map((bank, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{bank}</td>
                  <td className="py-2 px-4">{donorBloodGroup}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;
