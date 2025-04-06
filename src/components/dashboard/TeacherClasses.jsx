// src/components/dashboard/TeacherClasses.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Grid,
  useMediaQuery,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Button,
  TablePagination,
  Pagination,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  ExpandMore as ExpandMoreIcon,
  Save as SaveIcon,
  FilterAlt as FilterIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

// Styled components
const ClassCard = styled(Paper)(({ theme, done }) => ({
  padding: theme.spacing(2),
  borderRadius: 12,
  marginBottom: theme.spacing(2),
  background: done
    ? 'linear-gradient(135deg, #e6ffe6 0%, #f0fff0 100%)' // Light green for done
    : 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)', // Default
  border: done ? '1px solid #b3ffb3' : '1px solid #e5e7eb',
  transition: 'box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

const TeacherClasses = ({ teacherData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State for academic filters
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('');

  // Performance data state with done status
  const [performanceData, setPerformanceData] = useState([]);
  const [expanded, setExpanded] = useState(false);

  // Pagination state (8 students per page)
  const [page, setPage] = useState({});
  const [rowsPerPage] = useState(10);

  // Search state
  const [searchQuery, setSearchQuery] = useState({});

  // Initialize academic years and terms
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 6 }, (_, i) => `${currentYear - i}-${currentYear - i + 1}`);
    setAcademicYears(years);
    setSelectedYear(years[0]);
    setSelectedTerm('First Term');
  }, []);

  // Sync performanceData with teacherData and initialize pagination/search
  useEffect(() => {
    if (teacherData && teacherData.subjects) {
      // Add done status to each subject (default to false if not present)
      const initializedData = teacherData.subjects.map(subject => ({
        ...subject,
        done: subject.done || false,
      }));
      setPerformanceData(initializedData);
      setPage(initializedData.reduce((acc, _, idx) => ({ ...acc, [idx]: 0 }), {}));
      setSearchQuery(initializedData.reduce((acc, _, idx) => ({ ...acc, [idx]: '' }), {}));
    }
  }, [teacherData]);

  const handleExpandChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleScoreChange = (subjectIdx, studentIdx, field, value) => {
    setPerformanceData((prev) => {
      const newData = [...prev];
      const student = newData[subjectIdx].studentPerformance[studentIdx];
      student[field] = Number(value) || 0;
      student.totalScore = student.assignments + student.classwork + student.exam1 + student.exam2 + student.exam3;
      student.averageScore = student.totalScore / 5;

      const subjectStudents = newData[subjectIdx].studentPerformance;
      newData[subjectIdx].subjectTotalScore = subjectStudents.reduce((sum, s) => sum + s.totalScore, 0);
      newData[subjectIdx].subjectAverageScore = newData[subjectIdx].subjectTotalScore / (5 * subjectStudents.length);
      return newData;
    });
  };

  const handleSaveScores = (subjectIdx) => {
    console.log('Saving scores for:', {
      subject: performanceData[subjectIdx].name,
      academicYear: selectedYear,
      term: selectedTerm,
      scores: performanceData[subjectIdx].studentPerformance,
    });
    // Optionally mark as done here if saving implies completion
  };

  const handleMarkAsDone = (subjectIdx) => {
    setPerformanceData((prev) => {
      const newData = [...prev];
      newData[subjectIdx].done = !newData[subjectIdx].done; // Toggle done status
      console.log(`${newData[subjectIdx].name} marked as ${newData[subjectIdx].done ? 'done' : 'not done'}`);
      return newData;
    });
  };

  const handleResetFilters = () => {
    setSelectedYear(academicYears[0]);
    setSelectedTerm('First Term');
  };

  const handlePageChange = (subjectIdx, newPage) => {
    setPage((prev) => ({ ...prev, [subjectIdx]: newPage }));
  };

  const handleSearchChange = (subjectIdx, value) => {
    setSearchQuery((prev) => ({ ...prev, [subjectIdx]: value }));
    setPage((prev) => ({ ...prev, [subjectIdx]: 0 })); // Reset to first page on search
  };

  const getFilteredStudents = (subjectIdx) => {
    const query = searchQuery[subjectIdx]?.toLowerCase() || '';
    return performanceData[subjectIdx].studentPerformance.filter(
      (student) =>
        student.name.toLowerCase().includes(query) || student.id.toLowerCase().includes(query)
    );
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            mb: { xs: 2, sm: 0 },
          }}
        >
          Your Classes
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Academic Year</InputLabel>
            <Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              label="Academic Year"
              startAdornment={<FilterIcon color="action" sx={{ mr: 1 }} />}
            >
              {academicYears.map((year) => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Term</InputLabel>
            <Select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              label="Term"
            >
              {['First Term', 'Second Term', 'Third Term'].map((term) => (
                <MenuItem key={term} value={term}>{term}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            onClick={handleResetFilters}
            startIcon={<RefreshIcon />}
            size="small"
          >
            Reset
          </Button>
        </Stack>
      </Box>

      {performanceData.length > 0 ? (
        performanceData.map((subject, subjectIdx) => {
          const filteredStudents = getFilteredStudents(subjectIdx);
          const pageStart = page[subjectIdx] * rowsPerPage;
          const pageEnd = pageStart + rowsPerPage;
          const paginatedStudents = filteredStudents.slice(pageStart, pageEnd);

          return (
            <ClassCard
              key={`${subject.name}-${selectedYear}-${selectedTerm}`}
              elevation={0}
              done={subject.done}
            >
              <Accordion
                expanded={expanded === `panel${subjectIdx}`}
                onChange={handleExpandChange(`panel${subjectIdx}`)}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      justifyContent: 'space-between',
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      width: '100%',
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}
                      >
                        {subject.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {selectedYear} | {selectedTerm}
                      </Typography>
                    </Box>
                    <Box sx={{ mt: { xs: 1, sm: 0 }, display: 'flex', alignItems: 'center' }}>
                      <Chip
                        label={`${subject.students} Students`}
                        color="primary"
                        variant="outlined"
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <Chip
                        label={`Avg: ${subject.subjectAverageScore.toFixed(1)}`}
                        color="secondary"
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      {subject.done && (
                        <Chip
                          label="Done"
                          color="success"
                          size="small"
                          icon={<CheckCircleIcon />}
                        />
                      )}
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 500, fontSize: { xs: '0.9rem', sm: '1rem' } }}
                    >
                      Schedule
                    </Typography>
                    {subject.schedule.map((slot, idx) => (
                      <Typography
                        key={idx}
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                      >
                        {slot.day}: {slot.time} (x{slot.frequency}/week)
                      </Typography>
                    ))}
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 500, fontSize: { xs: '0.9rem', sm: '1rem' } }}
                    >
                      Subject Totals
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                    >
                      Total Score: {subject.subjectTotalScore} | Average Score:{' '}
                      {subject.subjectAverageScore.toFixed(1)}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <TextField
                      label="Search Students"
                      size="small"
                      value={searchQuery[subjectIdx] || ''}
                      onChange={(e) => handleSearchChange(subjectIdx, e.target.value)}
                      InputProps={{ endAdornment: <SearchIcon color="action" /> }}
                      sx={{ width: { xs: '100%', sm: 300 } }}
                    />
                  </Box>

                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 500, mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}
                  >
                    Student Performance
                  </Typography>
                  {isMobile ? (
                    <Box>
                      {paginatedStudents.map((student, studentIdx) => (
                        <Paper
                          key={`${student.id}-${selectedYear}-${selectedTerm}`}
                          sx={{ p: 1, mb: 1, borderRadius: 8, border: '1px solid #e5e7eb' }}
                        >
                          <Grid container spacing={1}>
                            <Grid item xs={12}>
                              <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                                {student.name} ({student.id})
                              </Typography>
                            </Grid>
                            {[
                              { label: 'Assignments', field: 'assignments' },
                              { label: 'Classwork', field: 'classwork' },
                              { label: 'Exam 1', field: 'exam1' },
                              { label: 'Exam 2', field: 'exam2' },
                              { label: 'Exam 3', field: 'exam3' },
                            ].map(({ label, field }) => (
                              <Grid item xs={6} key={field}>
                                <TextField
                                  label={label}
                                  size="small"
                                  type="number"
                                  value={student[field]}
                                  onChange={(e) =>
                                    handleScoreChange(subjectIdx, pageStart + studentIdx, field, e.target.value)
                                  }
                                  inputProps={{ min: 0, max: 100 }}
                                  sx={{ width: '100%' }}
                                  disabled={subject.done} // Disable if done
                                />
                              </Grid>
                            ))}
                            <Grid item xs={6}>
                              <Typography sx={{ fontSize: '0.8rem' }}>
                                Total: {student.totalScore}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography sx={{ fontSize: '0.8rem' }}>
                                Avg: {student.averageScore.toFixed(1)}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ textAlign: 'right' }}>
                              <IconButton onClick={() => handleSaveScores(subjectIdx)} disabled={subject.done}>
                                <SaveIcon color={subject.done ? 'disabled' : 'primary'} />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Paper>
                      ))}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Pagination
                          count={Math.ceil(filteredStudents.length / rowsPerPage)}
                          page={page[subjectIdx] + 1}
                          onChange={(e, newPage) => handlePageChange(subjectIdx, newPage - 1)}
                          size="small"
                          sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}
                        />
                        <Button
                          variant="contained"
                          color={subject.done ? 'warning' : 'success'}
                          size="small"
                          startIcon={<CheckCircleIcon />}
                          onClick={() => handleMarkAsDone(subjectIdx)}
                        >
                          {subject.done ? 'Mark as Not Done' : 'Mark as Done'}
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Student ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Assignments</TableCell>
                            <TableCell align="center">Classwork</TableCell>
                            <TableCell align="center">Exam 1</TableCell>
                            <TableCell align="center">Exam 2</TableCell>
                            <TableCell align="center">Exam 3</TableCell>
                            <TableCell align="center">Total</TableCell>
                            <TableCell align="center">Average</TableCell>
                            <TableCell align="center">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {paginatedStudents.map((student, studentIdx) => (
                            <TableRow key={`${student.id}-${selectedYear}-${selectedTerm}`}>
                              <TableCell>{student.id}</TableCell>
                              <TableCell>{student.name}</TableCell>
                              <TableCell align="center">
                                <TextField
                                  size="small"
                                  type="number"
                                  value={student.assignments}
                                  onChange={(e) =>
                                    handleScoreChange(subjectIdx, pageStart + studentIdx, 'assignments', e.target.value)
                                  }
                                  inputProps={{ min: 0, max: 100 }}
                                  sx={{ width: 80 }}
                                  disabled={subject.done}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <TextField
                                  size="small"
                                  type="number"
                                  value={student.classwork}
                                  onChange={(e) =>
                                    handleScoreChange(subjectIdx, pageStart + studentIdx, 'classwork', e.target.value)
                                  }
                                  inputProps={{ min: 0, max: 100 }}
                                  sx={{ width: 80 }}
                                  disabled={subject.done}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <TextField
                                  size="small"
                                  type="number"
                                  value={student.exam1}
                                  onChange={(e) =>
                                    handleScoreChange(subjectIdx, pageStart + studentIdx, 'exam1', e.target.value)
                                  }
                                  inputProps={{ min: 0, max: 100 }}
                                  sx={{ width: 80 }}
                                  disabled={subject.done}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <TextField
                                  size="small"
                                  type="number"
                                  value={student.exam2}
                                  onChange={(e) =>
                                    handleScoreChange(subjectIdx, pageStart + studentIdx, 'exam2', e.target.value)
                                  }
                                  inputProps={{ min: 0, max: 100 }}
                                  sx={{ width: 80 }}
                                  disabled={subject.done}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <TextField
                                  size="small"
                                  type="number"
                                  value={student.exam3}
                                  onChange={(e) =>
                                    handleScoreChange(subjectIdx, pageStart + studentIdx, 'exam3', e.target.value)
                                  }
                                  inputProps={{ min: 0, max: 100 }}
                                  sx={{ width: 80 }}
                                  disabled={subject.done}
                                />
                              </TableCell>
                              <TableCell align="center">{student.totalScore}</TableCell>
                              <TableCell align="center">{student.averageScore.toFixed(1)}</TableCell>
                              <TableCell align="center">
                                <IconButton onClick={() => handleSaveScores(subjectIdx)} disabled={subject.done}>
                                  <SaveIcon color={subject.done ? 'disabled' : 'primary'} />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                        <TablePagination
                          rowsPerPageOptions={[8]}
                          component="div"
                          count={filteredStudents.length}
                          rowsPerPage={rowsPerPage}
                          page={page[subjectIdx]}
                          onPageChange={(e, newPage) => handlePageChange(subjectIdx, newPage)}
                        />
                        <Button
                          variant="contained"
                          color={subject.done ? 'warning' : 'success'}
                          size="small"
                          startIcon={<CheckCircleIcon />}
                          onClick={() => handleMarkAsDone(subjectIdx)}
                        >
                          {subject.done ? 'Mark as Not Done' : 'Mark as Done'}
                        </Button>
                      </Box>
                    </>
                  )}
                </AccordionDetails>
              </Accordion>
            </ClassCard>
          );
        })
      ) : (
        <Typography sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
          No data available for selected academic year and term
        </Typography>
      )}
    </Box>
  );
};

export default TeacherClasses;