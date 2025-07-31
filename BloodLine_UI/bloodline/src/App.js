import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import CustomNavbar from './NavBar';
import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Ensure this is imported!
import Footer from './Footer';

function App() {
  return (
    <BrowserRouter>
      <CustomNavbar />
      <div className="container mt-4">
        <h1>Welcome to BloodLine</h1>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
