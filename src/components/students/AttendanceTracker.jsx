// src/components/students/AttendanceTracker.jsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  LinearProgress,
} from '@mui/material';

const AttendanceTracker = ({ students }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Attendance %</TableCell>
          <TableCell>Progress</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id} hover>
            <TableCell>{student.id}</TableCell>
            <TableCell>{student.name}</TableCell>
            <TableCell>{student.attendance}%</TableCell>
            <TableCell>
              <LinearProgress 
                variant="determinate" 
                value={student.attendance} 
                sx={{ height: 8, borderRadius: 4 }}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AttendanceTracker;