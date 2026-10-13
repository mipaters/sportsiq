import type { CSSProperties } from 'react';
import type { Domain, IQDomain, SimState } from '../types/sportsiq';
import { domainKpi } from '../data/metrics';

export function IQCard({ iq, state, onOpen }: { iq: IQDomain; state: SimState; onOpen: () => void }) {
  const st = state.stats[iq.id as Domain];
  const k = domainKpi[iq.id];
  const kpi = iq.id === 'SportsIQ Brain' ? String(state.totals.approved + state.totals.blocked) : k.fmt(kpiValue(iq.id, state));
  return (
    <div className="card iq-card" style={{ '--c': iq.color } as CSSProperties} onClick={onOpen} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen()}>
      <div className="name">{iq.id}</div>
      <div className="status"><span className="dot green" /> Operational</div>
      <div className="row"><span>Agents running</span><b>{st.agents}</b></div>
      <div className="row"><span>Signals analyzed</span><b>{st.signals.toLocaleString()}</b></div>
      <div className="row"><span>Recommendations</span><b>{st.recommendations.toLocaleString()}</b></div>
      <div className="row"><span>Actions taken</span><b>{st.actions.toLocaleString()}</b></div>
      <div className="pk">{iq.id === 'SportsIQ Brain' ? 'Governed decisions' : k.label}<b>{kpi}</b></div>
    </div>
  );
}

function kpiValue(id: Domain, s: SimState): number {
  const k = domainKpi[id];
  switch (id) {
    case 'FanIQ': return k.base + s.totals.revenue / s.live.fans * 3;
    case 'VenueIQ': return s.zones.filter((z) => z.id.startsWith('g')).reduce((a, z) => a + z.waitMin, 0) / 3;
    case 'SponsorIQ': return s.sponsors.reduce((a, x) => a + x.assetsActivated, 0) / s.sponsors.reduce((a, x) => a + x.assetsContracted, 0) * 100;
    case 'ContentIQ': return s.series.content[s.series.content.length - 1];
    case 'AnalyticsIQ': return s.series.latency[s.series.latency.length - 1] / 100;
    default: return k.base;
  }
}
