
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import theme from "./theme";
import Login from "./Login";
import SignUp from "./SignUp";
import Marketing from "./Marketing";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Offers from "./Offers";
import Sell from "./Sell";
import Cars from "./Cars";
import Bike from "./Bike";
import Gadgets from "./Gadgets";
import WomensFashion from "./WomensFashion";
import House from "./House";
import GuestPage from "./GuestPage";
import Product from "./Product";
import "leaflet/dist/leaflet.css";
import "./App.css";
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import CheckoutSuccess from './pages/CheckoutSuccess';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to guest page");
    toast.error("Please login to access this page");
    return <Navigate to="/guestpage" />;
  }
  return children;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  console.log('App component rendering, isAuthenticated:', isAuthenticated);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      console.log("Current auth token:", token);
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error("Error checking authentication:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log('Current route:', window.location.pathname);
  }, []);

  const [hasError, setHasError] = useState(false);

  const handleLogin = () => {
    console.log("Logging in...");
    localStorage.setItem("token", "mockToken123");
    setIsAuthenticated(true);
    toast.success("Successfully logged in!");
  };

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    toast.info("You have been logged out");
    window.location.href = '/guestpage'; // Force redirect to guest page
  };

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i => 
          i.id === item.id 
            ? { ...i, quantity: (i.quantity || 1) + (item.quantity || 1) }
            : i
        );
      }
      return [...prevItems, item];
    });
  };

  const updateCart = (updatedItem) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  if (hasError) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center', 
        backgroundColor: '#fff',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h1>Something went wrong</h1>
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Reload Page
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center', 
        backgroundColor: '#fff',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Router>
          <div className="app-container">
            <Routes>
              <Route path="/guestpage" element={<GuestPage />} />
              <Route 
                path="/login" 
                element={
                  isAuthenticated ? (
                    <Navigate to="/" replace />
                  ) : (
                    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
                      <Login onLogin={handleLogin} />
                    </div>
                  )
                } 
              />
              <Route 
                path="/signup" 
                element={
                  isAuthenticated ? (
                    <Navigate to="/" replace />
                  ) : (
                    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
                      <SignUp onLogin={handleLogin} />
                    </div>
                  )
                } 
              />
              
              <Route
                path="/"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Marketing
                      onLogout={handleLogout}
                      cartItems={cartItems}
                      addToCart={addToCart}
                      removeFromCart={removeFromCart}
                    />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/aboutus"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <AboutUs onLogout={handleLogout} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/sell"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Sell onLogout={handleLogout} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/contactus"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <ContactUs onLogout={handleLogout} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/offers"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Offers onLogout={handleLogout} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/cars"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Cars onLogout={handleLogout} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/bikes"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Bike onLogout={handleLogout} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/gadgets"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Gadgets onLogout={handleLogout} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/womensfashion"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <WomensFashion onLogout={handleLogout} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/house"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <House onLogout={handleLogout} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/product"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Product onLogout={handleLogout} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/product/:id"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <ProductDetails 
                      addToCart={addToCart}
                      updateCart={updateCart}
                      removeFromCart={removeFromCart}
                    />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/cart"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Cart 
                      cartItems={cartItems}
                      updateCart={updateCart}
                      removeFromCart={removeFromCart}
                    />
                  </ProtectedRoute>
                }
              />

              <Route path="/checkout-success" element={<CheckoutSuccess />} />

              <Route
                path="*"
                element={<Navigate to={isAuthenticated ? "/" : "/guestpage"} replace />}
              />
            </Routes>
          </div>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
