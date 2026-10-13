import type { AgentDecision, Memory } from '../types/sportsiq';

/** Converts a decision's observed outcome (or block) into a governed memory entry. */
export function writeMemory(d: AgentDecision, template: { memoryArea: Memory['area']; memory: string }, timestamp: string): Memory {
  const blocked = d.status === 'blocked';
  const failed = d.policies.find((p) => p.result === 'FAIL');
  return {
    id: `mem-${d.decisionId}`,
    timestamp,
    area: blocked ? 'Operating' : template.memoryArea,
    source: d.domain,
    text: blocked ? `Blocked by ${failed?.name} policy: ${failed?.note}` : template.memory,
    decisionId: d.decisionId,
  };
}
