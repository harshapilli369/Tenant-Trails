import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import SignIn from './pages/SignIn/SignIn';
import Apartments from './pages/Apartments/Apartments';

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/apartments" element={<Apartments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
