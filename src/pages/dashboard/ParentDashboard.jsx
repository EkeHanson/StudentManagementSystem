// src/pages/dashboard/ParentDashboard.jsx (corrected path)
import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Dummy data for parent dashboard
const dummyStudentData = {
  name: 'John Doe',
  grade: '10A',
  attendance: 92,
  feesDue: 1500,
  recentGrades: {
    math: 85,
    science: 90,
    english: 88,
  },
  upcomingEvents: [
    { title: 'Parent-Teacher Meeting', date: '2025-04-10' },
    { title: 'Science Fair', date: '2025-04-15' },
  ],
};

// Styled components
const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 12,
  boxShadow: theme.shadows[2],
}));

const ParentDashboard = () => {
  const { currentUser } = useAuth();

  useEffect(() => {
    // Fetch parent-specific data here (e.g., student's info)
  }, []);

  return (
    // <DashboardLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Parent Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Welcome back, {currentUser?.name}
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* Student Overview */}
          <Grid item xs={12} md={6}>
            <StatCard>
              <Typography variant="h6" gutterBottom>
                Student Overview
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box>
                <Typography>
                  <strong>Student:</strong> {dummyStudentData.name}
                </Typography>
                <Typography>
                  <strong>Grade:</strong> {dummyStudentData.grade}
                </Typography>
                <Typography>
                  <strong>Attendance:</strong> {dummyStudentData.attendance}%
                </Typography>
                <Typography>
                  <strong>Fees Due:</strong> ${dummyStudentData.feesDue}
                </Typography>
              </Box>
            </StatCard>
          </Grid>

          {/* Recent Grades */}
          <Grid item xs={12} md={6}>
            <StatCard>
              <Typography variant="h6" gutterBottom>
                Recent Grades
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box>
                <Typography>
                  <strong>Math:</strong> {dummyStudentData.recentGrades.math}
                </Typography>
                <Typography>
                  <strong>Science:</strong> {dummyStudentData.recentGrades.science}
                </Typography>
                <Typography>
                  <strong>English:</strong> {dummyStudentData.recentGrades.english}
                </Typography>
              </Box>
            </StatCard>
          </Grid>

          {/* Upcoming Events */}
          <Grid item xs={12}>
            <StatCard>
              <Typography variant="h6" gutterBottom>
                Upcoming Events
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box>
                {dummyStudentData.upcomingEvents.map((event, index) => (
                  <Typography key={index}>
                    {event.title} - {event.date}
                  </Typography>
                ))}
              </Box>
            </StatCard>
          </Grid>
        </Grid>
      </Container>
    // </DashboardLayout>
  );
};

export default ParentDashboard;