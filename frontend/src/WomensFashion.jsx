import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PaymentModal from "./PaymentModal"; // Ensure this import is correct
import "./WomensFashion.css";

const initialFashionItems = [
  { id: 1, title: "Elegant Red Dress", price: "$50", image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS65LIpH29UcDcw6UCkBTcn66PLp_VKS1IKkc73Ld7MG8EtjTC7mOxmKq2qNeYeCJfEZThSOJIuteLMjzz73BtGA3bFA8cz0sDiTOsjYg35" },
  { id: 2, title: "Casual Denim Jacket", price: "$40", image: "https://i.etsystatic.com/26266217/r/il/acda33/5412643085/il_fullxfull.5412643085_gsef.jpg" },
  { id: 3, title: "Stylish Handbag", price: "$35", image: "https://i.pinimg.com/736x/53/ab/a0/53aba0991bdf647f24c0b56636a77cac.jpg" },
  { id: 4, title: "Trendy Sneakers", price: "$45", image: "https://m.media-amazon.com/images/I/41UX405gFOL._SY625_.jpg" }
];

const WomensFashion = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const [fashionItems, setFashionItems] = useState(initialFashionItems);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFashionItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://nearby-market-backend-1.onrender.com/products");
        const fashionProducts = response.data.filter(
          (product) => product.category === "Women's Fashion"
        );
        setFashionItems([...initialFashionItems, ...fashionProducts]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching fashion items:", err);
        setError("Failed to load fashion items. Please try again.");
        setLoading(false);
      }
    };

    fetchFashionItems();
  }, []);

  const handleBuyNow = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="fashion-container">
      <button className="nav-toggle-btn" onClick={() => setNavOpen(!isNavOpen)}>
        ☰ Menu
      </button>

      {isNavOpen && (
        <div className="modal-nav">
          <div className="modal-links">
            <a onClick={() => navigate("/")}>Home</a>
            <a onClick={() => navigate("/aboutus")}>About Us</a>
            <a onClick={() => navigate("/contactus")}>Contact</a>
            <a onClick={() => navigate("/offers")}>Offers</a>
            <a onClick={() => navigate("/cars")}>Cars</a>
            <a onClick={() => navigate("/bikes")}>Bikes</a>
            <a onClick={() => navigate("/gadgets")}>Gadgets</a>
            <a onClick={() => navigate("/womensfashion")}>Women's Fashion</a>
            <a onClick={() => navigate("/house")}>House</a>
          </div>
        </div>
      )}

      <h1>Available Fashion Items for Sale </h1>

      {loading && <p>Loading fashion items...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="fashion-grid">
        {fashionItems.length > 0 ? (
          fashionItems.map((item) => (
            <div key={item.id || item._id} className="fashion-card">
              <img src={item.image || item.images[0]} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.price}</p>
              <button onClick={() => handleBuyNow(item)} className="buy-btn">
                Buy Now
              </button>
            </div>
          ))
        ) : (
          <p>No fashion items available at the moment.</p>
        )}
      </div>

     {isModalOpen && (
        <PaymentModal car={selectedWomensFashion} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default WomensFashion;
