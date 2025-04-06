// src/components/dashboard/teacherViews/TimetableDay.jsx
import React from 'react';
import { 
  Paper, Typography, Divider, TableContainer, 
  Table, TableHead, TableBody, TableRow, 
  TableCell, Chip 
} from '@mui/material';
import { Today } from '@mui/icons-material';

const TimetableDay = ({ dayData, isMobile }) => {
  return (
    <Paper sx={{ p: isMobile ? 1 : 2, mb: isMobile ? 1 : 2 }}>
      <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
        <Today color="primary" sx={{ mr: 1, fontSize: isMobile ? 'small' : 'medium' }} />
        {dayData.day}
      </Typography>
      <Divider sx={{ mb: 1 }} />
      {dayData.periods.length > 0 ? (
        <TableContainer>
          <Table size={isMobile ? "small" : "medium"}>
            <TableHead>
              <TableRow>
                <TableCell size={isMobile ? "small" : "medium"}>Time</TableCell>
                <TableCell size={isMobile ? "small" : "medium"}>Subject</TableCell>
                {!isMobile && <TableCell size={isMobile ? "small" : "medium"}>Class/Group</TableCell>}
                <TableCell size={isMobile ? "small" : "medium"}>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dayData.periods.map((period, index) => (
                <TableRow key={index} hover>
                  <TableCell size={isMobile ? "small" : "medium"}>{period.time}</TableCell>
                  <TableCell size={isMobile ? "small" : "medium"}>
                    <Typography fontWeight={500} fontSize={isMobile ? "0.8rem" : "0.875rem"}>
                      {period.subject}
                      {isMobile && period.class && (
                        <Typography variant="caption" display="block" color="text.secondary">
                          {period.class}
                        </Typography>
                      )}
                    </Typography>
                  </TableCell>
                  {!isMobile && <TableCell size={isMobile ? "small" : "medium"}>{period.class || '-'}</TableCell>}
                  <TableCell size={isMobile ? "small" : "medium"}>
                    <Chip 
                      label={period.type} 
                      size={isMobile ? "small" : "medium"} 
                      color={
                        period.type === 'Lecture' ? 'primary' : 
                        period.type === 'Lab' ? 'secondary' : 
                        period.type === 'Meeting' ? 'info' : 'success'
                      }
                      variant="outlined"
                      sx={{ fontSize: isMobile ? '0.7rem' : '0.8125rem' }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
          No scheduled periods for this day
        </Typography>
      )}
    </Paper>
  );
};

export default TimetableDay;