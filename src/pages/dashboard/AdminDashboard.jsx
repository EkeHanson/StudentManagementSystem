import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Add as AddIcon 
} from '@mui/icons-material';
import AdminStats from '../../components/dashboard/AdminStats';
import TeacherSubjectManagement from './TeacherSubjectManagement';
import TimetableManagement from './TimetableManagement';

const dummyData = {
  users: [
    { id: 1, name: 'John Admin', role: 'admin', email: 'john@admin.com' },
    { id: 2, name: 'Jane Teacher', role: 'teacher', email: 'jane@teacher.com' },
  ],
  students: [
    { id: 'STU-1001', name: 'John Doe', class: 'Grade 5', attendance: '92%' },
  ],
  teachers: [
    { id: 'TCH-001', name: 'Jane Smith', subjects: ['Math', 'Science'] },
  ],
  parents: [
    { id: 'PAR-001', name: 'Mike Parent', wards: ['STU-1001'] },
  ],
  fees: { totalCollected: 124500, pending: 15000 },
  events: [
    { 
      id: 1, 
      title: 'Science Fair', 
      startDate: '2025-04-15', 
      endDate: '2025-04-15',
      description: 'Annual science fair exhibition',
      type: 'event'
    },
    { 
      id: 2, 
      title: 'Final Exams', 
      startDate: '2025-06-10', 
      endDate: '2025-06-20',
      description: 'End of year examinations for all grades',
      type: 'exam'
    },
    { 
      id: 3, 
      title: 'Summer Break', 
      startDate: '2025-07-01', 
      endDate: '2025-08-31',
      description: 'School summer vacation',
      type: 'holiday'
    }
  ],
};

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState(null);
  const [entities, setEntities] = useState(dummyData);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEdit = (entity, type) => {
    setEditData({ ...entity, type });
    setOpenDialog(true);
  };

  const handleDelete = (id, type) => {
    setEntities((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item.id !== id),
    }));
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditData(null);
  };

  const handleSave = (data) => {
    if (editData) {
      setEntities((prev) => ({
        ...prev,
        [editData.type]: prev[editData.type].map((item) =>
          item.id === editData.id ? { ...item, ...data } : item
        ),
      }));
    } else {
      let entityType;
      switch(tabValue) {
        case 0: entityType = 'users'; break;
        case 1: entityType = 'students'; break;
        case 2: entityType = 'teachers'; break;
        case 3: entityType = 'parents'; break;
        case 6: entityType = 'events'; break;
        default: entityType = 'users';
      }
      
      const newItem = { 
        id: Date.now(), 
        ...data,
        ...(entityType === 'events' && { 
          type: data.type || 'event',
          endDate: data.endDate || data.startDate 
        })
      };
      
      setEntities((prev) => ({
        ...prev,
        [entityType]: [...prev[entityType], newItem],
      }));
    }
    handleDialogClose();
  };

  const tabs = [
    { label: 'Users', content: <UsersTab data={entities.users} onEdit={handleEdit} onDelete={handleDelete} /> },
    { label: 'Students', content: <StudentsTab data={entities.students} onEdit={handleEdit} onDelete={handleDelete} /> },
    { label: 'Teachers & Subjects', content: <TeacherSubjectManagement /> },
    { label: 'Timetable', content: <TimetableManagement /> },
    { label: 'Parents', content: <ParentsTab data={entities.parents} onEdit={handleEdit} onDelete={handleDelete} /> },
    { label: 'Fees', content: <FeesTab data={entities.fees} /> },
    { label: 'Events', content: <EventsTab data={entities.events} onEdit={handleEdit} onDelete={handleDelete} /> },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Admin Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Welcome back, {currentUser?.name || 'Admin'}
      </Typography>

      <AdminStats />

      <Box sx={{ mt: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
            sx={{ mb: 2 }}
          >
            Add New
          </Button>
          {tabs[tabValue].content}
        </Box>
      </Box>

      <EditDialog
        open={openDialog}
        onClose={handleDialogClose}
        onSave={handleSave}
        data={editData}
        type={tabValue === 0 ? 'users' : 
             tabValue === 1 ? 'students' : 
             tabValue === 2 ? 'teachers' : 
             tabValue === 3 ? 'parents' : 
             tabValue === 6 ? 'events' : 'users'}
      />
    </Container>
  );
};

const UsersTab = ({ data, onEdit, onDelete }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Role</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((user) => (
        <TableRow key={user.id}>
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.role}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>
            <IconButton onClick={() => onEdit(user, 'users')}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(user.id, 'users')}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const StudentsTab = ({ data, onEdit, onDelete }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Class</TableCell>
        <TableCell>Attendance</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((student) => (
        <TableRow key={student.id}>
          <TableCell>{student.id}</TableCell>
          <TableCell>{student.name}</TableCell>
          <TableCell>{student.class}</TableCell>
          <TableCell>{student.attendance}</TableCell>
          <TableCell>
            <IconButton onClick={() => onEdit(student, 'students')}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(student.id, 'students')}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const TeachersTab = ({ data, onEdit, onDelete }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Subjects</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((teacher) => (
        <TableRow key={teacher.id}>
          <TableCell>{teacher.id}</TableCell>
          <TableCell>{teacher.name}</TableCell>
          <TableCell>{teacher.subjects.join(', ')}</TableCell>
          <TableCell>
            <IconButton onClick={() => onEdit(teacher, 'teachers')}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(teacher.id, 'teachers')}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const ParentsTab = ({ data, onEdit, onDelete }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Wards</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((parent) => (
        <TableRow key={parent.id}>
          <TableCell>{parent.id}</TableCell>
          <TableCell>{parent.name}</TableCell>
          <TableCell>{parent.wards.join(', ')}</TableCell>
          <TableCell>
            <IconButton onClick={() => onEdit(parent, 'parents')}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(parent.id, 'parents')}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const FeesTab = ({ data }) => (
  <Box>
    <Typography>Total Collected: ${data.totalCollected.toLocaleString()}</Typography>
    <Typography>Pending: ${data.pending.toLocaleString()}</Typography>
  </Box>
);

const EventsTab = ({ data, onEdit, onDelete }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Title</TableCell>
        <TableCell>Type</TableCell>
        <TableCell>Date</TableCell>
        <TableCell>Description</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((event) => (
        <TableRow key={event.id}>
          <TableCell>{event.title}</TableCell>
          <TableCell>
            <Chip 
              label={event.type} 
              color={
                event.type === 'exam' ? 'primary' :
                event.type === 'holiday' ? 'success' : 'default'
              } 
              variant="outlined"
            />
          </TableCell>
          <TableCell>
            {event.startDate === event.endDate 
              ? new Date(event.startDate).toLocaleDateString()
              : `${new Date(event.startDate).toLocaleDateString()} - ${new Date(event.endDate).toLocaleDateString()}`}
          </TableCell>
          <TableCell sx={{ maxWidth: 300 }}>{event.description}</TableCell>
          <TableCell>
            <IconButton onClick={() => onEdit(event, 'events')}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(event.id, 'events')}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const EditDialog = ({ open, onClose, onSave, data, type }) => {
  const [formData, setFormData] = useState(data || {});
  const [dateError, setDateError] = useState('');

  useEffect(() => {
    setFormData(data || {});
    setDateError('');
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear date error when dates change
    if (name === 'startDate' || name === 'endDate') {
      setDateError('');
    }
  };

  const handleSubmit = () => {
    if (type === 'events') {
      if (!formData.startDate) {
        setDateError('Start date is required');
        return;
      }
      
      const endDate = formData.endDate || formData.startDate;
      if (new Date(endDate) < new Date(formData.startDate)) {
        setDateError('End date cannot be before start date');
        return;
      }
      
      // Ensure we have the final end date
      formData.endDate = endDate;
    }

    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{data ? `Edit ${type}` : `Add New ${type}`}</DialogTitle>
      <DialogContent>
        {type === 'users' && (
          <>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Role"
              name="role"
              value={formData.role || ''}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              margin="normal"
              required
              type="email"
            />
          </>
        )}

        {type === 'students' && (
          <>
            <TextField
              fullWidth
              label="ID"
              name="id"
              value={formData.id || ''}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Class"
              name="class"
              value={formData.class || ''}
              onChange={handleChange}
              margin="normal"
              required
            />
          </>
        )}

        {type === 'parents' && (
          <>
            <TextField
              fullWidth
              label="ID"
              name="id"
              value={formData.id || ''}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Wards (comma-separated IDs)"
              name="wards"
              value={formData.wards?.join(', ') || ''}
              onChange={(e) => handleChange({ target: { name: 'wards', value: e.target.value.split(', ') } })}
              margin="normal"
              required
            />
          </>
        )}

        {type === 'events' && (
          <>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              margin="normal"
              required
            />
            
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Event Type</InputLabel>
              <Select
                name="type"
                value={formData.type || 'event'}
                onChange={handleChange}
                label="Event Type"
              >
                <MenuItem value="event">Regular Event</MenuItem>
                <MenuItem value="exam">Exam</MenuItem>
                <MenuItem value="holiday">Holiday</MenuItem>
                <MenuItem value="meeting">Meeting</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <TextField
                fullWidth
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate || ''}
                onChange={handleChange}
                margin="normal"
                required
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!dateError}
              />
              <TextField
                fullWidth
                label="End Date"
                name="endDate"
                type="date"
                value={formData.endDate || formData.startDate || ''}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!dateError}
                helperText={dateError}
              />
            </Box>

            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminDashboard;