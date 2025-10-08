import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PaymentModal from "./PaymentModal";
import "./House.css";

const House = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const [houseData, setHouseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const navigate = useNavigate();

  const predefinedHouses = [
    {
      _id: "1",
      title: "Luxury Villa in California",
      price: "$1,200,000",
      images: ["http://88designbox.com/upload/2015/09/15/luxury-villa-05.jpg"],
    },
    {
      _id: "2",
      title: "Modern Apartment in New York",
      price: "$850,000",
      images: ["https://hips.hearstapps.com/hmg-prod/images/over-the-top-apartments-main-1512422328.jpg?crop=1.00xw:0.506xh;0,0.263xh&resize=1024:*"],
    },
  ];

  useEffect(() => {
    const fetchHouseData = async () => {
      try {
        const response = await axios.get("https://nearby-market-backend-1.onrender.com/products");
        const houses = response.data.filter((product) => product.category === "House");
        setHouseData([...predefinedHouses, ...houses]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching house data:", err);
        setError("Failed to load house listings. Please try again.");
        setLoading(false);
        setHouseData(predefinedHouses); 
      }
    };

    fetchHouseData();
  }, []);

  const handleBuyNow = (house) => {
    setSelectedHouse(house);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="house-container">
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

      <h1>Available Houses for Sale 🏡</h1>

      {loading && <p>Loading house listings...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="house-grid">
        {houseData.length > 0 ? (
          houseData.map((house) => (
            <div key={house._id} className="house-card">
              <img src={house.images[0] || "default-house-image.jpg"} alt={house.title} className="house-image" />
              <h3>{house.title}</h3>
              <p>{house.price}</p>
              <button className="buy-btn" onClick={() => handleBuyNow(house)}>
                Buy Now
              </button>
            </div>
          ))
        ) : (
          !loading && <p>No house listings available at the moment.</p>
        )}
      </div>

      {isModalOpen && <PaymentModal item={selectedHouse} onClose={handleCloseModal} />}
    </div>
  );
};

export default House;
