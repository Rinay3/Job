// Sidebar.jsx

//R
import React from "react";
import { ListGroup } from "react-bootstrap";
import { FaHome, FaPlusCircle, FaUser, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any auth data if needed
    navigate("/login");
  };

  return (
    <div className="bg-light vh-100 p-3">
      <div className="text-center mb-4">
        <FaHome size={50} className="mb-2 text-primary" />
        <h4>JobSphere</h4>
      </div>
      <ListGroup variant="flush">
        <ListGroup.Item action onClick={() => navigate("/employer-dashboard")}>
          <FaHome className="me-2" /> Dashboard
        </ListGroup.Item>
        <ListGroup.Item action onClick={() => navigate("/post-job")}>
          <FaPlusCircle className="me-2" /> Post Job
        </ListGroup.Item>
        <ListGroup.Item action onClick={() => navigate("/employer-profile")}>
          <FaUser className="me-2" /> Profile
        </ListGroup.Item>
        <ListGroup.Item action onClick={() => navigate("/applicants")}>
          <FaUsers className="me-2" /> Applicants
        </ListGroup.Item>
        <ListGroup.Item action onClick={handleLogout} className="mt-4 text-danger">
          <FaSignOutAlt className="me-2" /> Logout
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
