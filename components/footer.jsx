// import { Link } from "react-router-dom";
import Link from "next/link";
import "./styles/footer.css";
import {
  FaInstagram,
  FaTelegramPlane,
  FaFacebookF,
  FaTiktok,
  FaLinkedinIn,
  FaPhone,
} from "react-icons/fa";

export default function Footer() {
  return (
    <div className="footer">
      {/* TOP SECTION */}
      <div className="footer-top">
        <div className="footer-top-title">
          Looking for the best fiber glass ?{" "}
        </div>
        <div className="footer-top-btn">Contact Us</div>
      </div>

      {/* MIDDLE SECTION */}
      <div className="footer-middle">
        {/* LEFT SIDE */}
        <div className="footer-middle-left">
          <img src="/logo.jpg" />
          <div className="footer-motto">
            Fiberglass company specializing in delivering high-quality, durable,
            and innovative fiberglass solutions.
          </div>
          <div className="footer-middle-icons">
            <a href="https://t.me/Alqalamschoolplc" target="_blank">
              <FaTelegramPlane />
            </a>
            <a href="https://instagram.com" target="_blank">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" target="_blank">
              <FaFacebookF />
            </a>
            <a href="https://www.tiktok.com" target="_blank">
              <FaTiktok />
            </a>
          </div>
        </div>

        {/* SOCIAL ICONS */}

        {/* RIGHT SIDE */}
        <div className="footer-middle-right">
          <div style={{ color: "#fff", fontSize: "23px" }}>INFO</div>
          <div>Some place next to Something Some place next to Something</div>
          <div className="footer-middle-right-icon">
            <FaInstagram />
            <div>@best_fiber_glass</div>
          </div>
          <div>
            <FaPhone />
            <div>+251-99-999-9999</div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="footer-bottom">
        <div style={{ textAlign: "center", padding: 20 }}>
          &copy; 2025 BFG Fiberglass. All Rights Reserved.
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <Link className="footer-link" href="/privacy">
            Privacy and Policy
          </Link>

          <Link className="footer-link" href="/terms">
            Terms of Use
          </Link>
        </div>
      </div>
    </div>
  );
}
