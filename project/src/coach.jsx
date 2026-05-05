// AI Coach drawer — always reachable. Floating button bottom-right.
const { useState: useStateCoach, useRef: useRefCoach, useEffect: useEffectCoach } = React;

const COACH_SUGGESTIONS = [
"What's the four-part frame again?",
"Quiz me on hallucinations",
"Help me write a prompt for my Acme call",
"Show me an example of 'show, don't tell'"];


const COACH_REPLIES = {
  default: "I'm your Brainstorm coach. I can quiz you, help you problem solve, or explain anything in the curriculum. Try one of the prompts below or ask me anything.",
  frame: "Role · Task · Context · Format. Tell the model who it is, what to do, what only you know, and how to shape the answer. Most weak prompts are missing Context — that's where you have the unfair advantage.",
  quiz: "Here's one: A teammate writes 'Help me prep for my Acme call' and gets a generic output. Which part of the four-part frame is most likely missing? (a) Role (b) Context (c) Format (d) Task — reply with a letter.",
  acme: "Quick draft. Open with the friction you heard last call (their pipeline drift problem). One claim that maps to it. One specific ask. Want me to write it?",
  show: "Paste two outputs you already love before asking for a third. The model will pattern-match better than any adjective. Want me to mock that out with one of your saved emails?"
};

function pickReply(text) {
  const t = text.toLowerCase();
  if (/four|frame|rtcf|role|context|format/.test(t)) return COACH_REPLIES.frame;
  if (/quiz|test|check/.test(t)) return COACH_REPLIES.quiz;
  if (/acme|call|prep|email/.test(t)) return COACH_REPLIES.acme;
  if (/show|example|sample/.test(t)) return COACH_REPLIES.show;
  return COACH_REPLIES.default;
}

const TypingDots = () =>
<span style={{ display: 'inline-flex', gap: 3, alignItems: 'center', height: 14 }}>
    {[0, 1, 2].map((i) =>
  <span key={i} style={{
    width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)',
    animation: 'bs-typing 1.2s infinite', animationDelay: `${i * 0.15}s`
  }} />
  )}
  </span>;


const Coach = ({ open, setOpen, contextChip, locked, lockedReason }) => {
  const { IconClose, IconSend, IconBolt, IconSpark, IconLock } = window.BrIcons;
  const [messages, setMessages] = useStateCoach([
  { from: 'coach', text: COACH_REPLIES.default }]
  );
  const [input, setInput] = useStateCoach('');
  const [thinking, setThinking] = useStateCoach(false);
  const scrollRef = useRefCoach(null);

  useEffectCoach(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, thinking]);

  const send = (text) => {
    const t = text || input;
    if (!t.trim()) return;
    setMessages((m) => [...m, { from: 'you', text: t }]);
    setInput('');
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'coach', text: pickReply(t) }]);
      setThinking(false);
    }, 900);
  };

  return (
    <>
      {/* Floating action button */}
      <button onClick={() => setOpen(!open)}
      title={locked ? (lockedReason || 'Coach is unavailable during knowledge checks') : undefined}
      style={{
        position: 'fixed', right: 20, bottom: 20, zIndex: 42,
        width: 54, height: 54, borderRadius: '50%', border: 'none', cursor: 'pointer',
        background: locked
          ? 'var(--card-alt)'
          : 'linear-gradient(135deg, var(--accent), var(--accent-mid))',
        color: locked ? 'var(--text-dim)' : '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: locked
          ? '0 6px 20px -8px rgba(0,0,0,0.5), 0 0 0 1px var(--border)'
          : '0 12px 32px -8px color-mix(in oklab, var(--accent) 60%, transparent), 0 0 0 1px color-mix(in oklab, var(--accent) 30%, transparent)',
        transition: 'transform .2s'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
        {open ? <IconClose size={22} /> : (locked ? <IconLock size={20} /> : <IconSpark size={22} />)}
        {!open && !locked &&
        <span style={{
          position: 'absolute', top: -2, right: -2, width: 14, height: 14, borderRadius: '50%',
          background: 'var(--accent-2)', border: '2px solid var(--bg)'
        }} />
        }
      </button>

      {/* Drawer */}
      <div style={{
        position: 'fixed', right: 20, bottom: 84, zIndex: 41,
        width: 380, maxWidth: 'calc(100vw - 40px)', height: 520, maxHeight: 'calc(100vh - 120px)',
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 18, display: 'flex', flexDirection: 'column',
        boxShadow: '0 30px 80px -20px rgba(0,0,0,0.6)',
        transform: open ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.96)',
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity .2s, transform .2s'
      }}>
        {/* Header */}
        <div style={{
          padding: '14px 16px', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', gap: 10
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: locked
              ? 'var(--card-alt)'
              : 'linear-gradient(135deg, var(--accent), var(--accent-mid))',
            border: locked ? '1px solid var(--border)' : 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: locked ? 'var(--text-sub)' : '#fff'
          }}>{locked ? <IconLock size={15}/> : <IconSpark size={16} />}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text)' }}>Coach</div>
            <div style={{ fontSize: 11, color: 'var(--text-sub)', display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: locked ? 'var(--text-dim)' : 'var(--green)' }} />
              {locked ? 'Paused for this assessment' : "I'm here to help!"}
            </div>
          </div>
          <button onClick={() => setOpen(false)} style={{
            background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer',
            padding: 6, borderRadius: 6
          }}><IconClose size={14} /></button>
        </div>

        {locked ? (
          /* Locked-during-assessment state */
          <div style={{ flex:1, padding:'28px 22px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', gap:14 }}>
            <div style={{
              width:64, height:64, borderRadius:16,
              background:'var(--card-alt)', border:'1px solid var(--border)',
              display:'flex', alignItems:'center', justifyContent:'center',
              color:'var(--text-sub)'
            }}>
              <IconLock size={26}/>
            </div>
            <div style={{ fontSize:15, fontWeight:700, color:'var(--text)' }}>
              Coach is paused
            </div>
            <div style={{ fontSize:12.5, color:'var(--text-sub)', lineHeight:1.55, maxWidth:280 }}>
              {lockedReason || 'To keep knowledge checks honest, the Coach is unavailable while an assessment is in progress. It\u2019ll be back the moment you submit.'}
            </div>
            <div style={{
              marginTop:6, fontSize:10.5, fontFamily:'var(--font-mono)',
              color:'var(--text-dim)', letterSpacing:'.06em', textTransform:'uppercase'
            }}>
              Academic integrity · Auto-resumes after submit
            </div>
          </div>
        ) : (
          <>
        {/* Context chip */}
        {contextChip &&
        <div style={{ padding: '10px 16px 0' }}>
            <div style={{
            fontSize: 11, color: 'var(--text-sub)',
            background: 'var(--card-alt)', border: '1px dashed var(--border)',
            borderRadius: 8, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6
          }}>
              <IconBolt size={11} />
              <span>Context: <strong style={{ color: 'var(--text)', fontWeight: 600 }}>{contextChip}</strong></span>
            </div>
          </div>
        }

        {/* Messages */}
        <div ref={scrollRef} style={{ flex: 1, overflow: 'auto', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {messages.map((m, i) =>
          <div key={i} style={{
            alignSelf: m.from === 'you' ? 'flex-end' : 'flex-start',
            maxWidth: '85%', display: 'flex', gap: 8, alignItems: 'flex-start'
          }}>
              {m.from === 'coach' &&
            <div style={{
              width: 24, height: 24, borderRadius: 6, flexShrink: 0,
              background: 'linear-gradient(135deg, var(--accent), var(--accent-mid))',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
            }}><IconSpark size={11} /></div>
            }
              <div style={{
              background: m.from === 'you' ? 'var(--accent-light)' : 'var(--card)',
              border: `1px solid ${m.from === 'you' ? 'var(--accent-border)' : 'var(--border)'}`,
              borderRadius: 11, padding: '9px 12px', fontSize: 13, lineHeight: 1.55,
              color: 'var(--text)'
            }}>
                {m.text}
              </div>
            </div>
          )}
          {thinking &&
          <div style={{ alignSelf: 'flex-start', display: 'flex', gap: 8 }}>
              <div style={{
              width: 24, height: 24, borderRadius: 6, flexShrink: 0,
              background: 'linear-gradient(135deg, var(--accent), var(--accent-mid))',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
            }}><IconSpark size={11} /></div>
              <div style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 11, padding: '10px 12px'
            }}>
                <TypingDots />
              </div>
            </div>
          }
        </div>

        {/* Suggestions */}
        {messages.length <= 1 &&
        <div style={{ padding: '4px 12px 0', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {COACH_SUGGESTIONS.map((s) =>
          <button key={s} onClick={() => send(s)} style={{
            background: 'var(--card-alt)', border: '1px solid var(--border)',
            borderRadius: 999, padding: '5px 10px', fontSize: 11, color: 'var(--text-sub)',
            cursor: 'pointer'
          }}>{s}</button>
          )}
          </div>
        }

        {/* Input */}
        <form onSubmit={(e) => {e.preventDefault();send();}} style={{
          padding: 12, borderTop: '1px solid var(--border)', display: 'flex', gap: 8
        }}>
          <input value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the coach anything…"
          style={{
            flex: 1, background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 9, padding: '9px 12px', fontSize: 13, outline: 'none'
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent-border)'}
          onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'} />
          <button type="submit" style={{
            background: 'linear-gradient(135deg, var(--accent), var(--accent-mid))',
            color: '#fff', border: 'none', borderRadius: 9, padding: '0 12px', cursor: 'pointer'
          }}><IconSend size={14} /></button>
        </form>
        </>
        )}
      </div>
    </>);

};

window.BrCoach = { Coach };