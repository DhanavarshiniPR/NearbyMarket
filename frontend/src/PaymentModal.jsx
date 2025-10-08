import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputAdornment,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  AccountBalance as UPIIcon,
  AccountBalanceWallet as WalletIcon,
  Close as CloseIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import './PaymentModal.css';

const PaymentModal = ({ product, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [upiId, setUpiId] = useState('');
  const [walletSelected, setWalletSelected] = useState('paytm');
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const steps = ['Select Payment Method', 'Enter Details', 'Confirm Payment'];

  const validateCardDetails = () => {
    const newErrors = {};
    if (paymentMethod === 'creditCard') {
      if (!/^\d{16}$/.test(cardDetails.number.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }
      if (!cardDetails.name) {
        newErrors.cardName = 'Cardholder name is required';
      }
      if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
        newErrors.expiry = 'Please enter a valid expiry date (MM/YY)';
      }
      if (!/^\d{3}$/.test(cardDetails.cvv)) {
        newErrors.cvv = 'Please enter a valid 3-digit CVV';
      }
    } else if (paymentMethod === 'upi') {
      if (!/^[a-zA-Z0-9.-]{2,256}@[a-zA-Z][a-zA-Z]{2,64}$/.test(upiId)) {
        newErrors.upiId = 'Please enter a valid UPI ID';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    }
    return value;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardDetails({ ...cardDetails, number: formatted });
  };

  const handleExpiryChange = (e) => {
    let { value } = e.target;
    value = value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setCardDetails({ ...cardDetails, expiry: value });
  };

  const handleNext = () => {
    if (activeStep === 1 && !validateCardDetails()) {
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!validateCardDetails()) return;

    setProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPaymentStatus('success');
      setTimeout(() => {
    onClose();
      }, 2000);
    } catch (error) {
      setPaymentStatus('error');
    } finally {
      setProcessing(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
  return (
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">Select your preferred payment method</FormLabel>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="creditCard"
                control={<Radio />}
                label={
                  <Box display="flex" alignItems="center" gap={1}>
                    <CreditCardIcon color="primary" />
                    <Typography>Credit/Debit Card</Typography>
                  </Box>
                }
              />
              <FormControlLabel
                value="upi"
                control={<Radio />}
                label={
                  <Box display="flex" alignItems="center" gap={1}>
                    <UPIIcon color="primary" />
                    <Typography>UPI Payment</Typography>
                  </Box>
                }
              />
              <FormControlLabel
                value="wallet"
                control={<Radio />}
                label={
                  <Box display="flex" alignItems="center" gap={1}>
                    <WalletIcon color="primary" />
                    <Typography>Digital Wallet</Typography>
                  </Box>
                }
              />
            </RadioGroup>
          </FormControl>
        );

      case 1:
        return (
          <Box component="form" sx={{ mt: 2 }}>
            {paymentMethod === 'creditCard' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TextField
                  fullWidth
                  label="Card Number"
                    value={cardDetails.number}
                  onChange={handleCardNumberChange}
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber}
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CreditCardIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Cardholder Name"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                  error={!!errors.cardName}
                  helperText={errors.cardName}
                  margin="normal"
                />
                <Box display="flex" gap={2}>
                  <TextField
                    label="Expiry Date"
                    value={cardDetails.expiry}
                    onChange={handleExpiryChange}
                    error={!!errors.expiry}
                    helperText={errors.expiry}
                    margin="normal"
                    placeholder="MM/YY"
                  />
                  <TextField
                    label="CVV"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.slice(0, 3) })}
                    error={!!errors.cvv}
                    helperText={errors.cvv}
                    margin="normal"
                    type="password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </motion.div>
            )}
            
            {paymentMethod === 'upi' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TextField
                  fullWidth
                  label="UPI ID"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  error={!!errors.upiId}
                  helperText={errors.upiId}
                  margin="normal"
                  placeholder="yourname@upi"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <UPIIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </motion.div>
            )}
            
            {paymentMethod === 'wallet' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FormControl fullWidth margin="normal">
                  <Select
                  value={walletSelected}
                  onChange={(e) => setWalletSelected(e.target.value)}
                  >
                    <MenuItem value="paytm">Paytm</MenuItem>
                    <MenuItem value="phonepe">PhonePe</MenuItem>
                    <MenuItem value="amazonpay">Amazon Pay</MenuItem>
                  </Select>
                </FormControl>
              </motion.div>
            )}
          </Box>
        );

      case 2:
        return (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box sx={{ my: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
              <Typography variant="subtitle1">
                {product.name}
              </Typography>
              <Typography variant="h5" color="primary" sx={{ mt: 1 }}>
                ${(product.price * (1 - product.discount/100)).toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Original Price: ${product.price}
              </Typography>
              <Typography variant="body2" color="success.main">
                You save: ${(product.price * product.discount/100).toFixed(2)} ({product.discount}% off)
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              By clicking "Confirm Payment", you agree to our terms and conditions.
            </Typography>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 2,
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Secure Checkout</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <AnimatePresence mode="wait">
          {paymentStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Alert severity="success" sx={{ mb: 2 }}>
                Payment successful! Thank you for your purchase.
              </Alert>
            </motion.div>
          ) : paymentStatus === 'error' ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              Payment failed. Please try again.
            </Alert>
          ) : (
            getStepContent(activeStep)
          )}
        </AnimatePresence>
      </DialogContent>

      <DialogActions>
        {activeStep > 0 && (
          <Button onClick={handleBack} disabled={processing}>
            Back
          </Button>
        )}
        {activeStep === steps.length - 1 ? (
          <Button
            variant="contained"
            onClick={handlePaymentSubmit}
            disabled={processing}
            startIcon={processing && <CircularProgress size={20} />}
          >
            {processing ? 'Processing...' : 'Confirm Payment'}
          </Button>
        ) : (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default PaymentModal;