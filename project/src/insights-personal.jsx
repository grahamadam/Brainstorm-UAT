// Insights — Personal scope (Individual Contributor)
// "How am I doing? Where am I strong/weak? Is this paying off in my actual work?"

const InsightsPersonal = ({ filters, user }) => {
  const { InsightTile, Sparkline, RankedBars, Heatmap, SkillRadar,
          Distribution, NarrativeCard, InsightsSection } = window.BrInsightsCharts;
  const { Btn } = window.BrPrim;

  // Hours x days heatmap of learning activity (Mon-Sun, 7am-7pm = 12 cols)
  const heatRows = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const heatCols = ['7','8','9','10','11','12','1','2','3','4','5','6'];
  const heatData = [
    [0,1,2,3,1,0,0,2,4,2,0,0],
    [0,2,3,2,0,0,1,3,5,3,1,0],
    [1,3,4,2,0,0,0,2,3,2,0,0],
    [0,2,3,3,1,0,0,3,5,4,1,0],
    [0,1,2,2,0,0,0,1,3,2,0,0],
    [0,0,0,0,0,0,0,0,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
  ];

  const skills = [
    { label:'Discovery',     value:78 },
    { label:'Demo',          value:62 },
    { label:'Objections',    value:55 },
    { label:'Multi-thread',  value:71 },
    { label:'Negotiation',   value:48 },
    { label:'AI prompting',  value:84 },
    { label:'Forecasting',   value:66 },
  ];

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
      <NarrativeCard
        headline={`You're 3 weeks ahead of your cohort on AI prompting — but Negotiation is your weakest skill.`}
        body="Your Discovery quizzes are scoring 12pt higher than your team average. Negotiation modules show repeat-attempts at 2.4× your other skills. The Coach can run a 5-min objection-handling drill right now if you want to close that gap before tomorrow's demos."
        signals={['+12pt vs team', 'AI prompting top 8%', 'Negotiation 48%', '3 ramps overdue']}
        action="Run drill"/>

      {/* KPI strip */}
      <InsightsSection kicker="Snapshot" title="My week at a glance"
        question="What's changed since last week?"
        padded={false}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12 }}>
          <InsightTile label="XP earned" value="+340" sub="vs +210 last week" delta="+62%" tone="pos"
            spark={[100,180,240,210,280,310,340]}/>
          <InsightTile label="Streak" value="7 days" sub="best: 14" tone="warn"
            spark={[1,1,1,1,1,1,1]}/>
          <InsightTile label="Quiz mastery" value="84%" sub="rolling 30d · target 80%" delta="+4pt" tone="pos"
            spark={[72,75,78,80,79,82,84]}/>
          <InsightTile label="Coach sessions" value="14" sub="3 follow-ups booked"
            spark={[2,3,2,4,3,5,4]}/>
        </div>
      </InsightsSection>

      {/* Skill radar + Distribution side-by-side */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18, marginBottom:24 }}>
        <InsightsSection kicker="Strengths" title="Skill radar"
          question="Where am I strong, where am I weak?">
          <div style={{ display:'grid', gridTemplateColumns:'auto 1fr', gap:18, alignItems:'center' }}>
            <SkillRadar skills={skills} size={210}/>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              {skills.slice().sort((a,b) => b.value - a.value).slice(0,3).map((s,i) => (
                <div key={i} style={{ fontSize:12 }}>
                  <span style={{ color:'var(--text-dim)', fontFamily:'var(--font-mono)', marginRight:8 }}>{i+1}</span>
                  <span style={{ color:'var(--text)', fontWeight:600 }}>{s.label}</span>
                  <span style={{ color:'var(--green)', marginLeft:8, fontWeight:700 }}>{s.value}</span>
                </div>
              ))}
              <div style={{ borderTop:'1px solid var(--border-soft)', margin:'8px 0' }}/>
              <div style={{
                fontSize:10.5, color:'var(--text-dim)', fontFamily:'var(--font-mono)',
                letterSpacing:'.08em', textTransform:'uppercase', fontWeight:700, marginBottom:4
              }}>Growth area</div>
              <div style={{ fontSize:12 }}>
                <span style={{ color:'var(--text)', fontWeight:600 }}>Negotiation</span>
                <span style={{ color:'var(--accent-2)', marginLeft:8, fontWeight:700 }}>48</span>
              </div>
              <Btn variant="secondary" size="sm" style={{ marginTop:8, alignSelf:'flex-start' }}>Open drill</Btn>
            </div>
          </div>
        </InsightsSection>

        <InsightsSection kicker="Distribution" title="Where I rank"
          question="Where do I sit vs the rest of my cohort?">
          <div style={{ marginBottom:14 }}>
            <Distribution buckets={[
              { label:'<50',  value: 4 },
              { label:'50s',  value: 9 },
              { label:'60s',  value:18 },
              { label:'70s',  value:32 },
              { label:'80s',  value:28, highlight:true },
              { label:'90s',  value:12 },
              { label:'100',  value: 2 },
            ]}/>
          </div>
          <div style={{
            display:'flex', alignItems:'center', gap:12, padding:'10px 12px',
            background:'var(--accent-light)', border:'1px solid var(--accent-border)',
            borderRadius:8
          }}>
            <span style={{
              fontFamily:'var(--font-display)', fontSize:18, fontWeight:800, color:'var(--accent)'
            }}>P78</span>
            <span style={{ fontSize:12, color:'var(--text-sub)', lineHeight:1.5 }}>
              Top quartile of <strong style={{ color:'var(--text)' }}>AE — Central</strong>. You're 6pt above cohort median.
            </span>
          </div>
        </InsightsSection>
      </div>

      {/* Activity heatmap */}
      <InsightsSection kicker="When I learn" title="Activity heatmap"
        question="When do I actually do my best work?">
        <div style={{ display:'flex', gap:24, alignItems:'flex-start', flexWrap:'wrap' }}>
          <Heatmap data={heatData} rowLabels={heatRows} colLabels={heatCols}/>
          <div style={{ flex:1, minWidth:200, fontSize:12.5, color:'var(--text-sub)', lineHeight:1.55 }}>
            <div style={{ color:'var(--text)', fontWeight:700, marginBottom:6 }}>Your peak window</div>
            <span style={{ fontFamily:'var(--font-mono)', color:'var(--accent)' }}>Tue · 2–4pm</span>
            <p style={{ margin:'8px 0 0' }}>
              You retain 23% more when you learn here. Want Brainstorm to auto-block this slot on your calendar each week?
            </p>
            <Btn variant="secondary" size="sm" style={{ marginTop:12 }}>Block Tue 2-4pm</Btn>
          </div>
        </div>
      </InsightsSection>

      {/* Behavior change — learning -> field */}
      <InsightsSection kicker="Field impact" title="Did learning change what I do?"
        question="Are the behaviors I'm learning showing up in my actual calls and CRM?">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12 }}>
          {[
            { metric:'Discovery questions per call', before:'4.2', after:'7.1', delta:'+69%', sig:'Gong AI' },
            { metric:'MEDDPICC fields completed', before:'3.8 / 8', after:'6.4 / 8', delta:'+68%', sig:'Salesforce' },
            { metric:'AI Coach used in pre-call prep', before:'12%', after:'71%', delta:'+59pt', sig:'Brainstorm' },
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

      {/* Recent quizzes ranked */}
      <InsightsSection kicker="Mastery" title="My quiz scores by topic"
        question="Which topics am I crushing — and which need a retake?">
        <RankedBars formatVal={v => `${v}%`} rows={[
          { label:'Prompt patterns',   value:94, color:'var(--green)' },
          { label:'Discovery',         value:88, color:'var(--green)' },
          { label:'Multi-thread',      value:82, color:'var(--accent)' },
          { label:'Demo storytelling', value:76, color:'var(--accent)' },
          { label:'Forecasting',       value:71, color:'var(--accent-mid)' },
          { label:'Objections',        value:62, color:'#FFE03F' },
          { label:'Negotiation',       value:48, color:'var(--accent-2)' },
        ]}/>
      </InsightsSection>
    </div>
  );
};

window.BrInsightsPersonal = { InsightsPersonal };
