export type Domain = 'FanIQ' | 'VenueIQ' | 'SponsorIQ' | 'ContentIQ' | 'AnalyticsIQ' | 'SportsIQ Brain';
export type IQName = Exclude<Domain, 'SportsIQ Brain'>;

export type PageId =
  | 'command' | 'brain' | 'faniq' | 'venueiq' | 'sponsoriq' | 'contentiq'
  | 'analyticsiq' | 'memory' | 'agents' | 'outcomes' | 'architecture';

export interface FanSegment {
  id: string; name: string; size: number; engagement: number; avgSpend: number; trend: 'up' | 'flat' | 'down'; note: string;
}
export interface Fan {
  id: string; segmentId: string; consent: boolean; offerFatigue: number; loyaltyTier: string; journeyState: string;
}
export interface VenueZone {
  id: string; name: string; occupancy: number; waitMin: number; txnPerHour: number; staff: number; staffTarget: number;
  status: 'Normal' | 'Busy' | 'Congested' | 'Under capacity';
}
export interface Campaign {
  id: string; name: string; engagementTarget: number; engagement: number; status: 'On track' | 'Under-indexing' | 'Ahead';
}
export interface Sponsor {
  id: string; name: string; category: string; assetsContracted: number; assetsActivated: number; exposure: number;
  engagement: number; conversions: number; attributedValue: number; status: Campaign['status']; engagementTarget: number;
}
export interface GameContext {
  home: string; away: string; venue: string; period: number; clockSeconds: number; paused: boolean; score: [number, number];
}
export interface Signal {
  id: string; timestamp: string; domain: Domain; source: string; text: string;
}
export interface Policy { id: string; name: string; description: string }
export interface PolicyResult { policyId: string; name: string; result: 'PASS' | 'FAIL' | 'REVIEW'; note: string }
export interface Action { type: string; channel: string; description: string; requiresHuman: boolean }
export interface Outcome { label: string; delta: Partial<Record<'revenue' | 'engagement' | 'queue' | 'sponsor' | 'content', number>>; text: string }
export interface Memory {
  id: string; timestamp: string; area: 'Fan' | 'Venue' | 'Sponsor' | 'Operating'; source: Domain; text: string; decisionId?: string;
}
export interface KPI { id: string; label: string; value: string; delta?: string; trend?: number[] }
export interface IQDomain {
  id: Domain; page: PageId; purpose: string; color: string; primaryKpi: string; agents: string[];
}
export interface Agent {
  id: string; name: string; iq: Domain; task: string; data: string; policies: string;
  action: string; outcome: string; latency: number; cost: number;
  tools: string[]; reasoning: string; recommendation: string; memory: string;
}

export type DecisionStatus = 'in-flight' | 'completed' | 'blocked';
export const STAGES = ['SIGNAL', 'CONTEXT', 'AGENT REASONING', 'POLICY CHECK', 'ACTION', 'RESULT'] as const;

export interface AgentDecision {
  decisionId: string;
  timestamp: string;
  agent: string;
  domain: Domain;
  signal: string;
  context: string;
  reasoning: string;
  dataSources: string[];
  policies: PolicyResult[];
  recommendation: string;
  expectedOutcome: string;
  action: Action;
  observedOutcome: Outcome | null;
  memoryWritten: string | null;
  stage: number;
  status: DecisionStatus;
  latencyMs: number;
  costUsd: number;
}

export interface DecisionTemplate {
  domain: Domain; agent: string; signal: string; context: string; reasoning: string; dataSources: string[];
  policyIds: string[]; recommendation: string; expectedOutcome: string; action: Action; outcome: Outcome;
  memoryArea: Memory['area']; memory: string; failPolicy?: { id: string; note: string; chance: number };
}

export interface ScenarioState {
  active: boolean; step: number; startedAt: number | null;
  results: { offers: number; redemptions: number; transactions: number; sponsorEngagement: number; revenue: number; queueDelta: number };
}

export interface DomainStats { agents: number; signals: number; recommendations: number; actions: number }

export interface SimState {
  running: boolean;
  tick: number;
  game: GameContext;
  live: { fans: number; identities: number; concession: number; sessions: number; campaigns: number; health: number };
  decisions: AgentDecision[];
  memories: Memory[];
  stats: Record<Domain, DomainStats>;
  zones: VenueZone[];
  sponsors: Sponsor[];
  series: { revenue: number[]; engagement: number[]; queue: number[]; sponsor: number[]; content: number[]; latency: number[] };
  totals: { revenue: number; blocked: number; approved: number; humanApprovals: number; cost: number; actions: number };
  scenario: ScenarioState;
  agentLast: Record<string, string>;
}
