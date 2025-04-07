// ContactUs.jsx

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  IconButton,
  Stack,
  useTheme,
  Slide
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  YouTube
} from '@mui/icons-material';

import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

const ContactUs = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <Box sx={{ background: 'linear-gradient(to right, #e0eafc, #cfdef3)', minHeight: '100vh' }}>
      <Navbar />
      <Box sx={{ pt: { xs: 10, md: 14 }, pb: 8 }}>
        <Container maxWidth="lg">
          <Slide in direction="up" timeout={800}>
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h2" sx={{ fontWeight: 800, color: '#222', mb: 3 }}>
                  Let's Connect
                </Typography>
                <Typography variant="body1" sx={{ color: '#555', mb: 4 }}>
                  Whether you have a question or just want to say hi, our team is ready to hear from you.
                </Typography>

                <Stack spacing={2}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <LocationIcon color="primary" />
                    <Typography>123 Education Lane, Academic City, AC 12345</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <PhoneIcon color="primary" />
                    <Typography>+1 (800) 123-4567</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <EmailIcon color="primary" />
                    <Typography>support@excelinternational.com</Typography>
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={2} mt={4}>
                  <IconButton
                    href="https://www.facebook.com/"  // Replace with your Facebook URL
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      bgcolor: '#fff',
                      boxShadow: 2,
                      '&:hover': {
                        bgcolor: theme.palette.primary.main,
                        color: '#fff'
                      }
                    }}
                  >
                    <Facebook />
                  </IconButton>
                  <IconButton
                    href="https://twitter.com/"  // Replace with your Twitter URL
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      bgcolor: '#fff',
                      boxShadow: 2,
                      '&:hover': {
                        bgcolor: theme.palette.primary.main,
                        color: '#fff'
                      }
                    }}
                  >
                    <Twitter />
                  </IconButton>
                  <IconButton
                    href="https://www.instagram.com/"  // Replace with your Instagram URL
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      bgcolor: '#fff',
                      boxShadow: 2,
                      '&:hover': {
                        bgcolor: theme.palette.primary.main,
                        color: '#fff'
                      }
                    }}
                  >
                    <Instagram />
                  </IconButton>
                  <IconButton
                    href="https://www.linkedin.com/in/ekene-onwon-abraham-4370a0228/"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      bgcolor: '#fff',
                      boxShadow: 2,
                      '&:hover': {
                        bgcolor: theme.palette.primary.main,
                        color: '#fff'
                      }
                    }}
                  >
                    <LinkedIn />
                  </IconButton>
                  <IconButton
                    href="https://www.youtube.com/@ekene-onwon_hanson"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      bgcolor: '#fff',
                      boxShadow: 2,
                      '&:hover': {
                        bgcolor: theme.palette.primary.main,
                        color: '#fff'
                      }
                    }}
                  >
                    <YouTube />
                  </IconButton>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper
                  elevation={6}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(255,255,255,0.75)',
                    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.2)'
                  }}
                >
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                    Send Us a Message
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Full Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          fullWidth
                          required
                          type="email"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          fullWidth
                          multiline
                          rows={5}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          fullWidth
                          sx={{ py: 1.5, fontWeight: 600, borderRadius: 2 }}
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              </Grid>
            </Grid>
          </Slide>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default ContactUs;