"use client";
import { useEffect, useState } from "react";
import styles from "../page.module.css";
import { FaX } from "react-icons/fa6";
import axios from "axios";

function Works() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [search, setSearch] = useState("");

  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");

  // ✅ Fetch products from DB
  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");
        if (data.success) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    getProducts();
  }, []);

  // ✅ Auth check
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/me");
        setAuthenticated(data.authenticated);
        if (data.authenticated) setUserId(data.userId);
      } catch (err) {
        console.error("Axios error:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className={styles.worksContainer}>
      <div className={styles.worksBanner}>
        <div className={styles.worksBannerTitle}>OUR WORKS</div>
        <div className={styles.worksBannerSubtext}>
          Reliable, trustworthy, and affordable fiber glass for your home or
          business
        </div>
      </div>

      {/* PRODUCT LIST */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.worksProduct}>
        {products
          .filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((item) => (
            <div className={styles.worksEachProduct} key={item.id}>
              <img
                src={item.imageUrl}
                alt={item.name}
                className={styles.productImg}
              />

              <div>
                <div>
                  <div>{item.name}</div>
                  <div>{Number(item.price).toLocaleString()} ETB</div>
                </div>

                <div
                  className={styles.productsOrderBtn}
                  onClick={() => setSelectedProduct(item)}
                >
                  ORDER
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* MODAL */}
      {selectedProduct && (
        <div className={styles.orderModal}>
          <div className={styles.orderModalContent}>
            <button
              className={styles.orderModalClose}
              onClick={() => setSelectedProduct(null)}
            >
              <FaX />
            </button>

            <img
              src={selectedProduct.imageUrl}
              alt=""
              className={styles.modalImg}
            />

            <div>
              <strong>{selectedProduct.name}</strong>
            </div>
            <div>{selectedProduct.price} ETB</div>

            <form
              className={styles.orderForm}
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);

                const formData = new FormData();
                formData.append("productName", selectedProduct.name);
                formData.append("productPrice", selectedProduct.price);
                formData.append("userId", userId);
                formData.append("productImageUrl", selectedProduct.image);
                formData.append("customerName", e.target.fullName.value);
                formData.append("customerPhone", e.target.customerPhone.value);
                formData.append("customerEmail", e.target.customerEmail.value);
                formData.append("customerLocation", e.target.address.value);

                try {
                  const res = await axios.post("/api/orders", formData);

                  if (res.data.success) {
                    setLoading(false);
                    setSuccessPopup(true);
                    setSelectedProduct(null);
                    setTimeout(() => setSuccessPopup(false), 1500);
                  }
                } catch (err) {
                  setLoading(false);
                  setErrorPopup(true);
                  setTimeout(() => setErrorPopup(false), 1500);
                }
              }}
            >
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                required
              />
              <input
                type="text"
                name="customerPhone"
                placeholder="Phone Number"
                required
              />
              <input
                type="email"
                name="customerEmail"
                placeholder="Email"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                required
              />
              <button type="submit" className={styles.submitOrderBtn}>
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}

      {loading && <div className={styles.popupLoading}>Processing...</div>}
      {successPopup && (
        <div className={styles.popupSuccess}>
          Order Placed Successfully! Check your email for confirmation and next
          steps
        </div>
      )}
      {errorPopup && (
        <div className={styles.popupError}>Failed to place order!</div>
      )}
    </div>
  );
}

export default Works;
