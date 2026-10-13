import type { PageId } from '../types/sportsiq';

export const NAV: { id: PageId; label: string }[] = [
  { id: 'command', label: 'Executive Command Center' },
  { id: 'brain', label: 'SportsIQ Brain' },
  { id: 'faniq', label: 'FanIQ' },
  { id: 'venueiq', label: 'VenueIQ' },
  { id: 'sponsoriq', label: 'SponsorIQ' },
  { id: 'contentiq', label: 'ContentIQ' },
  { id: 'analyticsiq', label: 'AnalyticsIQ' },
  { id: 'memory', label: 'Organizational Memory' },
  { id: 'agents', label: 'Agent Activity' },
  { id: 'outcomes', label: 'Business Outcomes' },
  { id: 'architecture', label: 'Architecture' },
];

export function Navigation({ page, onNavigate }: { page: PageId; onNavigate: (p: PageId) => void }) {
  return (
    <nav className="nav">
      <div className="brand">
        <div className="logo">SPORTS<b>IQ</b></div>
        <small>Agentic OS · Rogers Sports &amp; MLSE</small>
      </div>
      {NAV.map((n, i) => (
        <div key={n.id}>
          {(i === 2 || i === 7) && <div className="nav-sep" />}
          <button className={`nav-item ${page === n.id ? 'active' : ''}`} onClick={() => onNavigate(n.id)}>
            <span className="n">{String(i + 1).padStart(2, '0')}</span>{n.label}
          </button>
        </div>
      ))}
      <div className="nav-foot">Concept demonstration using synthetic data.</div>
    </nav>
  );
}
