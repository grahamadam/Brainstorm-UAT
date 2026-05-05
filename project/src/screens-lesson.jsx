// LESSON reader — novel pattern: AI margin commentary
const { useState: useStateLesson, useEffect: useEffectLesson, Fragment: FragmentL } = React;

const LessonScreen = ({ onComplete, openCoach, gamification, density, goto, moduleId = 'M01' }) => {
  const { Card, Pill, Kicker, Btn, ProgressBar } = window.BrPrim;
  const { IconArrowR, IconArrowL, IconSpark, IconLightbulb, IconQuote, IconClock, IconBolt, IconMsg } = window.BrIcons;
  const { LESSON_BY_MODULE, MODULES_AI101 } = window.BrData;
  const lesson = LESSON_BY_MODULE[moduleId] || LESSON_BY_MODULE.M01;
  const moduleMeta = MODULES_AI101.find(m => m.id === moduleId);
  const compact = density === 'compact';

  const [section, setSection] = useStateLesson(0);
  const [marginOpen, setMarginOpen] = useStateLesson(true);

  // Reset to first section when switching modules.
  useEffectLesson(() => { setSection(0); }, [moduleId]);

  const totalSections = lesson.sections.length;
  const sec = lesson.sections[section];
  const isLast = section === totalSections - 1;
  const progress = Math.round((section + 1) / totalSections * 100);

  const renderRich = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ color: 'var(--text)', fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
      }
      return <FragmentL key={i}>{part}</FragmentL>;
    });
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Top progress strip */}
      <div style={{
        padding: '14px 32px', borderBottom: '1px solid var(--border)', background: 'var(--surface)',
        display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0
      }}>
        <Btn onClick={() => goto && goto('course')} variant="ghost" icon={<IconArrowL size={13} />} size="sm">Back to course</Btn>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-sub)' }}>
            {section + 1} / {totalSections}
          </span>
          <div style={{ flex: 1 }}><ProgressBar value={progress} height={4} /></div>
          <span style={{ fontSize: 11, color: 'var(--text-sub)', display: 'flex', alignItems: 'center', gap: 5 }}>
            <IconClock size={12} stroke="currentColor" /> ~{lesson.estimate} min
          </span>
        </div>
        <Btn variant="ghost" size="sm" icon={<IconSpark size={12} />} onClick={openCoach}>Ask coach</Btn>
      </div>

      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{
          maxWidth: marginOpen ? 1180 : 760, margin: '0 auto',
          padding: compact ? '32px 32px 80px' : '48px 40px 100px',
          display: 'grid',
          gridTemplateColumns: marginOpen ? 'minmax(0, 1fr) 320px' : '1fr',
          gap: 32, transition: 'grid-template-columns .3s'
        }}>
          {/* Main column */}
          <article>
            {section === 0 &&
            <header className="bs-fade" style={{ marginBottom: 40 }}>
                <Kicker>{lesson.kicker} · {lesson.estimate} min</Kicker>
                <h1 style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
                fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.02,
                margin: '14px 0 18px', color: 'var(--text)'
              }}>{lesson.title}</h1>
                <p style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
                color: 'var(--text-sub)', lineHeight: 1.55, margin: 0, fontWeight: 500,
                letterSpacing: '-0.01em', textWrap: 'pretty'
              }}>{lesson.intro}</p>
              </header>
            }

            <section className="bs-fade" key={section}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 8 }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)', fontWeight: 700,
                  letterSpacing: '0.04em'
                }}>{sec.number}</span>
                <Kicker>{sec.kicker}</Kicker>
              </div>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                fontWeight: 700, letterSpacing: '-0.025em', margin: '4px 0 22px', color: 'var(--text)', lineHeight: 1.1
              }}>{sec.title}</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontSize: 16, color: 'var(--text-sub)', lineHeight: 1.7, textWrap: 'pretty' }}>
                {sec.paragraphs.map((p, i) => <p key={i} style={{ margin: 0 }}>{renderRich(p)}</p>)}
              </div>

              {sec.coachNote &&
              <div style={{
                marginTop: 28, padding: '18px 22px', borderRadius: 'var(--radius)',
                background: 'var(--accent-light)', border: '1px solid var(--accent-border)',
                display: 'flex', gap: 14
              }}>
                  <div style={{
                  width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                  background: 'linear-gradient(135deg, var(--accent), var(--accent-mid))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
                }}><IconSpark size={16} /></div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 5 }}>
                      {sec.coachNote.title}
                    </div>
                    <div style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.6 }}>{sec.coachNote.body}</div>
                  </div>
                </div>
              }

              {sec.patterns &&
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 28 }}>
                  {sec.patterns.map((p) =>
                <div key={p.tag} style={{
                  background: 'var(--card)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)', padding: '16px 18px'
                }}>
                      <div style={{
                    width: 28, height: 28, borderRadius: 7, marginBottom: 12,
                    background: 'linear-gradient(135deg, var(--accent), var(--accent-mid))',
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13
                  }}>{p.tag}</div>
                      <h4 style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.01em' }}>{p.name}</h4>
                      <p style={{ margin: 0, fontSize: 13, color: 'var(--text-sub)', lineHeight: 1.6 }}>{p.body}</p>
                    </div>
                )}
                </div>
              }

              {sec.pullquote &&
              <div style={{
                marginTop: 32, padding: '24px 28px', borderRadius: 'var(--radius-lg)',
                background: 'var(--card)', border: '1px solid var(--border)',
                borderLeft: '3px solid var(--accent)'
              }}>
                  <IconQuote size={18} stroke="var(--accent)" style={{ marginBottom: 10 }} />
                  <div style={{
                  fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 2vw, 1.6rem)',
                  fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)', lineHeight: 1.25,
                  marginBottom: 10, textWrap: 'pretty'
                }}>"{sec.pullquote.body}"</div>
                  <div style={{ fontSize: 13, color: 'var(--text-sub)', lineHeight: 1.6 }}>{sec.pullquote.context}</div>
                </div>
              }
            </section>

            {/* Section nav */}
            <div style={{ display: 'flex', gap: 10, marginTop: 48, alignItems: 'center' }}>
              <Btn variant="secondary" disabled={section === 0} onClick={() => setSection((s) => s - 1)} icon={<IconArrowL size={13} />}>Previous</Btn>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 6 }}>
                {Array.from({ length: totalSections }).map((_, i) =>
                <button key={i} onClick={() => setSection(i)} style={{
                  width: i === section ? 24 : 8, height: 8, borderRadius: 999, border: 'none',
                  background: i === section ? 'var(--accent)' : 'var(--border)',
                  cursor: 'pointer', transition: 'all .25s'
                }} />
                )}
              </div>
              {isLast ?
              <Btn onClick={onComplete} icon={<IconBolt size={13} />}>Take knowledge check</Btn> :

              <Btn onClick={() => setSection((s) => s + 1)} icon={<IconArrowR size={13} />}>Next section</Btn>
              }
            </div>
          </article>

          {/* Margin: AI commentary */}
          {marginOpen &&
          <aside style={{ position: 'sticky', top: 32, alignSelf: 'start' }}>
              <div style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: '18px 18px',
              position: 'relative'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <div style={{
                  width: 24, height: 24, borderRadius: 6,
                  background: 'linear-gradient(135deg, var(--accent), var(--accent-mid))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
                }}><IconSpark size={11} /></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>Coach margin</div>
                    <div style={{ fontSize: 10, color: 'var(--text-sub)' }}>Adapts to your role: AE · Enterprise</div>
                  </div>
                  <button onClick={() => setMarginOpen(false)} style={{
                  background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: 11
                }}>hide</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{
                  padding: '12px 14px', borderRadius: 10,
                  background: 'var(--accent-light)', border: '1px solid var(--accent-border)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <IconLightbulb size={12} stroke="var(--accent)" />
                      <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>For your role</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.55 }}>
                      As an Enterprise AE, your <strong>Context</strong> usually includes deal stage, the multi-thread, and the last objection. Reps who skip these get the worst outputs.
                    </div>
                  </div>

                  <div style={{
                  padding: '12px 14px', borderRadius: 10,
                  background: 'var(--card-alt)', border: '1px solid var(--border)'
                }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-sub)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>EXAMPLE</div>
                    <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-sub)', lineHeight: 1.55,
                    background: 'var(--bg)', borderRadius: 7, padding: '9px 10px', border: '1px solid var(--border)'
                  }}>
                      {'>'} You are a senior AE…<br />
                      {'>'} Task: 5-bullet pre-call brief…<br />
                      <span style={{ color: 'var(--accent-2)' }}>{'>'} Context: Acme · Discovery · CFO joining · prior objection: pilot scope</span><br />
                      {'>'} Format: bullets, max 8 words…
                    </div>
                  </div>

                  <button onClick={openCoach} style={{
                  background: 'transparent', border: '1px solid var(--border)',
                  borderRadius: 9, padding: '9px 12px', cursor: 'pointer',
                  color: 'var(--text-sub)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 8
                }}>
                    <IconMsg size={12} stroke="currentColor" />
                    <span>Ask about this passage…</span>
                  </button>
                </div>
              </div>
            </aside>
          }
          {!marginOpen &&
          <button onClick={() => setMarginOpen(true)} style={{
            position: 'fixed', right: 90, bottom: 30, zIndex: 30,
            background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 999,
            padding: '8px 14px', fontSize: 12, color: 'var(--text-sub)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6
          }}>
              <IconSpark size={11} /> Show margin
            </button>
          }
        </div>
      </div>
    </div>);

};

window.BrLesson = { LessonScreen };