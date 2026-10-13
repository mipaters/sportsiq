import type { AgentDecision, DecisionTemplate, Domain, SimState } from '../types/sportsiq';
import { initialStats, seedSeries } from '../data/metrics';
import { initialZones, zoneStatus } from '../data/venue';
import { initialSponsors } from '../data/sponsors';
import { seedMemories } from '../data/memories';
import { decisionTemplates, scenarioTemplate } from '../data/scenarios';
import { writeMemory } from './memoryEngine';

export const DOMAINS: Domain[] = ['FanIQ', 'VenueIQ', 'SponsorIQ', 'ContentIQ', 'AnalyticsIQ', 'SportsIQ Brain'];

export const SCENARIO_TARGET = { offers: 428, redemptions: 112, transactions: 148, sponsorEngagement: 640, revenue: 4860, queueDelta: -1.1 };
export const SCENARIO_STEP_AT = [0, 2, 4, 6, 8, 10, 12, 14, 20];
export const SCENARIO_END = 26;

const SPONSOR_BY_AGENT: Record<string, string> = {
  'Activation Agent': 's3', 'Attribution Agent': 's5', 'Sponsor Alignment Agent': 's1',
};

export function wallTime(tick: number): string {
  const total = 20 * 3600 + 4 * 60 + tick;
  const h24 = Math.floor(total / 3600) % 24;
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')} ${h24 >= 12 ? 'PM' : 'AM'}`;
}

export function createInitialState(): SimState {
  const stats = {} as SimState['stats'];
  for (const d of DOMAINS) stats[d] = { ...initialStats[d] };
  return {
    running: true,
    tick: 0,
    game: { home: 'Toronto', away: 'Montreal', venue: 'Scotiabank Arena', period: 2, clockSeconds: 8 * 60 + 42, paused: false, score: [2, 1] },
    live: { fans: 18420, identities: 14870, concession: 72, sessions: 3420, campaigns: 8, health: 94 },
    decisions: [],
    memories: [...seedMemories],
    stats,
    zones: initialZones.map((z) => ({ ...z })),
    sponsors: initialSponsors.map((s) => ({ ...s })),
    series: {
      revenue: [...seedSeries.revenue], engagement: [...seedSeries.engagement], queue: [...seedSeries.queue],
      sponsor: [...seedSeries.sponsor], content: [...seedSeries.content], latency: [...seedSeries.latency],
    },
    totals: { revenue: 0, blocked: 0, approved: 0, humanApprovals: 0, cost: 0, actions: 0 },
    scenario: { active: false, step: -1, startedAt: null, results: { offers: 0, redemptions: 0, transactions: 0, sponsorEngagement: 0, revenue: 0, queueDelta: 0 } },
    agentLast: {},
  };
}

export const templateFor = (d: AgentDecision): DecisionTemplate | undefined =>
  [...decisionTemplates, scenarioTemplate].find((t) => t.agent === d.agent && t.signal === d.signal);

export function pickTemplate(rand: () => number = Math.random): DecisionTemplate {
  return decisionTemplates[Math.floor(rand() * decisionTemplates.length)];
}

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const jitter = (n: number, amt: number) => n + (Math.random() - 0.5) * amt;

export function driftLive(s: SimState) {
  s.live.fans = Math.round(clamp(jitter(s.live.fans, 40), 17800, 18900));
  s.live.identities = Math.round(clamp(jitter(s.live.identities, 30), 14300, 15300));
  s.live.concession = Math.round(clamp(jitter(s.live.concession, 1.4), 60, 85));
  s.live.sessions = Math.round(clamp(jitter(s.live.sessions, 60), 3000, 3900));
  const blockedPenalty = Math.min(2, s.totals.blocked * 0.1);
  s.live.health = Math.round(clamp(jitter(94, 1.2) - blockedPenalty * 0.3, 90, 98));
  for (const d of DOMAINS) s.stats[d].signals += Math.round(30 + Math.random() * 120);
}

export function driftZones(s: SimState) {
  for (const z of s.zones) {
    z.occupancy = Math.round(clamp(jitter(z.occupancy, 3), 25, 95));
    const base = z.id.startsWith('g') ? 3 : z.id === 'lounge' ? 1 : 4;
    const target = base + Math.max(0, z.occupancy - 45) / 10 + (z.id === 'g5' ? 1.5 : 0);
    z.waitMin = +clamp(z.waitMin + (target - z.waitMin) * 0.2 + (Math.random() - 0.5) * 0.4, 0.5, 14).toFixed(1);
    if (z.txnPerHour > 0) z.txnPerHour = Math.round(clamp(jitter(z.txnPerHour, 40), 200, 2200));
    z.status = zoneStatus(z);
  }
}

/** Advances a decision one stage; applies outcome and memory when it reaches RESULT (or is blocked at POLICY CHECK). */
export function advanceDecision(s: SimState, d: AgentDecision, pending: { revenue: number }) {
  if (d.status !== 'in-flight') return;
  const t = templateFor(d);
  d.stage += 1;
  if (d.stage === 3) {
    s.stats[d.domain].recommendations += 1;
    if (d.policies.some((p) => p.result === 'FAIL')) {
      d.status = 'blocked';
      s.totals.blocked += 1;
      d.memoryWritten = writeMemory(d, t ?? decisionTemplates[0], wallTime(s.tick)).text;
      if (t) s.memories.unshift(writeMemory(d, t, wallTime(s.tick)));
      s.agentLast[d.agent] = 'Blocked by policy';
    }
    return;
  }
  if (d.stage === 4) {
    s.stats[d.domain].actions += 1;
    s.totals.actions += 1;
    s.totals.approved += 1;
    if (d.action.requiresHuman) s.totals.humanApprovals += 1;
    s.totals.cost += d.costUsd;
  }
  if (d.stage >= 5 && t) {
    d.status = 'completed';
    d.observedOutcome = t.outcome;
    const mem = writeMemory(d, t, wallTime(s.tick));
    d.memoryWritten = mem.text;
    s.memories.unshift(mem);
    applyOutcome(s, d, t, pending);
    s.agentLast[d.agent] = t.outcome.label;
  }
}

function applyOutcome(s: SimState, d: AgentDecision, t: DecisionTemplate, pending: { revenue: number }) {
  const o = t.outcome.delta;
  if (o.revenue) { s.totals.revenue += o.revenue; pending.revenue += o.revenue; }
  if (o.queue) {
    const g5 = s.zones.find((z) => z.id === 'g5')!;
    g5.waitMin = +Math.max(1.5, g5.waitMin + o.queue).toFixed(1);
    if (t.agent === 'Concession Optimization Agent') {
      const food = s.zones.find((z) => z.id === 'food')!;
      food.txnPerHour += 90;
    }
  }
  const sid = SPONSOR_BY_AGENT[d.agent];
  if (o.sponsor && sid) {
    const sp = s.sponsors.find((x) => x.id === sid)!;
    sp.conversions += Math.round(o.sponsor / 4);
    sp.exposure += o.sponsor * 20;
    sp.engagement = +(sp.engagement + 0.2).toFixed(1);
    sp.attributedValue += o.sponsor * 8;
    if (sp.assetsActivated < sp.assetsContracted && d.agent === 'Activation Agent') sp.assetsActivated += 1;
    sp.status = sp.engagement >= sp.engagementTarget ? (sp.engagement > sp.engagementTarget * 1.1 ? 'Ahead' : 'On track') : 'Under-indexing';
  }
}
