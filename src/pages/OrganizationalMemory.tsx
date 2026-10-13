import { PageHead } from '../components/PageHead';
import { MemoryCard, MemoryEntry } from '../components/MemoryCard';
import { memoryAreas } from '../data/memories';
import type { SimState } from '../types/sportsiq';

export function OrganizationalMemory({ state }: { state: SimState }) {
  return (
    <>
      <PageHead eyebrow="ORGANIZATIONAL MEMORY" title="THE CLUB REMEMBERS" level={5}
        sub="SportsIQ does not treat every event as a new event. SportsIQ maintains governed organizational memory that agents can use for future reasoning." />
      <div className="grid g4">{memoryAreas.map((m) => <MemoryCard key={m.key} title={m.title} color={m.color} items={m.items} />)}</div>
      <div className="grid gsplit mt2">
        <div>
          <div className="section-title" style={{ marginTop: 0 }}><span className="dot" /> Memories being written</div>
          <div className="timeline">{state.memories.slice(0, 14).map((m) => <MemoryEntry key={m.id} m={m} />)}</div>
        </div>
        <div className="card glow" style={{ alignSelf: 'start' }}>
          <h3>Compounding intelligence</h3>
          <p className="quote">"Every action creates memory. Every memory improves the next decision."</p>
          <p style={{ color: 'var(--muted)', marginTop: 12, lineHeight: 1.5 }}>{state.memories.length} governed memories are currently available to future SportsIQ reasoning. Blocked decisions are remembered too — including the policy that stopped them.</p>
        </div>
      </div>
    </>
  );
}
