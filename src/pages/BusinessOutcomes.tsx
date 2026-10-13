import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { SimState } from '../types/sportsiq';
import { PageHead } from '../components/PageHead';
import { pillars, kpiGroups } from '../data/metrics';

interface Inputs {
  attendees: number; spend: number; events: number; baseConv: number; incrTxn: number; sponsorRev: number; digital: number;
  reach: number; convUplift: number; sponsorUplift: number; digitalUplift: number;
}
const DEFAULTS: Inputs = {
  attendees: 1500000, spend: 40, events: 100, baseConv: 4, incrTxn: 12, sponsorRev: 50000000, digital: 3000000,
  reach: 25, convUplift: 0.5, sponsorUplift: 2, digitalUplift: 0.05,
};

const usd = (n: number) => n.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });

export function BusinessOutcomes({ state }: { state: SimState }) {
  const [v, setV] = useState<Inputs>(DEFAULTS);
  const set = (k: keyof Inputs) => (e: React.ChangeEvent<HTMLInputElement>) => setV({ ...v, [k]: Math.max(0, Number(e.target.value)) });

  const offers = v.attendees * (v.reach / 100);
  const baseConversions = offers * (v.baseConv / 100);
  const incrConversions = offers * (v.convUplift / 100);
  const incrOffer = incrConversions * v.incrTxn;
  const incrSponsor = v.sponsorRev * (v.sponsorUplift / 100);
  const incrDigital = v.digital * (v.digitalUplift / 100) * v.incrTxn;
  const total = incrOffer + incrSponsor + incrDigital;
  const numbers: [keyof Inputs, string][] = [
    ['attendees', 'Annual attendees'], ['spend', 'Average spend per attendee ($)'], ['events', 'Number of events'],
    ['baseConv', 'Offer conversion baseline (%)'], ['incrTxn', 'Incremental transaction value ($)'], ['sponsorRev', 'Sponsor revenue ($)'], ['digital', 'Digital audience'],
  ];
  const sliders: [keyof Inputs, string, number, number, number, string][] = [
    ['reach', 'Share of attendees reached by an offer', 0, 100, 1, '%'], ['convUplift', 'Conversion uplift (percentage points)', 0, 5, 0.1, ' pts'],
    ['sponsorUplift', 'Sponsor revenue uplift', 0, 15, 0.5, '%'], ['digitalUplift', 'Digital content-to-commerce uplift (points)', 0, 1, 0.01, ' pts'],
  ];
  return (
    <>
      <PageHead eyebrow="BUSINESS OUTCOMES" title="FROM AI ACTIVITY TO BUSINESS VALUE" level={4}
        sub="Five outcome pillars, each with a potential measurement framework. No ROI is asserted — use the controls below to explore hypothetical scenarios." />
      <div className="grid g5">
        {pillars.map((p) => (
          <div key={p.key} className="card" style={{ borderTop: `3px solid ${p.color}`, '--c': p.color } as CSSProperties}>
            <h3 style={{ color: p.color }}>{p.title}</h3>
            <div className="big-n" style={{ color: 'var(--muted)' }}>POTENTIAL OUTCOMES</div>
            <div className="chips" style={{ margin: '6px 0 12px' }}>{p.outcomes.map((o) => <span key={o} className="chip">{o}</span>)}</div>
            <div className="big-n" style={{ color: 'var(--muted)' }}>KPIs</div>
            <div className="chips" style={{ marginTop: 6 }}>{kpiGroups[p.key].kpis.map((k) => <span key={k} className="chip kpi">{k}</span>)}</div>
          </div>
        ))}
      </div>

      <div className="section-title">Live efficiency telemetry (synthetic)</div>
      <div className="grid g4">
        <div className="card kpi"><div className="label">Governed actions</div><div className="value">{state.totals.actions}</div></div>
        <div className="card kpi"><div className="label">Blocked by policy</div><div className="value">{state.totals.blocked}</div></div>
        <div className="card kpi"><div className="label">Human approvals required</div><div className="value">{state.totals.humanApprovals}</div></div>
        <div className="card kpi"><div className="label">AI cost per successful action</div><div className="value">${state.totals.actions ? (state.totals.cost / state.totals.actions).toFixed(4) : '0.0000'}</div></div>
      </div>

      <div className="section-title">Scenario controls</div>
      <div className="disclaimer" style={{ marginBottom: 12 }}>Illustrative scenario - not a Rogers/MLSE forecast.</div>
      <div className="grid g2">
        <div className="card">
          <h3>Editable inputs</h3>
          <div className="grid g2" style={{ gap: 10 }}>
            {numbers.map(([k, label]) => (
              <div className="field" key={k}><label>{label}</label><input type="number" value={v[k]} onChange={set(k)} /></div>
            ))}
          </div>
          <h3 style={{ marginTop: 10 }}>Hypothetical assumptions</h3>
          {sliders.map(([k, label, min, max, step, unit]) => (
            <div className="field" key={k}>
              <label>{label}<b>{v[k]}{unit}</b></label>
              <input type="range" min={min} max={max} step={step} value={v[k]} onChange={set(k)} />
            </div>
          ))}
          <button className="btn sm" onClick={() => setV(DEFAULTS)}>Reset inputs</button>
        </div>
        <div className="card glow">
          <h3>Hypothetical scenario outputs</h3>
          <div className="grid g2">
            {([
              ['Baseline in-venue spend', usd(v.attendees * v.spend)],
              ['Offers delivered', Math.round(offers).toLocaleString()],
              ['Baseline offer conversions', Math.round(baseConversions).toLocaleString()],
              ['Incremental conversions', Math.round(incrConversions).toLocaleString()],
              ['Incremental offer revenue', usd(incrOffer)],
              ['…per event', usd(v.events ? incrOffer / v.events : 0)],
              ['Hypothetical sponsor uplift', usd(incrSponsor)],
              ['Hypothetical digital commerce uplift', usd(incrDigital)],
            ] as [string, string][]).map(([k, val]) => <div key={k} className="kpi"><div className="label">{k}</div><div className="value" style={{ fontSize: 20 }}>{val}</div></div>)}
          </div>
          <div className="callout red" style={{ marginTop: 14 }}>
            <div className="label" style={{ color: 'var(--muted)', fontSize: 12 }}>Total hypothetical annual value</div>
            <div className="value" style={{ fontSize: 30, fontWeight: 800 }}>{usd(total)}</div>
            <div style={{ fontSize: 11, color: 'var(--amber)', marginTop: 4 }}>Illustrative scenario - not a Rogers/MLSE forecast.</div>
          </div>
        </div>
      </div>
    </>
  );
}
