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
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import clsx from 'clsx';
import './AdminDashboard.css';

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
        email: 'doe@school.com',
        subjects: [
          { subjectId: 'SUB-001', classes: ['Grade 6'] },
          { subjectId: 'SUB-003', classes: ['Grade 3'] }
        ] 
      },
    ],
    subjects: [
      { id: 'SUB-001', name: 'Mathematics', classes: ['Grade 5', 'Grade 6'], teachers: [] },
      { id: 'SUB-002', name: 'Science', classes: ['Grade 4', 'Grade 5'], teachers: [] },
      { id: 'SUB-003', name: 'English', classes: ['Grade 3', 'Grade 4'], teachers: [] },
    ],
    classLevels: [
      'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
      'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10',
      'Grade 11', 'Grade 12'
    ],
    parents: [
      { id: 'PAR-001', name: 'Mike Parent', wards: ['STU-1001'] },
    ],
    fees: [
      { id: 'FEE001', studentId: 'STU-1001', term: '2024-25 Term 1', type: 'Tuition', amountDue: 25000, amountPaid: 25000, paymentDate: '2025-01-15', paymentMode: 'Online', invoiceNo: 'INV001', dueDate: '2025-01-10', scholarship: 0, refunded: 0, status: 'Paid' },
      { id: 'FEE002', studentId: 'STU-1002', term: '2024-25 Term 1', type: 'Tuition', amountDue: 30000, amountPaid: 15000, paymentDate: '2025-02-01', paymentMode: 'Cash', invoiceNo: 'INV002', dueDate: '2025-01-10', scholarship: 5000, refunded: 0, status: 'Partially Paid' },
      { id: 'FEE003', studentId: 'STU-1003', term: '2024-25 Term 1', type: 'Boarding', amountDue: 15000, amountPaid: 0, paymentDate: '', paymentMode: '', invoiceNo: 'INV003', dueDate: '2025-01-05', scholarship: 0, refunded: 0, status: 'Unpaid' },
      { id: 'FEE004', studentId: 'STU-1004', term: '2024-25 Term 2', type: 'Tuition', amountDue: 20000, amountPaid: 20000, paymentDate: '2025-01-20', paymentMode: 'Bank Transfer', invoiceNo: 'INV004', dueDate: '2025-01-15', scholarship: 2000, refunded: 0, status: 'Paid' },
      { id: 'FEE005', studentId: 'STU-1005', term: '2024-25 Term 2', type: 'PTA', amountDue: 25000, amountPaid: 25000, paymentDate: '2025-02-15', paymentMode: 'POS', invoiceNo: 'INV005', dueDate: '2025-02-10', scholarship: 0, refunded: 0, status: 'Paid' },
      { id: 'FEE006', studentId: 'STU-1006', term: '2024-25 Term 3', type: 'Tuition', amountDue: 24500, amountPaid: 20000, paymentDate: '2025-03-01', paymentMode: 'Online', invoiceNo: 'INV006', dueDate: '2025-02-28', scholarship: 0, refunded: 500, status: 'Partially Paid' },
       { id: 'FEE007', studentId: 'STU-1001', term: '2024-25 Term 1', type: 'Boarding', amountDue: 23200, amountPaid: 23200, paymentDate: '2025-01-09', paymentMode: 'Bank Transfer', invoiceNo: 'INV001', dueDate: '2024-12-29', scholarship: 2000, refunded: 0, status: 'Paid' },
    { id: 'FEE008', studentId: 'STU-1002', term: '2024-25 Term 2', type: 'Library', amountDue: 24844, amountPaid: 23249, paymentDate: '2025-01-15', paymentMode: 'Cash', invoiceNo: 'INV002', dueDate: '2024-12-27', scholarship: 0, refunded: 500, status: 'Partially Paid' },
    { id: 'FEE009', studentId: 'STU-1003', term: '2024-25 Term 3', type: 'PTA', amountDue: 20952, amountPaid: 0, paymentDate: '', paymentMode: '', invoiceNo: 'INV003', dueDate: '2024-12-29', scholarship: 3000, refunded: 0, status: 'Unpaid' },
    { id: 'FEE010', studentId: 'STU-1004', term: '2024-25 Term 1', type: 'Boarding', amountDue: 26235, amountPaid: 26235, paymentDate: '2025-01-07', paymentMode: 'Cash', invoiceNo: 'INV004', dueDate: '2025-01-01', scholarship: 1000, refunded: 0, status: 'Paid' },
    { id: 'FEE011', studentId: 'STU-1005', term: '2024-25 Term 3', type: 'Library', amountDue: 21795, amountPaid: 21795, paymentDate: '2025-01-08', paymentMode: 'Bank Transfer', invoiceNo: 'INV005', dueDate: '2024-12-28', scholarship: 0, refunded: 0, status: 'Paid' },
    { id: 'FEE012', studentId: 'STU-1006', term: '2024-25 Term 3', type: 'Boarding', amountDue: 20532, amountPaid: 20532, paymentDate: '2025-01-16', paymentMode: 'Bank Transfer', invoiceNo: 'INV006', dueDate: '2024-12-29', scholarship: 2000, refunded: 0, status: 'Paid' },
    { id: 'FEE013', studentId: 'STU-1007', term: '2024-25 Term 2', type: 'Library', amountDue: 27817, amountPaid: 27817, paymentDate: '2025-02-28', paymentMode: 'Online', invoiceNo: 'INV007', dueDate: '2024-12-26', scholarship: 2000, refunded: 0, status: 'Paid' },
    { id: 'FEE014', studentId: 'STU-1008', term: '2024-25 Term 2', type: 'Library', amountDue: 26236, amountPaid: 21301, paymentDate: '2025-02-06', paymentMode: 'Cash', invoiceNo: 'INV008', dueDate: '2024-12-31', scholarship: 2000, refunded: 500, status: 'Partially Paid' },
    { id: 'FEE015', studentId: 'STU-1009', term: '2024-25 Term 2', type: 'Lab', amountDue: 29480, amountPaid: 29480, paymentDate: '2025-02-07', paymentMode: 'Cash', invoiceNo: 'INV009', dueDate: '2025-01-05', scholarship: 0, refunded: 0, status: 'Paid' },
    { id: 'FEE016', studentId: 'STU-1010', term: '2024-25 Term 3', type: 'Boarding', amountDue: 21523, amountPaid: 17913, paymentDate: '2025-02-20', paymentMode: 'Online', invoiceNo: 'INV010', dueDate: '2024-12-28', scholarship: 1000, refunded: 1000, status: 'Partially Paid' },
      { id: 'FEE016', studentId: 'STU-1016', term: '2024-25 Term 1', type: 'Tuition', amountDue: 25000, amountPaid: 25000, paymentDate: '2025-01-10', paymentMode: 'POS', invoiceNo: 'INV016', dueDate: '2025-01-05', scholarship: 0, refunded: 0, status: 'Paid' },
  { id: 'FEE017', studentId: 'STU-1017', term: '2024-25 Term 2', type: 'Boarding', amountDue: 18000, amountPaid: 9000, paymentDate: '2025-01-20', paymentMode: 'Cash', invoiceNo: 'INV017', dueDate: '2025-01-15', scholarship: 2000, refunded: 0, status: 'Partially Paid' },
  { id: 'FEE018', studentId: 'STU-1018', term: '2024-25 Term 3', type: 'Library', amountDue: 12000, amountPaid: 0, paymentDate: '', paymentMode: '', invoiceNo: 'INV018', dueDate: '2025-02-01', scholarship: 1000, refunded: 0, status: 'Unpaid' },
  { id: 'FEE019', studentId: 'STU-1019', term: '2024-25 Term 1', type: 'PTA', amountDue: 5000, amountPaid: 5000, paymentDate: '2025-01-05', paymentMode: 'Online', invoiceNo: 'INV019', dueDate: '2025-01-03', scholarship: 0, refunded: 0, status: 'Paid' },
  { id: 'FEE020', studentId: 'STU-1020', term: '2024-25 Term 2', type: 'Lab', amountDue: 15000, amountPaid: 15000, paymentDate: '2025-02-10', paymentMode: 'Bank Transfer', invoiceNo: 'INV020', dueDate: '2025-02-05', scholarship: 0, refunded: 0, status: 'Paid' },
  { id: 'FEE021', studentId: 'STU-1021', term: '2024-25 Term 1', type: 'Tuition', amountDue: 26000, amountPaid: 20000, paymentDate: '2025-01-12', paymentMode: 'POS', invoiceNo: 'INV021', dueDate: '2025-01-10', scholarship: 5000, refunded: 1000, status: 'Partially Paid' },
  { id: 'FEE022', studentId: 'STU-1022', term: '2024-25 Term 2', type: 'Tuition', amountDue: 24000, amountPaid: 24000, paymentDate: '2025-01-18', paymentMode: 'Online', invoiceNo: 'INV022', dueDate: '2025-01-14', scholarship: 0, refunded: 0, status: 'Paid' },
  { id: 'FEE023', studentId: 'STU-1023', term: '2024-25 Term 3', type: 'Boarding', amountDue: 17500, amountPaid: 15000, paymentDate: '2025-02-03', paymentMode: 'Cash', invoiceNo: 'INV023', dueDate: '2025-01-30', scholarship: 0, refunded: 0, status: 'Partially Paid' },
  { id: 'FEE024', studentId: 'STU-1024', term: '2024-25 Term 1', type: 'Library', amountDue: 8000, amountPaid: 8000, paymentDate: '2025-01-06', paymentMode: 'POS', invoiceNo: 'INV024', dueDate: '2025-01-04', scholarship: 0, refunded: 0, status: 'Paid' },
  { id: 'FEE025', studentId: 'STU-1025', term: '2024-25 Term 2', type: 'PTA', amountDue: 5000, amountPaid: 0, paymentDate: '', paymentMode: '', invoiceNo: 'INV025', dueDate: '2025-02-07', scholarship: 0, refunded: 0, status: 'Unpaid' },
  { id: 'FEE026', studentId: 'STU-1026', term: '2024-25 Term 3', type: 'Tuition', amountDue: 27000, amountPaid: 27000, paymentDate: '2025-03-01', paymentMode: 'Bank Transfer', invoiceNo: 'INV026', dueDate: '2025-02-25', scholarship: 1000, refunded: 0, status: 'Paid' },
  { id: 'FEE027', studentId: 'STU-1027', term: '2024-25 Term 1', type: 'Lab', amountDue: 9000, amountPaid: 4500, paymentDate: '2025-01-09', paymentMode: 'Cash', invoiceNo: 'INV027', dueDate: '2025-01-06', scholarship: 0, refunded: 0, status: 'Partially Paid' },
  { id: 'FEE028', studentId: 'STU-1028', term: '2024-25 Term 2', type: 'Tuition', amountDue: 22000, amountPaid: 22000, paymentDate: '2025-01-25', paymentMode: 'Online', invoiceNo: 'INV028', dueDate: '2025-01-20', scholarship: 2000, refunded: 0, status: 'Paid' },
  { id: 'FEE029', studentId: 'STU-1029', term: '2024-25 Term 3', type: 'Boarding', amountDue: 16000, amountPaid: 16000, paymentDate: '2025-03-05', paymentMode: 'Cash', invoiceNo: 'INV029', dueDate: '2025-02-28', scholarship: 0, refunded: 0, status: 'Paid' },
  { id: 'FEE030', studentId: 'STU-1030', term: '2024-25 Term 1', type: 'Library', amountDue: 7000, amountPaid: 7000, paymentDate: '2025-01-04', paymentMode: 'POS', invoiceNo: 'INV030', dueDate: '2025-01-02', scholarship: 0, refunded: 0, status: 'Paid' },
  { id: 'FEE031', studentId: 'STU-1031', term: '2024-25 Term 2', type: 'PTA', amountDue: 6000, amountPaid: 6000, paymentDate: '2025-02-15', paymentMode: 'Bank Transfer', invoiceNo: 'INV031', dueDate: '2025-02-10', scholarship: 0, refunded: 0, status: 'Paid' },
  { id: 'FEE032', studentId: 'STU-1032', term: '2024-25 Term 3', type: 'Tuition', amountDue: 29000, amountPaid: 29000, paymentDate: '2025-03-03', paymentMode: 'Online', invoiceNo: 'INV032', dueDate: '2025-02-27', scholarship: 3000, refunded: 0, status: 'Paid' },
  { id: 'FEE033', studentId: 'STU-1033', term: '2024-25 Term 1', type: 'Boarding', amountDue: 20000, amountPaid: 10000, paymentDate: '2025-01-10', paymentMode: 'Cash', invoiceNo: 'INV033', dueDate: '2025-01-07', scholarship: 0, refunded: 0, status: 'Partially Paid' },
  { id: 'FEE034', studentId: 'STU-1034', term: '2024-25 Term 2', type: 'Library', amountDue: 8500, amountPaid: 8500, paymentDate: '2025-02-12', paymentMode: 'POS', invoiceNo: 'INV034', dueDate: '2025-02-09', scholarship: 0, refunded: 0, status: 'Paid' },
  { id: 'FEE035', studentId: 'STU-1035', term: '2024-25 Term 3', type: 'Lab', amountDue: 9500, amountPaid: 9500, paymentDate: '2025-03-10', paymentMode: 'Bank Transfer', invoiceNo: 'INV035', dueDate: '2025-03-05', scholarship: 0, refunded: 0, status: 'Paid' },
  { id: 'FEE036', studentId: 'STU-1036', term: '2024-25 Term 1', type: 'Tuition', amountDue: 25000, amountPaid: 20000, paymentDate: '2025-01-06', paymentMode: 'Cash', invoiceNo: 'INV036', dueDate: '2025-01-03', scholarship: 0, refunded: 0, status: 'Partially Paid' },
  { id: 'FEE037', studentId: 'STU-1037', term: '2024-25 Term 2', type: 'PTA', amountDue: 5500, amountPaid: 5500, paymentDate: '2025-02-20', paymentMode: 'Online', invoiceNo: 'INV037', dueDate: '2025-02-15', scholarship: 0, refunded: 0, status: 'Paid' },
  { id: 'FEE038', studentId: 'STU-1038', term: '2024-25 Term 3', type: 'Boarding', amountDue: 18000, amountPaid: 18000, paymentDate: '2025-03-07', paymentMode: 'Bank Transfer', invoiceNo: 'INV038', dueDate: '2025-03-01', scholarship: 0, refunded: 0, status: 'Paid' },
  { id: 'FEE039', studentId: 'STU-1039', term: '2024-25 Term 1', type: 'Lab', amountDue: 8800, amountPaid: 8800, paymentDate: '2025-01-08', paymentMode: 'POS', invoiceNo: 'INV039', dueDate: '2025-01-04', scholarship: 0, refunded: 0, status: 'Paid' },
  { id: 'FEE040', studentId: 'STU-1040', term: '2024-25 Term 2', type: 'Tuition', amountDue: 26000, amountPaid: 26000, paymentDate: '2025-02-18', paymentMode: 'Online', invoiceNo: 'INV040', dueDate: '2025-02-12', scholarship: 2000, refunded: 0, status: 'Paid' }

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
    }))
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
    { 
      label: 'Teachers & Subjects', 
      content: (
        <TeacherSubjectManagement 
          subjects={entities.subjects || []}
          teachers={entities.teachers || []}
          classLevels={entities.classLevels || []}
          onAddSubject={handleAddSubject}
          onEditSubject={handleEditSubject}
          onAddTeacher={handleAddTeacher}
          onEditTeacher={handleEditTeacher}
          onAssignTeacher={handleAssignTeacher}
          onRemoveAssignment={handleRemoveAssignment}
          onDelete={handleDelete}
        />
      ) 
    },
    { 
      label: 'Timetable', 
      content: (
        <TimetableManagement 
          subjects={entities.subjects?.map((s) => s.name) || []}
          teachers={entities.teachers || []}
          classes={entities.classLevels || []}
        />
      ) 
    },
    { label: 'Parents', content: <ParentTab data={entities.parents || []} onEdit={handleEdit} onDelete={handleDelete} onAdd={handleAdd} /> },
    { 
      label: 'Fees', 
      content: <FeeTab 
        data={entities.fees || []} 
        students={entities.students || []}
        onEdit={handleEdit} 
        onDelete={handleDelete} 
        onAdd={handleAdd} 
      /> 
    },
    { label: 'Events', content: <EventsTab data={entities.events || []} onEdit={handleEdit} onDelete={handleDelete} onAdd={handleAdd} /> },
  ];

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <p className="dashboard-subtitle">Welcome back, {currentUser?.name || 'Admin'}</p>
      <AdminStats />
      <div className="tabs-container">
        <div className="tabs">
          {tabs.map((tab, index) => (
            <Button
              key={index}
              className={clsx('tab', { 'active-tab': tabValue === index })}
              onClick={() => handleTabChange(null, index)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
        <div className="tab-content">
          {[0, 5].includes(tabValue) && (
            <button
              className="add-button"
              onClick={() => setOpenDialog(true)}
              aria-label="Add new item"
            >
              <AddIcon /> Add New
            </button>
          )}
          {tabs[tabValue].content}
        </div>
      </div>

      <EditDialog
        open={openDialog}
        onClose={handleDialogClose}
        onSave={handleSave}
        data={editData}
        type={editData?.type || (tabValue === 0 ? 'users' : 'parents')}
      />
    </div>
  );
};

const UsersTable = ({ data, onEdit, onDelete }) => (
  <table className="dashboard-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Role</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.map((user) => (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.role}</td>
          <td>{user.email}</td>
          <td>
            <button
              className="action-button edit"
              onClick={() => onEdit(user, 'users')}
              aria-label={`Edit user ${user.name}`}
            >
              <EditIcon />
            </button>
            <button
              className="action-button delete"
              onClick={() => onDelete(user.id, 'users')}
              aria-label={`Delete user ${user.name}`}
            >
              <DeleteIcon />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
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
    <div className={clsx('dialog', { open: open })}>
      <div className="dialog-content">
        <h2>{data ? `Edit ${type}` : `Add New ${type}`}</h2>
        <div className="form-container">
          {type === 'users' && (
            <>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="Role"
                name="role"
                value={formData.role || ''}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                required
              />
            </>
          )}
          {type === 'parents' && (
            <>
              <input
                type="text"
                placeholder="ID"
                name="id"
                value={formData.id || ''}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="Wards (comma-separated IDs)"
                name="wards"
                value={formData.wards?.join(', ') || ''}
                onChange={handleChange}
                required
              />
            </>
          )}
        </div>
        <div className="dialog-actions">
          <button onClick={onClose} className="cancel-button">Cancel</button>
          <button onClick={handleSubmit} className="save-button">Save</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;