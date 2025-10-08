import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  IconButton,
  TextField,
  Rating,
  Chip,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  ArrowForward,
  TrendingUp,
  LocalOffer,
  Security,
  Speed,
  People,
  ShoppingCart,
  Search,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import "./GuestPage.css";

const GuestPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [email, setEmail] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    {
      name: "Furniture",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
      color: "#8B5A2B",
      items: ["Sofas", "Tables", "Chairs", "Wardrobes"],
      icon: "🪑",
      itemCount: 2500,
    },
    {
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      color: "#3A4E7A",
      items: ["Laptops", "Phones", "Cameras", "TVs"],
      icon: "📱",
      itemCount: 3200,
    },
    {
      name: "Clothing",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f",
      color: "#A12C33",
      items: ["Men's", "Women's", "Kids", "Accessories"],
      icon: "👕",
      itemCount: 4800,
    },
    {
      name: "Books",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
      color: "#5C4B51",
      items: ["Fiction", "Non-Fiction", "Textbooks", "Children's"],
      icon: "📚",
      itemCount: 1800,
    },
    {
      name: "Toys",
      image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1",
      color: "#E67E22",
      items: ["Action Figures", "Board Games", "Dolls", "Puzzles"],
      icon: "🎮",
      itemCount: 1500,
    }
  ];

  const testimonials = [
    {
      quote: "Found a perfect sofa for my new apartment at half the retail price!",
      author: "Sarah Mitchell",
      role: "Verified Buyer",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      date: "2 weeks ago"
    },
    {
      quote: "Cleared my closet and made $200 in just one week!",
      author: "Michael Chen",
      role: "Power Seller",
      rating: 4,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      date: "1 month ago"
    },
    {
      quote: "The refurbished laptop works like new but cost 60% less.",
      author: "David Wilson",
      role: "Tech Enthusiast",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      date: "3 days ago"
    }
  ];

  const trendingItems = [
    {
      name: "Vintage Leather Sofa",
      price: 599,
      discount: 30,
      image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c",
      rating: 4.5,
      reviews: 28
    },
    {
      name: "MacBook Pro 2022",
      price: 1299,
      discount: 25,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      rating: 4.8,
      reviews: 45
    },
    {
      name: "Designer Handbag",
      price: 399,
      discount: 40,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa",
      rating: 4.6,
      reviews: 32
    }
  ];

  const stats = [
    { label: "Active Users", value: "50K+", icon: <People /> },
    { label: "Items Listed", value: "100K+", icon: <ShoppingCart /> },
    { label: "Successful Trades", value: "25K+", icon: <TrendingUp /> }
  ];

  return (
    <Box className={`guest-page ${scrolled ? "scrolled" : ""}`}>
      {/* Hero Section */}
      <Box 
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="hero"
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center" className="hero-content">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Typography variant="h1" className="hero-title">
                  Give Items a <span className="highlight">Second Life</span>
                </Typography>
                <Typography variant="h5" className="hero-subtitle">
                  Join the sustainable marketplace where quality meets affordability
                </Typography>
                <Box className="hero-search">
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="What are you looking for?"
                    InputProps={{
                      endAdornment: (
                        <IconButton>
                          <Search />
                        </IconButton>
                      ),
                    }}
                  />
                </Box>
                <Box className="hero-buttons">
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
              onClick={() => navigate("/signup")}
                    endIcon={<ArrowForward />}
            >
                    Join Now - It's Free
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
              onClick={() => navigate("/browse")}
            >
              Browse Items
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6} className="hero-stats">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="stat-card"
                >
                  {stat.icon}
                  <Typography variant="h4">{stat.value}</Typography>
                  <Typography variant="subtitle1">{stat.label}</Typography>
                </motion.div>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Trending Items Section */}
      <Container maxWidth="lg" className="section">
        <Box className="section-header">
          <Typography variant="h3">
            Trending Now <TrendingUp />
          </Typography>
          <Typography variant="subtitle1">
            Most popular items this week
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {trendingItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="trending-card">
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={item.name}
                  />
                  <CardContent>
                    <Chip
                      label={`${item.discount}% OFF`}
                      color="secondary"
                      className="discount-chip"
                    />
                    <Typography variant="h6">{item.name}</Typography>
                    <Box className="price-rating">
                      <Typography variant="h5" color="primary">
                        ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                      </Typography>
                      <Box>
                        <Rating value={item.rating} precision={0.5} readOnly />
                        <Typography variant="caption">
                          ({item.reviews} reviews)
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Categories Section */}
      <Box className="categories-section">
        <Container maxWidth="lg">
          <Typography variant="h3" gutterBottom>
            Shop by Category
          </Typography>
          <Grid container spacing={3}>
            {categories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  onHoverStart={() => setActiveCategory(index)}
                  onHoverEnd={() => setActiveCategory(null)}
                >
                  <Card 
                className="category-card"
                onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
              >
                    <CardMedia
                      component="img"
                      height="200"
                      image={category.image}
                    alt={category.name} 
                  />
                    <CardContent>
                      <Typography variant="h5">
                        {category.icon} {category.name}
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        {category.itemCount.toLocaleString()} items
                      </Typography>
                      <Box className="category-items">
                  {category.items.map((item, i) => (
                          <Chip key={i} label={item} />
                  ))}
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" className="section">
        <Box className="section-header">
          <Typography variant="h3">
            Why Choose Us
          </Typography>
          <Typography variant="subtitle1">
            Experience the best of second-hand shopping
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {[
            {
              icon: <Security fontSize="large" />,
              title: "Secure Transactions",
              description: "Protected payments and verified sellers"
            },
            {
              icon: <Speed fontSize="large" />,
              title: "Fast & Easy",
              description: "List items in minutes, find deals instantly"
            },
            {
              icon: <LocalOffer fontSize="large" />,
              title: "Best Deals",
              description: "Save up to 70% on retail prices"
            }
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Paper className="feature-card">
                  {feature.icon}
                  <Typography variant="h5">{feature.title}</Typography>
                  <Typography>{feature.description}</Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Box className="testimonials-section">
        <Container maxWidth="lg">
          <Typography variant="h3" gutterBottom>
            What Our Community Says
          </Typography>
          <Grid container spacing={3}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="testimonial-card">
                    <CardContent>
                      <Box className="testimonial-header">
                        <Box className="testimonial-avatar">
                          <img src={testimonial.image} alt={testimonial.author} />
                        </Box>
                        <Box>
                          <Typography variant="h6">{testimonial.author}</Typography>
                          <Typography variant="caption" color="textSecondary">
                            {testimonial.role}
                          </Typography>
                        </Box>
                      </Box>
                      <Rating value={testimonial.rating} readOnly />
                      <Typography variant="body1" className="testimonial-quote">
                        "{testimonial.quote}"
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {testimonial.date}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" className="section">
        <Paper className="newsletter-section">
          <Typography variant="h4" gutterBottom>
            Get Exclusive Deals
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Subscribe to our newsletter and get 10% off your first purchase
          </Typography>
          <Box className="newsletter-form">
            <TextField
              variant="outlined"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<ArrowForward />}
            >
              Subscribe
            </Button>
          </Box>
        </Paper>
      </Container>

      <Box className="final-cta">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Typography variant="h3" gutterBottom>
              Ready to Start?
            </Typography>
            <Typography variant="h6" gutterBottom>
              Join thousands of happy buyers and sellers
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate("/signup")}
              endIcon={<ArrowForward />}
            >
              Create Free Account
            </Button>
          </motion.div>
        </Container>
      </Box>

      {!scrolled && (
        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Typography variant="body2">Scroll to explore</Typography>
          <KeyboardArrowDown />
        </motion.div>
      )}
    </Box>
  );
};

export default GuestPage;