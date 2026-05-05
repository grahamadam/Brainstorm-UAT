// Other screens — Dashboard, Paths, Achievements, Leaderboard, Insights, Content, Settings
const { useState: useStateOther } = React;

// ===================== DASHBOARD =====================
const DashboardScreen = ({ user, gamification, density, goto, startCheck, startLesson }) => {
  const { Card, Pill, Kicker, Btn, ProgressBar, StatTile, SectionHeader, Avatar } = window.BrPrim;
  const { IconBolt, IconFlame, IconTrend, IconCheckCirc, IconSpark, IconArrowR, IconClock, IconTarget } = window.BrIcons;
  const { MODULES_AI101, LEADERBOARD_INDIV } = window.BrData;

  const showGame = gamification !== 'subtle';
  const completed = MODULES_AI101.filter(m => m.state === 'done');

  return (
    <div style={{ height:'100%', overflow:'auto' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'32px 40px 80px' }}>
        <SectionHeader kicker="Your dashboard" title="Where you stand"
          sub="At-a-glance progress, momentum, and what's next." />

        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:14, marginBottom:24 }}>
          <StatTile label="Current level" value="L1 · Risk" sub="0% to Novice" accent="var(--accent)" />
          <StatTile label="XP this week" value="+0" sub="first week — let's go" accent="var(--green)" />
          <StatTile label="Streak" value="—" sub="start one today" />
          <StatTile label="Modules done" value={`${completed.length}/7`} sub={`AI 101 · ${Math.round(completed.length/7*100)}%`} />
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:16 }}>
          <Card padding={22}>
            <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:14 }}>
              <Kicker>Weekly XP</Kicker>
              <span style={{ fontSize:12, color:'var(--text-sub)' }}>last 8 weeks</span>
            </div>
            {/* Bar chart */}
            <div style={{ display:'flex', alignItems:'flex-end', gap:10, height:140, paddingTop:10 }}>
              {[180, 240, 320, 280, 410, 360, 280, 420].map((v, i, a) => {
                const h = (v / Math.max(...a)) * 120;
                const isLast = i === a.length - 1;
                return (
                  <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                    <div style={{ fontSize:10, fontFamily:'var(--font-mono)', color: isLast ? 'var(--accent)' : 'var(--text-dim)' }}>{v}</div>
                    <div style={{
                      width:'100%', height:h, borderRadius:6,
                      background: isLast
                        ? 'linear-gradient(180deg, var(--accent), var(--accent-mid))'
                        : 'var(--accent-light)',
                      border: isLast ? 'none' : '1px solid var(--accent-border)'
                    }}/>
                    <div style={{ fontSize:10, color:'var(--text-dim)' }}>w{i+1}</div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card padding={22}>
            <Kicker>Mastery by pillar</Kicker>
            <div style={{ marginTop:14, display:'flex', flexDirection:'column', gap:14 }}>
              {[
                { pillar:'Foundation', pct:0,  items:'0/3 modules' },
                { pillar:'Craft',      pct:0,  items:'0/3 modules' },
                { pillar:'Judgment',   pct:0,  items:'0/1 module' },
                { pillar:'Voice',      pct:0,  items:'practice' },
                { pillar:'Systems',    pct:0,  items:'locked at L3' },
              ].map(r => (
                <div key={r.pillar}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5, fontSize:12 }}>
                    <span style={{ color:'var(--text)', fontWeight:600 }}>{r.pillar}</span>
                    <span style={{ color:'var(--text-sub)', fontFamily:'var(--font-mono)' }}>{r.pct}% · {r.items}</span>
                  </div>
                  <ProgressBar value={r.pct} height={5} />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <SectionHeader kicker="What's next" title="Up next for you" />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:14 }}>
          {MODULES_AI101.filter(m => m.state === 'active' || m.state === 'next').slice(0,3).map(m => (
            <Card key={m.id} padding={20} hoverable>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
                <Pill>{m.num}</Pill>
                <span style={{ fontSize:11, color:'var(--text-dim)', display:'flex', alignItems:'center', gap:4 }}>
                  <IconClock size={11} stroke="currentColor" /> {m.minutes}m
                </span>
              </div>
              <h3 style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:700, margin:'4px 0 6px', letterSpacing:'-0.02em' }}>{m.title}</h3>
              <p style={{ fontSize:12, color:'var(--text-sub)', margin:'0 0 12px', lineHeight:1.5 }}>{m.subtitle}</p>
              <div style={{ display:'flex', gap:6 }}>
                <Btn onClick={() => startLesson ? startLesson(m.id) : goto && goto('lesson')} variant={m.state === 'active' ? 'primary' : 'secondary'} size="sm" icon={<IconArrowR size={11}/>}>
                  {m.state === 'active' ? 'Continue' : 'Start'}
                </Btn>
                <Btn onClick={() => startCheck && startCheck(m.id)} variant="ghost" size="sm" icon={<IconBolt size={11}/>}>
                  Check
                </Btn>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// ===================== PATHS =====================
const PathsScreen = ({ goto }) => {
  const { Card, Pill, Kicker, Btn, ProgressBar, SectionHeader } = window.BrPrim;
  const { IconLock, IconArrowR, IconCheckCirc, IconClock, IconCal, IconBolt, IconStar, IconCompass, IconTrophy } = window.BrIcons;
  const { PATHS } = window.BrData;

  // Main Quest = the 101 → 201 → 301 spine. Side Quests = everything else.
  const MAIN_QUEST_IDS = ['AI101', 'AI201', 'AI301'];
  const mainQuests = MAIN_QUEST_IDS.map(id => PATHS.find(p => p.id === id)).filter(Boolean);
  const sideQuests = PATHS.filter(p => !MAIN_QUEST_IDS.includes(p.id));

  // Compact node for the main-quest spine
  const MainQuestNode = ({ p, idx, last }) => {
    const locked = p.status === 'locked';
    const active = p.status === 'active';
    const done   = p.progress === 100;
    const accent = idx === 0 ? 'var(--accent)' : idx === 1 ? 'var(--accent-2)' : 'var(--green)';

    return (
      <div style={{ flex:1, display:'flex', alignItems:'stretch', minWidth:0, position:'relative' }}>
        <div style={{
          flex:1, position:'relative', borderRadius:'var(--radius-lg)',
          background: active
            ? `linear-gradient(180deg, color-mix(in oklab, ${accent} 14%, var(--card)), var(--card))`
            : 'var(--card)',
          border: active ? `1px solid ${accent}` : '1px solid var(--border)',
          opacity: locked ? 0.62 : 1,
          padding:'22px 22px 20px',
          boxShadow: active
            ? `0 18px 40px -22px color-mix(in oklab, ${accent} 60%, transparent)`
            : 'none',
          display:'flex', flexDirection:'column', minHeight:280
        }}>
          {/* Stage badge */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
            <div style={{
              display:'inline-flex', alignItems:'center', gap:8,
              fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.10em',
              color:'var(--text-dim)', textTransform:'uppercase'
            }}>
              <span style={{
                width:22, height:22, borderRadius:'50%',
                background: active ? accent : 'var(--card-alt)',
                border: active ? 'none' : '1px solid var(--border)',
                color: active ? '#fff' : 'var(--text-sub)',
                display:'inline-flex', alignItems:'center', justifyContent:'center',
                fontSize:11, fontWeight:800
              }}>{idx + 1}</span>
              Stage {idx + 1}
            </div>
            {active && <Pill icon={<IconBolt size={10}/>}>Active</Pill>}
            {done && <Pill bg="rgba(76,254,200,0.10)" border="rgba(76,254,200,0.30)" color="var(--green)" icon={<IconCheckCirc size={10}/>}>Cleared</Pill>}
            {locked && <IconLock size={14} stroke="var(--text-dim)" />}
          </div>

          <div style={{
            fontFamily:'var(--font-mono)', fontSize:11, color:accent, fontWeight:700,
            letterSpacing:'.05em', marginBottom:6
          }}>{p.code}</div>
          <h3 style={{
            fontFamily:'var(--font-display)', fontSize:22, fontWeight:700,
            margin:'0 0 8px', letterSpacing:'-0.025em', color:'var(--text)', lineHeight:1.15
          }}>{p.title}</h3>
          <p style={{ fontSize:13, color:'var(--text-sub)', margin:'0 0 14px', lineHeight:1.5 }}>{p.subtitle}</p>

          <div style={{ display:'flex', alignItems:'center', gap:10, fontSize:11, color:'var(--text-sub)', marginBottom:14 }}>
            <span>{p.modules} modules</span>
            <span>·</span>
            <span style={{ display:'inline-flex', alignItems:'center', gap:4 }}><IconClock size={11}/> {p.hours}</span>
            <span style={{ flex:1 }}/>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--text-dim)' }}>{p.level}</span>
          </div>

          {active && (
            <div style={{ marginBottom:14 }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, marginBottom:5, color:'var(--text-dim)' }}>
                <span>{p.progress}% complete</span>
                <span style={{ fontFamily:'var(--font-mono)' }}>{Math.round((p.progress/100) * p.modules)}/{p.modules}</span>
              </div>
              <ProgressBar value={p.progress} height={6} />
            </div>
          )}

          <div style={{ marginTop:'auto' }}>
            {locked ? (
              <Btn variant="secondary" size="sm" disabled icon={<IconLock size={11}/>}>Clear Stage {idx} first</Btn>
            ) : (
              <Btn onClick={() => goto && goto(p.id === 'AI101' ? 'course' : 'lesson')}
                variant={active ? 'primary' : 'secondary'} size="sm" icon={<IconArrowR size={11}/>}>
                {active ? 'Continue quest' : p.progress > 0 ? 'Continue' : 'Begin quest'}
              </Btn>
            )}
          </div>
        </div>

        {/* Connector arrow to next stage */}
        {!last && (
          <div aria-hidden="true" style={{
            width:32, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0
          }}>
            <div style={{
              width:'100%', height:2,
              background: 'linear-gradient(90deg, var(--border) 0%, var(--border) 100%)',
              position:'relative'
            }}>
              <div style={{
                position:'absolute', right:-1, top:-4,
                width:0, height:0,
                borderLeft:'7px solid var(--border)',
                borderTop:'5px solid transparent',
                borderBottom:'5px solid transparent'
              }}/>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Smaller card for side quests
  const SideQuestCard = ({ p }) => {
    const event = p.status === 'event';
    const locked = p.status === 'locked';
    return (
      <Card padding={0} hoverable={!locked} style={{
        opacity: locked ? 0.6 : 1, overflow:'hidden', display:'flex', flexDirection:'column', height:'100%'
      }}>
        <div style={{
          padding:'14px 18px',
          background: event
            ? 'linear-gradient(135deg, color-mix(in oklab, var(--accent-2) 16%, var(--card)), var(--card))'
            : 'var(--card)',
          borderBottom:'1px solid var(--border)',
          display:'flex', alignItems:'center', gap:10
        }}>
          <div style={{
            width:30, height:30, borderRadius:8, flexShrink:0,
            background:'var(--card-alt)', border:'1px solid var(--border)',
            display:'flex', alignItems:'center', justifyContent:'center',
            color: event ? 'var(--accent-2)' : 'var(--accent)'
          }}>
            {event ? <IconCal size={14}/> : <IconCompass size={14}/>}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{
              fontFamily:'var(--font-mono)', fontSize:9.5, letterSpacing:'.10em',
              color:'var(--text-dim)', textTransform:'uppercase'
            }}>Side quest · {p.code}</div>
            <div style={{ fontSize:14, fontWeight:700, color:'var(--text)', marginTop:1 }}>{p.title}</div>
          </div>
          {event && <Pill color="var(--accent-2)" bg="var(--accent-2-light)" border="var(--accent-2-border)" style={{ fontSize:10 }}>{p.starts}</Pill>}
        </div>
        <div style={{ padding:'14px 18px', flex:1, display:'flex', flexDirection:'column' }}>
          <p style={{ fontSize:12, color:'var(--text-sub)', margin:'0 0 12px', lineHeight:1.5 }}>{p.subtitle}</p>
          <div style={{ display:'flex', alignItems:'center', gap:10, fontSize:11, color:'var(--text-sub)', marginBottom:10 }}>
            <span>{p.modules ? `${p.modules} modules` : 'Workshop'}</span>
            <span>·</span>
            <span style={{ display:'inline-flex', alignItems:'center', gap:4 }}><IconClock size={11}/> {p.hours}</span>
          </div>
          <div style={{ marginTop:'auto', display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
            <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
              {p.pillars.slice(0,2).map(pl => (
                <span key={pl} style={{
                  fontSize:10, padding:'2px 7px', borderRadius:999,
                  background:'var(--card-alt)', color:'var(--text-sub)', border:'1px solid var(--border)'
                }}>{pl}</span>
              ))}
            </div>
            {locked ? (
              <Btn variant="ghost" size="sm" disabled icon={<IconLock size={10}/>}>L3</Btn>
            ) : event ? (
              <Btn variant="soft" size="sm">Reserve</Btn>
            ) : (
              <Btn onClick={() => goto && goto('lesson')} variant="ghost" size="sm" icon={<IconArrowR size={10}/>}>Open</Btn>
            )}
          </div>
        </div>
      </Card>
    );
  };

  // Main quest summary stats
  const totalModules = mainQuests.reduce((n,p) => n + p.modules, 0);
  const cleared = mainQuests.filter(p => p.progress === 100).length;
  const activeQuest = mainQuests.find(p => p.status === 'active');

  return (
    <div style={{ height:'100%', overflow:'auto' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'32px 40px 80px' }}>
        {/* ── MAIN QUEST ─────────────────────────────────────────────── */}
        <div style={{ marginBottom:36 }}>
          <div style={{ display:'flex', alignItems:'flex-end', gap:16, marginBottom:18 }}>
            <div style={{ flex:1 }}>
              <div style={{
                display:'inline-flex', alignItems:'center', gap:8,
                fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.12em',
                color:'var(--accent)', textTransform:'uppercase', fontWeight:700, marginBottom:8
              }}>
                <IconStar size={12} stroke="var(--accent)"/> Main quest
              </div>
              <h1 style={{
                fontFamily:'var(--font-display)', fontSize:'clamp(1.8rem, 3.4vw, 2.6rem)',
                fontWeight:700, letterSpacing:'-0.03em', margin:'0 0 6px', lineHeight:1.05, color:'var(--text)'
              }}>
                The road from AI-curious to AI-fluent.
              </h1>
              <p style={{ fontSize:14, color:'var(--text-sub)', margin:0, lineHeight:1.55, maxWidth:640 }}>
                Three stages, taken in order. Each one unlocks the next. This is the spine of your AI journey at Gong.
              </p>
            </div>

            {/* Spine progress chip */}
            <div style={{
              padding:'12px 16px', background:'var(--card)', border:'1px solid var(--border)',
              borderRadius:'var(--radius)', display:'flex', alignItems:'center', gap:14, flexShrink:0
            }}>
              <div>
                <div style={{ fontSize:10, fontFamily:'var(--font-mono)', color:'var(--text-dim)', letterSpacing:'.08em', textTransform:'uppercase' }}>Progress</div>
                <div style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:700, color:'var(--text)', lineHeight:1.1 }}>
                  {cleared} <span style={{ color:'var(--text-dim)', fontWeight:600 }}>/ {mainQuests.length}</span> stages
                </div>
              </div>
              <div style={{ width:1, height:30, background:'var(--border)' }}/>
              <div>
                <div style={{ fontSize:10, fontFamily:'var(--font-mono)', color:'var(--text-dim)', letterSpacing:'.08em', textTransform:'uppercase' }}>Currently</div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:13, fontWeight:700, color:'var(--accent)', lineHeight:1.1, marginTop:2 }}>
                  {activeQuest?.code || '—'}
                </div>
              </div>
            </div>
          </div>

          {/* Spine */}
          <div style={{ display:'flex', alignItems:'stretch' }}>
            {mainQuests.map((p, i) => (
              <MainQuestNode key={p.id} p={p} idx={i} last={i === mainQuests.length - 1} />
            ))}
          </div>

          {/* End-of-spine reward */}
          <div style={{
            marginTop:14, padding:'12px 18px',
            background:'var(--card-alt)', border:'1px dashed var(--border)',
            borderRadius:'var(--radius)', display:'flex', alignItems:'center', gap:12
          }}>
            <div style={{
              width:32, height:32, borderRadius:8,
              background:'linear-gradient(135deg, var(--yellow), var(--accent-2))',
              display:'flex', alignItems:'center', justifyContent:'center'
            }}><IconTrophy size={16} stroke="#0A0612"/></div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>
                Clear all three stages → <span style={{ color:'var(--accent)' }}>AI Practitioner</span> badge + Level 4
              </div>
              <div style={{ fontSize:11, color:'var(--text-sub)', marginTop:1 }}>
                Unlocks every side quest below and the Q1 Hackathon team-captain seat.
              </div>
            </div>
          </div>
        </div>

        {/* ── SIDE QUESTS ─────────────────────────────────────────────── */}
        <div>
          <div style={{ display:'flex', alignItems:'flex-end', gap:16, marginBottom:18 }}>
            <div style={{ flex:1 }}>
              <div style={{
                display:'inline-flex', alignItems:'center', gap:8,
                fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.12em',
                color:'var(--text-sub)', textTransform:'uppercase', fontWeight:700, marginBottom:8
              }}>
                <IconCompass size={12}/> Side quests
              </div>
              <h2 style={{
                fontFamily:'var(--font-display)', fontSize:'clamp(1.4rem, 2.6vw, 2rem)',
                fontWeight:700, letterSpacing:'-0.025em', margin:'0 0 6px', lineHeight:1.1, color:'var(--text)'
              }}>
                Take a detour. Earn extra XP.
              </h2>
              <p style={{ fontSize:13, color:'var(--text-sub)', margin:0, lineHeight:1.5, maxWidth:640 }}>
                Tool-specific deep dives, live events, and community challenges. Optional — but they make the main quest easier.
              </p>
            </div>
            <span style={{
              fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-dim)', letterSpacing:'.06em'
            }}>{sideQuests.length} available</span>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:14 }}>
            {sideQuests.map(p => <SideQuestCard key={p.id} p={p} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

// ===================== ACHIEVEMENTS =====================
const AchievementsScreen = () => {
  const { Card, Pill, Kicker, SectionHeader, ProgressBar } = window.BrPrim;
  const { IconLock, IconAward } = window.BrIcons;
  const { ACHIEVEMENTS, LEVELS } = window.BrData;

  const earned = ACHIEVEMENTS.filter(a => a.earned);
  return (
    <div style={{ height:'100%', overflow:'auto' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'32px 40px 80px' }}>
        <SectionHeader kicker="Achievements"
          title={`${earned.length} of ${ACHIEVEMENTS.length} earned`}
          sub="Each one represents a real skill — not just clicks." />

        {/* Level path */}
        <Card padding={28} style={{ marginBottom:24 }}>
          <Kicker>Your level journey</Kicker>
          <div style={{ display:'grid', gridTemplateColumns:`repeat(${LEVELS.length}, 1fr)`, marginTop:18, position:'relative' }}>
            {/* Connector track positioned to align with circle centers */}
            <div style={{
              position:'absolute', top:26, left:`calc(${100/(LEVELS.length*2)}%)`, right:`calc(${100/(LEVELS.length*2)}%)`,
              height:2, background:'var(--border)', zIndex:0
            }}/>
            <div style={{
              position:'absolute', top:26, left:`calc(${100/(LEVELS.length*2)}%)`,
              width:`calc(${100/(LEVELS.length)} * 1%)`,
              height:2, background:'var(--accent)', zIndex:0
            }}/>
            {LEVELS.map((l) => {
              const reached = l.num <= 2;
              const current = l.num === 2;
              const shortName = l.name.replace(/^The /, '');
              return (
                <div key={l.num} style={{ textAlign:'center', position:'relative', zIndex:2, padding:'0 6px' }}>
                  <div style={{
                    width:54, height:54, borderRadius:'50%',
                    background: reached ? 'linear-gradient(135deg, var(--accent), var(--accent-mid))' : 'var(--card)',
                    border: current ? '3px solid var(--accent)' : `1px solid ${reached ? 'var(--accent)' : 'var(--border)'}`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color: reached ? '#fff' : 'var(--text-dim)',
                    fontFamily:'var(--font-display)', fontWeight:800, fontSize:20, margin:'0 auto',
                    position:'relative', zIndex:2,
                    boxShadow: current ? '0 0 0 4px var(--card)' : `0 0 0 4px var(--card)`
                  }}>{l.num}</div>
                  <div style={{ marginTop:10, fontSize:12, fontWeight:700, color: reached ? 'var(--text)' : 'var(--text-dim)' }}>{shortName}</div>
                  <div style={{ fontSize:10, color:'var(--text-dim)', marginTop:2 }}>L{l.num}</div>
                </div>
              );
            })}
          </div>
        </Card>

        <SectionHeader title="Badges" />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:14 }}>
          {ACHIEVEMENTS.map(a => (
            <Card key={a.id} padding={18} style={{
              opacity: a.locked ? 0.45 : 1,
              filter: !a.earned && !a.locked ? 'none' : a.locked ? 'grayscale(0.6)' : 'none',
              textAlign:'center'
            }}>
              <div style={{
                fontSize:36, marginBottom:10,
                filter: a.earned ? 'none' : 'grayscale(1) opacity(0.55)'
              }}>{a.icon}</div>
              <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', marginBottom:4 }}>{a.label}</div>
              <div style={{ fontSize:11, color:'var(--text-sub)', lineHeight:1.5, marginBottom:8, minHeight:32 }}>{a.desc}</div>
              {a.earned ? (
                <div style={{ fontSize:10, color:'var(--accent)', fontFamily:'var(--font-mono)' }}>EARNED · {a.date}</div>
              ) : a.locked ? (
                <div style={{ fontSize:10, color:'var(--text-dim)', display:'inline-flex', alignItems:'center', gap:4 }}>
                  <IconLock size={10} stroke="currentColor" /> locked
                </div>
              ) : (
                <div style={{ fontSize:10, color:'var(--text-dim)', fontFamily:'var(--font-mono)' }}>{a.progress}</div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// ===================== LEADERBOARD =====================
const LeaderboardScreen = () => {
  const { Card, Pill, Kicker, Btn, SectionHeader, Avatar } = window.BrPrim;
  const { IconTrend, IconUsers, IconBolt } = window.BrIcons;
  const { LEADERBOARD_INDIV, LEADERBOARD_TEAMS } = window.BrData;
  const [tab, setTab] = useStateOther('individual');

  const rows = tab === 'individual' ? LEADERBOARD_INDIV : LEADERBOARD_TEAMS;

  return (
    <div style={{ height:'100%', overflow:'auto' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'32px 40px 80px' }}>
        <SectionHeader kicker="Leaderboard · GTM" title="This week"
          action={
            <div style={{ display:'flex', gap:6, background:'var(--card)', border:'1px solid var(--border)', borderRadius:9, padding:3 }}>
              {['individual','teams'].map(t => (
                <button key={t} onClick={() => setTab(t)} style={{
                  padding:'6px 14px', borderRadius:7, border:'none',
                  background: tab === t ? 'var(--accent)' : 'transparent',
                  color: tab === t ? '#fff' : 'var(--text-sub)',
                  fontSize:12, fontWeight:700, cursor:'pointer', textTransform:'capitalize'
                }}>{t}</button>
              ))}
            </div>
          } />

        {/* Podium */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:14, marginBottom:24 }}>
          {rows.slice(0,3).map((r, i) => {
            const order = [2, 1, 3][i]; // visual order: 2nd, 1st, 3rd
            const actual = rows[order - 1];
            const heights = { 1: 180, 2: 150, 3: 130 };
            const colors = { 1: '#FFE03F', 2: '#B5A8D8', 3: '#FF7A45' };
            return (
              <div key={actual.rank} style={{ textAlign:'center', display:'flex', flexDirection:'column', justifyContent:'flex-end' }}>
                <Avatar initials={actual.initials || actual.name.split(' ').map(s=>s[0]).join('').slice(0,2)}
                  ac={actual.ac} size={56} />
                <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', marginTop:8 }}>{actual.name}</div>
                <div style={{ fontSize:11, color:'var(--text-sub)', marginBottom:10 }}>{actual.team || `${actual.members} members`}</div>
                <div style={{
                  height: heights[actual.rank], borderRadius:'12px 12px 0 0',
                  background: `linear-gradient(180deg, ${colors[actual.rank]}33, ${colors[actual.rank]}10)`,
                  border:`1px solid ${colors[actual.rank]}66`, borderBottom:'none',
                  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-start',
                  padding:'14px 12px'
                }}>
                  <div style={{
                    fontFamily:'var(--font-display)', fontWeight:800, fontSize:36,
                    color:colors[actual.rank], lineHeight:1, letterSpacing:'-0.04em'
                  }}>#{actual.rank}</div>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'var(--text)', fontWeight:700, marginTop:4 }}>
                    {actual.xp.toLocaleString()}
                  </div>
                  <div style={{ fontSize:10, color:'var(--text-dim)' }}>XP</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Table */}
        <Card padding={0}>
          <div style={{
            display:'grid', gridTemplateColumns: tab === 'individual' ? '50px 1fr 130px 100px 80px 80px' : '50px 1fr 130px 100px 80px',
            padding:'12px 22px', borderBottom:'1px solid var(--border)',
            fontSize:11, color:'var(--text-dim)', letterSpacing:'0.05em', textTransform:'uppercase', fontWeight:700
          }}>
            <span>#</span><span>{tab === 'individual' ? 'Name' : 'Team'}</span>
            <span>{tab === 'individual' ? 'Team' : 'Lead'}</span>
            <span style={{ textAlign:'right' }}>XP</span>
            {tab === 'individual' && <span style={{ textAlign:'center' }}>Lvl</span>}
            <span style={{ textAlign:'center' }}>Δ</span>
          </div>
          {rows.map(r => (
            <div key={r.rank} style={{
              display:'grid', gridTemplateColumns: tab === 'individual' ? '50px 1fr 130px 100px 80px 80px' : '50px 1fr 130px 100px 80px',
              padding:'14px 22px', borderBottom:'1px solid var(--border)', alignItems:'center',
              background: r.you ? 'var(--accent-light)' : 'transparent'
            }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'var(--text-sub)', fontWeight:700 }}>{r.rank}</span>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <Avatar initials={r.initials || r.name.split(' ').map(s=>s[0]).join('').slice(0,2)} ac={r.ac} size={28} />
                <span style={{ fontSize:13, fontWeight: r.you ? 700 : 600, color:'var(--text)' }}>
                  {r.you ? 'You' : r.name}
                </span>
              </div>
              <span style={{ fontSize:12, color:'var(--text-sub)' }}>{r.team || r.lead}</span>
              <span style={{ textAlign:'right', fontFamily:'var(--font-mono)', fontSize:13, color:'var(--text)', fontWeight:600 }}>
                {r.xp.toLocaleString()}
              </span>
              {tab === 'individual' && (
                <span style={{ textAlign:'center', fontSize:12, color:'var(--accent)', fontWeight:700 }}>L{r.level}</span>
              )}
              <span style={{
                textAlign:'center', fontSize:12, fontFamily:'var(--font-mono)', fontWeight:700,
                color: r.delta?.startsWith('+') ? 'var(--green)' : r.delta?.startsWith('-') ? '#F87171' : 'var(--text-dim)'
              }}>{r.delta}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

// ===================== INSIGHTS (admin) =====================
const InsightsScreen = () => {
  const { Card, Pill, Kicker, Btn, ProgressBar, StatTile, SectionHeader } = window.BrPrim;
  const { IconTrend, IconUsers, IconAlert, IconCheckCirc } = window.BrIcons;

  return (
    <div style={{ height:'100%', overflow:'auto' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'32px 40px 80px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
          <div>
            <Kicker>Admin · Insights</Kicker>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:32, fontWeight:700, letterSpacing:'-0.025em', margin:'10px 0 6px' }}>
              GTM org · Q2
            </h2>
            <p style={{ color:'var(--text-sub)', margin:0, fontSize:14 }}>What you'd report up to the CRO. Updated 2 min ago.</p>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <Btn variant="secondary" size="sm">Filters</Btn>
            <Btn variant="secondary" size="sm">Export CSV</Btn>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:14, marginBottom:18 }}>
          <StatTile label="Active learners" value="384 / 412" sub="93% activation · +6pt" accent="var(--green)" />
          <StatTile label="Modules / week" value="2.4" sub="target: 2.0" accent="var(--accent)" />
          <StatTile label="Avg level" value="2.3" sub="from 1.8 in Q1" />
          <StatTile label="Coach sessions" value="1,247" sub="42 follow-ups booked" accent="var(--accent-2)" />
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:14, marginBottom:18 }}>
          <Card padding={22}>
            <Kicker>Adoption by team</Kicker>
            <div style={{ marginTop:14, display:'flex', flexDirection:'column', gap:10 }}>
              {[
                { team:'Enterprise · West', pct:96, ac:'#997CED' },
                { team:'SMB · Velocity',    pct:91, ac:'#FF2370' },
                { team:'Mid-Market · Atlas',pct:82, ac:'#4CFEC8' },
                { team:'Enterprise · East', pct:71, ac:'#3CAFF2' },
                { team:'Strategic · Tigers',pct:64, ac:'#FFE03F' },
              ].map(r => (
                <div key={r.team} style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <span style={{ flex:'0 0 160px', fontSize:13, color:'var(--text)', fontWeight:600 }}>{r.team}</span>
                  <div style={{ flex:1, height:8, background:'var(--card-alt)', borderRadius:999, overflow:'hidden' }}>
                    <div style={{ width:`${r.pct}%`, height:'100%', background:r.ac, borderRadius:999, transition:'width .8s' }}/>
                  </div>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--text-sub)', width:36, textAlign:'right' }}>{r.pct}%</span>
                </div>
              ))}
            </div>
          </Card>

          <Card padding={22}>
            <Kicker>Coach intervention queue</Kicker>
            <div style={{ marginTop:14, display:'flex', flexDirection:'column', gap:10 }}>
              {[
                { who:'4 reps', what:'inactive 7+ days', sev:'warn' },
                { who:'Atlas team', what:'avg score < 70', sev:'warn' },
                { who:'12 reps', what:'stuck on M05 (hallucinations)', sev:'info' },
                { who:'2 reps', what:'gaming streaks', sev:'crit' },
              ].map((r, i) => (
                <div key={i} style={{
                  display:'flex', alignItems:'center', gap:10,
                  padding:'10px 12px', borderRadius:9,
                  background: r.sev === 'crit' ? 'rgba(248,113,113,0.08)' : r.sev === 'warn' ? 'rgba(255,209,102,0.08)' : 'var(--card-alt)',
                  border: r.sev === 'crit' ? '1px solid rgba(248,113,113,0.3)' : r.sev === 'warn' ? '1px solid rgba(255,209,102,0.25)' : '1px solid var(--border)'
                }}>
                  <IconAlert size={14} stroke={r.sev === 'crit' ? '#F87171' : r.sev === 'warn' ? '#FFE03F' : 'var(--text-dim)'} />
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>{r.who}</div>
                    <div style={{ fontSize:11, color:'var(--text-sub)' }}>{r.what}</div>
                  </div>
                  <Btn variant="ghost" size="sm">Action</Btn>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card padding={22}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:14 }}>
            <Kicker>Behavioral outcomes</Kicker>
            <span style={{ fontSize:11, color:'var(--text-dim)' }}>linked to learning · last 90 days</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:14 }}>
            {[
              { metric:'Reps using AI in pre-call prep', before:'42%', after:'78%', delta:'+36pt' },
              { metric:'AI-drafted emails sent', before:'820/wk', after:'2,140/wk', delta:'+161%' },
              { metric:'Forecast accuracy (Gong AI)', before:'71%', after:'84%', delta:'+13pt' },
            ].map((r, i) => (
              <div key={i} style={{
                padding:'18px 20px', borderRadius:'var(--radius)',
                background:'var(--card-alt)', border:'1px solid var(--border)'
              }}>
                <div style={{ fontSize:12, color:'var(--text-sub)', marginBottom:10, lineHeight:1.4 }}>{r.metric}</div>
                <div style={{ display:'flex', alignItems:'baseline', gap:10 }}>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'var(--text-dim)', textDecoration:'line-through' }}>{r.before}</span>
                  <span style={{
                    fontFamily:'var(--font-display)', fontSize:24, fontWeight:800, color:'var(--text)', letterSpacing:'-0.02em'
                  }}>{r.after}</span>
                  <span style={{ fontSize:12, color:'var(--green)', fontWeight:700 }}>{r.delta}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// ===================== CONTENT (admin) =====================
const ContentScreen = () => {
  const { Card, Pill, Kicker, Btn, SectionHeader } = window.BrPrim;
  const { IconPlus, IconEdit, IconEye, IconFilter, IconSpark } = window.BrIcons;

  const items = [
    { code:'AI101 · M04', title:'Prompting best practices', kind:'Module', status:'Live', updated:'2d', enrolled:340, score:84 },
    { code:'AI201 · M02', title:'Pattern: Show, don\'t tell', kind:'Module', status:'Live', updated:'1w', enrolled:182, score:88 },
    { code:'AI301 · M07', title:'Workflow: Gong → Claude → SF', kind:'Module', status:'Draft', updated:'3h', enrolled:0, score:null },
    { code:'PRACTICE',    title:'Multi-thread the Datadog account', kind:'Scenario', status:'Live', updated:'5d', enrolled:88, score:79 },
    { code:'TEMPLATE',    title:'Pre-call brief · Enterprise', kind:'Prompt', status:'Live', updated:'2w', enrolled:412, score:null },
    { code:'EVENT',       title:'Q1 AI Hackathon', kind:'Event', status:'Scheduled', updated:'today', enrolled:64, score:null },
  ];

  return (
    <div style={{ height:'100%', overflow:'auto' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'32px 40px 80px' }}>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:18 }}>
          <div>
            <Kicker>Admin · Content</Kicker>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:32, fontWeight:700, letterSpacing:'-0.025em', margin:'10px 0 6px' }}>
              Content library
            </h2>
            <p style={{ color:'var(--text-sub)', margin:0, fontSize:14 }}>Modules, scenarios, prompts, events. Authored by your team and the coach.</p>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <Btn variant="secondary" size="sm" icon={<IconFilter size={11}/>}>Filter</Btn>
            <Btn variant="soft" size="sm" icon={<IconSpark size={11}/>}>Generate from Gong</Btn>
            <Btn icon={<IconPlus size={11}/>}>New module</Btn>
          </div>
        </div>

        <Card padding={0}>
          <div style={{
            display:'grid', gridTemplateColumns:'130px 1fr 90px 90px 90px 80px 100px',
            padding:'12px 22px', borderBottom:'1px solid var(--border)',
            fontSize:11, color:'var(--text-dim)', letterSpacing:'0.05em', textTransform:'uppercase', fontWeight:700
          }}>
            <span>Code</span><span>Title</span><span>Kind</span><span>Status</span><span style={{ textAlign:'right' }}>Enrolled</span><span style={{ textAlign:'right' }}>Score</span><span style={{ textAlign:'right' }}>Actions</span>
          </div>
          {items.map((r, i) => (
            <div key={i} style={{
              display:'grid', gridTemplateColumns:'130px 1fr 90px 90px 90px 80px 100px',
              padding:'14px 22px', borderBottom:'1px solid var(--border)', alignItems:'center'
            }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-sub)' }}>{r.code}</span>
              <span style={{ fontSize:13, color:'var(--text)', fontWeight:600 }}>{r.title}</span>
              <Pill bg="var(--card-alt)" border="var(--border)" color="var(--text-sub)" style={{ padding:'2px 8px', fontSize:10, justifySelf:'start' }}>{r.kind}</Pill>
              <span style={{
                fontSize:11, fontWeight:700,
                color: r.status === 'Live' ? 'var(--green)' : r.status === 'Draft' ? 'var(--text-dim)' : 'var(--accent-2)'
              }}>{r.status}</span>
              <span style={{ textAlign:'right', fontFamily:'var(--font-mono)', fontSize:12, color:'var(--text-sub)' }}>{r.enrolled || '—'}</span>
              <span style={{ textAlign:'right', fontFamily:'var(--font-mono)', fontSize:12, color: r.score && r.score >= 85 ? 'var(--green)' : 'var(--text-sub)' }}>{r.score || '—'}</span>
              <span style={{ textAlign:'right', display:'inline-flex', justifySelf:'end', gap:4 }}>
                <button title="View" style={{ background:'transparent', border:'none', color:'var(--text-sub)', cursor:'pointer', padding:6 }}><IconEye size={13} stroke="currentColor" /></button>
                <button title="Edit" style={{ background:'transparent', border:'none', color:'var(--text-sub)', cursor:'pointer', padding:6 }}><IconEdit size={13} stroke="currentColor" /></button>
              </span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

// ===================== SETTINGS =====================
const SettingsScreen = ({ user }) => {
  const { Card, Kicker, Btn, SectionHeader, Avatar } = window.BrPrim;
  return (
    <div style={{ height:'100%', overflow:'auto' }}>
      <div style={{ maxWidth:760, margin:'0 auto', padding:'32px 40px 80px' }}>
        <SectionHeader kicker="Settings" title="Profile & preferences" />
        <Card padding={24} style={{ marginBottom:14 }}>
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            <Avatar initials={(user?.name || 'U').split(' ').map(s=>s[0]).join('').slice(0,2)} ac="var(--accent)" size={64} />
            <div>
              <div style={{ fontSize:18, fontWeight:700, color:'var(--text)' }}>{user?.name}</div>
              <div style={{ fontSize:13, color:'var(--text-sub)' }}>{user?.role} · {user?.team}</div>
            </div>
            <span style={{ flex:1 }}/>
            <Btn variant="secondary" size="sm">Edit</Btn>
          </div>
        </Card>
        <Card padding={24}>
          <Kicker>Notifications</Kicker>
          <div style={{ marginTop:14, display:'flex', flexDirection:'column', gap:10 }}>
            {['Daily nudge', 'Streak warnings', 'New badge earned', 'Team activity', 'Coach suggestions'].map(t => (
              <div key={t} style={{
                display:'flex', alignItems:'center', justifyContent:'space-between',
                padding:'10px 12px', background:'var(--card-alt)', borderRadius:8
              }}>
                <span style={{ fontSize:13, color:'var(--text)' }}>{t}</span>
                <div style={{
                  width:36, height:20, borderRadius:999,
                  background:'var(--accent)', position:'relative', cursor:'pointer'
                }}>
                  <div style={{ position:'absolute', top:2, right:2, width:16, height:16, borderRadius:'50%', background:'#fff' }}/>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

window.BrOther = { DashboardScreen, PathsScreen, AchievementsScreen, LeaderboardScreen, InsightsScreen, ContentScreen };
