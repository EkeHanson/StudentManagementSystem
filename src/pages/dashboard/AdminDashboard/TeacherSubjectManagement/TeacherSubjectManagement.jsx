import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  Box, Container, Typography, Tabs, Tab, Button, Table, TableBody, TableCell,
  TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField, Chip, Select, MenuItem, InputLabel, FormControl, 
  Checkbox, ListItemText, InputAdornment 
} from '@mui/material';
import { 
  Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, 
  Close as CloseIcon, Search as SearchIcon, FilterList as FilterListIcon 
} from '@mui/icons-material';
import './TeacherSubjectManagement.css';

const TeacherSubjectManagement = ({
  subjects,
  teachers,
  classLevels,
  onAddSubject,
  onEditSubject,
  onAddTeacher,
  onEditTeacher,
  onAssignTeacher,
  onRemoveAssignment,
  onDelete,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const [openSubjectDialog, setOpenSubjectDialog] = useState(false);
  const [openTeacherDialog, setOpenTeacherDialog] = useState(false);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleteItemType, setDeleteItemType] = useState(null);
  const [deleteTimer, setDeleteTimer] = useState(5);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [currentSubject, setCurrentSubject] = useState({});
  const [currentTeacher, setCurrentTeacher] = useState({});
  const [assignData, setAssignData] = useState({ 
    subjectId: '', 
    teacherId: '', 
    selectedClasses: [] 
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('');

  // Map deleteItemType to singular display term
  const getDisplayType = (type) => ({
    subjects: 'subject',
    teachers: 'teacher'
  }[type] || type);

  // Timer logic for deletion countdown
  useEffect(() => {
    if (!openDeleteModal || !isDeleteConfirmed) return;

    if (deleteTimer === 0) {
      handleConfirmDelete();
      return;
    }

    const timer = setInterval(() => {
      setDeleteTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [openDeleteModal, isDeleteConfirmed, deleteTimer]);

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
    const matchesClass = filterClass === '' || 
      teacher.subjects.some(sub => sub.classes.includes(filterClass));
    return matchesSearch && matchesClass;
  });

  // Subject CRUD operations
  const handleAddSubject = () => {
    setCurrentSubject({});
    setOpenSubjectDialog(true);
  };

  const handleEditSubject = (subject) => {
    setCurrentSubject(subject);
    setOpenSubjectDialog(true);
  };

  const handleDeleteSubjectClick = (id) => {
    setDeleteItemId(id);
    setDeleteItemType('subjects');
    setDeleteTimer(5);
    setIsDeleteConfirmed(false);
    setOpenDeleteModal(true);
  };

  const handleSaveSubject = () => {
    const { id, name, classes } = currentSubject;
    if (!name || !classes || classes.length === 0) return;

    if (id) {
      onEditSubject({ id, name, classes });
    } else {
      const newId = `SUB-${String(subjects.length + 1).padStart(3, '0')}`;
      onAddSubject({ id: newId, name, classes, teachers: [] });
    }
    setOpenSubjectDialog(false);
    setCurrentSubject({});
  };

  // Teacher CRUD operations
  const handleAddTeacher = () => {
    setCurrentTeacher({});
    setOpenTeacherDialog(true);
  };

  const handleEditTeacher = (teacher) => {
    setCurrentTeacher(teacher);
    setOpenTeacherDialog(true);
  };

  const handleDeleteTeacherClick = (id) => {
    setDeleteItemId(id);
    setDeleteItemType('teachers');
    setDeleteTimer(5);
    setIsDeleteConfirmed(false);
    setOpenDeleteModal(true);
  };

  const handleSaveTeacher = () => {
    const { id, name, email } = currentTeacher;
    if (!name || !email) return;

    if (id) {
      onEditTeacher({ id, name, email });
    } else {
      const newId = `TCH-${String(teachers.length + 1).padStart(3, '0')}`;
      onAddTeacher({ id: newId, name, email, subjects: [] });
    }
    setOpenTeacherDialog(false);
    setCurrentTeacher({});
  };

  // Delete operations
  const handleCancelDelete = () => {
    setOpenDeleteModal(false);
    setDeleteItemId(null);
    setDeleteItemType(null);
    setDeleteTimer(5);
    setIsDeleteConfirmed(false);
  };

  const handleStartDeleteCountdown = () => {
    setIsDeleteConfirmed(true);
    setDeleteTimer(5);
  };

  const handleConfirmDelete = () => {
    if (deleteItemId && deleteItemType) {
      if (deleteItemType === 'subjects') {
        onDelete(deleteItemId, deleteItemType);
        onRemoveAssignment(null, deleteItemId); // Remove all assignments for the subject
      } else if (deleteItemType === 'teachers') {
        onDelete(deleteItemId, deleteItemType);
      }
    }
    handleCancelDelete();
  };

  // Teacher-Subject Assignment operations
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

    onAssignTeacher(teacherId, subjectId, selectedClasses);
    setOpenAssignDialog(false);
  };

  const handleRemoveAssignment = (teacherId, subjectId) => {
    onRemoveAssignment(teacherId, subjectId);
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
    <Container sx={{ py: '24px' }}>
      {isDeleteConfirmed && (
        <Box className="countdown-banner" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <Typography color="white">
            Deleting {getDisplayType(deleteItemType)} in {deleteTimer} seconds...
          </Typography>
          <Button
            onClick={handleCancelDelete}
            className="full-countdown-button"
            variant="contained"
            sx={{ backgroundColor: '#ffffff', color: '#ff6b6b', fontWeight: 'bold' }}
          >
            Cancel
          </Button>
        </Box>
      )}
      <Typography variant="h4" sx={{ fontWeight: '600' }} gutterBottom>
        Teacher & Subject Management
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
          <Tab label="Subjects" />
          <Tab label="Teachers" />
        </Tabs>
        <Box className="search-filter-container">
          <TextField
            variant="outlined"
            placeholder={tabValue ? "Search teachers..." : "Search subjects..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              flex: 1,
              maxWidth: 500,
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px',
                background: '#f5f6fa',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: '#e8eaf6',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              },
              '& .MuiInputBase-input': {
                padding: '12px',
                fontSize: '14px',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#666' }} />
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ width: 200 }}>
            <Select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              displayEmpty
              sx={{
                borderRadius: '8px',
                background: '#f5f6fa',
                '& .MuiSelect-select': {
                  padding: '10px 12px',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                },
                '&:hover': {
                  background: '#e8eaf6',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
              startAdornment={<FilterListIcon sx={{ mr: 1, color: '#666' }} />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2">
                    {selected ? `Class: ${selected}` : 'Filter by Class'}
                  </Typography>
                </Box>
              )}
            >
              <MenuItem value="">
                <em>All Classes</em>
              </MenuItem>
              {classLevels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        
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
                          ).map((teacher) => (
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
                          <IconButton onClick={() => handleDeleteSubjectClick(subject.id)}>
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
                    <TableCell>Subjects</TableCell>
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
                          <IconButton onClick={() => handleDeleteTeacherClick(teacher.id)}>
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

      <Dialog open={openSubjectDialog} onClose={() => setOpenSubjectDialog(false)}>
        <DialogTitle>{currentSubject.id ? 'Edit Subject' : 'Add New Subject'}</DialogTitle>
        <DialogContent sx={{ minWidth: '400px' }}>
          <TextField
            autoFocus
            margin="dense"
            label="Subject ID"
            fullWidth
            value={currentSubject.id || ''}
            onChange={(e) => setCurrentSubject({ ...currentSubject, id: e.target.value })}
            sx={{ mb: 2 }}
            placeholder="e.g., SUB-001"
            disabled={!!currentSubject.id}
          />
          <TextField
            margin="dense"
            label="Subject Name"
            fullWidth
            value={currentSubject.name || ''}
            onChange={(e) => setCurrentSubject({ ...currentSubject, name: e.target.value })}
            sx={{ mb: 2 }}
            placeholder="e.g., Mathematics"
          />
          <FormControl fullWidth>
            <InputLabel>Classes/Grades</InputLabel>
            <Select
              multiple
              value={currentSubject.classes || []}
              onChange={(e) => setCurrentSubject({ 
                ...currentSubject, 
                classes: e.target.value 
              })}
              renderValue={(selected) => selected.join(', ')}
            >
              {classLevels.map((level) => (
                <MenuItem key={level} value={level}>
                  <Checkbox checked={currentSubject.classes?.includes(level) || false} />
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
            disabled={!currentSubject.id || !currentSubject.name || !currentSubject.classes?.length}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openTeacherDialog} onClose={() => setOpenTeacherDialog(false)}>
        <DialogTitle>{currentTeacher.id ? 'Edit Teacher' : 'Add New Teacher'}</DialogTitle>
        <DialogContent sx={{ minWidth: '400px' }}>
          <TextField
            autoFocus
            margin="dense"
            label="Teacher ID"
            fullWidth
            value={currentTeacher.id || ''}
            onChange={(e) => setCurrentTeacher({ ...currentTeacher, id: e.target.value })}
            sx={{ mb: 2 }}
            placeholder="e.g., TCH-001"
            disabled={!!currentTeacher.id}
          />
          <TextField
            margin="dense"
            label="Full Name"
            fullWidth
            value={currentTeacher.name || ''}
            onChange={(e) => setCurrentTeacher({ ...currentTeacher, name: e.target.value })}
            sx={{ mb: 2 }}
            placeholder="e.g., John Doe"
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={currentTeacher.email || ''}
            onChange={(e) => setCurrentTeacher({ ...currentTeacher, email: e.target.value })}
            placeholder="e.g., john@school.com"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTeacherDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSaveTeacher} 
            variant="contained"
            disabled={!currentTeacher.id || !currentTeacher.name || !currentTeacher.email}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

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
                {(subjects.find(s => s.id === assignData.subjectId)?.classes || []).map((level) => (
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

      <Dialog open={openDeleteModal} onClose={handleCancelDelete}>
        <DialogContent sx={{ 
          background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)', 
          padding: 4, 
          borderRadius: 2, 
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <DialogTitle sx={{ color: '#d32f2f', padding: 0, marginBottom: 2 }}>
            Confirm Deletion
          </DialogTitle>
          {isDeleteConfirmed ? (
            <Typography>
              Deleting {getDisplayType(deleteItemType)} in {deleteTimer} seconds... Click Cancel to stop.
            </Typography>
          ) : (
            <Typography>
              Are you sure you want to delete this {getDisplayType(deleteItemType)}? This action cannot be undone.
            </Typography>
          )}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', marginTop: 2 }}>
            <Button 
              onClick={handleCancelDelete} 
              variant="contained"
              sx={{ backgroundColor: '#4caf50', color: 'white', fontWeight: 'bold' }}
            >
              Cancel
            </Button>
            {!isDeleteConfirmed && (
              <Button 
                onClick={handleStartDeleteCountdown} 
                variant="contained"
                sx={{ backgroundColor: '#d32f2f', color: 'white', fontWeight: 'bold' }}
              >
                Delete
              </Button>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

TeacherSubjectManagement.propTypes = {
  subjects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      classes: PropTypes.arrayOf(PropTypes.string).isRequired,
      teachers: PropTypes.array,
    })
  ).isRequired,
  teachers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      subjects: PropTypes.arrayOf(
        PropTypes.shape({
          subjectId: PropTypes.string.isRequired,
          classes: PropTypes.arrayOf(PropTypes.string).isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  classLevels: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAddSubject: PropTypes.func.isRequired,
  onEditSubject: PropTypes.func.isRequired,
  onAddTeacher: PropTypes.func.isRequired,
  onEditTeacher: PropTypes.func.isRequired,
  onAssignTeacher: PropTypes.func.isRequired,
  onRemoveAssignment: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
};

export default TeacherSubjectManagement;