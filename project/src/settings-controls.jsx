// Reusable controls for Settings — toggle, segmented, select, input, slider, etc.
// All controls auto-save via the onChange handler — no explicit save button.

const { useState: useStateSC, useEffect: useEffectSC, useRef: useRefSC } = React;

// Row that wraps a label/desc on the left and a control on the right
const SettingRow = ({ label, desc, children, danger, locked, lockedText }) => (
  <div style={{
    display:'grid', gridTemplateColumns:'1fr auto', alignItems:'center', gap:24,
    padding:'14px 0', borderTop:'1px solid var(--border-soft)'
  }}>
    <div style={{ minWidth:0 }}>
      <div style={{
        fontSize:13.5, fontWeight:600, color: danger ? 'var(--accent-2)' : 'var(--text)',
        display:'flex', alignItems:'center', gap:8
      }}>
        {label}
        {locked && (
          <span style={{
            fontSize:9.5, fontFamily:'var(--font-mono)', letterSpacing:'.08em',
            color:'var(--text-dim)', textTransform:'uppercase',
            background:'var(--card-alt)', border:'1px solid var(--border)',
            borderRadius:4, padding:'1px 6px'
          }}>{lockedText || 'Admin only'}</span>
        )}
      </div>
      {desc && <div style={{ fontSize:12, color:'var(--text-sub)', marginTop:3, lineHeight:1.5, maxWidth:520 }}>{desc}</div>}
    </div>
    <div style={{ flexShrink:0, display:'flex', alignItems:'center', gap:8, opacity: locked ? 0.5 : 1, pointerEvents: locked ? 'none' : 'auto' }}>
      {children}
    </div>
  </div>
);

// Section card with title + optional kicker
const SettingSection = ({ kicker, title, desc, children, headerRight, accent }) => (
  <section style={{
    background:'var(--card)', border:'1px solid var(--border)', borderRadius:'var(--radius-lg)',
    padding:'24px 26px', marginBottom:18, position:'relative', overflow:'hidden'
  }}>
    {accent && (
      <div aria-hidden="true" style={{
        position:'absolute', top:0, left:0, right:0, height:3,
        background:`linear-gradient(90deg, ${accent}, transparent 80%)`
      }}/>
    )}
    <div style={{ display:'flex', alignItems:'flex-start', gap:16, marginBottom:18 }}>
      <div style={{ flex:1, minWidth:0 }}>
        {kicker && (
          <div style={{
            fontFamily:'var(--font-mono)', fontSize:10.5, letterSpacing:'.10em',
            color:'var(--text-dim)', textTransform:'uppercase', fontWeight:700, marginBottom:4
          }}>{kicker}</div>
        )}
        <h2 style={{
          fontFamily:'var(--font-display)', fontSize:18, fontWeight:700,
          letterSpacing:'-0.01em', margin:0, color:'var(--text)'
        }}>{title}</h2>
        {desc && <p style={{ fontSize:12.5, color:'var(--text-sub)', margin:'4px 0 0', lineHeight:1.55 }}>{desc}</p>}
      </div>
      {headerRight}
    </div>
    {children}
  </section>
);

// Toggle (auto-save: change fires immediately)
const Toggle = ({ value, onChange, disabled }) => (
  <button type="button" onClick={() => !disabled && onChange(!value)} disabled={disabled}
    style={{
      width:36, height:20, borderRadius:999, border:'none', cursor: disabled ? 'not-allowed' : 'pointer',
      background: value ? 'var(--accent)' : 'var(--card-alt)',
      boxShadow: value ? `inset 0 0 0 1px var(--accent-mid)` : 'inset 0 0 0 1px var(--border)',
      position:'relative', transition:'background .15s', flexShrink:0,
      opacity: disabled ? 0.5 : 1
    }}>
    <span aria-hidden="true" style={{
      position:'absolute', top:2, left: value ? 18 : 2, width:16, height:16,
      borderRadius:'50%', background:'#fff',
      boxShadow:'0 1px 2px rgba(0,0,0,0.35)', transition:'left .15s'
    }}/>
  </button>
);

// Segmented (radio of buttons)
const Segmented = ({ value, onChange, options }) => (
  <div style={{
    display:'inline-flex', background:'var(--card-alt)', borderRadius:8,
    border:'1px solid var(--border)', padding:2
  }}>
    {options.map(o => {
      const v = typeof o === 'string' ? o : o.value;
      const lbl = typeof o === 'string' ? o : o.label;
      const active = v === value;
      return (
        <button key={v} type="button" onClick={() => onChange(v)}
          style={{
            padding:'5px 11px', fontSize:12, fontWeight: active ? 700 : 600,
            background: active ? 'var(--card)' : 'transparent',
            color: active ? 'var(--text)' : 'var(--text-sub)',
            border:'none', borderRadius:6, cursor:'pointer',
            boxShadow: active ? '0 1px 3px rgba(0,0,0,0.3), inset 0 0 0 1px var(--border)' : 'none'
          }}>{lbl}</button>
      );
    })}
  </div>
);

// Select dropdown
const Select = ({ value, onChange, options, width = 200 }) => (
  <select value={value} onChange={e => onChange(e.target.value)}
    style={{
      background:'var(--card-alt)', border:'1px solid var(--border)', borderRadius:8,
      padding:'7px 10px', fontSize:13, color:'var(--text)', outline:'none',
      width, fontFamily:'inherit', cursor:'pointer'
    }}>
    {options.map(o => {
      const v = typeof o === 'string' ? o : o.value;
      const lbl = typeof o === 'string' ? o : o.label;
      return <option key={v} value={v}>{lbl}</option>;
    })}
  </select>
);

// Text input
const TextInput = ({ value, onChange, placeholder, width = 240, mono, type = 'text' }) => (
  <input type={type} value={value || ''} onChange={e => onChange(e.target.value)}
    placeholder={placeholder}
    style={{
      background:'var(--card-alt)', border:'1px solid var(--border)', borderRadius:8,
      padding:'7px 10px', fontSize:13, color:'var(--text)', outline:'none',
      width, fontFamily: mono ? 'var(--font-mono)' : 'inherit'
    }}
    onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent-border)'}
    onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
  />
);

// Slider
const Slider = ({ value, onChange, min = 0, max = 100, step = 1, width = 160, format }) => (
  <div style={{ display:'inline-flex', alignItems:'center', gap:10 }}>
    <input type="range" min={min} max={max} step={step} value={value}
      onChange={e => onChange(Number(e.target.value))}
      style={{ width, accentColor:'var(--accent)' }}/>
    <span style={{ fontFamily:'var(--font-mono)', fontSize:11.5, color:'var(--text-sub)', minWidth:36, textAlign:'right' }}>
      {format ? format(value) : value}
    </span>
  </div>
);

// Status pill (for connection state, etc.)
const StatusPill = ({ kind = 'ok', text }) => {
  const colors = {
    ok:    { bg:'rgba(76,254,200,0.10)', border:'rgba(76,254,200,0.30)', dot:'var(--green)',     fg:'var(--green)' },
    warn:  { bg:'rgba(255,224,63,0.10)', border:'rgba(255,224,63,0.30)', dot:'#FFE03F',          fg:'#FFE03F' },
    err:   { bg:'rgba(255,35,112,0.10)', border:'rgba(255,35,112,0.30)', dot:'var(--accent-2)',  fg:'var(--accent-2)' },
    off:   { bg:'var(--card-alt)',       border:'var(--border)',         dot:'var(--text-dim)',  fg:'var(--text-sub)' },
  };
  const c = colors[kind];
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:6,
      padding:'2px 9px', borderRadius:999, fontSize:11, fontWeight:600,
      background:c.bg, border:`1px solid ${c.border}`, color:c.fg
    }}>
      <span style={{ width:6, height:6, borderRadius:'50%', background:c.dot }}/>{text}
    </span>
  );
};

// Auto-save toast — call window.__bsToast(text) to fire
const SettingsToast = () => {
  const [msg, setMsg] = useStateSC(null);
  const tRef = useRefSC(null);
  useEffectSC(() => {
    window.__bsToast = (m) => {
      setMsg(m);
      clearTimeout(tRef.current);
      tRef.current = setTimeout(() => setMsg(null), 1800);
    };
    return () => { window.__bsToast = null; };
  }, []);
  return (
    <div style={{
      position:'fixed', bottom:90, right:24, zIndex:50,
      background:'var(--card)', border:'1px solid var(--accent-border)',
      borderRadius:10, padding:'9px 14px', fontSize:12.5, color:'var(--text)',
      boxShadow:'0 18px 40px -20px rgba(0,0,0,0.6)',
      transform: msg ? 'translateY(0)' : 'translateY(8px)',
      opacity: msg ? 1 : 0,
      pointerEvents:'none',
      transition:'opacity .2s, transform .2s',
      display:'flex', alignItems:'center', gap:8
    }}>
      <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--green)' }}/>
      {msg || ''}
    </div>
  );
};

window.BrSC = {
  SettingRow, SettingSection, Toggle, Segmented, Select,
  TextInput, Slider, StatusPill, SettingsToast
};
