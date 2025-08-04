import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

function FeedbackPage() {
  const [feedback, setFeedback] = useState({
    text: '',
    rating: ''
  });

  // Handle changes in form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('token');
  if (!token) {
    toast.error("User not logged in");
    return;
  }

  try {
    console.log("Token:", token);
const decoded = jwtDecode(token);
console.log("Decoded:", decoded);

const userId = decoded?.UserID || decoded?.userId || decoded?.sub || decoded?.nameid;
console.log("Extracted userId:", userId);

if (!userId) {
  toast.error("Invalid token");
  return;
}


    if (!userId) {
      toast.error("Invalid token");
      return;
    }

    const payload = {
      Action: "INSERT",
      UserID: userId,
      FeedbackText: feedback.text,
      Rating: parseInt(feedback.rating)
    };



    const response = await fetch('https://localhost:7282/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error("Failed to submit");

    toast.success('Feedback submitted successfully!');
    setFeedback({ text: '', rating: '' });

  } catch (error) {
    toast.error('Failed to submit feedback.');
    console.error(error);
  }
};

  return (
    <Container className="mt-5 pt-5" style={{ paddingTop: '100px', paddingBottom: '110px' }}>
      <h2>Submit Feedback</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Feedback</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="text"
            value={feedback.text}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Rating (1-5)</Form.Label>
          <Form.Control
            type="number"
            min="1"
            max="5"
            name="rating"
            value={feedback.rating}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
}

export default FeedbackPage;
