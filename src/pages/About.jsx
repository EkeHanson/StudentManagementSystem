import React from 'react';
import { Box, Container, Typography, Grid, Stack } from '@mui/material';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

const About = () => {
  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      {/* Navbar Component */}
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Stack alignItems="center" spacing={6}>
          {/* Centered Title */}
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 600, 
              textAlign: 'center',
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            About EduManage
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box sx={{ maxWidth: 600 }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 3,
                    textAlign: { xs: 'center', md: 'left' },
                    fontSize: { xs: '1rem', md: '1.1rem' }
                  }}
                >
                  EduManage is a leading school management system designed to streamline administrative tasks and enhance educational outcomes. Founded in 2020, our mission is to empower schools with innovative tools that save time and improve efficiency.
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{
                    textAlign: { xs: 'center', md: 'left' },
                    fontSize: { xs: '1rem', md: '1.1rem' }
                  }}
                >
                  Our team is composed of education experts and technology professionals dedicated to providing the best solutions for modern schools.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box 
                component="img" 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1350&q=80" 
                alt="Team" 
                sx={{ 
                  width: '100%', 
                  maxWidth: 600,
                  borderRadius: 2,
                  boxShadow: 3
                }} 
              />
            </Grid>
          </Grid>
        </Stack>
      </Container>

      {/* Footer Component */}
      <Footer />
    </Box>
  );
};

export default About;