"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaCheckCircle,
  FaInstagram,
  FaPhone,
  FaQuoteRight,
  FaTiktok,
} from "react-icons/fa";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      {/* Banner */}
      <div className={styles.homeBanner}>
        <Image
          src="/homeBanner.avif"
          alt="Banner"
          className={styles.bannerImg}
          width={1600}
          height={900}
        />

        <div className={styles.bannerContent}>
          <h1 className={`${styles.bannerTitle} ${styles.montserrat}`}>
            Premium Fiberglass Solutions – Durable, Lightweight, and Built to
            Last.
          </h1>

          <p className={styles.bannerSubtext}>
            Experience the ultimate in strength and versatility with our premium
            fiberglass solutions.
          </p>

          <div className={styles.bannerActions}>
            <button className={styles.orderBtn}>ORDER YOURS</button>

            <Link href="/works" className={styles.worksLink}>
              SEE SOME OF OUR WORKS <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>

      {/* Moving Images */}
      <div className={styles.homeImages}>
        <div className={styles.imageTrack}>
          {Array(2)
            .fill([
              "/fg1.jpg",
              "/fg2.jpg",
              "/fg3.jpg",
              "/fg4.jpg",
              "/fg5.jpg",
              "/fg6.jpg",
              "/fg7.jpg",
              "/fg8.jpg",
              "/fg9.jpg",
              "/fg10.jpg",
            ])
            .flat()
            .map((src, i) => (
              <Image key={i} src={src} alt="work" width={300} height={200} />
            ))}
        </div>
      </div>

      {/* Expertise */}
      <div className={styles.homeExpertise}>
        <div className={styles.homeExpertiseTop}>
          <div className={styles.montserrat}>
            We are expert in all fiber solutions
          </div>
          <div>The best fiber glass offer expertise and service.</div>
        </div>

        <div className={styles.homeExpertiseBody}>
          {[1, 2, 3].map((num) => (
            <div key={num}>
              <Image
                src={`/expertise${num}.jpg`}
                alt="expertise"
                width={500}
                height={400}
              />
              <div>
                <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                  <span style={{ fontSize: 30 }}>0{num}</span>
                  <span>
                    {num === 1
                      ? "Durable & Reliable"
                      : num === 2
                      ? "Lightweight & Versatile"
                      : "Innovative Solutions"}
                  </span>
                </div>

                <div>
                  {num === 1 &&
                    "Engineered to last with top-quality materials that stand up to tough conditions."}
                  {num === 2 &&
                    "Easy to handle, install, and adapt — ideal for any application."}
                  {num === 3 &&
                    "Cutting-edge designs and customizable options."}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* About */}
        <div className={styles.homeAbout}>
          <div className={styles.homeAboutLeft}>
            <div className={styles.montserrat}>
              Leading the Way in Premium Fiberglass Solutions
            </div>

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

            <Link href="/about" className={styles.homeAboutBtn}>
              ABOUT US
            </Link>
          </div>

          <div className={styles.homeAboutRight}>
            <div>
              <Image src="/fg1.jpg" alt="img" width={300} height={200} />
              <Image src="/fg3.jpg" alt="img" width={300} height={200} />
            </div>

            <Image src="/homeAbout3.avif" alt="img" width={500} height={500} />
          </div>
        </div>

        {/* Team */}
        <div className={styles.homeTeam}>
          <div>OUR HARD WORKING MEMBERS</div>

          <div className={styles.homeTeamContainer}>
            {[4, 2, 3, 4].map((i, index) => (
              <div key={index} className={styles.homeTeamEachWorker}>
                <Image
                  src={`/worker${i}.png`}
                  alt="worker"
                  width={200}
                  height={200}
                />
                <div>Mr. Some One</div>
                <div>Role</div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className={styles.homeReviews}>
          <div>100+ POSITIVE REVIEWS</div>

          <div className={styles.homeReviewContainer}>
            {[1, 2].map((i) => (
              <div key={i} className={styles.homeEachReview}>
                <div className={styles.homeEachReviewLeft}>
                  <Image
                    src={`/reviewer${i}.avif`}
                    alt="reviewer"
                    width={100}
                    height={100}
                  />
                  <div style={{ color: "gold" }}>★★★★★</div>
                </div>

                <div className={styles.homeEachReviewRight}>
                  <div>{i === 1 ? "Miss Some one" : "Mr. Some one"}</div>
                  <div>From Addis Ababa</div>
                  <div>
                    Overall, I was very impressed with the product. It’s really
                    wonderful. It’s really wonderful. It’s all good. I Like it.
                    Its related to the installation! Absolutely wonderful!
                  </div>
                </div>

                <FaQuoteRight style={{ fontSize: 20, color: "#999" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className={styles.homeContact}>
          <div className={styles.homeContactLeft}>
            <div>
              <div>OUR LOCATION</div>
              <div>Some place next to Something</div>
            </div>

            <div>
              <div>CONTACT WAY</div>

              <div>
                <FaInstagram /> <div>@best_fiber_glass</div>
              </div>

              <div>
                <FaTiktok /> <div>@best_fiber_glass</div>
              </div>

              <div>
                <FaPhone /> <div>+251-99-999-9999</div>
              </div>
            </div>

            <div>
              <div>OPENING HOURS</div>
              <div>Monday - Saturday (8:00AM - 6:00PM)</div>
              <div>Sunday: closed</div>
            </div>
          </div>

          <div className={styles.homeContactRight}>
            <Image src="/fg1.jpg" alt="contact" width={500} height={500} />
          </div>
        </div>
      </div>
    </div>
  );
}
