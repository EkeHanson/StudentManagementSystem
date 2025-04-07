import React from 'react';
import {
  Box, Grid, Typography, Card, CardContent, Button,
  Avatar, useTheme, useMediaQuery, Chip,
  Container, Stack, List, ListItem, ListItemIcon
} from '@mui/material';
import {
  School as SchoolIcon,
  Class as ClassIcon,
  People as PeopleIcon,
  Assessment as ReportsIcon,
  AccountBalance as FeesIcon,
  CheckCircle as CheckIcon,
  ArrowForward as ArrowIcon,
  Phone as SupportIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer'; 

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const features = [
    { icon: <PeopleIcon fontSize="large" />, title: "Student Management", description: "Track student progress, attendance, and records seamlessly." },
    { icon: <ClassIcon fontSize="large" />, title: "Class Scheduling", description: "Organize classes, timetables, and teacher assignments." },
    { icon: <ReportsIcon fontSize="large" />, title: "Analytics & Reports", description: "Generate detailed insights with customizable reports." },
    { icon: <FeesIcon fontSize="large" />, title: "Financial Tools", description: "Simplify fee collection and financial tracking." }
  ];

  const benefits = [
    "Cloud-based access from any device",
    "Real-time updates and notifications",
    "Secure data encryption and backups",
    "User-friendly interface for all staff"
  ];

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      {/* Navbar Component */}
      <Navbar />

      {/* Hero Section */}
      <Box sx={{ pt: { xs: 12, md: 16 }, pb: 8, background: 'linear-gradient(120deg, #2a5298 0%, #1e3c72 100%)', color: 'white' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 700, mb: 2 }}>
                Transform School Management
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.95, fontWeight: 300 }}>
                All-in-one solution for efficient administration and enhanced learning.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button variant="contained" color="secondary" size="large" endIcon={<ArrowIcon />} sx={{ px: 3, py: 1.2, borderRadius: 1, fontWeight: 600 }} onClick={() => navigate('/demo')}>
                  Request Demo
                </Button>
                <Button variant="outlined" color="inherit" size="large" sx={{ px: 3, py: 1.2, borderRadius: 1, fontWeight: 600 }} onClick={() => navigate('/features')}>
                  Learn More
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box component="img" src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1350&q=80" alt="EduManage Dashboard" sx={{ width: '100%', borderRadius: 2, boxShadow: '0 15px 30px rgba(0,0,0,0.15)' }} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Recognized By */}
      <Box sx={{ py: 4, backgroundColor: 'white' }}>
        <Container maxWidth="lg">
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 2 }}>
            Trusted by Top Educational Institutions
          </Typography>
          <Stack direction="row" spacing={3} justifyContent="center" flexWrap="wrap">
            {["EduTech Certified", "National School Board", "Cloud Secure Partner"].map((item) => (
              <Chip key={item} label={item} variant="outlined" sx={{ fontSize: '0.9rem', borderColor: theme.palette.grey[300] }} />
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" sx={{ fontWeight: 600, mb: 2 }}>
            Comprehensive School Solutions
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 6 }}>
            Streamline operations with tools built for modern education.
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: '100%', borderRadius: 2, border: '1px solid', borderColor: theme.palette.grey[200], transition: '0.3s', '&:hover': { boxShadow: theme.shadows[4], borderColor: theme.palette.primary.light } }}>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', width: 50, height: 50, mb: 2, mx: 'auto' }}>{feature.icon}</Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>{feature.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{feature.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ py: 8, backgroundColor: '#eef2ff' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" sx={{ fontWeight: 600, mb: 3 }}>Why Choose EduManage?</Typography>
              <List>
                {benefits.map((benefit, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}><CheckIcon color="primary" /></ListItemIcon>
                    <Typography variant="body1">{benefit}</Typography>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box component="img" src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1350&q=80" alt="EduManage Collaboration" sx={{ width: '100%', borderRadius: 2, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box sx={{ py: 8, background: 'linear-gradient(120deg, #2a5298 0%, #1e3c72 100%)', color: 'white', textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ fontWeight: 600, mb: 3 }}>Ready to Get Started?</Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: 600, mx: 'auto', opacity: 0.95 }}>
            Elevate your school's efficiency with EduManage today.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button variant="contained" color="secondary" size="large" endIcon={<ArrowIcon />} sx={{ px: 3, py: 1.2, borderRadius: 1, fontWeight: 600 }} onClick={() => navigate('/demo')}>
              Schedule Demo
            </Button>
            <Button variant="outlined" color="inherit" size="large" startIcon={<SupportIcon />} sx={{ px: 3, py: 1.2, borderRadius: 1, fontWeight: 600 }} onClick={() => navigate('/contact')}>
              Contact Us
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Footer Component */}
      <Footer />
    </Box>
  );
};

export default Home;