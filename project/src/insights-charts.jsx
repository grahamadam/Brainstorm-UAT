// Reusable chart primitives for Insights — KPI tiles, sparklines, bars,
// heatmap, funnel, radar, distribution. SVG, no chart libraries.

const InsightTile = ({ label, value, sub, delta, tone = 'neutral', spark, onClick }) => {
  const toneColors = {
    neutral: 'var(--text)',
    pos:     'var(--green)',
    neg:     'var(--accent-2)',
    warn:    '#FFE03F',
  };
  return (
    <div onClick={onClick} style={{
      padding:'18px 20px', background:'var(--card)',
      border:'1px solid var(--border)', borderRadius:'var(--radius-lg)',
      cursor: onClick ? 'pointer' : 'default', position:'relative',
      transition:'border-color .15s, transform .15s',
      display:'flex', flexDirection:'column', gap:8, minHeight:108,
    }}
      onMouseEnter={(e) => onClick && (e.currentTarget.style.borderColor = 'var(--accent-border)')}
      onMouseLeave={(e) => onClick && (e.currentTarget.style.borderColor = 'var(--border)')}>
      <div style={{
        fontFamily:'var(--font-mono)', fontSize:10.5, letterSpacing:'.10em',
        color:'var(--text-dim)', textTransform:'uppercase', fontWeight:700
      }}>{label}</div>
      <div style={{ display:'flex', alignItems:'baseline', gap:10, flexWrap:'wrap' }}>
        <span style={{
          fontFamily:'var(--font-display)', fontSize:28, fontWeight:800,
          letterSpacing:'-0.025em', color: toneColors[tone], lineHeight:1
        }}>{value}</span>
        {delta && (
          <span style={{
            fontSize:12, fontWeight:700,
            color: delta.startsWith('-') ? 'var(--accent-2)' : delta.startsWith('+') ? 'var(--green)' : 'var(--text-dim)'
          }}>{delta}</span>
        )}
      </div>
      {sub && <div style={{ fontSize:11.5, color:'var(--text-sub)', lineHeight:1.4 }}>{sub}</div>}
      {spark && (
        <div style={{ marginTop:'auto', paddingTop:8 }}>
          <Sparkline points={spark} height={28}/>
        </div>
      )}
    </div>
  );
};

// Sparkline — array of numbers
const Sparkline = ({ points, height = 36, color = 'var(--accent)' }) => {
  if (!points || points.length === 0) return null;
  const w = 100, h = height;
  const min = Math.min(...points), max = Math.max(...points);
  const range = (max - min) || 1;
  const xs = points.map((_, i) => (i / (points.length - 1)) * w);
  const ys = points.map(v => h - ((v - min) / range) * (h - 4) - 2);
  const d = points.map((v, i) => `${i === 0 ? 'M' : 'L'}${xs[i].toFixed(2)},${ys[i].toFixed(2)}`).join(' ');
  const fill = `${d} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width:'100%', height, display:'block' }}>
      <defs>
        <linearGradient id={`sg-${points.length}-${(points[0]||0).toFixed(0)}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={fill} fill={`url(#sg-${points.length}-${(points[0]||0).toFixed(0)})`}/>
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx={xs[xs.length-1]} cy={ys[ys.length-1]} r="2" fill={color}/>
    </svg>
  );
};

// Bar chart — horizontal, ranked
const RankedBars = ({ rows, max, formatVal }) => {
  const m = max ?? Math.max(...rows.map(r => r.value));
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
      {rows.map((r, i) => (
        <div key={i} style={{ display:'grid', gridTemplateColumns:'150px 1fr 60px', gap:10, alignItems:'center' }}>
          <span style={{ fontSize:12.5, color:'var(--text)', fontWeight:600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{r.label}</span>
          <div style={{ height:10, background:'var(--card-alt)', borderRadius:999, overflow:'hidden', position:'relative' }}>
            <div style={{
              width:`${Math.max(2,(r.value/m)*100)}%`, height:'100%',
              background: r.color || 'var(--accent)', borderRadius:999,
              transition:'width .8s cubic-bezier(.2,.8,.2,1)'
            }}/>
            {r.target != null && (
              <div title="Target" style={{
                position:'absolute', top:-2, left:`${(r.target/m)*100}%`,
                width:2, height:14, background:'var(--text-dim)', borderRadius:1
              }}/>
            )}
          </div>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:11.5, color:'var(--text-sub)', textAlign:'right' }}>
            {formatVal ? formatVal(r.value) : r.value}
          </span>
        </div>
      ))}
    </div>
  );
};

// Activity heatmap — 7 rows (days) x N cols (hours or weeks)
const Heatmap = ({ data, rowLabels, colLabels, max, color = 'var(--accent)' }) => {
  const m = max ?? Math.max(...data.flat());
  return (
    <div style={{ display:'inline-grid', gap:3, gridTemplateColumns:`auto repeat(${data[0].length}, 1fr)` }}>
      <div/>
      {colLabels.map((c, i) => (
        <div key={i} style={{
          fontFamily:'var(--font-mono)', fontSize:9.5, color:'var(--text-dim)',
          textAlign:'center', letterSpacing:'.04em'
        }}>{c}</div>
      ))}
      {data.map((row, r) => (
        <div key={r} style={{ display:'contents' }}>
          <div style={{
            fontFamily:'var(--font-mono)', fontSize:9.5, color:'var(--text-dim)',
            paddingRight:8, alignSelf:'center', letterSpacing:'.04em'
          }}>{rowLabels[r]}</div>
          {row.map((v, c) => {
            const o = m === 0 ? 0 : 0.10 + (v / m) * 0.85;
            return (
              <div key={c} title={`${rowLabels[r]} ${colLabels[c]}: ${v}`} style={{
                width:'100%', aspectRatio:'1/1', minWidth:14,
                borderRadius:3,
                background: v === 0
                  ? 'var(--card-alt)'
                  : `color-mix(in oklab, ${color} ${o*100}%, transparent)`,
                border:'1px solid var(--border-soft)',
                cursor:'default'
              }}/>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// Funnel — vertical, with drop-off labels
const Funnel = ({ steps }) => {
  const top = steps[0]?.value || 1;
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
      {steps.map((s, i) => {
        const pct = (s.value / top) * 100;
        const dropoff = i > 0 ? Math.round((1 - s.value / steps[i-1].value) * 100) : null;
        return (
          <div key={i} style={{ display:'contents' }}>
            <div style={{ display:'grid', gridTemplateColumns:'170px 1fr 90px', gap:12, alignItems:'center' }}>
              <span style={{ fontSize:12.5, color:'var(--text)', fontWeight:600 }}>{s.label}</span>
              <div style={{ position:'relative', height:30, background:'var(--card-alt)', borderRadius:6, overflow:'hidden' }}>
                <div style={{
                  width:`${pct}%`, height:'100%',
                  background: `linear-gradient(90deg, var(--accent) 0%, var(--accent-mid) 100%)`,
                  borderRadius:6,
                  transition:'width .9s cubic-bezier(.2,.8,.2,1)'
                }}/>
                <div style={{
                  position:'absolute', inset:0, display:'flex', alignItems:'center', padding:'0 10px',
                  fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text)', fontWeight:700
                }}>{s.value.toLocaleString()}</div>
              </div>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-sub)', textAlign:'right' }}>
                {Math.round(pct)}% of top
              </span>
            </div>
            {dropoff != null && dropoff > 0 && (
              <div style={{
                marginLeft:170, paddingLeft:12, fontSize:10.5, color:'var(--text-dim)',
                fontFamily:'var(--font-mono)', letterSpacing:'.04em'
              }}>↓ {dropoff}% drop-off</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// Skill radar — 5–8 axes
const SkillRadar = ({ skills, size = 200, color = 'var(--accent)' }) => {
  const cx = size/2, cy = size/2, r = size/2 - 28;
  const n = skills.length;
  const angle = (i) => -Math.PI/2 + (i / n) * Math.PI * 2;
  const point = (i, v) => {
    const a = angle(i);
    const rr = r * (v/100);
    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr];
  };
  const polygon = skills.map((s, i) => point(i, s.value).join(',')).join(' ');
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display:'block' }}>
      {/* Concentric rings */}
      {[0.25, 0.5, 0.75, 1].map(t => (
        <polygon key={t}
          points={skills.map((_, i) => {
            const a = angle(i);
            return `${cx + Math.cos(a)*r*t},${cy + Math.sin(a)*r*t}`;
          }).join(' ')}
          fill="none" stroke="var(--border)" strokeWidth="0.7"/>
      ))}
      {/* Axes */}
      {skills.map((_, i) => {
        const a = angle(i);
        return <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(a)*r} y2={cy + Math.sin(a)*r}
          stroke="var(--border)" strokeWidth="0.7"/>;
      })}
      {/* Data polygon */}
      <polygon points={polygon} fill={color} fillOpacity="0.20" stroke={color} strokeWidth="1.5"/>
      {/* Vertices */}
      {skills.map((s, i) => {
        const [x, y] = point(i, s.value);
        return <circle key={i} cx={x} cy={y} r="2.6" fill={color}/>;
      })}
      {/* Labels */}
      {skills.map((s, i) => {
        const a = angle(i);
        const x = cx + Math.cos(a) * (r + 16);
        const y = cy + Math.sin(a) * (r + 16);
        const anchor = Math.cos(a) > 0.3 ? 'start' : Math.cos(a) < -0.3 ? 'end' : 'middle';
        return (
          <text key={i} x={x} y={y} textAnchor={anchor} dominantBaseline="middle"
            style={{ fontSize:'9.5px', fontFamily:'var(--font-mono)', letterSpacing:'.04em', fill:'var(--text-sub)' }}>
            {s.label}
          </text>
        );
      })}
    </svg>
  );
};

// Distribution / histogram — horizontal
const Distribution = ({ buckets, color = 'var(--accent)' }) => {
  const m = Math.max(...buckets.map(b => b.value));
  return (
    <div style={{ display:'flex', alignItems:'flex-end', gap:3, height:90 }}>
      {buckets.map((b, i) => (
        <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:6, minWidth:0 }}>
          <div style={{
            width:'100%',
            height: `${Math.max(4, (b.value/m) * 70)}px`,
            background: b.highlight ? color : `color-mix(in oklab, ${color} 35%, transparent)`,
            borderRadius:'3px 3px 0 0',
            transition:'height .8s'
          }}/>
          <div style={{ fontSize:9.5, fontFamily:'var(--font-mono)', color:'var(--text-dim)' }}>{b.label}</div>
        </div>
      ))}
    </div>
  );
};

// Insight callout — AI-narrative card
const NarrativeCard = ({ headline, body, signals, action }) => {
  const { Btn } = window.BrPrim;
  return (
    <div style={{
      background:`linear-gradient(135deg, color-mix(in oklab, var(--accent) 12%, var(--card)) 0%, var(--card) 60%)`,
      border:'1px solid var(--accent-border)', borderRadius:'var(--radius-lg)',
      padding:'22px 26px', display:'grid', gridTemplateColumns:'1fr auto', gap:24, alignItems:'flex-start'
    }}>
      <div style={{ minWidth:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
          <span style={{
            display:'inline-flex', alignItems:'center', gap:6,
            padding:'2px 8px', borderRadius:999, fontSize:10, fontWeight:700,
            fontFamily:'var(--font-mono)', letterSpacing:'.08em', textTransform:'uppercase',
            background:'var(--accent-light)', color:'var(--accent)', border:'1px solid var(--accent-border)'
          }}>
            <span style={{ width:5, height:5, borderRadius:'50%', background:'var(--accent)' }}/>
            Coach insight
          </span>
          <span style={{ fontSize:10.5, color:'var(--text-dim)', fontFamily:'var(--font-mono)' }}>Generated 8 min ago</span>
        </div>
        <h3 style={{
          fontFamily:'var(--font-display)', fontSize:21, fontWeight:700, letterSpacing:'-0.02em',
          margin:'4px 0 10px', color:'var(--text)', lineHeight:1.25
        }}>{headline}</h3>
        <p style={{ fontSize:13.5, color:'var(--text-sub)', margin:0, lineHeight:1.55, maxWidth:680 }}>{body}</p>
        {signals && signals.length > 0 && (
          <div style={{ display:'flex', gap:8, marginTop:14, flexWrap:'wrap' }}>
            {signals.map((s, i) => (
              <span key={i} style={{
                fontSize:11.5, padding:'3px 10px', borderRadius:999,
                background:'var(--card-alt)', border:'1px solid var(--border)',
                color:'var(--text-sub)', fontWeight:600
              }}>{s}</span>
            ))}
          </div>
        )}
      </div>
      {action && (
        <div style={{ display:'flex', flexDirection:'column', gap:8, alignItems:'flex-end', flexShrink:0 }}>
          <Btn size="sm">{action}</Btn>
          <button style={{
            background:'transparent', border:'none', color:'var(--text-dim)',
            fontSize:11, cursor:'pointer', padding:'4px 8px', fontFamily:'inherit'
          }}>Dismiss</button>
        </div>
      )}
    </div>
  );
};

// Section header for Insights — title + question + actions
const InsightsSection = ({ kicker, title, question, headerRight, children, padded = true }) => (
  <section style={{ marginBottom:24 }}>
    <div style={{ display:'flex', alignItems:'flex-end', gap:14, marginBottom:14 }}>
      <div style={{ flex:1, minWidth:0 }}>
        {kicker && (
          <div style={{
            fontFamily:'var(--font-mono)', fontSize:10.5, letterSpacing:'.10em',
            color:'var(--text-dim)', textTransform:'uppercase', fontWeight:700, marginBottom:4
          }}>{kicker}</div>
        )}
        <h2 style={{
          fontFamily:'var(--font-display)', fontSize:21, fontWeight:700,
          letterSpacing:'-0.02em', margin:0, color:'var(--text)'
        }}>{title}</h2>
        {question && (
          <p style={{ fontSize:12.5, color:'var(--text-sub)', margin:'4px 0 0', fontStyle:'italic' }}>{question}</p>
        )}
      </div>
      {headerRight}
    </div>
    {padded ? (
      <div style={{
        background:'var(--card)', border:'1px solid var(--border)',
        borderRadius:'var(--radius-lg)', padding:'22px 24px'
      }}>{children}</div>
    ) : children}
  </section>
);

window.BrInsightsCharts = {
  InsightTile, Sparkline, RankedBars, Heatmap, Funnel,
  SkillRadar, Distribution, NarrativeCard, InsightsSection
};
