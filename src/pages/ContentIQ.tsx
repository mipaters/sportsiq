import type { SimState } from '../types/sportsiq';
import { PageHead, KpiFramework } from '../components/PageHead';
import { AgentCard } from '../components/AgentCard';
import { SignalStream } from '../components/SignalStream';
import { agents } from '../data/agents';
import { contentKpis, contentOutcomes, liveMoment } from '../data/content';

export function ContentIQ({ state }: { state: SimState }) {
  return (
    <>
      <PageHead eyebrow="CONTENTIQ" title="What content should exist, and for whom" level={1}
        sub="Use game moments, fan context and sponsorship commitments to decide what content is created and distributed." />
      <div className="section-title" style={{ marginTop: 0 }}>Agent team</div>
      <div className="grid g5">{agents.filter((a) => a.iq === 'ContentIQ').map((a) => <AgentCard key={a.id} agent={a} />)}</div>

      <div className="section-title"><span className="dot" /> Live moment</div>
      <div className="card glow">
        <p className="quote" style={{ marginBottom: 14 }}>{liveMoment.title}</p>
        <div className="grid g2">
          <div>
            <h3>SportsIQ evaluates</h3>
            {liveMoment.evaluates.map(([k, v]) => <div key={k} className="policy"><div>{k}<small>{v}</small></div><span className="tag pass">CHECKED</span></div>)}
          </div>
          <div>
            <h3>Then recommends</h3>
            <div style={{ display: 'grid', gap: 8 }}>
              {liveMoment.recommends.map((r) => (
                <div key={r.name} className="mini"><b>{r.name}</b><span>{r.detail} · {r.audience}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <KpiFramework outcomes={contentOutcomes} kpis={contentKpis} />
      <div className="section-title">Live ContentIQ decisions</div>
      <SignalStream decisions={state.decisions} domain="ContentIQ" limit={3} />
    </>
  );
}
