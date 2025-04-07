import React from 'react';
import {
  Box, Grid, Typography, Button, Container, Stack, 
  Card, CardContent, Avatar, Divider, useTheme,
  useMediaQuery, Paper, styled
} from '@mui/material';
import {
  School as SchoolIcon,
  Class as ClassIcon,
  People as PeopleIcon,
  Assessment as ReportsIcon,
  AccountBalance as FeesIcon,
  CheckCircle as CheckIcon,
  ArrowForward as ArrowIcon,
  Phone as SupportIcon,
  Dashboard as DashboardIcon,
  Security as SecurityIcon,
  Sync as SyncIcon,
  Devices as DevicesIcon,
  ChevronLeft,
  ChevronRight
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Custom styled components
const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8]
  }
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: 'white',
  fontWeight: 600,
  padding: '12px 24px'
}));

const TestimonialCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(0, 2),
  height: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.background.paper
}));

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const features = [
    { 
      icon: <PeopleIcon fontSize="large" />, 
      title: "Student Management", 
      description: "Comprehensive tools to track student progress, attendance, and records with ease." 
    },
    { 
      icon: <ClassIcon fontSize="large" />, 
      title: "Class Scheduling", 
      description: "Intuitive interface for organizing classes, timetables, and teacher assignments." 
    },
    { 
      icon: <ReportsIcon fontSize="large" />, 
      title: "Advanced Analytics", 
      description: "Powerful reporting tools with customizable dashboards and insights." 
    },
    { 
      icon: <FeesIcon fontSize="large" />, 
      title: "Financial Management", 
      description: "Automated fee collection and financial tracking with secure transactions." 
    }
  ];

  const benefits = [
    { icon: <DevicesIcon color="primary" />, text: "Cloud-based access from any device" },
    { icon: <SyncIcon color="primary" />, text: "Real-time synchronization across all platforms" },
    { icon: <SecurityIcon color="primary" />, text: "Enterprise-grade security with encryption" },
    { icon: <DashboardIcon color="primary" />, text: "Intuitive interface with role-based access" }
  ];

  const stats = [
    { value: "500+", label: "Schools Trust Us" },
    { value: "95%", label: "Customer Satisfaction" },
    { value: "24/7", label: "Support Available" },
    { value: "99.9%", label: "Uptime Guarantee" }
  ];

  const testimonials = [
    {
      quote: "This platform transformed how we manage our school. The analytics alone have saved us hundreds of hours.",
      name: "Sarah Johnson",
      title: "Principal, Greenfield Academy",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "The most intuitive school management system I've used in my 20 years as an administrator.",
      name: "Michael Chen",
      title: "Director, Lakeside School District",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "Our teachers love the simplicity and our IT team loves the security features. A win-win!",
      name: "Emma Rodriguez",
      title: "Superintendent, City Public Schools",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg"
    },
    {
      quote: "Implementation was seamless and the training resources were exceptional.",
      name: "David Wilson",
      title: "IT Director, Charter Schools Network",
      avatar: "https://randomuser.me/api/portraits/men/65.jpg"
    }
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <ChevronRight color="primary" />,
    prevArrow: <ChevronLeft color="primary" />,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      {/* Modern Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <Box sx={{ 
        position: 'relative',
        height: isMobile ? '80vh' : '90vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        color: 'white'
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)'
          }
        }} />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h1" sx={{ 
                fontSize: isMobile ? '2.5rem' : '3.5rem',
                fontWeight: 800,
                mb: 3,
                lineHeight: 1.2
              }}>
                Revolutionizing Education Management
              </Typography>
              <Typography variant="h5" sx={{ 
                mb: 4,
                fontWeight: 300,
                opacity: 0.9
              }}>
                The next-generation platform that transforms how schools operate, communicate, and grow.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                <GradientButton 
                  variant="contained" 
                  size="large" 
                  endIcon={<ArrowIcon />}
                  onClick={() => navigate('/demo')}
                >
                  Get Started
                </GradientButton>
                <Button 
                  variant="outlined" 
                  color="inherit" 
                  size="large"
                  sx={{ fontWeight: 600 }}
                  onClick={() => navigate('/features')}
                >
                  Explore Features
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                component="img" 
                src="https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="School Management Dashboard" 
                sx={{ 
                  width: '100%', 
                  borderRadius: 4,
                  boxShadow: theme.shadows[10],
                  transform: 'perspective(1000px) rotateY(-10deg)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }} 
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Trusted By Section */}
      <Box sx={{ py: 6, backgroundColor: theme.palette.background.paper }}>
        <Container maxWidth="lg">
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            TRUSTED BY LEADING EDUCATIONAL INSTITUTIONS WORLDWIDE
          </Typography>
          <Grid container justifyContent="center" spacing={4}>
            {[
              "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",

              "/src/assets/toyota.png",

              "/src/assets/tesla.png",

              "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg"
            ].map((logo, index) => (
              <Grid item key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                <Box 
                  component="img" 
                  src={logo} 
                  alt="Partner logo" 
                  sx={{ 
                    height: 30, 
                    filter: 'grayscale(100%)',
                    opacity: 0.6,
                    transition: 'all 0.3s',
                    '&:hover': {
                      filter: 'grayscale(0%)',
                      opacity: 1
                    }
                  }} 
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section - Inline Cards */}
      <Box sx={{ py: 10, backgroundColor: theme.palette.background.default }}>
        <Container maxWidth="lg">
          <Box textAlign="center" sx={{ mb: 8 }}>
            <Typography variant="overline" color="primary" sx={{ fontWeight: 600 }}>
              CORE FEATURES
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              Everything You Need in One Platform
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              Designed by educators for educators, our comprehensive suite of tools addresses every aspect of school management.
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <FeatureCard>
                  <CardContent sx={{ 
                    textAlign: 'center', 
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%'
                  }}>
                    <Avatar sx={{ 
                      bgcolor: 'primary.light', 
                      color: 'primary.main', 
                      width: 60, 
                      height: 60, 
                      mb: 3 
                    }}>
                      {feature.icon}
                    </Avatar>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section with Side Image */}
      <Box sx={{ py: 10, backgroundColor: theme.palette.background.paper }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="overline" color="primary" sx={{ fontWeight: 600 }}>
                  WHY CHOOSE US
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
                  Built for the Future of Education
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  Our platform evolves with the changing needs of educational institutions, ensuring you always have access to cutting-edge tools.
                </Typography>
              </Box>
              
              <Grid container spacing={2}>
                {benefits.map((benefit, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <Avatar sx={{ 
                        bgcolor: 'primary.light', 
                        color: 'primary.main', 
                        width: 40, 
                        height: 40 
                      }}>
                        {benefit.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {benefit.text}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Box 
                component="img" 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Collaborative learning" 
                sx={{ 
                  width: '100%', 
                  borderRadius: 4,
                  boxShadow: theme.shadows[4]
                }} 
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 8, background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`, color: 'white' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={6} sm={3} key={index} sx={{ textAlign: 'center' }}>
                <Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  {stat.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Carousel Section */}
      <Box sx={{ py: 10, backgroundColor: theme.palette.background.default }}>
        <Container maxWidth="lg">
          <Box textAlign="center" sx={{ mb: 8 }}>
            <Typography variant="overline" color="primary" sx={{ fontWeight: 600 }}>
              TESTIMONIALS
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              What Our Clients Say
            </Typography>
          </Box>
          
          <Box sx={{ px: isMobile ? 0 : 4 }}>
            <Slider {...sliderSettings}>
              {testimonials.map((testimonial, index) => (
                <Box key={index} sx={{ px: 1 }}>
                  <TestimonialCard elevation={0}>
                    <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic' }}>
                      "{testimonial.quote}"
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar src={testimonial.avatar} alt={testimonial.name} />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.title}
                        </Typography>
                      </Box>
                    </Stack>
                  </TestimonialCard>
                </Box>
              ))}
            </Slider>
          </Box>
        </Container>
      </Box>

      {/* Final CTA Section */}
      <Box sx={{ 
        py: 12,
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
            Ready to Transform Your School?
          </Typography>
          <Typography variant="body1" sx={{ mb: 5, maxWidth: 600, mx: 'auto', opacity: 0.9 }}>
            Join thousands of educational institutions that trust our platform to streamline their operations and enhance learning outcomes.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
            <GradientButton 
              variant="contained" 
              size="large" 
              endIcon={<ArrowIcon />}
              onClick={() => navigate('/demo')}
            >
              Request a Demo
            </GradientButton>
            <Button 
              variant="outlined" 
              color="inherit" 
              size="large"
              sx={{ fontWeight: 600 }}
              startIcon={<SupportIcon />}
              onClick={() => navigate('/contact')}
            >
              Contact Sales
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Modern Footer */}
      <Footer />
    </Box>
  );
};

export default Home;