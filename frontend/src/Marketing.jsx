import React, { useState, useEffect, useCallback } from 'react';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Chip,
  CircularProgress,
  Alert,
  Badge,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  MobileStepper,
} from '@mui/material';
import {
  Search as SearchIcon,
  Menu as MenuIcon,
  ExitToApp as LogoutIcon,
  Home as HomeIcon,
  Category as CategoryIcon,
  LocalOffer as OffersIcon,
  Sell as SellIcon,
  Info as AboutIcon,
  ContactSupport as ContactIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  ShoppingCart as CartIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from './data/products';
import { ShippingForm, PaymentForm } from './components/CheckoutForms';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const ProductImageGallery = ({ images }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [imageError, setImageError] = useState(false);
  const maxSteps = images?.length || 0;

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveStep((prevStep) => (prevStep + 1) % maxSteps);
    setImageError(false);
  };

  const handleBack = (e) => {
    e.stopPropagation();
    setActiveStep((prevStep) => (prevStep - 1 + maxSteps) % maxSteps);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Fallback image URL
  const fallbackImage = 'https://images.unsplash.com/photo-1610024062303-e355e94c7a8c?auto=format&fit=crop&w=800&q=80';

  return (
    <Box sx={{ position: 'relative', height: 300 }}>
      <CardMedia
        component="img"
        height="300"
        image={imageError ? fallbackImage : (images?.[activeStep] || fallbackImage)}
        alt="Product image"
        onError={handleImageError}
        sx={{ 
          objectFit: 'cover',
          width: '100%',
          backgroundColor: 'grey.100'
        }}
      />
      {maxSteps > 1 && (
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
          }}
          nextButton={
            <IconButton
              size="small"
              onClick={handleNext}
              sx={{ color: 'white' }}
            >
              <KeyboardArrowRight />
            </IconButton>
          }
          backButton={
            <IconButton
              size="small"
              onClick={handleBack}
              sx={{ color: 'white' }}
            >
              <KeyboardArrowLeft />
            </IconButton>
          }
        />
      )}
    </Box>
  );
};

const Marketing = ({ onLogout, cartItems, addToCart, removeFromCart }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSearching, setIsSearching] = useState(false);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchError, setSearchError] = useState(null);
  const [userListedItems, setUserListedItems] = useState([]);
  const [snackbar, setSnackbar] = useState(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const categories = [
    'All',
    'Electronics',
    'Furniture',
    'Fashion',
    'Books',
    'Sports',
    'Vehicles',
    'Home & Garden',
  ];

  const featuredItems = [
    {
      id: 1,
      title: 'MacBook Pro M2',
      price: 1299.99,
      category: 'Electronics',
      images: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80'
      ],
      condition: 'Like New',
      description: 'Apple MacBook Pro with M2 chip, 16GB RAM, 512GB SSD. Includes charger and original box.',
      location: 'San Francisco',
      tags: ['apple', 'laptop', 'macbook', 'pro', 'm2'],
    },
    {
      id: 13,
      title: 'Modern Garden Set',
      price: 899.99,
      category: 'Home & Garden',
      images: [
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1602774895766-a0c9b4ad4cd5?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1595409934729-0cb7600c7621?auto=format&fit=crop&w=800&q=80'
      ],
      condition: 'New',
      description: 'Complete 4-piece outdoor furniture set with weather-resistant cushions. Perfect for patio or garden.',
      location: 'Portland',
      tags: ['garden', 'furniture', 'outdoor', 'patio'],
    },
    {
      id: 14,
      title: 'Smart Indoor Garden',
      price: 199.99,
      category: 'Home & Garden',
      images: [
        'https://images.unsplash.com/photo-1595228702420-b3640439d11d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=800&q=80'
      ],
      condition: 'New',
      description: 'Automatic hydroponic garden system with LED grow lights. Grow fresh herbs year-round.',
      location: 'Seattle',
      tags: ['garden', 'smart', 'hydroponic', 'herbs'],
    },
    {
      id: 15,
      title: 'Vintage Book Collection',
      price: 299.99,
      category: 'Books',
      images: [
        'https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80'
      ],
      condition: 'Good',
      description: 'Collection of 20 classic leather-bound books from the 1900s. Perfect for collectors.',
      location: 'Boston',
      tags: ['books', 'vintage', 'classics', 'collection'],
    },
    {
      id: 16,
      title: 'Modern Fiction Bundle',
      price: 89.99,
      category: 'Books',
      images: [
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80'
      ],
      condition: 'Like New',
      description: 'Set of 10 bestselling contemporary fiction books. All in excellent condition.',
      location: 'Chicago',
      tags: ['books', 'fiction', 'modern', 'bestsellers'],
    },
    {
      id: 17,
      title: 'Tesla Model 3',
      price: 39999.99,
      category: 'Vehicles',
      images: [
        'https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1561580125-028ee3bd62eb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80'
      ],
      condition: 'Excellent',
      description: '2022 Tesla Model 3 Long Range. White exterior, black interior. Only 5000 miles.',
      location: 'Los Angeles',
      tags: ['tesla', 'electric', 'car', 'vehicle'],
    },
    {
      id: 19,
      title: 'Mid-Century Dining Set',
      price: 1299.99,
      category: 'Furniture',
      images: [
        'https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=800&q=80'
      ],
      condition: 'Excellent',
      description: 'Authentic mid-century modern dining table with 6 chairs. Solid walnut wood.',
      location: 'Denver',
      tags: ['furniture', 'dining', 'mid-century', 'vintage'],
    },
    {
      id: 20,
      title: 'Modern Sectional Sofa',
      price: 1599.99,
      category: 'Furniture',
      images: [
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=800&q=80'
      ],
      condition: 'New',
      description: 'L-shaped sectional sofa in grey fabric. Includes ottoman and throw pillows.',
      location: 'Austin',
      tags: ['furniture', 'sofa', 'modern', 'living room'],
    },
    {
      id: 2,
      title: 'Vintage Leather Armchair',
      price: 450,
      category: 'Furniture',
      image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=1000&q=80',
      condition: 'Good',
      description: 'Classic brown leather armchair with solid wood frame. Perfect vintage condition.',
      location: 'Chicago',
      tags: ['furniture', 'leather', 'vintage', 'chair'],
    },
    {
      id: 3,
      title: 'Sony A7 III Camera',
      price: 1599.99,
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80',
      condition: 'Excellent',
      description: 'Full-frame mirrorless camera with 28-70mm lens. Includes extra battery and SD card.',
      location: 'New York',
      tags: ['camera', 'sony', 'photography', 'mirrorless'],
    },
    {
      id: 4,
      title: 'Designer Crossbody Bag',
      price: 299.99,
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
      condition: 'Like New',
      description: 'Authentic designer crossbody bag in black leather. Barely used, comes with dust bag.',
      location: 'Miami',
      tags: ['fashion', 'bag', 'leather', 'designer'],
    },
    {
      id: 5,
      title: 'PS5 Gaming Console',
      price: 449.99,
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1000&q=80',
      condition: 'Good',
      description: 'PlayStation 5 Digital Edition with controller and 3 digital games included.',
      location: 'Los Angeles',
      tags: ['gaming', 'playstation', 'ps5', 'console'],
    },
    {
      id: 6,
      title: 'Vintage Rolex Watch',
      price: 8999.99,
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=1000&q=80',
      condition: 'Excellent',
      description: 'Authentic Rolex Datejust from 1985. Recently serviced, includes box and papers.',
      location: 'Boston',
      tags: ['watch', 'luxury', 'rolex', 'vintage'],
    },
    {
      id: 7,
      title: 'Electric Guitar Bundle',
      price: 799.99,
      category: 'Music',
      image: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=1000&q=80',
      condition: 'Good',
      description: 'Fender Stratocaster with amp, case, and accessories. Perfect for beginners.',
      location: 'Nashville',
      tags: ['music', 'guitar', 'fender', 'electric'],
    },
    {
      id: 8,
      title: 'Mountain Bike',
      price: 899.99,
      category: 'Sports',
      image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=1000&q=80',
      condition: 'Excellent',
      description: 'Trek mountain bike with front suspension. Recently tuned up, ready to ride.',
      location: 'Denver',
      tags: ['bike', 'sports', 'trek', 'mountain'],
    },
    {
      id: 9,
      title: 'Antique Writing Desk',
      price: 699.99,
      category: 'Furniture',
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80',
      condition: 'Good',
      description: 'Beautiful oak writing desk from the 1920s. Multiple drawers and original hardware.',
      location: 'Portland',
      tags: ['furniture', 'antique', 'desk', 'vintage'],
    },
    {
      id: 10,
      title: 'Canon DSLR Kit',
      price: 1299.99,
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1000&q=80',
      condition: 'Like New',
      description: 'Canon EOS 90D with 18-135mm lens. Includes bag, tripod, and filters.',
      location: 'Seattle',
      tags: ['camera', 'canon', 'photography', 'dslr'],
    },
    {
      id: 11,
      title: 'Vintage Record Player',
      price: 249.99,
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?auto=format&fit=crop&w=1000&q=80',
      condition: 'Good',
      description: 'Classic turntable with built-in speakers. Perfect for vinyl enthusiasts.',
      location: 'Austin',
      tags: ['music', 'vinyl', 'turntable', 'vintage'],
    },
    {
      id: 12,
      title: 'Designer Sunglasses',
      price: 159.99,
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80',
      condition: 'Like New',
      description: 'Ray-Ban Aviator sunglasses with case. Barely used, no scratches.',
      location: 'Las Vegas',
      tags: ['fashion', 'sunglasses', 'rayban', 'accessories'],
    },
    {
      id: 21,
      title: 'Professional Garden Tools Set',
      price: 129.99,
      category: 'Home & Garden',
      images: [
        'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1589111278907-01b529c56deb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=800&q=80'
      ],
      condition: 'New',
      description: 'Complete set of professional-grade garden tools including pruners, shovel, rake, and more.',
      location: 'Seattle',
      tags: ['garden', 'tools', 'outdoor', 'professional'],
    },
    {
      id: 22,
      title: 'Luxury Fire Pit',
      price: 399.99,
      category: 'Home & Garden',
      image: 'https://images.unsplash.com/photo-1578983427937-26078ee3d9d3?auto=format&fit=crop&w=1000&q=80',
      condition: 'New',
      description: 'Modern steel fire pit with spark screen and waterproof cover. Perfect for outdoor entertaining.',
      location: 'Denver',
      tags: ['garden', 'fire pit', 'outdoor', 'entertaining'],
    },
    {
      id: 23,
      title: 'Mountain Bike',
      price: 899.99,
      category: 'Vehicles',
      image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=1000&q=80',
      condition: 'Excellent',
      description: 'High-end mountain bike with front suspension, disc brakes, and 21 speeds.',
      location: 'Portland',
      tags: ['bike', 'mountain', 'sports', 'outdoor'],
    },
    {
      id: 24,
      title: 'Classic Mustang',
      price: 25999.99,
      category: 'Vehicles',
      image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1000&q=80',
      condition: 'Good',
      description: '1967 Ford Mustang. Restored condition with original parts. A true classic.',
      location: 'Dallas',
      tags: ['car', 'classic', 'mustang', 'vintage'],
    },
  ];

  const navigationItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Categories', icon: <CategoryIcon />, path: '/categories' },
    { text: 'Offers', icon: <OffersIcon />, path: '/offers' },
    { text: 'Sell', icon: <SellIcon />, path: '/sell' },
    { text: 'About Us', icon: <AboutIcon />, path: '/aboutus' },
    { text: 'Contact', icon: <ContactIcon />, path: '/contactus' },
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <List>
        {navigationItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={() => handleNavigation(item.path)}
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.primary.light,
                '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                  color: theme.palette.common.white,
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: theme.palette.primary.main }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
  useEffect(() => {
    const formattedFeaturedItems = featuredItems.map(item => ({
      ...item,
      images: item.images || [item.image], 
      price: parseFloat(item.price) 
    }));
    localStorage.setItem('marketingProducts', JSON.stringify(formattedFeaturedItems));
    
    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    
    const formattedUserProducts = storedProducts.map(product => ({
      id: product.id,
      title: product.title,
      price: parseFloat(product.price),
      category: product.category,
      images: product.images || [product.image], 
      condition: product.condition,
      description: product.description,
      location: product.location,
      tags: product.tags,
      isUserListed: true
    }));

    setUserListedItems(formattedUserProducts);
    setItems([...formattedFeaturedItems, ...formattedUserProducts]);
    setFilteredItems([...formattedFeaturedItems, ...formattedUserProducts]);
  }, []);

  const performSearch = useCallback((query, category) => {
    setIsSearching(true);
    setSearchError(null);

    try {
      const searchTerms = query.toLowerCase().split(' ');
      
      const filtered = items.filter(item => {
        if (category !== 'All' && item.category !== category) {
          return false;
        }

        
        return searchTerms.every(term =>
          item.title.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term) ||
          item.category.toLowerCase().includes(term) ||
          item.condition.toLowerCase().includes(term) ||
          item.location.toLowerCase().includes(term) ||
          item.tags.some(tag => tag.toLowerCase().includes(term))
        );
      });

      setFilteredItems(filtered);
    } catch (error) {
      console.error('Search error:', error);
      setSearchError('An error occurred while searching. Please try again.');
    } finally {
      setIsSearching(false);
    }
  }, [items]);
  useEffect(() => {
    performSearch(debouncedSearchQuery, selectedCategory);
  }, [debouncedSearchQuery, selectedCategory, performSearch]);

  const handleSearchClear = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setFilteredItems(items);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="default" elevation={1}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              color: theme.palette.primary.main,
              fontWeight: 700,
            }}
          >
            NearbyMarket
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {navigationItems.slice(0, 4).map((item) => (
                <Button
                  key={item.text}
                  startIcon={item.icon}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    color: theme.palette.text.primary,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.light,
                      color: theme.palette.common.white,
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          <IconButton 
            color="inherit" 
            onClick={() => navigate('/cart')}
            sx={{ mr: 2 }}
          >
            <Badge 
              badgeContent={cartItems?.length || 0} 
              color="secondary"
              sx={{
                '& .MuiBadge-badge': {
                  right: -3,
                  top: 3,
                },
              }}
            >
              <CartIcon />
            </Badge>
          </IconButton>

          <IconButton color="inherit" onClick={onLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
          },
        }}
      >
        {drawer}
      </Drawer>

      <Container maxWidth="xl" sx={{ mt: 10, mb: 4 }}>
       
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {isSearching ? (
                        <CircularProgress size={20} />
                      ) : (
                        searchQuery && (
                          <IconButton
                            size="small"
                            onClick={handleSearchClear}
                            aria-label="clear search"
                          >
                            <ClearIcon />
                          </IconButton>
                        )
                      )}
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '20px',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1 }}>
                {categories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    onClick={() => setSelectedCategory(category)}
                    color={selectedCategory === category ? 'primary' : 'default'}
                    sx={{
                      borderRadius: '20px',
                      '&:hover': {
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.common.white,
                      },
                    }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>

          {searchError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {searchError}
            </Alert>
          )}

          {!isSearching && filteredItems.length === 0 && (
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="textSecondary">
                No items found
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Try adjusting your search or category filters
              </Typography>
            </Box>
          )}
        </Box>

        {(searchQuery || selectedCategory !== 'All') ? (
          <Grid container spacing={3}>
            {filteredItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s',
                      maxWidth: 345,
                      margin: 'auto',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: theme.shadows[4],
                      },
                    }}
                    onClick={() => handleProductClick(item)}
                  >
                    <Box sx={{ position: 'relative', paddingTop: '56.25%'  }}>
                      <Box
                        component="img"
                        src={item.images?.[0] || item.image}
                        alt={item.title}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1610024062303-e355e94c7a8c?auto=format&fit=crop&w=800&q=80';
                        }}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                    <CardContent 
                      sx={{ 
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        p: 2,
                      }}
                    >
                      <Typography 
                        gutterBottom 
                        variant="h6" 
                        component="h3"
                        sx={{
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          mb: 1,
                          minHeight: '2.8em',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="primary"
                        sx={{ 
                          fontWeight: 600, 
                          mb: 1,
                          fontSize: '1.2rem'
                        }}
                      >
                        ${item.price.toFixed(2)}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, mb: 1, flexWrap: 'wrap' }}>
                        <Chip 
                          label={item.condition} 
                          size="small" 
                          variant="outlined"
                        />
                        <Chip 
                          label={item.category} 
                          size="small" 
                          color="primary"
                        />
                      </Box>
                      {item.description && (
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{
                            mb: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            minHeight: '2.5em',
                          }}
                        >
                          {item.description}
                        </Typography>
                      )}
                      {item.tags && item.tags.length > 0 && (
                        <Box 
                          sx={{ 
                            mt: 'auto',
                            pt: 1,
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            gap: 0.5 
                          }}
                        >
                          {item.tags.slice(0, 3).map((tag, index) => (
                            <Chip
                              key={index}
                              label={tag}
                              size="small"
                              variant="outlined"
                              color="primary"
                              sx={{ fontSize: '0.7rem' }}
                            />
                          ))}
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        ) : (
          <>
            {/* Featured Items Section */}
            <Typography
              variant="h4"
              component="h2"
              sx={{
                mb: 3,
                fontWeight: 600,
                color: theme.palette.primary.main,
                textAlign: 'center'
              }}
            >
              Featured Items
            </Typography>
            <Grid container spacing={3} sx={{ mb: 6 }}>
              {featuredItems.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.2s',
                        maxWidth: 345,
                        margin: 'auto',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: theme.shadows[4],
                        },
                      }}
                      onClick={() => handleProductClick(item)}
                    >
                      <Box sx={{ position: 'relative', paddingTop: '56.25%' /* 16:9 aspect ratio */ }}>
                        <Box
                          component="img"
                          src={item.images?.[0] || item.image}
                          alt={item.title}
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1610024062303-e355e94c7a8c?auto=format&fit=crop&w=800&q=80';
                          }}
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </Box>
                      <CardContent 
                        sx={{ 
                          flexGrow: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          p: 2,
                        }}
                      >
                        <Typography 
                          gutterBottom 
                          variant="h6" 
                          component="h3"
                          sx={{
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            mb: 1,
                            minHeight: '2.8em',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="h6"
                          color="primary"
                          sx={{ 
                            fontWeight: 600, 
                            mb: 1,
                            fontSize: '1.2rem'
                          }}
                        >
                          ${item.price.toFixed(2)}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5, mb: 1, flexWrap: 'wrap' }}>
                          <Chip 
                            label={item.condition} 
                            size="small" 
                            variant="outlined"
                          />
                          <Chip 
                            label={item.category} 
                            size="small" 
                            color="primary"
                          />
                        </Box>
                        {item.description && (
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{
                              mb: 1,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              minHeight: '2.5em',
                            }}
                          >
                            {item.description}
                          </Typography>
                        )}
                        {item.tags && item.tags.length > 0 && (
                          <Box 
                            sx={{ 
                              mt: 'auto',
                              pt: 1,
                              display: 'flex', 
                              flexWrap: 'wrap', 
                              gap: 0.5 
                            }}
                          >
                            {item.tags.slice(0, 3).map((tag, index) => (
                              <Chip
                                key={index}
                                label={tag}
                                size="small"
                                variant="outlined"
                                color="primary"
                                sx={{ fontSize: '0.7rem' }}
                              />
                            ))}
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            {/* User Listed Items Section */}
            {userListedItems.length > 0 && (
              <>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    mb: 3,
                    fontWeight: 600,
                    color: theme.palette.secondary.main,
                    textAlign: 'center'
                  }}
                >
                  Recently Listed Items
                </Typography>
                <Grid container spacing={3}>
                  {userListedItems.map((item) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card
                          sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'transform 0.2s',
                            maxWidth: 345,
                            margin: 'auto',
                            '&:hover': {
                              transform: 'translateY(-5px)',
                              boxShadow: theme.shadows[4],
                            },
                            border: `2px solid ${theme.palette.secondary.main}`,
                          }}
                          onClick={() => handleProductClick(item)}
                        >
                          <Box sx={{ position: 'relative', paddingTop: '56.25%' /* 16:9 aspect ratio */ }}>
                            <Box
                              component="img"
                              src={item.images?.[0] || item.image}
                              alt={item.title}
                              onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1610024062303-e355e94c7a8c?auto=format&fit=crop&w=800&q=80';
                              }}
                              sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />
                          </Box>
                          <CardContent 
                            sx={{ 
                              flexGrow: 1,
                              display: 'flex',
                              flexDirection: 'column',
                              p: 2,
                            }}
                          >
                            <Typography 
                              gutterBottom 
                              variant="h6" 
                              component="h3"
                              sx={{
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                mb: 1,
                                minHeight: '2.8em',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                              }}
                            >
                              {item.title}
                            </Typography>
                            <Typography
                              variant="h6"
                              color="secondary"
                              sx={{ 
                                fontWeight: 600, 
                                mb: 1,
                                fontSize: '1.2rem'
                              }}
                            >
                              ${item.price.toFixed(2)}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 0.5, mb: 1, flexWrap: 'wrap' }}>
                              <Chip 
                                label={item.condition} 
                                size="small" 
                                variant="outlined"
                              />
                              <Chip 
                                label={item.category} 
                                size="small" 
                                color="primary"
                              />
                            </Box>
                            {item.description && (
                              <Typography 
                                variant="body2" 
                                color="text.secondary"
                                sx={{
                                  mb: 1,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  minHeight: '2.5em',
                                }}
                              >
                                {item.description}
                              </Typography>
                            )}
                            {item.tags && item.tags.length > 0 && (
                              <Box 
                                sx={{ 
                                  mt: 'auto',
                                  pt: 1,
                                  display: 'flex', 
                                  flexWrap: 'wrap', 
                                  gap: 0.5 
                                }}
                              >
                                {item.tags.slice(0, 3).map((tag, index) => (
                                  <Chip
                                    key={index}
                                    label={tag}
                                    size="small"
                                    variant="outlined"
                                    color="secondary"
                                    sx={{ fontSize: '0.7rem' }}
                                  />
                                ))}
                              </Box>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </>
        )}
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar?.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} 
          severity={snackbar?.severity || 'success'}
        >
          {snackbar?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Marketing;