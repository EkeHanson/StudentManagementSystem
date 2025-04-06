// src/components/dashboard/views/DutiesView.jsx
import React from 'react';
import { 
  Box, Typography, Grid, Paper, Avatar, Chip, 
  Button, IconButton, useTheme, Container 
} from '@mui/material';
import { Assignment, Today, Visibility, Edit, ArrowForward } from '@mui/icons-material';
import { useMediaQuery } from '@mui/material';

const DutiesView = ({ data, isMobile }) => {
  const theme = useTheme();

  return (
    <Container 
      maxWidth="xl" 
      sx={{ 
        py: 4,
        px: isMobile ? 2 : 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {/* Header Section */}
      <Box sx={{ 
        width: '100%',
        maxWidth: '1200px',
        mb: 4,
        textAlign: 'center'
      }}>
        <Typography 
          variant={isMobile ? "h6" : "h5"} 
          sx={{ 
            fontWeight: 700, 
            mb: 1.5,
            color: 'text.primary'
          }}
        >
          Assigned Duties
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ fontWeight: 400 }}
        >
          {data.length} total responsibilities
        </Typography>
      </Box>
      
      {/* Duties Grid */}
      <Box sx={{ 
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Grid 
          container 
          spacing={3}
          justifyContent="center"
          sx={{
            margin: 0,
            width: 'auto',
            '& .MuiGrid-item': {
              display: 'flex',
              justifyContent: 'center',
              padding: '12px !important' // Important to override MUI defaults
            }
          }}
        >
          {data.map((duty, index) => (
            <Grid 
              item 
              key={index}
              xs={12}
              sm={10}
              md={6}
              lg={4}
              xl={4}
            >
              <Paper 
                elevation={isMobile ? 0 : 2}
                sx={{ 
                  p: 2.5, 
                  width: '100%',
                  minWidth: '280px',
                  maxWidth: '380px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  border: isMobile ? '1px solid rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: theme.shadows[4],
                    borderColor: theme.palette.primary.light
                  },
                  position: 'relative',
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 4,
                    height: '100%',
                    bgcolor: 'primary.main'
                  }
                }}
              >
                {/* Duty Card Content (unchanged from your original) */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'flex-start',
                  mb: 2,
                  flexShrink: 0
                }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: 'primary.light', 
                      color: 'primary.dark', 
                      mr: 2,
                      width: isMobile ? 40 : 48,
                      height: isMobile ? 40 : 48
                    }}
                  >
                    <Assignment />
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography 
                      variant={isMobile ? "subtitle1" : "h6"} 
                      sx={{ 
                        fontWeight: 600,
                        lineHeight: 1.3,
                        mb: 0.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {duty.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                      <Chip 
                        label={duty.frequency} 
                        size="small" 
                        color="primary"
                        variant="filled"
                        sx={{ 
                          fontSize: '0.7rem',
                          fontWeight: 500,
                          px: 0.5,
                          height: 22
                        }}
                      />
                      {!isMobile && (
                        <Chip 
                          label={`Priority: ${index % 3 === 0 ? 'High' : index % 2 === 0 ? 'Medium' : 'Low'}`}
                          size="small"
                          variant="outlined"
                          sx={{ 
                            fontSize: '0.7rem',
                            fontWeight: 500,
                            px: 0.5,
                            height: 22,
                            borderColor: index % 3 === 0 ? 'error.main' : index % 2 === 0 ? 'warning.main' : 'success.main',
                            color: index % 3 === 0 ? 'error.main' : index % 2 === 0 ? 'warning.main' : 'success.main'
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
                
                <Box sx={{ flexGrow: 1, mb: 2 }}>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      fontSize: isMobile ? '0.875rem' : '0.9375rem',
                      lineHeight: 1.5
                    }}
                  >
                    {duty.description}
                  </Typography>
                  {duty.description.length > 120 && (
                    <Button 
                      size="small" 
                      sx={{ 
                        mt: 1,
                        fontSize: '0.75rem',
                        p: 0,
                        minWidth: 0,
                        color: 'primary.main'
                      }}
                    >
                      Read {isMobile ? 'more' : 'full description'}
                    </Button>
                  )}
                </Box>
                
                <Box 
                  sx={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pt: 1.5,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    flexShrink: 0
                  }}
                >
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <Today fontSize="inherit" />
                    Updated: {new Date().toLocaleDateString()}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton 
                      size="small" 
                      sx={{ 
                        p: 0.5,
                        '&:hover': {
                          bgcolor: 'primary.light',
                          color: 'primary.dark'
                        }
                      }}
                    >
                      <Visibility fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      sx={{ 
                        p: 0.5,
                        '&:hover': {
                          bgcolor: 'primary.light',
                          color: 'primary.dark'
                        }
                      }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      
      {/* Mobile View All Button */}
      {isMobile && data.length > 3 && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 4,
          width: '100%'
        }}>
          <Button 
            variant="outlined" 
            size="small" 
            endIcon={<ArrowForward />}
            sx={{
              px: 3,
              borderRadius: 2,
              textTransform: 'none',
              width: '200px'
            }}
          >
            View All Duties
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default DutiesView;