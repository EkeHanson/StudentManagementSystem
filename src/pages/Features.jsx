import React from 'react';
import { Box, Container, Typography, Grid, Button, useTheme } from '@mui/material';
import { People as PeopleIcon, Class as ClassIcon, Assessment as ReportsIcon, AccountBalance as FeesIcon, ArrowForward } from '@mui/icons-material';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import { Parallax } from 'react-parallax';

const Features = () => {
  const theme = useTheme();
  
  const features = [
    { 
      icon: <PeopleIcon fontSize="large" />, 
      title: "Student Management", 
      description: "Track student progress, attendance, and records seamlessly.",
      image: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80"
    },
    { 
      icon: <ClassIcon fontSize="large" />, 
      title: "Class Scheduling", 
      description: "Organize classes, timetables, and teacher assignments.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    { 
      icon: <ReportsIcon fontSize="large" />, 
      title: "Analytics & Reports", 
      description: "Generate detailed insights with customizable reports.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    { 
      icon: <FeesIcon fontSize="large" />, 
      title: "Financial Tools", 
      description: "Simplify fee collection and financial tracking.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    }
  ];

  return (
    <Box sx={{ 
      backgroundColor: theme.palette.background.default,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Modern Navbar with Glass Morphism */}
      <Navbar />
      
      {/* Hero Section with Parallax Effect */}
      <Parallax 
        bgImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
        strength={500}
        style={{ marginBottom: '4rem' }}
      >
        <Box sx={{ 
          height: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(2px)'
        }}>
          <Container maxWidth="lg">
            <Typography 
              variant="h1" 
              align="center" 
              sx={{ 
                fontWeight: 800, 
                color: 'white',
                fontSize: { xs: '2.5rem', md: '4rem' },
                mb: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              Transform Your Institution
            </Typography>
            <Typography 
              variant="h5" 
              align="center" 
              sx={{ 
                fontWeight: 400, 
                color: 'rgba(255,255,255,0.9)',
                mb: 4,
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
              }}
            >
              Powerful tools designed for modern educational institutions
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button 
                variant="contained" 
                size="large" 
                endIcon={<ArrowForward />}
                sx={{
                  borderRadius: '50px',
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  boxShadow: theme.shadows[4]
                }}
              >
                Get Started
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                sx={{
                  borderRadius: '50px',
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  borderWidth: '2px',
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderWidth: '2px'
                  }
                }}
              >
                Learn More
              </Button>
            </Box>
          </Container>
        </Box>
      </Parallax>

      {/* Features Section */}
      <Container maxWidth="xl" sx={{ mb: 10 }}>
        <Typography 
          variant="h3" 
          align="center" 
          sx={{ 
            fontWeight: 700, 
            mb: { xs: 4, md: 6 },
            fontSize: { xs: '2rem', md: '3rem' },
            color: theme.palette.text.primary
          }}
        >
          Powerful Features for <Box component="span" sx={{ color: theme.palette.primary.main }}>Modern Education</Box>
        </Typography>
        
        <Grid 
          container 
          spacing={{ xs: 4, md: 8 }}
          justifyContent="center"
        >
          {features.map((feature, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              lg={3} 
              key={index}
              sx={{ 
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Box sx={{
                width: '100%',
                maxWidth: 350,
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: theme.shadows[4],
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: theme.shadows[8]
                }
              }}>
                <Box sx={{
                  height: 180,
                  backgroundImage: `url(${feature.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(to bottom, ${theme.palette.primary.main}00, ${theme.palette.primary.main}80)`
                  }
                }} />
                
                <Box sx={{
                  p: 4,
                  backgroundColor: theme.palette.background.paper
                }}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 3
                  }}>
                    <Box sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      backgroundColor: theme.palette.primary.light,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 3,
                      color: theme.palette.primary.main
                    }}>
                      {feature.icon}
                    </Box>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 700,
                        color: theme.palette.text.primary
                      }}
                    >
                      {feature.title}
                    </Typography>
                  </Box>
                  
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      mb: 3,
                      color: theme.palette.text.secondary
                    }}
                  >
                    {feature.description}
                  </Typography>
                  
                  <Button 
                    endIcon={<ArrowForward />}
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.primary.main,
                      px: 0,
                      '&:hover': {
                        backgroundColor: 'transparent'
                      }
                    }}
                  >
                    Learn more
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{
        py: 10,
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        mb: -2
      }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 700, 
              mb: 3,
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            Ready to transform your institution?
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 400, 
              mb: 5,
              opacity: 0.9
            }}
          >
            Join thousands of educational institutions using our platform
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            endIcon={<ArrowForward />}
            sx={{
              borderRadius: '50px',
              px: 6,
              py: 1.5,
              fontWeight: 600,
              backgroundColor: 'white',
              color: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.9)'
              }
            }}
          >
            Get Started Today
          </Button>
        </Container>
      </Box>

      {/* Modern Footer */}
      <Footer />
    </Box>
  );
};

export default Features;