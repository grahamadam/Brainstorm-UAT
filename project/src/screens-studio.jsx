// CONTENT STUDIO — admin pipeline: ingest → generate → review → publish.
const { useState: useStateStudio, useEffect: useEffectStudio, useRef: useRefStudio } = React;

// ---------- demo data ----------
const STUDIO_LIBRARY = [
  { code:'DAILY · #142', title:'Daily Challenge · The four-part frame',   kind:'Daily Challenge', status:'Live',    updated:'06:00', enrolled:287, score:78 },
  { code:'AI101 · M04', title:'Prompting best practices',          kind:'Module',   status:'Live',      updated:'2d',    enrolled:340, score:84 },
  { code:'AI201 · M02', title:"Pattern: Show, don't tell",          kind:'Module',   status:'Live',      updated:'1w',    enrolled:182, score:88 },
  { code:'AI301 · M07', title:'Workflow: Gong → Claude → SF',      kind:'Module',   status:'Draft',     updated:'3h',    enrolled:0,   score:null },
  { code:'PRACTICE',    title:'Multi-thread the Datadog account',   kind:'Scenario', status:'Live',      updated:'5d',    enrolled:88,  score:79 },
  { code:'TEMPLATE',    title:'Pre-call brief · Enterprise',        kind:'Prompt',   status:'Live',      updated:'2w',    enrolled:412, score:null },
  { code:'EVENT',       title:'Q1 AI Hackathon',                   kind:'Event',    status:'Scheduled', updated:'today', enrolled:64,  score:null },
];

const STUDIO_DRAFTS = [
  { id:'d_94', src:'anthropic.com/news/contextual-retrieval', tier:3, by:'Graham K.', age:'12m', status:'pending_review',
    title:'Contextual retrieval for sales enablement', lessons:3, checks:5 },
  { id:'d_91', src:'gtm-playbook.notion.site/objection-handling', tier:2, by:'Graham K.', age:'4h', status:'pending_review',
    title:'Objection handling with AI co-pilots', lessons:2, checks:4 },
  { id:'d_88', src:'internal-doc · Q2 forecast methodology.pdf', tier:3, by:'Graham K.', age:'yesterday', status:'pending_review',
    title:'Forecasting hygiene · Q2 method', lessons:4, checks:7 },
];

const STUDIO_JOURNEYS = [
  { id:'ai101', label:'AI 101 · Foundations', modules:7 },
  { id:'ai201', label:'AI 201 · Craft',      modules:5 },
  { id:'ai301', label:'AI 301 · Systems',    modules:4 },
  { id:'prac',  label:'Practice scenarios',   modules:12 },
];

// What Claude "returned" — used in the review step
const STUDIO_GENERATED = {
  module: {
    title: 'Contextual retrieval for sales enablement',
    description: 'How retrieval-augmented prompting works in practice for GTM teams — when to use it, what context to attach, and how to grade outputs.',
    estimated_total_minutes: 22,
    lessons: [
      {
        order_index: 1,
        title: 'Why context beats clever prompts',
        estimated_minutes: 7,
        content: '## Why context beats clever prompts\n\nA seven-word task with **the right four bullets of context** outperforms a perfect 200-word prompt with no context. For GTM, "context" usually means: deal stage, last objection, multi-thread, and the specific outcome you want.\n\nWhen the model has these, it can stop guessing.',
        knowledge_checks: [
          {
            order_index: 1,
            question: 'Which is the strongest piece of context to attach to a pre-call brief prompt?',
            options: [
              'A polished bio of your buyer',
              "The transcript of your last call with the buyer",
              'A list of competitors',
              'A general industry overview'
            ],
            correct_index: 1,
            explanation: 'Recent first-party signal (transcript) is what a model cannot infer. Bios, competitors, and overviews are easy to substitute.'
          }
        ]
      },
      {
        order_index: 2,
        title: 'What to retrieve, in what order',
        estimated_minutes: 8,
        content: '## Retrieval order matters\n\nLLMs weight content near the end of the prompt more heavily. Put the **task** last, the **format** just above it, and the **context** above that.\n\n- Role (1 line)\n- Context (3–5 bullets, most-recent-first)\n- Format (1 line)\n- Task (1 line)\n',
        knowledge_checks: [
          {
            order_index: 1,
            question: 'Where should the task statement go inside the prompt?',
            options: [ 'First, before context', 'In the middle, after the role', 'Last, after format', 'It does not matter' ],
            correct_index: 2,
            explanation: 'Recency bias: tokens near the end are weighted more heavily, so end with the actual task.'
          },
          {
            order_index: 2,
            question: 'For a CFO pre-call brief, which context should you put first?',
            options: [
              'Generic CFO persona traits',
              'Your most recent conversation summary with this CFO',
              'A list of competitors',
              'Their public company financials'
            ],
            correct_index: 1,
            explanation: 'Recency-of-relationship beats persona generalities every time for first-party deals.'
          }
        ]
      },
      {
        order_index: 3,
        title: 'Grading the output',
        estimated_minutes: 7,
        content: '## A 3-question rubric\n\n1. Did it use my context, or generic platitudes?\n2. Would my buyer recognize themselves in it?\n3. Could I send it as-is, or am I rewriting?\n\nIf any answer is "no," the prompt — not the model — is wrong.',
        knowledge_checks: [
          {
            order_index: 1,
            question: 'What is the right next move when the model produces generic-sounding output?',
            options: [
              'Switch to a bigger model',
              'Add more guardrails',
              'Add more first-party context',
              'Re-roll until it works'
            ],
            correct_index: 2,
            explanation: 'Generic output is almost always a context problem, not a model-quality problem.'
          }
        ]
      },
    ]
  }
};

// ---------- helpers ----------
const Stepper = ({ steps, current }) => {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
      {steps.map((s, i) => {
        const reached = i <= current;
        const active = i === current;
        return (
          <div key={s.key} style={{ display:'contents' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{
                width:22, height:22, borderRadius:'50%',
                background: reached ? 'linear-gradient(135deg, var(--accent), var(--accent-mid))' : 'var(--card)',
                border: active ? '2px solid var(--accent)' : `1px solid ${reached ? 'var(--accent)' : 'var(--border)'}`,
                color: reached ? '#fff' : 'var(--text-dim)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:11, fontWeight:800, fontFamily:'var(--font-mono)'
              }}>{i+1}</div>
              <span style={{
                fontSize:12, fontWeight: active ? 700 : 500,
                color: active ? 'var(--text)' : reached ? 'var(--text-sub)' : 'var(--text-dim)'
              }}>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ width:24, height:1, background: i < current ? 'var(--accent)' : 'var(--border)' }} />
            )}
          </div>
        );
      })}
    </div>
  );
};
const FragmentStudio = React.Fragment;

// Source preview tile (left col in review)
const SourcePreview = ({ source }) => {
  const { Card, Pill, Kicker } = window.BrPrim;
  const { IconLink, IconFile, IconShield } = window.BrIcons;
  const isUrl = !!source.url;
  return (
    <Card padding={0} style={{ overflow:'hidden', height:'100%', display:'flex', flexDirection:'column' }}>
      <div style={{
        padding:'14px 18px', borderBottom:'1px solid var(--border)',
        background:'var(--card-alt)', display:'flex', alignItems:'center', gap:10
      }}>
        {isUrl ? <IconLink size={13} stroke="var(--text-sub)" /> : <IconFile size={13} stroke="var(--text-sub)" />}
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:10, color:'var(--text-dim)', textTransform:'uppercase', letterSpacing:'0.08em', fontWeight:700, marginBottom:2 }}>Source</div>
          <div style={{ fontSize:12, color:'var(--text)', fontFamily:'var(--font-mono)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {source.url || source.fileName}
          </div>
        </div>
        <Pill icon={<IconShield size={10}/>} style={{ flexShrink:0, padding:'2px 8px', fontSize:10 }}>Tier {source.tier}</Pill>
      </div>
      <div style={{ padding:'18px 22px', flex:1, overflow:'auto' }}>
        <Kicker>Extracted content</Kicker>
        <div style={{
          marginTop:10, fontSize:13, color:'var(--text-sub)', lineHeight:1.6,
          fontFamily:'var(--font-body)'
        }}>
          {source.excerpt.split('\n\n').map((p, i) => <p key={i} style={{ margin:'0 0 12px' }}>{p}</p>)}
        </div>
        <div style={{
          marginTop:14, padding:'10px 12px', borderRadius:9,
          background:'var(--card-alt)', border:'1px solid var(--border)',
          display:'flex', alignItems:'center', gap:14, fontSize:11, color:'var(--text-dim)', fontFamily:'var(--font-mono)'
        }}>
          <span>{source.chars.toLocaleString()} chars</span>
          <span>·</span>
          <span>~{Math.round(source.chars / 4 / 1000)}k tokens</span>
          <span>·</span>
          <span>fetched {source.fetchedAgo}</span>
        </div>
      </div>
    </Card>
  );
};

// Editable text — click to edit
const Editable = ({ value, onChange, multiline, style, placeholder }) => {
  const [editing, setEditing] = useStateStudio(false);
  const [draft, setDraft] = useStateStudio(value);
  useEffectStudio(() => setDraft(value), [value]);
  if (!editing) {
    return (
      <span onClick={() => setEditing(true)} style={{
        cursor:'text', borderBottom:'1px dashed transparent', display:'inline-block',
        ...style
      }}
      onMouseEnter={e => e.currentTarget.style.borderBottomColor = 'var(--accent-border)'}
      onMouseLeave={e => e.currentTarget.style.borderBottomColor = 'transparent'}>
        {value || <span style={{ color:'var(--text-dim)' }}>{placeholder}</span>}
      </span>
    );
  }
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <Tag value={draft} autoFocus rows={multiline ? 3 : undefined}
      onChange={e => setDraft(e.target.value)}
      onBlur={() => { setEditing(false); onChange(draft); }}
      onKeyDown={e => { if (!multiline && e.key === 'Enter') { setEditing(false); onChange(draft); } if (e.key === 'Escape') { setEditing(false); setDraft(value); } }}
      style={{
        background:'var(--accent-light)', border:'1px solid var(--accent-border)', borderRadius:6,
        padding:'4px 8px', fontSize:'inherit', fontFamily:'inherit', fontWeight:'inherit',
        color:'var(--text)', outline:'none', width:'100%', letterSpacing:'inherit', lineHeight:'inherit',
        resize: multiline ? 'vertical' : 'none', ...style
      }} />
  );
};

// ===================== MAIN =====================
const StudioScreen = ({ goto }) => {
  const { Card, Pill, Kicker, Btn, SectionHeader, ProgressBar, StatTile } = window.BrPrim;
  const { IconPlus, IconEdit, IconEye, IconFilter, IconSpark, IconLink, IconFile, IconArrowR, IconArrowL,
          IconCheck, IconCheckCirc, IconShield, IconBolt, IconClose, IconRefresh, IconBook,
          IconAlert, IconClock, IconCpu, IconChevR, IconChevD, IconSearch } = window.BrIcons;

  // Top-level mode: 'library' | 'ingest' | 'generating' | 'review' | 'published'
  const [mode, setMode] = useStateStudio('library');
  const [tab, setTab]   = useStateStudio('all');     // library tab: all | drafts | live | scheduled
  const [filterKind, setFilterKind] = useStateStudio('all');

  // Ingest state
  const [sourceMode, setSourceMode] = useStateStudio('url'); // url | file
  const [sourceUrl, setSourceUrl]   = useStateStudio('https://www.anthropic.com/news/contextual-retrieval');
  const [fileName, setFileName]     = useStateStudio('');
  const [tier, setTier]             = useStateStudio(3);

  // Generation progress
  const [genStep, setGenStep] = useStateStudio(0);   // 0..3
  const GEN_STEPS = [
    { label:'Saving source row', detail:'INSERT INTO sources(...)', icon:<IconShield size={12}/> },
    { label:'Fetching & parsing', detail:'fetch() · readability · strip nav/footer', icon:<IconLink size={12}/> },
    { label:'Calling Claude',     detail:'POST /v1/messages · model=sonnet-4.5 · stream', icon:<IconCpu size={12}/> },
    { label:'Structuring module', detail:'parse JSON · validate schema · save draft', icon:<IconBolt size={12}/> },
  ];

  // Review state — editable module
  const [moduleDraft, setModuleDraft] = useStateStudio(STUDIO_GENERATED.module);
  const [expandedLesson, setExpandedLesson] = useStateStudio(0);
  const [journeyId, setJourneyId] = useStateStudio('ai101');
  const [publishing, setPublishing] = useStateStudio(false);

  // ---------- ingest → generate ----------
  const startGeneration = () => {
    setMode('generating');
    setGenStep(0);
    let i = 0;
    const tick = () => {
      i++;
      setGenStep(i);
      if (i < GEN_STEPS.length) setTimeout(tick, 900);
      else setTimeout(() => {
        setModuleDraft(STUDIO_GENERATED.module);
        setMode('review');
      }, 700);
    };
    setTimeout(tick, 900);
  };

  const startPublish = () => {
    setPublishing(true);
    setTimeout(() => {
      setPublishing(false);
      setMode('published');
    }, 1400);
  };

  const resetToLibrary = () => {
    setMode('library');
    setTab('all');
    setSourceUrl('https://www.anthropic.com/news/contextual-retrieval');
    setTier(3);
  };

  // Currently-being-edited source object (for the review)
  const currentSource = {
    url: sourceMode === 'url' ? sourceUrl : null,
    fileName: sourceMode === 'file' ? (fileName || 'document.pdf') : null,
    tier,
    chars: 14820,
    fetchedAgo: 'just now',
    excerpt:
      'Contextual retrieval is a technique that combines semantic and lexical retrieval with a context-prepending step. For each chunk, the model is given a short summary of the document and asked to write a single line of context that situates the chunk inside the larger document.\n\nFor sales enablement, this matters because chunks of training material — a single objection handler, one page of a methodology — are often only meaningful with their parent context attached.\n\nIn practice, the gain is largest on retrieval over enterprise corpora where the same phrase ("multi-thread") means different things in different playbooks…'
  };

  return (
    <div style={{ height:'100%', overflow:'auto' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'32px 40px 80px' }}>
        {/* Header */}
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:24, gap:24, flexWrap:'wrap' }}>
          <div style={{ minWidth:0 }}>
            <Kicker>Admin · Content Studio</Kicker>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:32, fontWeight:700, letterSpacing:'-0.025em', margin:'10px 0 6px' }}>
              {mode === 'library'    && 'Content library'}
              {mode === 'ingest'     && 'New module from a source'}
              {mode === 'generating' && 'Generating module…'}
              {mode === 'review'     && 'Review draft'}
              {mode === 'published'  && 'Module published'}
            </h2>
            <p style={{ color:'var(--text-sub)', margin:0, fontSize:14, maxWidth:640 }}>
              {mode === 'library'    && 'Modules, scenarios, prompts, and events. Authored by your team and the coach — published only after a human review.'}
              {mode === 'ingest'     && 'Paste a URL or drop a document. Pick a tier so the model knows how much weight to give it. Claude drafts the module — you review every word before it ships.'}
              {mode === 'generating' && 'Watching the pipeline run end-to-end. Source row → fetch → Claude → structured draft. Lands in your queue when done.'}
              {mode === 'review'     && 'Everything Claude drafted is editable. Click any text. When you publish, this becomes a live module inside the journey you select — wrapped in a Postgres transaction, all-or-nothing.'}
              {mode === 'published'  && 'Module is live in the learner journey. Lessons, knowledge checks, and source attribution all wrote in a single transaction.'}
            </p>
          </div>
          <div style={{ display:'flex', gap:8, flexShrink:0 }}>
            {mode === 'library' && (
              <>
                <Btn variant="secondary" size="sm" icon={<IconFilter size={11}/>}>Filter</Btn>
                <Btn icon={<IconPlus size={11}/>} onClick={() => setMode('ingest')}>New from source</Btn>
              </>
            )}
            {(mode === 'ingest' || mode === 'generating' || mode === 'review' || mode === 'published') && (
              <Btn variant="secondary" size="sm" icon={<IconArrowL size={11}/>} onClick={resetToLibrary}>Back to library</Btn>
            )}
          </div>
        </div>

        {/* Pipeline stepper — visible during creation flow */}
        {mode !== 'library' && (
          <div style={{
            background:'var(--card)', border:'1px solid var(--border)', borderRadius:'var(--radius)',
            padding:'14px 22px', marginBottom:22, display:'flex', alignItems:'center', justifyContent:'space-between', gap:20
          }}>
            <Stepper
              current={ mode === 'ingest' ? 0 : mode === 'generating' ? 1 : mode === 'review' ? 2 : 3 }
              steps={[
                { key:'src',  label:'Source' },
                { key:'gen',  label:'Generate' },
                { key:'rev',  label:'Review' },
                { key:'pub',  label:'Publish' },
              ]}
            />
            <div style={{ fontSize:11, color:'var(--text-dim)', fontFamily:'var(--font-mono)' }}>
              draft_id: { mode === 'ingest' ? '—' : 'd_94' }
            </div>
          </div>
        )}

        {/* ============ LIBRARY ============ */}
        {mode === 'library' && (
          <>
            {/* Stats row */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:18 }}>
              <StatTile label="Live modules"     value="42"  sub="across 4 journeys" />
              <StatTile label="Daily Challenge"  value="287" sub="reps today · par 78" accent="var(--yellow)" />
              <StatTile label="Pending review"   value={STUDIO_DRAFTS.length} sub="Graham · today" accent="var(--accent)" />
              <StatTile label="Avg quiz score"   value="84%" sub="last 30 days"   accent="var(--green)" />
            </div>

            {/* Drafts queue */}
            <Card padding={0} style={{ marginBottom:22, overflow:'hidden' }}>
              <div style={{
                padding:'14px 22px', borderBottom:'1px solid var(--border)',
                display:'flex', alignItems:'center', gap:12
              }}>
                <Pill icon={<IconSpark size={10}/>} style={{ padding:'2px 9px', fontSize:10 }}>Queue</Pill>
                <span style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>Pending review</span>
                <span style={{ fontSize:11, color:'var(--text-sub)' }}>{STUDIO_DRAFTS.length} drafts · oldest 1d</span>
                <span style={{ flex:1 }}/>
                <Btn variant="ghost" size="sm" icon={<IconRefresh size={11}/>}>Refresh</Btn>
              </div>
              {STUDIO_DRAFTS.map((d, i) => (
                <div key={d.id} style={{
                  display:'grid', gridTemplateColumns:'70px 1fr 90px 110px 100px 130px',
                  padding:'12px 22px', borderBottom: i < STUDIO_DRAFTS.length - 1 ? '1px solid var(--border)' : 'none',
                  alignItems:'center', gap:14
                }}>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-dim)' }}>{d.id}</span>
                  <div style={{ minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', marginBottom:3 }}>{d.title}</div>
                    <div style={{ fontSize:11, color:'var(--text-sub)', display:'flex', alignItems:'center', gap:6, fontFamily:'var(--font-mono)' }}>
                      {d.src.startsWith('internal') ? <IconFile size={10} stroke="currentColor"/> : <IconLink size={10} stroke="currentColor"/>}
                      <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{d.src}</span>
                    </div>
                  </div>
                  <Pill icon={<IconShield size={10}/>} style={{ padding:'2px 8px', fontSize:10, justifySelf:'start' }}>Tier {d.tier}</Pill>
                  <span style={{ fontSize:11, color:'var(--text-sub)' }}>{d.lessons} lessons · {d.checks} checks</span>
                  <span style={{ fontSize:11, color:'var(--text-dim)' }}>{d.age} ago</span>
                  <Btn size="sm" variant="soft" icon={<IconArrowR size={11}/>} onClick={() => setMode('review')} style={{ justifySelf:'end' }}>
                    Review
                  </Btn>
                </div>
              ))}
            </Card>

            {/* Library tabs */}
            <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:14 }}>
              {[
                { id:'all',  label:'All' },
                { id:'live', label:'Live' },
                { id:'draft',label:'Drafts' },
                { id:'sched',label:'Scheduled' },
              ].map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  background: tab === t.id ? 'var(--accent-light)' : 'transparent',
                  color: tab === t.id ? 'var(--accent)' : 'var(--text-sub)',
                  border:`1px solid ${tab === t.id ? 'var(--accent-border)' : 'transparent'}`,
                  borderRadius:8, padding:'6px 12px', fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'inherit'
                }}>{t.label}</button>
              ))}
              <span style={{ flex:1 }}/>
              <div style={{
                display:'flex', alignItems:'center', gap:6, background:'var(--card)', border:'1px solid var(--border)',
                borderRadius:8, padding:'6px 10px', fontSize:12, color:'var(--text-sub)', minWidth:240
              }}>
                <IconSearch size={11} stroke="currentColor"/>
                <input placeholder="Search content…" style={{
                  background:'transparent', border:'none', outline:'none', flex:1, color:'var(--text)', fontSize:12
                }}/>
              </div>
            </div>

            <Card padding={0}>
              <div style={{
                display:'grid', gridTemplateColumns:'130px 1fr 90px 90px 90px 80px 100px',
                padding:'12px 22px', borderBottom:'1px solid var(--border)',
                fontSize:11, color:'var(--text-dim)', letterSpacing:'0.05em', textTransform:'uppercase', fontWeight:700
              }}>
                <span>Code</span><span>Title</span><span>Kind</span><span>Status</span><span style={{ textAlign:'right' }}>Enrolled</span><span style={{ textAlign:'right' }}>Score</span><span style={{ textAlign:'right' }}>Actions</span>
              </div>
              {STUDIO_LIBRARY.map((r, i) => (
                <div key={i} style={{
                  display:'grid', gridTemplateColumns:'130px 1fr 90px 90px 90px 80px 100px',
                  padding:'14px 22px', borderBottom:'1px solid var(--border)', alignItems:'center'
                }}>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-sub)' }}>{r.code}</span>
                  <span style={{ fontSize:13, color:'var(--text)', fontWeight:600 }}>{r.title}</span>
                  <Pill bg="var(--card-alt)" border="var(--border)" color="var(--text-sub)" style={{ padding:'2px 8px', fontSize:10, justifySelf:'start' }}>{r.kind}</Pill>
                  <span style={{ fontSize:11, fontWeight:700,
                    color: r.status === 'Live' ? 'var(--green)' : r.status === 'Draft' ? 'var(--text-dim)' : 'var(--accent-2)' }}>{r.status}</span>
                  <span style={{ textAlign:'right', fontFamily:'var(--font-mono)', fontSize:12, color:'var(--text-sub)' }}>{r.enrolled || '—'}</span>
                  <span style={{ textAlign:'right', fontFamily:'var(--font-mono)', fontSize:12,
                    color: r.score && r.score >= 85 ? 'var(--green)' : 'var(--text-sub)' }}>{r.score || '—'}</span>
                  <span style={{ textAlign:'right', display:'inline-flex', justifySelf:'end', gap:4 }}>
                    <button title="View" style={{ background:'transparent', border:'none', color:'var(--text-sub)', cursor:'pointer', padding:6 }}><IconEye size={13} stroke="currentColor"/></button>
                    <button title="Edit" style={{ background:'transparent', border:'none', color:'var(--text-sub)', cursor:'pointer', padding:6 }}><IconEdit size={13} stroke="currentColor"/></button>
                  </span>
                </div>
              ))}
            </Card>
          </>
        )}

        {/* ============ INGEST ============ */}
        {mode === 'ingest' && (
          <div style={{ display:'grid', gridTemplateColumns:'1.3fr 1fr', gap:18 }}>
            <Card padding={28}>
              {/* source mode toggle */}
              <div style={{ display:'flex', gap:6, marginBottom:18, padding:4, background:'var(--card-alt)', borderRadius:9, width:'fit-content' }}>
                {[
                  { id:'url',  label:'From URL',     Icon:IconLink },
                  { id:'file', label:'From document', Icon:IconFile }
                ].map(s => (
                  <button key={s.id} onClick={() => setSourceMode(s.id)} style={{
                    display:'flex', alignItems:'center', gap:7, padding:'7px 14px', borderRadius:7, border:'none',
                    background: sourceMode === s.id ? 'var(--accent)' : 'transparent',
                    color: sourceMode === s.id ? '#fff' : 'var(--text-sub)',
                    fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'inherit'
                  }}>
                    <s.Icon size={11} stroke="currentColor"/> {s.label}
                  </button>
                ))}
              </div>

              {sourceMode === 'url' ? (
                <div>
                  <label style={{ fontSize:11, fontWeight:700, color:'var(--text-sub)', letterSpacing:'0.05em', textTransform:'uppercase' }}>
                    Source URL
                  </label>
                  <input value={sourceUrl} onChange={e => setSourceUrl(e.target.value)}
                    placeholder="https://anthropic.com/news/…"
                    style={{
                      display:'block', width:'100%', marginTop:8,
                      background:'var(--card-alt)', border:'1px solid var(--border)', borderRadius:9,
                      padding:'12px 14px', fontSize:14, color:'var(--text)', outline:'none',
                      fontFamily:'var(--font-mono)'
                    }}/>
                  <div style={{ marginTop:8, fontSize:11, color:'var(--text-dim)', display:'flex', alignItems:'center', gap:6 }}>
                    <IconCheck size={11} stroke="var(--green)"/> Reachable · ~14.8k chars · main content extracted
                  </div>
                </div>
              ) : (
                <div>
                  <label style={{ fontSize:11, fontWeight:700, color:'var(--text-sub)', letterSpacing:'0.05em', textTransform:'uppercase' }}>
                    Upload document
                  </label>
                  <div style={{
                    marginTop:8, padding:'34px 20px', borderRadius:'var(--radius)',
                    border:'2px dashed var(--border)', background:'var(--card-alt)',
                    textAlign:'center', cursor:'pointer'
                  }}>
                    <IconFile size={28} stroke="var(--text-dim)"/>
                    <div style={{ marginTop:10, fontSize:13, color:'var(--text)', fontWeight:700 }}>
                      Drop a file or click to browse
                    </div>
                    <div style={{ marginTop:4, fontSize:11, color:'var(--text-dim)' }}>
                      PDF · DOCX · MD · TXT · up to 10 MB
                    </div>
                    {fileName && (
                      <div style={{ marginTop:14, padding:'8px 12px', background:'var(--accent-light)', border:'1px solid var(--accent-border)', borderRadius:8, fontSize:12, fontFamily:'var(--font-mono)', color:'var(--accent)' }}>
                        {fileName}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tier */}
              <div style={{ marginTop:24 }}>
                <label style={{ fontSize:11, fontWeight:700, color:'var(--text-sub)', letterSpacing:'0.05em', textTransform:'uppercase' }}>
                  Source tier
                </label>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginTop:8 }}>
                  {[
                    { tier:1, name:'External · public', desc:'Blog posts, public docs, vendor articles. Used as background.' },
                    { tier:2, name:'Curated · trusted', desc:'Methodologies, books, research notes you trust. Heavier weight.' },
                    { tier:3, name:'Internal · proprietary', desc:'Your playbooks, top-rep transcripts, custom rubrics. Highest weight.' },
                  ].map(t => {
                    const sel = tier === t.tier;
                    return (
                      <button key={t.tier} onClick={() => setTier(t.tier)} style={{
                        textAlign:'left', padding:'14px 16px', borderRadius:'var(--radius)',
                        background: sel ? 'var(--accent-light)' : 'var(--card)',
                        border: `1px solid ${sel ? 'var(--accent-border)' : 'var(--border)'}`,
                        cursor:'pointer', fontFamily:'inherit'
                      }}>
                        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                          <div style={{
                            width:22, height:22, borderRadius:'50%',
                            background: sel ? 'var(--accent)' : 'var(--card-alt)',
                            color: sel ? '#fff' : 'var(--text-dim)',
                            border: `1px solid ${sel ? 'var(--accent)' : 'var(--border)'}`,
                            display:'flex', alignItems:'center', justifyContent:'center',
                            fontFamily:'var(--font-mono)', fontWeight:800, fontSize:11
                          }}>{t.tier}</div>
                          <span style={{ fontSize:12, fontWeight:700, color: sel ? 'var(--accent)' : 'var(--text)' }}>{t.name}</span>
                        </div>
                        <div style={{ fontSize:11, color:'var(--text-sub)', lineHeight:1.5 }}>{t.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:28, paddingTop:20, borderTop:'1px solid var(--border)' }}>
                <div style={{ fontSize:11, color:'var(--text-dim)', fontFamily:'var(--font-mono)' }}>
                  POST /api/content/generate
                </div>
                <Btn icon={<IconSpark size={12}/>} onClick={startGeneration}
                  disabled={sourceMode === 'url' ? !sourceUrl : !fileName}>
                  Generate module
                </Btn>
              </div>
            </Card>

            {/* Right rail: explainer */}
            <Card padding={24}>
              <Kicker>What happens next</Kicker>
              <div style={{ marginTop:14, display:'flex', flexDirection:'column', gap:14 }}>
                {[
                  { n:'01', t:'Source ingested', d:'A row in `sources` is created with the raw content. Always written first, before any model call.' },
                  { n:'02', t:'Claude drafts',   d:'System prompt enforces strict JSON. Lessons (2–4), each with 1–2 knowledge checks. Application-style questions.' },
                  { n:'03', t:'Draft saved',     d:'Lands in `content_drafts` as `pending_review`. Nothing is live yet — learners see nothing.' },
                  { n:'04', t:'You review',      d:'Inline-editable. Pick a journey. On Approve, a Postgres transaction promotes the draft to `modules` + `lessons` + `knowledge_checks`. All-or-nothing.' },
                ].map(s => (
                  <div key={s.n} style={{ display:'flex', gap:12 }}>
                    <span style={{
                      flexShrink:0, width:30, height:30, borderRadius:7,
                      background:'var(--card-alt)', border:'1px solid var(--border)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontFamily:'var(--font-mono)', fontSize:11, fontWeight:800, color:'var(--accent)'
                    }}>{s.n}</span>
                    <div>
                      <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', marginBottom:3 }}>{s.t}</div>
                      <div style={{ fontSize:12, color:'var(--text-sub)', lineHeight:1.55 }}>{s.d}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop:18, padding:'12px 14px', borderRadius:9,
                background:'var(--accent-light)', border:'1px solid var(--accent-border)',
                fontSize:11, color:'var(--text)', lineHeight:1.55, display:'flex', gap:10
              }}>
                <IconShield size={14} stroke="var(--accent)" style={{ flexShrink:0, marginTop:1 }}/>
                <div>
                  <strong>Nothing publishes without a human.</strong> Drafts sit in the queue until you click Approve. The transaction only fires from your action.
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ============ GENERATING ============ */}
        {mode === 'generating' && (
          <Card padding={36} style={{ maxWidth:780, margin:'0 auto' }}>
            <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:24 }}>
              <div style={{
                width:48, height:48, borderRadius:12,
                background:'linear-gradient(135deg, var(--accent), var(--accent-mid))',
                display:'flex', alignItems:'center', justifyContent:'center', color:'#fff',
                animation:'bs-pulse 2s ease-in-out infinite'
              }}>
                <IconCpu size={22}/>
              </div>
              <div>
                <div style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:700, letterSpacing:'-0.02em', color:'var(--text)', marginBottom:4 }}>
                  Building your module
                </div>
                <div style={{ fontSize:12, color:'var(--text-sub)', fontFamily:'var(--font-mono)' }}>
                  source · tier {tier} · ~14.8k chars
                </div>
              </div>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {GEN_STEPS.map((s, i) => {
                const done = i < genStep;
                const active = i === genStep;
                return (
                  <div key={i} style={{
                    display:'flex', alignItems:'center', gap:14,
                    padding:'12px 16px', borderRadius:10,
                    background: active ? 'var(--accent-light)' : done ? 'var(--card-alt)' : 'transparent',
                    border:`1px solid ${active ? 'var(--accent-border)' : done ? 'var(--border)' : 'transparent'}`,
                    transition:'all .3s'
                  }}>
                    <div style={{
                      width:28, height:28, borderRadius:'50%', flexShrink:0,
                      background: done ? 'var(--green)' : active ? 'var(--accent)' : 'var(--card-alt)',
                      color: done || active ? '#fff' : 'var(--text-dim)',
                      border: `1px solid ${done ? 'var(--green-border)' : active ? 'var(--accent)' : 'var(--border)'}`,
                      display:'flex', alignItems:'center', justifyContent:'center'
                    }}>
                      {done ? <IconCheck size={13}/> : active ? <span style={{
                        width:10, height:10, borderRadius:'50%', background:'#fff',
                        animation:'bs-pulse 1s ease-in-out infinite'
                      }}/> : <span style={{ fontSize:11, fontFamily:'var(--font-mono)', fontWeight:800 }}>{i+1}</span>}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, fontWeight:700, color: done || active ? 'var(--text)' : 'var(--text-sub)' }}>
                        {s.label}
                      </div>
                      <div style={{ fontSize:11, color:'var(--text-dim)', fontFamily:'var(--font-mono)', marginTop:2 }}>
                        {s.detail}
                      </div>
                    </div>
                    {active && <div style={{ fontSize:11, color:'var(--accent)', fontFamily:'var(--font-mono)' }}>running…</div>}
                    {done && <div style={{ fontSize:11, color:'var(--green)', fontFamily:'var(--font-mono)' }}>ok</div>}
                  </div>
                );
              })}
            </div>

            <div style={{
              marginTop:22, padding:'12px 16px', borderRadius:9,
              background:'var(--card-alt)', border:'1px solid var(--border)',
              fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-sub)', lineHeight:1.6
            }}>
              <span style={{ color:'var(--text-dim)' }}>$</span> POST /v1/messages<br/>
              <span style={{ color:'var(--text-dim)' }}>{'>'}</span> model: claude-sonnet-4-5<br/>
              <span style={{ color:'var(--text-dim)' }}>{'>'}</span> system: "You are a curriculum designer creating training modules…"<br/>
              <span style={{ color:'var(--text-dim)' }}>{'>'}</span> max_tokens: 4096 · stream: true
            </div>
          </Card>
        )}

        {/* ============ REVIEW ============ */}
        {mode === 'review' && (
          <div style={{ display:'grid', gridTemplateColumns:'minmax(0, 360px) 1fr', gap:18 }}>
            {/* Source preview */}
            <SourcePreview source={currentSource} />

            {/* Module draft (editable) */}
            <Card padding={0} style={{ display:'flex', flexDirection:'column' }}>
              {/* meta */}
              <div style={{
                padding:'18px 26px', borderBottom:'1px solid var(--border)',
                display:'flex', alignItems:'center', gap:14, flexWrap:'wrap'
              }}>
                <Pill icon={<IconSpark size={10}/>} style={{ padding:'2px 9px', fontSize:10 }}>Draft · pending_review</Pill>
                <span style={{ fontSize:11, color:'var(--text-dim)', fontFamily:'var(--font-mono)' }}>generated 12m ago · sonnet-4.5 · 3,210 tok</span>
                <span style={{ flex:1 }}/>
                <Btn variant="ghost" size="sm" icon={<IconRefresh size={11}/>}>Regenerate</Btn>
              </div>

              <div style={{ padding:'24px 26px 16px' }}>
                <Kicker>Module title</Kicker>
                <h3 style={{
                  fontFamily:'var(--font-display)', fontSize:26, fontWeight:700,
                  letterSpacing:'-0.025em', margin:'8px 0 14px', color:'var(--text)', lineHeight:1.15
                }}>
                  <Editable value={moduleDraft.title} onChange={v => setModuleDraft({ ...moduleDraft, title:v })} />
                </h3>
                <Kicker>Description</Kicker>
                <div style={{ fontSize:14, color:'var(--text-sub)', lineHeight:1.6, marginTop:6 }}>
                  <Editable multiline value={moduleDraft.description}
                    onChange={v => setModuleDraft({ ...moduleDraft, description:v })} />
                </div>

                <div style={{ display:'flex', gap:10, marginTop:14, flexWrap:'wrap' }}>
                  <Pill icon={<IconClock size={10}/>} bg="var(--card-alt)" border="var(--border)" color="var(--text-sub)" style={{ padding:'2px 9px', fontSize:10 }}>
                    {moduleDraft.estimated_total_minutes} min total
                  </Pill>
                  <Pill icon={<IconBook size={10}/>} bg="var(--card-alt)" border="var(--border)" color="var(--text-sub)" style={{ padding:'2px 9px', fontSize:10 }}>
                    {moduleDraft.lessons.length} lessons
                  </Pill>
                  <Pill icon={<IconCheck size={10}/>} bg="var(--card-alt)" border="var(--border)" color="var(--text-sub)" style={{ padding:'2px 9px', fontSize:10 }}>
                    {moduleDraft.lessons.reduce((n, l) => n + l.knowledge_checks.length, 0)} knowledge checks
                  </Pill>
                </div>
              </div>

              {/* Lessons */}
              <div style={{ padding:'8px 18px 18px', borderTop:'1px solid var(--border)' }}>
                <div style={{ padding:'14px 8px 10px', display:'flex', alignItems:'center' }}>
                  <Kicker>Lessons</Kicker>
                  <span style={{ flex:1 }}/>
                  <Btn variant="ghost" size="sm" icon={<IconPlus size={11}/>}>Add lesson</Btn>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  {moduleDraft.lessons.map((l, idx) => {
                    const open = expandedLesson === idx;
                    return (
                      <div key={idx} style={{
                        background:'var(--card-alt)', border:'1px solid var(--border)',
                        borderRadius:'var(--radius)', overflow:'hidden'
                      }}>
                        <button onClick={() => setExpandedLesson(open ? -1 : idx)}
                          style={{
                            width:'100%', display:'flex', alignItems:'center', gap:12,
                            padding:'12px 16px', background:'transparent', border:'none', cursor:'pointer',
                            fontFamily:'inherit', textAlign:'left'
                          }}>
                          <span style={{
                            width:26, height:26, borderRadius:7, flexShrink:0,
                            background:'linear-gradient(135deg, var(--accent), var(--accent-mid))',
                            color:'#fff', display:'flex', alignItems:'center', justifyContent:'center',
                            fontFamily:'var(--font-mono)', fontWeight:800, fontSize:11
                          }}>L{l.order_index}</span>
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ fontSize:14, fontWeight:700, color:'var(--text)' }}>{l.title}</div>
                            <div style={{ fontSize:11, color:'var(--text-sub)', marginTop:2 }}>
                              {l.estimated_minutes} min · {l.knowledge_checks.length} {l.knowledge_checks.length === 1 ? 'check' : 'checks'}
                            </div>
                          </div>
                          {open ? <IconChevD size={14} stroke="var(--text-sub)"/> : <IconChevR size={14} stroke="var(--text-sub)"/>}
                        </button>
                        {open && (
                          <div style={{ padding:'4px 16px 16px', borderTop:'1px solid var(--border)' }}>
                            <div style={{ marginTop:14 }}>
                              <Kicker>Lesson title</Kicker>
                              <div style={{ fontSize:15, fontWeight:700, color:'var(--text)', marginTop:6 }}>
                                <Editable value={l.title}
                                  onChange={v => {
                                    const lessons = [...moduleDraft.lessons];
                                    lessons[idx] = { ...l, title:v };
                                    setModuleDraft({ ...moduleDraft, lessons });
                                  }} />
                              </div>
                            </div>

                            <div style={{ marginTop:14 }}>
                              <Kicker>Body (markdown)</Kicker>
                              <div style={{
                                marginTop:8, padding:'12px 14px',
                                background:'var(--card)', border:'1px solid var(--border)', borderRadius:9,
                                fontSize:12, color:'var(--text-sub)', lineHeight:1.65, fontFamily:'var(--font-body)',
                                whiteSpace:'pre-wrap', maxHeight:200, overflow:'auto'
                              }}>
                                <Editable multiline value={l.content}
                                  onChange={v => {
                                    const lessons = [...moduleDraft.lessons];
                                    lessons[idx] = { ...l, content:v };
                                    setModuleDraft({ ...moduleDraft, lessons });
                                  }} />
                              </div>
                            </div>

                            <div style={{ marginTop:18 }}>
                              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                                <Kicker>Knowledge checks</Kicker>
                                <span style={{ fontSize:11, color:'var(--text-dim)' }}>· {l.knowledge_checks.length}</span>
                                <span style={{ flex:1 }}/>
                                <Btn variant="ghost" size="sm" icon={<IconPlus size={11}/>}>Add check</Btn>
                              </div>
                              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                                {l.knowledge_checks.map((kc, kIdx) => (
                                  <div key={kIdx} style={{
                                    padding:'12px 14px', borderRadius:9,
                                    background:'var(--card)', border:'1px solid var(--border)'
                                  }}>
                                    <div style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:10 }}>
                                      <span style={{
                                        width:20, height:20, borderRadius:5, flexShrink:0,
                                        background:'var(--accent-light)', border:'1px solid var(--accent-border)',
                                        color:'var(--accent)', display:'flex', alignItems:'center', justifyContent:'center',
                                        fontFamily:'var(--font-mono)', fontSize:10, fontWeight:800
                                      }}>Q{kc.order_index}</span>
                                      <div style={{ flex:1, fontSize:13, color:'var(--text)', fontWeight:600, lineHeight:1.5 }}>
                                        <Editable value={kc.question}
                                          onChange={v => {
                                            const lessons = [...moduleDraft.lessons];
                                            const checks = [...l.knowledge_checks]; checks[kIdx] = { ...kc, question:v };
                                            lessons[idx] = { ...l, knowledge_checks: checks };
                                            setModuleDraft({ ...moduleDraft, lessons });
                                          }} />
                                      </div>
                                    </div>
                                    <div style={{ display:'flex', flexDirection:'column', gap:6, marginLeft:30 }}>
                                      {kc.options.map((opt, oIdx) => {
                                        const correct = oIdx === kc.correct_index;
                                        return (
                                          <div key={oIdx} style={{
                                            display:'flex', alignItems:'flex-start', gap:9, fontSize:12,
                                            color: correct ? 'var(--text)' : 'var(--text-sub)',
                                            padding:'5px 8px', borderRadius:6,
                                            background: correct ? 'color-mix(in oklab, var(--green) 8%, var(--card))' : 'transparent',
                                            border: correct ? '1px solid var(--green-border)' : '1px solid transparent'
                                          }}>
                                            <span style={{
                                              width:18, height:18, borderRadius:4, flexShrink:0, marginTop:1,
                                              background: correct ? 'var(--green)' : 'var(--card-alt)',
                                              color: correct ? '#fff' : 'var(--text-dim)',
                                              border: `1px solid ${correct ? 'var(--green-border)' : 'var(--border)'}`,
                                              display:'flex', alignItems:'center', justifyContent:'center',
                                              fontFamily:'var(--font-mono)', fontSize:10, fontWeight:800
                                            }}>{correct ? <IconCheck size={10}/> : String.fromCharCode(65+oIdx)}</span>
                                            <span style={{ flex:1, lineHeight:1.5 }}>{opt}</span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                    <div style={{
                                      marginTop:10, marginLeft:30,
                                      padding:'8px 10px', borderRadius:7,
                                      background:'var(--card-alt)', borderLeft:'2px solid var(--accent)',
                                      fontSize:11, color:'var(--text-sub)', lineHeight:1.55
                                    }}>
                                      <strong style={{ color:'var(--text)', fontWeight:700 }}>Why: </strong>
                                      {kc.explanation}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Publish bar */}
              <div style={{
                padding:'14px 26px', borderTop:'1px solid var(--border)',
                background:'var(--card-alt)',
                display:'flex', alignItems:'center', gap:14, flexWrap:'wrap'
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, flex:'1 1 auto', minWidth:240 }}>
                  <span style={{ fontSize:11, fontWeight:700, color:'var(--text-sub)', letterSpacing:'0.05em', textTransform:'uppercase' }}>
                    Publish to
                  </span>
                  <select value={journeyId} onChange={e => setJourneyId(e.target.value)} style={{
                    background:'var(--card)', border:'1px solid var(--border)', borderRadius:8,
                    padding:'7px 12px', fontSize:13, color:'var(--text)', fontFamily:'inherit', flex:1, maxWidth:280
                  }}>
                    {STUDIO_JOURNEYS.map(j => (
                      <option key={j.id} value={j.id}>{j.label} · {j.modules} modules</option>
                    ))}
                  </select>
                </div>
                <span style={{ flex:1 }}/>
                <Btn variant="danger" size="sm" icon={<IconClose size={11}/>} onClick={resetToLibrary}>
                  Reject
                </Btn>
                <Btn variant="secondary" size="sm">Save as draft</Btn>
                <Btn icon={publishing ? null : <IconCheck size={12}/>} onClick={startPublish} disabled={publishing}>
                  {publishing ? 'Publishing…' : 'Approve & publish'}
                </Btn>
              </div>
            </Card>
          </div>
        )}

        {/* ============ PUBLISHED ============ */}
        {mode === 'published' && (
          <Card padding={42} style={{ maxWidth:680, margin:'40px auto', textAlign:'center' }}>
            <div style={{
              width:80, height:80, borderRadius:20, margin:'0 auto 20px',
              background:'linear-gradient(135deg, var(--accent), var(--accent-mid))',
              display:'flex', alignItems:'center', justifyContent:'center', color:'#fff',
              boxShadow:'0 16px 50px -12px color-mix(in oklab, var(--accent) 60%, transparent)'
            }}>
              <IconCheckCirc size={40}/>
            </div>
            <h2 style={{
              fontFamily:'var(--font-display)', fontSize:30, fontWeight:700,
              letterSpacing:'-0.025em', margin:'0 0 10px'
            }}>
              "{moduleDraft.title}" is live
            </h2>
            <p style={{ color:'var(--text-sub)', margin:'0 0 22px', fontSize:14, lineHeight:1.6 }}>
              Promoted to <strong style={{ color:'var(--text)' }}>{STUDIO_JOURNEYS.find(j => j.id === journeyId)?.label}</strong> · {moduleDraft.lessons.length} lessons + {moduleDraft.lessons.reduce((n,l)=>n+l.knowledge_checks.length,0)} knowledge checks written in a single transaction.
            </p>
            <div style={{
              padding:'14px 18px', borderRadius:'var(--radius)',
              background:'var(--card-alt)', border:'1px solid var(--border)',
              fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-sub)', textAlign:'left', lineHeight:1.7
            }}>
              <span style={{ color:'var(--green)' }}>✓</span> INSERT INTO modules · 1 row<br/>
              <span style={{ color:'var(--green)' }}>✓</span> INSERT INTO lessons · {moduleDraft.lessons.length} rows<br/>
              <span style={{ color:'var(--green)' }}>✓</span> INSERT INTO knowledge_checks · {moduleDraft.lessons.reduce((n,l)=>n+l.knowledge_checks.length,0)} rows<br/>
              <span style={{ color:'var(--green)' }}>✓</span> UPDATE content_drafts SET status='approved'<br/>
              <span style={{ color:'var(--text-dim)' }}>—— transaction committed</span>
            </div>
            <div style={{ display:'flex', gap:10, justifyContent:'center', marginTop:24 }}>
              <Btn variant="secondary" size="md" onClick={resetToLibrary} icon={<IconArrowL size={12}/>}>Back to library</Btn>
              <Btn size="md" icon={<IconArrowR size={12}/>} onClick={() => goto && goto('paths')}>View in journey</Btn>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

window.BrStudio = { StudioScreen };
