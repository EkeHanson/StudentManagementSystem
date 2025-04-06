// src/components/dashboard/views/ClassesSubjectsView.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Chip } from '@mui/material';
import { School } from '@mui/icons-material';
import TeacherClasses from '../TeacherClasses';
import { useMediaQuery } from '@mui/material';

const ClassesSubjectsView = ({ isMobile, teacherData }) => {
  
  const subjects = [
    { name: 'Mathematics', classes: ['Grade 10A', 'Grade 10B'], students: 52 },
    { name: 'Physics', classes: ['Grade 11A', 'Grade 11B'], students: 48 },
    { name: 'Science Club', classes: ['All Grades'], students: 32 },
    { name: 'Advisory', classes: ['Grade 10A'], students: 26 }
  ];


  return (
    <Box>
      <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: 600, mb: isMobile ? 1 : 3 }}>
        Your Classes & Subjects
      </Typography>
      
      <Grid container spacing={isMobile ? 1 : 3} sx={{ mb: isMobile ? 2 : 4 }}>
        {subjects.map((subject, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper sx={{ p: isMobile ? 1.5 : 3 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: isMobile ? 1 : 2 
              }}>
                <School color="primary" sx={{ mr: isMobile ? 1 : 2 }} />
                <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: 600 }}>
                  {subject.name}
                </Typography>
              </Box>
              
              <Box sx={{ mb: isMobile ? 1 : 2 }}>
                <Typography variant={isMobile ? "caption" : "subtitle2"} color="text.secondary">
                  Classes Assigned:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                  {subject.classes.map((cls, i) => (
                    <Chip key={i} label={cls} size="small" sx={{ fontSize: isMobile ? '0.7rem' : '0.8125rem' }} />
                  ))}
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant={isMobile ? "caption" : "body2"} color="text.secondary">
                  Total Students: {subject.students}
                </Typography>
                <Typography variant={isMobile ? "caption" : "body2"} color="text.secondary">
                  Avg. Score: 85.6%
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {teacherData && (
        <>
          <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: 600, mb: isMobile ? 1 : 3 }}>
            Class Performance Details
          </Typography>
          <TeacherClasses teacherData={teacherData} isMobile={isMobile} />
        </>
      )}
    </Box>
  );
};

export default ClassesSubjectsView;