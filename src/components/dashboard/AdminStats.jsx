// src/components/dashboard/AdminStats.jsx
import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  Event as EventIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';

// Styled components
const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: 16,
  height: '100%',
  minHeight: 120, // Ensure consistent height
  background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)', // Subtle gradient
  border: '1px solid #e5e7eb', // Light border for definition
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: theme.shadows[6],
  },
  display: 'flex', // Flex for internal alignment
  alignItems: 'center',
  justifyContent: 'space-between', // Space out icon and text
}));

const IconWrapper = styled(Box)(({ theme, color }) => ({
  backgroundColor: `${color}15`, // 15% opacity for a subtle tint
  borderRadius: '50%',
  padding: theme.spacing(1.2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  flexShrink: 0, // Prevent shrinking
}));

const TextWrapper = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  textAlign: 'right', // Align text to the right for a modern look
}));

// Dummy data for stats
const statsData = [
  {
    title: 'Total Students',
    value: '1,234',
    icon: PeopleIcon,
    color: '#1e88e5', // Blue (softer tone)
  },
  {
    title: 'Active Classes',
    value: '45',
    icon: SchoolIcon,
    color: '#43a047', // Green (softer tone)
  },
  {
    title: 'Upcoming Events',
    value: '8',
    icon: EventIcon,
    color: '#e53935', // Red (softer tone)
  },
  {
    title: 'Fees Collected',
    value: '$124,500',
    icon: MoneyIcon,
    color: '#fb8c00', // Orange (softer tone)
  },
];

const AdminStats = () => {
  return (
    <Box sx={{ py: 2 }}>
      <Grid container spacing={3}>
        {statsData.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <StatCard elevation={0}>
              <IconWrapper color={stat.color}>
                <stat.icon sx={{ fontSize: 28, color: stat.color }} />
              </IconWrapper>
              <TextWrapper>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: 700,
                    color: stat.color,
                    lineHeight: 1.2,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 500,
                    mt: 0.5,
                  }}
                >
                  {stat.title}
                </Typography>
              </TextWrapper>
            </StatCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminStats;