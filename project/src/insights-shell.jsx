// Insights — shell with scope switcher, filters, and the four scope views.

const { useState: useStateInsights, useMemo: useMemoInsights } = React;

const InsightsScreen = ({ user }) => {
  const [scope, setScope]     = useStateInsights('personal');
  const [range, setRange]     = useStateInsights('30d');
  const [team, setTeam]       = useStateInsights('all');
  const [compare, setCompare] = useStateInsights('cohort');

  const { Btn, Pill } = window.BrPrim;
  const { IconDownload, IconSpark } = window.BrIcons;
  const { InsightsPersonal }   = window.BrInsightsPersonal;
  const { InsightsEnablement } = window.BrInsightsEnablement;
  const { InsightsOrg }        = window.BrInsightsOrg;
  const { InsightsOps }        = window.BrInsightsOps;

  // Different scopes get different scope-appropriate filter chips.
  const scopes = [
    { id:'personal',   label:'My learning', sub:'IC view', desc:'How am I doing?' },
    { id:'enablement', label:'Content',     sub:'Enablement', desc:'What\'s working in the curriculum?' },
    { id:'org',        label:'Org health',  sub:'CRO / VP', desc:'Is the program paying off?' },
    { id:'ops',        label:'Operations',  sub:'Admin', desc:'Is the platform healthy?' },
  ];

  const ranges = [
    { id:'7d',  label:'7d' },
    { id:'30d', label:'30d' },
    { id:'qtd', label:'QTD' },
    { id:'ytd', label:'YTD' },
    { id:'all', label:'All' },
  ];

  const teams = [
    { id:'all',        label:'All teams' },
    { id:'ent-west',   label:'Enterprise · West' },
    { id:'ent-east',   label:'Enterprise · East' },
    { id:'mm-atlas',   label:'Mid-Market · Atlas' },
    { id:'smb',        label:'SMB · Velocity' },
    { id:'tigers',     label:'Strategic · Tigers' },
    { id:'ras',        label:'RAs · East' },
  ];

  const compares = [
    { id:'cohort',   label:'vs cohort' },
    { id:'lastq',    label:'vs last quarter' },
    { id:'baseline', label:'vs baseline (Q1)' },
    { id:'none',     label:'No comparison' },
  ];

  return (
    <div style={{ height:'100%', overflow:'auto' }}>
    <div style={{ padding:'28px 32px 64px', maxWidth:1280, margin:'0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom:18 }}>
        <div style={{
          fontFamily:'var(--font-mono)', fontSize:11, color:'var(--accent)',
          letterSpacing:'.12em', textTransform:'uppercase', fontWeight:700, marginBottom:8
        }}>Insights</div>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:24, flexWrap:'wrap' }}>
          <div>
            <h1 style={{
              fontFamily:'var(--font-display)', fontSize:34, fontWeight:800,
              letterSpacing:'-0.02em', color:'var(--text)', margin:'0 0 6px'
            }}>{scopes.find(s => s.id === scope).desc}</h1>
            <p style={{ fontSize:13, color:'var(--text-sub)', margin:0, lineHeight:1.55 }}>
              {scope === 'personal'   && 'Personal mastery, behavior change, and where to focus next.'}
              {scope === 'enablement' && 'Content performance, drop-off patterns, and gaps in the catalog.'}
              {scope === 'org'        && 'Adoption, ramp, and field-impact across teams. The CRO summary.'}
              {scope === 'ops'        && 'Platform health, AI spend, integrations, and licenses.'}
            </p>
          </div>
          <div style={{ display:'flex', gap:8, alignItems:'center' }}>
            <Btn variant="ghost" size="sm"><IconDownload size={14}/> Export</Btn>
            <Btn variant="ghost" size="sm">Share</Btn>
            <Btn variant="primary" size="sm"><IconSpark size={14}/> Ask Coach</Btn>
          </div>
        </div>
      </div>

      {/* Scope switcher — big and clear */}
      <div style={{
        display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:10, marginBottom:16
      }}>
        {scopes.map(s => {
          const active = s.id === scope;
          return (
            <button key={s.id} onClick={() => setScope(s.id)} style={{
              cursor:'pointer', textAlign:'left', font:'inherit',
              padding:'14px 16px', borderRadius:'var(--radius-md)',
              background: active ? 'var(--accent-light)' : 'var(--card-alt)',
              border: active ? '1px solid var(--accent-border)' : '1px solid var(--border)',
              boxShadow: active ? 'var(--shadow-soft)' : 'none',
              transition:'all 120ms'
            }}>
              <div style={{
                fontFamily:'var(--font-mono)', fontSize:10.5, letterSpacing:'.08em',
                textTransform:'uppercase', fontWeight:700,
                color: active ? 'var(--accent)' : 'var(--text-dim)', marginBottom:6
              }}>{s.sub}</div>
              <div style={{
                fontFamily:'var(--font-display)', fontSize:18, fontWeight:700,
                color:'var(--text)', letterSpacing:'-0.01em', marginBottom:2
              }}>{s.label}</div>
              <div style={{ fontSize:11.5, color:'var(--text-sub)', lineHeight:1.4 }}>{s.desc}</div>
            </button>
          );
        })}
      </div>

      {/* Filter bar */}
      <div style={{
        display:'flex', alignItems:'center', gap:14, flexWrap:'wrap',
        padding:'12px 14px', borderRadius:'var(--radius-md)',
        background:'var(--card-alt)', border:'1px solid var(--border)',
        marginBottom:24
      }}>
        <FilterGroup label="Range" options={ranges} value={range} onChange={setRange}/>
        {(scope === 'enablement' || scope === 'org' || scope === 'ops') && (
          <>
            <Divider/>
            <FilterDropdown label="Team" options={teams} value={team} onChange={setTeam}/>
          </>
        )}
        {(scope === 'personal' || scope === 'org' || scope === 'enablement') && (
          <>
            <Divider/>
            <FilterDropdown label="Compare" options={compares} value={compare} onChange={setCompare}/>
          </>
        )}
        <div style={{ marginLeft:'auto', fontSize:10.5, fontFamily:'var(--font-mono)',
          color:'var(--text-dim)', letterSpacing:'.06em', textTransform:'uppercase' }}>
          Updated 2 min ago
        </div>
      </div>

      {/* Body */}
      {scope === 'personal'   && <InsightsPersonal   filters={{ range, compare }} user={user}/>}
      {scope === 'enablement' && <InsightsEnablement filters={{ range, team }}/>}
      {scope === 'org'        && <InsightsOrg        filters={{ range, team, compare }}/>}
      {scope === 'ops'        && <InsightsOps        filters={{ range }}/>}
    </div>
    </div>
  );
};

const FilterGroup = ({ label, options, value, onChange }) => (
  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
    <span style={{
      fontFamily:'var(--font-mono)', fontSize:10.5, color:'var(--text-dim)',
      letterSpacing:'.08em', textTransform:'uppercase', fontWeight:700
    }}>{label}</span>
    <div style={{ display:'flex', gap:4 }}>
      {options.map(o => {
        const active = o.id === value;
        return (
          <button key={o.id} onClick={() => onChange(o.id)} style={{
            cursor:'pointer', font:'inherit', padding:'5px 10px', fontSize:11.5, fontWeight:600,
            background: active ? 'var(--accent)' : 'transparent',
            color:    active ? 'var(--accent-on)' : 'var(--text-sub)',
            border:'1px solid', borderColor: active ? 'var(--accent)' : 'var(--border)',
            borderRadius:6, transition:'all 100ms'
          }}>{o.label}</button>
        );
      })}
    </div>
  </div>
);

const FilterDropdown = ({ label, options, value, onChange }) => {
  const [open, setOpen] = useStateInsights(false);
  const current = options.find(o => o.id === value) || options[0];
  return (
    <div style={{ display:'flex', alignItems:'center', gap:8, position:'relative' }}>
      <span style={{
        fontFamily:'var(--font-mono)', fontSize:10.5, color:'var(--text-dim)',
        letterSpacing:'.08em', textTransform:'uppercase', fontWeight:700
      }}>{label}</span>
      <button onClick={() => setOpen(o => !o)} style={{
        cursor:'pointer', font:'inherit', padding:'5px 10px', fontSize:11.5, fontWeight:600,
        background:'transparent', color:'var(--text)',
        border:'1px solid var(--border)', borderRadius:6,
        display:'inline-flex', alignItems:'center', gap:6
      }}>
        {current.label}
        <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
          <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
      {open && (
        <div style={{
          position:'absolute', top:'100%', left:'auto', right:0, marginTop:6, zIndex:50,
          minWidth:180, padding:6, background:'var(--card)',
          border:'1px solid var(--border)', borderRadius:'var(--radius-md)',
          boxShadow:'var(--shadow-pop)'
        }}>
          {options.map(o => (
            <button key={o.id} onClick={() => { onChange(o.id); setOpen(false); }} style={{
              cursor:'pointer', font:'inherit', display:'block', width:'100%', textAlign:'left',
              padding:'7px 10px', fontSize:12.5, fontWeight:600, borderRadius:6, border:'none',
              background: o.id === value ? 'var(--accent-light)' : 'transparent',
              color:    o.id === value ? 'var(--accent)' : 'var(--text)'
            }}>{o.label}</button>
          ))}
        </div>
      )}
    </div>
  );
};

const Divider = () => (
  <div style={{ width:1, height:18, background:'var(--border)' }}/>
);

window.BrInsightsScreen = { InsightsScreen };
