import React from 'react';
import {
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Typography,
} from '@mui/material';

export const ShippingForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="ZIP Code"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Shipping Method</FormLabel>
          <RadioGroup
            name="shippingMethod"
            value={formData.shippingMethod}
            onChange={handleChange}
          >
            <FormControlLabel
              value="standard"
              control={<Radio />}
              label="Standard Shipping (5-7 business days) - Free"
            />
            <FormControlLabel
              value="express"
              control={<Radio />}
              label="Express Shipping (2-3 business days) - $15"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export const PaymentForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormControl component="fieldset" sx={{ width: '100%' }}>
          <FormLabel component="legend">Payment Method</FormLabel>
          <RadioGroup
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <FormControlLabel
              value="credit"
              control={<Radio />}
              label="Credit Card"
            />
            <FormControlLabel
              value="debit"
              control={<Radio />}
              label="Debit Card"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Card Number"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          inputProps={{ maxLength: 16 }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Name on Card"
          name="cardName"
          value={formData.cardName}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Expiry Date"
          name="expiryDate"
          placeholder="MM/YY"
          value={formData.expiryDate}
          onChange={handleChange}
          inputProps={{ maxLength: 5 }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="CVV"
          name="cvv"
          value={formData.cvv}
          onChange={handleChange}
          inputProps={{ maxLength: 3 }}
          type="password"
        />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Your payment information is secure and encrypted. We never store your full card details.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}; 