import React from 'react';

const steps = [
  {
    icon: "✔️",
    title: "Registration Process",
    subtitle: "Sign up and schedule your first with ease",
  },
  {
    icon: "💓",
    title: "Health Screening",
    subtitle: "A simple check-up to ensure you’re ready to donate",
  },
  {
    icon: "🤲",
    title: "Donation Day",
    subtitle: "Relax as our professional staff guide you through",
  },
];

const DonationSteps = () => {
  return (
    <div style={{
      background: "linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6)), url('https://www.transparenttextures.com/patterns/white-wall.png')",
      padding: "60px 20px",
      textAlign: "center",
      backgroundColor: "#fce5e8",
      marginBottom: "0"
    }}>
      <h2 style={{ fontWeight: "bold", fontSize: "32px", marginBottom: "40px" }}>
        How <span style={{ color: "#c62828" }}>Donation</span> Works?
      </h2>

      <div style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "30px"
      }}>
        {steps.map((step, index) => (
          <div key={index} style={{
            width: "280px",
            backgroundColor: "#fff",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            padding: "30px 20px",
            transition: "transform 0.3s",
          }}>
            <div style={{
              fontSize: "48px",
              color: "#d32f2f",
              marginBottom: "20px"
            }}>
              {step.icon}
            </div>
            <h4 style={{ color: "#c62828", fontWeight: "bold", fontSize: "18px", marginBottom: "10px" }}>
              {step.title}
            </h4>
            <p style={{ color: "#333", fontSize: "15px" }}>{step.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationSteps;
