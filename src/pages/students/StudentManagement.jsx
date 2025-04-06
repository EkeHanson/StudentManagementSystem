// StudentManagement.jsx
import React, { useState } from 'react';
import { Container, Typography,Tabs,Tab, Box,Paper, Grid, Chip, Avatar, Divider,  IconButton,
  Tooltip,useTheme,Button,TextField,InputAdornment,Select,MenuItem,FormControl,InputLabel,Pagination,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Person as PersonIcon, CalendarToday as CalendarIcon, School as SchoolIcon,
  Assignment as AssignmentIcon, CardMembership as IdCardIcon,
  BarChart as ProgressIcon, Visibility as ViewIcon,
  Edit as EditIcon,  Email as EmailIcon,  Phone as PhoneIcon,
  Home as AddressIcon, Close as CloseIcon, Search as SearchIcon,
  FilterAlt as FilterIcon } from '@mui/icons-material';
  
import StudentProfile from '../../components/students/StudentProfile';
import AttendanceTracker from '../../components/students/AttendanceTracker';
import IDCardGenerator from '../../components/students/IDCardGenerator';
import ProgressReports from '../../components/students/ProgressReports';

// Enhanced dummy data with more details
const dummyStudents = [
  {
    id: 'ST001',
    name: 'John Doe',
    class: '10A',
    section: 'Science',
    attendance: 92,
    dob: '2008-05-15',
    age: 16,
    gender: 'Male',
    bloodGroup: 'A+',
    photo: 'https://via.assets.so/album.png?id=1&q=95&w=360&h=360&fit=fill',
    disciplinaryRecords: [],
    grades: { math: 85, science: 90, english: 88 },
    contact: {
      email: 'john.doe@school.edu',
      phone: '+1234567890',
      address: '123 Main St, Cityville'
    },
    parents: [
      {
        name: 'Michael Doe',
        relation: 'Father',
        contact: '+1234567891',
        email: 'michael.doe@email.com'
      },
      {
        name: 'Sarah Doe',
        relation: 'Mother',
        contact: '+1234567892',
        email: 'sarah.doe@email.com'
      }
    ],
    admissionDate: '2020-06-15',
    lastUpdated: '2025-03-20',
    status: 'Active',
    medicalNotes: 'Allergic to peanuts',
    extracurricular: ['Basketball', 'Chess Club']
  },
  {
    id: 'ST002',
    name: 'Jane Smith',
    class: '10B',
    section: 'Commerce',
    attendance: 95,
    dob: '2008-06-20',
    age: 16,
    gender: 'Female',
    bloodGroup: 'B+',
    photo: 'https://via.assets.so/album.png?id=3&q=95&w=360&h=360&fit=fill',
    disciplinaryRecords: ['Late submission - 2025-03-01'],
    grades: { math: 78, science: 82, english: 95 },
    contact: {
      email: 'jane.smith@school.edu',
      phone: '+1234567893',
      address: '456 Oak Ave, Townsville'
    },
    parents: [
      {
        name: 'Robert Smith',
        relation: 'Father',
        contact: '+1234567894',
        email: 'robert.smith@email.com'
      }
    ],
    admissionDate: '2020-06-15',
    lastUpdated: '2025-03-18',
    status: 'Active',
    medicalNotes: 'None',
    extracurricular: ['Debate Team', 'Music Club']
  },
  {
    id: 'ST003',
    name: 'Mike Johnson',
    class: '11A',
    section: 'Science',
    attendance: 88,
    dob: '2007-09-10',
    age: 17,
    gender: 'Male',
    bloodGroup: 'O+',
    photo: 'https://via.assets.so/album.png?id=4&q=95&w=360&h=360&fit=fill',
    disciplinaryRecords: [],
    grades: { math: 92, science: 87, english: 85 },
    contact: {
      email: 'mike.johnson@school.edu',
      phone: '+1234567895',
      address: '789 Pine Rd, Villagetown'
    },
    parents: [
      {
        name: 'Lisa Johnson',
        relation: 'Mother',
        contact: '+1234567896',
        email: 'lisa.johnson@email.com'
      },
      {
        name: 'David Johnson',
        relation: 'Father',
        contact: '+1234567897',
        email: 'david.johnson@email.com'
      }
    ],
    admissionDate: '2019-06-10',
    lastUpdated: '2025-03-15',
    status: 'Active',
    medicalNotes: 'Asthma (mild)',
    extracurricular: ['Football', 'Science Club']
  },
  {
    id: 'ST004',
    name: 'Sarah Williams',
    class: '11B',
    section: 'Arts',
    attendance: 96,
    dob: '2007-11-25',
    age: 17,
    gender: 'Female',
    bloodGroup: 'AB+',
    photo: 'https://via.assets.so/album.png?id=5&q=95&w=360&h=360&fit=fill',
    disciplinaryRecords: [],
    grades: { math: 80, science: 85, english: 93 },
    contact: {
      email: 'sarah.williams@school.edu',
      phone: '+1234567898',
      address: '321 Elm St, Hamletville'
    },
    parents: [
      {
        name: 'James Williams',
        relation: 'Father',
        contact: '+1234567899',
        email: 'james.williams@email.com'
      }
    ],
    admissionDate: '2019-06-10',
    lastUpdated: '2025-03-10',
    status: 'Active',
    medicalNotes: 'None',
    extracurricular: ['Drama Club', 'Art Society']
  },
  {
    id: 'ST005',
    name: 'Robert Brown',
    class: '12A',
    section: 'Science',
    attendance: 90,
    dob: '2006-03-12',
    age: 18,
    gender: 'Male',
    bloodGroup: 'A-',
    photo: 'https://via.assets.so/album.png?id=6&q=95&w=360&h=360&fit=fill',
    disciplinaryRecords: ['Absent without notice - 2025-02-15'],
    grades: { math: 88, science: 91, english: 87 },
    contact: {
      email: 'robert.brown@school.edu',
      phone: '+1234567800',
      address: '654 Cedar Ln, Boroughburg'
    },
    parents: [
      {
        name: 'Patricia Brown',
        relation: 'Mother',
        contact: '+1234567801',
        email: 'patricia.brown@email.com'
      },
      {
        name: 'Thomas Brown',
        relation: 'Father',
        contact: '+1234567802',
        email: 'thomas.brown@email.com'
      }
    ],
    admissionDate: '2018-06-05',
    lastUpdated: '2025-03-05',
    status: 'Active',
    medicalNotes: 'Wears glasses',
    extracurricular: ['Student Council', 'Robotics Club']
  }
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0),
  marginBottom: theme.spacing(3),
  borderRadius: 12,
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)',
  overflow: 'hidden',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.12)'
  }
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(3),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}));

const InfoGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(3)
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1.5),
  '& svg': {
    marginRight: theme.spacing(1.5),
    color: theme.palette.text.secondary
  }
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  backgroundColor: status === 'Active' ? theme.palette.success.light : theme.palette.error.light,
  color: status === 'Active' ? theme.palette.success.dark : theme.palette.error.dark,
  fontWeight: 600
}));

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

const StudentDetailCard = ({ student, onClose }) => {
  const theme = useTheme();
  
  return (
    <StyledPaper>
      <HeaderContainer>
        <Box display="flex" alignItems="center">
          <Avatar 
            src={student.photo} 
            alt={student.name} 
            sx={{ width: 80, height: 80, mr: 3, border: `3px solid ${theme.palette.background.paper}` }}
          />
          <Box>
            <Typography variant="h5" fontWeight={600}>
              {student.name}
            </Typography>
            <Box display="flex" alignItems="center" mt={0.5}>
              <SchoolIcon fontSize="small" />
              <Typography variant="body1">
                {student.class} {student.section} • Student ID: {student.id}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mt={1}>
              <StatusChip 
                label={student.status} 
                status={student.status} 
                size="small" 
              />
              <Box ml={2} display="flex" alignItems="center">
                <CalendarIcon fontSize="small" />
                <Typography variant="body2">
                  Age: {student.age} • DOB: {new Date(student.dob).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box>
          <Tooltip title="Edit Student">
            <IconButton color="inherit" sx={{ mr: 1 }}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Close">
            <IconButton color="inherit" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </HeaderContainer>
      <InfoGrid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Personal Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <InfoItem>
            <PersonIcon />
            <Typography>
              <strong>Gender:</strong> {student.gender}
            </Typography>
          </InfoItem>
          
          <InfoItem>
            <AssignmentIcon />
            <Typography>
              <strong>Blood Group:</strong> {student.bloodGroup}
            </Typography>
          </InfoItem>
          
          <InfoItem>
            <CalendarIcon />
            <Typography>
              <strong>Admission Date:</strong> {new Date(student.admissionDate).toLocaleDateString()}
            </Typography>
          </InfoItem>
          
          <InfoItem>
            <AssignmentIcon />
            <Typography>
              <strong>Medical Notes:</strong> {student.medicalNotes}
            </Typography>
          </InfoItem>
          
          <InfoItem>
            <SchoolIcon />
            <Typography>
              <strong>Extracurricular Activities:</strong> {student.extracurricular.join(', ')}
            </Typography>
          </InfoItem>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Contact Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <InfoItem>
            <EmailIcon />
            <Typography>
              <strong>Email:</strong> {student.contact.email}
            </Typography>
          </InfoItem>
          
          <InfoItem>
            <PhoneIcon />
            <Typography>
              <strong>Phone:</strong> {student.contact.phone}
            </Typography>
          </InfoItem>
          
          <InfoItem>
            <AddressIcon />
            <Typography>
              <strong>Address:</strong> {student.contact.address}
            </Typography>
          </InfoItem>
          
          <Box mt={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Parent/Guardian Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {student.parents.map((parent, index) => (
              <Box key={index} mb={2}>
                <Typography fontWeight={500}>
                  {parent.name} ({parent.relation})
                </Typography>
                <Box pl={2} mt={0.5}>
                  <Typography variant="body2">
                    <PhoneIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                    {parent.contact}
                  </Typography>
                  <Typography variant="body2">
                    <EmailIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                    {parent.email}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Academic Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography fontWeight={500} gutterBottom>
                Current Grades
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={2}>
                {Object.entries(student.grades).map(([subject, grade]) => (
                  <Chip 
                    key={subject}
                    label={`${subject}: ${grade}%`}
                    color={grade >= 90 ? 'success' : grade >= 80 ? 'primary' : 'default'}
                    variant="outlined"
                  />
                ))}
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography fontWeight={500} gutterBottom>
                Attendance & Discipline
              </Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <Chip 
                  label={`Attendance: ${student.attendance}%`}
                  color={student.attendance >= 90 ? 'success' : student.attendance >= 80 ? 'primary' : 'warning'}
                />
                <Chip 
                  label={`Disciplinary Records: ${student.disciplinaryRecords.length}`}
                  color={student.disciplinaryRecords.length === 0 ? 'success' : 'warning'}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </InfoGrid>
    </StyledPaper>
  );
};

const StudentManagement = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [detailView, setDetailView] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [sectionFilter, setSectionFilter] = useState('');
  const [selectedForID, setSelectedForID] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const handleGenerateID = (student) => {
    setSelectedForID(student);
    setTabValue(2);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(1);
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setDetailView(true);
  };

  const handleCloseDetails = () => {
    setDetailView(false);
    setSelectedStudent(null);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const filteredStudents = dummyStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = classFilter ? student.class === classFilter : true;
    const matchesSection = sectionFilter ? student.section === sectionFilter : true;
    
    return matchesSearch && matchesClass && matchesSection;
  });

  const uniqueClasses = [...new Set(dummyStudents.map(student => student.class))];
  const uniqueSections = [...new Set(dummyStudents.map(student => student.section))];

  const paginatedStudents = filteredStudents.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              Student Management
            </Typography>
            {detailView && (
              <Button 
                variant="outlined" 
                startIcon={<CloseIcon />}
                onClick={handleCloseDetails}
              >
                Back to list 
              </Button>
            )}
          </Box>
        </Grid>

        {!detailView && (
          <Grid item xs={12}>
            <Paper sx={{ p: 2, mb: 3 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search students by name or ID..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setPage(1);
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Class</InputLabel>
                    <Select
                      value={classFilter}
                      onChange={(e) => {
                        setClassFilter(e.target.value);
                        setPage(1);
                      }}
                      label="Class"
                    >
                      <MenuItem value="">All Classes</MenuItem>
                      {uniqueClasses.map(cls => (
                        <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Section</InputLabel>
                    <Select
                      value={sectionFilter}
                      onChange={(e) => {
                        setSectionFilter(e.target.value);
                        setPage(1);
                      }}
                      label="Section"
                    >
                      <MenuItem value="">All Sections</MenuItem>
                      {uniqueSections.map(sec => (
                        <MenuItem key={sec} value={sec}>{sec}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<FilterIcon />}
                    onClick={() => {
                      setSearchTerm('');
                      setClassFilter('');
                      setSectionFilter('');
                      setPage(1);
                    }}
                  >
                    Clear Filters
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}

        <Grid item xs={12}>
          {detailView ? (
            <StudentDetailCard student={selectedStudent} onClose={handleCloseDetails} />
          ) : (
            <StyledPaper elevation={3}>
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
                <Tab label="Student Profiles" icon={<PersonIcon />} iconPosition="start" />
                <Tab label="Attendance Tracking" icon={<CalendarIcon />} iconPosition="start" />
                <Tab label="ID Card Generator" icon={<IdCardIcon />} iconPosition="start" />
                <Tab label="Progress Reports" icon={<ProgressIcon />} iconPosition="start" />
              </Tabs>

              <TabPanel value={tabValue} index={0}>
                <StudentProfile 
                  students={paginatedStudents}
                  onSelectStudent={handleViewDetails}
                  onGenerateID={handleGenerateID}
                  selectedForID={selectedForID}
                />
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <AttendanceTracker students={paginatedStudents} />
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <IDCardGenerator student={selectedForID} />
              </TabPanel>

              <TabPanel value={tabValue} index={3}>
                <ProgressReports students={paginatedStudents} />
              </TabPanel>

              {!detailView && filteredStudents.length > itemsPerPage && (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                  <Pagination
                    count={Math.ceil(filteredStudents.length / itemsPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    showFirstButton
                    showLastButton
                  />
                </Box>
              )}
            </StyledPaper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default StudentManagement;