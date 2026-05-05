// KNOWLEDGE CHECK with multi-question support across all 7 modules.
// Question types: 'mc' (single choice), 'multi' (multiple correct), 'free' (rubric-graded)
const { useState: useStateCheck, useEffect: useEffectCheck } = React;

const CheckScreen = ({ onComplete, gamification, moduleId = 'M04' }) => {
  const { Card, Pill, Btn, Kicker, ProgressBar } = window.BrPrim;
  const { IconArrowR, IconArrowL, IconCheck, IconClose, IconSpark, IconBolt, IconCheckCirc, IconAlert, IconCircle } = window.BrIcons;
  const { KC_BY_MODULE, KC_META } = window.BrKC;

  const KC = KC_BY_MODULE[moduleId] || KC_BY_MODULE.M04;
  const meta = KC_META[moduleId] || KC_META.M04;

  const [idx, setIdx] = useStateCheck(0);
  const [answers, setAnswers] = useStateCheck({});      // {qid: index | indices[] | text}
  const [submitted, setSubmitted] = useStateCheck({});  // {qid: true}
  const [grading, setGrading] = useStateCheck(false);
  const [grade, setGrade] = useStateCheck({});          // {qid: {checks, hitCount, total}}
  const [freeInput, setFreeInput] = useStateCheck('');

  // Reset progress when the active module changes (driven by Tweaks select).
  useEffectCheck(() => {
    setIdx(0);
    setAnswers({});
    setSubmitted({});
    setGrade({});
    setGrading(false);
    setFreeInput('');
  }, [moduleId]);

  const q = KC[idx];
  const isMC = q.type === 'mc';
  const isMulti = q.type === 'multi';
  const isFree = q.type === 'free';
  const submittedThis = submitted[q.id];
  const isLast = idx === KC.length - 1;

  // For multi: answers[q.id] is array of selected indices
  const multiSelected = isMulti ? (answers[q.id] || []) : [];

  const choose = (i) => {
    if (submittedThis) return;
    if (isMC) {
      setAnswers({ ...answers, [q.id]: i });
    } else if (isMulti) {
      const cur = answers[q.id] || [];
      const next = cur.includes(i) ? cur.filter(x => x !== i) : [...cur, i];
      setAnswers({ ...answers, [q.id]: next });
    }
  };

  const submit = () => {
    if (isMC || isMulti) {
      setSubmitted({ ...submitted, [q.id]: true });
    } else if (isFree) {
      const text = freeInput.trim();
      if (!text) return;
      setAnswers({ ...answers, [q.id]: text });
      setGrading(true);
      setTimeout(() => {
        const t = text.toLowerCase();
        const checks = q.rubric.map(r => {
          const keys = r.toLowerCase().match(/\b\w{4,}\b/g) || [];
          const hits = keys.filter(k => t.includes(k.slice(0,4)));
          // Bonus: longer answers (>120 chars) more likely to hit nuance criteria
          const lengthHelp = text.length > 120 ? 0 : -1;
          return { rubric:r, hit: hits.length + (lengthHelp >= 0 ? 1 : 0) >= 2 || hits.length >= 2 };
        });
        const hitCount = checks.filter(c => c.hit).length;
        setGrade({ ...grade, [q.id]: { checks, hitCount, total:q.rubric.length } });
        setSubmitted({ ...submitted, [q.id]: true });
        setGrading(false);
      }, 1300);
    }
  };

  const next = () => {
    if (isLast) onComplete();
    else { setIdx(idx + 1); setFreeInput(''); }
  };

  const prev = () => { if (idx > 0) { setIdx(idx-1); setFreeInput(''); } };

  // Compute correctness for MC + multi
  const mcCorrect    = isMC    && submittedThis && answers[q.id] === q.correctIndex;
  const multiCorrect = isMulti && submittedThis &&
    JSON.stringify([...(answers[q.id]||[])].sort()) === JSON.stringify([...q.correctIndices].sort());
  const correct = mcCorrect || multiCorrect;

  // Submit gate per type
  const canSubmit =
    isMC    ? answers[q.id] !== undefined :
    isMulti ? (answers[q.id] || []).length > 0 :
    isFree  ? !!freeInput.trim() : false;

  // Helper for option labels
  const optLetter = (i) => String.fromCharCode(65+i);

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column' }}>
      <div style={{
        padding:'14px 32px', borderBottom:'1px solid var(--border)', background:'var(--surface)',
        display:'flex', alignItems:'center', gap:14, flexShrink:0
      }}>
        <Pill icon={<IconBolt size={11}/>}>Knowledge check · {moduleId}</Pill>
        <span style={{ fontSize:12, color:'var(--text-sub)', fontWeight:600 }}>{meta.title}</span>
        <div style={{ flex:1, display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontSize:11, fontFamily:'var(--font-mono)', color:'var(--text-sub)' }}>{idx+1} / {KC.length}</span>
          <div style={{ flex:1 }}><ProgressBar value={(idx+1)/KC.length*100} height={4} /></div>
        </div>
      </div>

      <div style={{ flex:1, overflow:'auto' }}>
        <div style={{ maxWidth:760, margin:'0 auto', padding:'48px 40px 80px' }}>
          <div className="bs-fade" key={`${moduleId}-${idx}`}>
            <Kicker>{meta.kicker} · {meta.num} · Question {idx+1} of {KC.length}</Kicker>
            <h2 style={{
              fontFamily:'var(--font-display)', fontSize:'clamp(1.6rem, 2.6vw, 2.1rem)',
              fontWeight:700, letterSpacing:'-0.025em', margin:'12px 0 28px', color:'var(--text)', lineHeight:1.25,
              whiteSpace:'pre-line'
            }}>{q.question}</h2>

            {/* Type-specific affordance hint */}
            {isMulti && !submittedThis && (
              <div style={{
                marginBottom:14, padding:'8px 12px',
                background:'var(--accent-light)', border:'1px solid var(--accent-border)',
                borderRadius:8, fontSize:12, color:'var(--text)',
                display:'flex', alignItems:'center', gap:8
              }}>
                <IconBolt size={12} stroke="var(--accent)"/>
                <span>Multiple answers may be correct. Select all that apply.</span>
              </div>
            )}

            {/* MC + Multi options */}
            {(isMC || isMulti) && (
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {q.options.map((opt, i) => {
                  const selected = isMC ? answers[q.id] === i : multiSelected.includes(i);
                  const isCorrectOpt = isMC ? i === q.correctIndex : q.correctIndices.includes(i);
                  const showResult = submittedThis;
                  let bg = 'var(--card)', bd = 'var(--border)';
                  if (showResult && isCorrectOpt)             { bg = 'color-mix(in oklab, var(--green) 12%, var(--card))'; bd = 'var(--green-border)'; }
                  else if (showResult && selected && !isCorrectOpt) { bg = 'rgba(248,113,113,0.08)'; bd = 'rgba(248,113,113,0.4)'; }
                  else if (selected)                          { bg = 'var(--accent-light)'; bd = 'var(--accent-border)'; }
                  return (
                    <button key={i} onClick={() => choose(i)} disabled={submittedThis}
                      style={{
                        display:'flex', alignItems:'flex-start', gap:14, padding:'16px 18px',
                        background:bg, border:`1px solid ${bd}`, borderRadius:'var(--radius)',
                        textAlign:'left', cursor: submittedThis ? 'default' : 'pointer',
                        color:'var(--text)', fontFamily:'inherit', transition:'all .15s'
                      }}>
                      <span style={{
                        width:24, height:24, borderRadius: isMulti ? 5 : 6,
                        fontFamily:'var(--font-mono)', fontWeight:700, fontSize:12,
                        display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                        background: selected ? 'var(--accent)' : 'var(--card-alt)',
                        color: selected ? '#fff' : 'var(--text-sub)',
                        border: `1px solid ${selected ? 'var(--accent)' : 'var(--border)'}`
                      }}>
                        {showResult && isCorrectOpt
                          ? <IconCheck size={12}/>
                          : showResult && selected && !isCorrectOpt
                            ? <IconClose size={12}/>
                            : isMulti
                              ? (selected ? <IconCheck size={11}/> : '')
                              : optLetter(i)}
                      </span>
                      <span style={{ fontSize:14, lineHeight:1.55, paddingTop:3 }}>{opt}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Free-response with rubric upfront */}
            {isFree && (
              <div>
                {/* Rubric panel — shown UPFRONT, persists after submit */}
                <div style={{
                  marginBottom:18, padding:'14px 16px',
                  background:'var(--card-alt)', border:'1px solid var(--border)', borderRadius:'var(--radius)'
                }}>
                  <div style={{
                    display:'flex', alignItems:'center', gap:8, marginBottom:10
                  }}>
                    <IconSpark size={12} stroke="var(--accent)"/>
                    <span style={{
                      fontFamily:'var(--font-mono)', fontSize:11,
                      letterSpacing:'.08em', textTransform:'uppercase',
                      color:'var(--text-sub)', fontWeight:700
                    }}>Coach grades on</span>
                  </div>
                  <ul style={{ margin:0, paddingLeft:0, listStyle:'none', display:'flex', flexDirection:'column', gap:6 }}>
                    {q.rubric.map((r, i) => (
                      <li key={i} style={{
                        display:'flex', alignItems:'flex-start', gap:8, fontSize:12.5,
                        color:'var(--text)', lineHeight:1.5
                      }}>
                        <span style={{
                          flexShrink:0, marginTop:5,
                          width:5, height:5, borderRadius:'50%',
                          background:'var(--accent)'
                        }}/>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <textarea value={freeInput} onChange={e => setFreeInput(e.target.value)}
                  disabled={submittedThis}
                  placeholder="Write your answer here…"
                  rows={8}
                  style={{
                    width:'100%', background:'var(--card)', border:'1px solid var(--border)',
                    borderRadius:'var(--radius)', padding:'14px 16px', fontSize:14, color:'var(--text)',
                    outline:'none', resize:'vertical', lineHeight:1.6, fontFamily:'inherit'
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = 'var(--accent-border)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'} />
                <div style={{ marginTop:10, fontSize:11, color:'var(--text-dim)', display:'flex', alignItems:'center', gap:6 }}>
                  <IconSpark size={11} stroke="var(--accent)" />
                  Coach grades against the rubric above — not for keywords. Aim to land each criterion in your own words.
                </div>
              </div>
            )}

            {/* Grading state */}
            {grading && (
              <div className="bs-fade" style={{
                marginTop:24, padding:'18px 22px', borderRadius:'var(--radius)',
                background:'var(--accent-light)', border:'1px solid var(--accent-border)',
                display:'flex', gap:14, alignItems:'center'
              }}>
                <div style={{
                  width:32, height:32, borderRadius:8,
                  background:'linear-gradient(135deg, var(--accent), var(--accent-mid))',
                  display:'flex', alignItems:'center', justifyContent:'center', color:'#fff'
                }}><IconSpark size={14}/></div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>Coach is grading…</div>
                  <div style={{ fontSize:12, color:'var(--text-sub)' }}>Checking your answer against the rubric</div>
                </div>
              </div>
            )}

            {/* Result */}
            {submittedThis && !grading && (
              <div className="bs-fade" style={{ marginTop:24 }}>
                {(isMC || isMulti) && (
                  <div style={{
                    padding:'18px 22px', borderRadius:'var(--radius)',
                    background: correct ? 'color-mix(in oklab, var(--green) 8%, var(--card))' : 'rgba(248,113,113,0.06)',
                    border: `1px solid ${correct ? 'var(--green-border)' : 'rgba(248,113,113,0.3)'}`
                  }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                      {correct ? <IconCheckCirc size={18} stroke="var(--green)"/> : <IconAlert size={18} stroke="#F87171"/>}
                      <span style={{ fontWeight:700, color: correct ? 'var(--green)' : '#F87171', fontSize:13 }}>
                        {correct
                          ? (isMulti ? 'Nice — got all the right ones.' : 'Nice — that\'s the one.')
                          : (isMulti ? 'Close. Take a look at what was right.' : 'Close, but not quite.')}
                      </span>
                    </div>
                    <div style={{ fontSize:13, color:'var(--text)', lineHeight:1.65 }}>{q.explanation}</div>
                  </div>
                )}
                {isFree && grade[q.id] && (
                  <div style={{
                    padding:'18px 22px', borderRadius:'var(--radius)',
                    background:'var(--card)', border:'1px solid var(--border)'
                  }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
                      <div style={{
                        width:34, height:34, borderRadius:8,
                        background:'linear-gradient(135deg, var(--accent), var(--accent-mid))',
                        display:'flex', alignItems:'center', justifyContent:'center', color:'#fff'
                      }}><IconSpark size={15}/></div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>Coach feedback</div>
                        <div style={{ fontSize:11, color:'var(--text-sub)' }}>{grade[q.id].hitCount} of {grade[q.id].total} rubric criteria met</div>
                      </div>
                      <div style={{
                        fontFamily:'var(--font-display)', fontSize:24, fontWeight:800, color:'var(--accent)',
                        letterSpacing:'-0.02em'
                      }}>{Math.round(grade[q.id].hitCount / grade[q.id].total * 100)}</div>
                    </div>
                    <div style={{ display:'flex', flexDirection:'column', gap:6, marginBottom:16 }}>
                      {grade[q.id].checks.map((c, i) => (
                        <div key={i} style={{
                          display:'flex', alignItems:'flex-start', gap:8, fontSize:12.5,
                          color: c.hit ? 'var(--text)' : 'var(--text-sub)', lineHeight:1.5
                        }}>
                          {c.hit
                            ? <IconCheckCirc size={14} stroke="var(--green)" />
                            : <IconCircle size={14} stroke="var(--text-dim)" /> }
                          <span>{c.rubric}</span>
                        </div>
                      ))}
                    </div>
                    {q.sample && (
                      <div style={{
                        borderTop:'1px solid var(--border)', paddingTop:14, fontSize:12.5,
                        color:'var(--text-sub)', lineHeight:1.7
                      }}>
                        <strong style={{ color:'var(--text)', fontFamily:'var(--font-mono)', fontSize:10.5, letterSpacing:'.08em', textTransform:'uppercase' }}>
                          Sample answer
                        </strong>
                        <div style={{ marginTop:6, fontStyle:'italic' }}>"{q.sample}"</div>
                      </div>
                    )}
                    {q.explanation && (
                      <div style={{
                        marginTop:12, fontSize:12.5, color:'var(--text)', lineHeight:1.6
                      }}>
                        <strong style={{ color:'var(--text)' }}>Why this matters: </strong>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={{ display:'flex', gap:10, marginTop:36, alignItems:'center' }}>
            <Btn variant="secondary" disabled={idx === 0} onClick={prev} icon={<IconArrowL size={13}/>}>Previous</Btn>
            <span style={{ flex:1 }}/>
            {!submittedThis ? (
              <Btn onClick={submit} disabled={!canSubmit} icon={<IconCheck size={13}/>}>Submit answer</Btn>
            ) : (
              <Btn onClick={next} icon={isLast ? <IconBolt size={13}/> : <IconArrowR size={13}/>}>
                {isLast ? 'See your result' : 'Next question'}
              </Btn>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

window.BrCheck = { CheckScreen };
