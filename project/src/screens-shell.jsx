// Sidebar + Topbar shell.
const { useState: useStateShell } = React;

const Sidebar = ({ screen, setScreen, user, level, journeyPercent, gamification }) => {
  const { IconHome, IconDash, IconBook, IconMap, IconTrophy, IconChart, IconFile, IconSettings } = window.BrIcons;
  const { Avatar, BrainstormMark, ProgressBar } = window.BrPrim;
  const { LEVELS } = window.BrData;

  const navMain = [
    { id:'home',         label:'Home',         Icon:IconHome },
    { id:'dashboard',    label:'Dashboard',    Icon:IconDash },
    { id:'course',       label:'My Learning',  Icon:IconBook, badge:'•' },
    { id:'paths',        label:'Paths',        Icon:IconMap },
    { id:'achievements', label:'Achievements', Icon:IconTrophy },
    { id:'leaderboard',  label:'Leaderboard',  Icon:IconChart },
  ];
  const navAdmin = [
    { id:'content',  label:'Content Studio',  Icon:IconFile },
    { id:'insights', label:'Insights', Icon:IconChart },
    { id:'settings', label:'Settings', Icon:IconSettings },
  ];

  const isActive = (id) => screen === id || (screen === 'check' && id === 'lesson');

  const NavBtn = ({ id, label, Icon, badge }) => {
    const active = isActive(id);
    return (
      <button onClick={() => setScreen(id)}
        style={{
          display:'flex', alignItems:'center', gap:10, width:'100%', padding:'9px 11px',
          borderRadius:8, border:'none', cursor:'pointer',
          background: active ? 'var(--accent-light)' : 'transparent',
          color: active ? 'var(--accent)' : 'var(--text-sub)',
          fontSize:13, fontWeight: active ? 700 : 500, textAlign:'left', marginBottom:2,
          fontFamily:'inherit', position:'relative'
        }}>
        <Icon size={15} stroke="currentColor" />
        <span style={{ flex:1 }}>{label}</span>
        {badge && (
          <span style={{
            width:7, height:7, borderRadius:'50%', background:'var(--accent-2)',
            boxShadow:'0 0 8px var(--accent-2)'
          }}/>
        )}
      </button>
    );
  };

  const currentLevel = LEVELS.find(l => l.num === level);
  const nextLevel = LEVELS.find(l => l.num === level + 1);
  const showGame = gamification !== 'subtle';

  return (
    <div style={{
      width: 232, background:'var(--surface)', borderRight:'1px solid var(--border)',
      display:'flex', flexDirection:'column', height:'100vh', flexShrink:0
    }}>
      <div style={{ padding:'22px 16px 14px' }}>
        <div style={{ marginBottom:18 }}><BrainstormMark size="sm" /></div>

        <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:14 }}>
          <Avatar initials={(user?.name || 'U').split(' ').map(s=>s[0]).join('').slice(0,2).toUpperCase()} ac={'var(--accent)'} size={34} />
          <div style={{ minWidth:0, flex:1 }}>
            <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', lineHeight:1.2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
              {user?.name || 'You'}
            </div>
            <div style={{ fontSize:11, color:'var(--text-sub)', marginTop:2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
              {user?.role || 'AE'}{user?.team ? ` · ${user.team}` : ' · Enterprise'}
            </div>
          </div>
        </div>

        {showGame && currentLevel && (
          <div style={{
            background:'var(--accent-light)', border:'1px solid var(--accent-border)',
            borderRadius:10, padding:'10px 12px'
          }}>
            <div style={{ display:'flex', alignItems:'baseline', gap:6, marginBottom:8, whiteSpace:'nowrap' }}>
              <span style={{ fontSize:10, fontWeight:800, color:'var(--accent)', letterSpacing:'0.08em', textTransform:'uppercase' }}>
                L{currentLevel.num}
              </span>
              <span style={{ fontSize:11, fontWeight:700, color:'var(--text)' }}>
                {currentLevel.name.replace(/^The /, '')}
              </span>
            </div>
            {nextLevel && (
              <>
                <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:6, gap:8, whiteSpace:'nowrap' }}>
                  <span style={{ fontSize:10, color:'var(--text-sub)', letterSpacing:'0.04em', textTransform:'uppercase', fontWeight:700 }}>
                    Next
                  </span>
                  <span style={{ fontSize:10, fontWeight:800, color:'var(--accent)', fontFamily:'var(--font-mono)' }}>{journeyPercent}%</span>
                </div>
                <ProgressBar value={journeyPercent} />
                <div style={{ fontSize:11, color:'var(--text-sub)', marginTop:6, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                  You are {journeyPercent}% to {nextLevel.name.replace(/^The /, '')}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div style={{ flex:1, padding:'4px 8px', display:'flex', flexDirection:'column', overflow:'auto' }}>
        <div>{navMain.map(n => <NavBtn key={n.id} {...n} />)}</div>
        <div style={{ marginTop:'auto', paddingTop:14, borderTop:'1px solid var(--border)' }}>
          <div style={{
            fontSize:10, fontWeight:700, color:'var(--text-dim)',
            letterSpacing:'0.1em', textTransform:'uppercase', padding:'4px 11px 7px'
          }}>Admin</div>
          {navAdmin.map(n => <NavBtn key={n.id} {...n} />)}
        </div>
      </div>

      <div style={{ padding:'12px 16px', borderTop:'1px solid var(--border)' }}>
        <div style={{ fontSize:10, color:'var(--text-dim)', letterSpacing:'0.05em' }}>v2 · Internal Pilot</div>
      </div>
    </div>
  );
};

const Topbar = ({ user, level, streak, gamification, goto, theme, setTheme }) => {
  const { IconBell, IconSearch, IconFlame, IconBolt } = window.BrIcons;
  const { Pill } = window.BrPrim;
  const showGame = gamification !== 'subtle';
  const isLight = theme === 'light';
  const showGame = gamification !== 'subtle';
  return (
    <div style={{
      height:56, borderBottom:'1px solid var(--border)', background:'var(--surface)',
      display:'flex', alignItems:'center', padding:'0 24px', gap:14, flexShrink:0
    }}>
      <div style={{
        flex:1, maxWidth:420, display:'flex', alignItems:'center', gap:8,
        background:'var(--card)', border:'1px solid var(--border)', borderRadius:9,
        padding:'7px 12px'
      }}>
        <IconSearch size={14} stroke="var(--text-dim)" />
        <input placeholder="Search modules, prompts, teammates…"
          style={{ background:'transparent', border:'none', outline:'none', flex:1, fontSize:13, color:'var(--text)' }} />
        <span style={{
          fontFamily:'var(--font-mono)', fontSize:10, color:'var(--text-dim)',
          background:'var(--card-alt)', borderRadius:4, padding:'2px 6px'
        }}>⌘K</span>
      </div>
      <div style={{ flex:1 }} />
      {showGame && (
        <>
          <button onClick={() => goto && goto('achievements')} style={{ background:'transparent', border:'none', padding:0, cursor:'pointer' }}>
            <Pill icon={<IconFlame size={11} />} color="#FFB347" bg="rgba(255,179,71,0.12)" border="rgba(255,179,71,0.35)" style={{ whiteSpace:'nowrap' }}>
              {`${streak}-day streak`}
            </Pill>
          </button>
          <button onClick={() => goto && goto('dashboard')} style={{ background:'transparent', border:'none', padding:0, cursor:'pointer' }}>
            <Pill icon={<IconBolt size={11} />} style={{ whiteSpace:'nowrap' }}>2,310 XP</Pill>
          </button>
        </>
      )}
      {setTheme && (
        <button
          onClick={() => setTheme(isLight ? 'dark' : 'light')}
          title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
          aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
          role="switch"
          aria-checked={isLight}
          style={{
            position:'relative',
            width:56, height:28, borderRadius:999,
            border:'1px solid var(--border)',
            background:'var(--card)',
            cursor:'pointer', padding:0, flexShrink:0,
            display:'flex', alignItems:'center',
            transition:'background .18s, border-color .18s'
          }}
        >
          <span style={{
            position:'absolute', left:9, top:'50%', transform:'translateY(-50%)',
            fontFamily:'var(--font-mono)', fontSize:10, fontWeight:700, letterSpacing:'.04em',
            color: isLight ? 'var(--text)' : 'var(--text-dim)',
            transition:'color .18s', pointerEvents:'none'
          }}>L</span>
          <span style={{
            position:'absolute', right:9, top:'50%', transform:'translateY(-50%)',
            fontFamily:'var(--font-mono)', fontSize:10, fontWeight:700, letterSpacing:'.04em',
            color: isLight ? 'var(--text-dim)' : 'var(--text)',
            transition:'color .18s', pointerEvents:'none'
          }}>D</span>
          <span style={{
            position:'absolute', top:2,
            left: isLight ? 2 : 'calc(100% - 24px)',
            width:22, height:22, borderRadius:'50%',
            background:'var(--accent)',
            boxShadow:'0 1px 3px rgba(0,0,0,0.35)',
            transition:'left .22s cubic-bezier(.5,.05,.2,1), background .18s',
            pointerEvents:'none'
          }} />
        </button>
      )}
      <button style={{
        width:34, height:34, borderRadius:8, border:'1px solid var(--border)',
        background:'var(--card)', color:'var(--text-sub)', cursor:'pointer',
        display:'flex', alignItems:'center', justifyContent:'center', position:'relative'
      }}>
        <IconBell size={14} stroke="currentColor" />
        <span style={{
          position:'absolute', top:6, right:7, width:7, height:7, borderRadius:'50%',
          background:'var(--accent-2)', border:'2px solid var(--card)'
        }}/>
      </button>
    </div>
  );
};

window.BrShell = { Sidebar, Topbar };
