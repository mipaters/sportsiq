import type { PageId, SimState } from '../types/sportsiq';
import { iqDomains } from '../data/agents';
import { IQCard } from '../components/IQCard';
import { SignalStream } from '../components/SignalStream';
import { PolicyCheck } from '../components/PolicyCheck';
import { Hierarchy } from '../components/PageHead';
import { masterScenario } from '../data/scenarios';
import { engine } from '../services/simulationEngine';

export function CommandCenter({ state, go }: { state: SimState; go: (p: PageId) => void }) {
  const l = state.live;
  const strip: [string, string][] = [
    ['Fans in venue', l.fans.toLocaleString()], ['Active digital identities', l.identities.toLocaleString()],
    ['Concession utilization', `${l.concession}%`], ['Active app sessions', l.sessions.toLocaleString()],
    ['Sponsor campaigns active', String(l.campaigns)], ['Operational health', `${l.health}%`],
  ];
  const sc = state.scenario;
  const r = sc.results;
  return (
    <>
      <div className="hero">
        <div className="eyebrow">SPORTSIQ</div>
        <h1>From fragmented sports operations to an intelligent, learning sports enterprise</h1>
        <p>A governed agentic intelligence layer connecting fans, venues, sponsors, content, commerce and operations.</p>
        <Hierarchy highlight={0} />
      </div>

      <div className="live-strip">
        {strip.map(([k, v]) => (
          <div key={k} className="card kpi"><div className="label">{k}</div><div className="value">{v}</div></div>
        ))}
      </div>

      <div className="section-title">Six intelligence domains</div>
      <div className="grid g6">
        {iqDomains.map((iq) => <IQCard key={iq.id} iq={iq} state={state} onOpen={() => go(iq.page)} />)}
      </div>

      <div className="grid gsplit mt2">
        <div>
          <div className="section-title" style={{ marginTop: 0 }}><span className="dot" /> Live agent decision stream</div>
          <SignalStream decisions={state.decisions} limit={8} onSelect={() => go('agents')} />
        </div>
        <div>
          <div className="section-title" style={{ marginTop: 0 }}>Master scenario</div>
          <div className={`card ${sc.active ? 'glow' : ''}`}>
            <h3>{masterScenario.title}</h3>
            <div className="scn-steps" style={{ marginBottom: 12 }}>
              {masterScenario.steps.map((s, i) => (
                <div key={s.label} className={`scn-step ${sc.step >= i ? 'on' : ''}`} style={{ minWidth: '45%' }}><b>{s.label.toUpperCase()}</b>{s.text}</div>
              ))}
            </div>
            {sc.step >= 6 && (
              <div style={{ marginBottom: 12 }}>
                <div className="callout" style={{ marginBottom: 8 }}>{masterScenario.recommendation}</div>
                {masterScenario.policyResults.map(([n, res]) => <PolicyCheck key={n} row={{ name: n, result: res }} />)}
              </div>
            )}
            {sc.step >= 7 && (
              <div className="grid g3" style={{ marginBottom: 10 }}>
                {([['Offers delivered', r.offers.toLocaleString()], ['Redemptions', r.redemptions], ['Concession transactions', r.transactions],
                  ['Sponsor engagement', r.sponsorEngagement], ['Incremental revenue', `$${r.revenue.toLocaleString()}`], ['Avg queue impact', `${r.queueDelta} min`]] as [string, string | number][]).map(([k, v]) => (
                  <div key={k} className="card" style={{ padding: 10 }}><div className="kpi"><div className="label">{k}</div><div className="value" style={{ fontSize: 18 }}>{v}</div></div></div>
                ))}
              </div>
            )}
            {sc.step >= 8 && (
              <div className="callout red">
                <b>MEMORY UPDATED</b>
                <ul style={{ margin: '6px 0', paddingLeft: 18 }}>{masterScenario.memories.map((m) => <li key={m}>{m}</li>)}</ul>
                <i>{masterScenario.finalMessage}</i>
              </div>
            )}
            {sc.step < 0 && <p style={{ color: 'var(--muted)', marginBottom: 10 }}>One master scenario connects four IQs through SportsIQ, policy and memory.</p>}
            <button className="btn red" onClick={() => engine.triggerScenario()} disabled={sc.active}>{sc.active ? 'Running…' : sc.step >= 9 ? '⚡ Run again' : '⚡ Trigger scenario'}</button>
            <p style={{ color: 'var(--dim)', fontSize: 11, marginTop: 10 }}>All results are synthetic.</p>
          </div>
        </div>
      </div>
    </>
  );
}
