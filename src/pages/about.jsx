import {
  FaCertificate,
  FaCheckCircle,
  FaQuoteRight,
  FaStar,
  FaTags,
} from "react-icons/fa";
import "../styles/about.css";
import { Link } from "react-router-dom";
function About() {
  return (
    <div className="about-container">
      <div className="about-banner">
        <div className="about-banner-title">ABOUT US</div>
        <div className="about-banner-subtext">
          Reliable, trustworthy, and affordable fiber glass for your home or
          business
        </div>
      </div>
      <div className="about-qualities">
        <div className="about-each-qualities">
          <div>
            <FaTags />
          </div>
          <div>Affordable Price</div>
          <div>
            We provide pricing & detailed estimates, So know what expect work
            begins
          </div>
        </div>
        <div className="about-each-qualities">
          <div>
            <FaStar />
          </div>
          <div>Best Fiber Glass</div>
          <div>
            We focus consistently on deliveringexceptional service every time.
          </div>
        </div>
        <div className="about-each-qualities">
          <div>
            <FaCheckCircle />
          </div>
          <div>Best Quality</div>
          <div>
            Our experts operate skillfullyto ensure top-quality estimates
            performance.
          </div>
        </div>
        <div className="about-each-qualities">
          <div>
            <FaCertificate />
          </div>
          <div>100% Certified</div>
          <div>
            Our team collabrates effectively to produce outstanding results.
          </div>
        </div>
      </div>
      <div style={{ margin: "3%" }}>
        <div className="home-about">
          <div className="home-about-left">
            <div>Leading the Way in Premium Fiberglass Solutions</div>
            <div>
              Dedicated to providing top-quality fiberglass products designed to
              meet the demands of industries, businesses, and creative projects.
              With a focus on durability, lightweight performance, and
              cutting-edge innovation, we ensure every product delivers
              unmatched reliability and excellence.
            </div>
            <div>
              <div>First-Class Fiberglass Quality</div>
              <div>Expert Team</div>
              <div>Fast & Reliable Service</div>
            </div>
          </div>
          <div className="home-about-right">
            <div>
              <img src="/fg1.jpg" />
              <img src="/fg3.jpg" />
            </div>
            <img src="/homeAbout3.avif" />
          </div>
        </div>
      </div>
      <div className="about-experience-team">
        <div className="about-experience-team-left">
          <img src="/homeBanner.avif" />
        </div>
        <div className="about-experience-team-right">
          <div>We’re one of the best fiber glass in the country</div>
          <div className="about-each-experience-team">
            <FaCheckCircle />
            <div>
              <div>Experience Team</div>
              <div>
                Plumbing services encompass a wide range of tasks related to the
                installation, repair, and maintenance.
              </div>
            </div>
          </div>
          <div className="about-each-experience-team">
            <FaCheckCircle />
            <div>
              <div>Experience Team</div>
              <div>
                Our team works methodically to complete tasks with precision. We
                innovate consistently to provide delivery.
              </div>
            </div>
          </div>
          <Link to="/contacts" className="contact-btn">
            CONTACT US
          </Link>
        </div>
      </div>
      <div style={{ margin: "0px 3%" }} className="home-team">
        <div>OUR HARD WORKING MEMBERS</div>
        <div className="home-team-container">
          <div className="home-team-each-worker">
            <img src="/worker4.png" />
            <div>Mr. Some One</div>
            <div>Role</div>
          </div>
          <div className="home-team-each-worker">
            <img src="/worker2.png" />
            <div>Mr. Some One</div>
            <div>Role</div>
          </div>
          <div className="home-team-each-worker">
            <img src="/worker3.png" />
            <div>Mr. Some One</div>
            <div>Role</div>
          </div>
          <div className="home-team-each-worker">
            <img src="/worker4.png" />
            <div>Mr. Some One</div>
            <div>Role</div>
          </div>
        </div>
      </div>
      <div style={{ margin: "0px 3%" }} className="home-reviews">
        <div>100+ POSITIVE REVIEWS</div>
        <div className="home-review-container">
          <div className="home-each-review">
            <div className="home-each-review-left">
              <img src="/reviewer1.avif" />
              <div></div>
            </div>{" "}
            <div className="home-each-review-right">
              <div>Miss Some one</div>
              <div>From Addis Ababa</div>
              <div>
                Overall, I was very impressed with the product. It’s really
                wonderful. It’s really wonderful. It’s all good. I Like it. Its
                related to the installation! Absolutely wonderful!
              </div>
            </div>
            <div>
              <FaQuoteRight style={{ fontSize: 20, color: "#999" }} />
            </div>
          </div>
          <div className="home-each-review">
            <div className="home-each-review-left">
              <img src="/reviewer2.avif" />
              <div></div>
            </div>{" "}
            <div className="home-each-review-right">
              <div>Mr. Some one</div>
              <div>From Addis Ababa</div>
              <div>
                Overall, I was very impressed with the product. It’s really
                wonderful. It’s really wonderful. It’s all good. I Like it. Its
                related to the installation! Absolutely wonderful!
              </div>
            </div>
            <div>
              <FaQuoteRight style={{ fontSize: 20, color: "#999" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
