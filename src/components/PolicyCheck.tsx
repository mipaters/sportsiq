import type { PolicyResult } from '../types/sportsiq';

type Row = PolicyResult | { name: string; result: string; note?: string };

export function PolicyCheck({ row }: { row: Row }) {
  const cls = row.result === 'PASS' ? 'pass' : row.result === 'FAIL' ? 'fail' : 'review';
  return (
    <div className="policy">
      <div>{row.name}{row.note && <small>{row.note}</small>}</div>
      <span className={`tag ${cls}`}>{row.result}</span>
    </div>
  );
}
