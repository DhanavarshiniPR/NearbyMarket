import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PaymentModal from "./PaymentModal"; 
import "./Cars.css";

const carData = [
  { id: 1, name: "Tesla Model S", price: "$80,000", image: "https://greencarscompare.com/upload/resize_cache/iblock/af8/1100_618_2/683f5zoi0e5wpubzns7nxn1ic7rsxp1o.png" },
  { id: 2, name: "BMW M5", price: "$105,000", image: "https://stimg.cardekho.com/images/carexteriorimages/630x420/BMW/M5-2025/11821/1719462197562/front-left-side-47.jpg?tr=w-664" },
  { id: 3, name: "Audi A8", price: "$90,000", image: "https://motoringworld.in/wp-content/uploads/2022/11/2022-Audi-A8-L-web4.jpg" },
  { id: 4, name: "Mercedes-Benz S-Class", price: "$115,000", image: "https://images.autox.com/uploads/2021/07/2021-Mercedes-Benz-S-Class-Front-Quarter-Motion.jpg" },
];

const Cars = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const [cars, setCars] = useState(carData); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false); 
  const [selectedCar, setSelectedCar] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://nearby-market-backend-1.onrender.com/products");
        const carProducts = response.data.filter((product) => product.category === "Cars");
        setCars(carProducts);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError("Failed to load cars. Please try again.");
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleBuyNow = (car) => {
    setSelectedCar(car); 
    setModalOpen(true); 
  };

  const handleCloseModal = () => {
    setModalOpen(false); 
    setSelectedCar(null); 
  };

  return (
    <div className="car-container">
   
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

      <div className="car-content">
        <h1>Available Cars for Sale 🚗</h1>

        {loading && <p>Loading cars...</p>}
        {error && <p className="error-message">{error}</p>}

        <div className="car-grid">
          {cars.length > 0 ? (
            cars.map((car) => (
              <div key={car.id} className="car-card">
                <img src={car.image} alt={car.name} />
                <h3>{car.name}</h3>
                <p>{car.price}</p>
                <button className="buy-btn" onClick={() => handleBuyNow(car)}>
                  Buy Now
                </button>
              </div>
            ))
          ) : (
            !loading && <p>No cars available at the moment.</p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <PaymentModal car={selectedCar} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Cars;
