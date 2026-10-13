const Mini = ({ t, d }: { t: string; d?: string }) => <div className="mini"><b>{t}</b>{d && <span>{d}</span>}</div>;
const Down = () => <div className="arrow-down">▼</div>;

export function ArchitectureDiagram() {
  return (
    <div className="arch">
      <div style={{ position: 'relative' }}>
        <div className="layer">
          <div className="lt">DATA SOURCES</div>
          <div className="chips">{['Ticketing', 'CRM', 'POS', 'Mobile', 'Streaming', 'Game Data', 'Venue IoT', 'Sponsorship', 'Content'].map((s) => <span key={s} className="chip">{s}</span>)}</div>
        </div>
        <Down />
        <div className="layer fabric">
          <div className="lt">MICROSOFT FABRIC</div>
          <div className="grid g3">
            <Mini t="Eventstream" d="Real-time ingestion of game, fan, venue and commerce signals" />
            <Mini t="Eventhouse + KQL" d="Low-latency event analytics" />
            <Mini t="Lakehouse + OneLake" d="Historical and reference data" />
            <Mini t="Fabric Ontology" d="Fan, game, venue, offer and outcome semantics" />
            <Mini t="Fabric Data Agent" d="Trusted data context for agents" />
          </div>
        </div>
        <Down />
        <div className="layer foundry">
          <div className="lt" style={{ color: '#d3a4ff' }}>MICROSOFT FOUNDRY</div>
          <div className="chips">{['Models', 'Agent reasoning', 'Agent workflows', 'Evaluations', 'Optimization'].map((s) => <span key={s} className="chip">{s}</span>)}</div>
        </div>
        <Down />
        <div className="layer fw">
          <div className="lt" style={{ color: '#ff6b85' }}>SPORTSIQ AGENT FRAMEWORK</div>
          <Mini t="SportsIQ Orchestrator" d="Parent organizational brain: shared context, tool orchestration, cost visibility" />
          <div className="chips" style={{ margin: '10px 0' }}>{['FanIQ', 'VenueIQ', 'SponsorIQ', 'ContentIQ', 'AnalyticsIQ'].map((s) => <span key={s} className="chip" style={{ borderColor: '#e4002b' }}>{s}</span>)}</div>
          <div className="chips">{['Monitor Agents', 'Context Agents', 'Recommendation Agents', 'Approval Agents', 'Action Agents', 'Learning Agents'].map((s) => <span key={s} className="chip kpi">{s}</span>)}</div>
        </div>
        <Down />
        <div className="layer gov">
          <div className="lt" style={{ color: 'var(--amber)' }}>GOVERNANCE</div>
          <div className="chips">{['Consent', 'Brand', 'Budget', 'Offer fatigue', 'Safety', 'Sport timing', 'Sponsorship rights', 'Human approval'].map((s) => <span key={s} className="chip">{s}</span>)}</div>
        </div>
        <Down />
        <div className="layer">
          <div className="lt">ACTION CHANNELS</div>
          <div className="chips">{['MLSE One', 'Digital channels', 'Venue operations', 'Marketing platforms', 'Sponsor systems', 'Operations teams'].map((s) => <span key={s} className="chip">{s}</span>)}</div>
        </div>
        <Down />
        <div className="layer">
          <div className="lt">OUTCOME TELEMETRY</div>
          <div className="chips">{['Conversions', 'Revenue', 'Engagement', 'Queue times', 'Content consumption', 'Sponsor performance', 'Agent performance'].map((s) => <span key={s} className="chip">{s}</span>)}</div>
        </div>
        <Down />
        <div className="layer mem">
          <div className="lt" style={{ color: 'var(--teal)' }}>SPORTSIQ ORGANIZATIONAL MEMORY</div>
          <p style={{ color: 'var(--muted)' }}>Governed, durable memory persisted to OneLake and Eventhouse.</p>
        </div>
        <div className="feedback">↺ FEEDBACK LOOP — every outcome returns to SportsIQ and improves the next decision</div>
      </div>
      <div className="side-svc">
        <div className="section-title" style={{ margin: 0 }}>Supporting services</div>
        <Mini t="Azure Container Apps" d="Hosts SportsIQ orchestrator and IQ agent services" />
        <Mini t="Azure Monitor" d="Platform telemetry, alerts and cost visibility" />
        <Mini t="Application Insights" d="Agent traces, latency and dependency monitoring" />
        <Mini t="Azure Communication Services / Teams" d="Human approvals, alerts and operations notifications" />
        <Mini t="Azure Static Web Apps" d="Hosts this demo" />
      </div>
    </div>
  );
}
