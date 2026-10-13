import type { Agent, AgentDecision } from '../types/sportsiq';
import { PolicyCheck } from './PolicyCheck';

export function AgentDecisionTrace({ agent, decision, onClose }: { agent: Agent; decision?: AgentDecision; onClose: () => void }) {
  const d = decision;
  const sec = (title: string, body: React.ReactNode) => <div className="trace-sec"><h4>{title}</h4>{body}</div>;
  return (
    <aside className="drawer" role="dialog" aria-label="Agent decision trace">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="big-n">AGENT DECISION TRACE</div>
          <h2>{agent.name}</h2>
          <span className="tag">{agent.iq}</span> {d && <span className="tag">{d.decisionId} · {d.timestamp}</span>}
        </div>
        <button className="btn sm" onClick={onClose}>Close ✕</button>
      </div>
      {sec('INPUT', <p>{d?.signal ?? agent.task}</p>)}
      {sec('RETRIEVED CONTEXT', <p>{d ? `${d.context} Sources: ${d.dataSources.join(', ')}.` : `${agent.data}, plus shared organizational memory.`}</p>)}
      {sec('REASONING SUMMARY', <p>{d?.reasoning ?? agent.reasoning}</p>)}
      {sec('TOOLS CALLED', <ul>{agent.tools.map((t) => <li key={t}>{t}</li>)}</ul>)}
      {sec('POLICIES EVALUATED', d
        ? d.policies.map((p) => <PolicyCheck key={p.policyId} row={p} />)
        : <p>{agent.policies === 'N/A' ? 'No policy gate required for this step.' : agent.policies}</p>)}
      {sec('RECOMMENDATION', <p>{d?.recommendation ?? agent.recommendation}</p>)}
      {sec('ACTION', <p>{d ? `${d.action.type} via ${d.action.channel}: ${d.action.description}` : agent.action}</p>)}
      {sec('OBSERVED OUTCOME', <p>{d?.observedOutcome?.text ?? (d?.status === 'blocked' ? 'Blocked by policy — no action taken.' : d ? 'Awaiting outcome…' : agent.outcome)}</p>)}
      {sec('MEMORY WRITTEN', <p>{d?.memoryWritten ?? agent.memory}</p>)}
      <p style={{ color: 'var(--dim)', fontSize: 11, marginTop: 18 }}>Synthetic data · {d ? `${d.latencyMs} ms · $${d.costUsd.toFixed(3)}` : `${agent.latency} ms · $${agent.cost.toFixed(3)}`}</p>
    </aside>
  );
}
