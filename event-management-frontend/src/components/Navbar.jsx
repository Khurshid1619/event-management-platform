import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navbar.css";

function AppNavbar() {
  return (
    <Navbar expand="lg" style={{ background: "linear-gradient(90deg, #ff8a00, #e52e71, #007bff)", padding: "10px 20px" }}>
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: "#fff", fontWeight: "bold", fontSize: "24px" }}>
          Event Management
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" style={{ color: "#fff", fontWeight: "500", margin: "0 10px" }}>
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/login" style={{ color: "#fff", fontWeight: "500", margin: "0 10px" }}>
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/create-event" style={{ color: "#fff", fontWeight: "500", margin: "0 10px" }}>
              Create Event
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
