import type { AgentDecision, DecisionTemplate } from '../types/sportsiq';
import { agents } from '../data/agents';
import { evaluatePolicies, isBlocked } from './policyEngine';

let counter = 1000;

/** Creates an in-flight decision from a template, with agent latency/cost jittered around registry values. */
export function createDecision(t: DecisionTemplate, timestamp: string, rand: () => number = Math.random): AgentDecision {
  const agent = agents.find((a) => a.name === t.agent);
  const policyResults = evaluatePolicies(t, rand);
  return {
    decisionId: `D-${++counter}`,
    timestamp,
    agent: t.agent,
    domain: t.domain,
    signal: t.signal,
    context: t.context,
    reasoning: t.reasoning,
    dataSources: t.dataSources,
    policies: policyResults,
    recommendation: t.recommendation,
    expectedOutcome: t.expectedOutcome,
    action: t.action,
    observedOutcome: null,
    memoryWritten: null,
    stage: 0,
    status: 'in-flight',
    latencyMs: Math.round((agent?.latency ?? 220) * (0.85 + rand() * 0.3)),
    costUsd: +((agent?.cost ?? 0.004) * (0.9 + rand() * 0.2)).toFixed(4),
  };
}

export const willBlock = (d: AgentDecision) => isBlocked(d.policies);
