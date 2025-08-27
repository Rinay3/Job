// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages / Components in src/ directly
import LandingPage from "./LandingPage";
import Login from "./Login";
import Register from "./Register";
import EmployerDashboard from "./EmployerDashboard";
import PostJob from "./PostJob";
import EmployerProfile from "./ProfileEmployer";
import JobSeekerDashboard from "./JobSeekerDashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Employer Routes */}
        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/employer-profile" element={<EmployerProfile />} />

        {/* Job Seeker Routes */}
        <Route path="/jobseeker-dashboard" element={<JobSeekerDashboard />} />

        {/* Catch all - redirect to landing page */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}
