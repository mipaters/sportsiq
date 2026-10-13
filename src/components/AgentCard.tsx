import type { CSSProperties } from 'react';
import type { Agent } from '../types/sportsiq';
import { domainColor } from '../data/agents';

export function AgentCard({ agent, onClick }: { agent: Agent; onClick?: () => void }) {
  return (
    <div className="agent-card" style={{ '--c': domainColor(agent.iq), cursor: onClick ? 'pointer' : undefined } as CSSProperties} onClick={onClick}>
      <div className="ic">{agent.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</div>
      <div><b>{agent.name}</b><span>{agent.task}</span></div>
    </div>
  );
}
