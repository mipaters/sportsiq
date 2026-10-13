export function Spark({ data, color = '#2f7bff', height = 56, fill = true }: { data: number[]; color?: string; height?: number; fill?: boolean }) {
  const w = 240;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => [(i / Math.max(1, data.length - 1)) * w, height - 4 - ((v - min) / range) * (height - 10)]);
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const id = `g${color.replace('#', '')}${height}`;
  return (
    <svg className="sparkwrap" viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" height={height}>
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity=".35" /><stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={`${line} L${w},${height} L0,${height} Z`} fill={`url(#${id})`} />}
      <path d={line} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function Donut({ value, color = '#e4002b', size = 84, label }: { value: number; color?: string; size?: number; label?: string }) {
  const r = size / 2 - 8;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size}>
      <circle cx={size / 2} cy={size / 2} r={r} stroke="#1c2130" strokeWidth="8" fill="none" />
      <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth="8" fill="none" strokeLinecap="round"
        strokeDasharray={`${(value / 100) * c} ${c}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fill="#fff" fontWeight="800" fontSize={size / 4.2}>{label ?? `${Math.round(value)}%`}</text>
    </svg>
  );
}

export function BarChart({ items, color = '#2f7bff' }: { items: { label: string; value: number; display?: string }[]; color?: string }) {
  const max = Math.max(...items.map((i) => i.value)) || 1;
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      {items.map((i) => (
        <div key={i.label}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
            <span style={{ color: '#aab2c5' }}>{i.label}</span><b>{i.display ?? i.value}</b>
          </div>
          <div className="bar"><i style={{ width: `${(i.value / max) * 100}%`, background: color }} /></div>
        </div>
      ))}
    </div>
  );
}
