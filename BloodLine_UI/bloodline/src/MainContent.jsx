import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function MainContent() {
  return (
    <Carousel fade interval={3000}>
      {/* Slide 1 */}
      <Carousel.Item>
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between px-5 py-4 bg-light" style={{ marginTop: '80px' }}>
          <div className="text-center text-md-start">
            <h3 className="text-danger fw-bold">Give Blood, Give Hope Together</h3>
            <h1 className="display-4 fw-bold">WE SAVE LIVES!</h1>
            <p className="lead">
              Find blood instantly. Locate nearby blood banks.<br />
              Register as a donor. Save lives with just one tap.
            </p>
            <Link to="/donor-login">
              <Button variant="danger" size="lg">Become a Donor</Button>
            </Link>
          </div>
          <img
            className="d-none d-md-block img-fluid"
            src="/images/main1.jpg"
            alt="First slide"
            style={{ maxHeight: '350px' }}
          />
        </div>
      </Carousel.Item>

      {/* Slide 2 */}
      <Carousel.Item>
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between px-5 py-4 bg-light" style={{ marginTop: '80px' }}>
          <div className="text-center text-md-start">
            <h3 className="text-danger fw-bold">World Blood Donor Day</h3>
            <h1 className="display-4 fw-bold">14 June 2025</h1>
            <p className="lead">
              Your one unit of blood can save three lives. Join the movement.<br />
              Donate blood and become a hero.
            </p>
          </div>
          <img
            className="d-none d-md-block img-fluid"
            src="/images/WorldDay.jpeg"
            alt="Second slide"
            style={{ height: '350px', width: '450px' }}
          />
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default MainContent;
