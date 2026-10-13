export const liveMoment = {
  title: 'Toronto scores.',
  evaluates: [
    ['Game significance', 'Go-ahead goal, period 2'],
    ['Fan segments', '6 segments, 2,870 high-affinity digital fans'],
    ['Content preferences', 'Short-form video > push > social'],
    ['Channel eligibility', 'Consent verified for push + in-app'],
    ['Sponsorship rights', 'Replay segment rights held by NorthStar Bank'],
    ['Campaign context', 'FreshCo Foods + NorthStar Bank active'],
  ] as [string, string][],
  recommends: [
    { name: 'Highlight clip', detail: 'Auto-cut within 20 s of the goal', audience: 'All eligible digital fans' },
    { name: 'Push notification', detail: '"Toronto takes the lead!" with clip link', audience: '14,870 active identities' },
    { name: 'Social content', detail: 'Vertical clip + captions for brand channels', audience: 'Public social' },
    { name: 'Sponsor-branded variation', detail: 'Approved NorthStar Bank replay frame', audience: 'Sponsor-eligible audience' },
    { name: 'Premium member content', detail: 'Extended angle + player cam', audience: 'Season Ticket Members' },
  ],
};

export const contentOutcomes = [
  'Greater content engagement', 'Higher digital session frequency', 'Increased streaming engagement',
  'More monetizable content inventory', 'Improved sponsor activation',
];

export const contentKpis = [
  'Content engagement rate', 'Highlight views', 'Watch time', 'Digital sessions per fan',
  'Content-to-commerce conversion', 'Sponsor content engagement', 'Content inventory utilization',
];
