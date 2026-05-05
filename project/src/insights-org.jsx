// Insights — Org scope (CRO / VP / Department Head)
// "Is this whole program working? What do I report up?"

const InsightsOrg = ({ filters }) => {
  const { InsightTile, Sparkline, RankedBars, Heatmap, Funnel,
          NarrativeCard, InsightsSection } = window.BrInsightsCharts;
  const { Btn, Pill } = window.BrPrim;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
      <NarrativeCard
        headline={`Pipeline from learning-active reps is up 23% QoQ. Two teams are dragging the average — both fixable.`}
        body="Reps active in Brainstorm in the last 30 days created $4.2M more pipeline than baseline cohorts (n=384, p<0.05). Strategic Tigers and Enterprise East are pulling org-wide adoption from 88% to 79%. Their managers haven't assigned a quest in 14 days. One nudge would close most of the gap."
        signals={['+23% QoQ pipeline', '79% activation', '2 teams dragging', '14 days since last assign']}
        action="Nudge managers"/>

      {/* Hero KPIs — what the CRO actually wants */}
      <InsightsSection kicker="Quarterly summary" title="GTM org · Q2"
        question="The four numbers I'd put on the CRO's desk."
        padded={false}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12 }}>
          <InsightTile label="Active learners" value="384 / 412" sub="93% activation · target 90%" delta="+6pt" tone="pos"
            spark={[78,82,85,87,88,91,93]}/>
          <InsightTile label="Avg level" value="2.3" sub="up from 1.8 in Q1" delta="+28%" tone="pos"
            spark={[1.8,1.9,2.0,2.1,2.1,2.2,2.3]}/>
          <InsightTile label="Pipeline lift" value="+$4.2M" sub="active vs baseline · 90d" delta="+23% QoQ" tone="pos"
            spark={[1.2,1.8,2.4,2.9,3.3,3.8,4.2]}/>
          <InsightTile label="Ramp time" value="68 days" sub="new hire · target 90" delta="−24%" tone="pos"
            spark={[92,88,82,78,74,71,68]}/>
        </div>
      </InsightsSection>

      {/* Adoption by team — bigger, more interactive */}
      <InsightsSection kicker="Adoption" title="Adoption by team"
        question="Who's leading? Who needs help?"
        headerRight={<Btn variant="ghost" size="sm">View all teams</Btn>}>
        <RankedBars formatVal={v => `${v}%`}
          rows={[
            { label:'Enterprise · West',  value:96, target:90, color:'var(--green)' },
            { label:'SMB · Velocity',     value:91, target:90, color:'var(--green)' },
            { label:'Mid-Market · Atlas', value:82, target:90, color:'var(--accent)' },
            { label:'RAs · East',         value:79, target:90, color:'#FFE03F' },
            { label:'Enterprise · East',  value:71, target:90, color:'#FFE03F' },
            { label:'Strategic · Tigers', value:64, target:90, color:'var(--accent-2)' },
          ]}/>
        <p style={{
          fontSize:11, color:'var(--text-dim)', margin:'14px 0 0', fontFamily:'var(--font-mono)',
          letterSpacing:'.04em'
        }}>
          Vertical line marks the 90% target. Grey marker on each row.
        </p>
      </InsightsSection>

      {/* Behavioral outcomes — the proof */}
      <InsightsSection kicker="Field impact" title="Did learning change behavior?"
        question="The whole point: are reps actually doing it differently?">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12 }}>
          {[
            { metric:'Reps using AI in pre-call prep',  before:'42%',     after:'78%',      delta:'+36pt', sig:'Brainstorm' },
            { metric:'AI-drafted emails sent / week',    before:'820',     after:'2,140',    delta:'+161%', sig:'Outreach' },
            { metric:'Forecast accuracy (Gong AI)',      before:'71%',     after:'84%',      delta:'+13pt', sig:'Gong' },
            { metric:'Discovery questions per call',     before:'4.2',     after:'7.1',      delta:'+69%',  sig:'Gong' },
            { metric:'MEDDPICC field completeness',      before:'48%',     after:'76%',      delta:'+28pt', sig:'Salesforce' },
            { metric:'Multi-thread on enterprise opps',  before:'2.8',     after:'4.6',      delta:'+64%',  sig:'Salesforce' },
          ].map((r, i) => (
            <div key={i} style={{
              padding:'18px 20px', borderRadius:'var(--radius-md)',
              background:'var(--card-alt)', border:'1px solid var(--border)'
            }}>
              <div style={{ fontSize:11.5, color:'var(--text-sub)', marginBottom:10, lineHeight:1.4, minHeight:32 }}>
                {r.metric}
              </div>
              <div style={{ display:'flex', alignItems:'baseline', gap:8, flexWrap:'wrap' }}>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--text-dim)', textDecoration:'line-through' }}>{r.before}</span>
                <span style={{
                  fontFamily:'var(--font-display)', fontSize:24, fontWeight:800, color:'var(--text)', letterSpacing:'-0.02em'
                }}>{r.after}</span>
                <span style={{ fontSize:11.5, color:'var(--green)', fontWeight:700 }}>{r.delta}</span>
              </div>
              <div style={{
                fontFamily:'var(--font-mono)', fontSize:9.5, color:'var(--text-dim)',
                marginTop:10, letterSpacing:'.08em', textTransform:'uppercase'
              }}>Signal · {r.sig}</div>
            </div>
          ))}
        </div>
      </InsightsSection>

      {/* Cohort retention table */}
      <InsightsSection kicker="Cohorts" title="New hire ramp by cohort"
        question="Are recent hires ramping faster than older ones?">
        <div style={{
          display:'grid', gridTemplateColumns:'140px repeat(6, 1fr)',
          fontSize:11, fontFamily:'var(--font-mono)', letterSpacing:'.06em',
          textTransform:'uppercase', color:'var(--text-dim)',
          padding:'4px 0 8px', borderBottom:'1px solid var(--border-soft)'
        }}>
          <div>Cohort</div>
          <div style={{ textAlign:'center' }}>Day 7</div>
          <div style={{ textAlign:'center' }}>Day 14</div>
          <div style={{ textAlign:'center' }}>Day 30</div>
          <div style={{ textAlign:'center' }}>Day 60</div>
          <div style={{ textAlign:'center' }}>Day 90</div>
          <div style={{ textAlign:'center' }}>To quota</div>
        </div>
        {[
          { c:'Jan 2026 · 14',  d:[100, 92, 86, 78, 71], q:'71d' },
          { c:'Oct 2025 · 22',  d:[100, 88, 81, 74, 68], q:'68d' },
          { c:'Jul 2025 · 18',  d:[100, 84, 76, 68, 62], q:'76d' },
          { c:'Apr 2025 · 16',  d:[100, 80, 70, 64, 58], q:'82d' },
          { c:'Jan 2025 · 19',  d:[100, 78, 68, 60, 56], q:'88d' },
        ].map((r, i) => (
          <div key={i} style={{
            display:'grid', gridTemplateColumns:'140px repeat(6, 1fr)',
            padding:'10px 0', borderBottom: i===4 ? 'none' : '1px solid var(--border-soft)',
            alignItems:'center'
          }}>
            <div style={{ fontSize:13, color:'var(--text)', fontWeight:600 }}>{r.c}</div>
            {r.d.map((v, j) => {
              const o = 0.10 + (v/100) * 0.85;
              return (
                <div key={j} style={{
                  marginInline:4, height:30, borderRadius:6,
                  background: `color-mix(in oklab, var(--accent) ${o*100}%, transparent)`,
                  border:'1px solid var(--border)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text)', fontWeight:700
                }}>{v}%</div>
              );
            })}
            <div style={{
              marginInline:4, fontSize:13, fontFamily:'var(--font-mono)', textAlign:'center',
              color: parseInt(r.q) <= 75 ? 'var(--green)' : 'var(--text-sub)', fontWeight:700
            }}>{r.q}</div>
          </div>
        ))}
        <p style={{ fontSize:12, color:'var(--text-sub)', margin:'14px 0 0', lineHeight:1.5 }}>
          Newer cohorts are reaching quota <strong style={{ color:'var(--green)' }}>17 days faster</strong> than 2025 averages. Curriculum changes from Q4 are working.
        </p>
      </InsightsSection>

      {/* Top performer profile + intervention queue */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18, marginBottom:24 }}>
        <InsightsSection kicker="Top performers" title="What top reps do differently"
          question="Pattern from your top decile (n=39).">
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {[
              { what:'Use Coach in pre-call prep', them:'92%', rest:'48%' },
              { what:'Complete one quest per week',them:'88%', rest:'34%' },
              { what:'Apply within 48h of mastery',them:'81%', rest:'42%' },
              { what:'Retake quiz after 1 wrong',  them:'76%', rest:'29%' },
              { what:'Score ≥85 on first attempt', them:'73%', rest:'38%' },
            ].map((r, i) => (
              <div key={i} style={{
                display:'grid', gridTemplateColumns:'1fr 70px 70px',
                gap:12, padding:'10px 12px', alignItems:'center',
                background:'var(--card-alt)', border:'1px solid var(--border)',
                borderRadius:8
              }}>
                <span style={{ fontSize:12.5, color:'var(--text)', fontWeight:600 }}>{r.what}</span>
                <span style={{ textAlign:'right', fontFamily:'var(--font-mono)', fontSize:12, color:'var(--green)', fontWeight:700 }}>{r.them}</span>
                <span style={{ textAlign:'right', fontFamily:'var(--font-mono)', fontSize:12, color:'var(--text-dim)' }}>{r.rest}</span>
              </div>
            ))}
          </div>
          <div style={{
            marginTop:14, fontSize:11, fontFamily:'var(--font-mono)',
            color:'var(--text-dim)', letterSpacing:'.06em', textTransform:'uppercase',
            display:'flex', justifyContent:'space-between'
          }}>
            <span>Top decile</span><span>Everyone else</span>
          </div>
        </InsightsSection>

        <InsightsSection kicker="Action queue" title="Recommended interventions"
          question="What should I act on this week?">
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {[
              { who:'Strategic Tigers', what:'No quest assigned in 14 days', sev:'crit', cta:'Assign quest' },
              { who:'4 reps',           what:'Inactive 7+ days · streak loss imminent', sev:'warn', cta:'Send nudge' },
              { who:'12 reps',          what:'Stuck on M05 (hallucinations)', sev:'warn', cta:'Open M05' },
              { who:'Atlas team',       what:'Avg score below 70 for 3 weeks', sev:'warn', cta:'Coach session' },
              { who:'2 reps',           what:'Anomalous streak pattern · review', sev:'crit', cta:'Review' },
            ].map((r, i) => {
              const colors = {
                crit: { bg:'rgba(255,35,112,0.08)', bd:'rgba(255,35,112,0.30)', dot:'var(--accent-2)' },
                warn: { bg:'rgba(255,224,63,0.06)', bd:'rgba(255,224,63,0.25)', dot:'#FFE03F' },
                info: { bg:'var(--card-alt)',       bd:'var(--border)',         dot:'var(--text-dim)' },
              }[r.sev];
              return (
                <div key={i} style={{
                  display:'flex', alignItems:'center', gap:10,
                  padding:'10px 12px', borderRadius:8,
                  background:colors.bg, border:`1px solid ${colors.bd}`
                }}>
                  <span style={{ width:6, height:6, borderRadius:'50%', background:colors.dot, flexShrink:0 }}/>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:12.5, fontWeight:700, color:'var(--text)' }}>{r.who}</div>
                    <div style={{ fontSize:11, color:'var(--text-sub)', marginTop:1 }}>{r.what}</div>
                  </div>
                  <Btn variant="ghost" size="sm">{r.cta}</Btn>
                </div>
              );
            })}
          </div>
        </InsightsSection>
      </div>

      {/* Activity heatmap — org-level */}
      <InsightsSection kicker="Rhythm" title="When the org learns"
        question="When are reps actually engaging — and is that the time we want them selling?">
        <Heatmap
          rowLabels={['Mon','Tue','Wed','Thu','Fri','Sat','Sun']}
          colLabels={['7','8','9','10','11','12','1','2','3','4','5','6']}
          data={[
            [12, 38, 64, 42,  8,  2,  4, 22, 58, 36, 14,  4],
            [18, 44, 72, 48, 10,  2,  6, 28, 64, 42, 16,  6],
            [16, 40, 68, 44, 10,  2,  6, 26, 60, 40, 14,  6],
            [22, 48, 76, 52, 12,  4,  8, 32, 70, 46, 18,  8],
            [14, 36, 60, 38,  8,  2,  4, 20, 52, 32, 12,  4],
            [ 0,  2,  4,  6,  4,  2,  0,  4,  8,  4,  2,  0],
            [ 0,  0,  2,  2,  0,  0,  0,  0,  2,  0,  0,  0],
          ]}/>
        <p style={{ fontSize:12, color:'var(--text-sub)', margin:'14px 0 0', lineHeight:1.5 }}>
          Peak: <strong style={{ color:'var(--text)' }}>Thu 9am &amp; Tue–Thu 2–4pm</strong>. Wisely or not, learning is concentrated outside customer-facing hours.
        </p>
      </InsightsSection>
    </div>
  );
};

window.BrInsightsOrg = { InsightsOrg };
