// src/components/students/IDCardGenerator.jsx
import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';

const IDCardGenerator = ({ selectedStudent }) => {
  if (!selectedStudent) {
    return <Typography>Select a student to generate ID card</Typography>;
  }

  return (
    <Card sx={{ maxWidth: 300, mx: 'auto', p: 2 }}>
      <CardContent>
        <Box sx={{ textAlign: 'center' }}>
          <Avatar
            src={selectedStudent.photo}
            sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
          />
          <Typography variant="h6">{selectedStudent.name}</Typography>
          <Typography color="text.secondary">
            Student ID: {selectedStudent.id}
          </Typography>
          <Typography>Class: {selectedStudent.class}</Typography>
          <Typography>Section: {selectedStudent.section}</Typography>
          <Typography>DOB: {selectedStudent.dob}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default IDCardGenerator;