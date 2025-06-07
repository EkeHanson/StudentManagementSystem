import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Tabs, Tab, Table, TableBody, TableCell, TableHead, TableRow,
  Button, Box, Typography, Avatar, Card, LinearProgress, Chip,
  TextField, Dialog, DialogTitle, DialogContent, DialogActions,
  Divider, useTheme, ButtonGroup, Tooltip, Alert
} from '@mui/material';
import {
  Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon,
  Visibility as ViewIcon, Badge as BadgeIcon, Print as PrintIcon,
  Save as SaveIcon, Close as CloseIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import html2canvas from 'html2canvas';
import './StudentList.css';

// Styled components for IDCardGenerator
const IDCardContainer = styled(Card)(({ theme }) => ({
  width: '340px',
  height: '220px',
  borderRadius: '12px',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  margin: '0 auto',
  '&.back': {
    backgroundColor: theme.palette.grey[100],
    border: `1px solid ${theme.palette.grey[300]}`
  }
}));

const IDCardFront = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '80px',
    height: '80px',
    background: theme.palette.primary.main,
    opacity: 0.1,
    borderRadius: '0 0 0 100%'
  }
}));

const IDCardBack = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}));

const SchoolHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  '& img': {
    marginRight: theme.spacing(1.5),
    width: '40px',
    height: '40px',
    objectFit: 'contain'
  }
}));

// School information constant
const schoolInfo = {
  name: "Excel International Excellent Schools",
  logo: "https://via.placeholder.com/100?text=EIES",
  address: "123 Education Blvd, Learning City",
  phone: "+1 (234) 567-8900",
  website: "www.excelinternational.edu",
  motto: "Empowering Minds, Shaping Futures"
};

// Default card text constant
const defaultCardText = {
  front: "Official Student Identification",
  back: "This card is property of Excel International Excellent Schools. If found, please return to the school office.",
  validity: "Valid until graduation"
};

// TabPanel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`student-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const StudentList = ({ data, onEdit, onDelete, onAdd }) => {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    name: '',
    class: '',
    gender: '',
    status: ''
  });
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteStudentId, setDeleteStudentId] = useState(null);
  const [deleteTimer, setDeleteTimer] = useState(5);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [tabValue, setTabValue] = useState(0);
  const [selectedForID, setSelectedForID] = useState(null);
  const [cardText, setCardText] = useState(defaultCardText);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [tempCardText, setTempCardText] = useState(defaultCardText);
  const cardRef = useRef(null);
  const studentsPerPage = 7;

  // Extract unique classes and genders for dropdowns
  const uniqueClasses = useMemo(() => 
    [...new Set(data.map(student => student.class))].sort(), 
    [data]
  );
  const uniqueGenders = useMemo(() => 
    [...new Set(data.map(student => student.gender))].sort(), 
    [data]
  );

  // Apply filters to data
  const filteredStudents = useMemo(() => {
    return data.filter(student => {
      return (
        (filters.name === '' || 
          student.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.class === '' || student.class === filters.class) &&
        (filters.gender === '' || student.gender === filters.gender) &&
        (filters.status === '' || student.status === filters.status)
      );
    });
  }, [data, filters]);

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent, 
    indexOfLastStudent
  );

  // Timer logic for the deletion countdown
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handleDeleteClick = (studentId) => {
    setDeleteStudentId(studentId);
    setDeleteTimer(5);
    setIsDeleteConfirmed(false);
    setOpenDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setOpenDeleteModal(false);
    setDeleteStudentId(null);
    setDeleteTimer(5);
    setIsDeleteConfirmed(false);
  };

  const handleStartDeleteCountdown = () => {
    setIsDeleteConfirmed(true);
    setDeleteTimer(5);
  };

  const handleConfirmDelete = () => {
    if (deleteStudentId) {
      onDelete(deleteStudentId, 'students');
    }
    handleCancelDelete();
  };

  const handleAddClick = () => {
    setFormData({});
    setOpenAddModal(true);
  };

  const handleAddModalClose = () => {
    setOpenAddModal(false);
    setFormData({});
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = () => {
    if (!formData.id || !formData.name || !formData.class || !formData.gender || !formData.attendance || !formData.status) {
      return;
    }
    onAdd({ ...formData, status: formData.status || 'Active' }, 'students');
    handleAddModalClose();
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setCurrentPage(1);
  };

  const handleGenerateID = (student) => {
    setSelectedForID(student);
    setTabValue(2);
  };

  // IDCardGenerator handlers
  const handlePrint = () => {
    if (cardRef.current && selectedForID) {
      html2canvas(cardRef.current).then(canvas => {
        const link = document.createElement('a');
        link.download = `id-card-${selectedForID.id}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  const handleEditText = () => {
    setTempCardText(cardText);
    setEditDialogOpen(true);
  };

  const handleSaveText = () => {
    setCardText(tempCardText);
    setEditDialogOpen(false);
  };

  const handleTextChange = (field) => (e) => {
    setTempCardText(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <div className="student-list-container">
      {isDeleteConfirmed && (
        <div className="countdown-banner">
          <span>Deleting student in {deleteTimer} seconds...</span>
          <button
            onClick={handleCancelDelete}
            className="cancel-countdown-button"
          >
            Cancel
          </button>
        </div>
      )}
      <div className="filter-container">
        <input
          type="text"
          name="name"
          placeholder="Search by name..."
          value={filters.name}
          onChange={handleFilterChange}
          className="filter-input"
          aria-label="Search students by name"
        />
        <select
          name="class"
          value={filters.class}
          onChange={handleFilterChange}
          className="filter-select"
          aria-label="Filter by class"
        >
          <option value="">All Classes</option>
          {uniqueClasses.map((cls) => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>
        <select
          name="gender"
          value={filters.gender}
          onChange={handleFilterChange}
          className="filter-select"
          aria-label="Filter by gender"
        >
          <option value="">All Genders</option>
          {uniqueGenders.map((gender) => (
            <option key={gender} value={gender}>{gender}</option>
          ))}
        </select>
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="filter-select"
          aria-label="Filter by status"
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button
          className="add-button"
          onClick={handleAddClick}
          aria-label="Add new student"
        >
          <AddIcon /> Add New
        </button>
      </div>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 500,
            minHeight: 48
          }
        }}
      >
        <Tab label="Student Profiles" icon={<AddIcon />} iconPosition="start" />
        <Tab label="Attendance Tracking" icon={<AddIcon />} iconPosition="start" />
        <Tab label="ID Card Generator" icon={<BadgeIcon />} iconPosition="start" />
        <Tab label="Progress Reports" icon={<AddIcon />} iconPosition="start" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>Photo</TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>Class</TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>Gender</TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>Attendance</TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentStudents.length > 0 ? (
              currentStudents.map((student) => (
                <TableRow
                  key={student.id}
                  hover
                  sx={{
                    backgroundColor: selectedForID?.id === student.id
                      ? theme.palette.action.selected
                      : 'inherit',
                    '&:hover': {
                      backgroundColor: selectedForID?.id === student.id
                        ? theme.palette.action.selected
                        : theme.palette.action.hover
                    },
                    transition: 'background-color 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  <TableCell sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>{student.id}</TableCell>
                  <TableCell sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
                    <Avatar
                      src={student.photo}
                      alt={student.name}
                      sx={{
                        width: 40,
                        height: 40,
                        border: selectedForID?.id === student.id
                          ? `2px solid ${theme.palette.primary.main}`
                          : 'none'
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>{student.name}</TableCell>
                  <TableCell sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>{student.class}</TableCell>
                  <TableCell sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>{student.gender}</TableCell>
                  <TableCell sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>{student.attendance}</TableCell>
                  <TableCell sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
                    <span className={`status-chip ${student.status.toLowerCase()}`}>
                      {student.status}
                    </span>
                  </TableCell>
                  <TableCell sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
                    <ButtonGroup
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: selectedForID?.id === student.id
                          ? theme.palette.primary.main
                          : theme.palette.grey[400]
                      }}
                    >
                      <Tooltip title="Edit Student" arrow>
                        <Button
                          onClick={() => onEdit(student, 'students')}
                          sx={{
                            '&:hover': {
                              backgroundColor: theme.palette.grey[100]
                            }
                          }}
                        >
                          <EditIcon
                            fontSize="small"
                            color={selectedForID?.id === student.id ? "primary" : "inherit"}
                          />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Delete Student" arrow>
                        <Button
                          onClick={() => handleDeleteClick(student.id)}
                          sx={{
                            '&:hover': {
                              backgroundColor: theme.palette.grey[100]
                            }
                          }}
                        >
                          <DeleteIcon
                            fontSize="small"
                            color={selectedForID?.id === student.id ? "primary" : "inherit"}
                          />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Generate ID Card" arrow>
                        <Button
                          onClick={() => handleGenerateID(student)}
                          color={selectedForID?.id === student.id ? "primary" : "inherit"}
                          sx={{
                            '&:hover': {
                              backgroundColor: theme.palette.grey[100]
                            }
                          }}
                        >
                          <BadgeIcon
                            fontSize="small"
                            color={selectedForID?.id === student.id ? "primary" : "inherit"}
                          />
                        </Button>
                      </Tooltip>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="no-results">No students match the selected filters.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
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
            {currentStudents.map((student) => (
              <TableRow key={student.id} hover>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.attendance}%</TableCell>
                <TableCell>
                  <LinearProgress
                    variant="determinate"
                    value={parseFloat(student.attendance)}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Box sx={{ p: 3 }}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" component="h2">
              {selectedForID ? `ID Card for ${selectedForID.name}` : 'Student ID Card Generator'}
            </Typography>
            {selectedForID && (
              <Box>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={handleEditText}
                  sx={{ mr: 2 }}
                >
                  Customize Text
                </Button>
                <Button
                  variant="contained"
                  startIcon={<PrintIcon />}
                  onClick={handlePrint}
                >
                  Print Card
                </Button>
              </Box>
            )}
          </Box>
          {selectedForID ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box sx={{ mb: 4 }}>
                <IDCardContainer ref={cardRef}>
                  <IDCardFront>
                    <SchoolHeader>
                      <img src={schoolInfo.logo} alt="School Logo" />
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {schoolInfo.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {cardText.front}
                        </Typography>
                      </Box>
                    </SchoolHeader>
                    <Box sx={{ display: 'flex', flexGrow: 1, mt: 1 }}>
                      <Box sx={{ mr: 2 }}>
                        <Avatar
                          src={selectedForID.photo}
                          alt={selectedForID.name}
                          sx={{
                            width: 80,
                            height: 80,
                            border: `2px solid ${theme.palette.primary.main}`
                          }}
                        />
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body1" fontWeight={600}>
                          {selectedForID.name}
                        </Typography>
                        <Typography variant="body2">
                          ID: {selectedForID.id}
                        </Typography>
                        <Typography variant="body2">
                          Class: {selectedForID.class}
                        </Typography>
                        <Typography variant="body2">
                          DOB: {selectedForID.dob ? new Date(selectedForID.dob).toLocaleDateString() : 'N/A'}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          <em>{cardText.validity}</em>
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
                      fontSize: '0.7rem',
                      color: theme.palette.text.secondary
                    }}>
                      {schoolInfo.motto}
                    </Box>
                  </IDCardFront>
                </IDCardContainer>
              </Box>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Back of ID Card
                </Typography>
                <IDCardContainer className="back">
                  <IDCardBack>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                        {schoolInfo.name}
                      </Typography>
                      <Typography variant="body2" paragraph>
                        {cardText.back}
                      </Typography>
                    </Box>
                    <Box>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="caption" component="div">
                        {schoolInfo.address}
                      </Typography>
                      <Typography variant="caption" component="div">
                        {schoolInfo.phone} • {schoolInfo.website}
                      </Typography>
                    </Box>
                  </IDCardBack>
                </IDCardContainer>
              </Box>
            </Box>
          ) : (
            <Alert severity="info" sx={{ mb: 2 }}>
              Please select a student from the "Student Profiles" tab to generate their ID card
            </Alert>
          )}
          <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} fullWidth maxWidth="sm">
            <DialogTitle>Customize ID Card Text</DialogTitle>
            <DialogContent>
              <Box sx={{ pt: 2 }}>
                <TextField
                  fullWidth
                  label="Front Text"
                  value={tempCardText.front}
                  onChange={handleTextChange('front')}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Back Text"
                  value={tempCardText.back}
                  onChange={handleTextChange('back')}
                  margin="normal"
                  multiline
                  rows={4}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Validity Text"
                  value={tempCardText.validity}
                  onChange={handleTextChange('validity')}
                  margin="normal"
                  variant="outlined"
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setEditDialogOpen(false)}
                startIcon={<CloseIcon />}
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveText}
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
              >
                Save Changes
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
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
            {currentStudents.map((student) => (
              <TableRow key={student.id} hover>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.grades?.math || 'N/A'}</TableCell>
                <TableCell>{student.grades?.science || 'N/A'}</TableCell>
                <TableCell>{student.grades?.english || 'N/A'}</TableCell>
                <TableCell>
                  {student.disciplinaryRecords?.length > 0 ? (
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
      </TabPanel>

      <div className="pagination">
        <button
          className="pagination-button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
            aria-label={`Page ${index + 1}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="pagination-button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          Next
        </button>
      </div>

      <div className={`delete-modal ${openDeleteModal ? 'open' : ''}`}>
        <div className="delete-modal-content">
          <h2>Confirm Deletion</h2>
          {isDeleteConfirmed ? (
            <p>Deleting student in {deleteTimer} seconds... Click Cancel to stop.</p>
          ) : (
            <p>Are you sure you want to delete this student? This action cannot be undone.</p>
          )}
          <div className="delete-modal-actions">
            <button onClick={handleCancelDelete} className="cancel-delete-button">Cancel</button>
            {!isDeleteConfirmed && (
              <button onClick={handleStartDeleteCountdown} className="confirm-delete-button">Delete</button>
            )}
          </div>
        </div>
      </div>

      <div className={`dialog ${openAddModal ? 'open' : ''}`}>
        <div className="dialog-content">
          <h2>Add New Student</h2>
          <div className="form-container">
            <input
              type="text"
              placeholder="ID"
              name="id"
              value={formData.id || ''}
              onChange={handleFormChange}
              required
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name || ''}
              onChange={handleFormChange}
              required
            />
            <input
              type="text"
              placeholder="Class"
              name="class"
              value={formData.class || ''}
              onChange={handleFormChange}
              required
            />
            <select
              name="gender"
              value={formData.gender || ''}
              onChange={handleFormChange}
              required
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="text"
              placeholder="Attendance"
              name="attendance"
              value={formData.attendance || ''}
              onChange={handleFormChange}
              required
            />
            <select
              name="status"
              value={formData.status || ''}
              onChange={handleFormChange}
              required
            >
              <option value="" disabled>Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="dialog-actions">
            <button onClick={handleAddModalClose} className="cancel-button">Cancel</button>
            <button onClick={handleAddSubmit} className="save-button">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentList;