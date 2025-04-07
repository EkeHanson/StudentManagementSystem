import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Button, 
  Avatar, 
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  School as SchoolIcon,
  Groups as TeamIcon,
  BarChart as StatsIcon,
  LocationOn as LocationIcon,
  Email as EmailIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const teamMembers = [
    { 
      name: 'Alex Johnson', 
      role: 'CEO & Founder', 
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Education technology expert with 15 years of experience'
    },
    { 
      name: 'Maria Garcia', 
      role: 'CTO', 
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Software architect specializing in school management systems'
    },
    { 
      name: 'James Wilson', 
      role: 'Head of Support', 
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      bio: 'Former school administrator with deep domain knowledge'
    },
  ];

  const stats = [
    { value: '500+', label: 'Schools' },
    { value: '1M+', label: 'Students' },
    { value: '50+', label: 'Countries' },
    { value: '99.9%', label: 'Uptime' },
  ];

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
      <Box sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        color: 'white',
        py: 10,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/connected.png")',
          opacity: 0.1
        }
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" sx={{ 
                fontWeight: 800,
                mb: 3,
                fontSize: isMobile ? '2.5rem' : '3.5rem'
              }}>
                Transforming Education Through Technology
              </Typography>
              <Typography variant="h6" sx={{ 
                mb: 4,
                fontWeight: 400,
                opacity: 0.9
              }}>
                We're revolutionizing school management with intuitive, powerful tools designed by educators for educators.
              </Typography>
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                sx={{ 
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600
                }}
              >
                Request Demo
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: 6,
                transform: 'rotate(-2deg)',
                '&:hover': {
                  transform: 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Students using EduManage" 
                  style={{ 
                    width: '100%', 
                    display: 'block',
                    height: isMobile ? 'auto' : '400px',
                    objectFit: 'cover'
                  }} 
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box sx={{ 
          backgroundColor: theme.palette.background.paper,
          borderRadius: 4,
          p: 6,
          boxShadow: theme.shadows[2],
          textAlign: 'center',
          mb: 8
        }}>
          <SchoolIcon sx={{ 
            fontSize: 60,
            color: theme.palette.primary.main,
            mb: 3
          }} />
          <Typography variant="h4" sx={{ 
            fontWeight: 700,
            mb: 3
          }}>
            Our Mission
          </Typography>
          <Typography variant="body1" sx={{ 
            fontSize: '1.2rem',
            maxWidth: '800px',
            mx: 'auto',
            lineHeight: 1.8
          }}>
            To empower educational institutions with cutting-edge technology that simplifies administration, enhances learning outcomes, and connects all stakeholders in a seamless digital ecosystem. We believe every school deserves access to tools that help them focus on what matters most - educating the next generation.
          </Typography>
        </Box>

        {/* Stats Section */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {stats.map((stat, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Box sx={{ 
                textAlign: 'center',
                p: 3,
                backgroundColor: theme.palette.background.paper,
                borderRadius: 3,
                height: '100%',
                boxShadow: theme.shadows[1]
              }}>
                <Typography variant="h3" sx={{ 
                  fontWeight: 800,
                  color: theme.palette.primary.main,
                  mb: 1
                }}>
                  {stat.value}
                </Typography>
                <Typography variant="subtitle1" sx={{ 
                  fontWeight: 500,
                  color: theme.palette.text.secondary
                }}>
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Team Section */}
        <Typography variant="h4" sx={{ 
          fontWeight: 700,
          textAlign: 'center',
          mb: 6
        }}>
          Meet Our Team
        </Typography>
        <Grid container spacing={1} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box sx={{ 
                textAlign: 'center',
                p: 4,
                backgroundColor: theme.palette.background.paper,
                borderRadius: 3,
                height: '100%',
                boxShadow: theme.shadows[1],
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[4]
                }
              }}>
                <Avatar 
                  src={member.avatar}
                  sx={{ 
                    width: 120, 
                    height: 120,
                    mx: 'auto',
                    mb: 3,
                    border: `4px solid ${theme.palette.primary.light}`
                  }} 
                />
                <Typography variant="h6" sx={{ 
                  fontWeight: 700,
                  mb: 1
                }}>
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" sx={{ 
                  color: theme.palette.primary.main,
                  mb: 2,
                  fontWeight: 500
                }}>
                  {member.role}
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: theme.palette.text.secondary
                }}>
                  {member.bio}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Values Section */}
      <Box sx={{ 
        backgroundColor: theme.palette.primary.light,
        py: 8,
        color: theme.palette.getContrastText(theme.palette.primary.light)
      }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ 
            fontWeight: 700,
            textAlign: 'center',
            mb: 6,
            color: theme.palette.getContrastText(theme.palette.primary.light)
          }}>
            Our Core Values
          </Typography>
          <Grid container spacing={4}>
            {[
              { 
                title: 'Innovation', 
                description: 'We constantly push boundaries to deliver groundbreaking solutions for education.' 
              },
              { 
                title: 'Integrity', 
                description: 'We build trust through transparency, honesty, and ethical business practices.' 
              },
              { 
                title: 'Impact', 
                description: 'We measure success by the positive change we create in educational institutions.' 
              },
              { 
                title: 'Collaboration', 
                description: 'We believe the best solutions come from working closely with educators.' 
              }
            ].map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box sx={{ 
                  backgroundColor: theme.palette.background.paper,
                  p: 3,
                  borderRadius: 3,
                  height: '100%',
                  boxShadow: theme.shadows[1]
                }}>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 700,
                    mb: 2,
                    color: theme.palette.primary.main
                  }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body2">
                    {value.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contact Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ 
              fontWeight: 700,
              mb: 3
            }}>
              Get In Touch
            </Typography>
            <Typography variant="body1" sx={{ 
              mb: 4,
              lineHeight: 1.8
            }}>
              Have questions about how EduManage can transform your school? Our team is ready to help you find the perfect solution for your needs.
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationIcon sx={{ 
                  mr: 2,
                  color: theme.palette.primary.main 
                }} />
                <Typography>
                  123 Education Ave, Tech City, TC 10101
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmailIcon sx={{ 
                  mr: 2,
                  color: theme.palette.primary.main 
                }} />
                <Typography>
                  contact@edumanage.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIcon sx={{ 
                  mr: 2,
                  color: theme.palette.primary.main 
                }} />
                <Typography>
                  (555) 123-4567
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              backgroundColor: theme.palette.background.paper,
              p: 4,
              borderRadius: 3,
              boxShadow: theme.shadows[2]
            }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 600,
                mb: 3
              }}>
                Send us a message
              </Typography>
              <form>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      style={{ 
                        width: '100%',
                        padding: '12px 15px',
                        borderRadius: '8px',
                        border: `1px solid ${theme.palette.divider}`,
                        fontSize: '16px'
                      }} 
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      style={{ 
                        width: '100%',
                        padding: '12px 15px',
                        borderRadius: '8px',
                        border: `1px solid ${theme.palette.divider}`,
                        fontSize: '16px'
                      }} 
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <textarea 
                      placeholder="Your Message" 
                      rows={5}
                      style={{ 
                        width: '100%',
                        padding: '12px 15px',
                        borderRadius: '8px',
                        border: `1px solid ${theme.palette.divider}`,
                        fontSize: '16px',
                        resize: 'vertical'
                      }} 
                    ></textarea>
                  </Grid>
                  <Grid item xs={12}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      size="large"
                      sx={{ 
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        textTransform: 'none'
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Modern Footer */}
      <Footer />
    </Box>
  );
};

export default About;