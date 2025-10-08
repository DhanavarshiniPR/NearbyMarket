
import React, { useState, useEffect } from "react";
import "./Product.css";
import { useNavigate } from "react-router-dom";

const hardcodedProducts = [
  {
    id: 1,
    name: "Electric Scooter - Eco Commuter",
    price: 599.99,
    description: "Refurbished electric scooter, perfect for eco-friendly urban commuting. Features include 25km range, LED display, and foldable design.",
    image: "https://m.media-amazon.com/images/I/61gF6-d8lML._SL1500_.jpg",
    condition: "Refurbished",
    category: "Transportation"
  },
  {
    id: 2,
    name: "Vintage Leather Messenger Bag",
    price: 79.99,
    description: "Authentic leather messenger bag in excellent condition. Perfect for laptops up to 15 inches. Classic style with modern functionality.",
    image: "https://m.media-amazon.com/images/I/91J1MHD0+ML._AC_UY1000_.jpg",
    condition: "Good",
    category: "Accessories"
  },
  {
    id: 3,
    name: "Refurbished iPhone 12 Pro",
    price: 649.99,
    description: "Certified refurbished iPhone 12 Pro, 128GB. Includes new battery, original accessories, and 1-year warranty.",
    image: "https://m.media-amazon.com/images/I/71FuI8YvCNL._AC_UF1000,1000_QL80_.jpg",
    condition: "Like New",
    category: "Electronics"
  },
  {
    id: 4,
    name: "Antique Wooden Bookshelf",
    price: 299.99,
    description: "Beautiful Victorian-era bookshelf, restored to preserve its original charm. Solid wood construction with intricate detailing.",
    image: "https://m.media-amazon.com/images/I/71dpHzg+UHL._AC_UF1000,1000_QL80_.jpg",
    condition: "Good",
    category: "Furniture"
  },
  {
    id: 5,
    name: "Mountain Bike - Trek Series",
    price: 449.99,
    description: "Well-maintained Trek mountain bike. Recent tune-up, new tires, and brake pads. Perfect for trail riding.",
    image: "https://m.media-amazon.com/images/I/81wGn2TQJeL._AC_UF1000,1000_QL80_.jpg",
    condition: "Good",
    category: "Sports"
  },
  {
    id: 6,
    name: "Vintage Vinyl Record Collection",
    price: 199.99,
    description: "Collection of 50+ classic rock and jazz vinyl records from the 70s and 80s. All in good playing condition.",
    image: "https://m.media-amazon.com/images/I/71nJxZ+uZVL._AC_UF1000,1000_QL80_.jpg",
    condition: "Fair",
    category: "Entertainment"
  }
];

const Product = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    const userListedProducts = JSON.parse(localStorage.getItem('products') || '[]');
   
    const formattedUserProducts = userListedProducts.map(product => ({
      id: product.id,
      name: product.title,
      price: parseFloat(product.price),
      description: product.description,
      image: product.images[0], 
      condition: product.condition,
      category: product.category,
      isUserListed: true 
    }));

    setAllProducts([...hardcodedProducts, ...formattedUserProducts]);
  }, []); 

  const handleBuyNow = () => {
    if (selectedProduct) {
      setShowPaymentOptions(true);
    } else {
      alert("Please select a product first");
    }
  };

  const handlePayment = (method) => {
    alert(`Payment successful via ${method}`);
    navigate("/thankyou");
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setShowPaymentOptions(false);
    setQuantity(1);
  };

  return (
    <div className="products-page">
      <h1>Available Products</h1>
      <div className="products-grid">
        {allProducts.map((product) => (
          <div 
            key={product.id} 
            className={`product-card ${selectedProduct?.id === product.id ? 'selected' : ''} ${product.isUserListed ? 'user-listed' : ''}`}
            onClick={() => handleProductSelect(product)}
          >
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-details">
              <h2>{product.name}</h2>
              <p className="price">${product.price.toFixed(2)}</p>
              <p className="condition">Condition: {product.condition}</p>
              <p className="category">Category: {product.category}</p>
              {product.isUserListed && (
                <div className="user-listed-badge">
                  User Listed
                </div>
              )}
              <p className="description">{product.description}</p>
              {selectedProduct?.id === product.id && (
                <div className="purchase-options">
                  <div className="quantity">
                    <label>Quantity: </label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    />
                  </div>
                  {!showPaymentOptions ? (
                    <button className="buy-btn" onClick={handleBuyNow}>
                      Buy Now
                    </button>
                  ) : (
                    <div className="payment-options">
                      <p>Select a payment method:</p>
                      <button onClick={() => handlePayment("Google Pay")}>Google Pay</button>
                      <button onClick={() => handlePayment("PhonePe")}>PhonePe</button>
                      <button onClick={() => handlePayment("Paytm")}>Paytm</button>
                      <button onClick={() => handlePayment("Credit/Debit Card")}>
                        Credit/Debit Card
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
