// Level-up celebration moment — multiple variants
const { useState: useStateCel, useEffect: useEffectCel } = React;

const LevelUpCelebration = ({ open, onClose, variant = 'cinematic', toLevel = 3 }) => {
  const { Btn, BrainstormMark } = window.BrPrim;
  const { IconClose, IconBolt, IconSpark, IconStar } = window.BrIcons;
  const { LEVELS } = window.BrData;

  const [phase, setPhase] = useStateCel(0);
  useEffectCel(() => {
    if (!open) { setPhase(0); return; }
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [open]);

  if (!open) return null;
  const lvl = LEVELS.find(l => l.num === toLevel) || LEVELS[2];

  // Confetti / particles
  const particles = Array.from({ length:50 }).map((_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2.5 + Math.random() * 2,
    color: ['var(--accent)', 'var(--accent-2)', 'var(--green)', '#FFD166'][i % 4],
    size: 6 + Math.random() * 8,
    rotate: Math.random() * 360
  }));

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:200,
      background: variant === 'minimal' ? 'rgba(10, 6, 18, 0.85)' : 'radial-gradient(ellipse at center, color-mix(in oklab, var(--accent) 25%, transparent), rgba(10, 6, 18, 0.96) 60%)',
      backdropFilter:'blur(8px)',
      display:'flex', alignItems:'center', justifyContent:'center',
      animation:'bs-fade 0.4s ease-out'
    }}>
      {/* Close */}
      <button onClick={onClose} style={{
        position:'absolute', top:24, right:24, width:36, height:36, borderRadius:9,
        background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)',
        color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'
      }}>
        <IconClose size={14} stroke="currentColor"/>
      </button>

      {/* Confetti */}
      {variant !== 'minimal' && particles.map((p, i) => (
        <div key={i} style={{
          position:'absolute', top:0, left:`${p.left}%`,
          width:p.size, height:p.size * (variant === 'cinematic' ? 1 : 0.4),
          background:p.color, borderRadius: variant === 'cinematic' ? '2px' : '999px',
          animation:`bs-confetti-fall ${p.duration}s ${p.delay}s linear forwards`,
          transform:`rotate(${p.rotate}deg)`
        }}/>
      ))}

      {/* Orbiting glyphs (cinematic only) */}
      {variant === 'cinematic' && phase >= 1 && (
        <div style={{ position:'absolute', top:'50%', left:'50%' }}>
          {['✦', '⚡', '◆', '✶', '●', '◇'].map((g, i) => (
            <div key={i} style={{
              position:'absolute', top:0, left:0,
              fontSize:18, color:'var(--accent)',
              animation:`bs-orbit ${4 + i * 0.4}s linear infinite`,
              animationDelay:`${i * -0.7}s`,
              opacity:0.7
            }}>{g}</div>
          ))}
        </div>
      )}

      {/* Center content */}
      <div className="bs-rise" style={{
        position:'relative', textAlign:'center', maxWidth:520, padding:'0 32px'
      }}>
        {/* Mark */}
        <div style={{
          width:128, height:128, margin:'0 auto 30px', position:'relative',
          animation: phase >= 1 ? 'bs-glow 2s ease-in-out infinite' : 'none'
        }}>
          <div style={{
            position:'absolute', inset:0, borderRadius:32,
            background:'linear-gradient(135deg, var(--accent), var(--accent-mid), var(--accent-deep))',
            display:'flex', alignItems:'center', justifyContent:'center',
            transform: phase >= 1 ? 'scale(1)' : 'scale(0.6)',
            transition:'transform 0.8s cubic-bezier(.16,1,.3,1)',
            boxShadow:'0 30px 80px -20px color-mix(in oklab, var(--accent) 60%, transparent)'
          }}>
            <span style={{
              fontFamily:'var(--font-display)', fontSize:80, fontWeight:800,
              color:'#fff', lineHeight:1, letterSpacing:'-0.04em'
            }}>{toLevel}</span>
          </div>
          {/* Ring */}
          <div style={{
            position:'absolute', inset:-12, borderRadius:'50%',
            border:'2px solid var(--accent)', opacity: phase >= 1 ? 0.4 : 0,
            transition:'opacity 0.6s'
          }}/>
        </div>

        <div style={{
          fontSize:11, fontWeight:800, color:'var(--accent)',
          letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:12,
          opacity: phase >= 1 ? 1 : 0, transition:'opacity .5s .4s'
        }}>Level up</div>

        <h1 style={{
          fontFamily:'var(--font-display)', fontSize:'clamp(2.5rem, 6vw, 4rem)',
          fontWeight:700, letterSpacing:'-0.035em', lineHeight:1, margin:'0 0 14px',
          color:'#fff',
          opacity: phase >= 1 ? 1 : 0, transform: phase >= 1 ? 'translateY(0)' : 'translateY(12px)',
          transition:'all .6s .5s cubic-bezier(.16,1,.3,1)'
        }}>You're a {lvl.name}.</h1>

        <p style={{
          fontFamily:'var(--font-display)', fontSize:18, color:'rgba(255,255,255,0.75)',
          margin:'0 0 32px', lineHeight:1.5, fontWeight:500,
          opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? 'translateY(0)' : 'translateY(8px)',
          transition:'all .5s .2s'
        }}>{lvl.selfDesc}</p>

        {/* Unlocked items */}
        {variant !== 'minimal' && (
          <div style={{
            display:'flex', gap:8, justifyContent:'center', marginBottom:32, flexWrap:'wrap',
            opacity: phase >= 2 ? 1 : 0, transition:'opacity .5s .4s'
          }}>
            {[
              { icon:'🏆', label:'Practitioner badge' },
              { icon:'🔓', label:'AI 201 unlocked' },
              { icon:'🎁', label:'+500 XP bonus' }
            ].map((u, i) => (
              <div key={i} style={{
                background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.14)',
                borderRadius:999, padding:'7px 14px', fontSize:12,
                display:'inline-flex', alignItems:'center', gap:8, color:'#fff', fontWeight:600
              }}>
                <span>{u.icon}</span><span>{u.label}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{
          display:'flex', gap:10, justifyContent:'center',
          opacity: phase >= 2 ? 1 : 0, transition:'opacity .5s .6s'
        }}>
          <Btn onClick={onClose} icon={<IconBolt size={13}/>}>Continue learning</Btn>
          <Btn variant="secondary" onClick={onClose} style={{ background:'rgba(255,255,255,0.08)', borderColor:'rgba(255,255,255,0.16)', color:'#fff' }}>Share with team</Btn>
        </div>
      </div>
    </div>
  );
};

window.BrCelebration = { LevelUpCelebration };
