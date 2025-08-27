import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner, Image } from "react-bootstrap";
import Sidebar from "./Sidebar";

export default function ProfileEmployer() {
  const [profile, setProfile] = useState({
    companyName: "", email: "", contactNumber: "", location: "", website: "", about: "", profileImage: ""
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch profile on mount using cookie
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost/jobportal-backend/employer_profile.php", {
      method: "POST",
      credentials: "include" // send cookies
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProfile(data);
        } else {
          alert(data.message);
        }
      })
      .catch(err => {
        console.error(err);
        alert("Error fetching profile");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = e => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    setProfile(prev => ({
      ...prev,
      profileImageFile: file,
      profileImagePreview: URL.createObjectURL(file)
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("update", true);
    ["companyName", "contactNumber", "location", "website", "about"].forEach(f => formData.append(f, profile[f]));
    if (profile.profileImageFile) formData.append("profileImage", profile.profileImageFile);

    try {
      const res = await fetch("http://localhost/jobportal-backend/employer_profile.php", {
        method: "POST",
        body: formData,
        credentials: "include" // send cookies
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message);
        setProfile(prev => ({ ...prev, ...data })); // merge updated data
        setIsEditing(false);
      } else alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Error saving profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3}><Sidebar /></Col>
        <Col md={9} className="p-4">
          <h2>Employer Profile</h2>
          <Card className="p-4 shadow-sm">
            {loading
              ? <div className="text-center"><Spinner animation="border" /></div>
              : <Form>
                  <div className="text-center mb-3">
                    <Image
                      src={profile.profileImagePreview || profile.profileImage || "https://via.placeholder.com/150"}
                      roundedCircle width={150} height={150}
                    />
                    {isEditing && <Form.Control type="file" accept="image/*" onChange={handleImageChange} />}
                  </div>

                  {["companyName", "email", "contactNumber", "location", "website", "about"].map(field => (
                    <Form.Group key={field} className="mb-3">
                      <Form.Label>{field === "companyName" ? "Company Name" : field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                      <Form.Control
                        type={field === "about" ? "textarea" : "text"}
                        as={field === "about" ? "textarea" : undefined}
                        rows={field === "about" ? 4 : undefined}
                        name={field}
                        value={profile[field]}
                        onChange={handleChange}
                        readOnly={field === "email" || !isEditing}
                      />
                    </Form.Group>
                  ))}

                  <div className="d-grid">
                    {isEditing
                      ? <Button onClick={handleSave}>Save Changes</Button>
                      : <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>}
                  </div>
                </Form>}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
