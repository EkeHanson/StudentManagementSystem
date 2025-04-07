import React from 'react';
import { Box, Container, Typography, Grid, Button, useTheme, Chip, Divider } from '@mui/material';
import {
  People as PeopleIcon,
  Class as ClassIcon,
  Assessment as ReportsIcon,
  AccountBalance as FeesIcon,
  LibraryBooks as LibraryIcon,
  DirectionsBus as TransportIcon,
  Science as LabIcon,
  Event as EventIcon,
  Security as AuthIcon,
  School as TeacherIcon,
  FamilyRestroom as ParentIcon,
  ArrowForward
} from '@mui/icons-material';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import { Parallax } from 'react-parallax';

const Features = () => {
  const theme = useTheme();
  
  const featureCategories = [
    {
      title: "Core Management",
      icon: <PeopleIcon fontSize="large" />,
      features: [
        {
          title: "Student Management",
          description: "Register and manage detailed student profiles with class assignments, ID generation, and disciplinary records.",
          image: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&auto=format&fit=crop&w=1472&q=80"
        },
        {
          title: "Teacher Management",
          description: "Manage teacher profiles, class assignments, and attendance tracking.",
          image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
        },
        {
          title: "Parent Portal",
          description: "Academic performance overview, fee payments, and messaging system for parents.",
          image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
        }
      ]
    },
    {
      title: "Academic Systems",
      icon: <ClassIcon fontSize="large" />,
      features: [
        {
          title: "Academic Management",
          description: "Timetable creation, examination scheduling, grading system, and assignment tracking.",
          image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
        },
        {
          title: "Attendance Tracking",
          description: "Comprehensive student and teacher attendance with absence notifications.",
          image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
        },
        {
          title: "Library Management",
          description: "Catalog system, book issue/return, digital library with eBook resources.",
          image: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&auto=format&fit=crop&w=1476&q=80"
        }
      ]
    },
    {
      title: "Administrative Tools",
      icon: <FeesIcon fontSize="large" />,
      features: [
        {
          title: "Fee Management",
          description: "Fee structure creation, online payments, receipts, and tracking system.",
          image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
        },
        {
          title: "Transport System",
          description: "Bus route management, schedule tracking, and optional GPS integration.",
          image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1472&q=80"
        },
        {
          title: "Laboratory Management",
          description: "Lab inventory, scheduling, experiment assignments, and evaluations.",
          image: "https://images.unsplash.com/photo-1563191911-e65f8655ebf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
        }
      ]
    },
    {
      title: "Additional Features",
      icon: <ReportsIcon fontSize="large" />,
      features: [
        {
          title: "Event Management",
          description: "School calendar and event participation tracking system.",
          image: "https://images.unsplash.com/photo-1541178735493-479c1a27ed24?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80"
        },
        {
          title: "Analytics & Reports",
          description: "Comprehensive reports for attendance, fees, and academic performance.",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
        },
        {
          title: "User Authentication",
          description: "Role-based access control with secure login and multi-factor auth.",
          image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80"
        }
      ]
    }
  ];

  const allFeatures = featureCategories.flatMap(category => category.features);

  return (
    <Box sx={{ 
      backgroundColor: theme.palette.background.default,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Modern Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <Parallax 
        bgImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
        strength={500}
      >
        <Box sx={{ 
          height: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.6)',
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
              appBrew TechHub Management School
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
              Comprehensive school management solution for the modern educational institution
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
                Request Demo
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
                Explore Features
              </Button>
            </Box>
          </Container>
        </Box>
      </Parallax>

      {/* Features Overview */}
      <Container maxWidth="xl" sx={{ my: 10 }}>
        <Typography 
          variant="h3" 
          align="center" 
          sx={{ 
            fontWeight: 700, 
            mb: 2,
            fontSize: { xs: '2rem', md: '3rem' },
            color: theme.palette.text.primary
          }}
        >
          Complete School <Box component="span" sx={{ color: theme.palette.primary.main }}>Management Solution</Box>
        </Typography>
        
        <Typography 
          variant="h6" 
          align="center" 
          sx={{ 
            fontWeight: 400, 
            mb: 6,
            color: theme.palette.text.secondary,
            maxWidth: 800,
            mx: 'auto'
          }}
        >
          Our platform integrates all aspects of school administration into one seamless system, saving time and improving communication across your institution.
        </Typography>

        {/* Category Tabs */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          // flexWrap: 'wrap',
          gap: 2,
          mb: 6
        }}>
          {featureCategories.map((category, index) => (
            <Chip
              key={index}
              icon={React.cloneElement(category.icon, { sx: { color: theme.palette.primary.main } })}
              label={category.title}
              clickable
              sx={{
                px: 3,
                py: 2,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '8px',
                border: `1px solid ${theme.palette.divider}`,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover
                }
              }}
            />
          ))}
        </Box>

        {/* All Features Grid */}
        <Grid container spacing={4}>
          {allFeatures.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box sx={{
                height: '100%',
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: theme.shadows[2],
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[6]
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
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 700,
                      mb: 2,
                      color: theme.palette.text.primary
                    }}
                  >
                    {feature.title}
                  </Typography>
                  
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

      {/* Feature Highlights Section */}
      <Box sx={{ 
        py: 10,
        backgroundColor: theme.palette.grey[100]
      }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700, 
              mb: 6,
              textAlign: 'center'
            }}
          >
            Key System Capabilities
          </Typography>
          
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                backgroundColor: theme.palette.background.paper,
                borderRadius: 4,
                p: 4,
                height: '100%',
                boxShadow: theme.shadows[1]
              }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                  <Box component="span" sx={{ color: theme.palette.primary.main, mr: 1 }}>✓</Box>
                  Role-Based Access Control
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Secure, granular permissions for administrators, teachers, students, and parents with:
                </Typography>
                <Box component="ul" sx={{ pl: 3, mb: 3 }}>
                  <li><Typography variant="body1">Customizable permission sets</Typography></li>
                  <li><Typography variant="body1">Multi-factor authentication</Typography></li>
                  <li><Typography variant="body1">Password recovery system</Typography></li>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                backgroundColor: theme.palette.background.paper,
                borderRadius: 4,
                p: 4,
                height: '100%',
                boxShadow: theme.shadows[1]
              }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                  <Box component="span" sx={{ color: theme.palette.primary.main, mr: 1 }}>✓</Box>
                  Comprehensive Reporting
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Generate detailed analytics and reports for all aspects of school operations:
                </Typography>
                <Box component="ul" sx={{ pl: 3, mb: 3 }}>
                  <li><Typography variant="body1">Student performance analytics</Typography></li>
                  <li><Typography variant="body1">Financial and fee collection reports</Typography></li>
                  <li><Typography variant="body1">Custom report builder</Typography></li>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                backgroundColor: theme.palette.background.paper,
                borderRadius: 4,
                p: 4,
                height: '100%',
                boxShadow: theme.shadows[1]
              }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                  <Box component="span" sx={{ color: theme.palette.primary.main, mr: 1 }}>✓</Box>
                  Integrated Communication
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Seamless communication channels between all stakeholders:
                </Typography>
                <Box component="ul" sx={{ pl: 3, mb: 3 }}>
                  <li><Typography variant="body1">Parent-teacher messaging</Typography></li>
                  <li><Typography variant="body1">School-wide announcements</Typography></li>
                  <li><Typography variant="body1">Notification system</Typography></li>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                backgroundColor: theme.palette.background.paper,
                borderRadius: 4,
                p: 4,
                height: '100%',
                boxShadow: theme.shadows[1]
              }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                  <Box component="span" sx={{ color: theme.palette.primary.main, mr: 1 }}>✓</Box>
                  Mobile Responsive Design
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Fully responsive interface works perfectly on all devices:
                </Typography>
                <Box component="ul" sx={{ pl: 3, mb: 3 }}>
                  <li><Typography variant="body1">Optimized for phones and tablets</Typography></li>
                  <li><Typography variant="body1">Teacher classroom apps</Typography></li>
                  <li><Typography variant="body1">Parent mobile access</Typography></li>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{
        py: 10,
        backgroundColor: theme.palette.primary.main,
        color: 'white'
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
            Ready to transform your school's administration?
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 400, 
              mb: 5,
              opacity: 0.9
            }}
          >
            Join hundreds of educational institutions using our comprehensive platform
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
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
              Schedule Demo
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              sx={{
                borderRadius: '50px',
                px: 6,
                py: 1.5,
                fontWeight: 600,
                borderWidth: '2px',
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderWidth: '2px',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Contact Sales
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Features;