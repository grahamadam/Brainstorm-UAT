// COURSE view — AI 101 syllabus showing all 7 modules with their states
// (done / active / next / locked). Reachable from the My Learning sidebar
// item and from clicking the AI 101 path in Paths.

const CourseScreen = ({ goto, startLesson, startCheck, gamification, density }) => {
  const { Card, Pill, Kicker, Btn, ProgressBar, SectionHeader } = window.BrPrim;
  const {
    IconArrowR, IconArrowL, IconLock, IconCheckCirc, IconClock, IconBolt,
    IconStar, IconBook, IconSpark, IconTrophy, IconCircle
  } = window.BrIcons;
  const { MODULES_AI101, PATHS, LESSON_BY_MODULE } = window.BrData;

  const path = PATHS.find(p => p.id === 'AI101') || PATHS[0];
  const compact = density === 'compact';
  const showGame = gamification !== 'subtle';

  // Aggregate stats
  const completed = MODULES_AI101.filter(m => m.state === 'done').length;
  const total = MODULES_AI101.length;
  const pct = Math.round((completed / total) * 100);
  const totalMinutes = MODULES_AI101.reduce((n, m) => n + (m.minutes || 0), 0);
  const activeModule = MODULES_AI101.find(m => m.state === 'active');
  const nextUp = activeModule || MODULES_AI101.find(m => m.state === 'next') || MODULES_AI101[0];

  // Group modules by pillar so the syllabus reads as a real arc.
  const groupOrder = ['Foundation', 'Craft', 'Judgment'];
  const groupMeta = {
    Foundation: { kicker:'Pillar 1', tagline:'What AI is, how it works, where it fits.', accent:'var(--accent)' },
    Craft:      { kicker:'Pillar 2', tagline:'The moves that turn outputs into work product.', accent:'var(--accent-2)' },
    Judgment:   { kicker:'Pillar 3', tagline:"Owning what you ship. Knowing when not to trust it.", accent:'var(--green)' }
  };

  const startCTA = (m) => {
    if (m.state === 'locked') return;
    if (startLesson) startLesson(m.id);
    else if (goto) goto('lesson');
  };

  // Single module row in the syllabus
  const ModuleRow = ({ m, idx, lastInGroup }) => {
    const done    = m.state === 'done';
    const active  = m.state === 'active';
    const next    = m.state === 'next';
    const locked  = m.state === 'locked';
    const authored = !!LESSON_BY_MODULE[m.id];

    // Status chip
    let chip = null;
    if (done)   chip = <Pill bg="rgba(76,254,200,0.10)" border="rgba(76,254,200,0.30)" color="var(--green)" icon={<IconCheckCirc size={10}/>}>Cleared{m.score ? ` · ${m.score}` : ''}</Pill>;
    if (active) chip = <Pill icon={<IconBolt size={10}/>}>In progress</Pill>;
    if (next)   chip = <Pill bg="var(--card-alt)" border="var(--border)" color="var(--text-sub)" icon={<IconArrowR size={10}/>}>Up next</Pill>;
    if (locked) chip = <Pill bg="var(--card-alt)" border="var(--border)" color="var(--text-dim)" icon={<IconLock size={10}/>}>Locked</Pill>;

    // Action button
    const action =
      done   ? <Btn onClick={() => startCheck && startCheck(m.id)} variant="ghost" size="sm" icon={<IconArrowR size={11}/>}>Review</Btn> :
      active ? <Btn onClick={() => startCTA(m)} size="sm" icon={<IconArrowR size={11}/>}>{authored ? 'Continue' : 'Start lesson'}</Btn> :
      next   ? <Btn onClick={() => startCTA(m)} variant="secondary" size="sm" icon={<IconArrowR size={11}/>}>Start when ready</Btn> :
               <Btn variant="ghost" size="sm" disabled icon={<IconLock size={11}/>}>Locked</Btn>;

    return (
      <div style={{
        position:'relative', display:'grid',
        gridTemplateColumns:'56px minmax(0, 1fr) auto',
        gap:18, alignItems:'center',
        padding:'18px 20px',
        background: active ? 'linear-gradient(90deg, color-mix(in oklab, var(--accent) 10%, var(--card)), var(--card) 60%)' : 'var(--card)',
        border: active ? '1px solid var(--accent-border)' : '1px solid var(--border)',
        borderRadius:'var(--radius)',
        opacity: locked ? 0.62 : 1,
        boxShadow: active ? '0 14px 32px -22px color-mix(in oklab, var(--accent) 60%, transparent)' : 'none',
        cursor: locked ? 'not-allowed' : 'pointer',
        transition: 'transform .15s, border-color .15s'
      }}
      onClick={() => !locked && startCTA(m)}
      onMouseEnter={(e) => { if (!locked) e.currentTarget.style.transform = 'translateY(-1px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}>
        {/* Number / status disc */}
        <div style={{
          width:42, height:42, borderRadius:'50%', flexShrink:0,
          display:'flex', alignItems:'center', justifyContent:'center',
          background: done   ? 'linear-gradient(135deg, var(--green), color-mix(in oklab, var(--green) 60%, var(--accent-2)))' :
                      active ? 'linear-gradient(135deg, var(--accent), var(--accent-mid))' :
                      next   ? 'var(--card-alt)' : 'var(--card-alt)',
          color: done || active ? '#fff' : 'var(--text-dim)',
          border: done || active ? 'none' : '1px solid var(--border)',
          fontFamily:'var(--font-mono)', fontSize:13, fontWeight:800, letterSpacing:'.02em'
        }}>
          {done   ? <IconCheckCirc size={18} stroke="#fff" /> :
           locked ? <IconLock size={14} stroke="var(--text-dim)" /> :
                    m.num}
        </div>

        {/* Title + meta */}
        <div style={{ minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4, flexWrap:'wrap' }}>
            <span style={{
              fontFamily:'var(--font-body)', fontSize:10, color:'var(--text-dim)',
              letterSpacing:'.10em', textTransform:'uppercase', fontWeight:700
            }}>Module {m.num}</span>
            {chip}
            {!authored && !locked && !done && (
              <Pill bg="var(--card-alt)" border="var(--border)" color="var(--text-dim)" style={{ fontSize:9.5 }}>Preview</Pill>
            )}
          </div>
          <div style={{
            fontFamily:'var(--font-display)', fontSize: compact ? 16 : 17, fontWeight:700,
            color: locked ? 'var(--text-sub)' : 'var(--text)', letterSpacing:'-0.01em',
            marginBottom:3, lineHeight:1.25
          }}>{m.title}</div>
          <div style={{ fontSize:12.5, color:'var(--text-sub)', lineHeight:1.5 }}>{m.subtitle}</div>
          <div style={{
            display:'flex', alignItems:'center', gap:12, marginTop:8,
            fontSize:11, color:'var(--text-dim)'
          }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:4 }}>
              <IconClock size={11} stroke="currentColor" /> {m.minutes} min
            </span>
            <span>·</span>
            <span style={{ display:'inline-flex', alignItems:'center', gap:4 }}>
              <IconBook size={11} stroke="currentColor" /> Lesson + 4-question check
            </span>
            {done && m.score != null && (
              <>
                <span>·</span>
                <span style={{ color:'var(--green)', fontWeight:700 }}>Score {m.score}</span>
              </>
            )}
          </div>
        </div>

        {/* CTA */}
        <div style={{ flexShrink:0 }} onClick={(e) => e.stopPropagation()}>
          {action}
        </div>
      </div>
    );
  };

  return (
    <div style={{ height:'100%', overflow:'auto' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', padding: compact ? '24px 32px 80px' : '32px 40px 96px' }}>

        {/* ── HEADER ───────────────────────────────────────────── */}
        <div style={{ marginBottom:24 }}>
          <button onClick={() => goto && goto('paths')} style={{
            background:'transparent', border:'none', cursor:'pointer',
            display:'inline-flex', alignItems:'center', gap:6,
            fontSize:11, color:'var(--text-sub)', padding:0, marginBottom:14,
            fontFamily:'var(--font-mono)', letterSpacing:'.06em', textTransform:'uppercase', fontWeight:700
          }}>
            <IconArrowL size={11}/> Paths
          </button>
          <div style={{ display:'flex', gap:24, alignItems:'flex-end', flexWrap:'wrap' }}>
            <div style={{ flex:1, minWidth:280 }}>
              <Kicker>{path.code} · {path.level} · Main quest</Kicker>
              <h1 style={{
                fontFamily:'var(--font-display)', fontSize:'clamp(2rem, 4vw, 3rem)',
                fontWeight:700, letterSpacing:'-0.03em', margin:'10px 0 8px', lineHeight:1.05
              }}>{path.title}</h1>
              <p style={{
                fontSize:14.5, color:'var(--text-sub)', margin:0, maxWidth:640,
                lineHeight:1.55, textWrap:'pretty'
              }}>{path.subtitle} Seven modules, taken in order. Each one unlocks the next.</p>
            </div>

            {/* Progress chip */}
            <div style={{
              padding:'14px 18px', background:'var(--card)', border:'1px solid var(--border)',
              borderRadius:'var(--radius)', display:'flex', alignItems:'center', gap:18, flexShrink:0,
              minWidth:280
            }}>
              <div style={{ flex:1 }}>
                <div style={{
                  fontSize:10, fontFamily:'var(--font-mono)', color:'var(--text-dim)',
                  letterSpacing:'.08em', textTransform:'uppercase', marginBottom:4
                }}>Progress</div>
                <div style={{
                  fontFamily:'var(--font-display)', fontSize:22, fontWeight:700, color:'var(--text)',
                  lineHeight:1.05, letterSpacing:'-0.02em', marginBottom:8
                }}>
                  {completed} <span style={{ color:'var(--text-dim)', fontWeight:600 }}>/ {total}</span>
                  <span style={{ fontSize:13, color:'var(--text-sub)', fontWeight:600, marginLeft:8 }}>modules</span>
                </div>
                <ProgressBar value={pct} height={6}/>
              </div>
              <div style={{ width:1, height:48, background:'var(--border)' }}/>
              <div>
                <div style={{
                  fontSize:10, fontFamily:'var(--font-mono)', color:'var(--text-dim)',
                  letterSpacing:'.08em', textTransform:'uppercase'
                }}>Total time</div>
                <div style={{
                  fontFamily:'var(--font-mono)', fontSize:15, fontWeight:700, color:'var(--text)',
                  marginTop:3
                }}>~{Math.round(totalMinutes/60*10)/10}h</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── UP NEXT BANNER ───────────────────────────────────── */}
        {nextUp && (
          <div onClick={() => startCTA(nextUp)} style={{
            marginBottom:30, padding:'20px 24px',
            background:'linear-gradient(135deg, color-mix(in oklab, var(--accent) 22%, var(--card)), var(--card) 70%)',
            border:'1px solid var(--accent-border)', borderRadius:'var(--radius-lg)',
            display:'flex', alignItems:'center', gap:18, cursor:'pointer', position:'relative', overflow:'hidden'
          }}>
            <div aria-hidden="true" style={{
              position:'absolute', right:-40, top:-40, width:180, height:180, borderRadius:'50%',
              background:'radial-gradient(circle, color-mix(in oklab, var(--accent) 32%, transparent), transparent 70%)',
              pointerEvents:'none'
            }}/>
            <div style={{
              width:48, height:48, borderRadius:12, flexShrink:0,
              background:'linear-gradient(135deg, var(--accent), var(--accent-mid))',
              display:'flex', alignItems:'center', justifyContent:'center', color:'#fff'
            }}><IconBolt size={20}/></div>
            <div style={{ flex:1, minWidth:0, position:'relative' }}>
              <div style={{
                fontFamily:'var(--font-mono)', fontSize:10.5, color:'var(--accent)',
                letterSpacing:'.10em', textTransform:'uppercase', fontWeight:700, marginBottom:3
              }}>{completed === 0 ? 'Start here' : 'Next module'}</div>
              <div style={{
                fontFamily:'var(--font-display)', fontSize:20, fontWeight:700, color:'var(--text)',
                letterSpacing:'-0.02em', marginBottom:2
              }}>Module {nextUp.num} · {nextUp.title}</div>
              <div style={{ fontSize:12.5, color:'var(--text-sub)', lineHeight:1.5 }}>
                {nextUp.subtitle} · {nextUp.minutes} min
              </div>
            </div>
            <Btn icon={<IconArrowR size={13}/>}>{completed === 0 ? 'Start lesson' : 'Continue'}</Btn>
          </div>
        )}

        {/* ── SYLLABUS ─────────────────────────────────────────── */}
        <div>
          <div style={{ marginBottom:14, display:'flex', alignItems:'center', gap:10 }}>
            <Kicker>Syllabus</Kicker>
            <span style={{ fontSize:11, color:'var(--text-dim)', fontFamily:'var(--font-mono)' }}>
              all {total} modules
            </span>
          </div>

          {groupOrder.map((g, gi) => {
            const groupMods = MODULES_AI101.filter(m => m.group === g);
            if (groupMods.length === 0) return null;
            const meta = groupMeta[g];
            const groupDone = groupMods.every(m => m.state === 'done');
            const groupActive = groupMods.some(m => m.state === 'active');

            return (
              <div key={g} style={{ marginBottom:30 }}>
                {/* Pillar header */}
                <div style={{
                  display:'flex', alignItems:'center', gap:12, marginBottom:12,
                  padding:'0 4px'
                }}>
                  <div style={{
                    width:28, height:28, borderRadius:8, flexShrink:0,
                    background: groupDone ? 'rgba(76,254,200,0.15)' : groupActive ? 'var(--accent-light)' : 'var(--card-alt)',
                    border: `1px solid ${groupDone ? 'rgba(76,254,200,0.40)' : groupActive ? 'var(--accent-border)' : 'var(--border)'}`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontFamily:'var(--font-mono)', fontSize:11, fontWeight:800,
                    color: groupDone ? 'var(--green)' : groupActive ? 'var(--accent)' : 'var(--text-dim)'
                  }}>{gi + 1}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{
                      display:'flex', alignItems:'baseline', gap:8, flexWrap:'wrap'
                    }}>
                      <span style={{
                        fontFamily:'var(--font-mono)', fontSize:10, color:'var(--text-dim)',
                        letterSpacing:'.10em', textTransform:'uppercase', fontWeight:700
                      }}>{meta.kicker}</span>
                      <h2 style={{
                        fontFamily:'var(--font-display)', fontSize:18, fontWeight:700,
                        color:'var(--text)', margin:0, letterSpacing:'-0.02em'
                      }}>{g}</h2>
                      <span style={{ fontSize:12, color:'var(--text-sub)' }}>· {meta.tagline}</span>
                    </div>
                  </div>
                  <span style={{
                    fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-dim)'
                  }}>
                    {groupMods.filter(m => m.state === 'done').length} / {groupMods.length}
                  </span>
                </div>

                {/* Module rows */}
                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  {groupMods.map((m, i) => (
                    <ModuleRow key={m.id} m={m} idx={i} lastInGroup={i === groupMods.length - 1} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── COMPLETION REWARD ───────────────────────────────── */}
        <div style={{
          marginTop:8, padding:'18px 22px',
          background:'var(--card-alt)', border:'1px dashed var(--border)',
          borderRadius:'var(--radius)', display:'flex', alignItems:'center', gap:14
        }}>
          <div style={{
            width:40, height:40, borderRadius:10, flexShrink:0,
            background:'linear-gradient(135deg, var(--yellow), var(--accent-2))',
            display:'flex', alignItems:'center', justifyContent:'center'
          }}><IconTrophy size={18} stroke="#0A0612"/></div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:13.5, fontWeight:700, color:'var(--text)', letterSpacing:'-0.01em' }}>
              Clear all 7 modules → <span style={{ color:'var(--accent)' }}>AI 101 Graduate</span> badge + Level 2
            </div>
            <div style={{ fontSize:11.5, color:'var(--text-sub)', marginTop:2, lineHeight:1.5 }}>
              Unlocks AI 201: Prompting like a Pro. Average score across all 7 checks becomes your baseline.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

window.BrCourse = { CourseScreen };
