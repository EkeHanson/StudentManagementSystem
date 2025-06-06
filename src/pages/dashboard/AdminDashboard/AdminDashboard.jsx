import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import StudentList from '../StudentList/StudentList';
import Classes from './Classes/Classes';
import AdminStats from '../../../components/dashboard/AdminStats';
import TeacherSubjectManagement from './TeacherSubjectManagement/TeacherSubjectManagement';
import TimetableManagement from '../TimetableManagement';
import EventsTab from './EventsTab';
import ParentTab from './ParentTab/ParentTab';
import FeeTab from './FeeTab/FeeTab';
import { Tabs, Tab, Button, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState(null);
  const [entities, setEntities] = useState({
    users: [
      { id: 1, name: 'John Admin', role: 'admin', email: 'john@admin.com' },
      { id: 2, name: 'Jane Teacher', role: 'teacher', email: 'jane@teacher.com' },
    ],
    students: [
      { id: 'STU-1001', name: 'John Doe', class: 'Grade 5', attendance: '92%', gender: 'Male', status: 'Active' },
      { id: 'STU-1002', name: 'Emma Smith', class: 'Grade 7', attendance: '88%', gender: 'Female', status: 'Active' },
      { id: 'STU-1003', name: 'Liam Johnson', class: 'Grade 6', attendance: '95%', gender: 'Male', status: 'Inactive' },
      { id: 'STU-1004', name: 'Olivia Brown', class: 'Grade 4', attendance: '90%', gender: 'Female', status: 'Active' },
      { id: 'STU-1005', name: 'Noah Williams', class: 'Grade 8', attendance: '85%', gender: 'Male', status: 'Active' },
      { id: 'STU-1006', name: 'Ava Jones', class: 'Grade 3', attendance: '97%', gender: 'Female', status: 'Active' },
    ],
    classes: [
      { id: 'CLS-001', name: 'Grade 3' },
      { id: 'CLS-002', name: 'Grade 4' },
      { id: 'CLS-003', name: 'Grade 5' },
      { id: 'CLS-004', name: 'Grade 6' },
      { id: 'CLS-005', name: 'Grade 7' },
      { id: 'CLS-006', name: 'Grade 8' },
      { id: 'CLS-007', name: 'Grade 9' },
    ],
    teachers: [
      { id: 'TCH-001', name: 'Jane Smith', email: 'jane@school.com', subjects: [{ subjectId: 'SUB-001', classes: ['Grade 5'] }, { subjectId: 'SUB-002', classes: ['Grade 4'] }] },
      { id: 'TCH-002', name: 'John Doe', email: 'doe@school.com', subjects: [{ subjectId: 'SUB-001', classes: ['Grade 6'] }, { subjectId: 'SUB-003', classes: ['Grade 3'] }] },
    ],
    subjects: [
      { id: 'SUB-001', name: 'Mathematics', classes: ['Grade 5', 'Grade 6'], teachers: [] },
      { id: 'SUB-002', name: 'Science', classes: ['Grade 4', 'Grade 5'], teachers: [] },
      { id: 'SUB-003', name: 'English', classes: ['Grade 3', 'Grade 4'], teachers: [] },
    ],
    classLevels: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
    parents: [{ id: 'PAR-001', name: 'Mike Parent', wards: ['STU-1001'] }],
    fees: [
      { id: 'FEE001', studentId: 'STU-1001', term: '2024-25 Term 1', type: 'Tuition', amountDue: 25000, amountPaid: 25000, paymentDate: '2025-01-15', paymentMode: 'Online', invoiceNo: 'INV001', dueDate: '2025-01-10', scholarship: 0, refunded: 0, status: 'Paid' },
      // ... (other fee entries remain unchanged)
    ],
    events: [
      { id: 1, title: 'Science Fair', startDate: '2025-04-15', endDate: '2025-04-15', description: 'Annual science fair exhibition', type: 'event' },
      { id: 2, title: 'Final Exams', startDate: '2025-06-10', endDate: '2025-06-20', description: 'End of year examinations for all grades', type: 'exam' },
    ],
  });

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

  const handleAdd = (data, type) => {
    const newItem = {
      id: type === 'students' || type === 'fees' ? data.id : Date.now(),
      ...data,
      ...(type === 'events' && {
        type: data.type || 'event',
        endDate: data.endDate || data.startDate,
      }),
      ...(type === 'parents' && {
        wards: data.wards || [],
      }),
      ...(type === 'fees' && {
        amountDue: parseFloat(data.amountDue) || 0,
        amountPaid: parseFloat(data.amountPaid) || 0,
        scholarship: parseFloat(data.scholarship) || 0,
        refunded: parseFloat(data.refunded) || 0,
      }),
    };

    setEntities((prev) => ({
      ...prev,
      [type]: [...prev[type], newItem],
    }));
  };

  const handleAddSubject = (subject) => {
    setEntities((prev) => ({
      ...prev,
      subjects: [...prev.subjects, subject],
    }));
  };

  const handleEditSubject = (subject) => {
    setEntities((prev) => ({
      ...prev,
      subjects: prev.subjects.map((s) => (s.id === subject.id ? { ...s, ...subject } : s)),
    }));
  };

  const handleAddTeacher = (teacher) => {
    setEntities((prev) => ({
      ...prev,
      teachers: [...prev.teachers, teacher],
    }));
  };

  const handleEditTeacher = (teacher) => {
    setEntities((prev) => ({
      ...prev,
      teachers: prev.teachers.map((t) => (t.id === teacher.id ? { ...t, ...teacher } : t)),
    }));
  };

  const handleAssignTeacher = (teacherId, subjectId, selectedClasses) => {
    setEntities((prev) => ({
      ...prev,
      teachers: prev.teachers.map((teacher) => {
        if (teacher.id === teacherId) {
          const existingSubjectIndex = teacher.subjects.findIndex(
            (sub) => sub.subjectId === subjectId
          );
          if (existingSubjectIndex >= 0) {
            const updatedSubjects = [...teacher.subjects];
            const existingClasses = updatedSubjects[existingSubjectIndex].classes;
            const newClasses = [...new Set([...existingClasses, ...selectedClasses])];
            updatedSubjects[existingSubjectIndex] = {
              subjectId,
              classes: newClasses,
            };
            return { ...teacher, subjects: updatedSubjects };
          } else {
            return {
              ...teacher,
              subjects: [...teacher.subjects, { subjectId, classes: selectedClasses }],
            };
          }
        }
        return teacher;
      }),
    }));
  };

  const handleRemoveAssignment = (teacherId, subjectId) => {
    setEntities((prev) => ({
      ...prev,
      teachers: prev.teachers.map((teacher) => {
        if (!teacherId || teacher.id === teacherId) {
          return {
            ...teacher,
            subjects: teacher.subjects.filter((sub) => sub.subjectId !== subjectId),
          };
        }
        return teacher;
      }),
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
      const entityType = tabValue === 0 ? 'users' : tabValue === 5 ? 'parents' : 'fees';
      handleAdd(data, entityType);
    }
    handleDialogClose();
  };

  const tabs = [
    { label: 'Users', content: <UsersTable data={entities.users || []} onEdit={handleEdit} onDelete={handleDelete} /> },
    { label: 'Classes', content: <Classes data={entities.classes || []} onEdit={handleEdit} onDelete={handleDelete} onAdd={handleAdd} /> },
    { label: 'Students', content: <StudentList data={entities.students || []} onEdit={handleEdit} onDelete={handleDelete} onAdd={handleAdd} /> },
    { label: 'Teachers & Subjects', content: <TeacherSubjectManagement subjects={entities.subjects || []} teachers={entities.teachers || []} classLevels={entities.classLevels || []} onAddSubject={handleAddSubject} onEditSubject={handleEditSubject} onAddTeacher={handleAddTeacher} onEditTeacher={handleEditTeacher} onAssignTeacher={handleAssignTeacher} onRemoveAssignment={handleRemoveAssignment} onDelete={handleDelete} /> },
    { label: 'Timetable', content: <TimetableManagement subjects={entities.subjects?.map((s) => s.name) || []} teachers={entities.teachers || []} classes={entities.classLevels || []} /> },
    { label: 'Parents', content: <ParentTab data={entities.parents || []} onEdit={handleEdit} onDelete={handleDelete} onAdd={handleAdd} /> },
    { label: 'Fees', content: <FeeTab data={entities.fees || []} students={entities.students || []} onEdit={handleEdit} onDelete={handleDelete} onAdd={handleAdd} /> },
    { label: 'Events', content: <EventsTab data={entities.events || []} onEdit={handleEdit} onDelete={handleDelete} onAdd={handleAdd} /> },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Welcome back, {currentUser?.name || 'Admin'}
      </Typography>
      <AdminStats />
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>
      <Box sx={{ mt: 2 }}>
        {[0, 5].includes(tabValue) && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
            sx={{ mb: 2 }}
          >
            Add New
          </Button>
        )}
        {tabs[tabValue].content}
      </Box>
      <EditDialog
        open={openDialog}
        onClose={handleDialogClose}
        onSave={handleSave}
        data={editData}
        type={editData?.type || (tabValue === 0 ? 'users' : 'parents')}
      />
    </Box>
  );
};

const UsersTable = ({ data, onEdit, onDelete }) => (
  <Box sx={{ overflowX: 'auto' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Name</th>
          <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Role</th>
          <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Email</th>
          <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.id}>
            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{user.name}</td>
            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{user.role}</td>
            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{user.email}</td>
            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
              <IconButton onClick={() => onEdit(user, 'users')} aria-label={`Edit user ${user.name}`}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(user.id, 'users')} aria-label={`Delete user ${user.name}`}>
                <DeleteIcon />
              </IconButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </Box>
);

const EditDialog = ({ open, onClose, onSave, data, type }) => {
  const [formData, setFormData] = useState(data || {});

  useEffect(() => {
    setFormData(data || {});
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'wards' ? value.split(', ').filter((v) => v) : value,
    }));
  };

  const handleSubmit = () => {
    if (
      (type === 'users' && (!formData.name || !formData.role || !formData.email)) ||
      (type === 'parents' && (!formData.id || !formData.name || !formData.wards?.length))
    ) {
      return;
    }
    onSave(formData);
  };

  return (
    <Box sx={{ display: open ? 'block' : 'none', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, bgcolor: 'rgba(0,0,0,0.5)', zIndex: 1300 }}>
      <Box sx={{ bgcolor: 'background.paper', p: 3, m: 'auto', mt: '10%', maxWidth: 400, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          {data ? `Edit ${type}` : `Add New ${type}`}
        </Typography>
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
              onChange={handleChange}
              margin="normal"
              required
            />
          </>
        )}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Save</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;