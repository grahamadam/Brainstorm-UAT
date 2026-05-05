// Settings shell — left rail nav, scope switcher (Personal | Workspace),
// search, auto-save state, route to section content.
//
// Auto-save: every setS / setW call writes to localStorage and pulses a toast.

const { useState: useStateSet, useEffect: useEffectSet, useMemo: useMemoSet } = React;

const PERSONAL_DEFAULTS = {
  // Profile
  name:'Sam Chen', pronouns:'they/them', title:'Account Executive', tz:'America/Los_Angeles',
  // Slack
  slackDaily:true, slackStreak:true, slackTeam:'digest', slackCoach:true,
  slackQuietStart:'19:00', slackQuietEnd:'08:00',
  // Calendar
  calAuto:true, calFreq:'3', calWhen:'am', calSource:'google',
  // Email
  emailRecap:true, emailProduct:false,
  // Coach
  coachTone:'warm', coachVerbosity:3, coachContext:true, coachMemory:true, coachModel:'balanced',
  // Accessibility
  reduceMotion:false, highContrast:false, textScale:100, captions:'auto',
  keyboardHints:true, srMode:false,
  // Language & region
  lang:'en-US', region:'United States', dateFmt:'mdy', weekStart:'sun',
  // Privacy
  lbVis:'public', feedVis:true, profileVis:'org', exemplars:true,
  // Security
  twoFA:true,
};

const WORKSPACE_DEFAULTS = {
  // Org
  orgName:'Gong GTM Academy', orgSlug:'gong', orgDomains:'gong.io, gong.com',
  orgTz:'America/Los_Angeles', orgRegion:'us',
  // Roles
  defaultRole:'learner', mgrInvite:true, authorApproval:true,
  // SSO/SCIM
  ssoRequired:true, ssoAdminFallback:true, ssoSession:'24h',
  scimProvision:true, scimDeprovision:true,
  // AI
  aiKill:false, aiProvider:'multi', aiFloor:'Sonnet-class', aiCeiling:'Opus-class',
  aiNoTrain:true, aiRedact:'standard', aiLog:true, aiLogTtl:'90 days',
  aiTox:'medium', aiExfil:true, aiHallu:75,
  // Audit
  siem:false, siemDest:'Splunk HEC',
  // Compliance
  retActivity:'3 years', retCoach:'1 year', cmek:false,
  // Branding
  brandColor:'#FF2370', tagline:'Sell smarter. Every day.', poweredBy:true,
};

const PERSONAL_SECTIONS = [
  { id:'profile',     label:'Profile',           kicker:'Account' },
  { id:'notif',       label:'Notifications',     kicker:'Reach' },
  { id:'coach',       label:'AI Coach',          kicker:'Assistant' },
  { id:'access',      label:'Accessibility',     kicker:'Comfort' },
  { id:'lang',        label:'Language & region', kicker:'Locale' },
  { id:'privacy',     label:'Privacy',           kicker:'Visibility' },
  { id:'security',    label:'Sign-in & sessions',kicker:'Security' },
  { id:'data',        label:'Data',              kicker:'Export & delete', danger:true },
];

const WORKSPACE_SECTIONS = [
  { id:'org',         label:'Organization',      kicker:'Identity' },
  { id:'members',     label:'Members',           kicker:'People' },
  { id:'roles',       label:'Roles & permissions', kicker:'Access' },
  { id:'sso',         label:'SSO & provisioning',kicker:'Identity' },
  { id:'integrations',label:'Integrations',      kicker:'Connect' },
  { id:'ai',          label:'AI governance',     kicker:'Trust' },
  { id:'audit',       label:'Audit log',         kicker:'Activity' },
  { id:'compliance',  label:'Compliance',        kicker:'Trust' },
  { id:'branding',    label:'Branding',          kicker:'Workspace' },
  { id:'danger',      label:'Danger zone',       kicker:'Destructive', danger:true },
];

function useStored(key, defaults) {
  const [state, setState] = useStateSet(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
    } catch { return defaults; }
  });
  const set = (k, v) => {
    setState(prev => {
      const next = { ...prev, [k]: v };
      try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
      return next;
    });
    if (window.__bsToast) window.__bsToast('Saved');
  };
  return [state, set];
}

const SettingsScreen = ({ user }) => {
  const { SettingsToast } = window.BrSC;
  const P = window.BrSettingsPersonal;
  const W = window.BrSettingsWorkspace;

  const [scope, setScope] = useStateSet('personal');     // personal | workspace
  const [section, setSection] = useStateSet('profile');
  const [query, setQuery] = useStateSet('');

  const [personal, setS] = useStored('br_settings_personal', PERSONAL_DEFAULTS);
  const [workspace, setW] = useStored('br_settings_workspace', WORKSPACE_DEFAULTS);

  // When switching scope, default to first section in that scope
  useEffectSet(() => {
    if (scope === 'personal' && !PERSONAL_SECTIONS.find(s => s.id === section)) {
      setSection(PERSONAL_SECTIONS[0].id);
    }
    if (scope === 'workspace' && !WORKSPACE_SECTIONS.find(s => s.id === section)) {
      setSection(WORKSPACE_SECTIONS[0].id);
    }
  }, [scope]);

  const sections = scope === 'personal' ? PERSONAL_SECTIONS : WORKSPACE_SECTIONS;

  const filtered = useMemoSet(() => {
    if (!query.trim()) return sections;
    const q = query.toLowerCase();
    return sections.filter(s =>
      s.label.toLowerCase().includes(q) || s.kicker.toLowerCase().includes(q)
    );
  }, [query, sections]);

  const renderSection = () => {
    if (scope === 'personal') {
      switch (section) {
        case 'profile':  return <P.PersonalProfile       s={personal} setS={setS} user={user}/>;
        case 'notif':    return <P.PersonalNotifications s={personal} setS={setS}/>;
        case 'coach':    return <P.PersonalCoach         s={personal} setS={setS}/>;
        case 'access':   return <P.PersonalAccessibility s={personal} setS={setS}/>;
        case 'lang':     return <P.PersonalLanguage      s={personal} setS={setS}/>;
        case 'privacy':  return <P.PersonalPrivacy       s={personal} setS={setS}/>;
        case 'security': return <P.PersonalSecurity      s={personal} setS={setS}/>;
        case 'data':     return <P.PersonalData          s={personal} setS={setS}/>;
      }
    } else {
      switch (section) {
        case 'org':          return <W.WorkspaceOrg          w={workspace} setW={setW}/>;
        case 'members':      return <W.WorkspaceMembers      w={workspace} setW={setW}/>;
        case 'roles':        return <W.WorkspaceRoles        w={workspace} setW={setW}/>;
        case 'sso':          return <W.WorkspaceSSO          w={workspace} setW={setW}/>;
        case 'integrations': return <W.WorkspaceIntegrations w={workspace} setW={setW}/>;
        case 'ai':           return <W.WorkspaceAI           w={workspace} setW={setW}/>;
        case 'audit':        return <W.WorkspaceAudit        w={workspace} setW={setW}/>;
        case 'compliance':   return <W.WorkspaceCompliance   w={workspace} setW={setW}/>;
        case 'branding':     return <W.WorkspaceBranding     w={workspace} setW={setW}/>;
        case 'danger':       return <W.WorkspaceDanger       w={workspace} setW={setW}/>;
      }
    }
    return null;
  };

  const activeSection = sections.find(s => s.id === section);

  return (
    <div style={{ height:'100%', display:'flex', overflow:'hidden' }}>
      {/* Left rail */}
      <aside style={{
        width:248, flexShrink:0, borderRight:'1px solid var(--border)',
        background:'var(--card-soft, var(--card))', padding:'18px 14px',
        overflowY:'auto', display:'flex', flexDirection:'column'
      }}>
        <div style={{ padding:'0 6px 12px' }}>
          <div style={{
            fontFamily:'var(--font-mono)', fontSize:10.5, letterSpacing:'.10em',
            color:'var(--text-dim)', textTransform:'uppercase', fontWeight:700
          }}>Settings</div>
          <div style={{ fontSize:11.5, color:'var(--text-sub)', marginTop:3 }}>
            Auto-saves. Sync across your devices.
          </div>
        </div>

        {/* Scope switcher */}
        <div style={{
          display:'grid', gridTemplateColumns:'1fr 1fr', gap:0, padding:2,
          background:'var(--card-alt)', border:'1px solid var(--border)',
          borderRadius:8, marginBottom:14
        }}>
          {[{id:'personal',l:'Personal'},{id:'workspace',l:'Workspace'}].map(s => {
            const active = scope === s.id;
            return (
              <button key={s.id} type="button" onClick={() => setScope(s.id)}
                style={{
                  padding:'7px 10px', fontSize:12, fontWeight: active ? 700 : 600,
                  background: active ? 'var(--card)' : 'transparent',
                  color: active ? 'var(--text)' : 'var(--text-sub)',
                  border:'none', borderRadius:6, cursor:'pointer',
                  boxShadow: active ? '0 1px 3px rgba(0,0,0,0.3), inset 0 0 0 1px var(--border)' : 'none'
                }}>{s.l}</button>
            );
          })}
        </div>

        {/* Search */}
        <input value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Search settings…"
          style={{
            background:'var(--card-alt)', border:'1px solid var(--border)', borderRadius:8,
            padding:'7px 10px', fontSize:12.5, color:'var(--text)', outline:'none',
            marginBottom:10, fontFamily:'inherit'
          }}/>

        {/* Section nav */}
        <nav style={{ display:'flex', flexDirection:'column', gap:1 }}>
          {filtered.map(sec => {
            const active = sec.id === section;
            return (
              <button key={sec.id} type="button" onClick={() => setSection(sec.id)}
                style={{
                  textAlign:'left', padding:'8px 10px', borderRadius:7,
                  border:'none', cursor:'pointer',
                  background: active ? 'var(--card)' : 'transparent',
                  boxShadow: active ? 'inset 0 0 0 1px var(--border)' : 'none',
                  display:'flex', alignItems:'center', gap:10,
                  color: sec.danger ? 'var(--accent-2)' : 'var(--text)'
                }}>
                <span style={{
                  width:6, height:6, borderRadius:'50%', flexShrink:0,
                  background: active
                    ? (sec.danger ? 'var(--accent-2)' : 'var(--accent)')
                    : 'transparent'
                }}/>
                <span style={{ fontSize:13, fontWeight: active ? 700 : 500 }}>{sec.label}</span>
              </button>
            );
          })}
          {filtered.length === 0 && (
            <div style={{ fontSize:12, color:'var(--text-dim)', padding:'10px 10px' }}>No matches</div>
          )}
        </nav>

        <div style={{ flex:1 }}/>
        <div style={{
          padding:'12px 10px 4px', fontSize:11, color:'var(--text-dim)',
          borderTop:'1px solid var(--border-soft)', marginTop:14, lineHeight:1.5
        }}>
          {scope === 'workspace' ? <>You're editing org-wide settings as <strong style={{ color:'var(--text-sub)' }}>Admin</strong>. Changes affect 142 teammates.</>
            : <>Your personal preferences. Sync across web, Slack, mobile.</>}
        </div>
      </aside>

      {/* Main pane */}
      <div style={{ flex:1, overflow:'auto', position:'relative' }}>
        <div style={{ maxWidth:820, margin:'0 auto', padding:'32px 40px 100px' }}>
          {/* Page header */}
          <div style={{ marginBottom:22 }}>
            <div style={{
              fontFamily:'var(--font-mono)', fontSize:10.5, letterSpacing:'.10em',
              color:'var(--text-dim)', textTransform:'uppercase', fontWeight:700, marginBottom:6
            }}>
              {scope === 'personal' ? 'Personal' : 'Workspace'} · {activeSection?.kicker}
            </div>
            <h1 style={{
              fontFamily:'var(--font-display)', fontSize:30, fontWeight:800,
              letterSpacing:'-0.025em', margin:0, color:'var(--text)',
              color: activeSection?.danger ? 'var(--accent-2)' : 'var(--text)'
            }}>{activeSection?.label}</h1>
          </div>

          {renderSection()}
        </div>

        <SettingsToast/>
      </div>
    </div>
  );
};

window.BrSettings = { SettingsScreen };
