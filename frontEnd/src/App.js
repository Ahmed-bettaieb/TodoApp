import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import { AuthProvider } from './authContext';
import ProtectedRoute from './ProtectedRoute';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Container className="my-1">
          <Routes>
            {/* Redirect "/" to "/dashboard" */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Container>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
