import type { CSSProperties } from 'react';
import { STAGES } from '../types/sportsiq';
import type { AgentDecision, Domain } from '../types/sportsiq';
import { domainColor } from '../data/agents';

function stageText(d: AgentDecision, i: number): string {
  switch (i) {
    case 0: return d.signal;
    case 1: return d.context;
    case 2: return d.reasoning;
    case 3: return d.policies.map((p) => `${p.name} ${p.result}`).join(' · ');
    case 4: return d.status === 'blocked' ? 'Action withheld' : d.action.description + (d.action.requiresHuman ? ' (human approval)' : '');
    default: return d.status === 'blocked' ? 'Blocked — recorded in memory' : d.observedOutcome?.text ?? '';
  }
}

export function SignalStream({ decisions, domain, limit = 8, compact = false, onSelect }: {
  decisions: AgentDecision[]; domain?: Domain; limit?: number; compact?: boolean; onSelect?: (d: AgentDecision) => void;
}) {
  const list = decisions.filter((d) => !domain || d.domain === domain).slice(0, limit);
  return (
    <div className="stream">
      {list.map((d) => (
        <div key={d.decisionId} className={`evt ${d.status === 'blocked' ? 'blocked' : ''}`} style={{ '--c': domainColor(d.domain), cursor: onSelect ? 'pointer' : undefined } as CSSProperties}
          onClick={() => onSelect?.(d)}>
          <div className="evt-head">
            <span className="tag dom">{d.domain}</span>
            <span style={{ color: 'var(--muted)', fontSize: 12 }}>{d.agent}</span>
            {d.status === 'blocked' && <span className="tag fail">BLOCKED BY POLICY</span>}
            {d.status === 'completed' && <span className="tag pass">COMPLETED</span>}
            {d.status === 'in-flight' && <span className="tag review">IN FLIGHT</span>}
            <span className="t">{d.timestamp} · {d.decisionId}</span>
          </div>
          <div className="evt-title">{d.signal}</div>
          {!compact && (
            <div className="pipeline">
              {STAGES.map((s, i) => (
                <div key={s} className={`step ${i <= d.stage ? 'on' : ''} ${i === d.stage && d.status === 'in-flight' ? 'cur' : ''}`}>
                  <div className="k">{s}</div>
                  <div className="v">{i <= d.stage ? stageText(d, i) : '…'}</div>
                </div>
              ))}
            </div>
          )}
          <div className="expected">Recommendation: <b>{d.recommendation}</b> · Expected outcome: <b>{d.expectedOutcome}</b></div>
        </div>
      ))}
    </div>
  );
}
