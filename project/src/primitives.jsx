// Reusable primitives — wordmark, buttons, avatars, badges, cards.
const { useState, useEffect, useRef, useMemo, Fragment } = React;

const BrainstormMark = ({ size = 'md' }) => {
  const sizes = {
    sm: { mark: 26, gap: 8, type: 16, sub: 9 },
    md: { mark: 32, gap: 10, type: 20, sub: 10 },
    lg: { mark: 60, gap: 14, type: 42, sub: 11 }
  };
  const s = sizes[size];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: s.gap }}>
      <div style={{ position: 'relative', width: s.mark, height: s.mark }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 8,
          background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-mid) 50%, var(--accent-deep) 100%)',
          boxShadow: '0 0 0 1px color-mix(in oklab, var(--accent) 25%, transparent), 0 8px 24px -10px color-mix(in oklab, var(--accent) 55%, transparent)'
        }} />
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <img src="assets/gong-mark-white-cropped.png" alt="" width={s.mark * 0.6} height={s.mark * 0.6 * (1684 / 1550)} style={{ display: 'block', objectFit: "contain" }} />
        </div>
      </div>
      <div style={{ lineHeight: 1 }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: s.type, fontWeight: 700,
          letterSpacing: '-0.02em', color: 'var(--text)', lineHeight: 1,
          textTransform: 'uppercase'
        }}>
          BR<span style={{ color: 'var(--accent)', fontWeight: 800 }}>AI</span>NSTORM
        </div>
        {size === 'lg' &&
        <div style={{
          color: 'var(--text-dim)', fontSize: s.sub, marginTop: 6,
          letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500
        }}>by Gong</div>
        }
      </div>
    </div>);

};

const Btn = ({ children, onClick, variant = 'primary', size = 'md', icon, disabled, style, type = 'button', ...rest }) => {
  const sizes = { sm: { p: '7px 12px', fs: 12 }, md: { p: '10px 18px', fs: 13 }, lg: { p: '13px 22px', fs: 14 } };
  const s = sizes[size];
  const variants = {
    primary: { bg: 'linear-gradient(135deg, var(--accent), var(--accent-mid))', color: '#fff', border: 'transparent' },
    secondary: { bg: 'var(--card)', color: 'var(--text)', border: 'var(--border)' },
    ghost: { bg: 'transparent', color: 'var(--text-sub)', border: 'transparent' },
    soft: { bg: 'var(--accent-light)', color: 'var(--accent)', border: 'var(--accent-border)' },
    danger: { bg: 'transparent', color: '#F87171', border: 'var(--border)' }
  };
  const v = disabled ? { bg: 'var(--card-alt)', color: 'var(--text-dim)', border: 'var(--border)' } : variants[variant];
  return (
    <button type={type} onClick={onClick} disabled={disabled}
    style={{
      display: 'inline-flex', alignItems: 'center', gap: 7, background: v.bg, color: v.color,
      border: `1px solid ${v.border}`, borderRadius: 9, padding: s.p, fontSize: s.fs,
      fontWeight: 700, cursor: disabled ? 'default' : 'pointer', transition: 'transform .12s, filter .12s',
      ...style
    }}
    onMouseEnter={(e) => {if (!disabled && variant === 'primary') e.currentTarget.style.filter = 'brightness(1.08)';}}
    onMouseLeave={(e) => {e.currentTarget.style.filter = 'none';}}
    {...rest}>
      {icon}{children}
    </button>);

};

const Avatar = ({ initials, ac, size = 34, ring }) =>
<div style={{
  width: size, height: size, borderRadius: '50%',
  background: `${ac}22`, border: `1.5px solid ${ac}55`,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: size * 0.34, fontWeight: 700, color: ac, flexShrink: 0,
  boxShadow: ring ? `0 0 0 2px var(--bg), 0 0 0 4px ${ac}` : 'none'
}}>
    {initials}
  </div>;


const Card = ({ children, padding = 24, style, hoverable, onClick }) =>
<div onClick={onClick}
style={{
  background: 'var(--card)', border: '1px solid var(--border)',
  borderRadius: 'var(--radius)', padding,
  transition: 'border-color .15s, transform .15s',
  cursor: onClick ? 'pointer' : 'default',
  ...style
}}
onMouseEnter={(e) => {if (hoverable) e.currentTarget.style.borderColor = 'var(--accent-border)';}}
onMouseLeave={(e) => {if (hoverable) e.currentTarget.style.borderColor = 'var(--border)';}}>
    {children}
  </div>;


const Kicker = ({ children, color = 'var(--text-dim)' }) =>
<div style={{
  color, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase',
  fontWeight: 600, fontFamily: 'var(--font-body)'
}}>{children}</div>;


const Pill = ({ children, color = 'var(--accent)', bg = 'var(--accent-light)', border = 'var(--accent-border)', icon, style }) =>
<span style={{
  display: 'inline-flex', alignItems: 'center', gap: 5,
  background: bg, border: `1px solid ${border}`, borderRadius: 999,
  padding: '3px 10px', fontSize: 11, fontWeight: 700, color, ...style
}}>
    {icon}{children}
  </span>;


const ProgressBar = ({ value, max = 100, height = 6, gradient }) =>
<div style={{
  height, background: 'color-mix(in oklab, var(--accent) 18%, transparent)',
  borderRadius: 999, overflow: 'hidden'
}}>
    <div style={{
    width: `${Math.min(100, value / max * 100)}%`, height: '100%',
    background: gradient || 'linear-gradient(90deg, var(--accent-mid), var(--accent))',
    borderRadius: 999, transition: 'width .8s cubic-bezier(.2,.8,.2,1)'
  }} />
  </div>;


const StatTile = ({ label, value, sub, accent }) =>
<div style={{
  background: 'var(--card)', border: '1px solid var(--border)',
  borderRadius: 'var(--radius)', padding: '14px 16px'
}}>
    <div style={{ fontSize: 11, color: 'var(--text-sub)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>
      {label}
    </div>
    <div style={{
    fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800,
    color: accent || 'var(--text)', letterSpacing: '-0.025em', lineHeight: 1
  }}>{value}</div>
    {sub && <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 6 }}>{sub}</div>}
  </div>;


const SectionHeader = ({ kicker, title, sub, action }) =>
<div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 18 }}>
    <div>
      {kicker && <div style={{ marginBottom: 8 }}><Kicker>{kicker}</Kicker></div>}
      <h2 style={{
      margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700,
      fontSize: 28, letterSpacing: '-0.025em', color: 'var(--text)', lineHeight: 1.05
    }}>{title}</h2>
      {sub && <p style={{ margin: '8px 0 0', color: 'var(--text-sub)', fontSize: 14, lineHeight: 1.55 }}>{sub}</p>}
    </div>
    {action}
  </div>;


// Placeholder block — striped surface with monospace label
const PlaceholderBlock = ({ label, height = 160, style }) =>
<div style={{
  height, borderRadius: 'var(--radius)', border: '1px dashed var(--border)',
  background: 'repeating-linear-gradient(135deg, transparent 0 8px, color-mix(in oklab, var(--accent) 6%, transparent) 8px 9px)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.05em',
  ...style
}}>
    {label}
  </div>;


window.BrPrim = {
  BrainstormMark, Btn, Avatar, Card, Kicker, Pill, ProgressBar, StatTile, SectionHeader, PlaceholderBlock
};