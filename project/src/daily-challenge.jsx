// DAILY CHALLENGE — "Wordle meets AI". One puzzle a day, generated overnight by Claude
// from yesterday's lesson + your level. 3 attempts. Score grows with specificity.
// Persistent state: localStorage `bs_dc_<date>` so refresh keeps progress.
const { useState: useDCState, useEffect: useDCEffect, useRef: useDCRef } = React;

// today's seeded challenge — pulled from the active AI curriculum
// (Module 04 · Craft · "Prompting best practices" — the four-part frame)
const DC_CHALLENGE = {
  date: new Date().toISOString().slice(0,10),
  number: 142,
  source: { kind:'lesson', label:"AI 101 · M04 · The four-part frame", duration:'15 min lesson' },
  setup:  "Yesterday's lesson taught the four-part frame: Role, Task, Context, Format. A vague prompt — \"summarize this article\" — gets you a vague summary.",
  task:   "Rewrite that prompt using all four parts. ≤60 words. Closer the model can tell what you actually want = higher score.",
  hints: [
    'Open with a Role — who is the model being? (\"You are a…\")',
    'Be specific about Task and Format — bullets? word count? audience?',
    'Add one line of Context — why are you asking, who reads it.'
  ],
  // grading rubric Claude will apply (shown to the user after submit)
  rubric: [
    { id:'role',    label:'Names a Role for the model',          pts:25 },
    { id:'task',    label:'Task is specific (not "summarize")',  pts:25 },
    { id:'context', label:'Adds Context — why / for whom',       pts:25 },
    { id:'format',  label:'Specifies Format — shape, length',    pts:25 },
  ],
  par: 78,    // team par
  best: 92,   // top score on team today
  attempts_max: 3,
};

// canned grade for the demo (would be a Claude call)
const DC_GRADE = (text) => {
  const t = text.toLowerCase();
  const hasRole    = /(you are|act as|you're a|you are a|role:)/i.test(text);
  const hasTask    = /\d/.test(text) || /(rewrite|extract|compare|critique|draft|outline|translate|classif)/i.test(t);
  const hasContext = /(audience|for (a|an|the)|because|so that|context:|reader|customer|exec|engineer|new hire)/i.test(t);
  const hasFormat  = /(bullet|table|markdown|json|paragraph|word|words|sentence|tone|format:|≤|<=|max)/i.test(t);
  const hits = [hasRole, hasTask, hasContext, hasFormat].filter(Boolean).length;
  const len = Math.min(text.length, 280);
  const score = Math.min(98, 30 + hits*14 + Math.round(len/12));
  return {
    score,
    hits: [
      { id:'role',    got: hasRole,    detail: hasRole    ? 'Clear Role set up front.'                    : 'No Role — the model has to guess who it is.' },
      { id:'task',    got: hasTask,    detail: hasTask    ? 'Task is concrete and verifiable.'            : 'Task is vague — "summarize" alone won\'t cut it.' },
      { id:'context', got: hasContext, detail: hasContext ? 'Good Context — model knows the audience.'    : 'No Context — outputs will be generic.' },
      { id:'format',  got: hasFormat,  detail: hasFormat  ? 'Format spelled out (length, shape, tone).'   : 'No Format — the model picks for you.' }
    ]
  };
};

const DailyChallenge = ({ onComplete }) => {
  const { Pill, Btn, Kicker, Card } = window.BrPrim;
  const { IconBolt, IconSpark, IconClock, IconArrowR, IconCheck, IconClose, IconShare, IconRefresh, IconTrophy, IconCpu, IconLightbulb } = window.BrIcons;

  const storeKey = 'bs_dc_' + DC_CHALLENGE.date;
  const [state, setState] = useDCState(() => {
    try {
      const raw = localStorage.getItem(storeKey);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { attempts: [], hintsUsed: 0, complete: false };
  });
  useDCEffect(() => {
    try { localStorage.setItem(storeKey, JSON.stringify(state)); } catch (e) {}
  }, [state]);

  const [draft, setDraft] = useDCState('');
  const [grading, setGrading] = useDCState(false);
  const [showRecap, setShowRecap] = useDCState(false);
  const taRef = useDCRef(null);

  const submit = () => {
    if (!draft.trim() || state.attempts.length >= DC_CHALLENGE.attempts_max) return;
    setGrading(true);
    setTimeout(() => {
      const grade = DC_GRADE(draft);
      const next = {
        ...state,
        attempts: [...state.attempts, { text: draft, grade, at: Date.now() }],
      };
      const last = next.attempts.length >= DC_CHALLENGE.attempts_max;
      const passed = grade.score >= DC_CHALLENGE.par;
      if (last || passed) next.complete = true;
      setState(next);
      setDraft('');
      setGrading(false);
      if (next.complete && onComplete) onComplete(grade.score);
    }, 1400);
  };

  const useHint = () => {
    if (state.hintsUsed >= DC_CHALLENGE.hints.length) return;
    setState({ ...state, hintsUsed: state.hintsUsed + 1 });
  };

  const reset = () => {
    setState({ attempts: [], hintsUsed: 0, complete: false });
    setDraft('');
    setShowRecap(false);
  };

  const lastAttempt = state.attempts[state.attempts.length - 1];
  const bestScore = state.attempts.reduce((m, a) => Math.max(m, a.grade.score), 0);
  const remainingAttempts = DC_CHALLENGE.attempts_max - state.attempts.length;

  // Score visualization — 4 squares like Wordle rows
  const ScoreRow = ({ grade }) => (
    <div style={{ display:'flex', gap:5 }}>
      {DC_CHALLENGE.rubric.map(r => {
        const hit = grade.hits.find(h => h.id === r.id);
        const got = hit?.got;
        return (
          <div key={r.id} title={r.label} style={{
            width:18, height:18, borderRadius:4,
            background: got ? 'var(--green)' : 'var(--card-alt)',
            border: `1px solid ${got ? 'var(--green-border)' : 'var(--border)'}`,
            display:'flex', alignItems:'center', justifyContent:'center'
          }}>
            {got && <IconCheck size={10} stroke="#0A2E24"/>}
          </div>
        );
      })}
    </div>
  );

  // Gradient hero panel
  return (
    <Card padding={0} style={{
      overflow:'hidden', position:'relative',
      background:'linear-gradient(160deg, color-mix(in oklab, var(--accent) 14%, var(--card)) 0%, var(--card) 60%)',
      border:'1px solid var(--accent-border)'
    }}>
      {/* Header strip */}
      <div style={{
        padding:'14px 22px', borderBottom:'1px solid var(--border)',
        display:'flex', alignItems:'center', gap:12, flexWrap:'wrap',
        background:'color-mix(in oklab, var(--accent) 8%, var(--card))'
      }}>
        <Pill icon={<IconBolt size={11}/>} bg="var(--accent)" border="var(--accent)" color="#fff" style={{ fontWeight:800 }}>
          Daily Challenge
        </Pill>
        <span style={{ fontSize:11, color:'var(--text-sub)', fontFamily:'var(--font-mono)' }}>
          #{DC_CHALLENGE.number} · {new Date(DC_CHALLENGE.date).toLocaleDateString('en-US', { weekday:'long', month:'short', day:'numeric' })}
        </span>
        <span style={{ flex:1 }}/>
        <span style={{ fontSize:11, color:'var(--text-dim)', display:'inline-flex', alignItems:'center', gap:5 }}>
          <IconCpu size={11} stroke="currentColor"/> generated 06:00 · sonnet-4.5
        </span>
      </div>

      {/* Body */}
      <div style={{ padding:'22px 26px' }}>
        {/* Source chip */}
        <div style={{
          display:'inline-flex', alignItems:'center', gap:8,
          padding:'5px 11px', borderRadius:7,
          background:'var(--card)', border:'1px solid var(--border)',
          fontSize:11, color:'var(--text-sub)', fontFamily:'var(--font-mono)', marginBottom:14
        }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--accent-2)' }} />
          source · {DC_CHALLENGE.source.label}
        </div>

        {/* Setup */}
        <h3 style={{
          fontFamily:'var(--font-display)', fontSize:'clamp(1.5rem, 2.4vw, 1.95rem)',
          fontWeight:700, letterSpacing:'-0.025em', lineHeight:1.18, margin:'0 0 10px',
          color:'var(--text)', textWrap:'pretty'
        }}>
          {DC_CHALLENGE.setup}
        </h3>
        <p style={{
          margin:'0 0 18px', fontSize:14, color:'var(--text-sub)', lineHeight:1.55,
          fontFamily:'var(--font-heading)', fontWeight:500
        }}>
          {DC_CHALLENGE.task}
        </p>

        {/* Stats row */}
        <div style={{ display:'flex', gap:14, marginBottom:18, flexWrap:'wrap' }}>
          <DCStat label="Team par"     value={DC_CHALLENGE.par} suffix="pts" />
          <DCStat label="Today's best" value={DC_CHALLENGE.best} suffix="pts" accent="var(--yellow)" />
          <DCStat label="Played today" value="287" suffix="reps" />
          <DCStat label="Your streak"  value="6" suffix="days" accent="var(--accent-2)" />
        </div>

        {/* Attempt rows (Wordle vibe) */}
        <div style={{ marginBottom:14 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
            <Kicker>Your attempts</Kicker>
            <span style={{ fontSize:11, color:'var(--text-dim)', fontFamily:'var(--font-mono)' }}>
              {state.attempts.length}/{DC_CHALLENGE.attempts_max}
            </span>
            <span style={{ flex:1 }}/>
            {bestScore > 0 && (
              <span style={{ fontSize:11, color:'var(--text-sub)' }}>
                best · <strong style={{ color: bestScore >= DC_CHALLENGE.par ? 'var(--green)' : 'var(--text)' }}>{bestScore}</strong>
              </span>
            )}
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {Array.from({ length: DC_CHALLENGE.attempts_max }).map((_, i) => {
              const a = state.attempts[i];
              const empty = !a;
              return (
                <div key={i} style={{
                  display:'flex', alignItems:'center', gap:12,
                  padding:'10px 12px', borderRadius:9,
                  background: empty ? 'transparent' : 'var(--card)',
                  border:`1px ${empty ? 'dashed' : 'solid'} ${empty ? 'var(--border)' : a.grade.score >= DC_CHALLENGE.par ? 'var(--green-border)' : 'var(--border)'}`,
                  opacity: empty && i > state.attempts.length ? 0.4 : 1
                }}>
                  <span style={{
                    width:24, height:24, borderRadius:6, flexShrink:0,
                    background: empty ? 'var(--card-alt)' : a.grade.score >= DC_CHALLENGE.par ? 'var(--green)' : 'var(--accent-light)',
                    color: empty ? 'var(--text-dim)' : a.grade.score >= DC_CHALLENGE.par ? '#0A2E24' : 'var(--accent)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontFamily:'var(--font-mono)', fontWeight:800, fontSize:11,
                    border:`1px solid ${empty ? 'var(--border)' : a.grade.score >= DC_CHALLENGE.par ? 'var(--green-border)' : 'var(--accent-border)'}`
                  }}>{i+1}</span>
                  {empty ? (
                    <span style={{ flex:1, fontSize:12, color:'var(--text-dim)', fontStyle:'italic' }}>
                      {i === state.attempts.length ? 'next attempt…' : 'locked'}
                    </span>
                  ) : (
                    <>
                      <span style={{ flex:1, fontSize:12, color:'var(--text-sub)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                        {a.text.length > 90 ? a.text.slice(0,90) + '…' : a.text}
                      </span>
                      <ScoreRow grade={a.grade} />
                      <span style={{
                        minWidth:42, textAlign:'right', fontFamily:'var(--font-mono)', fontWeight:800, fontSize:13,
                        color: a.grade.score >= DC_CHALLENGE.par ? 'var(--green)' : 'var(--text)'
                      }}>{a.grade.score}</span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Compose / Complete */}
        {!state.complete ? (
          <div>
            <textarea
              ref={taRef}
              value={draft} onChange={e => setDraft(e.target.value.slice(0, 500))}
              placeholder="Rewrite the prompt. Use Role · Task · Context · Format. ≤60 words."
              rows={4}
              disabled={grading}
              style={{
                width:'100%', resize:'vertical',
                background:'var(--card)', border:'1px solid var(--border)', borderRadius:10,
                padding:'12px 14px', fontSize:14, color:'var(--text)', outline:'none',
                fontFamily:'var(--font-body)', lineHeight:1.55,
                boxShadow:'inset 0 1px 0 0 rgba(255,255,255,0.02)'
              }}
              onFocus={e => e.target.style.borderColor = 'var(--accent-border)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
            <div style={{ display:'flex', alignItems:'center', gap:10, marginTop:10, flexWrap:'wrap' }}>
              <button onClick={useHint} disabled={state.hintsUsed >= DC_CHALLENGE.hints.length}
                style={{
                  background:'var(--card-alt)', border:'1px solid var(--border)',
                  color: state.hintsUsed >= DC_CHALLENGE.hints.length ? 'var(--text-dim)' : 'var(--accent)',
                  padding:'6px 11px', borderRadius:8, cursor: state.hintsUsed >= DC_CHALLENGE.hints.length ? 'default' : 'pointer',
                  fontSize:11, fontWeight:700, fontFamily:'inherit',
                  display:'inline-flex', alignItems:'center', gap:6
                }}>
                <IconLightbulb size={11} stroke="currentColor"/>
                Hint {state.hintsUsed}/{DC_CHALLENGE.hints.length}
                <span style={{ color:'var(--text-dim)', fontWeight:500 }}>· −5 pts</span>
              </button>
              <span style={{ fontSize:11, color:'var(--text-dim)', fontFamily:'var(--font-mono)' }}>
                {draft.length}/500
              </span>
              <span style={{ flex:1 }}/>
              <Btn icon={grading ? <IconCpu size={12}/> : <IconArrowR size={12}/>}
                onClick={submit} disabled={!draft.trim() || grading || remainingAttempts === 0}>
                {grading ? 'Coach grading…' : `Submit (${remainingAttempts} left)`}
              </Btn>
            </div>

            {/* Hint reveal stack */}
            {state.hintsUsed > 0 && (
              <div style={{ marginTop:12, display:'flex', flexDirection:'column', gap:6 }}>
                {DC_CHALLENGE.hints.slice(0, state.hintsUsed).map((h, i) => (
                  <div key={i} style={{
                    padding:'8px 12px', borderRadius:8,
                    background:'color-mix(in oklab, var(--yellow) 10%, var(--card))',
                    border:'1px solid var(--yellow-border)',
                    fontSize:12, color:'var(--text)', display:'flex', gap:8
                  }}>
                    <IconLightbulb size={12} stroke="var(--yellow)" style={{ flexShrink:0, marginTop:2 }}/>
                    <span style={{ lineHeight:1.45 }}>{h}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Last grade feedback (after first submit but not done) */}
            {lastAttempt && !state.complete && (
              <div style={{
                marginTop:14, padding:'12px 14px', borderRadius:10,
                background:'var(--card-alt)', border:'1px solid var(--border)'
              }}>
                <div style={{ fontSize:11, fontWeight:700, color:'var(--text-sub)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8 }}>
                  Coach feedback · attempt {state.attempts.length}
                </div>
                {lastAttempt.grade.hits.map(h => {
                  const r = DC_CHALLENGE.rubric.find(x => x.id === h.id);
                  return (
                    <div key={h.id} style={{ display:'flex', alignItems:'flex-start', gap:9, marginBottom:5, fontSize:12 }}>
                      {h.got ? <IconCheck size={12} stroke="var(--green)" style={{ marginTop:2, flexShrink:0 }}/>
                             : <IconClose size={12} stroke="var(--accent-2)" style={{ marginTop:2, flexShrink:0 }}/>}
                      <div style={{ flex:1 }}>
                        <span style={{ color:'var(--text)', fontWeight:600 }}>{r.label} · </span>
                        <span style={{ color:'var(--text-sub)' }}>{h.detail}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          // Complete state — Wordle-style recap
          <div style={{
            padding:'18px 20px', borderRadius:12,
            background:'linear-gradient(160deg, color-mix(in oklab, var(--green) 14%, var(--card)), var(--card))',
            border:'1px solid var(--green-border)'
          }}>
            <div style={{ display:'flex', alignItems:'flex-start', gap:14 }}>
              <div style={{
                width:54, height:54, borderRadius:14, flexShrink:0,
                background:'var(--green)', color:'#0A2E24',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontFamily:'var(--font-display)', fontSize:24, fontWeight:800
              }}>{bestScore}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{
                  fontFamily:'var(--font-display)', fontSize:20, fontWeight:700, letterSpacing:'-0.02em',
                  color:'var(--text)', marginBottom:4, lineHeight:1.2
                }}>
                  {bestScore >= DC_CHALLENGE.par
                    ? `Solved in ${state.attempts.findIndex(a => a.grade.score >= DC_CHALLENGE.par) + 1}/${DC_CHALLENGE.attempts_max}.`
                    : 'Three attempts up.'}
                </div>
                <div style={{ fontSize:12, color:'var(--text-sub)', marginBottom:10 }}>
                  {bestScore >= DC_CHALLENGE.par
                    ? `Above team par by ${bestScore - DC_CHALLENGE.par}. ${bestScore >= DC_CHALLENGE.best ? "You're today's best." : `Top score is ${DC_CHALLENGE.best}.`}`
                    : `Team par was ${DC_CHALLENGE.par}. Come back tomorrow — new challenge at 06:00.`}
                </div>
                <div style={{ display:'flex', gap:6, marginBottom:10 }}>
                  {state.attempts.map((a, i) => (
                    <ScoreRow key={i} grade={a.grade} />
                  ))}
                </div>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Btn size="sm" variant="soft" icon={<IconShare size={11}/>} onClick={() => setShowRecap(true)}>
                    Share recap
                  </Btn>
                  <Btn size="sm" variant="ghost" icon={<IconClock size={11}/>}>
                    Next drops in {nextDropIn()}
                  </Btn>
                  <Btn size="sm" variant="ghost" icon={<IconRefresh size={11}/>} onClick={reset}>
                    Replay
                  </Btn>
                </div>
              </div>
            </div>

            {showRecap && (
              <div style={{
                marginTop:14, padding:'12px 14px', borderRadius:10,
                background:'var(--bg)', border:'1px solid var(--border)',
                fontFamily:'var(--font-mono)', fontSize:12, color:'var(--text)', whiteSpace:'pre', lineHeight:1.6
              }}>
{`Brainstorm Daily #${DC_CHALLENGE.number}
${state.attempts.map(a => a.grade.hits.map(h => h.got ? '🟩' : '⬜').join('')).join('\n')}
${bestScore}/100 · ${state.attempts.length}/${DC_CHALLENGE.attempts_max} · 🔥 7-day streak`}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

const DCStat = ({ label, value, suffix, accent }) => (
  <div style={{
    flex:'1 1 110px', minWidth:110,
    padding:'10px 14px', borderRadius:10,
    background:'var(--card)', border:'1px solid var(--border)'
  }}>
    <div style={{ fontSize:10, color:'var(--text-dim)', textTransform:'uppercase', letterSpacing:'0.07em', fontWeight:700, marginBottom:4 }}>
      {label}
    </div>
    <div style={{ display:'flex', alignItems:'baseline', gap:5 }}>
      <span style={{
        fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, letterSpacing:'-0.02em',
        color: accent || 'var(--text)'
      }}>{value}</span>
      <span style={{ fontSize:11, color:'var(--text-dim)', fontFamily:'var(--font-mono)' }}>{suffix}</span>
    </div>
  </div>
);

const nextDropIn = () => {
  const now = new Date();
  const next = new Date(now);
  next.setHours(6, 0, 0, 0);
  if (next <= now) next.setDate(next.getDate() + 1);
  const ms = next - now;
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  return `${h}h ${m}m`;
};

window.BrDailyChallenge = { DailyChallenge, DC_CHALLENGE };
