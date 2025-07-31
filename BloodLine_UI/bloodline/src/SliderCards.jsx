import React, { useRef, useEffect } from 'react';

const cardData = [
  {
    icon: "🕒",
    title: "It takes only an hour",
    subtitle: "Donate blood save lives!",
  },
  {
    icon: "🍹",
    title: "Free refreshments after donation",
    subtitle: "Donation of blood is safe and healthy",
  },
  {
    icon: "₹",
    title: "It costs nothing",
    subtitle: "Give blood and stay healthy",
  },
  {
    icon: "❤️",
    title: "Saving lives is priceless",
    subtitle: "Every blood donor is a hero",
  },
];

const AutoScrollCarousel = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    let scrollAmount = 0;

    const scroll = () => {
      scrollAmount += 1;
      if (scrollAmount >= slider.scrollWidth / 2) {
        scrollAmount = 0;
      }
      slider.scrollLeft = scrollAmount;
    };

    const interval = setInterval(scroll, 30); // slower speed

    return () => clearInterval(interval);
  }, []);

  const cardStyle = {
    
    minWidth: '400px',
    maxWidth: '400px',
    margin: '0 15px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
    textAlign: 'center',
    flex: '0 0 auto',
  };

  const outerStyle = {
    overflow: 'hidden',
    width: '100%',
    background: '#6e1e2b',
    padding: '60px 0',
  };

  const innerStyle = {
    display: 'flex',
    whiteSpace: 'nowrap',
  };

  return (
    <div style={outerStyle}>
      <div ref={sliderRef} style={{ ...innerStyle, overflow: 'hidden' }}>
        {[...cardData, ...cardData].map((card, idx) => (
          <div key={idx} style={cardStyle}>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>{card.icon}</div>
            <h4 style={{ fontWeight: 'bold' }}>{card.title}</h4>
            <p>{card.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoScrollCarousel;
