"use client";
import { useState, useEffect } from "react";
import styles from "../page.module.css";
import axios from "axios";

/* ---------- helper tiny Toast component ---------- */
function Toast({ type = "info", message }) {
  const base = styles.popupSuccess; // you already have these classes
  const className =
    type === "success"
      ? styles.popupSuccess
      : type === "error"
      ? styles.popupError
      : styles.popupLoading;
  return <div className={className}>{message}</div>;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("orders"); // orders | users | products
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all"); // orders filters

  // Products state
  const [products, setProducts] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [productModalOpen, setProductModalOpen] = useState(false); // add / edit modal
  const [editingProduct, setEditingProduct] = useState(null); // null => create
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // { type, message }

  // ==========================
  // FETCH
  // ==========================
  useEffect(() => {
    if (activeTab === "orders") fetchOrders();
    if (activeTab === "users") fetchUsers();
    if (activeTab === "products") fetchProducts();
  }, [activeTab]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/orders");
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to load orders");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/user");
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to load users");
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/products");
      setProducts(res.data.products || []);
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Orders actions (unchanged)
  // ==========================
  const updateOrder = async (orderId, updateData) => {
    try {
      await axios.patch(`/api/orders/${orderId}`, updateData);
      fetchOrders();
      showToast("success", "Order updated");
    } catch (error) {
      console.error("Failed to update order:", error);
      showToast("error", "Failed to update order");
    }
  };

  const handleApprove = (id) => updateOrder(id, { approval: "approved" });
  const handlePaid = (id) => updateOrder(id, { paymentStatus: "paid" });
  const handleStart = (id) => updateOrder(id, { completion: "started" });
  const handleComplete = (id) => updateOrder(id, { completion: "completed" });

  // ==========================
  // Products actions: create / edit / delete
  // ==========================
  const openAddProduct = () => {
    setEditingProduct(null);
    setProductModalOpen(true);
  };

  const openEditProduct = (product) => {
    setEditingProduct(product);
    setProductModalOpen(true);
  };

  const saveProduct = async (formData) => {
    setLoading(true);

    try {
      if (editingProduct) {
        await axios.patch(`/api/products/${editingProduct.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        showToast("success", "Work updated");
      } else {
        await axios.post("/api/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        showToast("success", "Work added");
      }

      setProductModalOpen(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
      showToast("error", "Save failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      setLoading(true);
      await axios.delete(`/api/products/${id}`);
      showToast("success", "Product deleted");
      fetchProducts();
      setProductModalOpen(false);
    } catch (err) {
      console.error(err);
      showToast("error", "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Filtered lists
  // ==========================
  const filteredOrders = orders?.filter((o) => {
    if (filter === "all") return true;
    if (filter === "approval") return o.approval === "pending";
    if (filter === "payment") return o.paymentStatus === "pending";
    if (filter === "completion") return o.completion === "started";
    return true;
  });

  const filteredProducts = products.filter((p) =>
    (p.name + " " + (p.price || ""))
      .toLowerCase()
      .includes(productSearch.toLowerCase())
  );

  // ==========================
  // Tiny toast helper
  // ==========================
  function showToast(type, message, ms = 1500) {
    setToast({ type, message });
    setTimeout(() => setToast(null), ms);
  }

  // ==========================
  // JSX
  // ==========================
  return (
    <>
      {/* optional banner */}
      <div className={styles.dashboardBanner}></div>
      <div className={styles.dashboardBody}>
        {/* TABS */}
        <div className={styles.navTabs}>
          <div
            className={
              activeTab === "orders" ? styles.tabActive : styles.tabInactive
            }
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </div>

          <div
            className={
              activeTab === "users" ? styles.tabActive : styles.tabInactive
            }
            onClick={() => setActiveTab("users")}
          >
            Users
          </div>

          <div
            className={
              activeTab === "products" ? styles.tabActive : styles.tabInactive
            }
            onClick={() => setActiveTab("products")}
          >
            Products
          </div>
        </div>

        {/* ORDERS */}
        {activeTab === "orders" && (
          <>
            <div className={styles.filters}>
              <button
                className={
                  filter === "all" ? styles.filterBtnActive : styles.filterBtn
                }
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={
                  filter === "approval"
                    ? styles.filterBtnActive
                    : styles.filterBtn
                }
                onClick={() => setFilter("approval")}
              >
                Needs Approval
              </button>
              <button
                className={
                  filter === "payment"
                    ? styles.filterBtnActive
                    : styles.filterBtn
                }
                onClick={() => setFilter("payment")}
              >
                Needs Payment
              </button>
              <button
                className={
                  filter === "completion"
                    ? styles.filterBtnActive
                    : styles.filterBtn
                }
                onClick={() => setFilter("completion")}
              >
                Needs Completion
              </button>
            </div>

            <div className={styles.orderList}>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <div key={order.id} className={styles.eachCard}>
                    <div className={styles.eachCardTop}>
                      <div
                        style={{
                          display: "flex",
                          gap: 20,
                          alignItems: "center",
                        }}
                        className={styles.eachCardLeft}
                      >
                        <img src={order.productImage} alt="Product" />
                        {order.paymentImage && (
                          <img src={order.paymentImage} alt="Payment" />
                        )}
                      </div>
                      <div className={styles.eachCardRight}>
                        <div>{order.customerName}</div>
                        <div>{order.customerPhone}</div>
                        <div>{order.customerLocation}</div>

                        {order.approval === "pending" ? (
                          <button
                            className={styles.dashboardBtn}
                            onClick={() => handleApprove(order.id)}
                          >
                            Approve
                          </button>
                        ) : (
                          <span
                            className={`${styles.statusText} ${styles.statusApproved}`}
                          >
                            Approved
                          </span>
                        )}

                        {order.approval === "approved" &&
                          order.paymentImage &&
                          order.paymentStatus === "submitted" && (
                            <button
                              className={styles.dashboardBtn}
                              onClick={() => handlePaid(order.id)}
                            >
                              Mark Paid
                            </button>
                          )}

                        {order.approval === "approved" &&
                          order.paymentImage &&
                          order.paymentStatus === "paid" && (
                            <span
                              className={`${styles.statusText} ${styles.statusPaid}`}
                            >
                              Paid
                            </span>
                          )}

                        {order.approval === "approved" &&
                        order.paymentImage &&
                        order.paymentStatus === "paid" &&
                        order.completion === "toBeStarted" ? (
                          <button
                            className={styles.dashboardBtn}
                            onClick={() => handleStart(order.id)}
                          >
                            Start
                          </button>
                        ) : order.completion === "started" ? (
                          <>
                            <button
                              className={styles.dashboardBtn}
                              onClick={() => handleComplete(order.id)}
                            >
                              Complete
                            </button>
                          </>
                        ) : order.completion === "completed" ? (
                          <span
                            className={`${styles.statusText} ${styles.statusCompleted}`}
                          >
                            Completed
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>No orders found</div>
              )}
            </div>
          </>
        )}

        {/* USERS */}
        {activeTab === "users" && (
          <div className={styles.usersDashboard}>
            {users.map((user) => (
              <div key={user.id} className={styles.userCard}>
                <div>
                  <strong>Name:</strong> {user.name}
                </div>
                <div>
                  <strong>Email:</strong> {user.email}
                </div>
                <div>
                  <strong>Phone:</strong> {user.phoneNumber}
                </div>
                <div>
                  <strong>Orders:</strong> {user.orderCount}
                </div>
                <div>
                  <strong>Joined:</strong> {user.createdAt}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PRODUCTS */}
        {activeTab === "products" && (
          <div>
            {/* SEARCH + ADD on same line */}
            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <input
                placeholder="Search works by name or description..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                style={{
                  flex: 1,
                  padding: "8px 10px",
                  borderRadius: 6,
                  border: "1px solid #ddd",
                }}
              />
              <button onClick={openAddProduct} className={styles.filterBtn}>
                Add Product
              </button>
            </div>

            {/* LIST */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 12,
              }}
              className={styles.worksProduct}
            >
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className={styles.worksEachProduct}
                  style={{ cursor: "pointer" }}
                  onClick={() => openEditProduct(p)}
                >
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className={styles.productImg}
                  />
                  <div style={{ padding: 8 }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{p.name}</div>
                      <div style={{ marginTop: 6 }}>
                        {Number(p.price).toLocaleString()} ETB
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* PRODUCT MODAL (create / edit) */}
      {productModalOpen && activeTab === "products" && (
        <div className={styles.orderModal}>
          <div className={styles.orderModalContent}>
            <h3>{editingProduct ? "Edit Work" : "Add Work"}</h3>

            <ProductForm
              initial={editingProduct}
              onCancel={() => {
                setProductModalOpen(false);
                setEditingProduct(null);
              }}
              onSave={saveProduct}
              onDelete={
                editingProduct ? () => deleteProduct(editingProduct.id) : null
              }
            />
          </div>
        </div>
      )}

      {/* Loading & toasts */}
      {loading && <div className={styles.loadingOverlay}>Processing...</div>}
      {toast && <Toast type={toast.type} message={toast.message} />}
    </>
  );
}

/* Product form component */
function ProductForm({ initial = null, onCancel, onSave, onDelete }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(initial?.imageUrl || null); // existing image
  const [name, setName] = useState(initial?.name || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [price, setPrice] = useState(initial?.price || "");
  const [submitting, setSubmitting] = useState(false);

  // Update when editing a different product
  useEffect(() => {
    if (initial) {
      setName(initial.name);
      setDescription(initial.description);
      setPrice(initial.price);
      setPreview(initial.imageUrl); // show old image again
      setFile(null);
    }
  }, [initial]);

  // When user selects a new image
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);

    // show live preview
    if (selected) {
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);

    // If a new file selected → upload it
    if (file) {
      formData.append("image", file);
    }

    await onSave(formData);

    setSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 10 }}
      className={styles.orderForm}
    >
      {/* IMAGE PREVIEW */}
      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{
            width: 170,
            height: 170,
            objectFit: "cover",
            borderRadius: 8,
            marginBottom: 10,
          }}
        />
      )}

      <input
        placeholder="Work Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        required={!initial} // required only when creating
      />

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />

      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="submit"
          className={styles.filterBtn}
          disabled={submitting}
        >
          {initial ? "Save" : "Create"}
        </button>

        <button type="button" onClick={onCancel} className={styles.filterBtn}>
          Cancel
        </button>

        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            style={{
              marginLeft: "auto",
              background: "#dc3545",
              color: "#fff",
              border: "none",
              padding: "8px 10px",
              borderRadius: 6,
            }}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
