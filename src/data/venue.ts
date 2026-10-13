import type { VenueZone } from '../types/sportsiq';

export const initialZones: VenueZone[] = [
  { id: 'g1', name: 'Gate 1', occupancy: 46, waitMin: 3, txnPerHour: 0, staff: 6, staffTarget: 6, status: 'Normal' },
  { id: 'g3', name: 'Gate 3', occupancy: 52, waitMin: 4, txnPerHour: 0, staff: 7, staffTarget: 7, status: 'Normal' },
  { id: 'g5', name: 'Gate 5', occupancy: 71, waitMin: 7, txnPerHour: 0, staff: 5, staffTarget: 8, status: 'Busy' },
  { id: 'concourse', name: 'Main Concourse', occupancy: 64, waitMin: 5, txnPerHour: 1240, staff: 18, staffTarget: 20, status: 'Normal' },
  { id: 'food', name: 'Food Court', occupancy: 38, waitMin: 2, txnPerHour: 880, staff: 14, staffTarget: 14, status: 'Under capacity' },
  { id: 'lounge', name: 'Premium Lounge', occupancy: 57, waitMin: 1, txnPerHour: 410, staff: 12, staffTarget: 12, status: 'Normal' },
  { id: 'upper', name: 'Upper Bowl', occupancy: 49, waitMin: 4, txnPerHour: 620, staff: 9, staffTarget: 10, status: 'Normal' },
];

export const venueOutcomes = [
  'Reduced queue times', 'Higher concession throughput', 'Better labor utilization', 'Improved premium service',
  'Increased venue revenue', 'Improved operational responsiveness',
];

export const venueKpis = [
  'Average entry wait time', 'Concession wait time', 'Transactions per POS per hour', 'Revenue per attendee',
  'Revenue per occupied seat', 'Labor utilization', 'Mobile-order completion', 'Premium service response time',
  'Venue incidents', 'Energy consumption per event',
];

export function zoneStatus(z: Pick<VenueZone, 'id' | 'occupancy' | 'waitMin'>): VenueZone['status'] {
  if (z.waitMin >= 9 || z.occupancy >= 88) return 'Congested';
  if (z.waitMin >= 6 || z.occupancy >= 70) return 'Busy';
  if (z.occupancy <= 40) return 'Under capacity';
  return 'Normal';
}
