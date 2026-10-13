# SportsIQ — The Agentic Operating System for Rogers Sports & MLSE

An executive-quality **concept demo**. SportsIQ is a shared intelligence layer that senses, reasons, acts and learns across fan, venue, sponsor and content operations.

> All data is **synthetic**. Sponsors, fans, venues and figures are fictional. Nothing here is a Rogers/MLSE forecast, commitment or production system.

## What the demo shows

- **Command Center** – live signals, agent decisions, game clock, one-click master scenario.
- **SportsIQ Brain** – the shared intelligence hub connecting FanIQ, VenueIQ, SponsorIQ, ContentIQ and AnalyticsIQ.
- **Domain pages** – FanIQ, VenueIQ, SponsorIQ, ContentIQ, AnalyticsIQ.
- **Organizational Memory** – what the system has learned.
- **Agent Activity** – 27 agents with explainable decision traces (SIGNAL → CONTEXT → REASONING → POLICY → ACTION → RESULT).
- **Business Outcomes** – editable, illustrative scenario calculator and a "potential measurement framework".
- **Architecture** – Microsoft-aligned reference architecture.
- **Executive walkthrough** – guided 6-step tour.

## Run locally

```
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
```

## Deploy to Azure Static Web Apps

- App location: `/`
- Build command: `npm run build`
- Output location: `dist`
- Routing config: `public/staticwebapp.config.json`

## Repo structure

```
src/
  components/   reusable UI (charts, cards, drawer, walkthrough)
  data/         synthetic data and scenario definitions
  pages/        the 11 pages
  services/     simulation, policy, memory and agent engines
  styles/       design system
  types/        domain types
docs/           architecture, demo script, KPI framework, data model
```

## Docs

- [Architecture](docs/architecture.md)
- [Demo script](docs/demo-script.md)
- [KPI framework](docs/kpi-framework.md)
- [Data model](docs/data-model.md)
