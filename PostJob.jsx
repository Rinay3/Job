// PostJob.jsx
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Spinner, Alert } from "react-bootstrap";

export default function PostJob() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    email: "", // Employer's email to fetch name for employer_id
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await fetch("http://localhost/jobportal-backend/post_job.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ text: `✅ ${result.message} (Employer ID: ${result.employer_id})`, type: "success" });
        setFormData({ title: "", description: "", location: "", salary: "", email: "" });
      } else {
        setMessage({ text: `❌ ${result.message}`, type: "danger" });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({ text: "🚨 Something went wrong. Please try again.", type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="p-4 shadow rounded-4">
            <h2 className="text-center mb-4">Post a Job</h2>

            {message.text && <Alert variant={message.type}>{message.text}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter job title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Job Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Enter job description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="salary">
                <Form.Label>Salary</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter salary range (e.g., 5-8 LPA)"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Your Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your registered email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <div className="d-grid">
                <Button type="submit" variant="success" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" /> Posting...
                    </>
                  ) : (
                    "Post Job"
                  )}
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
