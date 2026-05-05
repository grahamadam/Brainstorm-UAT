// Insights — Enablement scope (Content health)
// "What's working? What's failing? Where are the gaps in my curriculum?"

const InsightsEnablement = ({ filters }) => {
  const { InsightTile, RankedBars, Funnel, Distribution,
          NarrativeCard, InsightsSection } = window.BrInsightsCharts;
  const { Btn, Pill } = window.BrPrim;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
      <NarrativeCard
        headline="M05 'Hallucinations' has a 38% drop-off — likely the Q3 free-response question."
        body="384 reps started M05. Only 238 finished. Of the 146 who dropped, 91% bailed at the same scenario question. Average score on that question is 41% — ~2× lower than every adjacent item. Three Authors are already drafting a follow-up. Want me to fold their drafts into a single revision proposal?"
        signals={['384 enrolled', '38% drop-off', 'Q3 score 41%', '3 author drafts pending']}
        action="Build proposal"/>

      {/* Top KPI strip */}
      <InsightsSection kicker="Library health" title="Catalog snapshot"
        question="Is the curriculum healthy overall?"
        padded={false}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12 }}>
          <InsightTile label="Live modules" value="84" sub="6 drafts · 2 scheduled" delta="+4" tone="pos"/>
          <InsightTile label="Avg completion" value="71%" sub="last 30 days · target 75%" delta="−2pt" tone="warn"
            spark={[80,77,74,73,72,72,71]}/>
          <InsightTile label="Avg quiz score" value="78" sub="across all live content" delta="+3" tone="pos"
            spark={[72,73,75,75,76,77,78]}/>
          <InsightTile label="Stale content" value="12" sub="not updated in 90+ days" tone="warn"/>
        </div>
      </InsightsSection>

      {/* Funnel — the canonical learning funnel */}
      <InsightsSection kicker="Conversion" title="The mastery funnel"
        question="Where are reps falling off between assigned and applied?">
        <Funnel steps={[
          { label:'Assigned',           value:412 },
          { label:'Started',            value:384 },
          { label:'Completed lesson',   value:328 },
          { label:'Passed quiz (≥70)',  value:271 },
          { label:'Mastered (≥85)',     value:198 },
          { label:'Applied in field',   value:142 },
        ]}/>
        <div style={{
          display:'flex', alignItems:'center', gap:10, marginTop:18,
          padding:'10px 12px', borderRadius:8,
          background:'var(--card-alt)', border:'1px solid var(--border)'
        }}>
          <span style={{
            fontFamily:'var(--font-mono)', fontSize:10.5, color:'var(--accent-2)',
            letterSpacing:'.08em', textTransform:'uppercase', fontWeight:700
          }}>Biggest drop</span>
          <span style={{ fontSize:12.5, color:'var(--text-sub)' }}>
            <strong style={{ color:'var(--text)' }}>Mastered → Applied</strong> · 28% of mastered reps don't show new behavior in CRM/Gong within 14 days.
          </span>
        </div>
      </InsightsSection>

      {/* Top + Underperforming side-by-side */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18, marginBottom:24 }}>
        <InsightsSection kicker="Winners" title="Top-performing content"
          question="What should we make more of?">
          <RankedBars formatVal={v => `${v}%`} rows={[
            { label:'Prompt patterns I',  value:94, color:'var(--green)' },
            { label:'Discovery essentials', value:91, color:'var(--green)' },
            { label:'Show, don\'t tell',  value:88, color:'var(--green)' },
            { label:'Pre-call AI brief',  value:86, color:'var(--accent)' },
            { label:'Multi-thread playbook', value:84, color:'var(--accent)' },
          ]}/>
        </InsightsSection>

        <InsightsSection kicker="Bottom 5" title="Underperforming content"
          question="What needs revision or retirement?">
          <RankedBars formatVal={v => `${v}%`} rows={[
            { label:'Negotiation tactics', value:52, color:'var(--accent-2)' },
            { label:'M05 · Hallucinations', value:54, color:'var(--accent-2)' },
            { label:'Pricing objections',  value:58, color:'#FFE03F' },
            { label:'Renewal motion',      value:61, color:'#FFE03F' },
            { label:'AE → RA handoff',     value:64, color:'var(--accent-mid)' },
          ]}/>
        </InsightsSection>
      </div>

      {/* Failure patterns */}
      <InsightsSection kicker="Failure patterns" title="Where reps get stuck"
        question="What specific items fail most often, and why?">
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {[
            {
              q:'M05 · Q3: "When should you NOT use a CoT prompt?"',
              fail:'59% wrong', why:'Most reps pick "for math" — but the lesson framing buried the cost angle.',
              action:'Rewrite prompt'
            },
            {
              q:'M12 · Free-response: Draft a multi-thread email after a discovery call',
              fail:'47% rubric miss', why:'Reps consistently miss rubric item #4: "name a specific business pain from the call."',
              action:'Add example'
            },
            {
              q:'M07 · Q1: "Which Salesforce field maps to MEDDPICC \'M\'?"',
              fail:'41% wrong', why:'Field name varies by your tenant — quiz hardcoded the standard label.',
              action:'Tenant-ize'
            },
          ].map((r, i) => (
            <div key={i} style={{
              display:'grid', gridTemplateColumns:'1fr 110px 110px',
              gap:14, alignItems:'center', padding:'14px 16px',
              background:'var(--card-alt)', border:'1px solid var(--border)',
              borderRadius:'var(--radius-md)'
            }}>
              <div style={{ minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', marginBottom:4 }}>{r.q}</div>
                <div style={{ fontSize:12, color:'var(--text-sub)', lineHeight:1.5 }}>{r.why}</div>
              </div>
              <div>
                <Pill bg="rgba(255,35,112,0.10)" border="rgba(255,35,112,0.30)" color="var(--accent-2)"
                  style={{ padding:'2px 9px', fontSize:11 }}>{r.fail}</Pill>
              </div>
              <Btn variant="secondary" size="sm">{r.action}</Btn>
            </div>
          ))}
        </div>
      </InsightsSection>

      {/* Score distribution + Content gaps */}
      <div style={{ display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:18, marginBottom:24 }}>
        <InsightsSection kicker="Quality" title="Score distribution across all content"
          question="Are scores bunched at the top (too easy) or middle (right)?">
          <Distribution buckets={[
            { label:'<50',  value: 6 },
            { label:'50s',  value:14 },
            { label:'60s',  value:22 },
            { label:'70s',  value:31, highlight:true },
            { label:'80s',  value:18 },
            { label:'90s',  value: 7 },
            { label:'100',  value: 2 },
          ]}/>
          <p style={{ fontSize:12, color:'var(--text-sub)', margin:'12px 0 0', lineHeight:1.5 }}>
            Healthy curve. Median 73, no piling at 100 (suggests no answer-key leaks). Slight left tail on Negotiation content.
          </p>
        </InsightsSection>

        <InsightsSection kicker="Coverage" title="Skills missing content"
          question="Where do reps need lessons we don't have?">
          <RankedBars formatVal={v => `${v} reps`} rows={[
            { label:'Procurement', value:84,  color:'var(--accent-2)' },
            { label:'Champion building', value:72, color:'var(--accent-2)' },
            { label:'Renewal pricing', value:61, color:'#FFE03F' },
            { label:'RA expansion plays', value:54, color:'#FFE03F' },
            { label:'Multi-product demo', value:38, color:'var(--accent-mid)' },
          ]}/>
          <Btn variant="soft" size="sm" style={{ marginTop:14 }}>Generate lesson drafts (5)</Btn>
        </InsightsSection>
      </div>

      {/* Author leaderboard */}
      <InsightsSection kicker="Authors" title="Content authors this quarter"
        question="Who's producing — and whose content is sticking?">
        <div style={{
          display:'grid', gridTemplateColumns:'1fr 90px 90px 90px 90px',
          fontSize:11, fontFamily:'var(--font-mono)', letterSpacing:'.06em',
          textTransform:'uppercase', color:'var(--text-dim)',
          padding:'4px 0 8px', borderBottom:'1px solid var(--border-soft)'
        }}>
          <div>Author</div><div>Published</div><div>Avg score</div><div>Completion</div><div>Field use</div>
        </div>
        {[
          { n:'Maya Patel',    pub:8,  s:84, c:78, f:71 },
          { n:'Jordan Lee',    pub:6,  s:81, c:75, f:68 },
          { n:'Priya Shah',    pub:5,  s:79, c:73, f:64 },
          { n:'Coach (auto)',  pub:14, s:76, c:70, f:58 },
          { n:'Diego Alvarez', pub:3,  s:88, c:82, f:74 },
        ].map((r, i) => (
          <div key={i} style={{
            display:'grid', gridTemplateColumns:'1fr 90px 90px 90px 90px',
            padding:'10px 0', borderBottom: i===4 ? 'none' : '1px solid var(--border-soft)',
            fontSize:13, alignItems:'center'
          }}>
            <div style={{ color:'var(--text)', fontWeight:600 }}>{r.n}</div>
            <div style={{ fontFamily:'var(--font-mono)', color:'var(--text-sub)' }}>{r.pub}</div>
            <div style={{ fontFamily:'var(--font-mono)', color: r.s >= 85 ? 'var(--green)' : 'var(--text-sub)' }}>{r.s}</div>
            <div style={{ fontFamily:'var(--font-mono)', color:'var(--text-sub)' }}>{r.c}%</div>
            <div style={{ fontFamily:'var(--font-mono)', color: r.f >= 70 ? 'var(--green)' : 'var(--text-sub)' }}>{r.f}%</div>
          </div>
        ))}
      </InsightsSection>
    </div>
  );
};

window.BrInsightsEnablement = { InsightsEnablement };
