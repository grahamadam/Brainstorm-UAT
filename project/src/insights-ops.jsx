// Insights — Operations scope (Workspace Admin)
// "Is the platform healthy? Where are we spending? Are integrations working?"

const InsightsOps = ({ filters }) => {
  const { InsightTile, Sparkline, RankedBars, NarrativeCard, InsightsSection } = window.BrInsightsCharts;
  const { Btn, Pill } = window.BrPrim;
  const { StatusPill } = window.BrSC;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
      <NarrativeCard
        headline="All systems green. Coach spend is trending 18% above forecast — pacing for an overage by Jul 14."
        body="Coach token usage is concentrated in the Strategic Tigers team — they're using Opus-class for routine drafting. Floor-pinning that team to Sonnet would save ≈$2,400/mo with no quality drop on their content profile. Want me to draft the policy override?"
        signals={['$18.4k spent · 30d', 'Tigers 38% of cost', '+18% vs forecast', 'Headroom 14d']}
        action="Draft override"/>

      {/* Health KPIs */}
      <InsightsSection kicker="Platform health" title="Operational snapshot"
        question="Is everything green?"
        padded={false}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12 }}>
          <InsightTile label="Uptime · 30d" value="99.98%" sub="SLA: 99.9% · all green" tone="pos"/>
          <InsightTile label="API errors · 24h" value="0.04%" sub="2,341 of 5.4M requests" delta="−0.01" tone="pos"
            spark={[0.07,0.06,0.05,0.05,0.04,0.04,0.04]}/>
          <InsightTile label="License utilization" value="142 / 150" sub="95% · 8 seats free" delta="+4" tone="warn"/>
          <InsightTile label="AI spend · 30d" value="$18.4k" sub="forecast $15.6k" delta="+18%" tone="warn"
            spark={[480,520,560,610,640,690,720]}/>
        </div>
      </InsightsSection>

      {/* Integration status */}
      <InsightsSection kicker="Integrations" title="Connection health"
        question="Are external services authenticated and flowing?">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {[
            { name:'Slack',            s:'ok',   last:'Live · last event 12s ago',   detail:'1,248 events · 24h' },
            { name:'Google Calendar',  s:'ok',   last:'Live · OAuth refresh in 4d',  detail:'342 holds placed · 24h' },
            { name:'Outlook 365',      s:'off',  last:'Not connected',                detail:'—' },
            { name:'Gong',             s:'ok',   last:'Synced 4 min ago',             detail:'128 calls ingested · 24h' },
            { name:'Salesforce',       s:'warn', last:'Throttled · retrying',         detail:'Rate-limit 24/min on Tigers' },
            { name:'Okta SSO + SCIM',  s:'ok',   last:'Synced 4 min ago',             detail:'142 users · 8 groups' },
          ].map((it, i) => (
            <div key={i} style={{
              display:'flex', alignItems:'center', gap:14, padding:'14px 16px',
              background:'var(--card-alt)', border:'1px solid var(--border)', borderRadius:'var(--radius-md)'
            }}>
              <div style={{
                width:36, height:36, borderRadius:8, background:'var(--card)',
                border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center',
                fontFamily:'var(--font-display)', fontWeight:800, color:'var(--text)', flexShrink:0
              }}>{it.name[0]}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>{it.name}</span>
                  {it.s==='ok'   && <StatusPill kind="ok"   text="Healthy"/>}
                  {it.s==='warn' && <StatusPill kind="warn" text="Throttled"/>}
                  {it.s==='off'  && <StatusPill kind="off"  text="Off"/>}
                </div>
                <div style={{ fontSize:11, color:'var(--text-sub)', marginTop:2 }}>{it.last}</div>
                <div style={{
                  fontSize:10.5, color:'var(--text-dim)', marginTop:4, fontFamily:'var(--font-mono)',
                  letterSpacing:'.04em'
                }}>{it.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </InsightsSection>

      {/* AI cost breakdown */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18, marginBottom:24 }}>
        <InsightsSection kicker="AI cost" title="Spend by team · last 30 days"
          question="Where is the AI budget actually going?">
          <RankedBars formatVal={v => `$${v.toLocaleString()}`} rows={[
            { label:'Strategic Tigers', value:7020, color:'var(--accent-2)' },
            { label:'Enterprise · West', value:3840, color:'var(--accent)' },
            { label:'RAs · East',        value:2960, color:'var(--accent)' },
            { label:'Mid-Market · Atlas',value:2210, color:'var(--accent-mid)' },
            { label:'SMB · Velocity',    value:1560, color:'var(--accent-mid)' },
            { label:'Enterprise · East', value:  820, color:'var(--text-dim)' },
          ]}/>
          <p style={{ fontSize:11.5, color:'var(--text-sub)', margin:'12px 0 0', lineHeight:1.5 }}>
            Tigers is 38% of org spend with 15% of seats. Their Coach default is Opus-class.
          </p>
        </InsightsSection>

        <InsightsSection kicker="AI cost" title="Spend by feature"
          question="Coach? Studio? Free-response grading?">
          <RankedBars formatVal={v => `$${v.toLocaleString()}`} rows={[
            { label:'Coach (chat)',          value:8400, color:'var(--accent)' },
            { label:'Studio (generation)',   value:4200, color:'var(--accent-mid)' },
            { label:'Free-response grading', value:3100, color:'var(--accent-mid)' },
            { label:'Daily challenge gen',   value:1700, color:'var(--accent-mid)' },
            { label:'Insights narrative',    value: 980, color:'var(--text-dim)' },
          ]}/>
        </InsightsSection>
      </div>

      {/* Activity / errors timeline */}
      <InsightsSection kicker="Recent events" title="Operational timeline · last 24h"
        question="What happened, and what needs my attention?"
        headerRight={<Btn variant="ghost" size="sm">Open audit log</Btn>}>
        <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
          {[
            { t:'12s ago', sev:'info', label:'Slack event delivered',     detail:'#gtm-ai · 1,248 events / 24h' },
            { t:'4 min',   sev:'info', label:'SCIM sync',                 detail:'2 users provisioned · 1 deactivated' },
            { t:'18 min',  sev:'warn', label:'Salesforce rate-limit',     detail:'Throttled at 24 req/min · auto-retry succeeded' },
            { t:'1h',      sev:'info', label:'AI policy edit',            detail:'Maya Patel: hallucination guard 60 → 75%' },
            { t:'3h',      sev:'crit', label:'Failed login burst',        detail:'14 attempts on 1 account from new IP · auto-locked' },
            { t:'6h',      sev:'info', label:'Backup completed',          detail:'Tenant snapshot · 1.4 GB · us-west-2' },
            { t:'18h',     sev:'info', label:'Daily challenge generated', detail:'12 challenges · grading routed to Sonnet' },
          ].map((e, i) => {
            const colors = {
              crit: 'var(--accent-2)',
              warn: '#FFE03F',
              info: 'var(--text-dim)',
            };
            return (
              <div key={i} style={{
                display:'grid', gridTemplateColumns:'70px 14px 1fr',
                gap:14, alignItems:'flex-start', padding:'12px 0',
                borderTop: i===0 ? 'none' : '1px solid var(--border-soft)'
              }}>
                <div style={{ fontSize:11, fontFamily:'var(--font-mono)', color:'var(--text-dim)' }}>{e.t}</div>
                <div style={{
                  width:8, height:8, borderRadius:'50%', background:colors[e.sev],
                  marginTop:6
                }}/>
                <div style={{ minWidth:0 }}>
                  <span style={{ fontSize:13, color:'var(--text)', fontWeight:600 }}>{e.label}</span>
                  <span style={{ fontSize:12, color:'var(--text-dim)', marginLeft:10 }}>· {e.detail}</span>
                </div>
              </div>
            );
          })}
        </div>
      </InsightsSection>

      {/* License & seat utilization */}
      <InsightsSection kicker="Licenses" title="Seat utilization"
        question="Are we paying for empty seats?">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 }}>
          <div>
            <div style={{
              padding:'18px 20px', background:'var(--card-alt)',
              border:'1px solid var(--border)', borderRadius:'var(--radius-md)'
            }}>
              <div style={{ display:'flex', alignItems:'baseline', gap:10, marginBottom:14 }}>
                <span style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:800, letterSpacing:'-0.02em', color:'var(--text)' }}>142</span>
                <span style={{ fontSize:13, color:'var(--text-sub)' }}>of 150 seats</span>
                <span style={{ marginLeft:'auto', fontSize:11, fontFamily:'var(--font-mono)', color:'var(--green)', fontWeight:700 }}>95%</span>
              </div>
              <div style={{ height:10, background:'var(--card)', borderRadius:999, overflow:'hidden', display:'flex' }}>
                <div style={{ width:'82%', background:'var(--green)' }}/>
                <div style={{ width:'8%',  background:'#FFE03F' }}/>
                <div style={{ width:'5%',  background:'var(--text-dim)' }}/>
                <div style={{ width:'5%',  background:'var(--card-alt)' }}/>
              </div>
              <div style={{ display:'flex', gap:14, marginTop:12, flexWrap:'wrap', fontSize:11 }}>
                <span style={{ color:'var(--green)' }}>● Active 124</span>
                <span style={{ color:'#FFE03F' }}>● Light 12</span>
                <span style={{ color:'var(--text-dim)' }}>● Dormant 6</span>
                <span style={{ color:'var(--text-dim)' }}>○ Free 8</span>
              </div>
            </div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <div style={{
              padding:'12px 14px', background:'var(--card-alt)',
              border:'1px solid var(--border)', borderRadius:8
            }}>
              <div style={{ fontSize:11, fontFamily:'var(--font-mono)', color:'var(--text-dim)', letterSpacing:'.06em', textTransform:'uppercase', fontWeight:700, marginBottom:6 }}>Reclaimable</div>
              <div style={{ fontSize:13, color:'var(--text)', lineHeight:1.5 }}>
                <strong>6 dormant seats</strong> · no activity 30+ days. Save <strong style={{ color:'var(--green)' }}>$540/mo</strong> by deactivating.
              </div>
              <Btn variant="ghost" size="sm" style={{ marginTop:8 }}>Review dormant</Btn>
            </div>
            <div style={{
              padding:'12px 14px', background:'var(--card-alt)',
              border:'1px solid var(--border)', borderRadius:8
            }}>
              <div style={{ fontSize:11, fontFamily:'var(--font-mono)', color:'var(--text-dim)', letterSpacing:'.06em', textTransform:'uppercase', fontWeight:700, marginBottom:6 }}>Renewal</div>
              <div style={{ fontSize:13, color:'var(--text)', lineHeight:1.5 }}>
                Plan renews <strong>Sep 14</strong>. Based on growth pace, recommend <strong>175 seats</strong> next term.
              </div>
            </div>
          </div>
        </div>
      </InsightsSection>
    </div>
  );
};

window.BrInsightsOps = { InsightsOps };
