import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import RegistrationChoice from './pages/RegistrationChoice';
import WorkerLogin from './pages/WorkerLogin';
import EstablishmentLogin from './pages/EstablishmentLogin';
import DepartmentLogin from './pages/DepartmentLogin';
import WorkerRegistration from './pages/WorkerRegistration';
import EstablishmentRegistration from './pages/EstablishmentRegistration';
import WorkerDashboard from './pages/WorkerDashboard';
import DepartmentDashboard from './pages/DepartmentDashboard';
import ForgotPassword from './pages/ForgotPassword';
import InstallPrompt from './components/InstallPrompt';
import MobileNavigation from './components/MobileNavigation';
import NetworkStatus from './components/NetworkStatus';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 safe-area-top safe-area-bottom">
            <NetworkStatus />
            <Header />
            <main className="pb-16 md:pb-0">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<RegistrationChoice />} />
                <Route path="/login/worker" element={<WorkerLogin />} />
                <Route path="/login/establishment" element={<EstablishmentLogin />} />
                <Route path="/login/department" element={<DepartmentLogin />} />
                <Route path="/register/worker" element={<WorkerRegistration />} />
                <Route path="/register/establishment" element={<EstablishmentRegistration />} />
                <Route path="/dashboard/worker" element={<WorkerDashboard />} />
                <Route path="/dashboard/department" element={<DepartmentDashboard />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Routes>
            </main>
            <MobileNavigation />
            <InstallPrompt />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;