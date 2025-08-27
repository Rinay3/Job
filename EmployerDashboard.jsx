// EmployerDashboard.jsx
import React from "react";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import { FaPlusCircle, FaUsers } from "react-icons/fa";
import Sidebar from "./Sidebar";

export default function EmployerDashboard() {
  const employerName = "John Doe"; // Static name

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <Sidebar />
        </Col>

        <Col md={9} className="p-4">
          <h2>Welcome, {employerName}!</h2>
          <p>Here’s a quick overview of your dashboard.</p>

          <div className="d-flex flex-wrap gap-3 my-4">
            <Card className="p-3 shadow-sm" style={{ flex: "1 1 200px" }}>
              <h5>Total Jobs Posted</h5>
              <p>12</p>
            </Card>
            <Card className="p-3 shadow-sm" style={{ flex: "1 1 200px" }}>
              <h5>Total Applicants</h5>
              <p>45</p>
            </Card>
            <Card className="p-3 shadow-sm" style={{ flex: "1 1 200px" }}>
              <h5>Active Jobs</h5>
              <p>5</p>
            </Card>
            <Card className="p-3 shadow-sm" style={{ flex: "1 1 200px" }}>
              <h5>Pending Applications</h5>
              <p>8</p>
            </Card>
          </div>

          <h4>Recent Job Postings</h4>
          <ListGroup className="mb-4">
            <ListGroup.Item>React Developer - Remote</ListGroup.Item>
            <ListGroup.Item>UI/UX Designer - Mumbai</ListGroup.Item>
            <ListGroup.Item>Backend Developer - Delhi</ListGroup.Item>
          </ListGroup>

          <div className="d-flex gap-3">
            <Button variant="primary">
              <FaPlusCircle className="me-2" /> Post a New Job
            </Button>
            <Button variant="success">
              <FaUsers className="me-2" /> View Applicants
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
