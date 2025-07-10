import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';

// Public Pages
import LandingPage from './pages/LandingPage';
import RegistrationChoice from './pages/RegistrationChoice';
import WorkerRegistration from './pages/WorkerRegistration';
import EstablishmentRegistration from './pages/EstablishmentRegistration';
import WorkerLogin from './pages/WorkerLogin';
import EstablishmentLogin from './pages/EstablishmentLogin';
import DepartmentLogin from './pages/DepartmentLogin';
import ForgotPassword from './pages/ForgotPassword';
import MobileDownload from './pages/MobileDownload';
import NotFound from './pages/NotFound';

// Protected Pages - Worker
import WorkerDashboard from './pages/WorkerDashboard';
import WorkerProfile from './pages/WorkerProfile';
import WorkerManagement from './pages/WorkerManagement';
import AttendanceHistory from './pages/AttendanceHistory';
import ApplicationReview from './pages/ApplicationReview';

// Protected Pages - Establishment
import EstablishmentDashboard from './pages/EstablishmentDashboard';
import EstablishmentProfile from './pages/EstablishmentProfile';
import EstablishmentManagement from './pages/EstablishmentManagement';
import Reports from './pages/Reports';

// Protected Pages - Department
import DepartmentDashboard from './pages/DepartmentDashboard';
import DepartmentProfile from './pages/DepartmentProfile';
import ComplianceMonitoring from './pages/ComplianceMonitoring';
import DocumentVerification from './pages/DocumentVerification';

// Other Pages
import About from './pages/About';
import Contact from './pages/Contact';
import Help from './pages/Help';
import Settings from './pages/Settings';

// Components
import ProtectedRoute from './components/ProtectedRoute';

// Back Navigation Handler
const BackNavigationHandler: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackButton = (event: PopStateEvent) => {
      // Prevent default back behavior on certain pages
      const protectedRoutes = [
        '/dashboard/worker',
        '/dashboard/establishment', 
        '/dashboard/department',
        '/worker-profile',
        '/establishment-profile',
        '/department-profile'
      ];

      if (protectedRoutes.includes(location.pathname)) {
        // Navigate to home instead of going back
        navigate('/');
        event.preventDefault();
      }
    };

    window.addEventListener('popstate', handleBackButton);
    return () => window.removeEventListener('popstate', handleBackButton);
  }, [location, navigate]);

  return null;
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <BackNavigationHandler />
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/registration-choice" element={<RegistrationChoice />} />
              <Route path="/worker-registration" element={<WorkerRegistration />} />
              <Route path="/establishment-registration" element={<EstablishmentRegistration />} />
              <Route path="/worker-login" element={<WorkerLogin />} />
              <Route path="/establishment-login" element={<EstablishmentLogin />} />
              <Route path="/department-login" element={<DepartmentLogin />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/mobile-download" element={<MobileDownload />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/help" element={<Help />} />

              {/* Protected Routes - Worker */}
              <Route 
                path="/dashboard/worker" 
                element={
                  <ProtectedRoute userType="worker">
                    <WorkerDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/worker-profile" 
                element={
                  <ProtectedRoute userType="worker">
                    <WorkerProfile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/worker-management" 
                element={
                  <ProtectedRoute userType="worker">
                    <WorkerManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/attendance-history" 
                element={
                  <ProtectedRoute userType="worker">
                    <AttendanceHistory />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/application-review" 
                element={
                  <ProtectedRoute userType="worker">
                    <ApplicationReview />
                  </ProtectedRoute>
                } 
              />

              {/* Protected Routes - Establishment */}
              <Route 
                path="/dashboard/establishment" 
                element={
                  <ProtectedRoute userType="establishment">
                    <EstablishmentDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/establishment-profile" 
                element={
                  <ProtectedRoute userType="establishment">
                    <EstablishmentProfile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/establishment-management" 
                element={
                  <ProtectedRoute userType="establishment">
                    <EstablishmentManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/reports" 
                element={
                  <ProtectedRoute userType="establishment">
                    <Reports />
                  </ProtectedRoute>
                } 
              />

              {/* Protected Routes - Department */}
              <Route 
                path="/dashboard/department" 
                element={
                  <ProtectedRoute userType="department">
                    <DepartmentDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/department-profile" 
                element={
                  <ProtectedRoute userType="department">
                    <DepartmentProfile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/compliance-monitoring" 
                element={
                  <ProtectedRoute userType="department">
                    <ComplianceMonitoring />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/document-verification" 
                element={
                  <ProtectedRoute userType="department">
                    <DocumentVerification />
                  </ProtectedRoute>
                } 
              />

              {/* Settings - Available to all authenticated users */}
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } 
              />

              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;