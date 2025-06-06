import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LibraryProvider } from './contexts/LibraryContext';
import { SnackbarProvider } from 'notistack';
import StudentManagement from './pages/students/StudentManagement';
import ProtectedRoute from './components/shared/ProtectedRoute';
import DashboardLayout from './components/dashboard/DashboardLayout'; // Import DashboardLayout
import Login from './pages/auth/Login';
import Home from './pages/Home';
import Features from './pages/Features';
import About from './pages/About';
import Pricing from './pages/Pricing';
import GetDemo from './pages/GetDemo';
import ContactUs from './pages/ContactUs';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import AdminDashboard from './pages/dashboard/AdminDashboard/AdminDashboard';
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
import LibraryOverview from './pages/library/LibraryOverview';

import './App.css';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <AuthProvider>
          <LibraryProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/demo" element={<GetDemo />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/features" element={<Features />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/" element={<Home />} />

              {/* Dashboard Routes with DashboardLayout */}
              <Route element={<DashboardLayout />}>
                {/* Admin Routes */}
                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                  <Route path="/dashboard/admin" element={<AdminDashboard />} />
                </Route>

                {/* Teacher Routes */}
                <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
                  <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
                  <Route path="/students" element={<StudentManagement />} />
                </Route>

                {/* Student Routes */}
                <Route element={<ProtectedRoute allowedRoles={['student']} />}>
                  <Route path="/dashboard/student" element={<StudentDashboard />} />
                </Route>

                {/* Parent Routes */}
                <Route element={<ProtectedRoute allowedRoles={['parent']} />}>
                  <Route path="/dashboard/parent" element={<ParentDashboard />} />
                </Route>
                

                {/* Library Routes */}
                <Route path="/library" element={<LibraryDashboard />}>
                  <Route index element={<LibraryOverview />} />
                  <Route path="dashboard" element={<LibraryOverview />} />
                  <Route path="physical-books" element={<PhysicalBooks />} />
                  <Route path="digital-resources" element={<DigitalResources />} />
                  <Route path="circulation" element={<Circulation />} />
                </Route>
              </Route>

              {/* Redirect root to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </LibraryProvider>
        </AuthProvider>
      </Router>
    </SnackbarProvider>
  );
}

export default App;