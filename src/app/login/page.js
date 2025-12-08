"use client";
import { useState } from "react";
import styles from "../page.module.css";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const [form, setForm] = useState({ phoneNumber: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [errorPopup, setErrorPopup] = useState("");

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorPopup("");
    setSuccessPopup(false);

    try {
      const { data } = await axios.post("/api/login", form);

      localStorage.setItem("token", data.token);

      setSuccessPopup(true);

      setTimeout(() => {
        setSuccessPopup(false);
        router.push("/order");
      }, 1500);
    } catch (err) {
      setErrorPopup("Invalid phone number or password");
      setTimeout(() => setErrorPopup(""), 2500);
    }

    setLoading(false);
  };

  return (
    <div>
      {/* SUCCESS POPUP */}
      {successPopup && (
        <div className={styles.popupSuccess}>Login Successful!</div>
      )}

      {/* ERROR POPUP */}
      {errorPopup && <div className={styles.popupError}>{errorPopup}</div>}

      {/* LOADING OVERLAY */}
      {loading && <div className={styles.loadingOverlay}>Loading...</div>}

      <div className={styles.loginBanner}>
        <div className={styles.loginBannerTitle}>LOGIN</div>
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
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <input
              placeholder="Phone Number"
              onChange={(e) =>
                setForm({ ...form, phoneNumber: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button>Login</button>

            <div style={{ textAlign: "center" }}>
              <span style={{ color: "#666" }}>Do you have an account?</span>
              <Link href="/register" className={styles.registerLink}>
                {"  "} Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
