// src/components/students/ProgressReports.jsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';

const ProgressReports = ({ students }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Math</TableCell>
          <TableCell>Science</TableCell>
          <TableCell>English</TableCell>
          <TableCell>Disciplinary</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id} hover>
            <TableCell>{student.id}</TableCell>
            <TableCell>{student.name}</TableCell>
            <TableCell>{student.grades.math}</TableCell>
            <TableCell>{student.grades.science}</TableCell>
            <TableCell>{student.grades.english}</TableCell>
            <TableCell>
              {student.disciplinaryRecords.length > 0 ? (
                <Chip 
                  label={student.disciplinaryRecords.length} 
                  color="warning" 
                  size="small" 
                />
              ) : (
                <Chip label="None" color="success" size="small" />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProgressReports;