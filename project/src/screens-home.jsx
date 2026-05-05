// HOME — Activity Feed (the focus screen)
const { useState: useStateHome } = React;

const HomeScreen = ({ user, gamification, density, layoutVariant, openCoach, goto }) => {
  const { Avatar, Card, Kicker, Pill, ProgressBar, Btn, SectionHeader } = window.BrPrim;
  const { IconFlame, IconSpark, IconArrowR, IconTrophy, IconBolt, IconHash, IconStar, IconTarget, IconUsers, IconPlay, IconBook } = window.BrIcons;
  const { FEED, CHAT, SCENARIOS, LEADERBOARD_INDIV } = window.BrData;

  const firstName = (user?.name || 'there').split(' ')[0];
  const showGame = gamification !== 'subtle';
  const bold = gamification === 'bold';
  const compact = density === 'compact';
  const hero = layoutVariant === 'hero';

  const dailyGoal = { done: 1, total: 2, label: 'Daily goal' };

  // ── Daily AI Challenge streaks ─────────────────────────────────────────────
  // Only business days count. Weekends and US federal holidays are skipped
  // entirely (they don't break a streak — they just don't exist).
  const US_HOLIDAYS_2025 = new Set([
    '2025-01-01','2025-01-20','2025-02-17','2025-05-26','2025-06-19',
    '2025-07-04','2025-09-01','2025-10-13','2025-11-11','2025-11-27','2025-12-25'
  ]);
  const isBizDay = (d) => {
    const day = d.getDay();
    if (day === 0 || day === 6) return false;
    const iso = d.toISOString().slice(0,10);
    return !US_HOLIDAYS_2025.has(iso);
  };
  const lastBizDays = (n) => {
    const out = []; const d = new Date(); d.setHours(0,0,0,0);
    while (out.length < n) {
      if (isBizDay(d)) out.push(new Date(d));
      d.setDate(d.getDate() - 1);
    }
    return out; // newest first
  };
  const bizWindow = lastBizDays(8); // newest → oldest
  // Each rep gets a 1/0 bitmap aligned with bizWindow (newest first).
  // Streak = leading run of 1s.
  const streakers = [
    { initials:'PR', name:'Priya R.',   role:'AE · Mid-Market', ac:'#FFE03F', hits:[1,1,1,1,1,1,1,1], streak:14, par:91 },
    { initials:'MK', name:'Marcus K.',  role:'SDR Lead',         ac:'#3CAFF2', hits:[1,1,1,1,1,1,1,0], streak:11, par:88 },
    { initials:'JP', name:'Jordan P.',  role:'AE · Enterprise',  ac:'#4CFEC8', hits:[1,1,1,1,1,1,0,1], streak:9,  par:84 },
    { initials:'You',name:'You',        role:'AE · Mid-Market',  ac:'#997CED', hits:[1,1,1,1,1,1,1,0], streak:7,  par:82, you:true },
    { initials:'AT', name:'Aisha T.',   role:'AE · SMB',         ac:'#FF7A45', hits:[1,1,1,1,0,1,1,1], streak:4,  par:79 },
  ];
  const todayLabel = bizWindow[0].toLocaleDateString('en-US', { month:'short', day:'numeric' });

  const KIND_ICON = {
    level:   <IconStar size={11} />,
    streak:  <IconFlame size={11} />,
    graduate:<IconTrophy size={11} />,
    practice:<IconTarget size={11} />,
    first:   <IconSpark size={11} />,
    badge:   <IconBolt size={11} />,
  };

  return (
    <div style={{ height:'100%', overflow:'auto' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding: compact ? '24px 32px 56px' : '32px 40px 80px' }}>
        {/* Hero greeting */}
        <div className="bs-fade" style={{ marginBottom: compact ? 24 : 32 }}>
          <Kicker>Today · {new Date().toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' })}</Kicker>
          <h1 style={{
            fontFamily:'var(--font-display)', fontSize: hero ? 'clamp(2.5rem, 5vw, 4rem)' : 'clamp(2rem, 4vw, 3rem)',
            fontWeight:700, letterSpacing:'-0.03em', margin:'10px 0 12px', lineHeight:1.02
          }}>
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {firstName}.
            <br/><span style={{ color:'var(--text-sub)', fontWeight:600 }}>Three plays for today, ready when you are.</span>
          </h1>
        </div>

        {/* Three-column hero plays */}
        {/* Daily AI Challenge — front and center */}
        <div className="bs-fade" style={{ marginBottom: compact ? 20 : 28 }}>
          {window.BrDailyChallenge && <window.BrDailyChallenge.DailyChallenge />}
        </div>

        <div className="bs-fade" style={{
          display:'grid', gap: compact ? 12 : 14, marginBottom: compact ? 24 : 32,
          gridTemplateColumns:'repeat(2, minmax(0, 1fr))'
        }}>
          {/* Play 1 — start */}
          <div onClick={() => goto && goto('course')} style={{
            background:'linear-gradient(180deg, var(--card), color-mix(in oklab, var(--accent) 8%, var(--card)))',
            border:'1px solid var(--accent-border)', borderRadius:'var(--radius-lg)',
            padding:'20px 22px', position:'relative', overflow:'hidden', cursor:'pointer'
          }}>
            <div style={{
              position:'absolute', top:-30, right:-30, width:140, height:140, borderRadius:'50%',
              background:'radial-gradient(circle, color-mix(in oklab, var(--accent) 28%, transparent), transparent 70%)'
            }}/>
            <Pill icon={<IconBook size={11}/>}>Start your AI 101 journey</Pill>
            <h3 style={{
              fontFamily:'var(--font-display)', fontSize:22, fontWeight:700, margin:'12px 0 4px',
              letterSpacing:'-0.02em', color:'var(--text)'
            }}>Module 01 · What is AI?</h3>
            <div style={{ fontSize:12, color:'var(--text-sub)', marginBottom:14 }}>12 min · 0 of 7 modules complete</div>
            <div style={{ marginBottom:14 }}><ProgressBar value={0} /></div>
            <Btn onClick={(e) => { e.stopPropagation(); goto && goto('course'); }} icon={<IconArrowR size={12}/>} style={{ width:'100%', justifyContent:'center' }}>Open course</Btn>
          </div>

          {/* Play 3 — coach prompt */}
          <div style={{
            background:'var(--card)', border:'1px solid var(--border)',
            borderRadius:'var(--radius-lg)', padding:'20px 22px', cursor:'pointer'
          }} onClick={openCoach}>
            <Pill icon={<IconSpark size={11}/>}>Ask the coach</Pill>
            <h3 style={{
              fontFamily:'var(--font-display)', fontSize:22, fontWeight:700, margin:'12px 0 4px',
              letterSpacing:'-0.02em', color:'var(--text)'
            }}>Draft a follow-up for your 3pm Acme call</h3>
            <div style={{ fontSize:12, color:'var(--text-sub)', marginBottom:14 }}>
              Coach has your CRM context and last call transcript queued.
            </div>
            <div style={{
              fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-sub)',
              background:'var(--card-alt)', border:'1px dashed var(--border)',
              borderRadius:8, padding:'8px 10px', marginBottom:14
            }}>"You are a senior AE. Following up Acme call…"</div>
            <Btn onClick={(e) => { e.stopPropagation(); openCoach && openCoach(); }} variant="soft" icon={<IconArrowR size={12}/>} style={{ width:'100%', justifyContent:'center' }}>Open in Coach</Btn>
          </div>
        </div>

        {/* Two-column body */}
        <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', gap: compact ? 16 : 20 }}>
          {/* LEFT: feed */}
          <div>
            <SectionHeader kicker="Activity" title="What your team is doing"
              sub="Live signal from your team's learning. Cheer, clip, or chase." />
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {FEED.map((f, i) => (
                <div key={i} className="bs-fade" style={{
                  background:'var(--card)', border:'1px solid var(--border)',
                  borderRadius:'var(--radius)', padding:'14px 16px',
                  display:'flex', gap:12, alignItems:'flex-start',
                  animationDelay: `${i * 40}ms`
                }}>
                  <Avatar initials={f.initials} ac={f.ac} size={36} />
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:3, flexWrap:'wrap' }}>
                      <span style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>{f.name}</span>
                      <span style={{ fontSize:12, color:'var(--text-sub)' }}>{f.msg}</span>
                      <Pill style={{ padding:'1px 7px', fontSize:10 }} icon={KIND_ICON[f.kind]}>{f.kind}</Pill>
                    </div>
                    <div style={{ fontSize:12, color:'var(--text-sub)', marginBottom:8 }}>{f.detail}</div>
                    <div style={{ display:'flex', gap:14, alignItems:'center', fontSize:11, color:'var(--text-dim)' }}>
                      <span>{f.role}</span>
                      <span>·</span>
                      <span>{f.time} ago</span>
                      <span style={{ flex:1 }} />
                      <button style={{ background:'transparent', border:'none', color:'var(--text-sub)', cursor:'pointer', fontSize:11, fontWeight:600 }}>👏 Cheer</button>
                      <button style={{ background:'transparent', border:'none', color:'var(--text-sub)', cursor:'pointer', fontSize:11, fontWeight:600 }}>Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: rail */}
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {/* Daily goal */}
            {showGame && (
              <Card padding={18}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
                  <Kicker>Daily goal</Kicker>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-sub)' }}>{dailyGoal.done}/{dailyGoal.total}</span>
                </div>
                <div style={{
                  fontFamily:'var(--font-display)', fontSize:18, fontWeight:700, color:'var(--text)',
                  letterSpacing:'-0.01em', marginBottom:10, lineHeight:1.3
                }}>One more session and you keep the streak.</div>
                <div style={{ display:'flex', gap:6, marginBottom:12 }}>
                  {Array.from({length:dailyGoal.total}).map((_, i) => (
                    <div key={i} style={{
                      flex:1, height:6, borderRadius:999,
                      background: i < dailyGoal.done ? 'linear-gradient(90deg, var(--accent), var(--accent-2))' : 'var(--card-alt)',
                      border: i < dailyGoal.done ? 'none' : '1px solid var(--border)'
                    }}/>
                  ))}
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, color:'var(--text-sub)' }}>
                  <span style={{
                    fontSize:18, animation: bold ? 'bs-streak-flicker 1.6s ease-in-out infinite' : 'none',
                    display:'inline-block'
                  }}>🔥</span>
                  <strong style={{ color:'var(--text)', fontWeight:700 }}>7 days</strong>
                  <span>longest this quarter</span>
                </div>
              </Card>
            )}

            {/* Daily AI Challenge — streaks */}
            <Card padding={0} style={{ overflow:'hidden' }}>
              <div style={{
                padding:'14px 18px 10px', borderBottom:'1px solid var(--border)',
                display:'flex', alignItems:'flex-start', gap:10
              }}>
                <div style={{
                  width:30, height:30, borderRadius:8, flexShrink:0,
                  background:'linear-gradient(135deg, var(--accent), var(--accent-mid))',
                  display:'flex', alignItems:'center', justifyContent:'center', color:'#fff'
                }}><IconFlame size={15}/></div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
                    <span style={{ fontWeight:700, fontSize:13, color:'var(--text)' }}>Daily Challenge · Streaks</span>
                    <Pill bg="rgba(76,254,200,0.10)" border="rgba(76,254,200,0.30)" color="var(--green)" style={{ padding:'1px 7px', fontSize:9.5 }}>
                      <span style={{ width:5, height:5, borderRadius:'50%', background:'var(--green)' }}/> live
                    </Pill>
                  </div>
                  <div style={{ fontSize:11, color:'var(--text-sub)', marginTop:2 }}>
                    Business days only. Weekends &amp; US holidays skipped.
                  </div>
                </div>
              </div>

              {/* Day-strip header */}
              <div style={{ padding:'10px 18px 6px', display:'flex', alignItems:'center', gap:6 }}>
                <span style={{ flex:1, fontSize:10, fontFamily:'var(--font-mono)', color:'var(--text-dim)', letterSpacing:'.06em', textTransform:'uppercase' }}>
                  Last 8 business days
                </span>
                <span style={{ fontSize:10, fontFamily:'var(--font-mono)', color:'var(--text-dim)' }}>
                  → {todayLabel}
                </span>
              </div>

              {/* Streakers */}
              <div style={{ padding:'4px 12px 10px', display:'flex', flexDirection:'column', gap:2 }}>
                {streakers.map((r, ri) => (
                  <div key={r.name} style={{
                    display:'flex', alignItems:'center', gap:10,
                    padding:'8px 8px', borderRadius:9,
                    background: r.you ? 'var(--accent-light)' : 'transparent',
                    border: r.you ? '1px solid var(--accent-border)' : '1px solid transparent'
                  }}>
                    <span style={{
                      fontFamily:'var(--font-mono)', fontSize:11, fontWeight:700,
                      width:14, textAlign:'center',
                      color: ri === 0 ? '#FFE03F' : ri === 1 ? '#B5A8D8' : ri === 2 ? '#FF7A45' : 'var(--text-dim)'
                    }}>{ri+1}</span>
                    <Avatar initials={r.you ? 'You' : r.initials} ac={r.ac} size={26} />
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:12, fontWeight:700, color:'var(--text)', lineHeight:1.2 }}>{r.you ? 'You' : r.name}</div>
                      <div style={{ fontSize:10, color:'var(--text-dim)', marginTop:1 }}>par {r.par}</div>
                    </div>
                    {/* Day cells — newest on right to read like a calendar */}
                    <div style={{ display:'flex', gap:2.5 }}>
                      {[...r.hits].reverse().map((h, i) => (
                        <div key={i} title={bizWindow[r.hits.length - 1 - i].toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' })}
                          style={{
                            width:11, height:14, borderRadius:2.5,
                            background: h
                              ? (i === r.hits.length - 1
                                  ? 'linear-gradient(180deg, var(--accent), var(--accent-mid))'
                                  : 'var(--green)')
                              : 'var(--card-alt)',
                            border: h ? 'none' : '1px solid var(--border)',
                            opacity: h ? (0.55 + (i / r.hits.length) * 0.45) : 1
                          }}/>
                      ))}
                    </div>
                    <div style={{
                      fontFamily:'var(--font-mono)', fontSize:11, fontWeight:700,
                      color: r.streak >= 10 ? '#FFE03F' : 'var(--text)',
                      minWidth:34, textAlign:'right'
                    }}>
                      <span style={{ marginRight:2 }}>🔥</span>{r.streak}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                padding:'9px 18px', borderTop:'1px solid var(--border)',
                display:'flex', alignItems:'center', gap:10,
                fontSize:11, color:'var(--text-sub)', background:'var(--card-alt)'
              }}>
                <span style={{ display:'inline-flex', alignItems:'center', gap:4 }}>
                  <span style={{ width:8, height:8, borderRadius:2, background:'var(--green)' }}/> hit
                </span>
                <span style={{ display:'inline-flex', alignItems:'center', gap:4 }}>
                  <span style={{ width:8, height:8, borderRadius:2, background:'var(--card)', border:'1px solid var(--border)' }}/> missed
                </span>
                <span style={{ flex:1 }}/>
                <button onClick={() => goto && goto('leaderboard')} style={{
                  background:'transparent', border:'none', color:'var(--accent)',
                  fontSize:11, fontWeight:700, cursor:'pointer'
                }}>Full board →</button>
              </div>
            </Card>

            {/* #gtm-ai chat */}
            <Card padding={0} style={{ overflow:'hidden' }}>
              <div style={{
                padding:'14px 18px', borderBottom:'1px solid var(--border)',
                display:'flex', alignItems:'center', gap:8
              }}>
                <IconHash size={14} stroke="var(--accent)" />
                <span style={{ fontWeight:700, fontSize:13, color:'var(--text)' }}>gtm-ai</span>
                <span style={{ fontSize:11, color:'var(--text-sub)' }}>· 412 members</span>
                <span style={{ flex:1 }}/>
                <Pill bg="rgba(61,212,160,0.12)" border="rgba(61,212,160,0.35)" color="var(--green)" style={{ padding:'2px 8px', fontSize:10 }}>
                  <span style={{ width:5, height:5, borderRadius:'50%', background:'var(--green)' }} /> live
                </Pill>
              </div>
              <div style={{ padding:'10px 12px', display:'flex', flexDirection:'column', gap:8, maxHeight:380, overflow:'auto' }}>
                {CHAT.map((c, i) => (
                  <div key={i} style={{
                    display:'flex', gap:9, alignItems:'flex-start',
                    background: c.highlight ? 'var(--accent-light)' : c.isCoach ? 'var(--accent-2-light)' : 'transparent',
                    border: c.highlight ? '1px solid var(--accent-border)' : c.isCoach ? '1px solid var(--accent-2-border)' : '1px solid transparent',
                    borderRadius:9, padding:'7px 9px'
                  }}>
                    {c.isCoach ? (
                      <div style={{
                        width:28, height:28, borderRadius:7, flexShrink:0,
                        background:'linear-gradient(135deg, var(--accent), var(--accent-mid))',
                        display:'flex', alignItems:'center', justifyContent:'center', color:'#fff'
                      }}><IconSpark size={13}/></div>
                    ) : (
                      <Avatar initials={c.initials} ac={c.ac} size={28} />
                    )}
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:'flex', alignItems:'baseline', gap:6 }}>
                        <span style={{ fontSize:12, fontWeight:700, color: c.isCoach ? 'var(--accent)' : 'var(--text)' }}>{c.name}</span>
                        {c.isCoach && <Pill style={{ padding:'1px 6px', fontSize:9 }}>AI Coach</Pill>}
                        <span style={{ fontSize:10, color:'var(--text-dim)' }}>{c.time}</span>
                      </div>
                      <div style={{ fontSize:12, color:'var(--text-sub)', marginTop:2, lineHeight:1.5 }}>{c.msg}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding:10, borderTop:'1px solid var(--border)' }}>
                <input placeholder="Reply in #gtm-ai…"
                  style={{
                    width:'100%', background:'var(--card-alt)', border:'1px solid var(--border)',
                    borderRadius:8, padding:'8px 12px', fontSize:12, color:'var(--text)', outline:'none'
                  }}/>
              </div>
            </Card>

            {/* Mini leaderboard */}
            <Card padding={18}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
                <Kicker>This week · GTM</Kicker>
                <button onClick={() => goto && goto('leaderboard')} style={{ background:'transparent', border:'none', color:'var(--accent)', fontSize:11, fontWeight:700, cursor:'pointer' }}>See all →</button>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {LEADERBOARD_INDIV.slice(0,4).map(r => (
                  <div key={r.rank} style={{
                    display:'flex', alignItems:'center', gap:10,
                    padding:'6px 8px', borderRadius:8,
                    background: r.you ? 'var(--accent-light)' : 'transparent',
                    border: r.you ? '1px solid var(--accent-border)' : '1px solid transparent'
                  }}>
                    <span style={{
                      fontFamily:'var(--font-mono)', fontSize:11, fontWeight:700,
                      width:18, color:r.rank === 1 ? '#FFE03F' : r.rank === 2 ? '#B5A8D8' : r.rank === 3 ? '#FF7A45' : 'var(--text-dim)'
                    }}>{r.rank}</span>
                    <Avatar initials={r.you ? 'You' : r.initials} ac={r.ac} size={24} />
                    <span style={{ flex:1, fontSize:12, fontWeight:600, color:'var(--text)' }}>{r.you ? 'You' : r.name}</span>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-sub)' }}>{r.xp.toLocaleString()} XP</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

window.BrHome = { HomeScreen };
