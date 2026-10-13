import { Spark } from './Charts';

export function KPICard({ label, value, delta, trend, color }: { label: string; value: string; delta?: string; trend?: number[]; color?: string }) {
  return (
    <div className="card kpi">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      {delta && <div className="delta">{delta}</div>}
      {trend && <div style={{ marginTop: 8 }}><Spark data={trend} color={color} height={40} /></div>}
    </div>
  );
}
