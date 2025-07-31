import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomNavbar from './NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';
import MainContent from './MainContent';
import DonationInfo from './DonationInfo';
import SliderCards from './SliderCards';
import DonationSteps from './DonationSteps';
import DonorLogin from './DonorLogin';
import RegisterDonor from './RegisterDonor';
import ReceiverLogin from './ReceiverLogin';
import RegisterReceiver from './RegisterReceiver'; // ✅ New import

function App() {
  return (
    <BrowserRouter>
      <CustomNavbar />

      <Routes>
        {/* Homepage */}
        <Route
          path="/"
          element={
            <>
              <MainContent />
              <DonationInfo />
              <SliderCards />
              <DonationSteps />
            </>
          }
        />

        {/* Donor Login Page */}
        <Route path="/donor-login" element={<DonorLogin />} />

        {/* Donor Registration Page */}
        <Route path="/register-donor" element={<RegisterDonor />} />

        {/* Receiver Login Page */}
        <Route path="/receiver-login" element={<ReceiverLogin />} />

        {/* ✅ Receiver Registration Page */}
        <Route path="/register-receiver" element={<RegisterReceiver />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
