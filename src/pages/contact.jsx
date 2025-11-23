import { FaLocationDot } from "react-icons/fa6";
import "../styles/contact.css";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaPhone, FaTiktok } from "react-icons/fa";

function Contacts() {
  return (
    <div className="contact-container">
      <div className="contact-banner">
        <div className="contact-banner-title">CONTACT US</div>
        <div className="contact-banner-subtext">
          Reliable, trustworthy, and affordable fiber glass for your home or
          business
        </div>
      </div>
      <div className="contacts">
        <div className="each-contact">
          <FaLocationDot />
          <div>Our Location</div>
          <div>Some where, Some place</div>
        </div>
        <div className="each-contact">
          <FaPhone />
          <div>Call Us</div>
          <div>+251-99-999-9999</div>
          <div>+251-99-999-9999</div>
        </div>
        <div className="each-contact">
          <FaInstagram />
          <div>DM on Instagram</div>
          <div>@best-fiber-glass</div>
        </div>
        <div className="each-contact">
          <FaTiktok />
          <div>DM on Tiktok</div>
          <div>@best-fiber-glass</div>
        </div>
        <div className="each-contact">
          <FaFacebook />
          <div>DM on Facebook</div>
          <div>@best-fiber-glass</div>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
