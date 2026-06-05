import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AppNavbar.css';

function AppNavbar({ searchQuery = '', onSearchChange }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleSignOut() {
    logout();
    navigate('/signin');
  }

  return (
    <nav className="app-navbar">
      <div className="app-navbar-left">
        <span className="app-navbar-logo" onClick={() => navigate('/')}>
          TenantTrails
        </span>
        <div className="app-navbar-search">
          <svg className="search-icon" viewBox="0 0 20 20" fill="none">
            <circle cx="9" cy="9" r="6" stroke="#9ca3af" strokeWidth="1.5" />
            <path d="M15 15l-3-3" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search apartments by address or neighbourhood..."
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="app-navbar-right">
        {user && (
          <Link to="/profile" className="user-profile-link">
            <div className="user-avatar">{user.initials}</div>
            <span className="user-name">{user.name.split(' ')[0]}</span>
          </Link>
        )}
        <button className="signout-btn" onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    </nav>
  );
}

export default AppNavbar;
