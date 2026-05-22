import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SignIn.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate('/apartments');
  }

  function fillDemo() {
    setEmail('alex@dal.ca');
    setPassword('password123');
  }

  return (
    <div className="signin-page">
      <div className="signin-card">
        <h1 className="signin-logo">TenantTrails</h1>
        <p className="signin-subtitle">See what past tenants had to say, before you sign.</p>

        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="alex@dal.ca"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="signin-btn">Sign In</button>
        </form>

        <p className="signin-footer">
          Don&apos;t have an account?{' '}
          <Link to="/" className="signin-link">Create one</Link>
        </p>

        <button className="demo-hint" type="button" onClick={fillDemo}>
          Demo: <strong>alex@dal.ca</strong> / <strong>password123</strong>
        </button>
      </div>
    </div>
  );
}

export default SignIn;
