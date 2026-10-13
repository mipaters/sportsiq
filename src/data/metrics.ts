import type { Domain } from '../types/sportsiq';

export const signalSources = [
  'Ticketing', 'POS', 'Mobile App', 'Streaming', 'Venue Sensors', 'Wi-Fi / Location', 'Game Data', 'CRM',
  'Loyalty', 'Merchandise', 'Sponsorship', 'Content', 'Weather',
];

export const initialStats: Record<Domain, { agents: number; signals: number; recommendations: number; actions: number }> = {
  FanIQ: { agents: 14, signals: 48210, recommendations: 312, actions: 188 },
  VenueIQ: { agents: 16, signals: 61840, recommendations: 244, actions: 171 },
  SponsorIQ: { agents: 11, signals: 22370, recommendations: 96, actions: 58 },
  ContentIQ: { agents: 12, signals: 30950, recommendations: 121, actions: 84 },
  AnalyticsIQ: { agents: 9, signals: 18460, recommendations: 37, actions: 29 },
  'SportsIQ Brain': { agents: 10, signals: 182000, recommendations: 64, actions: 52 },
};

export const domainKpi: Record<Domain, { label: string; base: number; fmt: (n: number) => string }> = {
  FanIQ: { label: 'Revenue per fan', base: 41.2, fmt: (n) => `$${n.toFixed(2)}` },
  VenueIQ: { label: 'Avg entry wait', base: 4.1, fmt: (n) => `${n.toFixed(1)} min` },
  SponsorIQ: { label: 'Asset utilization', base: 71, fmt: (n) => `${n.toFixed(0)}%` },
  ContentIQ: { label: 'Content engagement', base: 38.5, fmt: (n) => `${n.toFixed(1)}%` },
  AnalyticsIQ: { label: 'Signal → action', base: 1.8, fmt: (n) => `${n.toFixed(1)} s` },
  'SportsIQ Brain': { label: 'Governed decisions', base: 0, fmt: (n) => `${n.toFixed(0)}` },
};

export const kpiGroups: Record<string, { title: string; kpis: string[] }> = {
  fan: { title: 'FAN VALUE', kpis: ['Revenue per attendee', 'Digital revenue per fan', 'Conversion rate', 'Repeat purchase rate', 'Fan lifetime value', 'Loyalty participation'] },
  venue: { title: 'VENUE ECONOMICS', kpis: ['Revenue per attendee', 'Revenue per seat', 'Transactions per hour', 'Average queue time', 'Labor cost per attendee', 'Premium service SLA'] },
  sponsor: { title: 'SPONSORSHIP VALUE', kpis: ['Asset utilization', 'Engagement', 'Attributed conversion', 'Sponsor revenue', 'Renewal rate', 'Campaign lift'] },
  digital: { title: 'DIGITAL & CONTENT VALUE', kpis: ['Sessions per fan', 'Watch time', 'Content engagement', 'Click-through rate', 'Content-to-commerce conversion'] },
  ops: { title: 'OPERATING EFFICIENCY', kpis: ['Time from signal to action', 'Automated decision percentage', 'Human approvals required', 'Policy rejection rate', 'Agent latency', 'AI cost per successful action'] },
};

export const pillars = [
  { key: 'fan', title: '1. FAN VALUE', color: '#e4002b', outcomes: ['Revenue per fan', 'Conversion', 'Loyalty', 'Retention', 'Engagement'] },
  { key: 'venue', title: '2. VENUE ECONOMICS', color: '#2f7bff', outcomes: ['Concession throughput', 'Merchandise revenue', 'Labor efficiency', 'Premium experience'] },
  { key: 'sponsor', title: '3. SPONSORSHIP VALUE', color: '#f5a524', outcomes: ['Asset utilization', 'Campaign effectiveness', 'Attribution', 'Renewals'] },
  { key: 'digital', title: '4. DIGITAL & CONTENT VALUE', color: '#a855f7', outcomes: ['Digital engagement', 'Content consumption', 'Streaming activity', 'Commerce activation'] },
  { key: 'ops', title: '5. OPERATING EFFICIENCY', color: '#19c3a6', outcomes: ['Faster decisions', 'Lower campaign effort', 'Fewer manual interventions', 'Improved AI governance'] },
];

export const seedSeries = {
  revenue: [32, 34, 33, 36, 38, 37, 41, 44, 43, 47],
  engagement: [61, 62, 60, 64, 66, 65, 68, 67, 70, 71],
  queue: [6.2, 5.8, 5.9, 5.1, 4.8, 4.9, 4.4, 4.2, 4.1, 3.9],
  sponsor: [52, 54, 55, 57, 56, 60, 62, 63, 65, 67],
  content: [30, 32, 35, 34, 38, 41, 40, 44, 46, 48],
  latency: [260, 255, 248, 240, 236, 231, 228, 224, 221, 218],
};

export const askAnswers: { q: string; a: string }[] = [
  { q: 'What drove incremental revenue tonight?', a: 'Synthetic analysis: the largest contributor was the second-period concession activation (FanIQ + VenueIQ + SponsorIQ). Eligible Family and Casual fans received contextual offers during pauses, mobile orders were routed to the Food Court, and the FreshCo Foods sponsor placement lifted engagement. Policy controls capped offer frequency, so lift came with a lower dismissal rate than the previous event.' },
  { q: 'Which venue areas are underperforming?', a: 'Gate 5 ran above its target wait time before the redirect, and the Food Court operated below capacity until demand was routed there. Upper Bowl concession throughput remains below the concourse average; VenueIQ recommends testing mobile-order pickup prompts there next game.' },
  { q: 'Which sponsor campaigns generated the strongest engagement?', a: 'Maple Mobile led engagement against target, followed by NorthStar Bank. TrueNorth Auto and FreshCo Foods were under-indexing at the start of the period; SponsorIQ activated approved inventory and FreshCo Foods closed part of the gap through the concession activation.' },
  { q: 'Where are we seeing fan disengagement?', a: 'Casual Attendees and At-Risk Fans show declining app interaction, concentrated during pauses and in the Upper Bowl. FanIQ suggests venue-channel engagement rather than app-only prompts for these groups.' },
  { q: 'Which SportsIQ decisions were blocked by policy?', a: 'Tonight, policies blocked or held a small number of decisions: an offer to 37 fans above the offer-fatigue cap, a TrueNorth Auto placement flagged for a category exclusivity conflict, and a highlight held for replay-rights clearance. Each block is recorded in operating memory with the policy evaluated.' },
  { q: 'What should we change for the next game?', a: 'Increase Gate 5 staffing earlier in arrival, pre-stage Food Court mobile-order routing before the first pause, schedule TrueNorth Auto placements in the first commercial window, and keep Family bundle offers within the current frequency cap.' },
];
