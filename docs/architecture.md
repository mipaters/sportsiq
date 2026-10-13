# Architecture

Layers, bottom to top:

1. **Signals** – fan, venue, sponsor, content and operational events (synthetic).
2. **SportsIQ Brain** – shared context, Organizational Memory, policy engine and the Orchestrator agent.
3. **Domain IQs** – FanIQ, VenueIQ, SponsorIQ, ContentIQ, AnalyticsIQ, each with specialist agents (27 in the demo).
4. **Actions** – offers, staffing moves, sponsor activations, content, all gated by policy.
5. **Experience** – the executive UI.

## Decision pipeline

SIGNAL → CONTEXT → REASONING → POLICY → ACTION → RESULT. Policy outcomes: approved, review (human, non-blocking) or blocked. Results are written back to memory.

## Demo implementation

`src/services/simulationEngine.ts` ticks every second over immutable-style plain state (`structuredClone`) and exposes it to React with `useSyncExternalStore`. Engines: policy, memory, agent, and pure state operations in `sportsIQEngine.ts`.

## Microsoft mapping (conceptual)

Azure AI Foundry / Azure OpenAI (reasoning), Microsoft Fabric (data), Azure AI Search (memory retrieval), Event Hubs (signals), Entra ID and Purview (identity, governance), Power BI (analytics), Azure Static Web Apps (this demo).
