"use client";
import { useEffect, useState } from "react";
import styles from "../page.module.css";
import axios from "axios";

export default function Order() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [preview, setPreview] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("productImageFile", file);
    formData.append("userId", userId);
    formData.append("productName", e.target.productName.value);
    formData.append("customerName", e.target.customerName.value);
    formData.append("customerPhone", e.target.customerPhone.value);
    formData.append("customerEmail", e.target.customerEmail.value);
    formData.append("customerLocation", e.target.customerLocation.value);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.data.success) {
        setLoading(false);
        setSuccessPopup(true);

        setTimeout(() => setSuccessPopup(false), 1500);
      }
    } catch (err) {
      setLoading(false);
      setErrorPopup(true);
      setTimeout(() => setErrorPopup(false), 1500);
    }

    setLoading(false);
  }
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/me");

        setAuthenticated(data.authenticated);

        if (data.authenticated) {
          setUserId(data.userId);
        }
      } catch (err) {
        console.error("Axios error:", err);
      }
    };

    fetchUser();
  }, []);
  return (
    <>
      <div className={styles.worksBanner}>
        <div className={styles.worksBannerTitle}>ORDER YOURS</div>
        <div className={styles.worksBannerSubtext}>
          Reliable, trustworthy, and affordable fiber glass for your home or
          business
        </div>
      </div>
      <div className={styles.orderContainer}>
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className={styles.imagePreview}
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "10px",
              marginTop: "10px",
            }}
          />
        )}

        <form
          className={`${styles.orderForm} ${styles.orderFormContainer}`}
          onSubmit={handleSubmit}
        >
          <input
            type="file"
            required
            onChange={(e) => {
              const file = e.target.files[0];
              setFile(file);
              setPreview(URL.createObjectURL(file)); // 🔥 Preview image
            }}
          />

          <input
            name="productName"
            type="text"
            placeholder="Product Name"
            required
          />

          <input
            name="customerName"
            type="text"
            placeholder="Full Name"
            required
          />

          <input
            name="customerPhone"
            type="text"
            placeholder="Phone Number"
            required
          />
          <input
            name="customerEmail"
            type="email"
            placeholder="Email"
            required
          />
          <input
            name="customerLocation"
            type="text"
            placeholder="Address"
            required
          />

          <button
            type="submit"
            className={styles.orderFormBtn}
            disabled={loading}
          >
            {loading ? "Placing..." : "Place Order"}
          </button>
        </form>
      </div>{" "}
      {/* Loading Popup */}
      {loading && <div className={styles.popupLoading}>Processing...</div>}
      {/* Success Popup */}
      {successPopup && (
        <div className={styles.popupSuccess}>Order Placed Successfully!</div>
      )}
      {/* Error Popup */}
      {errorPopup && (
        <div className={styles.popupError}>Failed to place order!</div>
      )}
    </>
  );
}
