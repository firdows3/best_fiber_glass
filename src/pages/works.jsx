import { useState } from "react";
import "../styles/works.css";
import { Link } from "react-router-dom";
import { FaX } from "react-icons/fa6";

function Works() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    { id: 1, image: "/fg1.jpg", name: "Fiber Glass Table", price: "20,000" },
    { id: 2, image: "/fg2.jpg", name: "Fiber Glass Vase", price: "5,000" },
    { id: 3, image: "/fg3.jpg", name: "Fiber Glass Table", price: "15,000" },
    { id: 4, image: "/fg4.jpg", name: "Fiber Glass Table", price: "12,500" },
    { id: 5, image: "/fg5.jpg", name: "Fiber Glass Vase", price: "8,000" },
    { id: 6, image: "/fg6.jpg", name: "Fiber Glass Table", price: "12,500" },
    { id: 7, image: "/fg7.jpg", name: "Fiber Glass Vase", price: "8,000" },
  ];

  return (
    <div className="works-container">
      <div className="works-banner">
        <div className="works-banner-title">OUR WORKS</div>
        <div className="works-banner-subtext">
          Reliable, trustworthy, and affordable fiber glass for your home or
          business
        </div>
      </div>

      <div className="works-product">
        {products.map((item) => (
          <div className="works-each-product" key={item.id}>
            <img src={item.image} alt={item.name} className="product-img" />

            <div>
              <div>
                <div>{item.name}</div>
                <div>{item.price} ETB</div>
              </div>

              <div
                className="products-order-btn"
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
        <div className="order-modal">
          <div className="order-modal-content">
            <button
              className="order-modal-close"
              onClick={() => setSelectedProduct(null)}
            >
              <FaX />
            </button>

            <img src={selectedProduct.image} alt="" className="modal-img" />

            <div>
              <strong>{selectedProduct.name}</strong>
            </div>
            <div>{selectedProduct.price} ETB</div>

            <form className="order-form">
              <input type="text" placeholder="Your Name" required />
              <input type="text" placeholder="Phone Number" required />
              <textarea placeholder="Additional Notes" />

              <button type="submit" className="submit-order-btn">
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Works;
