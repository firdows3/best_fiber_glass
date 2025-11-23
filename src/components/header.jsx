// src/components/Header.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/header.css";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
// import axios from "axios";

// If you want Google Fonts, import in index.html or use @import in CSS

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [openLogout, setOpenLogout] = useState(false);
  return (
    <div className="header">
      <Link to="/" className="header-logo">
        <img src="/logo.jpg" alt="Logo" />
      </Link>

      <div className={`header-middle ${menuOpen ? "visible" : ""}`}>
        <Link
          style={{
            borderBottom: location.pathname === "/" ? ".5px solid #fff" : "",
          }}
          to="/"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          style={{
            borderBottom:
              location.pathname === "/about" ? ".5px solid #fff" : "",
          }}
          to="/about"
          onClick={() => setMenuOpen(false)}
        >
          About Us
        </Link>
        <Link
          style={{
            borderBottom:
              location.pathname === "/works" ? ".5px solid #fff" : "",
          }}
          to="/works"
          onClick={() => setMenuOpen(false)}
        >
          Our Work
        </Link>
        <Link
          style={{
            borderBottom:
              location.pathname === "/contacts" ? ".5px solid #fff" : "",
          }}
          to="/contacts"
          onClick={() => setMenuOpen(false)}
        >
          Contact Us
        </Link>
        {/* {role === "admin" && (
          <Link
            style={{
              color: location.pathname === "/adminDashboard" ? "#000" : "",
              borderBottom:
                location.pathname === "/adminDashboard"
                  ? ".5px solid #000"
                  : "",
            }}
            to="/adminDashboard"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
        )} */}
        {menuOpen && (
          <div>
            {/* {user ? (
              <Link to="/profile">
                <FaUserCircle style={{ fontSize: 35, color: "#605e5e" }} />
              </Link>
            ) : ( */}
            <div
              className="visible-header-right"
              style={{ cursor: "pointer" }}
              onClick={() => setMenuOpen(false)}
            >
              <Link to="/login">Order Yours</Link>
            </div>
            {/* )} */}
          </div>
        )}
      </div>
      {/* 
      {user ? (
        <Link to="/profile">
          <FaUserCircle style={{ fontSize: 35, color: "#605e5e" }} />
        </Link>
      ) : ( */}
      <div className="header-right" style={{ cursor: "pointer" }}>
        <Link to="/login">Order Yours</Link>
      </div>
      {/* )} */}

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars />
      </div>
    </div>
  );
}
