import type { Memory } from '../types/sportsiq';

export const memoryAreas = [
  { key: 'Fan' as const, title: 'FAN MEMORY', color: '#e4002b', items: ['Preferences', 'Historical responses', 'Offer fatigue', 'Loyalty', 'Purchases', 'Engagement', 'Journey state'] },
  { key: 'Venue' as const, title: 'VENUE MEMORY', color: '#2f7bff', items: ['Entry patterns', 'Density', 'Queue history', 'Incidents', 'Staffing', 'Energy', 'Premium service'] },
  { key: 'Sponsor' as const, title: 'SPONSOR MEMORY', color: '#f5a524', items: ['Assets', 'Exposure', 'Engagement', 'Campaign performance', 'Commercial commitments', 'Proof points'] },
  { key: 'Operating' as const, title: 'OPERATING MEMORY', color: '#19c3a6', items: ['Campaign snapshots', 'Approvals', 'Guardrails', 'Agent decisions', 'Telemetry', 'Cost', 'Outcomes'] },
];

export const seedMemories: Memory[] = [
  { id: 'seed-1', timestamp: '7:41 PM', area: 'Venue', source: 'VenueIQ', text: 'Pre-game entry peaked at Gate 5 twenty minutes before puck drop.' },
  { id: 'seed-2', timestamp: '7:58 PM', area: 'Sponsor', source: 'SponsorIQ', text: 'Maple Mobile first-period activation exceeded engagement target.' },
  { id: 'seed-3', timestamp: '8:04 PM', area: 'Fan', source: 'FanIQ', text: 'Second-period concession activation converted among Family Fan segment.' },
];
