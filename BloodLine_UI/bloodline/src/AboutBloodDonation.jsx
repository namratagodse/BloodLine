import React from 'react';
import { Container } from 'react-bootstrap';

const donationSlides = [
  {
    title: 'Why Donate Blood?',
    content: `Blood donation is a noble act that helps save lives. Donated blood is used during surgeries,
    trauma care, cancer treatments, and for patients with blood disorders. Regular blood donation also
    has health benefits for the donor, such as improved iron regulation and stimulation of new blood cell production.`,
    background: '/images/donate1.jpeg',
  },
  {
    title: 'Who Can Donate?',
    content: `• Age between 18–65 years
• Minimum weight of 45 kg
• Healthy and not suffering from any major illness
• Minimum 90 days gap between donations (males), 120 days (females)`,
    background: '/images/donate3.webp',
  },
  {
    title: 'Types of Blood Donation',
    content: `• Whole Blood: Standard donation, contains all components.
• Platelet Donation: For cancer patients, extracted using apheresis.
• Plasma Donation: Used for burn and trauma victims.
• Double Red Cells: Two units of red cells collected, longer recovery time.`,
    background: '/images/donate2.png',
  },
  {
    title: 'Blood Compatibility',
    content: `O− ➜ All | Receives from: O−
O+ ➜ O+, A+, B+, AB+ | Receives from: O+, O−
A− ➜ A+, A−, AB+, AB− | Receives from: A−, O−
A+ ➜ A+, AB+ | Receives from: A+, A−, O+, O−
B− ➜ B+, B−, AB+, AB− | Receives from: B−, O−
B+ ➜ B+, AB+ | Receives from: B+, B−, O+, O−
AB− ➜ AB+, AB− | Receives from: A−, B−, AB−, O−
AB+ ➜ AB+ | Receives from: All`,
    background: '/images/donate4.jpeg',
  },
  {
    title: 'How the Donation Works',
    content: `1. Donor registration and basic health check-up
2. Blood donation (typically 15-20 minutes)
3. Refreshment and rest
4. Blood testing and component separation
5. Storage and availability in blood bank`,
    background: '/images/donate5.jpeg',
  },
];

function AboutBloodDonation() {
  return (
    <div style={{ marginTop: '60px', fontFamily: '"Times New Roman", Times, serif' }}>
      {donationSlides.map((slide, index) => (
        <div
          key={index}
          style={{
            minHeight: '100vh',
            backgroundImage: `url(${slide.background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '30px'
          }}
        >
          <Container>
            <h1 
              className="fw-bold mb-2" 
              style={{ fontSize: '3.5rem', borderBottom: '2px solid white', paddingBottom: '10px', fontFamily: '"Times New Roman", Times, serif' }}
            >
              {slide.title}
            </h1>
            <pre 
              style={{ 
                fontSize: '1.4rem', 
                whiteSpace: 'pre-wrap', 
                backgroundColor: 'rgba(0,0,0,0.5)', 
                padding: '20px', 
                borderRadius: '10px', 
                border: '2px solid white', 
                fontWeight: 'bold', 
                fontFamily: '"Times New Roman", Times, serif' 
              }}
            >
              {slide.content}
            </pre>
          </Container>
        </div>
      ))}
    </div>
  );
}

export default AboutBloodDonation;
