import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  LocationOn,
  Email,
  Phone,
  ExpandMore,
  Star,
  People,
  TrendingUp,
  Public,
} from '@mui/icons-material';
import './AboutUs.css';

const AboutUs = ({ onLogout }) => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200',
      social: {
        linkedin: '#',
        twitter: '#',
      },
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?auto=format&fit=crop&w=200&h=200',
      social: {
        linkedin: '#',
        twitter: '#',
      },
    },
    {
      name: 'Emma Williams',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200',
      social: {
        linkedin: '#',
        twitter: '#',
      },
    },
    {
      name: 'David Kim',
      role: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200',
      social: {
        linkedin: '#',
        twitter: '#',
      },
    },
  ];

  const values = [
    {
      title: 'Sustainability',
      description: 'Promoting eco-friendly practices through second-hand commerce',
      icon: '🌱',
    },
    {
      title: 'Community',
      description: 'Building strong local connections and trust',
      icon: '🤝',
    },
    {
      title: 'Innovation',
      description: 'Leveraging technology for better user experiences',
      icon: '💡',
    },
    {
      title: 'Integrity',
      description: 'Maintaining transparency and honesty in all transactions',
      icon: '🎯',
    },
  ];

  const achievements = [
    {
      icon: <People />,
      number: "50,000+",
      label: "Active Users"
    },
    {
      icon: <Star />,
      number: "4.8/5",
      label: "User Rating"
    },
    {
      icon: <TrendingUp />,
      number: "100,000+",
      label: "Successful Trades"
    },
    {
      icon: <Public />,
      number: "25+",
      label: "Cities Covered"
    }
  ];

  const timeline = [
    {
      year: "2021",
      title: "The Beginning",
      description: "NearbyMarket was founded with a vision to revolutionize local commerce."
    },
    {
      year: "2022",
      title: "Rapid Growth",
      description: "Expanded to 10 major cities and reached 10,000 active users."
    },
    {
      year: "2023",
      title: "Tech Innovation",
      description: "Launched mobile app and AI-powered recommendation system."
    },
    {
      year: "2024",
      title: "Going National",
      description: "Expanded operations nationwide with enhanced features and community programs."
    }
  ];

  const testimonials = [
    {
      name: "John Smith",
      role: "Regular User",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200",
      text: "NearbyMarket has transformed how I buy and sell in my community. The platform is intuitive and the community is fantastic!"
    },
    {
      name: "Lisa Chen",
      role: "Small Business Owner",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200",
      text: "As a small business owner, NearbyMarket has helped me reach more customers and grow my business sustainably."
    },
    {
      name: "Mike Johnson",
      role: "Environmental Activist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200",
      text: "The platform's focus on sustainability and reducing waste aligns perfectly with environmental goals."
    }
  ];

  const faqs = [
    {
      question: "How does NearbyMarket ensure transaction safety?",
      answer: "We implement various security measures including user verification, secure payment processing, and a rating system. Our team monitors transactions and provides support when needed."
    },
    {
      question: "What makes NearbyMarket different from other marketplaces?",
      answer: "Our focus on local communities, sustainability, and user experience sets us apart. We prioritize connecting neighbors and building trust within communities."
    },
    {
      question: "How can I start selling on NearbyMarket?",
      answer: "Simply create an account, verify your profile, and list your items. Our platform provides tools and guides to help you get started quickly."
    },
    {
      question: "What are the fees for using NearbyMarket?",
      answer: "Basic listings are free. We charge a small commission only when a sale is completed successfully. Premium features are available for power sellers."
    }
  ];

  return (
    <div className="about-container">
      <Box className="hero-section">
        <Container maxWidth="lg">
          <Typography variant="h1" className="hero-title" gutterBottom>
            About NearbyMarket
          </Typography>
          <Typography variant="h5" className="hero-subtitle">
            Transforming Local Commerce, One Transaction at a Time
          </Typography>
        </Container>
      </Box>

      <Box className="achievements-section">
        <Container maxWidth="lg" className="section">
          <Grid container spacing={4}>
            {achievements.map((achievement, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Paper elevation={0} className="achievement-card">
                  <Box className="achievement-icon">
                    {achievement.icon}
                  </Box>
                  <Typography variant="h3" className="achievement-number">
                    {achievement.number}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {achievement.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

   
      <Container maxWidth="lg" className="section">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom className="section-title">
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph className="section-text">
              At NearbyMarket, we're revolutionizing local commerce by creating a sustainable, 
              community-driven marketplace. Our platform connects neighbors, reduces waste, 
              and makes quality second-hand items accessible to everyone.
            </Typography>
            <Typography variant="body1" className="section-text">
              We believe in the power of community and sustainable consumption. By facilitating 
              local trades and sales, we're building a more connected and environmentally 
              conscious world.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="mission-image-container">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80"
                alt="Our Mission"
                className="mission-image"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Box className="timeline-section">
        <Container maxWidth="lg" className="section">
          <Typography variant="h3" gutterBottom align="center" className="section-title">
            Our Journey
          </Typography>
          <Timeline position="alternate">
            {timeline.map((item, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent color="text.secondary">
                  {item.year}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  {index < timeline.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={3} className="timeline-paper">
                    <Typography variant="h6" component="h6">
                      {item.title}
                    </Typography>
                    <Typography>{item.description}</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Container>
      </Box>

      <Box className="values-section">
        <Container maxWidth="lg" className="section">
          <Typography variant="h3" gutterBottom align="center" className="section-title">
            Our Values
          </Typography>
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper elevation={0} className="value-card">
                  <Typography variant="h2" className="value-icon">
                    {value.icon}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {value.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

   
      <Container maxWidth="lg" className="section">
        <Typography variant="h3" gutterBottom align="center" className="section-title">
          What Our Users Say
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card className="testimonial-card">
                <CardContent>
                  <Avatar
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="testimonial-avatar"
                  />
                  <Typography variant="body1" paragraph className="testimonial-text">
                    "{testimonial.text}"
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {testimonial.name}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {testimonial.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="lg" className="section">
        <Typography variant="h3" gutterBottom align="center" className="section-title">
          Meet Our Team
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card className="team-card">
                <CardContent>
                  <Avatar
                    src={member.image}
                    alt={member.name}
                    className="team-avatar"
                  />
                  <Typography variant="h6" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    {member.role}
                  </Typography>
                  <Box className="social-links">
                    <IconButton size="small" href={member.social.linkedin}>
                      <LinkedIn />
                    </IconButton>
                    <IconButton size="small" href={member.social.twitter}>
                      <Twitter />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box className="faq-section">
        <Container maxWidth="lg" className="section">
          <Typography variant="h3" gutterBottom align="center" className="section-title">
            Frequently Asked Questions
          </Typography>
          <Box className="faq-container">
            {faqs.map((faq, index) => (
              <Accordion key={index} className="faq-accordion">
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                >
                  <Typography variant="h6">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>

      {/*Contact */}
      <Box className="contact-section">
        <Container maxWidth="lg" className="section">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom className="section-title">
                Get in Touch
              </Typography>
              <Typography variant="body1" paragraph>
                Have questions or suggestions? We'd love to hear from you.
              </Typography>
              <Box className="contact-info">
                <Box className="contact-item">
                  <LocationOn color="primary" />
                  <Typography variant="body1">
                    123 Innovation Street, Tech City, TC 12345
                  </Typography>
                </Box>
                <Box className="contact-item">
                  <Email color="primary" />
                  <Typography variant="body1">
                    contact@nearbymarket.com
                  </Typography>
                </Box>
                <Box className="contact-item">
                  <Phone color="primary" />
                  <Typography variant="body1">
                    +1 (555) 123-4567
                  </Typography>
                </Box>
              </Box>
              <Box className="social-links">
                <IconButton color="primary">
                  <Facebook />
                </IconButton>
                <IconButton color="primary">
                  <Twitter />
                </IconButton>
                <IconButton color="primary">
                  <LinkedIn />
                </IconButton>
                <IconButton color="primary">
                  <Instagram />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className="map-container">
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80"
                  alt="Location Map"
                  className="map-image"
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default AboutUs;
