// Data: levels, modules, lesson content, feed, leaderboard, etc.

const LEVELS = [
  { num:1, name:'The Risk',         tagline:'Just getting started — or working without guardrails.',
    selfDesc:"You're using AI tools without much thought to safety, accuracy, or fit." },
  { num:2, name:'The Novice',       tagline:"You can write a prompt, but you're still finding your footing.",
    selfDesc:'You can write a prompt and get something usable. You sometimes accept the first output without iterating.' },
  { num:3, name:'The Practitioner', tagline:'You co-create with AI, fact-check outputs, and iterate.',
    selfDesc:'You treat AI as a thinking partner. You iterate, you verify, you know when not to trust it.' },
  { num:4, name:'The Strategist',   tagline:'You orchestrate multi-step workflows across tools.',
    selfDesc:'You design AI workflows that span multiple tools. You think in systems, not single prompts.' },
  { num:5, name:'The Architect',    tagline:'You build new systems and lead the transformation.',
    selfDesc:'You define how AI gets used at scale. You teach others. You build what didn\'t exist before.' },
];

const PATHS = [
  { id:'AI101', code:'101', title:'AI Fluency Foundations', subtitle:'From AI-curious to AI-capable. Start here.',
    modules:7, hours:'1h 21m', status:'active', progress:0, level:'L1 → L2',
    pillars:['Foundation','Craft','Judgment'] },
  { id:'AI201', code:'201', title:'Prompting like a Pro', subtitle:'Frameworks, patterns, and the prompts that actually convert.',
    modules:8, hours:'2h 10m', status:'unlocked', progress:0, level:'L2 → L3',
    pillars:['Craft','Patterns','Voice'] },
  { id:'AI301', code:'301', title:'AI Workflows for GTM', subtitle:'Stitch Claude, Gong, Salesforce, and Slack into a real workflow.',
    modules:10, hours:'3h 40m', status:'locked', progress:0, level:'L3 → L4',
    pillars:['Systems','Integration','Scale'] },
  { id:'GONG-AI', code:'TOOL', title:'Gong AI Deep Dive', subtitle:'Master Engage, Forecast and Smart Trackers.',
    modules:5, hours:'1h 15m', status:'unlocked', progress:0, level:'Tool',
    pillars:['Product'], pinned:true },
  { id:'CLAUDE', code:'TOOL', title:'Claude for Account Execs', subtitle:'Tool-specific patterns for the AE day.',
    modules:6, hours:'1h 30m', status:'unlocked', progress:0, level:'Tool',
    pillars:['Product'], pinned:true },
  { id:'HACK-Q1', code:'EVENT', title:'Q1 AI Hackathon', subtitle:'48 hours. Cross-functional teams. Real customer problems.',
    modules:0, hours:'2 days', status:'event', progress:0, level:'Event',
    pillars:['Live'], starts:'May 12' },
];

const MODULES_AI101 = [
  { id:'M01', num:'01', title:'What is AI?',                subtitle:"Define what AI is and isn't.",            minutes:12, group:'Foundation', state:'active' },
  { id:'M02', num:'02', title:'How did we get here?',       subtitle:'The arc from ML to GPT to agents.',       minutes:10, group:'Foundation', state:'next' },
  { id:'M03', num:'03', title:'Where is this going?',       subtitle:'Trajectory over the next 2-3 years.',     minutes:10, group:'Foundation', state:'locked' },
  { id:'M04', num:'04', title:'Prompting best practices',   subtitle:'Context, role, task, format.',            minutes:15, group:'Craft',      state:'locked' },
  { id:'M05', num:'05', title:'Avoiding hallucinations',    subtitle:'When the model is confident and wrong.',  minutes:12, group:'Craft',      state:'locked' },
  { id:'M06', num:'06', title:'Right tool for the job',     subtitle:'Claude, Gemini, ChatGPT, Gong AI.',       minutes:12, group:'Craft',      state:'locked' },
  { id:'M07', num:'07', title:'Owning AI outputs',          subtitle:"You're accountable for what you ship.",   minutes:10, group:'Judgment',   state:'locked' },
];

const M01_LESSON = {
  id:'M01',
  title:'What is AI?',
  kicker:'Module 01 · Foundation',
  estimate:12,
  intro:"Before we get to prompts, frameworks, or fancy workflows — let's get the foundation right. AI is not magic, not consciousness, and not a single thing. This lesson gives you a working mental model so the rest of AI 101 lands clearly.",
  sections:[
    {
      number:'01',
      kicker:'A working definition',
      title:'What we mean by “AI” in 2025',
      paragraphs:[
        "\"AI\" is an umbrella term. When most people at Gong say AI today, they almost always mean **large language models** — the technology behind Claude, ChatGPT, and the smart features in Gong, Salesforce, and Slack.",
        "**A large language model is a pattern-matching system trained on enormous amounts of text.** It learned, statistically, how words and ideas tend to follow each other. When you give it a prompt, it generates the most likely next words, one at a time.",
        "That's it. There's no understanding, no intent, no memory of you between sessions unless you give it one. The magic isn't comprehension — it's that pattern-matching at this scale produces outputs that look like reasoning.",
        "**This matters because it tells you where AI shines and where it fails.** It shines at tasks where the right answer is shaped like text it has seen before — emails, summaries, rewrites, code. It fails when accuracy is non-negotiable and the model has no way to verify what it's saying."
      ],
      coachNote:{
        title:'Coach tip',
        body:"If you remember nothing else: AI generates plausible-sounding text. Plausible ≠ correct. Your job is to bring the judgment."
      }
    },
    {
      number:'02',
      kicker:'Three things AI is not',
      title:"Common misconceptions, cleared up",
      paragraphs:[
        "Most bad AI takes come from one of three confusions. Naming them now will save you from making them later."
      ],
      patterns:[
        { tag:'1', name:'AI is not a search engine',
          body:"Google retrieves documents that exist. Claude generates words that statistically should come next. Sometimes those words happen to be true; sometimes they don't. Never use a raw model output as a citation." },
        { tag:'2', name:'AI is not conscious',
          body:"It has no goals, no feelings, no preferences. It is software that takes text in and produces text out. The illusion of personality is a trick of training data and tone, not evidence of mind." },
        { tag:'3', name:"AI is not one product",
          body:"Claude, ChatGPT, Gemini, and Gong AI are different models with different strengths. Saying \"the AI says\u2026\" is like saying \"the website says\u2026\" — which one, doing what?" }
      ],
      pullquote:{
        body:'AI is the most capable autocomplete ever built — and exactly that, no more.',
        context:"Holding this frame keeps you grounded. The hype crashes against it; the real value passes through."
      }
    }
  ]
};

const M04_LESSON = {
  id:'M04',
  title:'Prompting best practices',
  kicker:'Module 04 · Craft',
  estimate:15,
  intro:"You've heard \"better prompts get better outputs.\" True, but unhelpful. This lesson gives you the actual moves: a four-part frame that works for almost every task, three patterns that compound, and the failure modes to avoid.",
  sections:[
    {
      number:'01',
      kicker:'The four-part frame',
      title:'Role, Task, Context, Format',
      paragraphs:[
        "Most prompts fail because they're missing one of four things. Add them and outputs get dramatically better.",
        "**Role.** Tell the model who it is. \"You are a senior AE writing a pre-call note.\" This narrows the model's distribution of likely outputs to the kind of voice you actually want.",
        "**Task.** State the single, concrete thing you want done. \"Draft a 4-bullet pre-call brief.\" Not \"help me prepare for the call.\" Specificity is leverage.",
        "**Context.** What does the model need to know that it can't already? Account size, recent changes, who's on the call, the trap you're trying to avoid. **This is the lever most people skip.**",
        "**Format.** How should the answer be shaped? \"Bullets, max 8 words each, no preamble.\" Format constraints turn a good answer into a usable one."
      ],
      coachNote:{
        title:'Coach tip',
        body:"If your output is wrong in tone or shape, fix Role and Format. If it's wrong in substance, fix Context. Most reps think they have a prompting problem when they actually have a context problem."
      }
    },
    {
      number:'02',
      kicker:'Three compounding patterns',
      title:'The moves that level up the rest of your work',
      paragraphs:[
        "Once the four-part frame is automatic, these three patterns make outputs better with almost no extra effort."
      ],
      patterns:[
        { tag:'1', name:'Show, don\'t tell',
          body:"Paste two examples of what 'good' looks like before asking the model to produce a third. Beats every adjective you could throw at it." },
        { tag:'2', name:'Iterate, don\'t restart',
          body:"When the first draft is 70% right, don't re-prompt from scratch. Tell the model what to keep and what to change. \"Keep the structure. Tighten the second bullet. Cut the closing line.\"" },
        { tag:'3', name:'Ask the model to plan first',
          body:"For anything multi-step, ask for the plan before the artifact. Critique the plan, then have it execute. Catches the wrong direction before you spend tokens going there." }
      ],
      pullquote:{
        body:'Prompting is a conversation, not a vending machine.',
        context:"You're not pulling a lever to dispense an output. You're directing a junior collaborator who can't read your mind."
      }
    }
  ]
};

const M04_KC = [
  {
    id:'q1',
    type:'mc',
    question:'A teammate writes: "Help me prepare for my call with Acme tomorrow." The output is generic. Which part of the four-part frame is most likely missing?',
    options:[
      'Role — the model doesn\'t know it\'s a senior AE',
      'Context — Acme details, prior calls, what to avoid',
      'Format — no constraint on length or structure',
      'Task — "prepare" is too broad'
    ],
    correctIndex:1,
    explanation:"Both Task and Context are weak here, but Context is the bigger lever. The model has no way to know what makes Acme Acme without you saying so. \"Prepare\" being broad is real, but even a tighter task fails without account specifics."
  },
  {
    id:'q2',
    type:'free',
    question:'Rewrite this prompt using the four-part frame: "Write me an email to the prospect."',
    rubric:[
      'Names a role (e.g. AE, RA, CSM)',
      'Names a specific task (length, ask, intent)',
      'Provides at least two pieces of context (industry, past convo, objection)',
      'Specifies format constraints (length, structure, tone)'
    ],
    sample:"You are an enterprise AE following up after a discovery call. Write a 5-sentence email to a Director of RevOps at a mid-market SaaS company. They asked about Gong's forecast accuracy on small deal sizes (<$25k). Reference our discussion of their pipeline drift problem. Tone: confident, specific, no filler. End with a question that invites a 15-minute follow-up.",
    explanation:"Strong rewrites name the role, get specific about the ask, surface the context only you have (the customer's actual situation), and shape the output. Yours doesn't need to match this sample — it just needs all four parts."
  },
  {
    id:'q3',
    type:'mc',
    question:'You ask Claude for a 3-step launch plan. The first step is wrong. What\'s the highest-leverage next move?',
    options:[
      'Re-prompt from scratch with more detail',
      "Ask Claude to fix step 1 and keep steps 2-3",
      'Try a different model',
      'Accept it and edit by hand'
    ],
    correctIndex:1,
    explanation:'Iterate, don\'t restart. Tell the model what to keep and what to change. Restarting throws away the 70% that was right and burns time and tokens.'
  }
];

const FEED = [
  { initials:'LR', name:'Lisa R.',   role:'RA · SMB',          time:'4m',   ac:'#FF2370', kind:'level',
    msg:'just hit Level 3 — Practitioner', detail:'Cleared M07 with a 96. Onto 201.' },
  { initials:'MT', name:'Marcus T.', role:'SDR · Mid-Market',  time:'18m',  ac:'#997CED', kind:'streak',
    msg:'is on a 12-day streak', detail:'Longest streak this month on the SDR team.' },
  { initials:'JP', name:'Jordan P.', role:'AE · Enterprise',   time:'1h',   ac:'#4CFEC8', kind:'graduate',
    msg:'graduated AI 101', detail:'7 of 7 modules completed. Average score: 91.' },
  { initials:'RC', name:'Ryan C.',   role:'AE · Enterprise',   time:'3h',   ac:'#3CAFF2', kind:'practice',
    msg:'aced a Live Practice scenario', detail:'Multi-thread email at Datadog account. 5 of 5.' },
  { initials:'AP', name:'Aisha P.',  role:'RA · Enterprise',   time:'5h',   ac:'#FF7A45', kind:'first',
    msg:'started AI Fluency Foundations', detail:'Welcome to Brainstorm 👋' },
  { initials:'DW', name:'Dev W.',    role:'SDR · SMB',         time:'7h',   ac:'#C77DFF', kind:'badge',
    msg:'earned the Right Tool badge', detail:'Picked Claude for the right kind of task 5 days running.' },
];

const CHAT = [
  { initials:'MT', name:'Marcus T.', role:'SDR', ac:'#997CED', time:'2:34 PM',
    msg:'M05 changed how I verify Gong call summaries before sending. Anyone else?' },
  { initials:'JP', name:'Jordan P.', role:'AE', ac:'#4CFEC8', time:'2:36 PM',
    msg:"Same. The 'confident-but-wrong' frame is sticky. I now flag any number from a summary as suspect until I check it in the call." },
  { initials:'LR', name:'Lisa R.',   role:'RA', ac:'#FF2370', time:'2:41 PM',
    msg:'🎓 just earned AI 101 Graduate. for the first time I actually understand what these tools are doing under the hood.', highlight:true },
  { initials:'COACH', name:'Coach', role:'AI', ac:'#997CED', isCoach:true, time:'2:42 PM',
    msg:'@Lisa nice work. If you\'re onto 201, the prompting frameworks build directly on what you just learned. M04 is the one most people say sticks.' },
  { initials:'DW', name:'Dev W.',    role:'SDR', ac:'#C77DFF', time:'3:10 PM',
    msg:'Used the four-part frame on a cold email yesterday. Booked a meeting same day. 🔥' },
];

const LEADERBOARD_INDIV = [
  { rank:1,  initials:'JP', name:'Jordan P.', team:'Enterprise',  xp:2840, level:3, delta:'+2', ac:'#4CFEC8' },
  { rank:2,  initials:'LR', name:'Lisa R.',   team:'SMB',         xp:2710, level:3, delta:'—',  ac:'#FF2370' },
  { rank:3,  initials:'MT', name:'Marcus T.', team:'Mid-Market',  xp:2480, level:2, delta:'+1', ac:'#997CED' },
  { rank:4,  initials:'YOU',name:'You',       team:'Enterprise',  xp:2310, level:2, delta:'+3', ac:'#3CAFF2', you:true },
  { rank:5,  initials:'RC', name:'Ryan C.',   team:'Enterprise',  xp:2240, level:2, delta:'-1', ac:'#3CAFF2' },
  { rank:6,  initials:'DW', name:'Dev W.',    team:'SMB',         xp:2090, level:2, delta:'-1', ac:'#C77DFF' },
  { rank:7,  initials:'AP', name:'Aisha P.',  team:'Enterprise',  xp:1920, level:2, delta:'+2', ac:'#FF7A45' },
  { rank:8,  initials:'MN', name:'Maya N.',   team:'Mid-Market',  xp:1780, level:2, delta:'—',  ac:'#4CFEC8' },
];

const LEADERBOARD_TEAMS = [
  { rank:1, name:'Enterprise · West',   lead:'Stacey W.', xp:18420, members:9, delta:'+1', ac:'#997CED' },
  { rank:2, name:'SMB · Velocity',      lead:'Shawn K.',  xp:17190, members:11, delta:'-1', ac:'#FF2370' },
  { rank:3, name:'Mid-Market · Atlas',  lead:'Lori L.',   xp:15240, members:10, delta:'+1', ac:'#4CFEC8' },
  { rank:4, name:'Enterprise · East',   lead:'Shane M.',  xp:14010, members:8, delta:'—',  ac:'#3CAFF2' },
  { rank:5, name:'Strategic · Tigers',  lead:'Jordan P.', xp:13320, members:6, delta:'+2', ac:'#FFE03F' },
];

const ACHIEVEMENTS = [
  { id:'first',     icon:'🚀', label:'First Step',         desc:'Started your first module.', earned:true,  date:'Apr 18' },
  { id:'streak3',   icon:'🔥', label:'On a Roll',          desc:'3-day streak.',              earned:true,  date:'Apr 22' },
  { id:'foundation',icon:'🧠', label:'Foundation Cleared', desc:'Cleared the Foundation pillar.', earned:true, date:'Apr 25' },
  { id:'sharp',     icon:'🎯', label:'Sharp Shooter',      desc:'Three perfect knowledge checks in a row.', earned:true, date:'Apr 26' },
  { id:'grad',      icon:'🎓', label:'AI 101 Graduate',    desc:'Cleared all of AI Fluency Foundations.', earned:false, progress:'5 of 7' },
  { id:'prac',      icon:'⚡', label:'Practitioner',       desc:'Reached Level 3.',           earned:false, progress:'L2 · 60%' },
  { id:'voice',     icon:'🗣️', label:'Voice Match',       desc:'Drafted in your voice 5x.',  earned:false, progress:'2 of 5' },
  { id:'mentor',    icon:'🤝', label:'Mentor',             desc:'Helped a teammate clear a module.', earned:false, locked:true },
  { id:'hack',      icon:'🏆', label:'Hackathon Veteran',  desc:'Shipped at a Brainstorm Hackathon.', earned:false, locked:true },
  { id:'arch',      icon:'🏛️', label:'Architect',         desc:'Reached Level 5.', earned:false, locked:true },
];

const SCENARIOS = [
  { id:'s1', tag:'Live · Fresh from Gong', title:'Multi-thread the Datadog account',
    desc:'You just heard a budget concern on a Gong call with their RevOps director. Draft a follow-up that brings in the CFO without losing the original sponsor.',
    minutes:8, source:'Gong call · 2 days ago', accent:'#997CED' },
  { id:'s2', tag:'Live · From your pipe', title:'Discovery prep for Snowflake',
    desc:'Stage: Discovery. The model has access to last quarter\'s notes. What three questions will move the deal?',
    minutes:6, source:'Salesforce · stage: Discovery', accent:'#4CFEC8' },
  { id:'s3', tag:'Roleplay · Voice', title:'Rewrite a stale outbound sequence',
    desc:'Take the team\'s top-performing email from Q4 and rewrite it for the Q2 macro environment. The coach grades on voice match and specificity.',
    minutes:10, source:'Outreach · top sequence', accent:'#FF2370' },
];

// Lesson content keyed by module ID. Modules without authored content fall back
// to a stub preview in the lesson reader.
const LESSON_BY_MODULE = {
  M01: M01_LESSON,
  M04: M04_LESSON,
};

window.BrData = {
  LEVELS, PATHS, MODULES_AI101, M01_LESSON, M04_LESSON, LESSON_BY_MODULE, M04_KC,
  FEED, CHAT, LEADERBOARD_INDIV, LEADERBOARD_TEAMS, ACHIEVEMENTS, SCENARIOS
};
