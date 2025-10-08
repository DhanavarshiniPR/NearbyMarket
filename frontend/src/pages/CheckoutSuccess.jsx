import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  useTheme,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CheckoutSuccess = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 2,
            backgroundColor: 'background.paper',
            boxShadow: theme.shadows[3],
          }}
        >
          <CheckCircleIcon
            sx={{
              fontSize: 80,
              color: 'success.main',
              mb: 2,
            }}
          />
          <Typography variant="h4" gutterBottom color="primary">
            Order Confirmed!
          </Typography>
          <Typography variant="h6" gutterBottom color="text.secondary">
            Thank you for your purchase
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            Your order has been successfully placed. You will receive a confirmation
            email shortly with your order details.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<HomeIcon />}
              onClick={() => navigate('/')}
              sx={{ px: 4, py: 1.5 }}
            >
              Return to Home
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default CheckoutSuccess; 