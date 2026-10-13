import type { CSSProperties } from 'react';
import type { Memory } from '../types/sportsiq';
import { memoryAreas } from '../data/memories';

export function MemoryCard({ title, color, items }: { title: string; color: string; items: string[] }) {
  return (
    <div className="card mem-card" style={{ '--c': color } as CSSProperties}>
      <h3 style={{ color }}>{title}</h3>
      <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>
    </div>
  );
}

export function MemoryEntry({ m }: { m: Memory }) {
  const area = memoryAreas.find((a) => a.key === m.area);
  return (
    <div className="tl" style={{ '--c': area?.color } as CSSProperties}>
      <div className="when">{m.timestamp} · {m.source}</div>
      <div className="what">{m.area} memory written</div>
      <div className="mm">"{m.text}"</div>
      <div className="avail">✓ Available to future SportsIQ reasoning</div>
    </div>
  );
}
