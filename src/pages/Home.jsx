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
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: <PeopleIcon fontSize="large" />,
      title: "Student Management",
      description: "Manage student records, attendance, and progress",
      path: "/students",
      roles: ['admin', 'teacher']
    },
    {
      icon: <ClassIcon fontSize="large" />,
      title: "Class Management",
      description: "Organize classes, sections, and timetables",
      path: "/classes",
      roles: ['admin', 'teacher']
    },
    {
      icon: <LibraryIcon fontSize="large" />,
      title: "Library System",
      description: "Access physical and digital library resources",
      path: "/library",
      roles: ['admin', 'teacher', 'student']
    },
    {
      icon: <FeesIcon fontSize="large" />,
      title: "Fee Management",
      description: "View and pay school fees online",
      path: "/fees",
      roles: ['admin', 'parent']
    },
    {
      icon: <CalendarIcon fontSize="large" />,
      title: "School Calendar",
      description: "View upcoming events and important dates",
      path: "/calendar",
      roles: ['admin', 'teacher', 'student', 'parent']
    },
    {
      icon: <ReportsIcon fontSize="large" />,
      title: "Reports & Analytics",
      description: "Generate academic and administrative reports",
      path: "/reports",
      roles: ['admin', 'teacher']
    },
    {
      icon: <TransportIcon fontSize="large" />,
      title: "Transport",
      description: "View bus routes and schedules",
      path: "/transport",
      roles: ['admin', 'parent']
    },
    {
      icon: <LabIcon fontSize="large" />,
      title: "Laboratory",
      description: "Manage lab resources and schedules",
      path: "/labs",
      roles: ['admin', 'teacher']
    },
  ];

  const quickActions = [
    { label: "Add New Student", path: "/students/add", roles: ['admin'] },
    { label: "Issue Books", path: "/library/circulation", roles: ['admin', 'teacher'] },
    { label: "Record Attendance", path: "/attendance", roles: ['admin', 'teacher'] },
    { label: "View Grades", path: "/grades", roles: ['student', 'parent'] },
    { label: "Pay Fees", path: "/fees/pay", roles: ['parent'] },
    { label: "Upload Resources", path: "/library/digital-resources/upload", roles: ['admin', 'teacher'] },
  ];

  const stats = [
    { value: "1,245", label: "Total Students" },
    { value: "84", label: "Teachers" },
    { value: "12,560", label: "Library Books" },
    { value: "98%", label: "Attendance Today" },
  ];

  const filteredFeatures = features.filter(feature => 
    !feature.roles || feature.roles.includes(currentUser?.role)
  );

  const filteredQuickActions = quickActions.filter(action => 
    !action.roles || action.roles.includes(currentUser?.role)
  );

  return (
    <Box sx={{ p: isMobile ? 2 : 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome back, {currentUser?.name || 'User'}!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </Typography>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h3" component="div" gutterBottom>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          {filteredQuickActions.map((action, index) => (
            <Grid item key={index}>
              <Button
                variant="outlined"
                onClick={() => navigate(action.path)}
                sx={{ borderRadius: 2 }}
              >
                {action.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Main Features */}
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        System Modules
      </Typography>
      <Grid container spacing={3}>
        {filteredFeatures.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: theme.shadows[6]
                }
              }}
              onClick={() => navigate(feature.path)}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Avatar 
                  sx={{ 
                    bgcolor: theme.palette.primary.main, 
                    color: 'white',
                    width: 56, 
                    height: 56,
                    mb: 2,
                    mx: 'auto'
                  }}
                >
                  {feature.icon}
                </Avatar>
                <Typography variant="h6" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Activity (Placeholder) */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Recent Activity
        </Typography>
        <Card>
          <CardContent>
            <Typography color="text.secondary">
              Recent system activities will appear here
            </Typography>
            {/* Would typically map through recent activity data */}
          </CardContent>
        </Card>
      </Box>

      {/* System Announcements (Placeholder) */}
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          Announcements
        </Typography>
        <Card>
          <CardContent>
            <Typography color="text.secondary">
              Important school announcements will appear here
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Home;