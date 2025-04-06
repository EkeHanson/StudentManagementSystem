// src/App.jsx (unchanged from your latest version except typo fixes)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import StudentManagement from './pages/students/StudentManagement';
import ProtectedRoute from './components/shared/ProtectedRoute';
import Layout from './components/shared/Layout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import AdminDashboard from './pages/dashboard/AdminDashboard'; // Fixed typo
import TeacherDashboard from './pages/dashboard/TeacherDashboard';
import StudentDashboard from './pages/dashboard/StudentDashboard'; 
import ParentDashboard from './pages/dashboard/ParentDashboard'; 
import Unauthorized from './pages/errors/Unauthorized'; // Fixed path
import { Navigate } from 'react-router-dom';

import './App.css';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/unauthorized" element={<Unauthorized />} />


          {/* To be deleted start here*/}
          <Route path="/dashboard/admin" element={<AdminDashboard />} />

              {/* To be deleted ends here */}

          <Route element={<Layout />}>
            {/* <Route element={<ProtectedRoute allowedRoles={['admin']} />}> */}
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
            {/* </Route> */}

            {/* <Route element={<ProtectedRoute allowedRoles={['teacher']} />}> */}
              <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
              <Route path="/students" element={<StudentManagement />} />
            {/* </Route> */}

            {/* <Route element={<ProtectedRoute allowedRoles={['student']} />}> */}
              <Route path="/dashboard/student" element={<StudentDashboard />} />
            {/* </Route> */}

            {/* <Route element={<ProtectedRoute allowedRoles={['parent']} />}> */}
              <Route path="/dashboard/parent" element={<ParentDashboard />} />
            {/* </Route> */}

            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;