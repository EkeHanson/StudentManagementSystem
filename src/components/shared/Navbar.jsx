import React from 'react';
import {
  AppBar, Toolbar, Box, Typography, Stack, Button, IconButton,
  useTheme, useMediaQuery
} from '@mui/material';
import { School as SchoolIcon, Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: 'white', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
      <Box 
        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        <SchoolIcon sx={{ color: '#2a5298', fontSize: 40, mr: 1 }} />
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#2a5298', 
            fontWeight: 700, 
            letterSpacing: 1 
          }}
        >
          appBrew
        </Typography>
      </Box>

        <Stack 
          direction="row" 
          spacing={4} 
          sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            alignItems: 'center' 
          }}
        >
          <Typography 
            sx={{ 
              color: '#333', 
              fontWeight: 500, 
              cursor: 'pointer',
              '&:hover': { color: '#2a5298' }
            }} 
            onClick={() => navigate('/features')}
          >
            Features
          </Typography>
          <Typography 
            sx={{ 
              color: '#333', 
              fontWeight: 500, 
              cursor: 'pointer',
              '&:hover': { color: '#2a5298' }
            }} 
            onClick={() => navigate('/pricing')}
          >
            Pricing
          </Typography>
          <Typography 
            sx={{ 
              color: '#333', 
              fontWeight: 500, 
              cursor: 'pointer',
              '&:hover': { color: '#2a5298' }
            }} 
            onClick={() => navigate('/about')}
          >
            About
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ borderRadius: 1, px: 3 }} 
            onClick={() => navigate('/demo')}
          >
            Get Demo
          </Button>
        </Stack>
        <IconButton 
          sx={{ 
            display: { xs: 'flex', md: 'none' }, 
            color: '#2a5298' 
          }} 
          onClick={() => navigate('/menu')}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;