import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LibraryProvider } from './contexts/LibraryContext';
import { SnackbarProvider } from 'notistack';
import StudentManagement from './pages/students/StudentManagement';
import ProtectedRoute from './components/shared/ProtectedRoute';
import Layout from './components/shared/Layout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import TeacherDashboard from './pages/dashboard/TeacherDashboard';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import ParentDashboard from './pages/dashboard/ParentDashboard';
import Unauthorized from './pages/errors/Unauthorized';
import { Navigate } from 'react-router-dom';

// Library Pages
import LibraryDashboard from './pages/library/LibraryDashboard';
import PhysicalBooks from './pages/library/PhysicalBooks';
import DigitalResources from './pages/library/DigitalResources';
import Circulation from './pages/library/Circulation';
import LibraryOverview  from './pages/library/LibraryOverview';

import './App.css';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <AuthProvider>
          <LibraryProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/unauthorized" element={<Unauthorized />} />



              <Route element={<Layout />}>
                {/* Admin Routes */}
                {/* <Route element={<ProtectedRoute allowedRoles={['admin']} />}> */}
                  <Route path="/dashboard/admin" element={<AdminDashboard />} />
             {/* Library Routes */}
              <Route path="/library" element={<LibraryDashboard />}>
                  <Route index element={<LibraryOverview />} />
                  <Route path="dashboard" element={<LibraryOverview />} />
                  <Route path="physical-books" element={<PhysicalBooks />} />
                  <Route path="digital-resources" element={<DigitalResources />} />
                  <Route path="circulation" element={<Circulation />} />
              </Route>
                {/* </Route> */}

                {/* Teacher Routes */}
                {/* <Route element={<ProtectedRoute allowedRoles={['teacher']} />}> */}
                  <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
                  <Route path="/students" element={<StudentManagement />} />
                  <Route path="/library" element={<LibraryDashboard />} />
                  <Route path="/library/physical-books" element={<PhysicalBooks />} />
                  <Route path="/library/digital-resources" element={<DigitalResources />} />
                {/* </Route> */}

                {/* Student Routes */}
                {/* <Route element={<ProtectedRoute allowedRoles={['student']} />}> */}
                  <Route path="/dashboard/student" element={<StudentDashboard />} />
                  <Route path="/library" element={<LibraryDashboard />} />
                  <Route path="/library/digital-resources" element={<DigitalResources />} />
                {/* </Route> */}

                {/* Parent Routes */}
                <Route element={<ProtectedRoute allowedRoles={['parent']} />}>
                  <Route path="/dashboard/parent" element={<ParentDashboard />} />
                </Route>

                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Route>
            </Routes>
          </LibraryProvider>
        </AuthProvider>
      </Router>
    </SnackbarProvider>
  );
}

export default App;