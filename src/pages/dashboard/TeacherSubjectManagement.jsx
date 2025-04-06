import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  Paper,
  InputAdornment,
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Add as AddIcon, 
  Close as CloseIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon 
} from '@mui/icons-material';

// Sample class/grade levels
const CLASS_LEVELS = [
  'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
  'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10',
  'Grade 11', 'Grade 12'
];

const TeacherSubjectManagement = () => {
  // Sample initial data
  const initialSubjects = [
    { id: 'SUB-001', name: 'Mathematics', classes: ['Grade 5', 'Grade 6'], teachers: [] },
    { id: 'SUB-002', name: 'Science', classes: ['Grade 4', 'Grade 5'], teachers: [] },
    { id: 'SUB-003', name: 'English', classes: ['Grade 3', 'Grade 4'], teachers: [] },
  ];

  const initialTeachers = [
    { 
      id: 'TCH-001', 
      name: 'Jane Smith', 
      email: 'jane@school.com',
      subjects: [
        { subjectId: 'SUB-001', classes: ['Grade 5'] },
        { subjectId: 'SUB-002', classes: ['Grade 4'] }
      ] 
    },
    { 
      id: 'TCH-002', 
      name: 'John Doe', 
      email: 'john@school.com',
      subjects: [
        { subjectId: 'SUB-001', classes: ['Grade 6'] },
        { subjectId: 'SUB-003', classes: ['Grade 3'] }
      ] 
    },
  ];

  const [tabValue, setTabValue] = useState(0);
  const [subjects, setSubjects] = useState(initialSubjects);
  const [teachers, setTeachers] = useState(initialTeachers);
  const [openSubjectDialog, setOpenSubjectDialog] = useState(false);
  const [openTeacherDialog, setOpenTeacherDialog] = useState(false);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [assignData, setAssignData] = useState({ 
    subjectId: '', 
    teacherId: '', 
    selectedClasses: [] 
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSearchTerm('');
    setFilterClass('');
  };

  // Filter functions
  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === '' || subject.classes.includes(filterClass);
    return matchesSearch && matchesClass;
  });

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Check if teacher teaches in the filtered class
    const matchesClass = filterClass === '' || 
      teacher.subjects.some(sub => sub.classes.includes(filterClass));
    
    return matchesSearch && matchesClass;
  });

  // Subject CRUD operations (same as before)
  const handleAddSubject = () => {
    setCurrentSubject({ name: '', classes: [] });
    setOpenSubjectDialog(true);
  };

  const handleEditSubject = (subject) => {
    setCurrentSubject(subject);
    setOpenSubjectDialog(true);
  };

  const handleDeleteSubject = (id) => {
    const updatedTeachers = teachers.map(teacher => ({
      ...teacher,
      subjects: teacher.subjects.filter(sub => sub.subjectId !== id)
    }));
    setTeachers(updatedTeachers);
    setSubjects(subjects.filter(subject => subject.id !== id));
  };

  const handleSaveSubject = () => {
    const { id, name, classes } = currentSubject;
    if (id) {
      setSubjects(subjects.map(subject => 
        subject.id === id ? { ...subject, name, classes } : subject
      ));
    } else {
      const newId = `SUB-${String(subjects.length + 1).padStart(3, '0')}`;
      setSubjects([...subjects, { id: newId, name, classes, teachers: [] }]);
    }
    setOpenSubjectDialog(false);
    setCurrentSubject(null);
  };

  // Teacher CRUD operations (same as before)
  const handleAddTeacher = () => {
    setCurrentTeacher({ name: '', email: '', subjects: [] });
    setOpenTeacherDialog(true);
  };

  const handleEditTeacher = (teacher) => {
    setCurrentTeacher(teacher);
    setOpenTeacherDialog(true);
  };

  const handleDeleteTeacher = (id) => {
    setTeachers(teachers.filter(teacher => teacher.id !== id));
  };

  const handleSaveTeacher = () => {
    const { id, name, email } = currentTeacher;
    if (id) {
      setTeachers(teachers.map(teacher => 
        teacher.id === id ? { ...teacher, name, email } : teacher
      ));
    } else {
      const newId = `TCH-${String(teachers.length + 1).padStart(3, '0')}`;
      setTeachers([...teachers, { id: newId, name, email, subjects: [] }]);
    }
    setOpenTeacherDialog(false);
    setCurrentTeacher(null);
  };

  // Teacher-Subject Assignment operations (same as before)
  const handleOpenAssignDialog = (teacherId = '') => {
    setAssignData({ 
      subjectId: '', 
      teacherId: teacherId || '', 
      selectedClasses: [] 
    });
    setOpenAssignDialog(true);
  };

  const handleAssignTeacher = () => {
    const { subjectId, teacherId, selectedClasses } = assignData;
    if (!subjectId || !teacherId || selectedClasses.length === 0) return;

    const updatedTeachers = teachers.map(teacher => {
      if (teacher.id === teacherId) {
        const existingSubjectIndex = teacher.subjects.findIndex(
          sub => sub.subjectId === subjectId
        );
        
        if (existingSubjectIndex >= 0) {
          const updatedSubjects = [...teacher.subjects];
          const existingClasses = updatedSubjects[existingSubjectIndex].classes;
          const newClasses = [...new Set([...existingClasses, ...selectedClasses])];
          updatedSubjects[existingSubjectIndex] = {
            subjectId,
            classes: newClasses
          };
          return { ...teacher, subjects: updatedSubjects };
        } else {
          return { 
            ...teacher, 
            subjects: [...teacher.subjects, { subjectId, classes: selectedClasses }] 
          };
        }
      }
      return teacher;
    });

    setTeachers(updatedTeachers);
    setOpenAssignDialog(false);
  };

  const handleRemoveAssignment = (teacherId, subjectId) => {
    const updatedTeachers = teachers.map(teacher => {
      if (teacher.id === teacherId) {
        return {
          ...teacher,
          subjects: teacher.subjects.filter(sub => sub.subjectId !== subjectId)
        };
      }
      return teacher;
    });
    setTeachers(updatedTeachers);
  };

  const getSubjectName = (subjectId) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? subject.name : 'Unknown';
  };

  const getAssignedClassesForTeacher = (teacherId, subjectId) => {
    const teacher = teachers.find(t => t.id === teacherId);
    if (!teacher) return [];
    
    const subjectAssignment = teacher.subjects.find(sub => sub.subjectId === subjectId);
    return subjectAssignment ? subjectAssignment.classes : [];
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Teacher & Subject Management
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
          <Tab label="Subjects" />
          <Tab label="Teachers" />
        </Tabs>
        
        {/* Filter Controls */}
        <Paper sx={{ p: 2, mt: 2, mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={tabValue === 0 ? "Search subjects..." : "Search teachers..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel id="class-filter-label">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FilterListIcon sx={{ mr: 1, fontSize: 20 }} />
                Filter by Class
              </Box>
            </InputLabel>
            <Select
              labelId="class-filter-label"
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              label="Filter by Class"
              displayEmpty
            >
              <MenuItem value="">
                <em>All Classes</em>
              </MenuItem>
              {CLASS_LEVELS.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
        
        <Box sx={{ mt: 2 }}>
          {tabValue === 0 ? (
            <>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddSubject}
                sx={{ mb: 2 }}
              >
                Add Subject
              </Button>
              
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Classes</TableCell>
                    <TableCell>Assigned Teachers</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredSubjects.length > 0 ? (
                    filteredSubjects.map((subject) => (
                      <TableRow key={subject.id}>
                        <TableCell>{subject.id}</TableCell>
                        <TableCell>{subject.name}</TableCell>
                        <TableCell>
                          {subject.classes.join(', ')}
                        </TableCell>
                        <TableCell>
                          {teachers.filter(teacher => 
                            teacher.subjects.some(sub => sub.subjectId === subject.id)
                          ).map(teacher => (
                            <Box key={teacher.id} sx={{ mb: 1 }}>
                              <Chip
                                label={`${teacher.name} (${getAssignedClassesForTeacher(teacher.id, subject.id).join(', ')})`}
                                onDelete={() => handleRemoveAssignment(teacher.id, subject.id)}
                                deleteIcon={<CloseIcon />}
                                sx={{ mr: 1, mb: 1 }}
                              />
                            </Box>
                          ))}
                          {teachers.filter(teacher => 
                            teacher.subjects.some(sub => sub.subjectId === subject.id)
                          ).length === 0 && (
                            <Typography variant="body2" color="text.secondary">
                              No teachers assigned
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEditSubject(subject)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteSubject(subject.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        <Typography variant="body1" color="text.secondary">
                          No subjects found matching your criteria
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddTeacher}
                sx={{ mb: 2 }}
              >
                Add Teacher
              </Button>
              
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Assigned Subjects</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTeachers.length > 0 ? (
                    filteredTeachers.map((teacher) => (
                      <TableRow key={teacher.id}>
                        <TableCell>{teacher.id}</TableCell>
                        <TableCell>{teacher.name}</TableCell>
                        <TableCell>{teacher.email}</TableCell>
                        <TableCell>
                          {teacher.subjects.length > 0 ? (
                            teacher.subjects.map((sub, index) => (
                              <Box key={index} sx={{ mb: 1 }}>
                                <Chip
                                  label={`${getSubjectName(sub.subjectId)} (${sub.classes.join(', ')})`}
                                  onDelete={() => handleRemoveAssignment(teacher.id, sub.subjectId)}
                                  deleteIcon={<CloseIcon />}
                                  sx={{ mr: 1, mb: 1 }}
                                />
                              </Box>
                            ))
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              No subjects assigned
                            </Typography>
                          )}
                          <Button 
                            size="small" 
                            onClick={() => handleOpenAssignDialog(teacher.id)}
                            startIcon={<AddIcon />}
                            sx={{ mt: 1 }}
                          >
                            Assign Subject
                          </Button>
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEditTeacher(teacher)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteTeacher(teacher.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        <Typography variant="body1" color="text.secondary">
                          No teachers found matching your criteria
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </>
          )}
        </Box>
      </Box>

      {/* Subject Dialog (same as before) */}
      <Dialog open={openSubjectDialog} onClose={() => setOpenSubjectDialog(false)}>
        <DialogTitle>{currentSubject?.id ? 'Edit Subject' : 'Add New Subject'}</DialogTitle>
        <DialogContent sx={{ minWidth: '400px' }}>
          <TextField
            autoFocus
            margin="dense"
            label="Subject Name"
            fullWidth
            value={currentSubject?.name || ''}
            onChange={(e) => setCurrentSubject({ ...currentSubject, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth>
            <InputLabel>Classes/Grades</InputLabel>
            <Select
              multiple
              value={currentSubject?.classes || []}
              onChange={(e) => setCurrentSubject({ 
                ...currentSubject, 
                classes: e.target.value 
              })}
              renderValue={(selected) => selected.join(', ')}
            >
              {CLASS_LEVELS.map((level) => (
                <MenuItem key={level} value={level}>
                  <Checkbox checked={currentSubject?.classes?.includes(level) || false} />
                  <ListItemText primary={level} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSubjectDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSaveSubject} 
            variant="contained"
            disabled={!currentSubject?.name || currentSubject?.classes?.length === 0}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Teacher Dialog (same as before) */}
      <Dialog open={openTeacherDialog} onClose={() => setOpenTeacherDialog(false)}>
        <DialogTitle>{currentTeacher?.id ? 'Edit Teacher' : 'Add New Teacher'}</DialogTitle>
        <DialogContent sx={{ minWidth: '400px' }}>
          <TextField
            autoFocus
            margin="dense"
            label="Full Name"
            fullWidth
            value={currentTeacher?.name || ''}
            onChange={(e) => setCurrentTeacher({ ...currentTeacher, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={currentTeacher?.email || ''}
            onChange={(e) => setCurrentTeacher({ ...currentTeacher, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTeacherDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSaveTeacher} 
            variant="contained"
            disabled={!currentTeacher?.name || !currentTeacher?.email}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Assign Teacher Dialog (same as before) */}
      <Dialog open={openAssignDialog} onClose={() => setOpenAssignDialog(false)}>
        <DialogTitle>
          {assignData.teacherId 
            ? `Assign Subject to ${teachers.find(t => t.id === assignData.teacherId)?.name || 'Teacher'}`
            : 'Assign Teacher to Subject'}
        </DialogTitle>
        <DialogContent sx={{ minWidth: '500px' }}>
          {!assignData.teacherId && (
            <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
              <InputLabel id="teacher-select-label">Teacher</InputLabel>
              <Select
                labelId="teacher-select-label"
                value={assignData.teacherId}
                label="Teacher"
                onChange={(e) => setAssignData({ ...assignData, teacherId: e.target.value })}
              >
                {teachers.map((teacher) => (
                  <MenuItem key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="subject-select-label">Subject</InputLabel>
            <Select
              labelId="subject-select-label"
              value={assignData.subjectId}
              label="Subject"
              onChange={(e) => {
                const subjectId = e.target.value;
                const subject = subjects.find(s => s.id === subjectId);
                setAssignData({ 
                  ...assignData, 
                  subjectId,
                  selectedClasses: [] 
                });
              }}
            >
              {subjects.map((subject) => (
                <MenuItem key={subject.id} value={subject.id}>
                  {subject.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {assignData.subjectId && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Classes/Grades</InputLabel>
              <Select
                multiple
                value={assignData.selectedClasses}
                onChange={(e) => setAssignData({ 
                  ...assignData, 
                  selectedClasses: e.target.value 
                })}
                renderValue={(selected) => selected.join(', ')}
                disabled={!assignData.subjectId}
              >
                {subjects.find(s => s.id === assignData.subjectId)?.classes.map((level) => (
                  <MenuItem key={level} value={level}>
                    <Checkbox checked={assignData.selectedClasses.includes(level)} />
                    <ListItemText primary={level} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAssignDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleAssignTeacher} 
            variant="contained"
            disabled={!assignData.subjectId || !assignData.teacherId || assignData.selectedClasses.length === 0}
          >
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TeacherSubjectManagement;