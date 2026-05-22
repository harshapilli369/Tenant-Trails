import { useNavigate } from 'react-router-dom';
import './Hero.css';

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-badge">Launching in Halifax, Nova Scotia</div>
      <h1 className="hero-title">
        Know what you&apos;re signing<br />before you sign it.
      </h1>
      <p className="hero-subtitle">
        Read honest reviews from past tenants. See AI-generated summaries.
        Make informed decisions about where you live.
      </p>
      <div className="hero-actions">
        <button className="btn-primary btn-large" onClick={() => navigate('/signin')}>
          Create Free Account
        </button>
        <button className="btn-outline btn-large" onClick={() => navigate('/signin')}>
          Sign In
        </button>
      </div>
    </section>
  );
}

export default Hero;
