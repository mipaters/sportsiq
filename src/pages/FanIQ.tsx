import { useEffect, useState } from 'react';
import type { SimState } from '../types/sportsiq';
import { PageHead, KpiFramework } from '../components/PageHead';
import { AgentCard } from '../components/AgentCard';
import { PolicyCheck } from '../components/PolicyCheck';
import { SignalStream } from '../components/SignalStream';
import { Donut } from '../components/Charts';
import { agents } from '../data/agents';
import { fanSegments, opportunities, faniqSimSteps, faniqOutcomes, faniqKpis } from '../data/fans';

export function FanIQ({ state }: { state: SimState }) {
  const [sel, setSel] = useState(0);
  const [stepN, setStepN] = useState(0);
  const [running, setRunning] = useState(false);
  const opp = opportunities[sel];

  useEffect(() => {
    if (!running) return;
    if (stepN >= faniqSimSteps.length) { setRunning(false); return; }
    const t = setTimeout(() => setStepN((n) => n + 1), 900);
    return () => clearTimeout(t);
  }, [running, stepN]);

  const start = () => { setStepN(0); setRunning(true); };
  return (
    <>
      <PageHead eyebrow="FANIQ" title="Fan intelligence" level={1}
        sub="Personalization, loyalty, engagement and revenue-per-fan optimization — governed by SportsIQ policy and memory." />
      <div className="section-title" style={{ marginTop: 0 }}>Agent team</div>
      <div className="grid g5">{agents.filter((a) => a.iq === 'FanIQ').map((a) => <AgentCard key={a.id} agent={a} />)}</div>

      <div className="section-title">Synthetic fan segments</div>
      <div className="grid g3">
        {fanSegments.map((s) => (
          <div key={s.id} className="card">
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <Donut value={s.engagement} size={70} />
              <div>
                <b>{s.name}</b>
                <div style={{ color: 'var(--muted)', fontSize: 12 }}>{s.size.toLocaleString()} fans · ${s.avgSpend} avg spend · trend {s.trend === 'up' ? '▲' : s.trend === 'down' ? '▼' : '▬'}</div>
              </div>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 12, marginTop: 8 }}>{s.note}</p>
          </div>
        ))}
      </div>

      <div className="section-title">Current opportunities</div>
      <div className="tabs">{opportunities.map((o, i) => <button key={o.id} className={`tab ${sel === i ? 'on' : ''}`} onClick={() => { setSel(i); setStepN(0); setRunning(false); }}>Opportunity {i + 1}</button>)}</div>
      <div className="grid g2">
        <div className="card glow">
          <h3>Agent reasoning</h3>
          <p style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>{opp.title}</p>
          <div className="grid" style={{ gap: 8 }}>
            <div><span className="big-n">SIGNAL</span><p>{opp.signal}</p></div>
            <div><span className="big-n">CONTEXT</span><p>{opp.context}</p></div>
            <div><span className="big-n">RECOMMENDATION</span><p>{opp.recommendation}</p></div>
          </div>
          <h3 style={{ marginTop: 16 }}>Guardrails</h3>
          {opp.guardrails.map(([n, r]) => <PolicyCheck key={n} row={{ name: n, result: r }} />)}
        </div>
        <div className="card">
          <h3>Simulate action</h3>
          <button className="btn red" onClick={start} disabled={running}>{running ? 'Simulating…' : 'SIMULATE ACTION'}</button>
          <div className="timeline" style={{ marginTop: 16 }}>
            {faniqSimSteps.map((s, i) => (
              <div key={s} className="tl" style={{ opacity: i < stepN ? 1 : 0.3, ['--c' as string]: i < stepN ? '#2ee59d' : '#5d667a' }}>
                <div className="what">{i < stepN ? '✓ ' : ''}{s}</div>
                {i === 4 && i < stepN && <div className="mm">"Second-period concession activation converted among Family Fan segment."</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <KpiFramework outcomes={faniqOutcomes} kpis={faniqKpis} />
      <div className="section-title">Live FanIQ decisions</div>
      <SignalStream decisions={state.decisions} domain="FanIQ" limit={3} />
    </>
  );
}
