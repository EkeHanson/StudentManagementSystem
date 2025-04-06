import React from 'react';
import { 
  Box,
  Typography,
  Button,
  Grid,
  Paper
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Book, CollectionsBookmark, ImportContacts, Schedule } from '@mui/icons-material';

const LibraryOverview = () => {
  const quickActions = [
    { 
      title: 'Add New Book', 
      icon: <Book fontSize="large" />,
      path: '/library/physical-books/add',
      color: '#4caf50'
    },
    { 
      title: 'Manage Categories', 
      icon: <CollectionsBookmark fontSize="large" />,
      path: '/library/physical-books/categories',
      color: '#2196f3'
    },
    { 
      title: 'Upload Resources', 
      icon: <ImportContacts fontSize="large" />,
      path: '/library/digital-resources/upload',
      color: '#ff9800'
    },
    { 
      title: 'View Overdue', 
      icon: <Schedule fontSize="large" />,
      path: '/library/circulation/overdue',
      color: '#f44336'
    }
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Quick Actions
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {quickActions.map((action, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper 
              elevation={3}
              sx={{ 
                p: 3,
                textAlign: 'center',
                backgroundColor: action.color,
                color: 'white',
                borderRadius: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              {action.icon}
              <Typography variant="h6" sx={{ mt: 1 }}>
                {action.title}
              </Typography>
              <Button 
                component={Link}
                to={action.path}
                variant="contained"
                sx={{ 
                  mt: 2,
                  backgroundColor: 'white',
                  color: action.color,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.9)'
                  }
                }}
              >
                Go
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom>
        Recent Activity
      </Typography>
      <Paper elevation={2} sx={{ p: 3 }}>
        {/* Recent activity content would go here */}
        <Typography>Recent checkouts, returns, and other activities</Typography>
      </Paper>
    </Box>
  );
};

export default LibraryOverview;