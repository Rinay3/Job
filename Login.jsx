import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role) {
      alert("Please select a role before logging in.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost/jobportal-backend/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        // Store email in localStorage for profile fetching
        localStorage.setItem("userEmail", result.email);
        localStorage.setItem("userRole", result.role);

        // Role-based navigation
        if (result.role === "employer") {
          navigate("/employer-dashboard");
        } else if (result.role === "jobseeker") {
          navigate("/jobseeker-dashboard");
        }
      } else {
        alert("❌ " + (result.message || "Login failed"));
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("🚨 Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="shadow p-4">
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="role">
                <Form.Label>Login As</Form.Label>
                <Form.Select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select One</option>
                  <option value="jobseeker">Job Seeker</option>
                  <option value="employer">Employer</option>
                </Form.Select>
              </Form.Group>

              <div className="d-grid">
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" /> Logging in...
                    </>
                  ) : "Login"}
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
