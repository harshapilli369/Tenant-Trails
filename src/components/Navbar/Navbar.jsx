import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-logo">TenantTrails</div>
      <div className="navbar-actions">
        <button className="btn-ghost" onClick={() => navigate('/signin')}>Sign In</button>
        <button className="btn-primary" onClick={() => navigate('/signin')}>Get Started</button>
      </div>
    </nav>
  );
}

export default Navbar;
