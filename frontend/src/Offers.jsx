import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Box,
  AppBar,
  Toolbar,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  TextField,
  InputAdornment,
  Chip,
  Rating,
  Skeleton,
  Alert,
  Snackbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCart as CartIcon,
  Person as PersonIcon,
  Favorite as FavoriteIcon,
  Home as HomeIcon,
  Category as CategoryIcon,
  LocalOffer as OfferIcon,
  Info as InfoIcon,
  ContactSupport as ContactIcon,
  ArrowForward as ArrowForwardIcon,
  Timer as TimerIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import PaymentModal from "./PaymentModal"; 
import "./Offers.css";

const Offers = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [timeLeft, setTimeLeft] = useState(3600); 
  const [isNavOpen, setNavOpen] = useState(false); 
  const [isModalOpen, setModalOpen] = useState(false); 
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    document.title = "Today's Offers - SecondLife Market";
    // Simulate loading delay
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours > 0 ? `${hours}:` : ""}${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleBuyNow = (product) => {
    setSelectedProduct(product); 
    setModalOpen(true); 
  };

  const handleCloseModal = () => {
    setModalOpen(false); 
    setSelectedProduct(null); 
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    setSnackbar({
      open: true,
      message: "Added to cart successfully!",
      severity: "success"
    });
  };

  const handleToggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
      setSnackbar({
        open: true,
        message: "Removed from favorites",
        severity: "info"
      });
    } else {
      setFavorites([...favorites, productId]);
      setSnackbar({
        open: true,
        message: "Added to favorites!",
        severity: "success"
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const featuredProducts = [
    {
      id: 1,
      name: "Smart Watch Pro",
      category: "Electronics",
      price: 199,
      discount: 40,
      image: "https://images.unsplash.com/photo-1558379850-823f103f866a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      rating: 4.5,
      reviews: 128,
      description: "Advanced smartwatch with health monitoring and GPS",
      stock: 15
    },
    {
      id: 2,
      name: "Wireless Earbuds",
      category: "Electronics",
      price: 99,
      discount: 50,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
      rating: 4.2,
      reviews: 86,
      description: "Noise cancelling with 30hr battery life",
      stock: 8
    },
    {
      id: 3,
      name: "Running Shoes",
      category: "Sports",
      price: 129,
      discount: 30,
      image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80",
      rating: 4.7,
      reviews: 215,
      description: "Lightweight with superior cushioning technology",
      stock: 20
    },
    {
      id: 4,
      name: "Designer Handbag",
      category: "Fashion",
      price: 249,
      discount: 45,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1636&q=80",
      rating: 4.8,
      reviews: 92,
      description: "Premium leather with multiple compartments",
      stock: 5
    }
  ];

  const filteredProducts = featuredProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [
    {
      title: "Electronics",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      icon: <CategoryIcon />,
      path: "/electronics"
    },
    {
      title: "Fashion",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f",
      icon: <CategoryIcon />,
      path: "/fashion"
    },
    {
      title: "Home & Garden",
      image: "https://hips.hearstapps.com/hmg-prod/images/table-setting-at-backyard-tent-royalty-free-image-1708454432.jpg?crop=0.800xw:0.601xh;0,0.207xh&resize=1024:*",
      icon: <CategoryIcon />,
      path: "/home-garden"
    }
  ];

  return (
    <Box className="offers-page">
      
      <AppBar position="fixed" color="default" elevation={1}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setNavOpen(true)}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 0, cursor: 'pointer', color: 'primary.main' }}
            onClick={() => navigate("/")}
          >
            SecondLife Market
          </Typography>

          <Box sx={{ flexGrow: 1, mx: 2, display: { xs: 'none', sm: 'block' } }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton color="inherit" onClick={() => navigate("/cart")}>
              <Badge badgeContent={cartItems.length} color="primary">
                <CartIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={() => navigate("/favorites")}>
              <Badge badgeContent={favorites.length} color="secondary">
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/login")}
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
                Sign In
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={isNavOpen}
        onClose={() => setNavOpen(false)}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem button onClick={() => { navigate("/"); setNavOpen(false); }}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={() => { navigate("/offers"); setNavOpen(false); }}>
              <ListItemIcon><OfferIcon /></ListItemIcon>
              <ListItemText primary="Today's Deals" />
            </ListItem>
            {categories.map((category) => (
              <ListItem
                button
                key={category.title}
                onClick={() => { navigate(category.path); setNavOpen(false); }}
              >
                <ListItemIcon>{category.icon}</ListItemIcon>
                <ListItemText primary={category.title} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem button onClick={() => { navigate("/about"); setNavOpen(false); }}>
              <ListItemIcon><InfoIcon /></ListItemIcon>
              <ListItemText primary="About Us" />
            </ListItem>
            <ListItem button onClick={() => { navigate("/contact"); setNavOpen(false); }}>
              <ListItemIcon><ContactIcon /></ListItemIcon>
              <ListItemText primary="Contact" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Container maxWidth="lg" sx={{ mt: 8, py: 4 }}>
      
        <Card
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{
            mb: 4,
            background: 'linear-gradient(135deg, #6a1b9a 0%, #4a148c 100%)',
            color: 'white',
          }}
        >
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Chip label="FLASH SALE" color="secondary" sx={{ mb: 1 }} />
              <Typography variant="h4" gutterBottom>Limited Time Offers</Typography>
              <Typography variant="subtitle1">Huge discounts on premium products - Don't miss out!</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.1)', p: 2, borderRadius: 2 }}>
              <TimerIcon />
              <Typography variant="h6">Ends in: {formatTime(timeLeft)}</Typography>
            </Box>
          </CardContent>
        </Card>

        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Shop by Category
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={category.title}>
              <Card
                component={motion.div}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(category.path)}
                sx={{ cursor: 'pointer', height: '100%' }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={category.image}
                  alt={category.title}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {category.title}
                  </Typography>
                  <Button
                    endIcon={<ArrowForwardIcon />}
                    color="primary"
                  >
                    Shop Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Today's Best Deals
          </Typography>
          <Grid container spacing={3}>
            {loading
              ? Array.from(new Array(4)).map((_, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card>
                      <Skeleton variant="rectangular" height={200} />
                      <CardContent>
                        <Skeleton variant="text" width="80%" />
                        <Skeleton variant="text" width="60%" />
                        <Skeleton variant="text" width="40%" />
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              : filteredProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={3} key={product.id}>
                    <Card
                      component={motion.div}
                      whileHover={{ y: -8 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="200"
                          image={product.image}
                          alt={product.name}
                        />
                        <Chip
                          label={`-${product.discount}%`}
                          color="secondary"
                          sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                          }}
                        />
                        <IconButton
                          sx={{
                            position: 'absolute',
                            top: 16,
                            left: 16,
                            bgcolor: 'background.paper',
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleFavorite(product.id);
                          }}
                        >
                          <FavoriteIcon
                            color={favorites.includes(product.id) ? "secondary" : "action"}
                          />
                        </IconButton>
                      </Box>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {product.category}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Rating value={product.rating} precision={0.5} readOnly size="small" />
                          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            ({product.reviews})
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
                          <Typography variant="h6" color="primary">
                            ${(product.price * (1 - product.discount/100)).toFixed(2)}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ textDecoration: 'line-through' }}
                          >
                            ${product.price}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color={product.stock < 10 ? "error" : "success"}>
                          {product.stock < 10 ? `Only ${product.stock} left!` : "In Stock"}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                        <Button
                          variant="outlined"
                          startIcon={<AddIcon />}
                          onClick={() => handleAddToCart(product)}
                        >
                          Add to Cart
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => handleBuyNow(product)}
                    >
                      Buy Now
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
          </Grid>
        </Box>

        <Card
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{ bgcolor: 'primary.main', color: 'white', mt: 6 }}
        >
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h5" gutterBottom>
              Get Exclusive Deals
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 3 }}>
              Subscribe to our newsletter and get 10% off your first purchase
            </Typography>
            <Box
              component="form"
              sx={{
                display: 'flex',
                gap: 2,
                maxWidth: 500,
                mx: 'auto',
                flexDirection: { xs: 'column', sm: 'row' }
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Your email address"
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              />
              <Button
                variant="contained"
                color="secondary"
                sx={{ px: 4 }}
              >
                Subscribe
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>

      {isModalOpen && (
        <PaymentModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Offers;