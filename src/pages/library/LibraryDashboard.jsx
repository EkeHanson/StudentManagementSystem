import React, { useEffect } from 'react';
import { useLibrary } from '../../contexts/LibraryContext';
import { 
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Box,
  LinearProgress
} from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const LibraryDashboard = () => {
  const { 
    stats,
    loading,
    fetchStats
  } = useLibrary();
  
  const navigate = useNavigate();
  const location = useLocation();

  // Get current tab from URL
  const currentTab = location.pathname.split('/').pop() || 'dashboard';

  useEffect(() => {
    fetchStats();
  }, []);

  const handleTabChange = (event, newValue) => {
    navigate(`/library/${newValue}`);
  };

  const tabs = [
    // { value: 'dashboard', label: 'Overview' },
    { value: 'physical-books', label: 'Physical Books' },
    { value: 'circulation', label: 'Circulation' },
    { value: 'digital-resources', label: 'Digital Resources' },
 
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Library Management
        </Typography>
        
        {loading && <LinearProgress />}
        
        {/* Navigation Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={currentTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {tabs.map((tab) => (
              <Tab 
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
        </Box>

        {/* Stats Cards - Only shown on dashboard */}
        {currentTab === 'dashboard' && stats && (
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3} lg={2}>
              <Card elevation={3}>
                <CardContent>
                  <Typography color="textSecondary">Total Books</Typography>
                  <Typography variant="h5">{stats.totalBooks || 0}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={2}>
              <Card elevation={3}>
                <CardContent>
                  <Typography color="textSecondary">Available</Typography>
                  <Typography variant="h5">{stats.availableBooks || 0}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={2}>
              <Card elevation={3}>
                <CardContent>
                  <Typography color="textSecondary">Issued</Typography>
                  <Typography variant="h5">{stats.issuedBooks || 0}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={2}>
              <Card elevation={3}>
                <CardContent>
                  <Typography color="textSecondary">Overdue</Typography>
                  <Typography variant="h5">{stats.overdueBooks || 0}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={2}>
              <Card elevation={3}>
                <CardContent>
                  <Typography color="textSecondary">Digital</Typography>
                  <Typography variant="h5">{stats.digitalResources || 0}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={2}>
              <Card elevation={3}>
                <CardContent>
                  <Typography color="textSecondary">Active Users</Typography>
                  <Typography variant="h5">{stats.activeUsers || 0}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Nested Route Content */}
        <Outlet />
      </Box>
    </Container>
  );
};

export default LibraryDashboard;