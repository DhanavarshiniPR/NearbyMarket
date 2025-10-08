import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  AppBar,
  Toolbar,
  useTheme,
  Chip,
  InputAdornment,
  Divider,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const categories = [
  'Electronics',
  'Furniture',
  'Fashion',
  'Books',
  'Sports',
  'Vehicles',
  'Home & Garden',
  'Other',
];

const conditions = [
  'New',
  'Like New',
  'Excellent',
  'Good',
  'Fair',
  'For Parts',
];

const Sell = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: '',
    location: '',
  });

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = [...images];
    const newPreviews = [...previewImages];

    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        if (newImages.length < 5) {
          newImages.push(file);
          const reader = new FileReader();
          reader.onloadend = () => {
            newPreviews.push(reader.result);
            setPreviewImages([...newPreviews]);
          };
          reader.readAsDataURL(file);
        }
      }
    });

    setImages(newImages);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...previewImages];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setPreviewImages(newPreviews);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? (value === '' ? '' : Number(value)) : value
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 5) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Title is required');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return false;
    }
    if (!formData.price || formData.price <= 0) {
      setError('Valid price is required');
      return false;
    }
    if (!formData.category) {
      setError('Category is required');
      return false;
    }
    if (!formData.condition) {
      setError('Condition is required');
      return false;
    }
    if (!formData.location.trim()) {
      setError('Location is required');
      return false;
    }
    if (images.length === 0) {
      setError('At least one image is required');
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const productData = {
        ...formData,
        images: previewImages, 
        tags,
        status: 'available',
        id: Date.now(), 
        createdAt: new Date().toISOString(),
      };


      const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
      
      existingProducts.push(productData);
      
      localStorage.setItem('products', JSON.stringify(existingProducts));

      setSuccess(true);
      
      setFormData({
        title: '',
        description: '',
        price: '',
        category: '',
        condition: '',
        location: '',
      });
      setImages([]);
      setPreviewImages([]);
      setTags([]);
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to list item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="fixed" color="default" elevation={1}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/')} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sell an Item
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
        <Paper 
          component="form" 
          onSubmit={handleSubmit}
          sx={{ 
            p: 4,
            borderRadius: 2,
            backgroundColor: 'background.paper',
            boxShadow: theme.shadows[3],
          }}
        >
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={4}>
           
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Product Images
              </Typography>
              <Box sx={{ mb: 2 }}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="image-upload"
                  multiple
                  type="file"
                  onChange={handleImageUpload}
                />
                <label htmlFor="image-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<UploadIcon />}
                    sx={{ mb: 2 }}
                    disabled={images.length >= 5}
                  >
                    Upload Images
                  </Button>
                </label>
                <Typography variant="body2" color="text.secondary">
                  You can upload up to 5 images. First image will be the cover.
                </Typography>
              </Box>
              <Grid container spacing={2}>
                {previewImages.map((preview, index) => (
                  <Grid item xs={6} sm={4} md={3} key={index}>
                    <Box
                      sx={{
                        position: 'relative',
                        paddingTop: '100%',
                        borderRadius: 1,
                        overflow: 'hidden',
                        boxShadow: theme.shadows[2],
                      }}
                    >
                      <Box
                        component="img"
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveImage(index)}
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          bgcolor: 'background.paper',
                          '&:hover': { bgcolor: 'background.paper' },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Basic Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    error={error && !formData.title}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    multiline
                    rows={4}
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    error={error && !formData.description}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    error={error && (!formData.price || formData.price <= 0)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Additional Details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth required error={error && !formData.category}>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      label="Category"
                    >
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required error={error && !formData.condition}>
                    <InputLabel>Condition</InputLabel>
                    <Select
                      name="condition"
                      value={formData.condition}
                      onChange={handleInputChange}
                      label="Condition"
                    >
                      {conditions.map((condition) => (
                        <MenuItem key={condition} value={condition}>
                          {condition}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    error={error && !formData.location}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Tags */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Tags
              </Typography>
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Add tags"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleAddTag} disabled={tags.length >= 5}>
                          <AddIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Add up to 5 tags to help buyers find your item
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    onDelete={() => handleRemoveTag(tag)}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? 'Listing Item...' : 'List Item'}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Item listed successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Sell;
