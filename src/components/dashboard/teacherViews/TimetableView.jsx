import React, { useState } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Grid,
  Paper,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components
const DayCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: 8,
  background: 'linear-gradient(135deg, #f0f4f8 0%, #e9ecef 100%)',
  border: '1px solid #d1d9e6',
  minHeight: 250,
  maxHeight: 400,
  overflowY: 'auto',
  textAlign: 'center', // Center-align all content within the card
}));

const PeriodBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.5),
  marginBottom: theme.spacing(0.5),
  borderRadius: 4,
  backgroundColor: '#ffffff',
  border: '1px solid #e0e0e0',
  '&:last-child': {
    marginBottom: 0,
  },
  textAlign: 'center', // Center-align all text within the period box
}));

const TimetableView = ({ data, isMobile }) => {
  const theme = useTheme();
  const [selectedTerm, setSelectedTerm] = useState('First Term');
  const [selectedYear, setSelectedYear] = useState('2023-2024');

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: isMobile ? 1 : 2,
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 1 : 0,
        }}
      >
        <Typography
          variant={isMobile ? 'h6' : 'h5'}
          sx={{ fontWeight: 600, textAlign: isMobile ? 'center' : 'left' }}
        >
          Weekly Timetable
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: isMobile ? 1 : 2,
            width: isMobile ? '100%' : 'auto',
            mt: isMobile ? 1 : 0,
            justifyContent: isMobile ? 'center' : 'flex-end',
          }}
        >
          <Select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
            size="small"
            sx={{ minWidth: isMobile ? 0 : 120, flex: isMobile ? 1 : 0 }}
          >
            <MenuItem value="First Term">First Term</MenuItem>
            <MenuItem value="Second Term">Second Term</MenuItem>
            <MenuItem value="Third Term">Third Term</MenuItem>
          </Select>
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            size="small"
            sx={{ minWidth: isMobile ? 0 : 120, flex: isMobile ? 1 : 0 }}
          >
            <MenuItem value="2023-2024">2023-2024</MenuItem>
            <MenuItem value="2022-2023">2022-2023</MenuItem>
            <MenuItem value="2021-2022">2021-2022</MenuItem>
          </Select>
        </Box>
      </Box>

      <Grid container spacing={1}>
        {data.map((dayData, index) => (
          <Grid item xs={12} sm={2.4} key={index}>
            <DayCard elevation={0}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, mb: 1, fontSize: isMobile ? '0.9rem' : '1rem' }}
              >
                {dayData.day}
              </Typography>
              {dayData.periods.length > 0 ? (
                dayData.periods.map((period, idx) => (
                  <PeriodBox key={idx}>
                    <Typography variant="caption" sx={{ fontWeight: 500, display: 'block' }}>
                      {period.time}
                    </Typography>
                    <Typography variant="caption">{period.subject}</Typography>
                    {period.class && (
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                        {period.class} ({period.type})
                      </Typography>
                    )}
                  </PeriodBox>
                ))
              ) : (
                <Typography variant="caption" color="text.secondary">
                  No periods
                </Typography>
              )}
            </DayCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TimetableView;