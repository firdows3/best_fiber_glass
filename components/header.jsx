"use client";
// src/components/Header.jsx
import "./styles/header.css";
import { FaBars, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaX } from "react-icons/fa6";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");
  const [ordersPanelOpen, setOrdersPanelOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [userId, setUserId] = useState("");
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [paymentFile, setPaymentFile] = useState(null);
  const [logoutPopup, setLogoutPopup] = useState(false);

  const openPayModal = (order) => {
    setSelectedOrder(order);
    setShowPayModal(true);
  };

  const handlePaymentUpload = async (e) => {
    e.preventDefault();

    if (!paymentFile || !selectedOrder?.id) return;

    const formData = new FormData();
    formData.append("paymentImage", paymentFile);

    try {
      await axios.post(`/api/orders/${selectedOrder.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Close modal
      setShowPayModal(false);
      setPaymentFile(null);
      setSelectedOrder(null);

      // Refresh UI
      router.refresh();
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/me");

        setAuthenticated(data.authenticated);

        if (data.authenticated) {
          setUser(data.name);
          setRole(data.role);
          setUserId(data.userId);
        } else {
          setUser("");
          setRole("");
        }
      } catch (err) {
        console.error("Axios error:", err);
        setAuthenticated(false);
        setUser("");
        setRole("");
      }
    };

    fetchUser();
  }, [pathname, router]);

  useEffect(() => {
    if (!ordersPanelOpen || !userId) return;

    const loadOrders = async () => {
      try {
        const res = await axios.get("/api/orders"); // fetch all orders
        const userOrders = res.data.orders.filter(
          (order) => order.userId === userId
        ); // filter by userId
        setOrders(userOrders);
      } catch (err) {
        console.log(err);
      }
    };

    loadOrders();
  }, [ordersPanelOpen, userId]);

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      setAuthenticated(false);
      setUser("");
      setRole("");

      setLogoutPopup(true);

      setTimeout(() => {
        setLogoutPopup(false);
        router.push("/login");
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };
  const [hasNewCartUpdate, setHasNewCartUpdate] = useState(false);
  useEffect(() => {
    // fetch first time
    fetchUpdateStatus();
  }, []);

  async function fetchUpdateStatus() {
    const res = await fetch("/api/orders");
    const data = await res.json();

    const lastSeen = localStorage.getItem("cartLastSeen");

    if (!lastSeen) {
      localStorage.setItem("cartLastSeen", data.updatedAt);
    } else {
      if (data.updatedAt !== lastSeen) {
        setHasNewCartUpdate(true); // show red dot
      }
    }
  }

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter(
          (o) =>
            o.approval === filter ||
            o.paymentStatus === filter ||
            o.completion === filter
        );
  return (
    <div className="header">
      <Link href="/" className="header-logo">
        <img src="/logo.jpg" alt="Logo" />
      </Link>

      <div className={`header-middle ${menuOpen ? "visible" : ""}`}>
        <Link
          href="/"
          style={{
            borderBottom: pathname === "/" ? ".5px solid #fff" : "",
          }}
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>

        <Link
          href="/about"
          style={{
            borderBottom: pathname === "/about" ? ".5px solid #fff" : "",
          }}
          onClick={() => setMenuOpen(false)}
        >
          About Us
        </Link>

        <Link
          href="/works"
          style={{
            borderBottom: pathname === "/works" ? ".5px solid #fff" : "",
          }}
          onClick={() => setMenuOpen(false)}
        >
          Our Work
        </Link>

        <Link
          href="/contacts"
          style={{
            borderBottom: pathname === "/contacts" ? ".5px solid #fff" : "",
          }}
          onClick={() => setMenuOpen(false)}
        >
          Contact Us
        </Link>
        {role === "admin" && (
          <Link
            href="/dashboard"
            style={{
              borderBottom: pathname === "/dashboard" ? ".5px solid #fff" : "",
            }}
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
        )}
        {menuOpen && (
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              gap: "20px",
              alignItems: "center",
            }}
          >
            {/* Cart Icon */}
            <FaShoppingCart
              size={20}
              onClick={() => setOrdersPanelOpen(true)}
              style={{ cursor: "pointer" }}
              className="visible-cart-icon"
            />{" "}
            <div
              className="visible-header-right"
              onClick={() => setMenuOpen(false)}
            >
              <Link href={authenticated ? "/order" : "/login"}>
                Order Yours
              </Link>
            </div>
            {/* <div onClick={handleLogout} style={{ cursor: "pointer" }}>
              <FaSignOutAlt />
            </div>
            {logoutPopup && (
              <div className="logout-popup">Logged out successfully!</div>
            )} */}
          </div>
        )}
      </div>

      <div
        style={{
          cursor: "pointer",
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        {/* Cart Icon */}
        <FaShoppingCart
          size={20}
          onClick={() => setOrdersPanelOpen(true)}
          style={{ cursor: "pointer" }}
          className="cart-icon"
        />
        <div className="header-right">
          <Link href={authenticated ? "/order" : "/login"}>Order Yours</Link>
        </div>
        <div onClick={handleLogout} style={{ cursor: "pointer" }}>
          <FaSignOutAlt />{" "}
          {logoutPopup && (
            <div className="logout-popup">Logged out successfully!</div>
          )}
        </div>
      </div>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars />
      </div>

      <div
        style={{
          position: "fixed",
          top: 0,
          right: ordersPanelOpen ? 0 : "-400px",
          width: "305px",
          height: "100vh",
          background: "#fff",
          boxShadow: "-4px 0 10px rgba(0,0,0,0.2)",
          transition: "right 0.3s ease",
          padding: "20px",
          zIndex: 2000,
          display: authenticated ? "block" : "none",
          overflowY: "auto",
          color: "#000",
        }}
        className="order-container"
      >
        {/* Close Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
          }}
        >
          <FaX
            size={20}
            onClick={() => setOrdersPanelOpen(false)}
            style={{ cursor: "pointer" }}
          />
        </div>

        <h3>My Orders</h3>

        <div className="orders-cart">
          {filteredOrders.length === 0 ? (
            <p>No {filter} orders found</p>
          ) : (
            filteredOrders.map((o) => (
              <div
                key={o.id}
                className="order-card"
                style={{
                  // border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "10px",
                  marginBottom: "10px",
                  // width: "80%",
                }}
              >
                <div key={o.id} className="each-cart">
                  <div className="each-cart-top">
                    <div className="each-cart-left">
                      <img
                        src={o.productImage}
                        alt={o.productName}
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="each-cart-right">
                      <div>{o.productName}</div>
                      <div>{o.price && o.price + "ETB"}</div>{" "}
                      {o.approval === "approved" &&
                        o.paymentImage === null &&
                        o.paymentStatus === "pending" && (
                          <button
                            className="pay-btn"
                            onClick={() => openPayModal(o)}
                            style={{
                              padding: "8px 14px",
                              marginTop: "10px",
                              borderRadius: "6px",
                              background: "#007bff",
                              color: "#fff",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Pay Now
                          </button>
                        )}
                      {/* <div>
                      Overall, I was very impressed with the product. It’s
                      really wonderful. It’s really wonderful. It’s all good. I
                      Like it. Its related to the installation! Absolutely
                      wonderful!
                    </div> */}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 15,
                      fontSize: "12px",
                    }}
                  >
                    {o.approval === "approved" ? (
                      <div style={{ color: "green" }}>Approved</div>
                    ) : (
                      <div style={{ color: "green" }}>Waiting for approval</div>
                    )}
                    {o.paymentImage && o.paymentStatus === "submitted" && (
                      <div style={{ color: "red" }}>
                        Waiting for payment Approval
                      </div>
                    )}
                    {o.paymentStatus === "paid" && (
                      <div style={{ color: "green" }}>Paid</div>
                    )}
                    <div style={{ color: "green" }}>
                      {o.completion === "started" && "Started"}
                    </div>
                    <div style={{ color: "green" }}>
                      {o.completion === "completed" && "Completed"}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {showPayModal && selectedOrder && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Upload Payment Proof</h3>

            <form onSubmit={handlePaymentUpload}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPaymentFile(e.target.files[0])}
                required
              />

              <button type="submit" className="upload-btn">
                Upload
              </button>
            </form>

            <button
              className="close-btn"
              onClick={() => setShowPayModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
