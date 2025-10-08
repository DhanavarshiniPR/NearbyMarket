import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  IconButton,
  Button,
  Divider,
  TextField,
  Card,
  CardMedia,
  CardContent,
  useTheme,
  AppBar,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCart as CartIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShippingForm, PaymentForm } from './CheckoutForms';

const Cart = ({ cartItems = [], updateCart, removeFromCart }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    shippingMethod: 'standard',
  });

  const [paymentData, setPaymentData] = useState({
    paymentMethod: 'credit',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const steps = ['Review Cart', 'Shipping Details', 'Payment', 'Confirmation'];

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% tax
  };

  const calculateShipping = () => {
    return shippingData.shippingMethod === 'express' ? 15 : 10; // $15 for express, $10 for standard
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };

  const handleQuantityChange = (item, change) => {
    const newQuantity = (item.quantity || 1) + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      updateCart({ ...item, quantity: newQuantity });
    }
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    setCheckoutOpen(true);
  };

  const handleNextStep = () => {
    if (activeStep === 1 && !validateShippingData()) {
      alert('Please fill in all required shipping details');
      return;
    }
    if (activeStep === 2 && !validatePaymentData()) {
      alert('Please fill in all required payment details');
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBackStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleCloseCheckout = () => {
    setCheckoutOpen(false);
    setActiveStep(0);
  };

  const handleCompleteCheckout = () => {
    // Save order to localStorage
    const order = {
      id: Date.now(),
      items: cartItems,
      total: calculateTotal(),
      shipping: shippingData,
      payment: paymentData,
      date: new Date().toISOString()
    };

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    cartItems.forEach(item => removeFromCart(item.id));
    
    alert('Order placed successfully!');
    handleCloseCheckout();
    navigate('/checkout-success');
  };

  const validateShippingData = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    return required.every(field => shippingData[field].trim() !== '');
  };

  const validatePaymentData = () => {
    const required = ['cardNumber', 'cardName', 'expiryDate', 'cvv'];
    return required.every(field => paymentData[field].trim() !== '');
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 2 }}>Shopping Cart</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ flexGrow: 1 }}>
          {cartItems.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <CartIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h5" gutterBottom>Your cart is empty</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/')}
                sx={{ mt: 2 }}
              >
                Continue Shopping
              </Button>
            </Paper>
          ) : (
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <Card sx={{ mb: 2, display: 'flex', p: 2 }}>
                        <CardMedia
                          component="img"
                          sx={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 1 }}
                          image={item.image}
                          alt={item.title}
                        />
                        <CardContent sx={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box>
                            <Typography variant="h6">{item.title}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.category} • {item.condition}
                            </Typography>
                            <Typography variant="h6" color="primary">
                              ${item.price}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <IconButton
                                size="small"
                                onClick={() => handleQuantityChange(item, -1)}
                                disabled={item.quantity <= 1}
                              >
                                <RemoveIcon />
                              </IconButton>
                              <TextField
                                size="small"
                                value={item.quantity || 1}
                                inputProps={{
                                  readOnly: true,
                                  style: { textAlign: 'center', width: '40px' }
                                }}
                              />
                              <IconButton
                                size="small"
                                onClick={() => handleQuantityChange(item, 1)}
                                disabled={item.quantity >= 10}
                              >
                                <AddIcon />
                              </IconButton>
                            </Box>
                            <IconButton
                              color="error"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
                  <Typography variant="h6" gutterBottom>Order Summary</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography>Subtotal</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        ${calculateSubtotal().toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>Tax (10%)</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        ${calculateTax().toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>Shipping</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        ${calculateShipping().toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="h6">Total</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6" align="right" color="primary">
                        ${calculateTotal().toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={handleCheckout}
                    sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
                  >
                    Proceed to Checkout
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>

      {/* Checkout Dialog */}
      <Dialog
        open={checkoutOpen}
        onClose={handleCloseCheckout}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5">Checkout</Typography>
        </DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} sx={{ py: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <Box sx={{ mt: 4 }}>
            {activeStep === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>Order Summary</Typography>
                {cartItems.map((item) => (
                  <Box key={item.id} sx={{ mb: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={2}>
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{ width: '100%', borderRadius: '4px' }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle1">{item.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Quantity: {item.quantity}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="subtitle1" align="right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
                <Divider sx={{ my: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography>Total</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6" align="right" color="primary">
                      ${calculateTotal().toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            )}

            {activeStep === 1 && (
              <ShippingForm formData={shippingData} setFormData={setShippingData} />
            )}

            {activeStep === 2 && (
              <PaymentForm formData={paymentData} setFormData={setPaymentData} />
            )}

            {activeStep === 3 && (
              <Box sx={{ textAlign: 'center', py: 3 }}>
                <Typography variant="h5" gutterBottom color="primary">
                  Order Confirmation
                </Typography>
                <Typography variant="body1" paragraph>
                  Total Amount: ${calculateTotal().toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Please confirm your order to complete the purchase.
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseCheckout}>
            Cancel
          </Button>
          {activeStep > 0 && (
            <Button onClick={handleBackStep}>
              Back
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleCompleteCheckout}
            >
              Complete Order
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextStep}
            >
              Next
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Cart; 