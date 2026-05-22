import './Features.css';

const features = [
  {
    icon: '⭐',
    title: 'Verified Reviews',
    description: 'Real ratings with photos and videos from past tenants.',
  },
  {
    icon: '👑',
    title: 'AI Summaries',
    description: 'Key issues and sentiment extracted from every review.',
  },
  {
    icon: '💬',
    title: 'Ask Questions',
    description: 'Comment on reviews and get answers from past tenants.',
  },
];

function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card">
      <span className="feature-icon">{icon}</span>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
}

function Features() {
  return (
    <section className="features">
      {features.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </section>
  );
}

export default Features;
