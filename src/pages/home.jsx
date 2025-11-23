import {
  FaArrowRight,
  FaInstagram,
  FaPhone,
  FaQuoteLeft,
  FaQuoteRight,
  FaTiktok,
} from "react-icons/fa";
import "../styles/home.css";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="home-container">
      <div className="home-banner">
        <img src="/homeBanner.avif" className="banner-img" />

        <div className="banner-content">
          <h1 className="banner-title">
            Premium Fiberglass Solutions – Durable, Lightweight, and Built to
            Last.
          </h1>

          <p className="banner-subtext">
            Experience the ultimate in strength and versatility with our premium
            fiberglass solutions. Designed for durability, lightweight
            performance, and long-lasting reliability, our products are perfect
            for industrial, commercial, and creative applications.
          </p>

          <div className="banner-actions">
            <button className="order-btn">ORDER YOURS</button>
            <a href="/works" className="works-link">
              SEE SOME OF OUR WORKS <FaArrowRight />
            </a>
          </div>
        </div>
      </div>
      <div className="home-images">
        <div className="image-track">
          <img src="/fg1.jpg" />
          <img src="/fg2.jpg" />
          <img src="/fg3.jpg" />
          <img src="/fg4.jpg" />
          <img src="/fg5.jpg" />
          <img src="/fg6.jpg" />
          <img src="/fg7.jpg" />
          <img src="/fg8.jpg" />
          <img src="/fg9.jpg" />
          <img src="/fg10.jpg" />

          {/* Duplicate for smooth loop */}
          <img src="/fg1.jpg" />
          <img src="/fg2.jpg" />
          <img src="/fg3.jpg" />
          <img src="/fg4.jpg" />
          <img src="/fg5.jpg" />
          <img src="/fg6.jpg" />
          <img src="/fg7.jpg" />
          <img src="/fg8.jpg" />
          <img src="/fg9.jpg" />
          <img src="/fg10.jpg" />
        </div>
      </div>
      <div className="home-expertise">
        <div className="home-expertise-top">
          <div>We are expert in all fiber solutions</div>
          <div>
            The best fiber glass offer expertise and service, with free delivery
            sevrice.
          </div>
        </div>
        <div className="home-expertise-body">
          <div>
            <img src="/expertise1.jpg" />
            <div>
              <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                <span style={{ fontSize: 30 }}>01</span>{" "}
                <span>Durable & Realiable</span>
              </div>
              <div>
                Engineered to last with top-quality materials that stand up to
                daily wear and tough conditions.
              </div>
            </div>
          </div>
          <div>
            <img src="/expertise2.jpg" />
            <div>
              <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                <span style={{ fontSize: 30 }}>02</span>{" "}
                <span>Lightweight & Versatile</span>
              </div>
              <div>
                Easy to handle, install, and adapt — ideal for a wide range of
                industrial and creative applications.
              </div>
            </div>
          </div>
          <div>
            <img src="/expertise3.jpg" />
            <div>
              <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                <span style={{ fontSize: 30 }}>03</span>{" "}
                <span>Innovative Solutions</span>
              </div>
              <div>
                Cutting-edge designs and customizable options that improve
                efficiency, performance, and aesthetics.
              </div>
            </div>
          </div>{" "}
        </div>
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
            <Link to="/about" className="home-about-btn">
              ABOUT US
            </Link>
          </div>
          <div className="home-about-right">
            <div>
              <img src="/fg1.jpg" />
              <img src="/fg3.jpg" />
            </div>
            <img src="/homeAbout3.avif" />
          </div>
        </div>
        <div className="home-team">
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
        <div className="home-reviews">
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
                  wonderful. It’s really wonderful. It’s all good. I Like it.
                  Its related to the installation! Absolutely wonderful!
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
                  wonderful. It’s really wonderful. It’s all good. I Like it.
                  Its related to the installation! Absolutely wonderful!
                </div>
              </div>
              <div>
                <FaQuoteRight style={{ fontSize: 20, color: "#999" }} />
              </div>
            </div>
          </div>
        </div>
        <div className="home-contact">
          <div className="home-contact-left">
            <div>
              <div>OUR LOCATION</div>
              <div>
                Some place next to Something Some place next to Something
              </div>
            </div>
            <div>
              <div>CONTACT WAY</div>
              <div>
                <FaInstagram />
                <div>@best_fiber_glass</div>
              </div>
              <div>
                <FaTiktok />
                <div>@best_fiber_glass</div>
              </div>
              <div>
                <FaPhone />
                <div>+251-99-999-9999</div>
              </div>
            </div>
            <div>
              <div>OPENING HOURS</div>
              <div>Monday - Saturday ( 8:00AM - 6:00PM)</div>
              <div>Sunday: closed</div>
            </div>{" "}
          </div>
          <div className="home-contact-right">
            <img src="/fg1.jpg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
