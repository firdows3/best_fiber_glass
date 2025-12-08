"use client";
import { useState } from "react";
import axios from "axios";
import styles from "../page.module.css";
import Link from "next/link";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [errorPopup, setErrorPopup] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorPopup("");
    setSuccessPopup(false);

    try {
      const res = await axios.post("/api/user", form);

      setSuccessPopup(true);
      setForm({ name: "", phoneNumber: "", password: "" });

      setTimeout(() => setSuccessPopup(false), 2000);
    } catch (err) {
      setErrorPopup("Registration failed. Try again!");
      setTimeout(() => setErrorPopup(""), 2500);
    }

    setLoading(false);
  };

  return (
    <div>
      {/* SUCCESS POPUP */}
      {successPopup && (
        <div className={styles.popupSuccess}>Registration Successful!</div>
      )}

      {/* ERROR POPUP */}
      {errorPopup && <div className={styles.popupError}>{errorPopup}</div>}

      {/* LOADING OVERLAY */}
      {loading && <div className={styles.loadingOverlay}>Loading...</div>}

      <div className={styles.loginBanner}>
        <div className={styles.loginBannerTitle}>REGISTER</div>
        <div className={styles.loginBannerSubtext}>
          Reliable, trustworthy, and affordable fiber glass
        </div>
      </div>

      <div className={styles.loginContainer}>
        <div className={styles.loginLeft}>
          <img src="/logo.png" />
          <div>WELCOME TO THE BEST FIBER GLASS</div>
        </div>

        <div className={styles.loginRight}>
          <form onSubmit={handleRegister} className={styles.loginForm}>
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              placeholder="Phone Number"
              value={form.phoneNumber}
              onChange={(e) =>
                setForm({ ...form, phoneNumber: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button type="submit">Register</button>

            <Link href="/login" className={styles.registerLink}>
              Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
