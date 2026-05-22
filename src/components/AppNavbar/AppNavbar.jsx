import { useNavigate } from 'react-router-dom';
import './AppNavbar.css';

function AppNavbar({ user = { name: 'Alex', initials: 'AM' } }) {
  const navigate = useNavigate();

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
          />
        </div>
      </div>

      <div className="app-navbar-right">
        <div className="user-avatar">{user.initials}</div>
        <span className="user-name">{user.name}</span>
        <button className="signout-btn" onClick={() => navigate('/signin')}>
          Sign out
        </button>
      </div>
    </nav>
  );
}

export default AppNavbar;
