import type { Fan, FanSegment } from '../types/sportsiq';

export const fanSegments: FanSegment[] = [
  { id: 'stm', name: 'Season Ticket Members', size: 6240, engagement: 88, avgSpend: 61, trend: 'flat', note: 'Highest loyalty; sensitive to offer frequency.' },
  { id: 'fam', name: 'Families', size: 3180, engagement: 74, avgSpend: 52, trend: 'up', note: 'Respond strongly to second-period food bundles.' },
  { id: 'prem', name: 'Premium Guests', size: 1260, engagement: 81, avgSpend: 148, trend: 'up', note: 'Service-response and hospitality focus.' },
  { id: 'cas', name: 'Casual Attendees', size: 4100, engagement: 58, avgSpend: 34, trend: 'down', note: 'Lower app adoption; engage via venue channels.' },
  { id: 'dig', name: 'Highly Engaged Digital Fans', size: 2870, engagement: 93, avgSpend: 47, trend: 'up', note: 'Heavy streaming and content consumers.' },
  { id: 'risk', name: 'At-Risk Fans', size: 770, engagement: 31, avgSpend: 22, trend: 'down', note: 'Declining attendance and app interaction.' },
];

export const sampleFans: Fan[] = [
  { id: 'F-10482', segmentId: 'fam', consent: true, offerFatigue: 0.2, loyaltyTier: 'Gold', journeyState: 'In seat — game pause' },
  { id: 'F-22871', segmentId: 'cas', consent: true, offerFatigue: 0.1, loyaltyTier: 'Bronze', journeyState: 'Concourse' },
  { id: 'F-31904', segmentId: 'prem', consent: true, offerFatigue: 0.4, loyaltyTier: 'Platinum', journeyState: 'Premium lounge' },
];

export const opportunities = [
  {
    id: 'opp-1', title: '428 eligible fans show declining engagement during a game pause',
    signal: 'Reduced app interaction.',
    context: 'Game pause + concession proximity + historical purchase behavior.',
    recommendation: 'Contextual concession offer.',
    guardrails: [
      ['Consent', 'PASS'], ['Offer fatigue', 'PASS'], ['Budget', 'PASS'], ['Brand', 'PASS'], ['Game timing', 'PASS'],
    ] as [string, string][],
  },
  {
    id: 'opp-2', title: '96 Family Fans within 40 m of Food Court with no purchase this period',
    signal: 'Family segment dwell time rising near Food Court.',
    context: 'Prior family-bundle redemption + low queue at Food Court.',
    recommendation: 'Family bundle reminder routed to Food Court.',
    guardrails: [['Consent', 'PASS'], ['Offer fatigue', 'PASS'], ['Budget', 'PASS'], ['Brand', 'PASS'], ['Game timing', 'REVIEW']] as [string, string][],
  },
];

export const faniqSimSteps = [
  'Offer generated', 'Policy approved', 'Offer delivered', 'Redemption observed', 'Fan memory updated',
];

export const faniqOutcomes = [
  'Higher revenue per fan', 'Higher conversion', 'Higher loyalty engagement', 'Lower offer fatigue', 'More relevant engagement',
];

export const faniqKpis = [
  'Revenue per fan', 'Offer conversion rate', 'Average transaction value', 'Redemption rate', 'Digital engagement rate',
  'Repeat purchase rate', 'Loyalty engagement', 'Incremental revenue per event', 'Offer dismissal rate', 'Fan lifetime value proxy',
];
