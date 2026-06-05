import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Apartments from './pages/Apartments/Apartments';
import ApartmentDetail from './pages/ApartmentDetail/ApartmentDetail';
import Profile from './pages/Profile/Profile';

function LandingPage() {
  return (
    <div className="landing-page">
      <Navbar />
      <main className="landing-main">
        <Hero />
        <Features />
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/apartments"
            element={
              <ProtectedRoute>
                <Apartments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/apartment/:id"
            element={
              <ProtectedRoute>
                <ApartmentDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
