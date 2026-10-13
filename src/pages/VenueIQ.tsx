import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { SimState } from '../types/sportsiq';
import { PageHead, KpiFramework } from '../components/PageHead';
import { AgentCard } from '../components/AgentCard';
import { SignalStream } from '../components/SignalStream';
import { agents } from '../data/agents';
import { venueKpis, venueOutcomes } from '../data/venue';

const heat = (s: string) => (s === 'Congested' ? '#ff5470' : s === 'Busy' ? '#f5a524' : s === 'Under capacity' ? '#19c3a6' : '#2f7bff');

export function VenueIQ({ state }: { state: SimState }) {
  const [approval, setApproval] = useState<'idle' | 'approved' | 'declined'>('idle');
  const g5 = state.zones.find((z) => z.id === 'g5')!;
  return (
    <>
      <PageHead eyebrow="VENUEIQ" title="Venue operational intelligence" level={1}
        sub="Turn venue activity into operational intelligence — predicted, explained and governed before action." />
      <div className="section-title" style={{ marginTop: 0 }}>Agent team</div>
      <div className="grid g3">{agents.filter((a) => a.iq === 'VenueIQ').map((a) => <AgentCard key={a.id} agent={a} />)}</div>

      <div className="section-title">Live venue</div>
      <div className="venue-map">
        {state.zones.map((z) => (
          <div key={z.id} className={`zone ${z.status === 'Under capacity' ? 'Under' : z.status}`} style={{ '--h': heat(z.status) } as CSSProperties}>
            <div className="heat" />
            <h4>{z.name} <span className="tag" style={{ marginLeft: 6, color: heat(z.status), borderColor: heat(z.status) }}>{z.status}</span></h4>
            <dl>
              <dt>Occupancy</dt><dd>{z.occupancy}%</dd>
              <dt>Wait time</dt><dd>{z.waitMin.toFixed(1)} min</dd>
              <dt>Transactions / hr</dt><dd>{z.txnPerHour ? z.txnPerHour.toLocaleString() : '—'}</dd>
              <dt>Staff level</dt><dd>{z.staff} / {z.staffTarget}</dd>
              <dt>Service status</dt><dd>{z.status}</dd>
            </dl>
          </div>
        ))}
      </div>

      <div className="section-title">Scenario — Gate 5 congestion rising</div>
      <div className="grid g2">
        <div className="card glow">
          <h3>SportsIQ reasoning</h3>
          <div className="grid" style={{ gap: 10 }}>
            <div><span className="big-n">OBSERVATION</span><p>Arrival density increasing rapidly (Gate 5 now {g5.occupancy}% occupancy, {g5.waitMin.toFixed(1)} min wait).</p></div>
            <div><span className="big-n">PREDICTION</span><p>Queue likely to exceed target operating threshold.</p></div>
            <div><span className="big-n">RECOMMENDATION</span><p>Adjust wayfinding and staffing.</p></div>
          </div>
        </div>
        <div className="card">
          <h3>Human approval</h3>
          <p style={{ marginBottom: 12 }}>Staffing change requires duty-manager approval: move 2 staff from Gate 1 to Gate 5.</p>
          {approval === 'idle' ? (
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn red" onClick={() => setApproval('approved')}>Approve</button>
              <button className="btn" onClick={() => setApproval('declined')}>Decline</button>
            </div>
          ) : (
            <div className={`callout ${approval === 'approved' ? '' : 'red'}`}>
              {approval === 'approved' ? '✓ Approved — wayfinding updated, staffing request sent via Teams, decision written to operating memory.' : '✕ Declined — recorded to operating memory; wayfinding-only mitigation continues.'}
              <div><button className="btn sm" style={{ marginTop: 8 }} onClick={() => setApproval('idle')}>Reset</button></div>
            </div>
          )}
        </div>
      </div>

      <KpiFramework outcomes={venueOutcomes} kpis={venueKpis} />
      <div className="section-title">Live VenueIQ decisions</div>
      <SignalStream decisions={state.decisions} domain="VenueIQ" limit={3} />
    </>
  );
}
