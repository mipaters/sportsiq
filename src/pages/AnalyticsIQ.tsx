import { useEffect, useState } from 'react';
import type { SimState } from '../types/sportsiq';
import { PageHead } from '../components/PageHead';
import { KPICard } from '../components/KPICard';
import { Spark } from '../components/Charts';
import { askAnswers } from '../data/metrics';

const last = (a: number[]) => a[a.length - 1];

export function AnalyticsIQ({ state }: { state: SimState }) {
  const [q, setQ] = useState<number | null>(null);
  const [shown, setShown] = useState(0);
  const answer = q === null ? '' : askAnswers[q].a;

  useEffect(() => {
    if (q === null) return;
    setShown(0);
    const id = setInterval(() => setShown((n) => { if (n >= askAnswers[q].a.length) { clearInterval(id); return n; } return n + 4; }), 16);
    return () => clearInterval(id);
  }, [q]);

  const s = state.series;
  const avgLat = Math.round(last(s.latency));
  return (
    <>
      <PageHead eyebrow="ANALYTICSIQ" title="Executive intelligence" level={1}
        sub="Convert SportsIQ activity into executive intelligence. Synthetic trends; not Rogers/MLSE results." />
      <div className="grid g3">
        <KPICard label="Revenue (index, synthetic)" value={`${last(s.revenue).toFixed(1)}`} delta={`+$${state.totals.revenue.toLocaleString()} attributed to agent actions tonight`} trend={s.revenue} color="#e4002b" />
        <KPICard label="Fan engagement index" value={`${last(s.engagement).toFixed(0)}`} delta="Live" trend={s.engagement} color="#ff6b85" />
        <KPICard label="Venue operations — avg wait (min)" value={last(s.queue).toFixed(1)} trend={s.queue} color="#2f7bff" />
        <KPICard label="Sponsorship activation index" value={last(s.sponsor).toFixed(0)} trend={s.sponsor} color="#f5a524" />
        <KPICard label="Content engagement index" value={last(s.content).toFixed(0)} trend={s.content} color="#a855f7" />
        <KPICard label="Agent performance — avg latency (ms)" value={`${avgLat}`} delta={`${state.totals.approved} approved · ${state.totals.blocked} blocked · $${state.totals.cost.toFixed(2)} AI cost`} trend={s.latency} color="#19c3a6" />
      </div>

      <div className="grid g2 mt2">
        <div className="card glow">
          <h3>What changed tonight?</h3>
          <p style={{ lineHeight: 1.6, fontSize: 15 }}>
            SportsIQ identified increased concession demand during second-period game pauses. FanIQ and VenueIQ coordinated engagement and operational recommendations while policy controls limited offer frequency.
          </p>
          <div style={{ marginTop: 12 }}><Spark data={s.revenue} color="#e4002b" height={70} /></div>
        </div>
        <div className="card">
          <h3>Ask SportsIQ</h3>
          <div style={{ display: 'grid', gap: 6, marginBottom: 12 }}>
            {askAnswers.map((a, i) => <button key={a.q} className={`ask-btn ${q === i ? 'on' : ''}`} onClick={() => setQ(i)}>"{a.q}"</button>)}
          </div>
          <div className="callout answer">{q === null ? <span style={{ color: 'var(--muted)' }}>Select a question to see a synthetic, evidence-grounded answer.</span> : answer.slice(0, shown)}{q !== null && shown < answer.length && '▍'}</div>
        </div>
      </div>
    </>
  );
}
