import type { DecisionTemplate, PolicyResult } from '../types/sportsiq';
import { policies } from '../data/scenarios';

const PASS_NOTES: Record<string, string> = {
  consent: 'Consent on file for channel',
  fatigue: 'Below frequency cap',
  budget: 'Within promotion budget',
  brand: 'Meets brand guidelines',
  timing: 'No live-play interruption',
  rights: 'Contract permits activation',
  capacity: 'All zones within limits',
  safety: 'No safety impact',
  human: 'Duty manager approval obtained',
};

/** Evaluates every policy for a template. Templates may define one policy that occasionally fails. */
export function evaluatePolicies(t: DecisionTemplate, rand: () => number = Math.random): PolicyResult[] {
  const failing = t.failPolicy && rand() < t.failPolicy.chance ? t.failPolicy : null;
  return t.policyIds.map((id) => {
    const name = policies.find((p) => p.id === id)?.name ?? id;
    if (failing && failing.id === id) return { policyId: id, name, result: 'FAIL', note: failing.note };
    if (id === 'human') return { policyId: id, name, result: 'REVIEW', note: PASS_NOTES[id] };
    return { policyId: id, name, result: 'PASS', note: PASS_NOTES[id] ?? 'Passed' };
  });
}

export const isBlocked = (results: PolicyResult[]) => results.some((r) => r.result === 'FAIL');
