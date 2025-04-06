// src/components/dashboard/teacherViews/PerformanceView.jsx
import React from 'react';
import { 
  Box, Typography, Grid, Paper, List, ListItem, 
  ListItemText, ListItemAvatar, Avatar, LinearProgress,
  useTheme
} from '@mui/material';
import { 
  TrendingUp, TrendingDown, Equalizer, 
  School, EmojiEvents, Warning 
} from '@mui/icons-material';
import { useMediaQuery } from '@mui/material';

const PerformanceView = ({ isMobile, teacherData }) => {
  const theme = useTheme();
  
  // Calculate performance metrics from teacherData
  const calculatePerformanceData = () => {
    if (!teacherData || !teacherData.subjects) {
      return {
        classPerformance: {
          averageScore: 0,
          improvement: 0,
          subjects: []
        },
        topPerformers: [],
        bottomPerformers: [],
        termProgress: []
      };
    }

    // Calculate class performance
    const subjects = teacherData.subjects.map(subject => {
      const scores = subject.studentPerformance.map(s => s.averageScore);
      const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      return {
        name: subject.name,
        score: Math.round(average),
        trend: 'up' // Simplified - could compare to previous data
      };
    });

    const overallAverage = subjects.reduce((sum, s) => sum + s.score, 0) / subjects.length;

    // Get top and bottom performers across all subjects
    const allStudents = {};
    teacherData.subjects.forEach(subject => {
      subject.studentPerformance.forEach(student => {
        if (!allStudents[student.id]) {
          allStudents[student.id] = {
            ...student,
            subjectsCount: 1,
            totalScore: student.averageScore
          };
        } else {
          allStudents[student.id].subjectsCount += 1;
          allStudents[student.id].totalScore += student.averageScore;
        }
      });
    });

    const studentsArray = Object.values(allStudents).map(student => ({
      ...student,
      overallAverage: student.totalScore / student.subjectsCount
    }));

    // Sort by performance
    studentsArray.sort((a, b) => b.overallAverage - a.overallAverage);

    const topPerformers = studentsArray.slice(0, 3).map(student => ({
      name: student.name,
      score: Math.round(student.overallAverage),
      improvement: Math.round(Math.random() * 8), // Mock improvement
      avatar: student.name.split(' ').map(n => n[0]).join('')
    }));

    const bottomPerformers = studentsArray.slice(-3).map(student => ({
      name: student.name,
      score: Math.round(student.overallAverage),
      improvement: -Math.round(Math.random() * 3), // Mock negative improvement
      avatar: student.name.split(' ').map(n => n[0]).join('')
    }));

    // Mock term progress (would normally come from historical data)
    const termProgress = [
      { week: 'Week 1', progress: 20 },
      { week: 'Week 2', progress: 45 },
      { week: 'Week 3', progress: 60 },
      { week: 'Week 4', progress: 75 },
      { week: 'Week 5', progress: 85 },
      { week: 'Week 6', progress: 92 },
    ];

    return {
      classPerformance: {
        averageScore: Math.round(overallAverage),
        improvement: 5.2, // Would normally calculate from historical data
        subjects
      },
      topPerformers,
      bottomPerformers,
      termProgress
    };
  };

  const {
    classPerformance,
    topPerformers,
    bottomPerformers,
    termProgress
  } = calculatePerformanceData();

  return (
    <Box sx={{ p: isMobile ? 1 : 2 }}>
      <Typography 
        variant={isMobile ? "h6" : "h5"} 
        sx={{ 
          fontWeight: 600, 
          mb: isMobile ? 2 : 3,
          color: 'text.primary'
        }}
      >
        Performance Analytics
      </Typography>
      
      <Grid container spacing={isMobile ? 2 : 3}>
        {/* Class Performance Overview */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: isMobile ? 2 : 3, 
            height: '100%',
            borderRadius: 2,
            boxShadow: theme.shadows[2]
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 2,
              gap: 1
            }}>
              <Equalizer color="primary" />
              <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: 600 }}>
                Class Performance Overview
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Class Average
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {classPerformance.averageScore}%
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  color: classPerformance.improvement >= 0 ? 'success.main' : 'error.main'
                }}>
                  {classPerformance.improvement >= 0 ? (
                    <TrendingUp fontSize="small" />
                  ) : (
                    <TrendingDown fontSize="small" />
                  )}
                  <Typography variant="body2" sx={{ ml: 0.5 }}>
                    {Math.abs(classPerformance.improvement)}% from last term
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                By Subject
              </Typography>
              {classPerformance.subjects.map((subject, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">{subject.name}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {subject.score}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={subject.score} 
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: theme.palette.grey[300],
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: subject.trend === 'up' ? 
                          theme.palette.success.main : 
                          theme.palette.error.main,
                        borderRadius: 4
                      }
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
        
        {/* Top & Bottom Performers */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: isMobile ? 2 : 3, 
            height: '100%',
            borderRadius: 2,
            boxShadow: theme.shadows[2]
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 2,
              gap: 1
            }}>
              <School color="primary" />
              <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: 600 }}>
                Top & Bottom Performers
              </Typography>
            </Box>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ 
                  p: 2, 
                  backgroundColor: theme.palette.success.light,
                  borderRadius: 2
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 1,
                    gap: 1
                  }}>
                    <EmojiEvents sx={{ color: theme.palette.success.dark }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Top 3 Students
                    </Typography>
                  </Box>
                  <List dense>
                    {topPerformers.map((student, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ 
                            bgcolor: theme.palette.success.main,
                            color: theme.palette.common.white,
                            width: 32, 
                            height: 32,
                            fontSize: '0.8rem'
                          }}>
                            {student.avatar}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={student.name}
                          secondary={`Score: ${student.score}% (+${student.improvement})`}
                          primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                          secondaryTypographyProps={{ variant: 'caption' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Paper sx={{ 
                  p: 2, 
                  backgroundColor: theme.palette.error.light,
                  borderRadius: 2
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 1,
                    gap: 1
                  }}>
                    <Warning sx={{ color: theme.palette.error.dark }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Needs Improvement
                    </Typography>
                  </Box>
                  <List dense>
                    {bottomPerformers.map((student, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ 
                            bgcolor: theme.palette.error.main,
                            color: theme.palette.common.white,
                            width: 32, 
                            height: 32,
                            fontSize: '0.8rem'
                          }}>
                            {student.avatar}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={student.name}
                          secondary={`Score: ${student.score}% (${student.improvement >= 0 ? '+' : ''}${student.improvement})`}
                          primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                          secondaryTypographyProps={{ variant: 'caption' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        {/* Term Progress */}
        <Grid item xs={12}>
          <Paper sx={{ 
            p: isMobile ? 2 : 3, 
            borderRadius: 2,
            boxShadow: theme.shadows[2]
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 2,
              gap: 1
            }}>
              <TrendingUp color="primary" />
              <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: 600 }}>
                Term Progress
              </Typography>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row',
              gap: 2,
              alignItems: 'center'
            }}>
              <Box sx={{ 
                width: isMobile ? '100%' : '70%',
                height: isMobile ? 150 : 200,
                position: 'relative'
              }}>
                <Box sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  display: 'flex',
                  alignItems: 'flex-end',
                  height: '100%',
                  gap: '4%'
                }}>
                  {termProgress.map((week, index) => (
                    <Box key={index} sx={{ 
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}>
                      <Box sx={{
                        width: '100%',
                        height: `${week.progress}%`,
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: '4px 4px 0 0',
                        transition: 'height 0.5s ease',
                        position: 'relative'
                      }}>
                        <Box sx={{
                          position: 'absolute',
                          top: -24,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontSize: '0.7rem',
                          fontWeight: 500,
                          color: theme.palette.text.primary
                        }}>
                          {week.progress}%
                        </Box>
                      </Box>
                      <Typography variant="caption" sx={{ mt: 1 }}>
                        {week.week}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
              
              <Box sx={{ 
                width: isMobile ? '100%' : '30%',
                p: 2,
                backgroundColor: theme.palette.grey[100],
                borderRadius: 2
              }}>
                <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                  Progress Summary
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Class performance has improved steadily throughout the term, with a 72% increase in average scores since Week 1.
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 1,
                  mb: 1
                }}>
                  <TrendingUp color="success" />
                  <Typography variant="body2">
                    <strong>22%</strong> above last term's average
                  </Typography>
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 1
                }}>
                  <EmojiEvents color="primary" />
                  <Typography variant="body2">
                    <strong>8 students</strong> achieved perfect scores
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PerformanceView;