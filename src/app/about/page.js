import {
  FaCertificate,
  FaCheckCircle,
  FaQuoteRight,
  FaStar,
  FaTags,
} from "react-icons/fa";
import styles from "../page.module.css";
import Link from "next/link";

function About() {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutBanner}>
        <div className={styles.aboutBannerTitle}>ABOUT US</div>
        <div className={styles.aboutBannerSubtext}>
          Reliable, trustworthy, and affordable fiber glass for your home or
          business
        </div>
      </div>

      {/* Qualities */}
      <div className={styles.aboutQualities}>
        <div className={styles.aboutEachQualities}>
          <div>
            <FaTags className={styles.aboutEachQualitiesIcon} />
          </div>
          <div>Affordable Price</div>
          <div>
            We provide pricing & detailed estimates, so you know what to expect
            before work begins.
          </div>
        </div>

        <div className={styles.aboutEachQualities}>
          <div>
            <FaStar className={styles.aboutEachQualitiesIcon} />
          </div>
          <div>Best Fiber Glass</div>
          <div>
            We focus consistently on delivering exceptional service every time.
          </div>
        </div>

        <div className={styles.aboutEachQualities}>
          <div>
            <FaCheckCircle className={styles.aboutEachQualitiesIcon} />
          </div>
          <div>Best Quality</div>
          <div>
            Our experts operate skillfully to ensure top-quality performance.
          </div>
        </div>

        <div className={styles.aboutEachQualities}>
          <div>
            <FaCertificate className={styles.aboutEachQualitiesIcon} />
          </div>
          <div>100% Certified</div>
          <div>
            Our team collaborates effectively to produce outstanding results.
          </div>
        </div>
      </div>

      {/* About section */}
      <div style={{ margin: "3%" }}>
        <div className={styles.homeAbout}>
          <div className={styles.homeAboutLeft}>
            <div>Leading the Way in Premium Fiberglass Solutions</div>

            <div>
              Dedicated to providing top-quality fiberglass products designed to
              meet the demands of industries, businesses, and creative projects.
              With a focus on durability, lightweight performance, and
              cutting-edge innovation, we ensure every product delivers
              unmatched reliability and excellence.
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  fontSize: 18,
                }}
              >
                <FaCheckCircle className={styles.aboutEachExperienceTeamIcon} />
                <span>First-Class Fiberglass Quality</span>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  fontSize: 18,
                }}
              >
                <FaCheckCircle className={styles.aboutEachExperienceTeamIcon} />
                <span>Expert Team</span>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  fontSize: 18,
                }}
              >
                <FaCheckCircle className={styles.aboutEachExperienceTeamIcon} />
                <span> Fast & Reliable Service</span>
              </div>
            </div>
          </div>

          <div className={styles.homeAboutRight}>
            <div>
              <img src="/fg1.jpg" />
              <img src="/fg3.jpg" />
            </div>
            <img src="/homeAbout3.avif" />
          </div>
        </div>
      </div>

      {/* Experience Team */}
      <div className={styles.aboutExperienceTeam}>
        <div className={styles.aboutExperienceTeamLeft}>
          <img src="/homeBanner.avif" />
        </div>

        <div className={styles.aboutExperienceTeamRight}>
          <div>We’re one of the best fiber glass providers in the country</div>

          <div className={styles.aboutEachExperienceTeam}>
            <FaCheckCircle className={styles.aboutEachExperienceTeamIcon} />
            <div>
              <div>Experienced Team</div>
              <div>
                Services include installation, repair, and maintenance with top
                precision.
              </div>
            </div>
          </div>

          <div className={styles.aboutEachExperienceTeam}>
            <FaCheckCircle className={styles.aboutEachExperienceTeamIcon} />
            <div>
              <div>Professional Work</div>
              <div>
                Our team works methodically to complete tasks with accuracy and
                consistency.
              </div>
            </div>
          </div>

          <Link href="/contacts" className={styles.contactBtn}>
            CONTACT US
          </Link>
        </div>
      </div>

      {/* Team */}
      <div style={{ margin: "0px 3%" }} className={styles.homeTeam}>
        <div>OUR HARD WORKING MEMBERS</div>

        <div className={styles.homeTeamContainer}>
          {[4, 2, 3, 4].map((i, index) => (
            <div key={index} className={styles.homeTeamEachWorker}>
              <img src={`/worker${i}.png`} />
              <div>Mr. Some One</div>
              <div>Role</div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div style={{ margin: "0px 3%" }} className={styles.homeReviews}>
        <div>100+ POSITIVE REVIEWS</div>

        <div className={styles.homeReviewContainer}>
          <div className={styles.homeEachReview}>
            <div className={styles.homeEachReviewLeft}>
              <img src="/reviewer1.avif" />
            </div>

            <div className={styles.homeEachReviewRight}>
              <div>Miss Some One</div>
              <div>From Addis Ababa</div>
              <div>
                Overall, I was very impressed with the product. Absolutely
                wonderful!
              </div>
            </div>

            <FaQuoteRight style={{ fontSize: 20, color: "#999" }} />
          </div>

          <div className={styles.homeEachReview}>
            <div className={styles.homeEachReviewLeft}>
              <img src="/reviewer2.avif" />
            </div>

            <div className={styles.homeEachReviewRight}>
              <div>Mr. Some One</div>
              <div>From Addis Ababa</div>
              <div>
                Overall, I was very impressed with the product. It’s really
                wonderful. It’s really wonderful. It’s all good. I Like it. Its
                related to the installation! Absolutely wonderful!
              </div>
            </div>

            <FaQuoteRight style={{ fontSize: 20, color: "#999" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
