import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import CustomNavbar from './components/NavBar';
import Footer from './components/Footer';
import MainContent from './pages/Home/MainContent';
import DonationInfo from './pages/Home/DonationInfo';
import SliderCards from './pages/Home/SliderCards';
import DonationSteps from './pages/Home/DonationSteps';
import Register from './pages/Register';
import AboutBloodDonation from './pages/AboutBloodDonation';
import Login from './pages/Login';
import AdminHome from './pages/Admin/AdminHome';
 

function App() {
  return (
    <BrowserRouter>
      <CustomNavbar />

      <Routes>
        {/* Home Page */}
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

        {/* Donor Registration Page */}
        <Route path="/register" element={<Register />} />

        {/* About Blood Donation Page */}
        <Route path="/about-blood-donation" element={<AboutBloodDonation />} />

        {/* Donor/Receiver Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard Page */}
        <Route path="/admin-dashboard" element={<AdminHome />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
