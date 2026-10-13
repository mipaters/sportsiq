import type { Sponsor } from '../types/sportsiq';

export const initialSponsors: Sponsor[] = [
  { id: 's1', name: 'NorthStar Bank', category: 'Financial', assetsContracted: 24, assetsActivated: 19, exposure: 412000, engagement: 5.8, engagementTarget: 5.5, conversions: 1240, attributedValue: 186000, status: 'On track' },
  { id: 's2', name: 'Maple Mobile', category: 'Telecom', assetsContracted: 30, assetsActivated: 27, exposure: 538000, engagement: 6.9, engagementTarget: 6.0, conversions: 2105, attributedValue: 264000, status: 'Ahead' },
  { id: 's3', name: 'TrueNorth Auto', category: 'Automotive', assetsContracted: 16, assetsActivated: 10, exposure: 241000, engagement: 3.1, engagementTarget: 4.5, conversions: 312, attributedValue: 71000, status: 'Under-indexing' },
  { id: 's4', name: 'Northern Air', category: 'Travel', assetsContracted: 14, assetsActivated: 12, exposure: 198000, engagement: 4.6, engagementTarget: 4.5, conversions: 540, attributedValue: 94000, status: 'On track' },
  { id: 's5', name: 'FreshCo Foods', category: 'Food & Beverage', assetsContracted: 18, assetsActivated: 11, exposure: 305000, engagement: 3.8, engagementTarget: 5.0, conversions: 988, attributedValue: 118000, status: 'Under-indexing' },
];

export const sponsorOutcomes = [
  'Greater sponsor inventory utilization', 'Stronger measurement', 'Higher sponsor ROI visibility',
  'Better renewal narratives', 'Additional sponsorship monetization',
];

export const sponsorKpis = [
  'Sponsor asset utilization', 'Engagement per activation', 'Attributed conversions', 'Cost per engagement',
  'Incremental sponsor revenue', 'Digital inventory utilization', 'Campaign lift', 'Sponsor renewal rate',
  'Sponsor revenue per fan', 'Sponsor revenue per event',
];
