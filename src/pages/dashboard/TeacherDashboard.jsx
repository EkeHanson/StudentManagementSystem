// src/pages/dashboard/TeacherDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Container, Typography, Box, Grid, Paper, Tabs, Tab,
  Avatar, useMediaQuery, useTheme, Select, MenuItem
} from '@mui/material';
import {
  CalendarToday,
  Assignment,
  School,
  BarChart,
  Schedule,
  Class,
  Groups,
  Task
} from '@mui/icons-material';

import TimetableView from '../../components/dashboard/teacherViews/TimetableView';
import DutiesView from '../../components/dashboard/teacherViews/DutiesView';
import ClassesSubjectsView from '../../components/dashboard/teacherViews/ClassesSubjectsView';
import PerformanceView from '../../components/dashboard/teacherViews/PerformanceView';

const TeacherDashboard = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [timetableData, setTimetableData] = useState([]);
  const [assignedDuties, setAssignedDuties] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [teacherData, setTeacherData] = useState(null);

  // Mock data for timetable
  useEffect(() => {
    const mockTimetable = [
      { day: 'Monday', periods: [
        { time: '8:00-9:00', subject: 'Mathematics', class: 'Grade 10A', type: 'Lecture' },
        { time: '9:00-10:00', subject: 'Mathematics', class: 'Grade 10B', type: 'Lecture' },
        { time: '10:30-11:30', subject: 'Science', class: 'Grade 10A', type: 'Lab' },
        { time: '11:30-12:30', subject: 'Science', class: 'Grade 10B', type: 'Lecture' }
      ]},
      { day: 'Tuesday', periods: [
        { time: '8:00-9:00', subject: 'Physics', class: 'Grade 11A', type: 'Lecture' },
        { time: '10:00-11:00', subject: 'Advisory', class: 'Grade 10A', type: 'Meeting' }
      ]},
      { day: 'Wednesday', periods: [
        { time: '8:00-9:00', subject: 'Mathematics', class: 'Grade 10A', type: 'Tutorial' },
        { time: '11:00-12:00', subject: 'Science Club', class: 'All Grades', type: 'Activity' }
      ]},
      { day: 'Thursday', periods: [
        { time: '9:00-11:00', subject: 'Department Meeting', type: 'Meeting' },
        { time: '11:30-12:30', subject: 'Physics', class: 'Grade 11B', type: 'Lab' }
      ]},
      { day: 'Friday', periods: [
        { time: '8:00-10:00', subject: 'Examination Supervision', class: 'Hall A', type: 'Duty' },
        { time: '10:30-11:30', subject: 'Mathematics', class: 'Grade 10B', type: 'Lecture' }
      ]}
    ];

    const mockDuties = [
      { title: 'Examination Supervisor', frequency: 'Termly', description: 'Supervise final term examinations' },
      { title: 'Science Club Coordinator', frequency: 'Weekly', description: 'Organize club activities and competitions' },
      { title: 'Grade 10A Advisor', frequency: 'Daily', description: 'Provide guidance to Grade 10A students' },
      { title: 'Staff Development Committee', frequency: 'Monthly', description: 'Plan professional development activities' }
    ];

    setTimetableData(mockTimetable);
    setAssignedDuties(mockDuties);
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

    useEffect(() => {
      // Mock data with 10 students
      const mockData = {
        name: 'Jane Smith',
        subjects: [
          {
            name: 'Mathematics',
            schedule: [
              { day: 'Monday', time: '9:00 AM - 10:00 AM', frequency: 2 },
              { day: 'Wednesday', time: '1:00 PM - 2:00 PM', frequency: 2 },
            ],
            students: 10,
            studentPerformance: [
              { id: 'STU-1001', name: 'John Doe', assignments: 85, classwork: 90, exam1: 90, exam2: 92, exam3: 87 },
              { id: 'STU-1002', name: 'Jane Doe', assignments: 78, classwork: 12, exam1: 85, exam2: 80, exam3: 83 },
              { id: 'STU-1003', name: 'Mike Johnson', assignments: 92, classwork: 88, exam1: 90, exam2: 85, exam3: 89 },
              { id: 'STU-1004', name: 'Sarah Williams', assignments: 75, classwork: 80, exam1: 78, exam2: 12, exam3: 79 },
              { id: 'STU-1005', name: 'David Brown', assignments: 88, classwork: 85, exam1: 90, exam2: 87, exam3: 89 },
              { id: 'STU-1006', name: 'Emily Davis', assignments: 12, classwork: 78, exam1: 85, exam2: 80, exam3: 83 },
              { id: 'STU-1007', name: 'Robert Wilson', assignments: 90, classwork: 92, exam1: 88, exam2: 85, exam3: 91 },
              { id: 'STU-1008', name: 'Jennifer Taylor', assignments: 30, classwork: 82, exam1: 85, exam2: 80, exam3: 83 },
              { id: 'STU-1009', name: 'Thomas Anderson', assignments: 85, classwork: 88, exam1: 90, exam2: 87, exam3: 89 },
              { id: 'STU-1010', name: 'Lisa Martinez', assignments: 80, classwork: 85, exam1: 82, exam2: 88, exam3: 84 }
            ]
          },
          {
            name: 'Science',
            schedule: [
              { day: 'Tuesday', time: '10:00 AM - 11:00 AM', frequency: 1 },
              { day: 'Friday', time: '2:00 PM - 3:00 PM', frequency: 1 },
            ],
            students: 12,
            studentPerformance: [
              { id: 'STU-1001', name: 'John Doe', assignments: 88, classwork: 85, exam1: 90, exam2: 87, exam3: 89 },
              { id: 'STU-1002', name: 'Jane Doe', assignments: 82, classwork: 78, exam1: 85, exam2: 80, exam3: 83 },
              { id: 'STU-1003', name: 'Mike Johnson', assignments: 90, classwork: 92, exam1: 88, exam2: 85, exam3: 91 },
              { id: 'STU-1004', name: 'Sarah Williams', assignments: 75, classwork: 80, exam1: 78, exam2: 82, exam3: 30 },
              { id: 'STU-1005', name: 'David Brown', assignments: 85, classwork: 88, exam1: 90, exam2: 87, exam3: 89 },
              { id: 'STU-1006', name: 'Emily Davis', assignments: 80, classwork: 85, exam1: 82, exam2: 88, exam3: 50 },
              { id: 'STU-1007', name: 'Robert Wilson', assignments: 92, classwork: 88, exam1: 90, exam2: 85, exam3: 89 },
              { id: 'STU-1008', name: 'Jennifer Taylor', assignments: 78, classwork: 82, exam1: 85, exam2: 80, exam3: 83 },
              { id: 'STU-1008', name: 'Ikor Taylor', assignments: 78, classwork: 82, exam1: 45, exam2: 80, exam3: 83 },
              { id: 'STU-1009', name: 'Emily Anderson', assignments: 45, classwork: 90, exam1: 90, exam2: 92, exam3: 87 },
              { id: 'STU-1009', name: 'Thomas Anderson', assignments: 85, classwork: 90, exam1: 88, exam2: 92, exam3: 87 },
              { id: 'STU-1010', name: 'Lisa Martinez', assignments: 30, classwork: 82, exam1: 85, exam2: 80, exam3: 83 }
            ]
          },
          {
            name: 'Creative Arts',
            schedule: [
              { day: 'Monday', time: '8:00 AM - 9:00 AM', frequency: 1 },
              { day: 'Thursday', time: '2:00 PM - 3:00 PM', frequency: 1 },
              { day: 'Friday', time: '3:00 PM - 4:00 PM', frequency: 1 },
            ],
            students: 8,
            studentPerformance: [
              { id: 'STU-1001', name: 'Ikwut Emily', assignments: 88, classwork: 45, exam1: 90, exam2: 87, exam3: 89 },
              { id: 'STU-1002', name: 'Joesph Stanley', assignments: 82, classwork: 78, exam1: 45, exam2: 80, exam3: 83 },
              { id: 'STU-1003', name: 'Benedict Raphael', assignments: 90, classwork: 92, exam1: 88, exam2: 45, exam3: 91 },
              { id: 'STU-1004', name: 'Sarah Williams', assignments: 75, classwork: 80, exam1: 78, exam2: 82, exam3: 79 },
              { id: 'STU-1005', name: 'Ikwut Brown', assignments: 45, classwork: 88, exam1: 90, exam2: 87, exam3: 89 },
              { id: 'STU-1006', name: 'Emily Davis', assignments: 80, classwork: 45, exam1: 82, exam2: 88, exam3: 50 },
              { id: 'STU-1007', name: 'Benedict Ikwut', assignments: 92, classwork: 90, exam1: 90, exam2: 45, exam3: 89 },
              { id: 'STU-1010', name: 'Joesph Thomas', assignments: 79, classwork: 82, exam1: 45, exam2: 80, exam3: 83 }
            ]
          },
        ]
      };
  
      // Calculate all scores programmatically
      const calculateSubjectScores = (subject) => {
        subject.studentPerformance.forEach((student) => {
          student.totalScore = student.assignments + student.classwork + student.exam1 + student.exam2 + student.exam3;
          student.averageScore = student.totalScore / 5;
        });
        
        subject.subjectTotalScore = subject.studentPerformance.reduce((sum, s) => sum + s.totalScore, 0);
        subject.subjectAverageScore = subject.subjectTotalScore / (5 * subject.studentPerformance.length);
        
        return subject;
      };
  
      const processedData = {
        ...mockData,
        subjects: mockData.subjects.map(calculateSubjectScores)
      };
  
      setTeacherData(processedData);
    }, []);
  

  // Stats cards data
  const stats = [
    { icon: <Class fontSize={isMobile ? "medium" : "large"} />, value: '6', label: 'Subjects' },
    { icon: <Groups fontSize={isMobile ? "medium" : "large"} />, value: '4', label: 'Classes' },
    { icon: <CalendarToday fontSize={isMobile ? "medium" : "large"} />, value: '22', label: 'Weekly Periods' },
    { icon: <Task fontSize={isMobile ? "medium" : "large"} />, value: '4', label: 'Assigned Duties' }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: isMobile ? 2 : 3, px: isMobile ? 1 : 3 }}>
      {/* Header Section */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row', 
        justifyContent: 'space-between', 
        alignItems: isMobile ? 'flex-start' : 'center',
        mb: isMobile ? 2 : 4,
        gap: isMobile ? 2 : 0
      }}>
        <Box>
          <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: 600 }}>
            Teacher Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5 }}>
            Welcome back, {currentUser?.name || 'Teacher'}
          </Typography>
        </Box>
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          mt: isMobile ? 0 : 0,
          width: isMobile ? '100%' : 'auto',
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          <Paper sx={{ 
            p: isMobile ? 1.5 : 2, 
            display: 'flex', 
            alignItems: 'center', 
            flex: 1,
            minWidth: isMobile ? '100%' : 200
          }}>
            <CalendarToday color="primary" sx={{ mr: 1, fontSize: isMobile ? 'small' : 'medium' }} />
            <Box>
              <Typography variant={isMobile ? "caption" : "body2"}>Current Term</Typography>
              <Typography variant={isMobile ? "body2" : "subtitle1"}>First Term 2023</Typography>
            </Box>
          </Paper>
          <Paper sx={{ 
            p: isMobile ? 1.5 : 2, 
            display: 'flex', 
            alignItems: 'center', 
            flex: 1,
            minWidth: isMobile ? '100%' : 200
          }}>
            <Schedule color="primary" sx={{ mr: 1, fontSize: isMobile ? 'small' : 'medium' }} />
            <Box>
              <Typography variant={isMobile ? "caption" : "body2"}>Week</Typography>
              <Typography variant={isMobile ? "body2" : "subtitle1"}>Week 12 of 14</Typography>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={isMobile ? 1 : 3} sx={{ mb: isMobile ? 2 : 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={6} sm={6} md={3} key={index}>
            <Paper sx={{ 
              p: isMobile ? 1.5 : 3, 
              display: 'flex', 
              alignItems: 'center',
              height: '100%',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: theme.shadows[6]
              }
            }}>
              <Box sx={{ 
                mr: isMobile ? 1.5 : 3, 
                color: theme.palette.primary.main,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: isMobile ? 40 : 60,
                height: isMobile ? 40 : 60,
                borderRadius: '50%',
                backgroundColor: theme.palette.primary.light,
                flexShrink: 0
              }}>
                {stat.icon}
              </Box>
              <Box>
                <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: 700 }}>{stat.value}</Typography>
                <Typography variant={isMobile ? "caption" : "body2"} color="text.secondary">{stat.label}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Main Content Tabs */}
      <Paper sx={{ mb: isMobile ? 1 : 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          variant={isMobile ? 'scrollable' : 'standard'}
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            '& .MuiTabs-indicator': {
              height: 3,
              backgroundColor: theme.palette.primary.main
            }
          }}
        >
          <Tab label={isMobile ? "" : "Timetable"} icon={<CalendarToday fontSize={isMobile ? "small" : "medium"} />} iconPosition={isMobile ? "top" : "start"} />
          <Tab label={isMobile ? "" : "Duties"} icon={<Assignment fontSize={isMobile ? "small" : "medium"} />} iconPosition={isMobile ? "top" : "start"} />
          <Tab label={isMobile ? "" : "Classes"} icon={<School fontSize={isMobile ? "small" : "medium"} />} iconPosition={isMobile ? "top" : "start"} />
          <Tab label={isMobile ? "" : "Analytics"} icon={<BarChart fontSize={isMobile ? "small" : "medium"} />} iconPosition={isMobile ? "top" : "start"} />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      <Box sx={{ pt: isMobile ? 1 : 2 }}>
        {activeTab === 0 && (
          <TimetableView data={timetableData} isMobile={isMobile} />
        )}
        
        {activeTab === 1 && (
          <DutiesView data={assignedDuties} isMobile={isMobile} />
        )}
        
        {activeTab === 2 && (
          <ClassesSubjectsView isMobile={isMobile} teacherData={teacherData}/>
        )}
          
        {activeTab === 3 && (
          <PerformanceView isMobile={isMobile} teacherData={teacherData} />
        )}
      </Box>
    </Container>
  );
};

export default TeacherDashboard;