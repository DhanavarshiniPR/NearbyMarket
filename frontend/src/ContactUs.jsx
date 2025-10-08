import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import "./ContactUs.css";

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    document.title = "Contact Us - NearbyMarket";
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Form submitted:", formData);
    setSnackbar({
      open: true,
      message: "Message sent successfully! We'll get back to you soon.",
      severity: "success",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const contactInfo = [
    {
      icon: <LocationIcon color="primary" />,
      title: "Visit Us",
      content: "123 Market Street, City, Country",
    },
    {
      icon: <PhoneIcon color="primary" />,
      title: "Call Us",
      content: "+123 456 7890",
    },
    {
      icon: <EmailIcon color="primary" />,
      title: "Email Us",
      content: "support@nearbymarket.com",
    },
  ];

  const faqs = [
    {
      question: "How do I sell a product?",
      answer: "Simply sign up, go to the 'Sell' page, and list your product with detailed information and photos. Our platform makes it easy to reach local buyers.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit/debit cards, PayPal, and bank transfers. All transactions are secure and protected.",
    },
    {
      question: "Can I return a product?",
      answer: "Yes, we have a 7-day return policy for most items. Please check the individual seller's return policy before making a purchase.",
    },
    {
      question: "How is shipping handled?",
      answer: "Shipping is typically arranged between the buyer and seller. For local items, in-person pickup is often preferred.",
    },
  ];

  return (
    <Container maxWidth="lg" className="contact-container">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            onClick={() => navigate("/")}
            sx={{ color: "primary.main" }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1" color="primary">
            Contact Us
          </Typography>
        </Box>

        <Grid container spacing={4}>
     
          <Grid item xs={12}>
            <motion.div variants={fadeIn}>
              <Grid container spacing={2}>
                {contactInfo.map((info, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Card
                      elevation={2}
                      sx={{
                        height: "100%",
                        transition: "transform 0.2s",
                        "&:hover": { transform: "translateY(-4px)" },
                      }}
                    >
                      <CardContent
                        sx={{
                          textAlign: "center",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        {info.icon}
                        <Typography variant="h6">{info.title}</Typography>
                        <Typography color="text.secondary">
                          {info.content}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div variants={fadeIn}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Send Us a Message
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        name="message"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div variants={fadeIn}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Frequently Asked Questions
                </Typography>
                {faqs.map((faq, index) => (
                  <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography fontWeight="medium">{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography color="text.secondary">
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ContactUs;
