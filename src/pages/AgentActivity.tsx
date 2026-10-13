import { useState } from 'react';
import type { Agent, Domain, SimState } from '../types/sportsiq';
import { PageHead } from '../components/PageHead';
import { AgentDecisionTrace } from '../components/AgentDecisionTrace';
import { agents } from '../data/agents';

const FILTERS: ('All' | Domain)[] = ['All', 'FanIQ', 'VenueIQ', 'SponsorIQ', 'ContentIQ', 'AnalyticsIQ', 'SportsIQ Brain'];

export function AgentActivity({ state }: { state: SimState }) {
  const [filter, setFilter] = useState<'All' | Domain>('All');
  const [open, setOpen] = useState<Agent | null>(null);
  const rows = agents.filter((a) => filter === 'All' || a.iq === filter);
  const latest = (name: string) => state.decisions.find((d) => d.agent === name);
  return (
    <>
      <PageHead eyebrow="AGENT ACTIVITY" title="72 AGENTS ACTIVE" level={2}
        sub="A transparent agent operations console. Synthetic count; select any agent to open its decision trace." />
      <div className="tabs">{FILTERS.map((f) => <button key={f} className={`tab ${filter === f ? 'on' : ''}`} onClick={() => setFilter(f)}>{f}</button>)}</div>
      <div className="card scroll-x">
        <table className="t">
          <thead><tr><th>Agent</th><th>IQ</th><th>Task</th><th>Reasoning</th><th>Data used</th><th>Policy</th><th>Action</th><th>Outcome</th><th>Latency</th><th>Cost</th></tr></thead>
          <tbody>
            {rows.map((a) => {
              const d = latest(a.name);
              const outcome = d ? (d.status === 'blocked' ? 'Blocked' : d.status === 'in-flight' ? 'In flight' : 'Completed') : a.outcome;
              return (
                <tr key={a.id} className="click" onClick={() => setOpen(a)}>
                  <td><b>{a.name.replace(' Agent', '')}</b></td>
                  <td>{a.iq}</td>
                  <td>{a.task}</td>
                  <td style={{ maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis' }} title={a.reasoning}>{a.reasoning.slice(0, 42)}…</td>
                  <td>{a.data}</td>
                  <td>{d ? `${d.policies.length} policies` : a.policies}</td>
                  <td>{d ? d.action.type : a.action}</td>
                  <td><span className={`tag ${outcome === 'Blocked' ? 'fail' : 'pass'}`}>{outcome}</span></td>
                  <td>{d ? d.latencyMs : a.latency} ms</td>
                  <td>${(d ? d.costUsd : a.cost).toFixed(3)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {open && <AgentDecisionTrace agent={open} decision={latest(open.name)} onClose={() => setOpen(null)} />}
    </>
  );
}
