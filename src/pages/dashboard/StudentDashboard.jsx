// src/pages/dashboard/StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Container,
  Typography,
  Grid,
  Box,
  Divider,
  CircularProgress,
  Avatar,
  Chip,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Badge,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  School as SchoolIcon,
  Event as EventIcon,
  Notifications as NotificationsIcon,
  Book as BookIcon,
  Grade as GradeIcon,
  CalendarToday as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  MenuBook as MenuBookIcon,
  MoreVert as MoreVertIcon,
  Today as TodayIcon,
  AccessTime as AccessTimeIcon,
  FilterAlt as FilterIcon
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';

// Custom components
const StatCard = ({ title, value, icon, color, trend }) => {
  const trendColor = trend > 0 ? 'success' : trend < 0 ? 'error' : 'warning';
  return (
    <Card 
      sx={{ 
        height: '100%',
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)'
        }
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight={700}>
              {value}
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: `${color}.light`, color: `${color}.dark` }}>
            {icon}
          </Avatar>
        </Box>
        {trend !== undefined && (
          <Box mt={1} display="flex" alignItems="center">
            <Typography 
              variant="caption" 
              color={trendColor} 
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {trend > 0 ? `+${trend}%` : `${trend}%`}
              <TrendingUpIcon 
                fontSize="small" 
                sx={{ 
                  ml: 0.5,
                  transform: trend < 0 ? 'rotate(180deg)' : 'none'
                }} 
              />
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
              vs last month
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

const AssignmentCard = ({ assignment }) => {
  const dueDate = new Date(assignment.dueDate);
  const daysLeft = Math.ceil((dueDate - new Date()) / (1000 * 60 * 60 * 24));
  
  return (
    <motion.div whileHover={{ y: -2 }}>
      <Card sx={{ mb: 2, borderRadius: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                {assignment.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {assignment.subject}
              </Typography>
            </Box>
            <IconButton size="small">
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Box>
          
          <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
            <Chip
              size="small"
              label={daysLeft > 0 ? `Due in ${daysLeft} day${daysLeft > 1 ? 's' : ''}` : 'Due today'}
              color={daysLeft <= 2 ? 'error' : daysLeft <= 5 ? 'warning' : 'primary'}
              variant="outlined"
              icon={<AccessTimeIcon fontSize="small" />}
            />
            <Button 
              variant="contained" 
              size="small" 
              sx={{ borderRadius: 5 }}
              startIcon={<MenuBookIcon fontSize="small" />}
            >
              Start
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ScheduleCard = ({ day, subjects = {} }) => {
  return (
    <Card sx={{ mb: 1, borderRadius: 3 }}>
      <CardContent sx={{ p: 2 }}>
        <Typography variant="subtitle2" fontWeight={600} color="text.secondary" gutterBottom>
          {day}
        </Typography>
        {Object.entries(subjects).length > 0 ? (
          <Box display="flex" justifyContent="space-between" flexWrap="wrap">
            {Object.entries(subjects).map(([period, subject]) => (
              <Chip
                key={period}
                label={subject}
                size="small"
                sx={{ mb: 1, mr: 1 }}
                variant="outlined"
                color="primary"
              />
            ))}
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No classes scheduled
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const AcademicRecordsFilter = ({ filters, setFilters, academicYears, gradeLevels }) => {
  return (
    <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <CardHeader
        title="Filter Academic Records"
        avatar={<FilterIcon color="primary" />}
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Academic Year</InputLabel>
              <Select
                value={filters.academicYear}
                label="Academic Year"
                onChange={(e) => setFilters({...filters, academicYear: e.target.value})}
              >
                {academicYears.map((year) => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Term</InputLabel>
              <Select
                value={filters.term}
                label="Term"
                onChange={(e) => setFilters({...filters, term: e.target.value})}
              >
                <MenuItem value="First Term">First Term</MenuItem>
                <MenuItem value="Second Term">Second Term</MenuItem>
                <MenuItem value="Third Term">Third Term</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Grade Level</InputLabel>
              <Select
                value={filters.gradeLevel}
                label="Grade Level"
                onChange={(e) => setFilters({...filters, gradeLevel: e.target.value})}
              >
                {gradeLevels.map((grade) => (
                  <MenuItem key={grade} value={grade}>{grade}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const AcademicRecordsTable = ({ records, academicYear, term, gradeLevel }) => {
  // Calculate summary data
  const calculateSummary = (records) => {
    const total = records.reduce((sum, record) => sum + record.total, 0);
    const average = total / records.length;
    return { total, average };
  };

  const summary = calculateSummary(records);
  const position = Math.floor(Math.random() * 20) + 1; // Random position for demo

  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell align="right">Test Score</TableCell>
              <TableCell align="right">Exam Score</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Grade</TableCell>
              <TableCell>Remarks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.subject}>
                <TableCell component="th" scope="row">
                  {record.subject}
                </TableCell>
                <TableCell align="right">{record.testScore}</TableCell>
                <TableCell align="right">{record.examScore}</TableCell>
                <TableCell align="right">{record.total}</TableCell>
                <TableCell align="right">
                  <Chip 
                    label={record.grade} 
                    size="small" 
                    color={
                      record.grade === 'A' ? 'success' : 
                      record.grade === 'B' ? 'primary' : 
                      record.grade === 'C' ? 'warning' : 'error'
                    } 
                  />
                </TableCell>
                <TableCell>{record.remarks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Summary Section */}
      <Card sx={{ mt: 3, borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <CardHeader
          title={`Term Summary - ${term}`}
          subheader={`${academicYear} | Grade ${gradeLevel}`}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ p: 2, backgroundColor: 'action.hover', borderRadius: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Grand Total
                </Typography>
                <Typography variant="h5" fontWeight={700}>
                  {summary.total}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ p: 2, backgroundColor: 'action.hover', borderRadius: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Average Score
                </Typography>
                <Typography variant="h5" fontWeight={700}>
                  {summary.average.toFixed(1)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ p: 2, backgroundColor: 'action.hover', borderRadius: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Class Position
                </Typography>
                <Typography variant="h5" fontWeight={700}>
                  {position}{position === 1 ? 'st' : position === 2 ? 'nd' : position === 3 ? 'rd' : 'th'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

// Dummy data
const dashboardData = {
  student: {
    name: 'Alex Johnson',
    avatar: '/static/images/avatar/2.jpg',
    grade: '11B',
    email: 'alex.johnson@school.edu',
    id: 'STU2023015'
  },
  stats: {
    attendance: 94,
    performance: 89,
    assignments: 3,
    streak: 7
  },
  performanceTrend: [
    { month: 'Jan', score: 82 },
    { month: 'Feb', score: 85 },
    { month: 'Mar', score: 87 },
    { month: 'Apr', score: 89 }
  ],
  subjectPerformance: [
    { subject: 'Math', score: 85, progress: 75 },
    { subject: 'Science', score: 92, progress: 82 },
    { subject: 'English', score: 88, progress: 78 },
    { subject: 'History', score: 81, progress: 65 },
    { subject: 'CS', score: 95, progress: 90 }
  ],
  assignments: [
    { id: 1, title: 'Algebra Problem Set', subject: 'Math', dueDate: '2025-04-08', status: 'pending' },
    { id: 2, title: 'Chemistry Lab Report', subject: 'Science', dueDate: '2025-04-10', status: 'in-progress' },
    { id: 3, title: 'Literary Analysis', subject: 'English', dueDate: '2025-04-12', status: 'pending' }
  ],
  announcements: [
    { id: 1, title: 'Science Fair Registration', date: '2025-04-05', read: false },
    { id: 2, title: 'Library Extended Hours', date: '2025-04-03', read: true },
    { id: 3, title: 'Career Day Speakers', date: '2025-04-01', read: true }
  ],
  schedule: {
    Monday: { '1st': 'Math', '2nd': 'Science', '3rd': 'English', '4th': 'History' },
    Tuesday: { '1st': 'English', '2nd': 'Math', '3rd': 'CS', '4th': 'PE' },
    Wednesday: { '1st': 'Science', '2nd': 'History', '3rd': 'Math', '4th': 'Arts' },
    Thursday: { '1st': 'CS', '2nd': 'English', '3rd': 'Science', '4th': 'Math' },
    Friday: { '1st': 'History', '2nd': 'CS', '3rd': 'English', '4th': 'Science' }
  },
  academicRecords: {
    '2024-2025': {
      'First Term': {
        '11B': [
          { subject: 'Mathematics', testScore: 38, examScore: 52, total: 90, grade: 'A', remarks: 'Excellent performance' },
          { subject: 'English', testScore: 35, examScore: 48, total: 83, grade: 'B', remarks: 'Good writing skills' },
          { subject: 'Physics', testScore: 40, examScore: 45, total: 85, grade: 'A', remarks: 'Very good understanding' },
          { subject: 'Chemistry', testScore: 32, examScore: 50, total: 82, grade: 'B', remarks: 'Needs more practice' },
          { subject: 'Biology', testScore: 36, examScore: 47, total: 83, grade: 'B', remarks: 'Good effort' }
        ]
      },
      'Second Term': {
        '11B': [
          { subject: 'Mathematics', testScore: 40, examScore: 55, total: 95, grade: 'A', remarks: 'Outstanding performance' },
          { subject: 'English', testScore: 36, examScore: 50, total: 86, grade: 'A', remarks: 'Excellent improvement' },
          { subject: 'Physics', testScore: 38, examScore: 48, total: 86, grade: 'A', remarks: 'Consistent performance' },
          { subject: 'Chemistry', testScore: 35, examScore: 48, total: 83, grade: 'B', remarks: 'Improved from last term' },
          { subject: 'Biology', testScore: 34, examScore: 49, total: 83, grade: 'B', remarks: 'Good work' }
        ]
      }
    },
    '2023-2024': {
      'First Term': {
        '10A': [
          { subject: 'Mathematics', testScore: 35, examScore: 45, total: 80, grade: 'B', remarks: 'Good but needs more practice' },
          { subject: 'English', testScore: 30, examScore: 42, total: 72, grade: 'C', remarks: 'Average performance' },
          { subject: 'Physics', testScore: 32, examScore: 40, total: 72, grade: 'C', remarks: 'Needs improvement' },
          { subject: 'Chemistry', testScore: 28, examScore: 38, total: 66, grade: 'D', remarks: 'Needs more effort' },
          { subject: 'Biology', testScore: 34, examScore: 44, total: 78, grade: 'B', remarks: 'Good understanding' }
        ]
      },
      'Second Term': {
        '10A': [
          { subject: 'Mathematics', testScore: 38, examScore: 50, total: 88, grade: 'A', remarks: 'Significant improvement' },
          { subject: 'English', testScore: 34, examScore: 46, total: 80, grade: 'B', remarks: 'Improved writing skills' },
          { subject: 'Physics', testScore: 36, examScore: 45, total: 81, grade: 'B', remarks: 'Better understanding' },
          { subject: 'Chemistry', testScore: 32, examScore: 42, total: 74, grade: 'C', remarks: 'Needs more practice' },
          { subject: 'Biology', testScore: 36, examScore: 48, total: 84, grade: 'A', remarks: 'Excellent progress' }
        ]
      },
      'Third Term': {
        '10A': [
          { subject: 'Mathematics', testScore: 40, examScore: 52, total: 92, grade: 'A', remarks: 'Excellent performance' },
          { subject: 'English', testScore: 38, examScore: 48, total: 86, grade: 'A', remarks: 'Great improvement' },
          { subject: 'Physics', testScore: 38, examScore: 47, total: 85, grade: 'A', remarks: 'Very good understanding' },
          { subject: 'Chemistry', testScore: 35, examScore: 45, total: 80, grade: 'B', remarks: 'Good effort' },
          { subject: 'Biology', testScore: 39, examScore: 50, total: 89, grade: 'A', remarks: 'Outstanding work' }
        ]
      }
    }
  }
};

const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [activeDay, setActiveDay] = useState('Monday');
  const [filters, setFilters] = useState({
    academicYear: '2024-2025',
    term: 'First Term',
    gradeLevel: '11B'
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  
  // Get available academic years and grade levels
  const academicYears = Object.keys(dashboardData.academicRecords).sort().reverse();
  const gradeLevels = Object.keys(dashboardData.academicRecords[filters.academicYear]?.[filters.term] || [filters.gradeLevel]);
  
  // Get filtered records
  const filteredRecords = dashboardData.academicRecords[filters.academicYear]?.[filters.term]?.[filters.gradeLevel] || [];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back, {currentUser?.name || dashboardData.student.name}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Chip 
            label={`Grade ${dashboardData.student.grade}`} 
            variant="outlined" 
            size="medium"
            sx={{ mr: 2, px: 2 }}
            icon={<SchoolIcon fontSize="small" />}
          />
          <Badge badgeContent={3} color="error" overlap="circular">
            <IconButton>
              <NotificationsIcon />
            </IconButton>
          </Badge>
          <Avatar 
            src={dashboardData.student.avatar} 
            sx={{ ml: 2, width: 48, height: 48 }} 
          />
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Attendance" 
            value={`${dashboardData.stats.attendance}%`} 
            icon={<CheckCircleIcon />} 
            color="success"
            trend={2.5}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Performance" 
            value={`${dashboardData.stats.performance}%`} 
            icon={<GradeIcon />} 
            color="primary"
            trend={1.8}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Assignments" 
            value={dashboardData.stats.assignments} 
            icon={<AssignmentIcon />} 
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Day Streak" 
            value={dashboardData.stats.streak} 
            icon={<TodayIcon />} 
            color="info"
          />
        </Grid>
      </Grid>

      {/* Academic Records Section */}
      <Box mb={4}>
        <AcademicRecordsFilter 
          filters={filters} 
          setFilters={setFilters} 
          academicYears={academicYears}
          gradeLevels={gradeLevels}
        />
        <AcademicRecordsTable 
          records={filteredRecords} 
          academicYear={filters.academicYear}
          term={filters.term}
          gradeLevel={filters.gradeLevel}
        />
      </Box>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} lg={8}>
          {/* Performance Chart */}
          <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <CardHeader
              title="Performance Overview"
              subheader="Your progress over the last 4 months"
              action={
                <Tabs 
                  value={activeTab} 
                  onChange={(e, newValue) => setActiveTab(newValue)}
                  sx={{ minHeight: 40 }}
                >
                  <Tab label="Trend" sx={{ minHeight: 40, fontSize: '0.75rem' }} />
                  <Tab label="Subjects" sx={{ minHeight: 40, fontSize: '0.75rem' }} />
                </Tabs>
              }
              sx={{ pb: 0 }}
            />
            <CardContent sx={{ pt: 0 }}>
              <Box height={300}>
                <ResponsiveContainer width="100%" height="100%">
                  {activeTab === 0 ? (
                    <LineChart data={dashboardData.performanceTrend}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis domain={[75, 100]} axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ 
                          borderRadius: 12,
                          boxShadow: theme.shadows[3],
                          border: 'none'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke={theme.palette.primary.main} 
                        strokeWidth={3}
                        dot={{ r: 4, fill: theme.palette.primary.main }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                      />
                    </LineChart>
                  ) : (
                    <BarChart data={dashboardData.subjectPerformance}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="subject" axisLine={false} tickLine={false} />
                      <YAxis domain={[60, 100]} axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ 
                          borderRadius: 12,
                          boxShadow: theme.shadows[3],
                          border: 'none'
                        }}
                      />
                      <Bar 
                        dataKey="score" 
                        fill={theme.palette.primary.main} 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>

          {/* Assignments */}
          <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <CardHeader
              title="Upcoming Assignments"
              action={
                <Button 
                  variant="text" 
                  size="small" 
                  endIcon={<EventIcon fontSize="small" />}
                  sx={{ textTransform: 'none' }}
                >
                  View all
                </Button>
              }
            />
            <CardContent>
              {dashboardData.assignments.map(assignment => (
                <AssignmentCard key={assignment.id} assignment={assignment} />
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} lg={4}>
          {/* Today's Schedule */}
          <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <CardHeader
              title="Today's Schedule"
              subheader={today}
              avatar={<CalendarIcon color="primary" />}
            />
            <CardContent>
              <ScheduleCard 
                day={today} 
                subjects={dashboardData.schedule[today]} 
              />
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <CardHeader
              title="Announcements"
              action={
                <Button 
                  variant="text" 
                  size="small" 
                  sx={{ textTransform: 'none' }}
                >
                  Mark all as read
                </Button>
              }
            />
            <CardContent>
              {dashboardData.announcements.map(announcement => (
                <motion.div key={announcement.id} whileHover={{ x: 2 }}>
                  <Box 
                    sx={{ 
                      mb: 2, 
                      p: 2, 
                      borderRadius: 2,
                      backgroundColor: announcement.read ? 'transparent' : 'action.hover',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography fontWeight={600}>{announcement.title}</Typography>
                      {!announcement.read && (
                        <Box 
                          component="span" 
                          sx={{ 
                            width: 8, 
                            height: 8, 
                            borderRadius: '50%', 
                            bgcolor: 'primary.main' 
                          }} 
                        />
                      )}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {announcement.date}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <CardHeader title="Quick Actions" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button 
                    fullWidth 
                    variant="outlined" 
                    startIcon={<BookIcon />}
                    sx={{ borderRadius: 3, py: 1.5 }}
                    onClick={() => navigate('/resources')} // Add navigation
                  >
                    Resources
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button 
                    fullWidth 
                    variant="outlined" 
                    startIcon={<GradeIcon />}
                    sx={{ borderRadius: 3, py: 1.5 }}
                    onClick={() => navigate('/grades')}
                  >
                    Grades
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button 
                    fullWidth 
                    variant="outlined" 
                    startIcon={<SchoolIcon />}
                    sx={{ borderRadius: 3, py: 1.5 }}
                    onClick={() => navigate('/classes')}
                  >
                    Classes
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button 
                    fullWidth 
                    variant="outlined" 
                    startIcon={<CalendarIcon />}
                    sx={{ borderRadius: 3, py: 1.5 }}
                    onClick={() => navigate('/calendar')}
                  >
                    Calendar
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StudentDashboard;