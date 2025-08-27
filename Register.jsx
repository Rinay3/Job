  // Register.jsx
  import React, { useState } from "react";
  import { Container, Row, Col, Form, Button, Card, Spinner, Alert } from "react-bootstrap";
  import { useNavigate } from "react-router-dom";

  export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" }); // ✅ Success/Error feedback

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!formData.role) {
        setMessage({ type: "danger", text: "⚠️ Please select a role before registering." });
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setMessage({ type: "danger", text: "⚠️ Passwords do not match!" });
        return;
      }

      setLoading(true);
      setMessage({ type: "", text: "" });

      try {
        const response = await fetch("http://localhost/jobportal-backend/register.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    }),
  });

        const result = await response.json();

        if (result.success) {
          setMessage({ type: "success", text: result.message || "✅ Registered successfully!" });

          // ✅ Reset form after success
          setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "",
          });

          // Redirect after short delay (so user sees success message)
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        } else {
          setMessage({ type: "danger", text: result.message || "❌ Registration failed." });
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage({ type: "danger", text: "🚨 Something went wrong. Please try again." });
      } finally {
        setLoading(false);
      }
    };

    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row className="w-100">
          <Col md={{ span: 6, offset: 3 }}>
            <Card className="shadow p-4 rounded-4">
              <h2 className="text-center mb-4">Register</h2>

              {/* ✅ Show feedback messages */}
              {message.text && (
                <Alert variant={message.type} className="text-center">
                  {message.text}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                {/* Name */}
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Email */}
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

                {/* Password */}
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Confirm Password */}
                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Role Select */}
                <Form.Group className="mb-3" controlId="role">
                  <Form.Label>Register As</Form.Label>
                  <Form.Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select One
                    </option>
                    <option value="jobseeker">Job Seeker</option>
                    <option value="employer">Employer</option>
                  </Form.Select>
                </Form.Group>

                {/* Submit */}
                <div className="d-grid">
                  <Button type="submit" variant="success" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" /> Registering...
                      </>
                    ) : (
                      "Register"
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
