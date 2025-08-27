// LandingPage.jsx
import React from "react";
import { Container, Row, Col, Button, Navbar, Nav, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaBriefcase, FaUsers, FaBuilding, FaSearch, FaGlobe } from "react-icons/fa"; // ✅ Added FaGlobe

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Navbar */}
      <Navbar bg="light" expand="lg" className="shadow-sm sticky-top">
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <FaGlobe size={35} className="text-primary me-2" /> {/* ✅ Icon as Logo */}
            <span className="fw-bold fs-4">JobSphere</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Button
                variant="outline-primary"
                className="me-2"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button variant="primary" onClick={() => navigate("/register")}>
                Register
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
<Container
  fluid
  className="text-center d-flex flex-column justify-content-center align-items-center text-white"
  style={{
    height: "80vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    opacity: 0.9,
    
    color: "white",
  }}
>
  <div style={{ backgroundColor: "rgba(0,0,0,0.9)", padding: "30px", borderRadius: "10px" }}>
    <h1 className="display-4 fw-bold">Find Your Dream Job Today</h1>
    <p className="lead mb-4">
      We connect <strong>Job Seekers</strong> with <strong>Employers</strong> 🚀
    </p>
    <Button
      variant="success"
      size="lg"
      onClick={() => navigate("/register")}
    >
      Get Started
    </Button>
  </div>
</Container>

      {/* Features Section */}
      <Container className="text-center py-5">
        <h2 className="mb-4">Why Choose JobSphere?</h2>
        <Row>
          <Col md={3}>
            <Card className="p-3 shadow-sm h-100">
              <FaBriefcase size={40} className="mb-3 text-primary" />
              <h5>Thousands of Jobs</h5>
              <p>Browse jobs from top companies worldwide.</p>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="p-3 shadow-sm h-100">
              <FaUsers size={40} className="mb-3 text-success" />
              <h5>For Job Seekers</h5>
              <p>Apply with ease and track your applications.</p>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="p-3 shadow-sm h-100">
              <FaBuilding size={40} className="mb-3 text-warning" />
              <h5>For Employers</h5>
              <p>Post jobs and manage applicants efficiently.</p>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="p-3 shadow-sm h-100">
              <FaSearch size={40} className="mb-3 text-danger" />
              <h5>Smart Search</h5>
              <p>Find the right match with our smart filters.</p>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Popular Categories */}
      <Container className="py-5">
        <h2 className="text-center mb-4">Popular Categories</h2>
        <Row className="text-center">
          <Col md={3} className="mb-3">
            <Card className="p-3 shadow-sm">💻 IT & Software</Card>
          </Col>
          <Col md={3} className="mb-3">
            <Card className="p-3 shadow-sm">📊 Marketing</Card>
          </Col>
          <Col md={3} className="mb-3">
            <Card className="p-3 shadow-sm">📈 Finance</Card>
          </Col>
          <Col md={3} className="mb-3">
            <Card className="p-3 shadow-sm">🎨 Design</Card>
          </Col>
        </Row>
      </Container>

      {/* Call to Action */}
      <Container fluid className="bg-primary text-white text-center py-5">
        <h2 className="mb-3">Ready to kickstart your career?</h2>
        <Button variant="light" size="lg" onClick={() => navigate("/register")}>
          Join Now
        </Button>
      </Container>

      {/* Footer */}
      <footer
        className="bg-dark text-white text-center d-flex flex-column justify-content-center align-items-center"
        style={{ height: "120px" }}
      >
        <p className="mb-1 fs-5">
          &copy; {new Date().getFullYear()} JobSphere. All Rights Reserved.
        </p>
        <small>Built with ❤️ using React & Bootstrap</small>
      </footer>
    </>
  );
}
