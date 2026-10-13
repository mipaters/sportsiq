import type { ReactNode } from 'react';

const LEVELS = ['SportsIQ', 'Specialized IQs', 'Agents', 'Governed actions', 'Business outcomes', 'Organizational memory', 'Better future decisions'];

export function Hierarchy({ highlight }: { highlight: number }) {
  return (
    <div className="hier">
      {LEVELS.map((l, i) => (
        <span key={l} style={{ display: 'contents' }}>
          <b className={i === highlight ? 'hl' : ''}>{l}</b>{i < LEVELS.length - 1 && <span>→</span>}
        </span>
      ))}
    </div>
  );
}

export function PageHead({ eyebrow, title, sub, level, children }: { eyebrow: string; title: string; sub: string; level: number; children?: ReactNode }) {
  return (
    <div className="page-head">
      <div className="eyebrow">{eyebrow}</div>
      <h1>{title}</h1>
      <p>{sub}</p>
      <Hierarchy highlight={level} />
      {children}
    </div>
  );
}

export function KpiFramework({ outcomes, kpis }: { outcomes: string[]; kpis: string[] }) {
  return (
    <div className="grid g2 mt">
      <div className="card"><h3>Potential outcomes</h3><div className="chips">{outcomes.map((o) => <span key={o} className="chip">{o}</span>)}</div></div>
      <div className="card">
        <h3>Potential KPIs</h3>
        <div className="disclaimer" style={{ marginBottom: 10 }}>Potential measurement framework</div>
        <div className="chips">{kpis.map((k) => <span key={k} className="chip kpi">{k}</span>)}</div>
      </div>
    </div>
  );
}
