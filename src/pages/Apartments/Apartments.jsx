import { useState } from 'react';
import AppNavbar from '../../components/AppNavbar/AppNavbar';
import ApartmentCard from './ApartmentCard';
import apartments from './apartments.data';
import './Apartments.css';

const neighborhoods = ['All Neighbourhoods', 'Spring Garden', 'South End', 'West End', 'Downtown'];
const sortOptions = ['Highest Rated', 'Most Reviews', 'Lowest Rated'];

function Apartments() {
  const [neighborhood, setNeighborhood] = useState('All Neighbourhoods');
  const [sort, setSort] = useState('Highest Rated');
  const [searchQuery, setSearchQuery] = useState('');

  const totalReviews = apartments.reduce((sum, a) => sum + a.reviewCount, 0);
  const uniqueNeighborhoods = [...new Set(apartments.map((a) => a.neighborhood))].length;

  const query = searchQuery.toLowerCase().trim();

  const filtered = apartments
    .filter((a) => neighborhood === 'All Neighbourhoods' || a.neighborhood === neighborhood)
    .filter((a) =>
      !query ||
      a.name.toLowerCase().includes(query) ||
      a.address.toLowerCase().includes(query) ||
      a.neighborhood.toLowerCase().includes(query)
    )
    .sort((a, b) => {
      if (sort === 'Highest Rated') return b.rating - a.rating;
      if (sort === 'Lowest Rated') return a.rating - b.rating;
      return b.reviewCount - a.reviewCount;
    });

  return (
    <div className="apartments-page">
      <AppNavbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="apartments-main">
        <div className="apartments-header">
          <h1>Apartments in Halifax</h1>
          <p>Honest reviews from real tenants. Read before you rent.</p>
        </div>

        <div className="apartments-stats">
          <span className="stat-pill">{apartments.length} apartments</span>
          <span className="stat-divider" />
          <span className="stat-pill">{totalReviews} reviews</span>
          <span className="stat-divider" />
          <span className="stat-pill">{uniqueNeighborhoods} neighbourhoods</span>
        </div>

        <div className="apartments-filters">
          <div className="filter-select-wrapper">
            <select
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              className="filter-select"
            >
              {neighborhoods.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <span className="filter-chevron">▾</span>
          </div>

          <div className="filter-select-wrapper">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="filter-select"
            >
              {sortOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <span className="filter-chevron">▾</span>
          </div>
        </div>

        <div className="apartments-grid">
          {filtered.length > 0 ? (
            filtered.map((apt) => (
              <ApartmentCard key={apt.id} {...apt} />
            ))
          ) : (
            <p className="no-results">No apartments match your search.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Apartments;
