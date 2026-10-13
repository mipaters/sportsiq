import type { SimState } from '../types/sportsiq';
import { PageHead, KpiFramework } from '../components/PageHead';
import { AgentCard } from '../components/AgentCard';
import { SignalStream } from '../components/SignalStream';
import { agents } from '../data/agents';
import { sponsorKpis, sponsorOutcomes } from '../data/sponsors';

const money = (n: number) => `$${n.toLocaleString()}`;

export function SponsorIQ({ state }: { state: SimState }) {
  return (
    <>
      <PageHead eyebrow="SPONSORIQ" title="From purchased inventory to measurable activation" level={1}
        sub="Turn sponsorship into measurable, intelligent activation — fictional sponsors, synthetic values." />
      <div className="section-title" style={{ marginTop: 0 }}>Agent team</div>
      <div className="grid g5">{agents.filter((a) => a.iq === 'SponsorIQ').map((a) => <AgentCard key={a.id} agent={a} />)}</div>

      <div className="section-title">Sponsor portfolio (fictional)</div>
      <div className="card scroll-x">
        <table className="t">
          <thead><tr><th>Sponsor</th><th>Assets contracted</th><th>Assets activated</th><th>Audience exposure</th><th>Engagement</th><th>Conversions</th><th>Est. attributed value</th><th>Status</th></tr></thead>
          <tbody>
            {state.sponsors.map((s) => (
              <tr key={s.id}>
                <td><b>{s.name}</b><div style={{ color: 'var(--dim)', fontSize: 11 }}>{s.category}</div></td>
                <td>{s.assetsContracted}</td>
                <td>{s.assetsActivated} <span style={{ color: 'var(--dim)' }}>({Math.round((s.assetsActivated / s.assetsContracted) * 100)}%)</span></td>
                <td>{s.exposure.toLocaleString()}</td>
                <td>{s.engagement.toFixed(1)}% <span style={{ color: 'var(--dim)' }}>/ {s.engagementTarget.toFixed(1)}% target</span></td>
                <td>{s.conversions.toLocaleString()}</td>
                <td>{money(s.attributedValue)}</td>
                <td><span className={`tag ${s.status === 'Under-indexing' ? 'review' : 'pass'}`}>{s.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section-title">Scenario — campaign under-indexing</div>
      <div className="grid g2">
        <div className="card glow">
          <h3>SportsIQ detects</h3>
          <ul className="chips" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li className="chip">Unused available inventory (TrueNorth Auto: {(() => { const s = state.sponsors[2]; return s.assetsContracted - s.assetsActivated; })()} assets)</li>
            <li className="chip">Relevant audience segment</li>
            <li className="chip">Appropriate game moment</li>
          </ul>
        </div>
        <div className="card">
          <h3>Recommendation</h3>
          <div className="callout">Activate approved digital placement during next eligible game window.</div>
          <p style={{ color: 'var(--muted)', marginTop: 8, fontSize: 12 }}>Gated by sponsor rights, brand, timing and budget policies before activation.</p>
        </div>
      </div>

      <KpiFramework outcomes={sponsorOutcomes} kpis={sponsorKpis} />
      <div className="section-title">Live SponsorIQ decisions</div>
      <SignalStream decisions={state.decisions} domain="SponsorIQ" limit={3} />
    </>
  );
}
