import React from 'react';
import {
  Box, Grid, Typography, Card, CardContent, Button,
  Avatar, Divider, useTheme, useMediaQuery
} from '@mui/material';
import {
  School as SchoolIcon,
  Class as ClassIcon,
  People as PeopleIcon,
  MenuBook as LibraryIcon,
  DirectionsBus as TransportIcon,
  Event as CalendarIcon,
  Assessment as ReportsIcon,
  Science as LabIcon,
  AccountBalance as FeesIcon,
  Security as AdminIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  // All features visible to everyone
  const features = [
    {
      icon: <PeopleIcon fontSize="large" />,
      title: "Student Management",
      description: "Manage student records, attendance, and progress",
      path: "/students"
    },
    {
      icon: <ClassIcon fontSize="large" />,
      title: "Class Management",
      description: "Organize classes, sections, and timetables",
      path: "/classes"
    },
    {
      icon: <LibraryIcon fontSize="large" />,
      title: "Library System",
      description: "Access physical and digital library resources",
      path: "/library"
    },
    {
      icon: <FeesIcon fontSize="large" />,
      title: "Fee Management",
      description: "View and pay school fees online",
      path: "/fees"
    },
    {
      icon: <CalendarIcon fontSize="large" />,
      title: "School Calendar",
      description: "View upcoming events and important dates",
      path: "/calendar"
    },
    {
      icon: <ReportsIcon fontSize="large" />,
      title: "Reports & Analytics",
      description: "Generate academic and administrative reports",
      path: "/reports"
    },
    {
      icon: <TransportIcon fontSize="large" />,
      title: "Transport",
      description: "View bus routes and schedules",
      path: "/transport"
    },
    {
      icon: <LabIcon fontSize="large" />,
      title: "Laboratory",
      description: "Manage lab resources and schedules",
      path: "/labs"
    },
  ];

  // Quick actions visible to everyone
  const quickActions = [
    { label: "View Library", path: "/library" },
    { label: "Check Calendar", path: "/calendar" },
    { label: "See Transport", path: "/transport" },
    { label: "Explore Labs", path: "/labs" }
  ];

  // Stats data
  const stats = [
    { value: "1,245", label: "Total Students" },
    { value: "84", label: "Teachers" },
    { value: "12,560", label: "Library Books" },
    { value: "98%", label: "Attendance Today" },
  ];

  return (
    <Box sx={{ p: isMobile ? 2 : 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          Welcome to Excel International School
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Empowering students through excellence in education
        </Typography>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ 
              height: '100%', 
              borderRadius: 2,
              boxShadow: theme.shadows[2],
              '&:hover': {
                boxShadow: theme.shadows[4]
              }
            }}>
              <CardContent>
                <Typography variant="h2" component="div" gutterBottom color="primary">
                  {stat.value}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Quick Access
        </Typography>
        <Grid container spacing={2}>
          {quickActions.map((action, index) => (
            <Grid item key={index}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate(action.path)}
                sx={{ 
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1rem'
                }}
              >
                {action.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Main Features */}
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Explore Our System
      </Typography>
      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: theme.shadows[6]
                }
              }}
              onClick={() => navigate(feature.path)}
            >
              <CardContent sx={{ 
                flexGrow: 1, 
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <Avatar 
                  sx={{ 
                    bgcolor: theme.palette.primary.main, 
                    color: 'white',
                    width: 64, 
                    height: 64,
                    mb: 3,
                  }}
                >
                  {feature.icon}
                </Avatar>
                <Typography variant="h5" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
                <Button 
                  variant="text" 
                  color="primary" 
                  sx={{ mt: 2 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(feature.path);
                  }}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* School Announcements */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          Latest News & Announcements
        </Typography>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              School Reopening Date
            </Typography>
            <Typography variant="body1" paragraph>
              The new academic year begins on September 5th. All students are expected to report by 8:00 AM.
            </Typography>
            <Typography color="text.secondary">
              Posted: August 15, 2023
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Library Expansion Complete
            </Typography>
            <Typography variant="body1" paragraph>
              Our newly expanded digital library is now available with over 5,000 additional resources.
            </Typography>
            <Typography color="text.secondary">
              Posted: August 1, 2023
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Call to Action */}
      <Box sx={{ 
        mt: 6, 
        py: 6, 
        px: 4, 
        bgcolor: 'primary.main', 
        color: 'primary.contrastText',
        borderRadius: 2,
        textAlign: 'center'
      }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
          Ready to Get Started?
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Join our community of learners and educators today
        </Typography>
        <Button 
          variant="contained" 
          color="secondary" 
          size="large"
          onClick={() => navigate('/login')}
          sx={{ 
            px: 6,
            py: 2,
            fontSize: '1.2rem',
            borderRadius: 2
          }}
        >
          Login / Register
        </Button>
      </Box>
    </Box>
  );
};

export default Home;