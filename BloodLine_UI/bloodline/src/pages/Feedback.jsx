import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

function FeedbackPage() {
  const [feedback, setFeedback] = useState({
    text: '',
    rating: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace with your actual feedback API
    const token = localStorage.getItem('token');
    fetch('https://localhost:7282/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(feedback)
    })
      .then((res) => res.ok ? res.json() : Promise.reject("Error"))
      .then(() => {
        toast.success('Feedback submitted!');
        setFeedback({ text: '', rating: '' });
      })
      .catch(() => toast.error('Failed to submit feedback.'));
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
