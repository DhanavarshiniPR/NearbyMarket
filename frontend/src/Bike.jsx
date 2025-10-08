import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PaymentModal from "./PaymentModal"; 
import "./Bike.css";

const bikeData = [
  { id: 1, name: "Yamaha YZF-R1", price: "$15,000", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/2015_Yamaha_YZF-R1_crop.JPG/300px-2015-Yamaha_YZF-R1_crop.JPG" },
  { id: 2, name: "Honda CBR1000RR", price: "$14,500", image: "https://iconicmotorbikeauctions.com/wp-content/uploads/2021/02/Honda-CBR1000RR-SP-Front-Right-Featured.jpg" },
  { id: 3, name: "Kawasaki Ninja ZX-10R", price: "$13,000", image: "https://www.bossrides.in/wp-content/uploads/2023/03/kawasaki-ninja-zx10r-1-min-scaled-1.jpg" },
  { id: 4, name: "Ducati Panigale V4", price: "$22,000", image: "https://stat.overdrive.in/uploads/2024/07/2025-Ducati-Panigale-V4-front-2024-07-1e31bdca88d22c4091d73667d10da810-900x506.jpg" },
];

const Bike = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const [bikes, setBikes] = useState(bikeData); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false); 
  const [selectedBike, setSelectedBike] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBikes = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://nearby-market-backend-1.onrender.com/products");
        const bikeProducts = response.data.filter((product) => product.category === "Bikes");
        setBikes(bikeProducts);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bikes:", err);
        setError("Failed to load bikes. Please try again.");
        setLoading(false);
      }
    };

    fetchBikes();
  }, []);

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="bike-container">
      
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

      <div className="bike-content">
        <h1>Available Bikes for Sale 🏍️</h1>

        {loading && <p>Loading bikes...</p>}
        {error && <p className="error-message">{error}</p>}

        <div className="bike-grid">
          {bikes.length > 0 ? (
            bikes.map((bike) => (
              <div key={bike.id} className="bike-card">
                <img src={bike.image} alt={bike.name} />
                <h3>{bike.name}</h3>
                <p>{bike.price}</p>
                <button className="buy-btn" onClick={() => handleBuyNow(product)}>
                  Buy Now
                </button>
              </div>
            ))
          ) : (
            !loading && <p>No bikes available at the moment.</p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <PaymentModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Bike;
