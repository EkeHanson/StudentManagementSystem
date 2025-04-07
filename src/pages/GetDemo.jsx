import React from 'react';
import { Box, Container, Typography, TextField, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

const GetDemo = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar Component */}
      <Navbar />

      {/* Main Content - Centered with flex grow */}
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', py: 4 }}>
        <Container maxWidth="md">
          <Box sx={{ 
            maxWidth: 600,
            mx: 'auto',
            textAlign: 'center',
            p: { xs: 2, md: 4 },
            borderRadius: 2,
            backgroundColor: 'white',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }}>
            <Typography variant="h3" sx={{ fontWeight: 600, mb: 3 }}>
              Request a Demo
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
              Fill out the form below, and our team will reach out to schedule your personalized demo.
            </Typography>
            
            <Stack spacing={3} sx={{ maxWidth: 500, mx: 'auto' }}>
              <TextField 
                label="Full Name" 
                variant="outlined" 
                fullWidth 
                size="medium"
              />
              <TextField 
                label="Email" 
                variant="outlined" 
                fullWidth 
                size="medium"
              />
              <TextField 
                label="School Name" 
                variant="outlined" 
                fullWidth 
                size="medium"
              />
              <TextField 
                label="Phone Number" 
                variant="outlined" 
                fullWidth 
                size="medium"
              />
              <Button 
                variant="contained" 
                color="primary" 
                size="large" 
                sx={{ 
                  py: 1.5,
                  mt: 2,
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
                onClick={() => navigate('/')}
              >
                Submit Request
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Footer Component */}
      <Footer />
    </Box>
  );
};

export default GetDemo;