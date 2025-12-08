import { FaLocationDot } from "react-icons/fa6";
import styles from "../page.module.css";
import {
  FaEnvelope,
  FaInstagram,
  FaPhone,
  FaTelegramPlane,
  FaTiktok,
} from "react-icons/fa";

function Contacts() {
  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactBanner}>
        <div className={styles.contactBannerTitle}>CONTACT US</div>
        <div className={styles.contactBannerSubtext}>
          Reliable, trustworthy, and affordable fiber glass for your home or
          business
        </div>
      </div>

      <div className={styles.contacts}>
        <a href="tel:+251977441390" className={styles.eachContact}>
          <FaPhone className={styles.eachContactIcon} />
          <div>Call Us</div>
          <div>+251-97-744-1390</div>
          <div style={{ fontSize: 14, color: "#666" }}>+251-79-944-1390</div>
        </a>

        <a
          href="https://instagram.com/best_fiber_glass1"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.eachContact}
        >
          <FaInstagram className={styles.eachContactIcon} />
          <div>DM on Instagram</div>
          <div>@best_fiber_glass1</div>
        </a>

        <a
          href="https://tiktok.com/@best_fiber_glass1"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.eachContact}
        >
          <FaTiktok className={styles.eachContactIcon} />
          <div>DM on Tiktok</div>
          <div>@best_fiber_glass1</div>
        </a>

        <a
          href="https://t.me/Best_fiber_glass1"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.eachContact}
        >
          <FaTelegramPlane className={styles.eachContactIcon} />
          <div>Message on Telegram</div>
          <div>@Best_fiber_glass1</div>
        </a>

        <a
          href="mailto:bestfiberglass@gmail.com"
          className={styles.eachContact}
        >
          <FaEnvelope className={styles.eachContactIcon} />
          <div>Email Us</div>
          <div>bestfiberglass@gmail.com</div>
        </a>
      </div>
    </div>
  );
}

export default Contacts;
