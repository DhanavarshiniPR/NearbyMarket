import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PaymentModal from "./PaymentModal";
import "./Gadgets.css";

const initialGadgets = [
  { id: 1, title: "Apple MacBook Pro", price: "$2,000", image: "https://dukaan.b-cdn.net/700x700/webp/media/e8896897-d7ad-4264-969c-2c3972deba79.jpg" },
  { id: 2, title: "Samsung Galaxy Tab", price: "$800", image: "https://images.samsung.com/is/image/samsung/p6pim/in/sm-x710nzaainu/gallery/in-galaxy-tab-s9-wifi-x710-sm-x710nzaainu-537885425?$684_547_JPG$" },
  { id: 3, title: "Sony WH-1000XM5", price: "$400", image: "https://images.fonearena.com/blog/wp-content/uploads/2024/09/Sony-WH-1000XM5-Headphones-and-WF-1000XM5-Earbuds-Smoky-Pink-1024x561.jpg" },
  { id: 4, title: "Apple Watch Series 9", price: "$500", image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-card-40-s9-202309?wid=1200&hei=1500&fmt=jpeg&qlt=95&.v=1692732084730" }
];

const Gadgets = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const [gadgets, setGadgets] = useState(initialGadgets);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGadget, setSelectedGadget] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGadgets = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://nearby-market-backend-1.onrender.com/api/products");
        const gadgetProducts = response.data.filter((product) => product.category === "Gadgets");
        setGadgets((prevGadgets) => [...prevGadgets, ...gadgetProducts]);
      } catch (err) {
        console.error("Error fetching gadgets:", err);
        setError("Failed to load gadgets. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchGadgets();
  }, []);

  const handleBuyNow = (gadget) => {
    setSelectedGadget(gadget);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="gadgets-container">
      <button className="nav-toggle-btn" onClick={() => setNavOpen(!isNavOpen)}>☰ Menu</button>

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

      <h1>Available Gadgets for Sale</h1>
      {loading && <p>Loading gadgets...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="gadgets-grid">
        {gadgets.length > 0 ? (
          gadgets.map((gadget) => (
            <div key={gadget.id || gadget._id} className="gadget-card">
              <img src={gadget.image || "default-gadget-image.jpg"} alt={gadget.title} />
              <h3>{gadget.title}</h3>
              <p>{gadget.price}</p>
              <button className="buy-btn" onClick={() => handleBuyNow(gadget)}>Buy Now</button>
            </div>
          ))
        ) : (
          !loading && <p>No gadgets available at the moment.</p>
        )}
      </div>

      {isModalOpen && <PaymentModal gadget={selectedGadget} onClose={handleCloseModal} />}
    </div>
  );
};

export default Gadgets;
