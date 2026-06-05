import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './SignIn.css';

export function validate(email, password) {
  const errors = {};
  if (!email) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.';
  if (!password) errors.password = 'Password is required.';
  return errors;
}

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const fieldErrors = validate(email, password);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setServerError('');
    setLoading(true);
    try {
      login(email, password);
      navigate('/apartments');
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function fillDemo() {
    setEmail('alex@dal.ca');
    setPassword('password123');
    setErrors({});
    setServerError('');
  }

  return (
    <div className="signin-page">
      <div className="signin-card">
        <h1 className="signin-logo">TenantTrails</h1>
        <p className="signin-subtitle">See what past tenants had to say, before you sign.</p>

        <form className="signin-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="alex@dal.ca"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          {serverError && <p className="form-server-error">{serverError}</p>}

          <button type="submit" className="signin-btn" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="signin-footer">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="signin-link">Create one</Link>
        </p>

        <button className="demo-hint" type="button" onClick={fillDemo}>
          Demo: <strong>alex@dal.ca</strong> / <strong>password123</strong>
        </button>
      </div>
    </div>
  );
}

export default SignIn;
