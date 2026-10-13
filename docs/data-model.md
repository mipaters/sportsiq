# Data Model

All types live in `src/types/sportsiq.ts`; data is synthetic and in `src/data/`.

- **Fan / FanSegment** – anonymized fan profile and segment.
- **VenueZone** – zone with queue and density metrics.
- **Campaign, Sponsor** – fictional sponsors and activations.
- **GameContext** – clock, period, paused flag.
- **Signal** – source, domain, payload, timestamp.
- **Policy / PolicyResult** – consent, fatigue, rights, human review; outcome approved/review/blocked.
- **Agent / AgentDecision** – agent registry (27) and decision with stage trace.
- **Action / Outcome** – what was done and the measured result.
- **Memory** – learned insights written to Organizational Memory.
- **KPI, IQDomain, ScenarioState, SimState** – measurement and simulation state.

`SimState` must remain plain serializable data (no functions) because the engine clones it each tick.
