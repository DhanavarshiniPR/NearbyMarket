import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Divider,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google,
  Email,
  Lock,
  Person,
  Phone,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';
import { auth, googleProvider } from './firebase';
import { signInWithPopup } from 'firebase/auth';

const Signup = ({ onLogin }) => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const steps = ['Personal Info', 'Contact Details', 'Create Password'];

  const validateStep = (step) => {
    let isValid = true;
    const newErrors = { ...formErrors };

    switch (step) {
      case 0:
        // Validate personal info
        if (!formData.firstName.trim()) {
          newErrors.firstName = 'First name is required';
          isValid = false;
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = 'Last name is required';
          isValid = false;
        }
        break;

      case 1:
        // Validate contact details
        if (!formData.email) {
          newErrors.email = 'Email is required';
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
          isValid = false;
        }
        if (!formData.phone) {
          newErrors.phone = 'Phone number is required';
          isValid = false;
        } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
          newErrors.phone = 'Please enter a valid phone number';
          isValid = false;
        }
        break;

      case 2:
        // Validate password
        if (!formData.password) {
          newErrors.password = 'Password is required';
          isValid = false;
        } else if (formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters long';
          isValid = false;
        }
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = 'Please confirm your password';
          isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
          isValid = false;
        }
        break;

      default:
        break;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'agreeToTerms' ? checked : value
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(activeStep)) return;
    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      
      if (onLogin) {
        onLogin();
      }
      
      toast.success("Account created successfully!");
      
      navigate('/', { replace: true });
    } catch (err) {
      setError('An error occurred during signup. Please try again.');
      toast.error('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = async () => {
    try {
      setLoading(true);
      setError('');
      
      const result = await signInWithPopup(auth, googleProvider);
      
      const user = result.user;
      const userData = {
        firstName: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
        email: user.email,
        phone: user.phoneNumber || '',
        photoURL: user.photoURL,
        uid: user.uid,
        provider: 'google'
      };

      console.log('Google login successful:', userData);

      if (onLogin) {
        onLogin();
      }

      toast.success('Successfully signed in with Google');

      navigate('/', { replace: true });
    } catch (error) {
      console.error('Google login error:', error);
      let errorMessage = 'An error occurred during Google sign in.';
      
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Login cancelled.';
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        errorMessage = 'An account already exists with the same email address.';
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              fullWidth
              variant="outlined"
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={!!formErrors.firstName}
              helperText={formErrors.firstName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={!!formErrors.lastName}
              helperText={formErrors.lastName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </>
        );

      case 1:
        return (
          <>
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!formErrors.phone}
              helperText={formErrors.phone}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </>
        );

      case 2:
        return (
          <>
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Confirm Password"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  name="agreeToTerms"
                  color="primary"
                />
              }
              label={
                <Typography variant="body2">
                  I agree to the{' '}
                  <Link to="/terms" className="terms-link">
                    Terms and Conditions
                  </Link>
                </Typography>
              }
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="signup-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} className="signup-paper">
          <Box className="signup-box">
            <Typography component="h1" variant="h4" className="signup-title">
              Create Account
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Join our community today
            </Typography>

            {error && (
              <Alert severity="error" className="signup-alert">
                {error}
              </Alert>
            )}

            <Stepper activeStep={activeStep} alternativeLabel className="signup-stepper">
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <form onSubmit={handleSubmit} className="signup-form">
              {getStepContent(activeStep)}

              <Box className="button-group">
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className="back-button"
                >
                  Back
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    className="submit-button"
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className="next-button"
                  >
                    Next
                  </Button>
                )}
              </Box>
            </form>

            <Divider className="divider">
              <Typography variant="body2" color="textSecondary">
                OR
              </Typography>
            </Divider>

            <div className="social-buttons">
              <Button
                fullWidth
                variant="outlined"
                className="google-button"
                startIcon={<Google />}
                onClick={handleSocialSignup}
                disabled={loading}
              >
                Sign up with Google
              </Button>
            </div>

            <Box className="login-prompt">
              <Typography variant="body2" color="textSecondary">
                Already have an account?{' '}
                <Link to="/login" className="login-link">
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Signup;
