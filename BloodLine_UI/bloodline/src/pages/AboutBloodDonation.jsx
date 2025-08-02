import React from 'react';
import { Container } from 'react-bootstrap';

const donationSlides = [
  {
    title: 'Who Can Donate?',
    content: `• You must be between 18 to 65 years of age.
• Your body weight should be at least 45 kg.
• You should be healthy and not suffering from any major illness.
• Hemoglobin level must be at least 12.5 g/dL.
• Your pulse and blood pressure should be normal.
• There must be a minimum gap of 3 months (males) or 4 months (females) between donations.
• You should not have consumed alcohol in the last 24 hours.
• You should have had a light meal and proper sleep before donating.
• Women should not donate during pregnancy or while breastfeeding.
• Avoid donation for 6–12 months if you’ve recently had a tattoo or piercing.
• Avoid donation if you are taking antibiotics or are recovering from an infection.`,
    background: '/images/donate1.jpeg',
  },
  {
    title: 'Stats about Blood?',
    content: `#According to a 2012 World Health Organisation (WHO) report, only nine million units are collected annually, while the need is for 12 million units.

# Delhi NCR alone faces a shortage of 100,000 units per year.

# The shelf-life of donated blood is 35 to 42 days. There is a constant need to replenish stocks in our blood banks.

# Healthy donors are between the age of 18 to 65 years.

# Statistics show that there are 234 million major operations in India, 63 million trauma-induced surgeries, 31 million cancer-related procedures and 10 million pregnancy related complications which require blood transfusions.`,
    background: '/images/donate3.webp',
  },
  {
    title: 'Facts About Blood',
    content: `# One unit of donated blood can save up to three lives.

# You can donate blood every three months. It only takes 48 hours for your body fluids to be completely replenished.

# Scientists have estimated the volume of blood in the human body to be eight percent of body weight.

# There are 100,000 miles of blood vessels in an adult human body.

# A red blood cell can make a complete circuit of your body in 30 seconds.

# White blood cells make up about 1% of your blood.`,
    background: '/images/donate2.png',
  },
  {
    title: 'Benefits of Donating Blood',
    content: `Less likely to suffer diseases

# Did you know that people who donate blood are 88% less likely to suffer a heart attack and 33% less likely to acquire any type of cardiovascular disease.

# When you donate blood, it removes 225 to 250 milligrams of iron from your body, hence reducing the risk of heart disease.

# Blood Center performs numerous tests on the donate.Therefore regular blood donation helps in sheilding you from serious diseases.`,
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
