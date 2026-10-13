import type { CSSProperties } from 'react';
import type { PageId, SimState } from '../types/sportsiq';
import { PageHead } from '../components/PageHead';
import { signalSources } from '../data/metrics';
import { iqDomains } from '../data/agents';

const CAPS = ['Governed reasoning', 'Tool orchestration', 'Policy', 'Evaluation', 'Cost visibility', 'Shared context', 'Durable organizational memory'];
const CHAIN = ['Signals', 'SportsIQ', 'IQ agents', 'Memory', 'Command Center', 'Actions', 'Outcomes', 'Memory'];

export function SportsIQBrain({ state, go }: { state: SimState; go: (p: PageId) => void }) {
  const active = state.tick % CHAIN.length;
  const iqs = iqDomains.filter((d) => d.id !== 'SportsIQ Brain' && d.id !== undefined);
  const pos = iqs.map((_, i) => {
    const a = (-90 + i * 72) * (Math.PI / 180);
    return { x: 50 + 38 * Math.cos(a), y: 50 + 38 * Math.sin(a) };
  });
  return (
    <>
      <PageHead eyebrow="SPORTSIQ BRAIN" title="Parent organizational brain" level={0}
        sub="Live signals flow into one governed brain that coordinates specialized IQs, shares context and remembers outcomes." />
      <div className="brain-grid">
        <div>
          <div className="section-title" style={{ marginTop: 0 }}>Live signals</div>
          <div className="sig-list">
            {signalSources.map((s, i) => <div key={s} className="sig" style={{ '--d': `${(i % 6) * 0.35}s` } as CSSProperties}><span className="dot green" />{s}</div>)}
          </div>
        </div>
        <div className="card" style={{ padding: 0 }}>
          <div className="hub">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              {pos.map((p, i) => <line key={i} className="dashline" x1="50" y1="50" x2={p.x} y2={p.y} stroke={iqs[i].color} strokeWidth="1.4" vectorEffect="non-scaling-stroke" opacity=".75" />)}
            </svg>
            <div className="hub-core">
              <div>
                <b>SPORTSIQ</b><small>Parent Organizational Brain</small>
                <div className="caps">{CAPS.map((c) => <i key={c}>{c}</i>)}</div>
              </div>
            </div>
            {iqs.map((iq, i) => (
              <button key={iq.id} className="hub-node" style={{ left: `${pos[i].x}%`, top: `${pos[i].y}%`, '--c': iq.color } as CSSProperties} onClick={() => go(iq.page)}>
                {iq.id}
              </button>
            ))}
          </div>
        </div>
        <div className="stack">
          <div className="section-title" style={{ marginTop: 0 }}>Outputs</div>
          <div className="card"><span className="dot" /> REAL-TIME COMMAND CENTER<small>Live decisions, explainable and governed</small></div>
          <div className="card">GOVERNED ACTIONS<small>{state.totals.approved} approved · {state.totals.blocked} blocked by policy</small></div>
          <div className="card">COMPOUNDING CLUB INTELLIGENCE<small>{state.memories.length} memories available to future reasoning</small></div>
        </div>
      </div>

      <div className="card mt2">
        <h3>Signal flow</h3>
        <div className="flow-strip">
          {CHAIN.map((c, i) => (
            <span key={i} style={{ display: 'contents' }}>
              <span className={`flow-node ${i === active ? 'on' : ''}`}>{c}</span>
              {i < CHAIN.length - 1 && <span className="flow-arrow">→</span>}
            </span>
          ))}
          <span className="flow-arrow">↺</span>
        </div>
        <p className="quote" style={{ marginTop: 18 }}>"Every action creates memory. Every memory improves the next decision."</p>
      </div>
    </>
  );
}
