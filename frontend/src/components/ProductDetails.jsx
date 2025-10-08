import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Chip,
  IconButton,
  ImageList,
  ImageListItem,
  Divider,
  TextField,
  Snackbar,
  Alert,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  FlashOn as FlashOnIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [buyNowOpen, setBuyNowOpen] = useState(false);

  useEffect(() => {
    
    const allProducts = JSON.parse(localStorage.getItem('marketingProducts') || '[]');
    const userProducts = JSON.parse(localStorage.getItem('products') || '[]');
    
    const foundProduct = [...allProducts, ...userProducts].find(p => p.id === parseInt(id));

    if (foundProduct) {
      
      if (!Array.isArray(foundProduct.images)) {
        foundProduct.images = foundProduct.image ? [foundProduct.image] : [];
      }
      setProduct(foundProduct);
    } else {
      setError('Product not found');
    }
  }, [id]);

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Alert severity="error" sx={{ width: '100%' }}>{error}</Alert>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography>Loading...</Typography>
        </Box>
      </Container>
    );
  }

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      category: product.category,
      condition: product.condition
    };

    addToCart(cartItem);
    setSnackbar({
      open: true,
      message: 'Added to cart successfully!',
      severity: 'success',
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
      <Paper elevation={0} sx={{ p: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mb: 3 }}
        >
          Back to Products
        </Button>

        <Grid container spacing={4}>
          {/* Product Images */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ position: 'relative', width: '100%', paddingTop: '75%' /* 4:3 aspect ratio */ }}>
                <Box
                  component="img"
                  src={product.images[selectedImage] || product.image}
                  alt={product.title}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1610024062303-e355e94c7a8c?auto=format&fit=crop&w=800&q=80';
                  }}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    bgcolor: 'grey.100',
                    borderRadius: 2,
                  }}
                />
                <IconButton
                  onClick={() => setIsFavorite(!isFavorite)}
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    bgcolor: 'white',
                    '&:hover': { bgcolor: 'white' },
                  }}
                >
                  {isFavorite ? (
                    <FavoriteIcon color="error" />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              </Box>
              {product.images && product.images.length > 1 && (
                <Box sx={{ mt: 2, display: 'flex', gap: 1, overflowX: 'auto', pb: 1 }}>
                  {product.images.map((image, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 80,
                        height: 80,
                        flexShrink: 0,
                        cursor: 'pointer',
                        opacity: selectedImage === index ? 1 : 0.6,
                        transition: 'opacity 0.3s',
                        '&:hover': { opacity: 1 },
                        border: selectedImage === index ? `2px solid ${theme.palette.primary.main}` : 'none',
                        borderRadius: 1,
                      }}
                      onClick={() => setSelectedImage(index)}
                    >
                      <Box
                        component="img"
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1610024062303-e355e94c7a8c?auto=format&fit=crop&w=800&q=80';
                        }}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: 1,
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              )}
            </motion.div>
          </Grid>

          {/* Product Info */}
          <Grid item xs={12} md={6}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h4" gutterBottom>
                {product.title}
              </Typography>
              <Typography variant="h5" color="primary" gutterBottom>
                ${product.price.toFixed(2)}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                <Chip label={product.category} color="primary" />
                <Chip label={product.condition} variant="outlined" />
                {product.location && (
                  <Chip label={product.location} variant="outlined" />
                )}
              </Box>
              <Typography 
                variant="body1" 
                paragraph 
                sx={{ 
                  mb: 3,
                  maxHeight: '150px',
                  overflowY: 'auto'
                }}
              >
                {product.description}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {/* Quantity Selector */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Typography variant="subtitle1">Quantity:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton
                    size="small"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    size="small"
                    value={quantity}
                    inputProps={{ readOnly: true, style: { textAlign: 'center', width: '40px' } }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* Action Buttons */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<FlashOnIcon />}
                  onClick={handleBuyNow}
                  fullWidth
                >
                  Buy Now
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  startIcon={<CartIcon />}
                  onClick={handleAddToCart}
                  fullWidth
                >
                  Add to Cart
                </Button>
              </Stack>

              {/* Tags */}
              {product.tags && (
                <Box sx={{ mt: 3 }}>
                  {product.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                      onClick={() => navigate(`/?search=${tag}`)}
                    />
                  ))}
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductDetails; 