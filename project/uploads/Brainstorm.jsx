import { useState, useRef, useEffect, useMemo, Fragment } from "react";
import {
  CheckCircle2, Lock, Circle, Flame, ChevronRight, ChevronLeft, ArrowLeft, ArrowRight,
  BookOpen, LayoutDashboard, Map, Trophy, Zap, Home, Send, BarChart3, FileText,
  Filter, Download, Calendar, Users, Sparkles, Loader, Globe, Key, Bot, Bell,
  User, Sun, Moon, Plus, Edit3, ExternalLink, Trash2, Check, X, ChevronDown,
  Eye, Save, AlertCircle, Search, RefreshCw, Cpu, Settings as SettingsIcon,
  Lightbulb, AlertTriangle, Compass, Award, GraduationCap, TrendingUp, Target,
  MessageSquare, RotateCcw, Layers
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, ScatterChart, Scatter,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";

// ═══════════════════════════════════════════════════════════════════════════
// THEME · Gong-branded dark palette with V4-compatible token names
// ═══════════════════════════════════════════════════════════════════════════

const DARK = {
  // Surfaces
  bg:'#0A0612', surface:'#13091F', card:'#180D26', cardAlt:'#1F1230',
  border:'#2A1840', borderLight:'#1F1230',
  // Gong purple (the primary brand color)
  violet:'#B084FF', violetDeep:'#3E0075', violetLight:'#1E0E3A', violetMid:'#9658EF', violetBorder:'#4B2880',
  midnight:'#FAFAFA', purpleHaze:'#9B72CF', lavender:'#D4C5F5',
  // Gong pink (accent)
  pinkRose:'#FF5BA8', pinkLight:'#2A1024', pinkBorder:'#722858',
  // Success
  green:'#3DD4A0', greenLight:'#0F3326', greenBorder:'#1F6648',
  // Text
  text:'#F5F0FF', textSub:'#B5A8D8', textDim:'#6B5A8C',
  white:'#FFFFFF', input:'#180D26',
  // Gong-specific raw values (for gradients and direct refs)
  gongPurple:'#8039DF', gongPurpleLight:'#B084FF', gongPurpleDeep:'#3E0075', gongPink:'#FF2370',
};

// Light theme placeholder (shown as "coming soon" in Settings for now)
const LIGHT = DARK;

// ═══════════════════════════════════════════════════════════════════════════
// CONTENT · onboarding, levels, modules, lesson, knowledge check, samples
// ═══════════════════════════════════════════════════════════════════════════

const ROLES = ['AE', 'RA', 'SDR', 'OPS', 'Other'];
const TYPES = [
  { value:'ic',     label:'Individual Contributor', desc:'I do the work directly.' },
  { value:'leader', label:'Leader',                  desc:'I lead a team that does the work.' },
];
const TEAMS = ['Enterprise', 'Mid-Market', 'SMB', 'Strategic', 'Other'];
const PROFICIENCY = [
  { value:'none',         label:'None',         desc:"I haven't really used AI tools in my work" },
  { value:'beginner',     label:'Beginner',     desc:'I dabble. Occasional ChatGPT for emails or research.' },
  { value:'intermediate', label:'Intermediate', desc:'I use AI weekly across multiple workflows.' },
  { value:'advanced',     label:'Advanced',     desc:'AI is woven into how I work daily.' },
];

// 5 levels rewritten in second-person voice for self-assessment
const LEVELS = [
  { num:1, name:'The Risk',         shortDesc:'Just getting started, or working without guardrails.',
    selfDesc:"You're using AI tools without much thought to safety, accuracy, or fit. Or you haven't really started using them at all." },
  { num:2, name:'The Novice',       shortDesc:'You can write a prompt, but you\'re still finding your footing.',
    selfDesc:'You can write a prompt and get something usable. You sometimes accept the first output without iterating.' },
  { num:3, name:'The Practitioner', shortDesc:'You co-create with AI, fact-check outputs, and iterate.',
    selfDesc:'You treat AI as a thinking partner. You iterate, you verify, you know when not to trust it.' },
  { num:4, name:'The Strategist',   shortDesc:'You orchestrate multi-step workflows across tools.',
    selfDesc:'You design AI workflows that span multiple tools. You think in systems, not single prompts.' },
  { num:5, name:'The Architect',    shortDesc:'You build new systems and lead the transformation.',
    selfDesc:'You define how AI gets used at scale. You teach others. You build what didn\'t exist before.' },
];

const AI_101_MODULES = [
  { id:'M01', num:'01', title:'What is AI?',                subtitle:"Define what AI is and isn't",            minutes:12, group:'foundation' },
  { id:'M02', num:'02', title:'How did we get here?',       subtitle:'The arc from ML to GPT to agents',       minutes:10, group:'foundation' },
  { id:'M03', num:'03', title:'Where is this going?',       subtitle:'Trajectory over the next 2 to 3 years',  minutes:10, group:'foundation' },
  { id:'M04', num:'04', title:'Prompting best practices',   subtitle:'Context, role, task, format',            minutes:15, group:'craft' },
  { id:'M05', num:'05', title:'Avoiding hallucinations',    subtitle:'When the model is confident and wrong',  minutes:12, group:'craft' },
  { id:'M06', num:'06', title:'Right tool for the job',     subtitle:'Claude, Gemini, ChatGPT, Gong AI',       minutes:12, group:'craft' },
  { id:'M07', num:'07', title:'Owning AI outputs',          subtitle:"You're accountable for what you ship",   minutes:10, group:'judgment' },
];

// Module 1 lesson content (em dashes removed)
const M01_LESSON = {
  title:'What is AI?',
  subtitle:'Before you can use it well, you need to know what you\'re using.',
  estimatedMinutes:12,
  intro:"You've heard \"AI\" used to mean five different things in five different meetings this month. This module separates the terms, demystifies what's actually happening under the hood, and gives you the mental model the rest of this course builds on.",
  sections:[
    {
      number:'01',
      kicker:'Five terms, one mental model',
      title:'Cutting through the alphabet soup',
      paragraphs:[
        'There\'s a reason "AI" feels confusing. Most people use one word to mean five different things. Let\'s separate them.',
        '**Artificial Intelligence (AI)** is the umbrella term. The whole field of building machines that do things historically requiring human intelligence. It\'s been around since the 1950s. Most of what gets called "AI" today is really one specific corner of it.',
        '**Machine Learning (ML)** is a subset of AI. Instead of programming a machine with explicit rules, you give it data and let it learn patterns. Spam filters, recommendation engines, fraud detection, all ML. It\'s been the dominant flavor of AI for decades.',
        '**Deep Learning** is a subset of ML, built on neural networks with many layers. This is where the recent explosion came from.',
        '**Large Language Models (LLMs)** are a specific kind of deep learning model trained on massive amounts of text. ChatGPT, Claude, Gemini, these are LLMs. When most people say "AI" today, they actually mean an LLM.',
        '**Generative AI** is a broader category that includes LLMs (text) but also models that generate images, video, code, audio, and more.',
        '**Agents** are LLMs given tools (search, calendars, code execution) and the ability to take actions on your behalf. An agent is not a different kind of model. It\'s an LLM with hands.'
      ],
      callout:{
        kind:'mental-model',
        title:'The mental model',
        body:"Imagine concentric circles. AI is the biggest. ML sits inside it. Deep Learning sits inside ML. LLMs sit inside Deep Learning. Most conversations you'll have at Gong about \"AI\" are actually about LLMs and the agents built on top of them."
      }
    },
    {
      number:'02',
      kicker:'The honest version',
      title:'How an LLM actually works',
      paragraphs:[
        'Here\'s the part most explanations skip, and it\'s the part that matters most for using these tools well.',
        'An LLM, at its core, does one thing. **It predicts the next word.**',
        'That\'s it. You give it some text, and it asks: given everything that came before, what\'s the most likely next word? Then the next. Then the next. It\'s a very, very sophisticated autocomplete.',
        'How does it know what\'s "likely"? Training. The model was shown a staggering amount of text. Books, websites, papers, code, conversations. And it learned statistical patterns about how language works. Not facts about the world, exactly. **Patterns** about which words tend to follow which other words, in which contexts.',
        'This has three consequences worth committing to memory.'
      ],
      consequences:[
        { number:'1', title:"The model isn't looking anything up",
          body:'When you ask Claude "what\'s the capital of France?", it doesn\'t search a database. It produces "Paris" because, statistically, that word is what should come next given everything in its training. It happens to be correct. But the mechanism is prediction, not retrieval.' },
        { number:'2', title:'The model can confidently make things up',
          body:"This is called hallucination. If you ask about something obscure, the model will still produce fluent, confident-sounding text, because that's what it does. It's predicting plausible-sounding next words, not pulling from a verified source. The output can be wrong without sounding wrong." },
        { number:'3', title:'The model has no memory between conversations',
          body:"Unless tools are bolted on top, every new chat starts from scratch. It doesn't know who you are, what you talked about yesterday, or what your team's preferences are. You have to bring the context every time." }
      ],
      footer:"This is why prompting matters. And why the next module on prompting is the most practical hour you'll spend in this course."
    },
    {
      number:'03',
      kicker:'The honest take',
      title:'Why this matters for GTM work',
      paragraphs:[
        "Here's what AI is good for, and what it's not."
      ],
      lists:[
        { heading:'AI is genuinely excellent at', tone:'positive',
          items:[
            'Generating drafts (emails, summaries, talking points)',
            'Transforming content (long to short, structured to conversational, format to format)',
            'Pattern recognition (spotting themes across a stack of customer notes)',
            'Brainstorming variations (10 subject lines, 5 ways to position a feature)'
          ]
        },
        { heading:'AI is dangerous when', tone:'caution',
          items:[
            'You treat its output as fact without checking',
            "You give it less context than you'd give a new hire and expect comparable judgment",
            'You assume it knows things it has no way of knowing (your customer\'s actual situation, recent product changes, internal process)',
            'You let it speak in your voice without editing'
          ]
        }
      ],
      pullquote:{
        body:'AI is a draft. You are the editor.',
        context:"It can produce in three minutes what would take you thirty. But it produced it without the context only you have. Your job is to read it, fix what's wrong, and own what you ship."
      },
      footer:"That's what every module after this one is about. Building the judgment to use these tools well."
    }
  ]
};

const M01_KNOWLEDGE_CHECK = [
  {
    id:'q1',
    question:'Which best describes how a large language model generates a response?',
    options:[
      'It searches a database of pre-written answers',
      'It predicts the most likely next token based on context',
      'It connects to the internet to find information',
      'It follows a set of hard-coded rules'
    ],
    correctIndex:1,
    explanation:"LLMs work by predicting the next token in a sequence based on patterns learned during training. They're not retrieving from a database, browsing the internet, or following fixed rules. The mechanism is prediction, full stop."
  },
  {
    id:'q2',
    question:"What's the relationship between AI, machine learning, and large language models?",
    options:[
      "They're three names for the same thing",
      'Machine learning is a subset of AI; LLMs are a specific kind of machine learning',
      'LLMs are a subset of AI; machine learning is a different field',
      'AI is the newest of the three; LLMs and ML came first'
    ],
    correctIndex:1,
    explanation:'Concentric circles. AI is the broad field. ML is a subset of AI. Deep learning is a subset of ML. LLMs are a specific kind of deep learning model. When most people say "AI" today, they actually mean an LLM.'
  },
  {
    id:'q3',
    question:"A teammate uses ChatGPT to draft a customer email. The AI confidently includes a product feature that doesn't exist. What's the most useful framing of why this happened?",
    options:[
      "The AI made a mistake. These tools just aren't reliable",
      'The AI was generating plausible next words, not stating verified facts',
      "The AI doesn't have access to the latest product information",
      "The AI is biased and shouldn't be trusted for customer-facing work"
    ],
    correctIndex:1,
    explanation:"This is hallucination. The model produced plausible-sounding next words, not verified facts. It wasn't mistaken in any human sense. It was doing exactly what it's designed to do. The takeaway: you're responsible for verifying anything the model produces before it goes out."
  }
];

// Sample data for Home (team activity feed + #gtm-ai chat)
const FEED_DATA = [
  { initials:'LR', name:'Lisa R.',   role:'RA · SMB',          badges:['grad'],         time:'4m ago',  ac:'#FF5BA8' },
  { initials:'MT', name:'Marcus T.', role:'SDR · Mid-Market',  badges:['roll'],          time:'18m ago', ac:'#B084FF' },
  { initials:'JP', name:'Jordan P.', role:'AE · Enterprise',   badges:['grad','level'],  time:'1h ago',  ac:'#3DD4A0' },
  { initials:'RC', name:'Ryan C.',   role:'AE · Enterprise',   badges:['grad','roll'],  time:'3h ago',  ac:'#7BB8FF' },
  { initials:'AP', name:'Aisha P.',  role:'RA · Enterprise',   badges:['first'],         time:'5h ago',  ac:'#FF8B5C' },
  { initials:'SK', name:'Sarah K.',  role:'AE · Enterprise',   badges:['first'],         time:'6h ago',  ac:'#FFD166' },
  { initials:'DW', name:'Dev W.',    role:'SDR · SMB',         badges:['roll','first'],  time:'7h ago',  ac:'#C77DFF' },
  { initials:'MN', name:'Maya N.',   role:'RA · Mid-Market',   badges:['grad'],          time:'9h ago',  ac:'#06D6A0' },
];
const CHAT_INIT = [
  { initials:'MT', name:'Marcus T.', badges:['roll'],         ac:'#B084FF', time:'2:34 PM', msg:'Anyone else finding M05 super useful? The hallucinations section completely changed how I verify AI outputs before sending to prospects.' },
  { initials:'JP', name:'Jordan P.', badges:['grad','level'], ac:'#3DD4A0', time:'2:36 PM', msg:'Just finished it last night. The confident-but-wrong examples. I now apply that every time I use a Gong summary before a call.' },
  { initials:'LR', name:'Lisa R.',   badges:['grad'],         ac:'#FF5BA8', time:'2:41 PM', msg:'🎓 Just earned AI 101 Graduate! Onto 201. For the first time I feel like I actually understand what these tools are doing, not just how to use them.' },
  { initials:'SK', name:'Sarah K.',  badges:['first'],        ac:'#FFD166', time:'2:44 PM', msg:'Congrats Lisa!! I need to stop procrastinating and finish M05 😅' },
  { initials:'DW', name:'Dev W.',    badges:['roll','first'], ac:'#C77DFF', time:'3:10 PM', msg:'M04 was 🔥. Used the Role/Task/Context/Format framework on a cold email yesterday. Booked a meeting same day.' },
];

// Insights filter options
const INSIGHTS_ROLES = ['AE','RA','SDR','OPS','Other'];
const SEGMENTS = ['Enterprise','Mid-Market','SMB','Strategic'];
const GEOS = ['Americas','EMEA','APAC'];
const TEAM_LEADS = ['Stacey W.','Shawn K.','Shane M.','Lori L.','Jordan P.'];

// ═══════════════════════════════════════════════════════════════════════════
// STORAGE · persistent state via window.storage
// ═══════════════════════════════════════════════════════════════════════════

const STORAGE_KEY = 'brainstorm:state-v3';

const initialState = {
  step:'login',                  // login | onboarding | app
  appScreen:'dashboard',         // home | dashboard | lesson | check | completion | paths | achievements | content | insights | settings
  user:null,                     // { name, role, type, team, proficiency, selfAssessedLevel }
  progress:{},                   // { M01: { score, completedAt } }
  level:1,                       // always starts at 1, advances by completing modules
  achievements:[],
  modulesCompletedInJourney:0,
  selectedModel:'claude-sonnet-4-20250514',
  drafts:[],
  published:[],
  theme:'dark',                  // light is mockup for now
};

const saveState = async (state) => {
  try { await window.storage.set(STORAGE_KEY, JSON.stringify(state)); }
  catch (e) { console.error('Brainstorm save failed:', e); }
};

const loadState = async () => {
  try {
    const r = await window.storage.get(STORAGE_KEY);
    if (r?.value) return JSON.parse(r.value);
    return null;
  } catch (e) { return null; }
};

const clearState = async () => {
  try { await window.storage.delete(STORAGE_KEY); } catch (e) {}
};

// ═══════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════

const renderRichText = (text) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ color:'#F5F0FF', fontWeight:600 }}>{part.slice(2, -2)}</strong>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
};

const totalProgressPercent = (modulesCompleted) => {
  return Math.round((modulesCompleted / AI_101_MODULES.length) * 100);
};

const formatDateShort = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month:'short', day:'numeric' });
};

// Achievement badge meta
const getBadges = (C) => ({
  first: { icon:'🚀', label:'First Step',         color:'#7BB8FF', bg:'rgba(123,184,255,0.12)', border:'rgba(123,184,255,0.35)' },
  roll:  { icon:'🔥', label:'On a Roll',          color:'#FFB347', bg:'rgba(255,179,71,0.12)',  border:'rgba(255,179,71,0.35)' },
  grad:  { icon:'🎓', label:'AI 101 Graduate',    color:C.violet,  bg:C.violetLight,            border:C.violetBorder },
  level: { icon:'⚡', label:'Practitioner',       color:C.pinkRose,bg:C.pinkLight,              border:C.pinkBorder },
});

// ═══════════════════════════════════════════════════════════════════════════
// SHARED UI PRIMITIVES
// ═══════════════════════════════════════════════════════════════════════════

// "BrAInstorm" wordmark with AI in Gong purple
const BrainstormMark = ({ size='md', C }) => {
  const sizes = {
    sm:{ mark:26, gap:8,  type:16, sub:9  },
    md:{ mark:32, gap:10, type:20, sub:10 },
    lg:{ mark:60, gap:14, type:42, sub:11 }
  };
  const s = sizes[size];
  return (
    <div style={{ display:'flex', alignItems:'center', gap:s.gap }}>
      <div style={{ position:'relative', width:s.mark, height:s.mark }}>
        <div style={{
          position:'absolute', inset:0, borderRadius:8,
          background:'linear-gradient(135deg, #B084FF 0%, #8039DF 50%, #3E0075 100%)',
          boxShadow:'0 0 0 1px rgba(176, 132, 255, 0.25), 0 8px 24px -10px rgba(128, 57, 223, 0.55)'
        }} />
        <div style={{
          position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center',
          color:'#fff', fontFamily:"'Bricolage Grotesque', sans-serif", fontWeight:800,
          fontSize:s.mark*0.58, letterSpacing:'-0.04em', lineHeight:1
        }}>B</div>
      </div>
      <div style={{ lineHeight:1 }}>
        <div style={{
          fontFamily:"'Bricolage Grotesque', sans-serif", fontSize:s.type, fontWeight:700,
          letterSpacing:'-0.035em', color:'#FAFAFA', lineHeight:1
        }}>
          Br<span style={{ color:'#B084FF', fontWeight:800 }}>AI</span>nstorm
        </div>
        {size === 'lg' && (
          <div style={{
            color:'#71717a', fontSize:s.sub, marginTop:6,
            letterSpacing:'0.18em', textTransform:'uppercase', fontWeight:500
          }}>by Gong</div>
        )}
      </div>
    </div>
  );
};

// Generic button with V4 variant API
const Btn = ({ children, onClick, variant='primary', size='md', icon, disabled, C, style }) => {
  const sizes = { sm:{ p:'7px 12px', fs:12 }, md:{ p:'10px 18px', fs:13 }, lg:{ p:'12px 22px', fs:14 } };
  const s = sizes[size];
  const variants = {
    primary:   { bg:`linear-gradient(135deg, ${C.gongPurple}, ${C.violetMid})`, color:'#fff',     border:'transparent' },
    secondary: { bg:C.card,         color:C.text,    border:C.border },
    ghost:     { bg:'transparent',  color:C.textSub, border:'transparent' },
    danger:    { bg:'transparent',  color:'#F87171', border:C.border },
  };
  const v = disabled ? { bg:C.cardAlt, color:C.textDim, border:C.border } : variants[variant];
  return (
    <button onClick={onClick} disabled={disabled}
      style={{
        display:'inline-flex', alignItems:'center', gap:7, background:v.bg, color:v.color,
        border:`1px solid ${v.border}`, borderRadius:9, padding:s.p, fontSize:s.fs,
        fontWeight:700, cursor:disabled?'default':'pointer', transition:'all 0.13s',
        fontFamily:'inherit', ...style
      }}>
      {icon}{children}
    </button>
  );
};

// Avatar circle with initials
const Avatar = ({ initials, ac, size=34 }) => (
  <div style={{
    width:size, height:size, borderRadius:'50%',
    background:`${ac}22`, border:`1.5px solid ${ac}55`,
    display:'flex', alignItems:'center', justifyContent:'center',
    fontSize:size*0.34, fontWeight:700, color:ac, flexShrink:0
  }}>
    {initials}
  </div>
);

const AvatarBadges = ({ badges, size=12, C }) => {
  const B = getBadges(C);
  return (
    <span style={{ display:'inline-flex', gap:3, alignItems:'center' }}>
      {badges.map(b => (
        <span key={b} title={B[b].label}
          style={{
            fontSize:size, lineHeight:1, background:B[b].bg, border:`1px solid ${B[b].border}`,
            borderRadius:4, padding:'1px 4px', display:'inline-flex', alignItems:'center'
          }}>
          {B[b].icon}
        </span>
      ))}
    </span>
  );
};

const BadgePill = ({ badgeKey, C }) => {
  const b = getBadges(C)[badgeKey];
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:4,
      background:b.bg, border:`1px solid ${b.border}`, borderRadius:20,
      padding:'2px 9px', fontSize:11, fontWeight:600, color:b.color, whiteSpace:'nowrap'
    }}>
      <span style={{ fontSize:12 }}>{b.icon}</span> {b.label}
    </span>
  );
};

// Reset control (subtle, bottom-right)
const ResetControl = ({ onReset, C }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}
        style={{
          position:'fixed', bottom:14, right:14, color:C.textDim,
          fontSize:11, fontFamily:'inherit', display:'flex', alignItems:'center', gap:5,
          padding:'5px 11px', borderRadius:999,
          border:`1px solid ${C.border}`, background:`${C.bg}cc`,
          backdropFilter:'blur(8px)', cursor:'pointer', zIndex:40
        }}
        title="Reset experience (for demos)"
      >
        <RotateCcw size={11} /> Reset
      </button>
      {open && (
        <div style={{
          position:'fixed', inset:0, zIndex:50, display:'flex', alignItems:'center', justifyContent:'center',
          background:'rgba(0,0,0,0.7)', backdropFilter:'blur(4px)'
        }}>
          <div style={{
            background:C.card, border:`1px solid ${C.border}`,
            borderRadius:16, padding:28, maxWidth:420, margin:'0 16px'
          }}>
            <h3 style={{
              fontFamily:"'Bricolage Grotesque', sans-serif", fontSize:24, color:C.text, marginBottom:8,
              letterSpacing:'-0.02em', fontWeight:700
            }}>Reset experience</h3>
            <p style={{ color:C.textSub, fontSize:13, marginBottom:20, lineHeight:1.6 }}>
              This wipes all progress and returns to the login screen. Useful between demos.
            </p>
            <div style={{ display:'flex', gap:10 }}>
              <button onClick={() => setOpen(false)} style={{
                flex:1, padding:'10px 14px', borderRadius:10,
                border:`1px solid ${C.border}`, color:C.textSub, background:'transparent',
                fontSize:13, fontFamily:'inherit', cursor:'pointer', fontWeight:600
              }}>Cancel</button>
              <button onClick={() => { onReset(); setOpen(false); }} style={{
                flex:1, padding:'10px 14px', borderRadius:10, border:'none',
                background:C.text, color:C.bg,
                fontSize:13, fontFamily:'inherit', cursor:'pointer', fontWeight:600
              }}>Reset</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SIDEBAR · appears on all post-onboarding screens
// ═══════════════════════════════════════════════════════════════════════════

const Sidebar = ({ screen, setScreen, C, user, level, modulesCompletedInJourney, achievements }) => {
  const navMain = [
    { id:'home',         label:'Home',         Icon:Home },
    { id:'dashboard',    label:'Dashboard',    Icon:LayoutDashboard },
    { id:'lesson',       label:'My Learning',  Icon:BookOpen },
    { id:'paths',        label:'Paths',        Icon:Map },
    { id:'achievements', label:'Achievements', Icon:Trophy },
  ];
  const navAdmin = [
    { id:'content',  label:'Content',  Icon:FileText },
    { id:'insights', label:'Insights', Icon:BarChart3 },
    { id:'settings', label:'Settings', Icon:SettingsIcon },
  ];

  const isActive = (id) =>
    screen === id ||
    (screen === 'check' && id === 'lesson') ||
    (screen === 'completion' && id === 'lesson') ||
    (screen === 'lesson' && id === 'lesson');

  const NavBtn = ({ id, label, Icon }) => {
    const active = isActive(id);
    return (
      <button onClick={() => setScreen(id)}
        style={{
          display:'flex', alignItems:'center', gap:9, width:'100%', padding:'9px 11px',
          borderRadius:8, border:'none', cursor:'pointer',
          background:active ? C.violetLight : 'transparent',
          color:active ? C.violet : C.textSub,
          fontSize:13, fontWeight:active ? 700 : 500,
          textAlign:'left', marginBottom:2, fontFamily:'inherit',
          transition:'all 0.12s'
        }}>
        <Icon size={15} />{label}
      </button>
    );
  };

  const currentLevel = LEVELS.find(l => l.num === level);
  const nextLevel = LEVELS.find(l => l.num === level + 1);
  const journeyPercent = totalProgressPercent(modulesCompletedInJourney);

  return (
    <div style={{
      width:230, background:C.surface, borderRight:`1px solid ${C.border}`,
      display:'flex', flexDirection:'column', height:'100vh', flexShrink:0
    }}>
      {/* Top: wordmark */}
      <div style={{ padding:'22px 16px 14px' }}>
        <div style={{ marginBottom:18 }}>
          <BrainstormMark size="sm" C={C} />
        </div>

        {/* User profile pill */}
        <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:14 }}>
          <Avatar initials={(user?.name || 'U').split(' ').map(s=>s[0]).join('').slice(0,2).toUpperCase()} ac={C.violet} size={34} />
          <div style={{ minWidth:0, flex:1 }}>
            <div style={{ fontSize:13, fontWeight:700, color:C.text, lineHeight:1.2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
              {user?.name || 'User'}
            </div>
            <div style={{ fontSize:11, color:C.textSub, marginTop:2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
              {user?.role}{user?.team ? ` · ${user.team}` : ''}
            </div>
          </div>
        </div>

        {/* Level meter */}
        {currentLevel && (
          <div style={{
            background:C.violetLight, border:`1px solid ${C.violetBorder}`,
            borderRadius:10, padding:'10px 12px', marginBottom:8
          }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}>
              <span style={{ fontSize:10, fontWeight:700, color:C.violet, letterSpacing:'0.06em', textTransform:'uppercase' }}>
                Level {currentLevel.num} · {currentLevel.name}
              </span>
            </div>
            {nextLevel && (
              <>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 }}>
                  <span style={{ fontSize:11, color:C.textSub }}>{'\u2192'} {nextLevel.name}</span>
                  <span style={{ fontSize:11, fontWeight:700, color:C.violet, fontFamily:'monospace' }}>{journeyPercent}%</span>
                </div>
                <div style={{ height:5, background:`${C.violet}22`, borderRadius:3 }}>
                  <div style={{
                    width:`${journeyPercent}%`, height:'100%',
                    background:`linear-gradient(90deg, ${C.gongPurple}, ${C.violet})`, borderRadius:3,
                    transition:'width 0.6s ease'
                  }} />
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Main nav */}
      <div style={{ flex:1, padding:'4px 8px', display:'flex', flexDirection:'column', overflow:'auto' }}>
        <div>{navMain.map(n => <NavBtn key={n.id} {...n} />)}</div>

        {/* Admin section */}
        <div style={{ marginTop:'auto', paddingTop:14, borderTop:`1px solid ${C.border}` }}>
          <div style={{
            fontSize:10, fontWeight:700, color:C.textDim,
            letterSpacing:'0.1em', textTransform:'uppercase', padding:'4px 11px 7px'
          }}>Admin</div>
          {navAdmin.map(n => <NavBtn key={n.id} {...n} />)}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding:'12px 16px', borderTop:`1px solid ${C.border}` }}>
        <div style={{ fontSize:10, color:C.textDim, letterSpacing:'0.05em' }}>Brainstorm v1 · Internal Pilot</div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SCREEN: Login (mocked Google OAuth)
// ═══════════════════════════════════════════════════════════════════════════

const GoogleG = () => (
  <svg width="16" height="16" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
    <path fill="#FF3D00" d="M6.3 14.1l6.6 4.8C14.6 15.1 18.9 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.1z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 9.8-2 13.3-5.2l-6.1-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.1 5.2c-.4.4 6.7-4.9 6.7-14.8 0-1.3-.1-2.4-.4-3.5z"/>
  </svg>
);

const LoginScreen = ({ onLogin, C }) => {
  const [signing, setSigning] = useState(false);
  const handleClick = () => { setSigning(true); setTimeout(() => onLogin(), 700); };

  return (
    <div style={{
      minHeight:'100vh', display:'flex', flexDirection:'column',
      background:C.bg, position:'relative', overflow:'hidden'
    }}>
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none', opacity:0.6,
        background:'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(128, 57, 223, 0.18), transparent 60%), radial-gradient(ellipse 60% 40% at 50% 110%, rgba(128, 57, 223, 0.12), transparent 60%)'
      }} />

      <div style={{ position:'relative', zIndex:10, padding:'28px 32px' }}>
        <BrainstormMark size="md" C={C} />
      </div>

      <div style={{ position:'relative', zIndex:10, flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'0 24px 80px' }}>
        <div style={{ maxWidth:560, width:'100%' }}>
          <div style={{ textAlign:'center', marginBottom:48 }} className="bs-fade">
            <div style={{
              display:'inline-flex', alignItems:'center', gap:8, padding:'5px 12px', borderRadius:999,
              border:`1px solid ${C.border}`, background:`${C.card}99`, color:C.textSub, fontSize:12,
              marginBottom:32
            }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:C.violet, boxShadow:`0 0 8px ${C.violet}` }} />
              Internal pilot · Gong GTM
            </div>
            <h1 style={{
              fontFamily:"'Bricolage Grotesque', sans-serif", fontWeight:700,
              color:C.text, marginBottom:20, lineHeight:1.05,
              fontSize:'clamp(2.5rem, 6vw, 4.25rem)', letterSpacing:'-0.025em'
            }}>
              AI fluency, <span style={{ color:C.violet, fontWeight:800 }}>earned</span><br />
              course by course.
            </h1>
            <p style={{ color:C.textSub, fontSize:18, maxWidth:440, margin:'0 auto', lineHeight:1.55 }}>
              A structured path from AI literacy to AI fluency, built for how Gong reps actually work.
            </p>
          </div>

          <div className="bs-fade" style={{
            position:'relative', borderRadius:16, border:`1px solid ${C.border}`,
            padding:28, margin:'0 auto', maxWidth:420,
            background:`linear-gradient(180deg, ${C.card}E6, ${C.surface}E6)`,
            backdropFilter:'blur(8px)', animationDelay:'120ms'
          }}>
            <div style={{ color:C.textDim, fontSize:11, marginBottom:20, letterSpacing:'0.1em', textTransform:'uppercase', fontWeight:600 }}>
              Sign in to continue
            </div>
            <button onClick={handleClick} disabled={signing}
              style={{
                width:'100%', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:12,
                padding:'14px 20px', borderRadius:12, background:'#FAFAFA', color:C.bg,
                border:'none', fontFamily:'inherit', fontWeight:600, fontSize:14,
                cursor:signing ? 'default' : 'pointer', opacity:signing ? 0.7 : 1, transition:'all 0.13s'
              }}>
              {signing ? (
                <>
                  <div style={{
                    width:16, height:16, border:`2px solid ${C.bg}`, borderTopColor:'transparent',
                    borderRadius:'50%'
                  }} className="bs-spin" />
                  Signing in...
                </>
              ) : (
                <><GoogleG /> Continue with Google</>
              )}
            </button>
            <div style={{
              marginTop:20, paddingTop:20, borderTop:`1px solid ${C.border}`,
              color:C.textDim, fontSize:12, lineHeight:1.6
            }}>
              Restricted to <span style={{ color:C.text }}>@gong.io</span> identities. By continuing you agree to internal use guidelines.
            </div>
          </div>

          <div className="bs-fade" style={{ textAlign:'center', marginTop:48, color:C.textDim, fontSize:11, letterSpacing:'0.05em', animationDelay:'240ms' }}>
            v1 · Brainstorm Pilot · GTM AI Strategy & Enablement
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SCREEN: Onboarding (3 steps)
// Step 1: name, role, type, team
// Step 2: AI proficiency
// Step 3: 5-level self-assessment (captured but does not change starting level)
// ═══════════════════════════════════════════════════════════════════════════

const OnboardingScreen = ({ onComplete, C }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name:'', role:'', type:'', team:'',
    proficiency:'', selfAssessedLevel:null
  });
  const update = (k, v) => setData({ ...data, [k]: v });

  const stepValid = (() => {
    if (step === 0) return data.name.trim().length > 0 && data.role && data.type && data.team;
    if (step === 1) return data.proficiency;
    if (step === 2) return data.selfAssessedLevel !== null;
    return true;
  })();

  const next = () => {
    if (step < 2) setStep(step + 1);
    else onComplete(data);
  };
  const back = () => step > 0 && setStep(step - 1);

  return (
    <div style={{ minHeight:'100vh', position:'relative', background:C.bg, overflow:'hidden' }}>
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none', opacity:0.5,
        background:'radial-gradient(ellipse 70% 40% at 30% 0%, rgba(128, 57, 223, 0.14), transparent 60%)'
      }} />

      {/* Top bar with stepper */}
      <div style={{ position:'relative', zIndex:10, padding:'28px 32px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <BrainstormMark size="sm" C={C} />
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              height:4, borderRadius:2,
              width: i === step ? 32 : 12,
              background: i <= step ? C.violet : C.border,
              transition:'all 0.5s'
            }} />
          ))}
        </div>
      </div>

      <div style={{ position:'relative', zIndex:10, maxWidth:680, margin:'0 auto', padding:'56px 24px 80px' }}>
        <div style={{ color:C.textDim, fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:14, fontWeight:600 }}>
          Step {step + 1} of 3
        </div>

        {step === 0 && (
          <div className="bs-fade">
            <h2 style={{
              fontFamily:"'Bricolage Grotesque', sans-serif", color:C.text, lineHeight:1.05,
              marginBottom:14, fontSize:'clamp(2rem, 4.5vw, 3rem)', letterSpacing:'-0.02em', fontWeight:700
            }}>
              Tell us <span style={{ color:C.violet, fontWeight:800 }}>who you are.</span>
            </h2>
            <p style={{ color:C.textSub, marginBottom:40, maxWidth:440, lineHeight:1.6, fontSize:15 }}>
              We use this to tailor your path. An AE journey looks different from an SDR's, and we want to get that right.
            </p>

            <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
              <FieldGroup label="Your name" C={C}>
                <input
                  type="text" value={data.name} onChange={e => update('name', e.target.value)}
                  placeholder="First and last"
                  style={{
                    width:'100%', background:C.input, border:`1px solid ${C.border}`,
                    borderRadius:12, padding:'12px 16px', fontSize:14, color:C.text,
                    outline:'none', fontFamily:'inherit', transition:'border-color 0.15s'
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = C.violetBorder}
                  onBlur={e => e.currentTarget.style.borderColor = C.border}
                />
              </FieldGroup>
              <FieldGroup label="Your role" C={C}>
                <SelectGrid options={ROLES} value={data.role} onChange={v => update('role', v)} columns={5} C={C} />
              </FieldGroup>
              <FieldGroup label="Are you a contributor or a leader?" C={C}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                  {TYPES.map(t => (
                    <button key={t.value} onClick={() => update('type', t.value)}
                      style={{
                        padding:'14px 16px', borderRadius:12, textAlign:'left', cursor:'pointer',
                        fontFamily:'inherit', transition:'all 0.13s',
                        background: data.type === t.value ? C.violetLight : C.card,
                        border: `1px solid ${data.type === t.value ? C.violetBorder : C.border}`,
                        color: data.type === t.value ? C.text : C.textSub
                      }}>
                      <div style={{ fontSize:14, fontWeight:700, color: data.type === t.value ? C.text : C.text, marginBottom:2 }}>
                        {t.label}
                      </div>
                      <div style={{ fontSize:12, color:C.textSub }}>{t.desc}</div>
                    </button>
                  ))}
                </div>
              </FieldGroup>
              <FieldGroup label="Your team" C={C}>
                <SelectGrid options={TEAMS} value={data.team} onChange={v => update('team', v)} columns={5} C={C} />
              </FieldGroup>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bs-fade">
            <h2 style={{
              fontFamily:"'Bricolage Grotesque', sans-serif", color:C.text, lineHeight:1.05,
              marginBottom:14, fontSize:'clamp(2rem, 4.5vw, 3rem)', letterSpacing:'-0.02em', fontWeight:700
            }}>
              Where are you <span style={{ color:C.violet, fontWeight:800 }}>today</span> with AI?
            </h2>
            <p style={{ color:C.textSub, marginBottom:40, maxWidth:440, lineHeight:1.6, fontSize:15 }}>
              Self-assessed. There are no wrong answers, just an honest baseline so we can show you the right next step.
            </p>

            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {PROFICIENCY.map(p => (
                <button key={p.value} onClick={() => update('proficiency', p.value)}
                  style={{
                    width:'100%', textAlign:'left', padding:18, borderRadius:12,
                    background: data.proficiency === p.value ? C.violetLight : C.card,
                    border: `1px solid ${data.proficiency === p.value ? C.violetBorder : C.border}`,
                    cursor:'pointer', transition:'all 0.13s', fontFamily:'inherit'
                  }}>
                  <div style={{ display:'flex', alignItems:'flex-start', gap:14 }}>
                    <div style={{
                      marginTop:2, width:18, height:18, borderRadius:'50%',
                      border:`2px solid ${data.proficiency === p.value ? C.violet : C.border}`,
                      flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center'
                    }}>
                      {data.proficiency === p.value && <div style={{ width:8, height:8, borderRadius:'50%', background:C.violet }} />}
                    </div>
                    <div>
                      <div style={{ color:C.text, fontWeight:600, marginBottom:3, fontSize:15 }}>{p.label}</div>
                      <div style={{ color:C.textSub, fontSize:13, lineHeight:1.55 }}>{p.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bs-fade">
            <h2 style={{
              fontFamily:"'Bricolage Grotesque', sans-serif", color:C.text, lineHeight:1.05,
              marginBottom:14, fontSize:'clamp(2rem, 4.5vw, 3rem)', letterSpacing:'-0.02em', fontWeight:700
            }}>
              Where do you <span style={{ color:C.violet, fontWeight:800 }}>see yourself</span> on the path?
            </h2>
            <p style={{ color:C.textSub, marginBottom:32, maxWidth:520, lineHeight:1.6, fontSize:15 }}>
              The five levels of AI fluency. Pick the one that sounds most like you right now. Everyone starts the curriculum at Level 1, this is just a snapshot of where you think you are.
            </p>

            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {LEVELS.map(lvl => {
                const sel = data.selfAssessedLevel === lvl.num;
                return (
                  <button key={lvl.num} onClick={() => update('selfAssessedLevel', lvl.num)}
                    style={{
                      width:'100%', textAlign:'left', padding:'16px 18px', borderRadius:12,
                      background: sel ? C.violetLight : C.card,
                      border: `1px solid ${sel ? C.violetBorder : C.border}`,
                      cursor:'pointer', transition:'all 0.13s', fontFamily:'inherit',
                      display:'flex', alignItems:'flex-start', gap:14
                    }}>
                    <div style={{
                      flexShrink:0, width:36, height:36, borderRadius:8,
                      background: sel
                        ? `linear-gradient(135deg, ${C.gongPurple}, ${C.violetMid})`
                        : C.cardAlt,
                      border:`1px solid ${sel ? 'transparent' : C.border}`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontFamily:"'Bricolage Grotesque', sans-serif", fontWeight:800,
                      color: sel ? '#fff' : C.textSub, fontSize:14, letterSpacing:'-0.02em'
                    }}>
                      L{lvl.num}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:'flex', alignItems:'baseline', gap:10, marginBottom:4 }}>
                        <div style={{ color:C.text, fontWeight:700, fontSize:15 }}>{lvl.name}</div>
                      </div>
                      <div style={{ color:C.textSub, fontSize:13, lineHeight:1.55 }}>
                        {lvl.selfDesc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer with nav */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:48 }}>
          {step > 0 ? (
            <Btn onClick={back} variant="secondary" icon={<ArrowLeft size={14} />} C={C}>Back</Btn>
          ) : <div />}
          <Btn onClick={next} disabled={!stepValid} icon={<ArrowRight size={14} />} C={C}>
            {step === 2 ? 'Enter Brainstorm' : 'Continue'}
          </Btn>
        </div>
      </div>
    </div>
  );
};

const FieldGroup = ({ label, children, C }) => (
  <div>
    <div style={{ color:C.textSub, fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:10, fontWeight:600 }}>
      {label}
    </div>
    {children}
  </div>
);

const SelectGrid = ({ options, value, onChange, columns=2, C }) => (
  <div style={{ display:'grid', gap:8, gridTemplateColumns:`repeat(${columns}, minmax(0, 1fr))` }}>
    {options.map(opt => (
      <button key={opt} onClick={() => onChange(opt)}
        style={{
          padding:'12px 14px', borderRadius:10, fontSize:13, textAlign:'center', cursor:'pointer',
          fontFamily:'inherit', fontWeight:600, transition:'all 0.13s',
          background: value === opt ? C.violetLight : C.card,
          border: `1px solid ${value === opt ? C.violetBorder : C.border}`,
          color: value === opt ? C.text : C.textSub
        }}>
        {opt}
      </button>
    ))}
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// SCREEN: Dashboard
// ═══════════════════════════════════════════════════════════════════════════

const DashboardScreen = ({ user, progress, level, achievements, modulesCompletedInJourney, onSelectModule, C }) => {
  const currentLevel = LEVELS.find(l => l.num === level);
  const nextLevel = LEVELS.find(l => l.num === level + 1);
  const journeyPercent = totalProgressPercent(modulesCompletedInJourney);

  const firstIncompleteIdx = AI_101_MODULES.findIndex(m => !progress[m.id]);
  const firstIncompleteModule = AI_101_MODULES[firstIncompleteIdx];
  const firstName = (user?.name || 'there').split(' ')[0];

  return (
    <div style={{ height:'100vh', overflow:'auto', background:C.bg }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'48px 48px 64px' }}>
        {/* Welcome */}
        <div className="bs-fade" style={{ marginBottom:40 }}>
          <div style={{ color:C.textDim, fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:12, fontWeight:600 }}>
            Dashboard
          </div>
          <h1 style={{
            fontFamily:"'Bricolage Grotesque', sans-serif", color:C.text, lineHeight:1.05,
            marginBottom:14, fontSize:'clamp(2rem, 4vw, 3.25rem)', letterSpacing:'-0.025em', fontWeight:700
          }}>
            Hi {firstName}, you{"'"}re at <span style={{ color:C.violet, fontWeight:800 }}>{currentLevel?.name}.</span>
          </h1>
          <p style={{ color:C.textSub, fontSize:18, maxWidth:680, lineHeight:1.55 }}>
            {firstIncompleteModule
              ? <>Your next move: finish <span style={{ color:C.text, fontWeight:600 }}>{firstIncompleteModule.title}</span> to keep moving toward {nextLevel?.name}.</>
              : <>You{"'"}ve cleared every module currently published. The next path is queued up.</>
            }
          </p>
        </div>

        {/* Active Path card */}
        <div className="bs-fade" style={{
          borderRadius:16, border:`1px solid ${C.border}`, padding:32, marginBottom:32,
          background:`linear-gradient(180deg, ${C.card}B3, ${C.surface}B3)`,
          animationDelay:'80ms'
        }}>
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:28 }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:8 }}>
                <div style={{ color:C.textDim, fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', fontWeight:600 }}>
                  Active Path
                </div>
                <div style={{ color:C.textDim, fontSize:11 }}>·</div>
                <div style={{ color:C.violet, fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', fontWeight:700 }}>
                  L1 → L2
                </div>
              </div>
              <div style={{
                fontFamily:"'Bricolage Grotesque', sans-serif", color:C.text, fontSize:32,
                marginBottom:4, letterSpacing:'-0.02em', fontWeight:700, lineHeight:1
              }}>
                AI 101
              </div>
              <div style={{ color:C.textSub, fontSize:13 }}>
                Foundation · 7 modules · {modulesCompletedInJourney}/{AI_101_MODULES.length} complete
              </div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{
                fontFamily:"'Bricolage Grotesque', sans-serif", color:C.text, fontSize:48,
                lineHeight:1, letterSpacing:'-0.04em', fontWeight:700
              }}>
                {journeyPercent}<span style={{ color:C.textDim, fontSize:24 }}>%</span>
              </div>
              <div style={{ color:C.textDim, fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', marginTop:4, fontWeight:600 }}>
                Course progress
              </div>
            </div>
          </div>

          {/* Modules list */}
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {AI_101_MODULES.map((mod, idx) => {
              const isCompleted = !!progress[mod.id];
              const isAvailable = idx === 0 || progress[AI_101_MODULES[idx - 1]?.id];
              const isCurrent = !isCompleted && isAvailable;
              return (
                <ModuleRow
                  key={mod.id}
                  module={mod}
                  completed={isCompleted}
                  available={isAvailable}
                  current={isCurrent}
                  onClick={() => isAvailable && onSelectModule(mod.id)}
                  score={progress[mod.id]?.score}
                  C={C}
                />
              );
            })}
          </div>
        </div>

        {/* Bottom strip: TWO EQUAL COLUMNS */}
        <div className="bs-fade" style={{
          display:'grid', gridTemplateColumns:'1fr 1fr', gap:24,
          animationDelay:'160ms'
        }}>
          {/* Achievements */}
          <div style={{
            borderRadius:16, border:`1px solid ${C.border}`, padding:24,
            background:`${C.card}80`
          }}>
            <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:20 }}>
              <div>
                <div style={{ color:C.textDim, fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:4, fontWeight:600 }}>
                  Achievements
                </div>
                <div style={{ fontFamily:"'Bricolage Grotesque', sans-serif", color:C.text, fontSize:22, letterSpacing:'-0.02em', fontWeight:700 }}>
                  {achievements.length} earned
                </div>
              </div>
              <Trophy size={20} color={C.textDim} />
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:10 }}>
              <AchievementSlot earned={achievements.includes('foundations-started')} title="Foundations Started" desc="Completed your first module" C={C} />
              <AchievementSlot earned={false} title="AI 101 Graduate"     desc="Completed AI 101"   locked C={C} />
              <AchievementSlot earned={false} title="The Novice"          desc="Reached Level 2"    locked C={C} />
              <AchievementSlot earned={false} title="Practitioner"        desc="Reached Level 3"    locked C={C} />
            </div>
          </div>

          {/* After AI 101 */}
          <div style={{
            borderRadius:16, border:`1px solid ${C.border}`, padding:24,
            background:`${C.card}80`
          }}>
            <div style={{ marginBottom:20 }}>
              <div style={{ color:C.textDim, fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:4, fontWeight:600 }}>
                After AI 101
              </div>
              <div style={{ fontFamily:"'Bricolage Grotesque', sans-serif", color:C.text, fontSize:22, letterSpacing:'-0.02em', fontWeight:700 }}>
                What{"'"}s queued up
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              <LockedPath name="AI 201 · Application" levelRange="L2 → L3" C={C} />
              <LockedPath name={`AI 301 · ${user?.role || 'Role'} Specialization`} levelRange="L3" C={C} />
              <LockedPath name="AI 401 · Orchestration" levelRange="L3 → L4" C={C} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModuleRow = ({ module, completed, available, current, onClick, score, C }) => {
  const Icon = completed ? CheckCircle2 : (current ? Sparkles : (available ? ChevronRight : Lock));
  return (
    <button onClick={onClick} disabled={!available}
      style={{
        width:'100%', display:'flex', alignItems:'center', gap:18, padding:14,
        borderRadius:12, textAlign:'left', cursor:available ? 'pointer' : 'not-allowed',
        fontFamily:'inherit', transition:'all 0.13s',
        background: current
          ? `${C.violet}0D`
          : completed
          ? `${C.card}66`
          : available
          ? `${C.card}4D`
          : `${C.bg}66`,
        border:`1px solid ${current ? C.violetBorder : completed ? C.border : available ? C.border : C.borderLight}`,
        opacity: available ? 1 : 0.55
      }}>
      <div style={{
        width:42, height:42, borderRadius:10, flexShrink:0,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontFamily:"'Bricolage Grotesque', sans-serif", fontWeight:700,
        fontSize:14, letterSpacing:'-0.02em',
        background: completed ? 'rgba(61, 212, 160, 0.1)' : current ? `${C.violet}1A` : C.cardAlt,
        color: completed ? C.green : current ? C.violet : C.textSub
      }}>
        {module.num}
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:2 }}>
          <div style={{ color: available ? C.text : C.textSub, fontWeight:600, fontSize:14 }}>{module.title}</div>
          {current && (
            <span style={{
              padding:'2px 8px', borderRadius:4, fontSize:10, letterSpacing:'0.08em',
              textTransform:'uppercase', fontWeight:700, color:C.violet,
              background:`${C.violet}1A`, border:`1px solid ${C.violet}33`
            }}>Start here</span>
          )}
          {completed && (
            <span style={{
              padding:'2px 8px', borderRadius:4, fontSize:10, letterSpacing:'0.08em',
              textTransform:'uppercase', fontWeight:700, color:C.green,
              background:`${C.green}1A`, border:`1px solid ${C.green}33`
            }}>{score}%</span>
          )}
        </div>
        <div style={{ color:C.textSub, fontSize:13, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
          {module.subtitle}
        </div>
      </div>
      <div style={{ color:C.textDim, fontSize:11, letterSpacing:'0.05em', marginRight:4 }}>
        {module.minutes} min
      </div>
      <Icon size={18} color={completed ? C.green : current ? C.violet : available ? C.textSub : C.textDim} />
    </button>
  );
};

const AchievementSlot = ({ earned, title, desc, locked, C }) => (
  <div style={{
    position:'relative', borderRadius:12, padding:14,
    display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center',
    background: earned
      ? 'linear-gradient(180deg, rgba(255, 179, 71, 0.1), rgba(255, 179, 71, 0.02))'
      : `${C.card}66`,
    border: earned
      ? '1px solid rgba(255, 179, 71, 0.3)'
      : `1px solid ${C.border}`,
    transition:'all 0.13s'
  }}>
    <div style={{
      width:38, height:38, borderRadius:'50%',
      display:'flex', alignItems:'center', justifyContent:'center', marginBottom:8,
      background: earned
        ? 'linear-gradient(135deg, #FFD166, #FF9F1C)'
        : C.cardAlt
    }}>
      {earned ? <Trophy size={17} color="#5A2D00" /> : <Lock size={13} color={C.textDim} />}
    </div>
    <div style={{ color: earned ? C.text : C.textDim, fontSize:11, fontWeight:600, marginBottom:2 }}>{title}</div>
    <div style={{ color:C.textDim, fontSize:10, lineHeight:1.4 }}>{desc}</div>
  </div>
);

const LockedPath = ({ name, levelRange, C }) => (
  <div style={{
    display:'flex', alignItems:'center', gap:12, padding:'12px 14px',
    borderRadius:10, border:`1px solid ${C.border}`, background:`${C.card}4D`
  }}>
    <Lock size={13} color={C.textDim} />
    <div style={{ flex:1, minWidth:0 }}>
      <div style={{ color:C.textSub, fontSize:13, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{name}</div>
      <div style={{ color:C.textDim, fontSize:10, letterSpacing:'0.08em', textTransform:'uppercase', marginTop:1 }}>{levelRange}</div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// SCREEN: Lesson (M01 · full content)
// ═══════════════════════════════════════════════════════════════════════════

const LessonScreen = ({ user, onBack, onStartCheck, C }) => {
  const lesson = M01_LESSON;
  return (
    <div style={{ height:'100vh', overflow:'auto', background:C.bg }}>
      {/* Top bar */}
      <div style={{
        position:'sticky', top:0, zIndex:30, borderBottom:`1px solid ${C.border}`,
        background:`${C.bg}D9`, backdropFilter:'blur(8px)'
      }}>
        <div style={{ maxWidth:780, margin:'0 auto', padding:'14px 32px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <button onClick={onBack} style={{
            display:'flex', alignItems:'center', gap:8, color:C.textSub, fontSize:13,
            background:'none', border:'none', cursor:'pointer', fontFamily:'inherit'
          }}>
            <ArrowLeft size={15} /> Back to dashboard
          </button>
          <div style={{ display:'flex', alignItems:'center', gap:14, color:C.textDim, fontSize:11 }}>
            <span style={{ letterSpacing:'0.1em', textTransform:'uppercase', fontWeight:600 }}>Module 01</span>
            <span style={{ color:C.borderLight }}>·</span>
            <span>{lesson.estimatedMinutes} min read</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <article style={{ maxWidth:780, margin:'0 auto', padding:'80px 32px 48px' }}>
        <div className="bs-fade" style={{ color:C.violet, fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:20, fontWeight:700 }}>
          AI 101 · Module 01 · Foundation
        </div>
        <h1 className="bs-fade" style={{
          fontFamily:"'Bricolage Grotesque', sans-serif", color:C.text, lineHeight:0.98,
          marginBottom:24, fontSize:'clamp(3rem, 7vw, 5.5rem)', letterSpacing:'-0.035em',
          fontWeight:700, animationDelay:'60ms'
        }}>
          {lesson.title}
        </h1>
        <p className="bs-fade" style={{
          fontFamily:"'Bricolage Grotesque', sans-serif", fontWeight:500,
          color:C.textSub, fontSize:24, lineHeight:1.3, marginBottom:40,
          letterSpacing:'-0.01em', animationDelay:'120ms'
        }}>
          {lesson.subtitle}
        </p>
        <div className="bs-fade" style={{
          borderLeft:`2px solid ${C.violetBorder}`, paddingLeft:20,
          color:C.textSub, lineHeight:1.7, fontSize:15, animationDelay:'180ms'
        }}>
          {lesson.intro}
        </div>
      </article>

      {/* Sections */}
      <div style={{ maxWidth:780, margin:'0 auto', padding:'0 32px 64px', display:'flex', flexDirection:'column', gap:80 }}>
        {lesson.sections.map((section, idx) => (
          <LessonSection key={idx} section={section} C={C} />
        ))}
      </div>

      {/* CTA to knowledge check */}
      <div style={{ maxWidth:780, margin:'0 auto', padding:'0 32px 96px' }}>
        <div style={{
          borderRadius:16, border:`1px solid ${C.border}`, padding:32, textAlign:'center',
          background:`linear-gradient(180deg, ${C.violet}0F, ${C.violet}03)`
        }}>
          <Target size={28} color={C.violet} style={{ margin:'0 auto 16px' }} />
          <h3 style={{
            fontFamily:"'Bricolage Grotesque', sans-serif", color:C.text, fontSize:30,
            marginBottom:8, letterSpacing:'-0.02em', fontWeight:700
          }}>Ready to check your understanding?</h3>
          <p style={{ color:C.textSub, marginBottom:24, maxWidth:440, margin:'0 auto 24px', lineHeight:1.6, fontSize:15 }}>
            Three short questions. They{"'"}re designed to test whether the mental model stuck, not to trip you up.
          </p>
          <Btn onClick={onStartCheck} icon={<ArrowRight size={14} />} C={C} size="lg">
            Start the knowledge check
          </Btn>
        </div>
      </div>
    </div>
  );
};

const LessonSection = ({ section, C }) => (
  <section className="bs-fade">
    <div style={{ marginBottom:32 }}>
      <div style={{ display:'flex', alignItems:'baseline', gap:16, marginBottom:12 }}>
        <div style={{
          fontFamily:"'Bricolage Grotesque', sans-serif", color:C.violet, fontSize:13,
          letterSpacing:'0.05em', fontWeight:700
        }}>
          {section.number}
        </div>
        <div style={{ color:C.textDim, fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', fontWeight:600 }}>
          {section.kicker}
        </div>
      </div>
      <h2 style={{
        fontFamily:"'Bricolage Grotesque', sans-serif", color:C.text, lineHeight:1.05,
        fontSize:'clamp(2rem, 4vw, 2.75rem)', letterSpacing:'-0.025em', fontWeight:700
      }}>
        {section.title}
      </h2>
    </div>

    <div style={{ display:'flex', flexDirection:'column', gap:20, color:C.textSub, lineHeight:1.7, fontSize:17 }}>
      {section.paragraphs.map((p, i) => (
        <p key={i}>{renderRichText(p)}</p>
      ))}
    </div>

    {section.callout && (
      <div style={{
        margin:'40px 0', borderRadius:16,
        border:`1px solid ${C.violet}33`, padding:28,
        background:`linear-gradient(180deg, ${C.violet}14, ${C.violet}05)`
      }}>
        <div style={{ display:'flex', alignItems:'flex-start', gap:16 }}>
          <Lightbulb size={20} color={C.violet} style={{ flexShrink:0, marginTop:4 }} />
          <div>
            <div style={{ color:C.violet, fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:8, fontWeight:700 }}>
              {section.callout.title}
            </div>
            <div style={{ color:C.text, lineHeight:1.7, fontSize:15 }}>{section.callout.body}</div>
          </div>
        </div>
      </div>
    )}

    {section.consequences && (
      <div style={{ margin:'40px 0', display:'flex', flexDirection:'column', gap:16 }}>
        {section.consequences.map((c, i) => (
          <div key={i} style={{
            borderRadius:12, border:`1px solid ${C.border}`,
            padding:24, display:'flex', gap:20,
            background:`${C.card}80`
          }}>
            <div style={{
              fontFamily:"'Bricolage Grotesque', sans-serif", fontSize:32, lineHeight:1,
              flexShrink:0, marginTop:4, fontWeight:800,
              background:`linear-gradient(180deg, ${C.violet}, ${C.gongPurple})`,
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
              letterSpacing:'-0.04em'
            }}>{c.number}</div>
            <div>
              <div style={{ color:C.text, fontWeight:700, marginBottom:6, fontSize:16 }}>{c.title}</div>
              <div style={{ color:C.textSub, lineHeight:1.7, fontSize:15 }}>{c.body}</div>
            </div>
          </div>
        ))}
      </div>
    )}

    {section.lists && (
      <div style={{ margin:'40px 0', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:20 }}>
        {section.lists.map((list, i) => (
          <div key={i} style={{
            borderRadius:12, padding:24,
            border:`1px solid ${list.tone === 'positive' ? `${C.green}33` : 'rgba(255, 179, 71, 0.3)'}`,
            background: list.tone === 'positive'
              ? `linear-gradient(180deg, ${C.green}0F, ${C.green}03)`
              : 'linear-gradient(180deg, rgba(255, 179, 71, 0.06), rgba(255, 179, 71, 0.01))'
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
              {list.tone === 'positive'
                ? <Zap size={15} color={C.green} />
                : <AlertTriangle size={15} color="#FFB347" />}
              <div style={{
                color: list.tone === 'positive' ? C.green : '#FFB347',
                fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase', fontWeight:700
              }}>
                {list.heading}
              </div>
            </div>
            <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:12 }}>
              {list.items.map((item, j) => (
                <li key={j} style={{ display:'flex', gap:12, color:C.textSub, fontSize:14, lineHeight:1.55 }}>
                  <span style={{
                    flexShrink:0, marginTop:8, width:4, height:4, borderRadius:'50%',
                    background: list.tone === 'positive' ? C.green : '#FFB347'
                  }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )}

    {section.pullquote && (
      <div style={{ margin:'48px 0', textAlign:'center' }}>
        <div style={{
          fontFamily:"'Bricolage Grotesque', sans-serif", color:C.text, lineHeight:1.1,
          marginBottom:20, fontSize:'clamp(2rem, 4vw, 3rem)', letterSpacing:'-0.02em', fontWeight:700
        }}>
          {section.pullquote.body}
        </div>
        <div style={{ color:C.textSub, maxWidth:520, margin:'0 auto', lineHeight:1.7, fontSize:15 }}>
          {section.pullquote.context}
        </div>
      </div>
    )}

    {section.footer && (
      <p style={{
        marginTop:32, color:C.textSub, lineHeight:1.7, fontSize:17,
        fontFamily:"'Bricolage Grotesque', sans-serif", fontWeight:400,
        fontStyle:'italic'
      }}>{section.footer}</p>
    )}
  </section>
);

// ═══════════════════════════════════════════════════════════════════════════
// SCREEN: Knowledge Check
// ═══════════════════════════════════════════════════════════════════════════

const KnowledgeCheckScreen = ({ onComplete, onBack, C }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});

  const q = M01_KNOWLEDGE_CHECK[currentIdx];
  const isLast = currentIdx === M01_KNOWLEDGE_CHECK.length - 1;
  const userAnswer = answers[q.id];
  const isRevealed = revealed[q.id];

  const handleSelect = (idx) => {
    if (isRevealed) return;
    setAnswers({ ...answers, [q.id]: idx });
    setRevealed({ ...revealed, [q.id]: true });
  };

  const handleNext = () => {
    if (isLast) {
      const correct = M01_KNOWLEDGE_CHECK.reduce((acc, qq) => acc + (answers[qq.id] === qq.correctIndex ? 1 : 0), 0);
      const score = Math.round((correct / M01_KNOWLEDGE_CHECK.length) * 100);
      onComplete(score);
    } else {
      setCurrentIdx(currentIdx + 1);
    }
  };

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', background:C.bg }}>
      {/* Top bar */}
      <div style={{ borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:780, margin:'0 auto', padding:'14px 32px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <button onClick={onBack} style={{
            display:'flex', alignItems:'center', gap:8, color:C.textSub, fontSize:13,
            background:'none', border:'none', cursor:'pointer', fontFamily:'inherit'
          }}>
            <ArrowLeft size={15} /> Back to lesson
          </button>
          <div style={{ color:C.textDim, fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', fontWeight:600 }}>
            Knowledge Check · Question {currentIdx + 1} of {M01_KNOWLEDGE_CHECK.length}
          </div>
        </div>
        <div style={{ height:2, background:C.border }}>
          <div style={{
            height:'100%',
            width:`${((currentIdx + (isRevealed ? 1 : 0)) / M01_KNOWLEDGE_CHECK.length) * 100}%`,
            background:`linear-gradient(90deg, ${C.violet}, ${C.gongPurple})`,
            transition:'width 0.5s ease'
          }} />
        </div>
      </div>

      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'48px 24px' }}>
        <div key={q.id} className="bs-fade" style={{ maxWidth:680, width:'100%' }}>
          <div style={{ color:C.violet, fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:20, fontWeight:700 }}>
            Question {currentIdx + 1}
          </div>
          <h2 style={{
            fontFamily:"'Bricolage Grotesque', sans-serif", color:C.text, lineHeight:1.1,
            marginBottom:40, fontSize:'clamp(1.75rem, 3.5vw, 2.5rem)',
            letterSpacing:'-0.025em', fontWeight:700
          }}>
            {q.question}
          </h2>

          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {q.options.map((opt, idx) => {
              const isSelected = userAnswer === idx;
              const isCorrect = idx === q.correctIndex;
              const showCorrect = isRevealed && isCorrect;
              const showIncorrect = isRevealed && isSelected && !isCorrect;

              return (
                <button key={idx} onClick={() => handleSelect(idx)} disabled={isRevealed}
                  style={{
                    width:'100%', textAlign:'left', padding:20, borderRadius:12, fontFamily:'inherit',
                    background: showCorrect ? `${C.green}0D` : showIncorrect ? 'rgba(248, 113, 113, 0.06)' : isRevealed ? `${C.card}4D` : `${C.card}66`,
                    border:`1px solid ${showCorrect ? `${C.green}80` : showIncorrect ? 'rgba(248, 113, 113, 0.5)' : C.border}`,
                    cursor: isRevealed ? 'default' : 'pointer',
                    opacity: isRevealed && !showCorrect && !showIncorrect ? 0.5 : 1,
                    transition:'all 0.13s'
                  }}>
                  <div style={{ display:'flex', alignItems:'flex-start', gap:16 }}>
                    <div style={{
                      marginTop:2, width:24, height:24, borderRadius:'50%', flexShrink:0,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontFamily:'monospace', fontSize:11, fontWeight:600,
                      border:`2px solid ${showCorrect ? C.green : showIncorrect ? '#F87171' : C.border}`,
                      background: showCorrect ? C.green : showIncorrect ? '#F87171' : 'transparent',
                      color: showCorrect ? '#0F3326' : showIncorrect ? '#5A0E0E' : C.textDim
                    }}>
                      {showCorrect ? <Check size={13} /> : showIncorrect ? <X size={13} /> : String.fromCharCode(65 + idx)}
                    </div>
                    <div style={{
                      paddingTop:2, fontSize:15, lineHeight:1.6,
                      color: showCorrect ? '#A7F3D0' : showIncorrect ? '#FCA5A5' : C.text
                    }}>
                      {opt}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {isRevealed && (
            <div className="bs-fade" style={{
              marginTop:28, borderRadius:12, padding:20,
              border:`1px solid ${userAnswer === q.correctIndex ? `${C.green}40` : 'rgba(248, 113, 113, 0.4)'}`,
              background: userAnswer === q.correctIndex
                ? `linear-gradient(180deg, ${C.green}0D, ${C.green}03)`
                : 'linear-gradient(180deg, rgba(248, 113, 113, 0.05), rgba(248, 113, 113, 0.01))'
            }}>
              <div style={{
                color: userAnswer === q.correctIndex ? C.green : '#F87171',
                fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:8, fontWeight:700
              }}>
                {userAnswer === q.correctIndex ? 'Nailed it' : 'Worth a second look'}
              </div>
              <div style={{ color:C.text, lineHeight:1.7, fontSize:14 }}>{q.explanation}</div>
            </div>
          )}

          {isRevealed && (
            <div className="bs-fade" style={{ marginTop:32, display:'flex', justifyContent:'flex-end' }}>
              <Btn onClick={handleNext} icon={<ArrowRight size={14} />} C={C} size="lg">
                {isLast ? 'See your results' : 'Next question'}
              </Btn>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SCREEN: Completion (achievement unlock with phased reveal)
// ═══════════════════════════════════════════════════════════════════════════

const CompletionScreen = ({ score, onContinue, C }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 1700),
      setTimeout(() => setPhase(3), 2700)
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{
      minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
      padding:'48px 24px', position:'relative', overflow:'hidden', background:C.bg
    }}>
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none',
        background:'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255, 179, 71, 0.12), transparent 70%)'
      }} />

      {/* Particle dots */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
        {[...Array(20)].map((_, i) => (
          <div key={i} className="bs-float" style={{
            position:'absolute',
            width: 4 + Math.random() * 4, height: 4 + Math.random() * 4,
            top:`${Math.random() * 100}%`, left:`${Math.random() * 100}%`,
            background: i % 3 === 0 ? C.violet : i % 3 === 1 ? C.pinkRose : '#FFD166',
            borderRadius:'50%', opacity:0.4,
            animationDelay:`${Math.random() * 4}s`,
            animationDuration:`${4 + Math.random() * 4}s`
          }} />
        ))}
      </div>

      <div style={{ maxWidth:680, width:'100%', position:'relative', zIndex:10, textAlign:'center' }}>
        {/* Score reveal */}
        <div className="bs-fade">
          <div style={{ color:C.textDim, fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:20, fontWeight:600 }}>
            Module Complete
          </div>
          <div style={{
            fontFamily:"'Bricolage Grotesque', sans-serif", color:C.textSub, fontSize:24,
            marginBottom:12, letterSpacing:'-0.01em', fontWeight:500, fontStyle:'italic'
          }}>
            What is AI?
          </div>
          <div style={{ display:'flex', alignItems:'baseline', justifyContent:'center', gap:12, marginBottom:12 }}>
            <div style={{
              fontFamily:"'Bricolage Grotesque', sans-serif", color:C.text,
              fontSize:'clamp(5rem, 14vw, 9rem)', letterSpacing:'-0.05em', lineHeight:1, fontWeight:800
            }}>
              {score}
            </div>
            <div style={{
              fontFamily:"'Bricolage Grotesque', sans-serif", color:C.textDim,
              fontSize:'3rem', fontWeight:700
            }}>%</div>
          </div>
          <div style={{ color:C.textSub, marginBottom:48, fontSize:15 }}>
            {score === 100
              ? 'Perfect score. The mental model is locked in.'
              : score >= 67
              ? 'Solid. The fundamentals are landing.'
              : 'You\'ve got the shape of it. Review and run it again if you want.'}
          </div>
        </div>

        {/* Achievement unlock */}
        <div style={{
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? 'translateY(0)' : 'translateY(32px)',
          transition:'all 0.7s cubic-bezier(0.22, 1, 0.36, 1)'
        }}>
          <div style={{
            display:'inline-block', borderRadius:16, padding:'24px 28px', marginBottom:40,
            border:'1px solid rgba(255, 179, 71, 0.3)',
            background:'linear-gradient(180deg, rgba(255, 179, 71, 0.1), rgba(255, 179, 71, 0.02))',
            boxShadow: phase >= 1 ? '0 0 60px -20px rgba(255, 179, 71, 0.5)' : 'none',
            transition:'box-shadow 0.8s ease'
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:20 }}>
              <div style={{
                width:56, height:56, borderRadius:'50%', flexShrink:0,
                display:'flex', alignItems:'center', justifyContent:'center',
                background:'linear-gradient(135deg, #FFD166, #FF9F1C)',
                boxShadow:'0 0 30px rgba(255, 179, 71, 0.5)'
              }}>
                <Trophy size={26} color="#5A2D00" />
              </div>
              <div style={{ textAlign:'left' }}>
                <div style={{ color:'#FFB347', fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:4, fontWeight:700 }}>
                  Achievement Unlocked
                </div>
                <div style={{
                  fontFamily:"'Bricolage Grotesque', sans-serif", color:C.text, fontSize:24,
                  marginBottom:2, letterSpacing:'-0.02em', fontWeight:700
                }}>
                  Foundations Started
                </div>
                <div style={{ color:C.textSub, fontSize:13 }}>Completed your first AI 101 module.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Level meter movement */}
        <div style={{
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? 'translateY(0)' : 'translateY(32px)',
          transition:'all 0.7s cubic-bezier(0.22, 1, 0.36, 1)'
        }}>
          <div style={{
            borderRadius:12, border:`1px solid ${C.border}`,
            padding:20, maxWidth:440, margin:'0 auto 40px',
            background:`linear-gradient(180deg, ${C.violet}0D, ${C.violet}03)`
          }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <TrendingUp size={14} color={C.violet} />
                <div style={{ color:C.text, fontSize:13 }}>Progress to The Novice</div>
              </div>
              <div style={{ fontFamily:'monospace', fontSize:13, color:C.violet, fontWeight:700 }}>+14%</div>
            </div>
            <div style={{ height:6, borderRadius:3, background:C.border, overflow:'hidden' }}>
              <div style={{
                height:'100%', borderRadius:3,
                width: phase >= 2 ? '14%' : '0%',
                background:`linear-gradient(90deg, ${C.violet}, ${C.gongPurple})`,
                boxShadow:'0 0 12px rgba(176, 132, 255, 0.4)',
                transition:'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)'
              }} />
            </div>
            <div style={{ color:C.textDim, fontSize:11, marginTop:8 }}>1 of 7 modules complete</div>
          </div>
        </div>

        {/* CTA */}
        <div style={{
          opacity: phase >= 3 ? 1 : 0,
          transform: phase >= 3 ? 'translateY(0)' : 'translateY(32px)',
          transition:'all 0.7s cubic-bezier(0.22, 1, 0.36, 1)'
        }}>
          <Btn onClick={onContinue} icon={<ArrowRight size={14} />} C={C} size="lg">
            Continue your path
          </Btn>
          <div style={{ marginTop:20, color:C.textDim, fontSize:11 }}>
            Module 02 · How did we get here? · is now unlocked
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SCREEN: Home (team activity feed + #gtm-ai chat panel)
// ═══════════════════════════════════════════════════════════════════════════

const HomeScreen = ({ user, C }) => {
  const [messages, setMessages] = useState(CHAT_INIT);
  const [draft, setDraft] = useState('');
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const sendMsg = () => {
    if (!draft.trim()) return;
    const initials = (user?.name || 'You').split(' ').map(s=>s[0]).join('').slice(0,2).toUpperCase();
    setMessages(m => [...m, {
      initials, name:user?.name || 'You', badges:['first'], ac:C.violet,
      time:new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }),
      msg:draft.trim()
    }]);
    setDraft('');
  };

  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden' }}>
      {/* Left: Activity feed */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', borderRight:`1px solid ${C.border}` }}>
        <div style={{ padding:'24px 32px 16px', borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div>
              <h1 style={{
                fontFamily:"'Bricolage Grotesque', sans-serif", fontSize:24, fontWeight:700,
                color:C.text, margin:'0 0 4px', letterSpacing:'-0.02em'
              }}>Team Activity</h1>
              <p style={{ fontSize:13, color:C.textSub, margin:0 }}>What your team is earning today</p>
            </div>
            <div style={{
              display:'flex', alignItems:'center', gap:8,
              background:C.violetLight, border:`1px solid ${C.violetBorder}`,
              borderRadius:8, padding:'6px 14px'
            }}>
              <span style={{ fontSize:12, fontWeight:700, color:C.violet }}>8 achievements today</span>
            </div>
          </div>
        </div>

        <div style={{ flex:1, overflow:'auto', padding:'16px 24px', display:'flex', flexDirection:'column', gap:10 }}>
          {FEED_DATA.map((item, i) => (
            <div key={i} style={{
              display:'flex', gap:12, background:C.card, border:`1px solid ${C.border}`,
              borderRadius:12, padding:'14px 16px', alignItems:'center'
            }}>
              <Avatar initials={item.initials} ac={item.ac} size={38} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:7, flexWrap:'wrap', marginBottom:4 }}>
                  <span style={{ fontSize:13, fontWeight:700, color:C.text }}>{item.name}</span>
                  <AvatarBadges badges={item.badges} size={12} C={C} />
                  <span style={{ fontSize:12, color:C.textSub }}>earned</span>
                  <BadgePill badgeKey={item.badges[item.badges.length - 1]} C={C} />
                </div>
                <span style={{ fontSize:12, color:C.textDim }}>{item.role} · {item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: #gtm-ai chat */}
      <div style={{ width:340, display:'flex', flexDirection:'column', background:C.surface, flexShrink:0 }}>
        <div style={{ padding:'24px 18px 14px', borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
          <h2 style={{
            fontFamily:"'Bricolage Grotesque', sans-serif", fontSize:16, fontWeight:700,
            color:C.text, margin:'0 0 2px', letterSpacing:'-0.01em'
          }}># gtm-ai</h2>
          <p style={{ fontSize:11, color:C.textSub, margin:0 }}>Team channel · 24 members online</p>
        </div>

        <div ref={chatRef} style={{ flex:1, overflow:'auto', padding:'14px 16px', display:'flex', flexDirection:'column', gap:14 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
              <Avatar initials={m.initials} ac={m.ac} size={30} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3, flexWrap:'wrap' }}>
                  <span style={{ fontSize:12, fontWeight:700, color:C.text }}>{m.name}</span>
                  <AvatarBadges badges={m.badges} size={10} C={C} />
                  <span style={{ fontSize:10, color:C.textDim }}>{m.time}</span>
                </div>
                <div style={{ fontSize:13, color:C.textSub, lineHeight:1.55 }}>{m.msg}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding:'12px 14px', borderTop:`1px solid ${C.border}`, flexShrink:0 }}>
          <div style={{
            display:'flex', gap:8, alignItems:'center',
            background:C.cardAlt, border:`1px solid ${C.border}`, borderRadius:10, padding:'8px 12px'
          }}>
            <input value={draft} onChange={e => setDraft(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMsg()}
              placeholder="Message #gtm-ai..."
              style={{
                flex:1, border:'none', background:'transparent', fontSize:13, color:C.text,
                outline:'none', fontFamily:'inherit'
              }} />
            <button onClick={sendMsg} style={{
              background: draft.trim() ? C.violet : C.border, border:'none', borderRadius:7,
              width:28, height:28, display:'flex', alignItems:'center', justifyContent:'center',
              cursor: draft.trim() ? 'pointer' : 'default', flexShrink:0
            }}>
              <Send size={13} color={draft.trim() ? '#fff' : C.textDim} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SCREEN: Paths
// ═══════════════════════════════════════════════════════════════════════════

const PathsScreen = ({ user, modulesCompletedInJourney, C }) => {
  const paths = [
    { num:'101', title:'Foundation',     desc:'What AI is, how it works, how to use it safely.', status:'active',    levelRange:'L1 → L2', minutes:81 },
    { num:'201', title:'Application',    desc:'Applying AI to GTM work broadly.',                 status:'locked',    levelRange:'L2 → L3', minutes:'~90' },
    { num:'301', title:`${user?.role || 'Role'} Specialization`, desc:'Deep application in your specific role.', status:'locked', levelRange:'L3', minutes:'~90' },
    { num:'401', title:'Orchestration',  desc:'Multi-step AI workflows across tools.',            status:'locked',    levelRange:'L3 → L4', minutes:'~120' },
    { num:'501', title:'Leadership',     desc:'The prestige capstone. Drive adoption, coach peers.', status:'aspiration', levelRange:'L4 → L5', minutes:'·' },
  ];

  return (
    <div style={{ height:'100vh', overflow:'auto', background:C.bg }}>
      <div style={{ maxWidth:960, margin:'0 auto', padding:'48px 48px 64px' }}>
        <div style={{ marginBottom:40 }}>
          <div style={{ color:C.textDim, fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:12, fontWeight:600 }}>
            Paths
          </div>
          <h1 style={{
            fontFamily:"'Bricolage Grotesque', sans-serif", color:C.text, lineHeight:1.05,
            marginBottom:14, fontSize:'clamp(2rem, 4vw, 3rem)', letterSpacing:'-0.025em', fontWeight:700
          }}>
            Five courses. <span style={{ color:C.violet, fontWeight:800 }}>One progression.</span>
          </h1>
          <p style={{ color:C.textSub, fontSize:16, maxWidth:580, lineHeight:1.6 }}>
            Each course advances learners through the levels. 101 is universal. 201 onward gets specific to GTM and to your role.
          </p>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {paths.map(p => {
            const isActive = p.status === 'active';
            const isAspiration = p.status === 'aspiration';
            return (
              <div key={p.num} style={{
                borderRadius:16, padding:24,
                background: isActive ? `${C.violet}0D` : `${C.card}80`,
                border:`1px solid ${isActive ? C.violetBorder : C.border}`,
                opacity: isAspiration ? 0.65 : 1,
                display:'flex', alignItems:'center', gap:24
              }}>
                <div style={{
                  width:64, height:64, borderRadius:14, flexShrink:0,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontFamily:"'Bricolage Grotesque', sans-serif", fontWeight:800,
                  fontSize:22, letterSpacing:'-0.03em',
                  background: isActive
                    ? `linear-gradient(135deg, ${C.gongPurple}, ${C.violetMid})`
                    : C.cardAlt,
                  color: isActive ? '#fff' : C.textSub
                }}>
                  {p.num}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
                    <div style={{
                      fontFamily:"'Bricolage Grotesque', sans-serif",
                      color:C.text, fontSize:20, fontWeight:700, letterSpacing:'-0.01em'
                    }}>AI {p.num}</div>
                    <div style={{ color:C.textDim, fontSize:13 }}>·</div>
                    <div style={{ color:C.textSub, fontSize:14, fontWeight:500 }}>{p.title}</div>
                    {isActive && (
                      <span style={{
                        marginLeft:8, padding:'3px 8px', borderRadius:4, fontSize:10,
                        letterSpacing:'0.1em', textTransform:'uppercase', fontWeight:700,
                        color:C.violet, background:`${C.violet}1A`, border:`1px solid ${C.violet}33`
                      }}>Active</span>
                    )}
                    {isAspiration && (
                      <span style={{
                        marginLeft:8, padding:'3px 8px', borderRadius:4, fontSize:10,
                        letterSpacing:'0.1em', textTransform:'uppercase', fontWeight:700,
                        color:C.pinkRose, background:`${C.pinkRose}1A`, border:`1px solid ${C.pinkRose}33`
                      }}>Aspirational</span>
                    )}
                  </div>
                  <div style={{ color:C.textSub, fontSize:13, marginBottom:6, lineHeight:1.5 }}>{p.desc}</div>
                  <div style={{ display:'flex', alignItems:'center', gap:14, color:C.textDim, fontSize:11 }}>
                    <span style={{ letterSpacing:'0.08em', textTransform:'uppercase', fontWeight:700 }}>{p.levelRange}</span>
                    <span>·</span>
                    <span>{p.minutes === '·' ? 'Earned through real work' : `${p.minutes} min`}</span>
                  </div>
                </div>
                <div style={{ flexShrink:0 }}>
                  {isActive
                    ? <div style={{ color:C.violet, fontSize:13, fontWeight:600 }}>{modulesCompletedInJourney}/7</div>
                    : <Lock size={18} color={C.textDim} />
                  }
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SCREEN: Achievements (full page)
// ═══════════════════════════════════════════════════════════════════════════

const AchievementsScreen = ({ achievements, C }) => {
  const allAchievements = [
    { id:'foundations-started', icon:'🚀', title:'Foundations Started', desc:'Complete your first AI 101 module',     category:'Milestone' },
    { id:'roll',                icon:'🔥', title:'On a Roll',          desc:'Complete 3 modules in a week',           category:'Streak' },
    { id:'grad',                icon:'🎓', title:'AI 101 Graduate',    desc:'Complete every AI 101 module',            category:'Milestone' },
    { id:'novice',              icon:'⚡', title:'The Novice',          desc:'Reach Level 2',                            category:'Level' },
    { id:'practitioner',        icon:'🎯', title:'The Practitioner',   desc:'Reach Level 3',                            category:'Level' },
    { id:'strategist',          icon:'🧠', title:'The Strategist',     desc:'Reach Level 4',                            category:'Level' },
    { id:'architect',           icon:'🏛️', title:'The Architect',      desc:'Reach Level 5',                            category:'Level' },
    { id:'helper',              icon:'🤝', title:'Helper',             desc:'Answer 5 questions in #gtm-ai',           category:'Community' },
    { id:'first-publish',       icon:'📚', title:'First Publish',      desc:'Get your first artifact reviewed and approved', category:'Craft' },
  ];

  return (
    <div style={{ height:'100vh', overflow:'auto', background:C.bg }}>
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'48px 48px 64px' }}>
        <div style={{ marginBottom:40 }}>
          <div style={{ color:C.textDim, fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:12, fontWeight:600 }}>
            Achievements
          </div>
          <h1 style={{
            fontFamily:"'Bricolage Grotesque', sans-serif", color:C.text, lineHeight:1.05,
            marginBottom:14, fontSize:'clamp(2rem, 4vw, 3rem)', letterSpacing:'-0.025em', fontWeight:700
          }}>
            <span style={{ color:C.violet, fontWeight:800 }}>{achievements.length}</span> earned · {allAchievements.length - achievements.length} to go
          </h1>
          <p style={{ color:C.textSub, fontSize:16, maxWidth:580, lineHeight:1.6 }}>
            Every achievement here is earned, not assigned. Each one represents a real moment of progress on the path.
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))', gap:14 }}>
          {allAchievements.map(a => {
            const earned = achievements.includes(a.id);
            return (
              <div key={a.id} style={{
                borderRadius:16, padding:20,
                background: earned
                  ? 'linear-gradient(180deg, rgba(255, 179, 71, 0.08), rgba(255, 179, 71, 0.02))'
                  : `${C.card}80`,
                border: earned ? '1px solid rgba(255, 179, 71, 0.3)' : `1px solid ${C.border}`,
                opacity: earned ? 1 : 0.6
              }}>
                <div style={{
                  width:48, height:48, borderRadius:'50%',
                  display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14,
                  background: earned ? 'linear-gradient(135deg, #FFD166, #FF9F1C)' : C.cardAlt,
                  fontSize:22
                }}>
                  {earned ? a.icon : <Lock size={16} color={C.textDim} />}
                </div>
                <div style={{ color: earned ? C.text : C.textSub, fontSize:14, fontWeight:700, marginBottom:4 }}>
                  {a.title}
                </div>
                <div style={{ color:C.textSub, fontSize:12, lineHeight:1.5, marginBottom:10 }}>{a.desc}</div>
                <div style={{ color:C.textDim, fontSize:10, letterSpacing:'0.08em', textTransform:'uppercase', fontWeight:600 }}>
                  {a.category}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SCREEN: Content (live Anthropic API for module generation)
// ═══════════════════════════════════════════════════════════════════════════

const SYSTEM_PROMPT = `You are a curriculum designer creating training modules for GTM professionals at Gong, a B2B SaaS company. Your job is to synthesize provided source content into structured learning modules.

You must respond with ONLY valid JSON in the following exact structure. No preamble, no explanation, no markdown fences:

{
  "module": {
    "title": "string (concise, 3-7 words)",
    "description": "string (2-3 sentences)",
    "estimated_total_minutes": number,
    "lessons": [
      {
        "title": "string",
        "order_index": number (starting at 1),
        "estimated_minutes": number,
        "content": "string (markdown-formatted lesson body, 150-250 words)",
        "knowledge_checks": [
          {
            "question": "string",
            "options": ["string", "string", "string", "string"],
            "correct_index": number (0-3),
            "explanation": "string (why this answer is correct)",
            "order_index": number (starting at 1)
          }
        ]
      }
    ]
  }
}

Guidelines:
- Create exactly 3 lessons per module
- Each lesson must have exactly 1 knowledge check question
- Write for GTM professionals (AEs, RAs, SDRs). Practical, not academic
- Lesson content should be scannable: short paragraphs, clear examples
- Knowledge check questions should test application, not recall
- Keep each lesson focused: one core concept per lesson
- Output valid JSON ONLY. No markdown, no commentary.
- Avoid em dashes in your prose. Use periods, commas, or parentheses instead.`;

const ContentPage = ({ C, model, drafts, setDrafts, published, setPublished }) => {
  const [step, setStep] = useState('ingest');
  const [url, setUrl] = useState('');
  const [pastedContent, setPastedContent] = useState('');
  const [tier, setTier] = useState(2);
  const [sourceMode, setSourceMode] = useState('url');
  const [generatingMsg, setGeneratingMsg] = useState('');
  const [error, setError] = useState(null);
  const [activeDraft, setActiveDraft] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const generate = async () => {
    setError(null);
    setStep('synthesizing');
    const messages = [
      'Reading the source...',
      'Identifying core concepts...',
      'Drafting lessons...',
      'Writing knowledge checks...',
      'Structuring the module...',
    ];
    let mi = 0;
    setGeneratingMsg(messages[0]);
    const ticker = setInterval(() => { mi = (mi+1) % messages.length; setGeneratingMsg(messages[mi]); }, 2200);

    try {
      const tierLabel = tier === 3 ? ' (proprietary internal Gong content, highest relevance)' : '';
      const userPrompt = sourceMode === 'url'
        ? `Source tier: ${tier}${tierLabel}\nSource URL: ${url}\n\nUse the web search tool to fetch this URL, read its contents, then generate a training module from it. Respond with ONLY the JSON object, no preamble.`
        : `Source tier: ${tier}${tierLabel}\n\nSource content:\n${pastedContent}\n\nGenerate a training module from this content. Respond with ONLY the JSON object, no preamble.`;

      const body = {
        model,
        max_tokens:4000,
        system:SYSTEM_PROMPT,
        messages:[{ role:'user', content:userPrompt }],
      };
      if (sourceMode === 'url') body.tools = [{ type:'web_search_20250305', name:'web_search' }];

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body:JSON.stringify(body),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`API error ${response.status}: ${errText.slice(0,200)}`);
      }
      const data = await response.json();
      const textBlocks = data.content.filter(b => b.type === 'text').map(b => b.text);
      const finalText = textBlocks[textBlocks.length - 1] || '';
      const cleaned = finalText.replace(/```json\s*/g, '').replace(/```\s*$/g, '').trim();
      const firstBrace = cleaned.indexOf('{');
      const lastBrace = cleaned.lastIndexOf('}');
      const jsonStr = firstBrace >= 0 && lastBrace >= 0 ? cleaned.slice(firstBrace, lastBrace + 1) : cleaned;
      let parsed;
      try { parsed = JSON.parse(jsonStr); }
      catch (e) { throw new Error('Claude returned non-JSON output. Raw: ' + finalText.slice(0,300)); }

      const draftId = 'd_' + Date.now();
      const newDraft = {
        id:draftId,
        source: sourceMode === 'url' ? url : 'Pasted content',
        sourceMode, pastedContent: pastedContent.slice(0, 500),
        tier,
        generated:parsed,
        status:'pending',
        createdAt:new Date().toISOString(),
      };
      setDrafts(d => [newDraft, ...d]);
      setActiveDraft(newDraft);
      setStep('review');
    } catch (e) {
      setError(e.message);
      setStep('ingest');
    } finally {
      clearInterval(ticker);
    }
  };

  const publish = () => {
    setPublished(p => [{ ...activeDraft, status:'published', publishedAt:new Date().toISOString() }, ...p]);
    setDrafts(d => d.filter(x => x.id !== activeDraft.id));
    setActiveDraft(null);
    setStep('ingest');
    setUrl('');
    setPastedContent('');
  };

  const reject = () => {
    setDrafts(d => d.filter(x => x.id !== activeDraft.id));
    setActiveDraft(null);
    setStep('ingest');
  };

  const updateDraft = (path, value) => {
    const updated = JSON.parse(JSON.stringify(activeDraft));
    let target = updated.generated;
    for (let i = 0; i < path.length - 1; i++) target = target[path[i]];
    target[path[path.length - 1]] = value;
    setActiveDraft(updated);
    setDrafts(d => d.map(x => x.id === updated.id ? updated : x));
  };

  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden' }}>
      <div style={{ flex:1, overflow:'auto', padding:'32px 36px' }}>
        {/* Header */}
        <div style={{ marginBottom:24 }}>
          <div style={{ color:C.textDim, fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:8, fontWeight:600 }}>
            Content Engine
          </div>
          <h1 style={{
            fontFamily:"'Bricolage Grotesque', sans-serif", fontSize:32, fontWeight:700,
            color:C.text, margin:'0 0 6px', letterSpacing:'-0.025em'
          }}>Ingest. Synthesize. Review. Publish.</h1>
          <p style={{ fontSize:14, color:C.textSub, margin:0, lineHeight:1.6 }}>
            The pipeline that turns a single source into a published learning module.
          </p>
        </div>

        {/* Pipeline visualization */}
        <div style={{
          display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:8, marginBottom:28,
          background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:14
        }}>
          {[
            { id:'ingest',       label:'01 · Ingest',      desc:'Paste a URL or document',  icon:Plus },
            { id:'synthesizing', label:'02 · Synthesize',  desc:'Claude drafts the module', icon:Sparkles },
            { id:'review',       label:'03 · Review',      desc:'Edit and approve',          icon:Eye },
            { id:'published',    label:'04 · Publish',     desc:'Live for learners',         icon:CheckCircle2 },
          ].map((s, i, arr) => {
            const isCurrent =
              (s.id === 'ingest'       && step === 'ingest') ||
              (s.id === 'synthesizing' && step === 'synthesizing') ||
              (s.id === 'review'       && step === 'review') ||
              (s.id === 'published'    && false);
            return (
              <div key={s.id} style={{
                padding:'12px 14px', borderRadius:9,
                background: isCurrent ? C.violetLight : 'transparent',
                border: `1px solid ${isCurrent ? C.violetBorder : 'transparent'}`,
                position:'relative'
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                  <s.icon size={13} color={isCurrent ? C.violet : C.textDim} />
                  <div style={{
                    fontSize:11, fontWeight:700, color:isCurrent ? C.violet : C.textSub,
                    letterSpacing:'0.05em', textTransform:'uppercase'
                  }}>{s.label}</div>
                </div>
                <div style={{ fontSize:11, color:C.textDim }}>{s.desc}</div>
                {i < arr.length - 1 && (
                  <div style={{
                    position:'absolute', right:-4, top:'50%', transform:'translateY(-50%)',
                    color:C.textDim, fontSize:14
                  }}>›</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Step content */}
        {step === 'ingest' && (
          <div style={{
            background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:24
          }}>
            <h3 style={{
              fontFamily:"'Bricolage Grotesque', sans-serif", fontSize:18, fontWeight:700,
              color:C.text, margin:'0 0 16px', letterSpacing:'-0.01em'
            }}>Add a source</h3>

            {error && (
              <div style={{
                background:'rgba(248, 113, 113, 0.08)', border:'1px solid rgba(248, 113, 113, 0.3)',
                borderRadius:9, padding:'10px 14px', marginBottom:16,
                fontSize:12, color:'#FCA5A5', display:'flex', alignItems:'flex-start', gap:8
              }}>
                <AlertCircle size={14} style={{ flexShrink:0, marginTop:1 }} />
                <div>{error}</div>
              </div>
            )}

            {/* Mode toggle */}
            <div style={{ display:'flex', gap:0, background:C.cardAlt, borderRadius:9, padding:3, marginBottom:16, width:'fit-content' }}>
              {[['url','Paste URL'],['paste','Paste content']].map(([k,l]) => (
                <button key={k} onClick={() => setSourceMode(k)} style={{
                  padding:'7px 14px', fontSize:12, fontWeight:700, border:'none', borderRadius:7,
                  cursor:'pointer', fontFamily:'inherit',
                  background: sourceMode === k ? C.surface : 'transparent',
                  color: sourceMode === k ? C.violet : C.textSub
                }}>{l}</button>
              ))}
            </div>

            {sourceMode === 'url' ? (
              <input value={url} onChange={e => setUrl(e.target.value)}
                placeholder="https://..."
                style={{
                  width:'100%', background:C.input, border:`1px solid ${C.border}`,
                  borderRadius:9, padding:'12px 14px', fontSize:13, color:C.text,
                  outline:'none', fontFamily:'inherit', marginBottom:16
                }} />
            ) : (
              <textarea value={pastedContent} onChange={e => setPastedContent(e.target.value)}
                placeholder="Paste source content here..."
                rows={8}
                style={{
                  width:'100%', background:C.input, border:`1px solid ${C.border}`,
                  borderRadius:9, padding:'12px 14px', fontSize:13, color:C.text,
                  outline:'none', fontFamily:'inherit', marginBottom:16, resize:'vertical'
                }} />
            )}

            <div style={{ marginBottom:16 }}>
              <div style={{ color:C.textSub, fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:8, fontWeight:600 }}>
                Source tier
              </div>
              <div style={{ display:'flex', gap:8 }}>
                {[
                  { v:1, label:'Tier 1', desc:'Foundational' },
                  { v:2, label:'Tier 2', desc:'Current' },
                  { v:3, label:'Tier 3', desc:'Internal Gong' },
                ].map(t => (
                  <button key={t.v} onClick={() => setTier(t.v)} style={{
                    flex:1, padding:'10px 14px', borderRadius:9, textAlign:'left',
                    cursor:'pointer', fontFamily:'inherit',
                    background: tier === t.v ? C.violetLight : C.surface,
                    border: `1px solid ${tier === t.v ? C.violetBorder : C.border}`
                  }}>
                    <div style={{ fontSize:12, fontWeight:700, color: tier === t.v ? C.violet : C.text }}>{t.label}</div>
                    <div style={{ fontSize:11, color:C.textSub, marginTop:1 }}>{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <Btn onClick={generate} C={C} size="lg"
              disabled={sourceMode === 'url' ? !url.trim() : !pastedContent.trim()}
              icon={<Sparkles size={14} />}>
              Generate module with Claude
            </Btn>
          </div>
        )}

        {step === 'synthesizing' && (
          <div style={{
            background:C.card, border:`1px solid ${C.border}`, borderRadius:12,
            padding:'48px 24px', textAlign:'center'
          }}>
            <div style={{
              width:64, height:64, borderRadius:'50%',
              background:C.violetLight, border:`2px solid ${C.violetBorder}`,
              display:'flex', alignItems:'center', justifyContent:'center',
              margin:'0 auto 18px'
            }}>
              <RefreshCw size={28} color={C.violet} className="bs-spin" />
            </div>
            <h3 style={{
              fontFamily:"'Bricolage Grotesque', sans-serif", fontSize:22, fontWeight:700,
              color:C.text, margin:'0 0 8px', letterSpacing:'-0.01em'
            }}>Claude is synthesizing...</h3>
            <p style={{ fontSize:14, color:C.textSub, margin:'0 0 16px' }}>{generatingMsg}</p>
            <div style={{ fontSize:11, color:C.textDim, fontFamily:'monospace' }}>Model: {model}</div>
          </div>
        )}

        {step === 'review' && activeDraft && (
          <div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
              <h3 style={{
                fontFamily:"'Bricolage Grotesque', sans-serif", fontSize:18, fontWeight:700,
                color:C.text, margin:0, letterSpacing:'-0.01em'
              }}>Review draft</h3>
              <div style={{ display:'flex', gap:8 }}>
                <Btn onClick={() => setEditMode(!editMode)} C={C} variant="secondary" size="sm" icon={<Edit3 size={12} />}>
                  {editMode ? 'Done editing' : 'Edit'}
                </Btn>
                <Btn onClick={reject} C={C} variant="danger" size="sm" icon={<Trash2 size={12} />}>Reject</Btn>
                <Btn onClick={publish} C={C} size="sm" icon={<Check size={12} />}>Approve and publish</Btn>
              </div>
            </div>
            <div style={{
              background:C.violetLight, border:`1px solid ${C.violetBorder}`, borderRadius:10,
              padding:'10px 14px', marginBottom:14, fontSize:12, color:C.textSub
            }}>
              <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
                <span><strong style={{ color:C.text }}>Source:</strong> {activeDraft.source}</span>
                <span><strong style={{ color:C.text }}>Tier:</strong> {activeDraft.tier}</span>
                <span><strong style={{ color:C.text }}>Lessons:</strong> {activeDraft.generated?.module?.lessons?.length || 0}</span>
              </div>
            </div>
            <ModuleDraftView draft={activeDraft.generated} editMode={editMode} updateDraft={updateDraft} C={C} />
          </div>
        )}
      </div>

      {/* Right rail: drafts + published */}
      <div style={{
        width:300, borderLeft:`1px solid ${C.border}`, padding:'32px 18px',
        background:C.surface, flexShrink:0, overflow:'auto'
      }}>
        <div style={{ color:C.textSub, fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:10, fontWeight:600 }}>
          Pending Drafts ({drafts.length})
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:6, marginBottom:24 }}>
          {drafts.length === 0 && (
            <div style={{ fontSize:12, color:C.textDim, padding:'8px 4px' }}>No drafts in review.</div>
          )}
          {drafts.map(d => (
            <button key={d.id} onClick={() => { setActiveDraft(d); setStep('review'); }}
              style={{
                textAlign:'left', cursor:'pointer', fontFamily:'inherit',
                background: activeDraft?.id === d.id ? C.violetLight : C.cardAlt,
                border:`1px solid ${activeDraft?.id === d.id ? C.violetBorder : C.border}`,
                borderRadius:9, padding:'10px 12px'
              }}>
              <div style={{
                fontSize:12, fontWeight:700, color:C.text, marginBottom:3,
                overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'
              }}>{d.generated?.module?.title || 'Untitled'}</div>
              <div style={{ fontSize:11, color:C.textDim }}>Tier {d.tier} · pending</div>
            </button>
          ))}
        </div>

        <div style={{ color:C.textSub, fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:10, fontWeight:600 }}>
          Published ({published.length})
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          {published.length === 0 && (
            <div style={{ fontSize:12, color:C.textDim, padding:'8px 4px' }}>No published modules yet.</div>
          )}
          {published.slice(0, 8).map(p => (
            <div key={p.id} style={{
              background:`${C.green}11`, border:`1px solid ${C.green}40`,
              borderRadius:9, padding:'10px 12px'
            }}>
              <div style={{
                fontSize:12, fontWeight:700, color:C.text, marginBottom:3,
                overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'
              }}>{p.generated?.module?.title || 'Untitled'}</div>
              <div style={{ fontSize:11, color:C.green, fontWeight:600, display:'flex', alignItems:'center', gap:4 }}>
                <CheckCircle2 size={10} />Live · Tier {p.tier}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ModuleDraftView = ({ draft, editMode, updateDraft, C }) => {
  if (!draft || !draft.module) return <div style={{ color:C.textSub }}>No content.</div>;
  const m = draft.module;

  const Editable = ({ value, path, multiline, fontSize=13, fontWeight=400, color=C.text }) => editMode ? (
    multiline ? (
      <textarea value={value} onChange={e => updateDraft(path, e.target.value)}
        rows={Math.max(2, Math.ceil(value.length / 60))}
        style={{
          width:'100%', background:C.input, border:`1px solid ${C.violetBorder}`,
          borderRadius:8, padding:'8px 12px', fontSize, color:C.text,
          fontFamily:'inherit', outline:'none', resize:'vertical'
        }} />
    ) : (
      <input value={value} onChange={e => updateDraft(path, e.target.value)}
        style={{
          width:'100%', background:C.input, border:`1px solid ${C.violetBorder}`,
          borderRadius:8, padding:'8px 12px', fontSize, fontWeight, color,
          fontFamily:'inherit', outline:'none'
        }} />
    )
  ) : (
    <span style={{ fontSize, fontWeight, color, lineHeight:1.55 }}>{value}</span>
  );

  return (
    <div style={{
      background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:24
    }}>
      <Editable value={m.title} path={['module','title']} fontSize={22} fontWeight={800} />
      <div style={{ marginTop:8, marginBottom:16 }}>
        <Editable value={m.description} path={['module','description']} multiline fontSize={13} color={C.textSub} />
      </div>
      <div style={{
        fontSize:11, fontWeight:700, color:C.textDim, letterSpacing:'0.06em',
        textTransform:'uppercase', marginBottom:6
      }}>
        ~{m.estimated_total_minutes} min · {m.lessons?.length || 0} lessons
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:16, marginTop:18 }}>
        {(m.lessons || []).map((lesson, li) => (
          <div key={li} style={{ borderTop:`1px solid ${C.border}`, paddingTop:16 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
              <span style={{
                fontSize:10, fontWeight:800, color:C.violet, background:C.violetLight,
                padding:'3px 8px', borderRadius:5, letterSpacing:'0.05em'
              }}>L{lesson.order_index || li + 1}</span>
              <span style={{ fontSize:11, color:C.textDim }}>{lesson.estimated_minutes} min</span>
            </div>
            <div style={{ marginBottom:10 }}>
              <Editable value={lesson.title} path={['module','lessons',li,'title']} fontSize={16} fontWeight={700} />
            </div>
            <div style={{ marginBottom:14 }}>
              <Editable value={lesson.content} path={['module','lessons',li,'content']} multiline fontSize={13} color={C.textSub} />
            </div>
            {(lesson.knowledge_checks || []).map((kc, qi) => (
              <div key={qi} style={{
                background:C.cardAlt, border:`1px solid ${C.border}`,
                borderRadius:10, padding:'14px 16px', marginBottom:10
              }}>
                <div style={{
                  fontSize:10, fontWeight:700, color:C.pinkRose, letterSpacing:'0.06em',
                  textTransform:'uppercase', marginBottom:8
                }}>Knowledge Check</div>
                <div style={{ marginBottom:10 }}>
                  <Editable value={kc.question} path={['module','lessons',li,'knowledge_checks',qi,'question']} fontSize={13} fontWeight={600} />
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {(kc.options || []).map((opt, oi) => (
                    <div key={oi} style={{
                      display:'flex', alignItems:'flex-start', gap:8,
                      padding:'7px 10px', borderRadius:7,
                      background: kc.correct_index === oi ? `${C.green}0F` : C.surface,
                      border: `1px solid ${kc.correct_index === oi ? `${C.green}40` : C.border}`
                    }}>
                      <span style={{
                        fontSize:11, fontWeight:700, minWidth:14,
                        color: kc.correct_index === oi ? C.green : C.textDim
                      }}>{String.fromCharCode(65 + oi)}</span>
                      <div style={{ flex:1 }}>
                        <Editable value={opt} path={['module','lessons',li,'knowledge_checks',qi,'options',oi]}
                          fontSize={12} color={kc.correct_index === oi ? C.green : C.text} />
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop:10, fontSize:12, color:C.textSub }}>
                  <strong style={{ color:C.text }}>Why:</strong>{' '}
                  <Editable value={kc.explanation} path={['module','lessons',li,'knowledge_checks',qi,'explanation']}
                    multiline fontSize={12} color={C.textSub} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SCREEN: Insights (Recharts dashboard with filters, scope, CSV export)
// ═══════════════════════════════════════════════════════════════════════════

const FilterChip = ({ active, onClick, children, C }) => (
  <button onClick={onClick} style={{
    background: active ? C.violetLight : C.card,
    color: active ? C.violet : C.textSub,
    border: `1px solid ${active ? C.violetBorder : C.border}`,
    borderRadius:8, padding:'6px 12px', fontSize:12,
    fontWeight: active ? 700 : 500, cursor:'pointer', fontFamily:'inherit'
  }}>
    {children}
  </button>
);

const MultiSelect = ({ label, options, selected, setSelected, C, icon:Icon }) => {
  const [open, setOpen] = useState(false);
  const toggle = (o) => setSelected(s => s.includes(o) ? s.filter(x => x !== o) : [...s, o]);
  return (
    <div style={{ position:'relative' }}>
      <button onClick={() => setOpen(!open)} style={{
        display:'flex', alignItems:'center', gap:6,
        background: selected.length ? C.violetLight : C.card,
        color: selected.length ? C.violet : C.textSub,
        border: `1px solid ${selected.length ? C.violetBorder : C.border}`,
        borderRadius:8, padding:'6px 12px', fontSize:12, fontWeight:600,
        cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap'
      }}>
        {Icon && <Icon size={12} />}
        {label}
        {selected.length > 0 && (
          <span style={{
            background:C.violet, color:'#fff', borderRadius:10,
            padding:'1px 7px', fontSize:10, fontWeight:700
          }}>{selected.length}</span>
        )}
        <ChevronDown size={11} />
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position:'fixed', inset:0, zIndex:50 }} />
          <div style={{
            position:'absolute', top:'100%', left:0, marginTop:5,
            background:C.surface, border:`1px solid ${C.border}`, borderRadius:10,
            padding:6, minWidth:180, zIndex:51,
            boxShadow:'0 10px 30px rgba(0,0,0,0.4)'
          }}>
            {options.map(o => (
              <div key={o} onClick={() => toggle(o)} style={{
                display:'flex', alignItems:'center', gap:8,
                padding:'8px 10px', borderRadius:6, cursor:'pointer',
                background: selected.includes(o) ? C.violetLight : 'transparent'
              }}>
                <div style={{
                  width:14, height:14, borderRadius:3,
                  background: selected.includes(o) ? C.violet : 'transparent',
                  border: `1.5px solid ${selected.includes(o) ? C.violet : C.border}`,
                  display:'flex', alignItems:'center', justifyContent:'center'
                }}>
                  {selected.includes(o) && <Check size={10} color="#fff" />}
                </div>
                <span style={{ fontSize:12, color:C.text }}>{o}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const StatCard = ({ label, value, delta, deltaPositive=true, C }) => (
  <div style={{
    background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:'16px 18px'
  }}>
    <div style={{
      fontSize:11, fontWeight:600, color:C.textSub, marginBottom:8,
      letterSpacing:'0.05em', textTransform:'uppercase'
    }}>{label}</div>
    <div style={{ display:'flex', alignItems:'baseline', gap:10 }}>
      <span style={{
        fontFamily:"'Bricolage Grotesque', sans-serif",
        fontSize:26, fontWeight:800, color:C.text, letterSpacing:'-0.025em'
      }}>{value}</span>
      {delta && (
        <span style={{
          fontSize:11, fontWeight:700,
          color: deltaPositive ? C.green : '#F87171'
        }}>{deltaPositive ? '↑' : '↓'} {delta}</span>
      )}
    </div>
  </div>
);

const ChartCard = ({ title, subtitle, children, C, fullWidth }) => (
  <div style={{
    background:C.card, border:`1px solid ${C.border}`, borderRadius:14,
    padding:'20px 22px', gridColumn: fullWidth ? '1 / -1' : 'auto'
  }}>
    <div style={{ marginBottom:16 }}>
      <h4 style={{
        fontFamily:"'Bricolage Grotesque', sans-serif",
        fontSize:14, fontWeight:700, color:C.text, margin:'0 0 3px',
        letterSpacing:'-0.01em'
      }}>{title}</h4>
      {subtitle && <p style={{ fontSize:11, color:C.textSub, margin:0 }}>{subtitle}</p>}
    </div>
    {children}
  </div>
);

const InsightsPage = ({ C, drafts, published }) => {
  const [view, setView] = useState('executive');
  const [scope, setScope] = useState('team');
  const [dateRange, setDateRange] = useState('30d');
  const [selRoles, setSelRoles] = useState([]);
  const [selSegments, setSelSegments] = useState([]);
  const [selGeos, setSelGeos] = useState([]);
  const [selLeads, setSelLeads] = useState([]);

  const days = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : dateRange === '90d' ? 90 : 30;
  const filterIntensity = selRoles.length + selSegments.length + selGeos.length + selLeads.length;
  const sizeFactor = Math.max(0.3, 1 - filterIntensity * 0.12);

  const levelDist = useMemo(() => [
    { name:'L1 Risk',         value: Math.round(48 * sizeFactor),  color:'#F87171' },
    { name:'L2 Novice',       value: Math.round(192 * sizeFactor), color:'#FFB347' },
    { name:'L3 Practitioner', value: Math.round(112 * sizeFactor), color:C.violet },
    { name:'L4 Strategist',   value: Math.round(40 * sizeFactor),  color:C.green },
    { name:'L5 Architect',    value: Math.round(8 * sizeFactor),   color:C.pinkRose },
  ], [sizeFactor, C]);

  const levelOverTime = useMemo(() => Array.from({ length:days }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (days - i - 1));
    const t = i / days;
    return {
      date: d.toLocaleDateString('en-US', { month:'short', day:'numeric' }),
      L1: Math.round((58 - t * 22) * sizeFactor),
      L2: Math.round((48 + t * 8)  * sizeFactor),
      L3: Math.round((20 + t * 22) * sizeFactor),
      L4: Math.round((6  + t * 10) * sizeFactor),
    };
  }), [days, sizeFactor]);

  const fluencyBehaviors = useMemo(() => Array.from({ length:days }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (days - i - 1));
    const t = i / days;
    return {
      date: d.toLocaleDateString('en-US', { month:'short', day:'numeric' }),
      iteration:  Math.round((1.4 + t * 1.6 + Math.sin(i * 0.4) * 0.2) * 100) / 100 * sizeFactor,
      breadth:    Math.round((1.8 + t * 1.4 + Math.cos(i * 0.3) * 0.2) * 100) / 100 * sizeFactor,
      complexity: Math.round((42 + t * 28  + Math.sin(i * 0.2) * 4)         * sizeFactor),
    };
  }), [days, sizeFactor]);

  const moduleCompletion = useMemo(() => AI_101_MODULES.map((m, i) => ({
    name: m.id,
    completed: Math.round((280 - i * 32 - i * 8) * sizeFactor),
    inProgress: Math.round((40 + i * 4) * sizeFactor),
  })), [sizeFactor]);

  const fluencyVsRevenue = useMemo(() => Array.from({ length:80 }, (_, i) => ({
    fluency: Math.round(20 + Math.random() * 70),
    productivity: Math.round(40 + (i / 80) * 60 + (Math.random() - 0.5) * 30),
    name:`Rep ${i + 1}`,
  })), []);

  const dropoff = useMemo(() => AI_101_MODULES.map((m, i) => ({
    name: m.id,
    started:   Math.round((300 - i * 8) * sizeFactor),
    completed: Math.round((280 - i * 32 - i * 8) * sizeFactor),
  })), [sizeFactor]);

  const knowledgeChecks = useMemo(() => [
    { name:'M01 Q1', pass:92, fail:8 },
    { name:'M02 Q1', pass:85, fail:15 },
    { name:'M03 Q1', pass:78, fail:22 },
    { name:'M04 Q1', pass:81, fail:19 },
    { name:'M05 Q1', pass:64, fail:36 },
    { name:'M06 Q1', pass:73, fail:27 },
    { name:'M07 Q1', pass:88, fail:12 },
  ], []);

  const contentEngine = useMemo(() => Array.from({ length:days }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (days - i - 1));
    return {
      date: d.toLocaleDateString('en-US', { month:'short', day:'numeric' }),
      drafts:    Math.round((1.4 + Math.sin(i * 0.5) * 1.2) * 2),
      published: Math.round((0.8 + Math.cos(i * 0.4) * 0.6) * 2),
    };
  }), [days]);

  const fluencyRadar = useMemo(() => [
    { axis:'Iteration',  team:74, you:62 },
    { axis:'Breadth',    team:68, you:55 },
    { axis:'Complexity', team:71, you:48 },
    { axis:'Recovery',   team:65, you:60 },
    { axis:'Synthesis',  team:78, you:52 },
    { axis:'Judgment',   team:82, you:69 },
  ], []);

  // CSV EXPORT
  const exportCSV = () => {
    let rows = [];
    if (view === 'executive') {
      rows = [
        ['metric','date','value'],
        ...levelOverTime.flatMap(r => Object.entries(r).filter(([k]) => k !== 'date').map(([k,v]) => [`level_${k}`, r.date, v])),
        ...fluencyBehaviors.flatMap(r => [
          ['iteration_depth',  r.date, r.iteration],
          ['tool_breadth',     r.date, r.breadth],
          ['task_complexity',  r.date, r.complexity],
        ]),
      ];
    } else {
      rows = [
        ['metric','category','value'],
        ...moduleCompletion.flatMap(r => [['completed', r.name, r.completed], ['in_progress', r.name, r.inProgress]]),
        ...knowledgeChecks.flatMap(r => [['kc_pass', r.name, r.pass], ['kc_fail', r.name, r.fail]]),
        ...contentEngine.flatMap(r => [['drafts', r.date, r.drafts], ['published', r.date, r.published]]),
      ];
    }
    const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type:'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brainstorm-insights-${view}-${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const tooltipStyle = {
    background:C.surface, border:`1px solid ${C.border}`, borderRadius:8,
    fontSize:12, color:C.text, padding:'8px 10px'
  };
  const axisStyle = { fontSize:10, fill:C.textSub };

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100vh', overflow:'hidden' }}>
      {/* Header */}
      <div style={{
        padding:'24px 36px 14px', borderBottom:`1px solid ${C.border}`,
        background:C.surface, flexShrink:0
      }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
          <div>
            <div style={{ color:C.textDim, fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:4, fontWeight:600 }}>
              Insights
            </div>
            <h1 style={{
              fontFamily:"'Bricolage Grotesque', sans-serif", fontSize:28, fontWeight:700,
              color:C.text, margin:'0 0 4px', letterSpacing:'-0.025em'
            }}>Three-tier framework</h1>
            <p style={{ fontSize:13, color:C.textSub, margin:0 }}>Program {'\u2192'} capability {'\u2192'} revenue. Correlation, not causation.</p>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ display:'flex', gap:0, background:C.cardAlt, borderRadius:9, padding:3 }}>
              {[['executive','Executive'],['operator','Operator']].map(([k,l]) => (
                <button key={k} onClick={() => setView(k)} style={{
                  padding:'7px 14px', fontSize:12, fontWeight:700, border:'none', borderRadius:7,
                  cursor:'pointer', fontFamily:'inherit',
                  background: view === k ? C.surface : 'transparent',
                  color: view === k ? C.violet : C.textSub
                }}>{l}</button>
              ))}
            </div>
            <Btn onClick={exportCSV} C={C} variant="secondary" size="sm" icon={<Download size={12} />}>Export CSV</Btn>
          </div>
        </div>

        {/* Filter bar */}
        <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
          <div style={{ display:'flex', gap:0, background:C.cardAlt, borderRadius:8, padding:2 }}>
            {['7d','30d','90d'].map(r => (
              <button key={r} onClick={() => setDateRange(r)} style={{
                padding:'5px 11px', fontSize:11, fontWeight:700, border:'none', borderRadius:6,
                cursor:'pointer', fontFamily:'inherit',
                background: dateRange === r ? C.surface : 'transparent',
                color: dateRange === r ? C.violet : C.textSub
              }}>{r}</button>
            ))}
          </div>
          <div style={{ width:1, height:20, background:C.border, margin:'0 4px' }} />
          <div style={{ display:'flex', gap:0, background:C.cardAlt, borderRadius:8, padding:2 }}>
            {[['team','Team'],['individual','Individual']].map(([k,l]) => (
              <button key={k} onClick={() => setScope(k)} style={{
                padding:'5px 11px', fontSize:11, fontWeight:700, border:'none', borderRadius:6,
                cursor:'pointer', fontFamily:'inherit',
                background: scope === k ? C.surface : 'transparent',
                color: scope === k ? C.violet : C.textSub
              }}>{l}</button>
            ))}
          </div>
          <div style={{ width:1, height:20, background:C.border, margin:'0 4px' }} />
          <MultiSelect label="Team Lead" options={TEAM_LEADS} selected={selLeads} setSelected={setSelLeads} C={C} icon={Users} />
          <MultiSelect label="Geo"       options={GEOS}       selected={selGeos}  setSelected={setSelGeos}  C={C} icon={Globe} />
          <MultiSelect label="Segment"   options={SEGMENTS}   selected={selSegments} setSelected={setSelSegments} C={C} />
          <MultiSelect label="Role"      options={INSIGHTS_ROLES} selected={selRoles} setSelected={setSelRoles} C={C} />
          {filterIntensity > 0 && (
            <button onClick={() => { setSelRoles([]); setSelSegments([]); setSelGeos([]); setSelLeads([]); }}
              style={{
                background:'transparent', border:'none', color:C.violet,
                fontSize:11, fontWeight:700, cursor:'pointer', padding:'5px 10px', fontFamily:'inherit'
              }}>Clear filters</button>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{ flex:1, overflow:'auto', padding:'20px 36px 32px' }}>
        {view === 'executive' ? (
          <>
            {/* Top stats */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:18 }}>
              <StatCard label="Total enrolled"            value={Math.round(400 * sizeFactor)} delta="+24"      deltaPositive C={C} />
              <StatCard label="Avg level"                 value={`${(2.0 + (1 - sizeFactor) * 0.4).toFixed(1)}`} delta="+0.3"  deltaPositive C={C} />
              <StatCard label="L3+ reps"                  value={Math.round(160 * sizeFactor)} delta="+18%"     deltaPositive C={C} />
              <StatCard label={'Productivity \u0394 vs control'} value="+11.4%" delta="+2.1pp" deltaPositive C={C} />
            </div>

            {/* TIER 1 */}
            <TierLabel num={1} title="Program Metric" desc="Brainstorm drives level progression" color={C.violet} bg={C.violetLight} C={C} />
            <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:14, marginBottom:18 }}>
              <ChartCard title="Level Distribution" subtitle="Where the org sits today" C={C}>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={levelDist} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={88} paddingAngle={2}>
                      {levelDist.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize:11, color:C.textSub }} iconType="circle" iconSize={7} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard title="Level Progression Over Time" subtitle="Cohort movement up the levels" C={C}>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={levelOverTime}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis dataKey="date" tick={axisStyle} stroke={C.border} />
                    <YAxis tick={axisStyle} stroke={C.border} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize:11 }} iconType="circle" iconSize={7} />
                    <Area type="monotone" dataKey="L1" stackId="1" stroke="#F87171"  fill="#F87171"  fillOpacity={0.6} />
                    <Area type="monotone" dataKey="L2" stackId="1" stroke="#FFB347"  fill="#FFB347"  fillOpacity={0.6} />
                    <Area type="monotone" dataKey="L3" stackId="1" stroke={C.violet} fill={C.violet} fillOpacity={0.7} />
                    <Area type="monotone" dataKey="L4" stackId="1" stroke={C.green}  fill={C.green}  fillOpacity={0.7} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            {/* TIER 2 */}
            <TierLabel num={2} title="Capability Metric" desc="Fluency behaviors" color={C.pinkRose} bg={C.pinkLight} C={C} />
            <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:14, marginBottom:18 }}>
              <ChartCard title="Fluency Behaviors Over Time" subtitle="Iteration depth, tool breadth, task complexity" C={C}>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={fluencyBehaviors}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis dataKey="date" tick={axisStyle} stroke={C.border} />
                    <YAxis tick={axisStyle} stroke={C.border} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize:11 }} iconType="circle" iconSize={7} />
                    <Line type="monotone" dataKey="iteration"  stroke={C.violet}   strokeWidth={2} dot={false} name="Iteration depth" />
                    <Line type="monotone" dataKey="breadth"    stroke={C.pinkRose} strokeWidth={2} dot={false} name="Tool breadth" />
                    <Line type="monotone" dataKey="complexity" stroke={C.green}    strokeWidth={2} dot={false} name="Task complexity" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard title="Multi-Dimensional Fluency" subtitle={scope === 'individual' ? 'You vs team' : 'Team avg'} C={C}>
                <ResponsiveContainer width="100%" height={220}>
                  <RadarChart data={fluencyRadar}>
                    <PolarGrid stroke={C.border} />
                    <PolarAngleAxis dataKey="axis" tick={{ ...axisStyle, fontSize:10 }} />
                    <PolarRadiusAxis tick={{ ...axisStyle, fontSize:9 }} stroke={C.border} />
                    <Radar name="Team" dataKey="team" stroke={C.violet} fill={C.violet} fillOpacity={0.4} />
                    {scope === 'individual' && <Radar name="You" dataKey="you" stroke={C.pinkRose} fill={C.pinkRose} fillOpacity={0.3} />}
                    <Tooltip contentStyle={tooltipStyle} />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            {/* TIER 3 */}
            <TierLabel num={3} title="Revenue Outcome" desc="Productivity correlation" color={C.green} bg={`${C.green}1A`} C={C} />
            <ChartCard title="Fluency vs. Productivity" subtitle="Each dot is a rep. Higher fluency, higher productivity delta." C={C} fullWidth>
              <ResponsiveContainer width="100%" height={260}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis type="number" dataKey="fluency" name="Fluency score" unit=""
                    tick={axisStyle} stroke={C.border}
                    label={{ value:'Fluency score', position:'insideBottom', offset:-5, fontSize:11, fill:C.textSub }} />
                  <YAxis type="number" dataKey="productivity" name="Productivity \u0394" unit="%"
                    tick={axisStyle} stroke={C.border}
                    label={{ value:'Productivity \u0394%', angle:-90, position:'insideLeft', fontSize:11, fill:C.textSub }} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ strokeDasharray:'3 3' }} />
                  <Scatter data={fluencyVsRevenue} fill={C.violet} fillOpacity={0.65} />
                </ScatterChart>
              </ResponsiveContainer>
            </ChartCard>
          </>
        ) : (
          <>
            {/* OPERATOR VIEW */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:18 }}>
              <StatCard label="Active learners (7d)"  value={Math.round(284 * sizeFactor)} delta="+12%"  deltaPositive C={C} />
              <StatCard label="Module completions"   value={Math.round(842 * sizeFactor)} delta="+18%"  deltaPositive C={C} />
              <StatCard label="Drafts pending"       value={String(drafts.length || 3)}    C={C} />
              <StatCard label="Avg time-to-publish"  value="2.4d" delta="-0.6d" deltaPositive C={C} />
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:18 }}>
              <ChartCard title="Module Completion Funnel" subtitle="Started vs completed by module" C={C}>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={dropoff}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis dataKey="name" tick={axisStyle} stroke={C.border} />
                    <YAxis tick={axisStyle} stroke={C.border} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize:11 }} iconType="circle" iconSize={7} />
                    <Bar dataKey="started"   fill={C.violetMid} name="Started"   radius={[4,4,0,0]} />
                    <Bar dataKey="completed" fill={C.violet}    name="Completed" radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard title="Knowledge Check Pass Rates" subtitle="M05 Q1 needs review. 36% fail rate." C={C}>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={knowledgeChecks} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis type="number" tick={axisStyle} stroke={C.border} domain={[0,100]} />
                    <YAxis type="category" dataKey="name" tick={axisStyle} stroke={C.border} width={56} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="pass" stackId="a" fill={C.green}  name="% pass" />
                    <Bar dataKey="fail" stackId="a" fill="#F87171"  name="% fail" radius={[0,4,4,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            <ChartCard title="Content Engine Throughput" subtitle="Drafts created and modules published per day" C={C} fullWidth>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={contentEngine}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis dataKey="date" tick={axisStyle} stroke={C.border} />
                  <YAxis tick={axisStyle} stroke={C.border} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize:11 }} iconType="circle" iconSize={7} />
                  <Bar dataKey="drafts"    fill={C.violetMid} name="Drafts"    radius={[4,4,0,0]} />
                  <Bar dataKey="published" fill={C.green}     name="Published" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginTop:18 }}>
              <ChartCard title="Module Status Breakdown" subtitle="Across all enrolled learners" C={C}>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={moduleCompletion}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis dataKey="name" tick={axisStyle} stroke={C.border} />
                    <YAxis tick={axisStyle} stroke={C.border} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="completed"  fill={C.violet}   name="Completed"   radius={[4,4,0,0]} />
                    <Bar dataKey="inProgress" fill={C.pinkRose} name="In progress" radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard title="Top Performers" subtitle="By modules completed this period" C={C}>
                <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:8 }}>
                  {[
                    ['JP','Jordan P.','AE · Enterprise',         7, C.green],
                    ['LR','Lisa R.','RA · SMB',                  6, C.pinkRose],
                    ['RC','Ryan C.','AE · Enterprise',           5, '#7BB8FF'],
                    ['MT','Marcus T.','SDR · Mid-Market',        5, C.violetMid],
                    ['MN','Maya N.','RA · Mid-Market',           4, '#06D6A0'],
                    ['DW','Dev W.','SDR · SMB',                  4, '#C77DFF'],
                  ].map(([init, name, role, n, ac]) => (
                    <div key={name} style={{
                      display:'flex', alignItems:'center', gap:10,
                      padding:'7px 10px', borderRadius:8, background:C.cardAlt
                    }}>
                      <Avatar initials={init} ac={ac} size={30} />
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:12, fontWeight:700, color:C.text }}>{name}</div>
                        <div style={{ fontSize:11, color:C.textDim }}>{role}</div>
                      </div>
                      <div style={{
                        fontFamily:"'Bricolage Grotesque', sans-serif",
                        fontSize:16, fontWeight:800, color:C.violet, letterSpacing:'-0.02em'
                      }}>{n}</div>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const TierLabel = ({ num, title, desc, color, bg, C }) => (
  <div style={{ display:'flex', alignItems:'center', gap:10, margin:'20px 0 12px' }}>
    <div style={{
      background:bg, color, padding:'4px 10px', borderRadius:6,
      fontSize:10, fontWeight:800, letterSpacing:'0.08em'
    }}>TIER {num}</div>
    <span style={{
      fontFamily:"'Bricolage Grotesque', sans-serif",
      fontSize:14, fontWeight:700, color:C.text, letterSpacing:'-0.01em'
    }}>{title}</span>
    <span style={{ fontSize:13, color:C.textSub }}>· {desc}</span>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// SCREEN: Settings
// ═══════════════════════════════════════════════════════════════════════════

const inputStyle = (C) => ({
  width:'100%', background:C.input, border:`1px solid ${C.border}`,
  borderRadius:9, padding:'10px 12px', fontSize:13, color:C.text,
  outline:'none', fontFamily:'inherit'
});

const SettingsSection = ({ title, desc, children, C }) => (
  <div style={{ maxWidth:640 }}>
    <h2 style={{
      fontFamily:"'Bricolage Grotesque', sans-serif",
      fontSize:24, fontWeight:700, color:C.text,
      margin:'0 0 6px', letterSpacing:'-0.02em'
    }}>{title}</h2>
    <p style={{ fontSize:13, color:C.textSub, margin:'0 0 24px', lineHeight:1.55 }}>{desc}</p>
    {children}
  </div>
);

const Field = ({ label, children, C }) => (
  <div style={{ marginBottom:18 }}>
    <label style={{
      display:'block', fontSize:11, fontWeight:700, color:C.textSub,
      marginBottom:7, letterSpacing:'0.08em', textTransform:'uppercase'
    }}>{label}</label>
    {children}
  </div>
);

const SettingsPage = ({ C, theme, setTheme, user, setUser, model, setModel }) => {
  const [section, setSection] = useState('profile');
  const [savedFlash, setSavedFlash] = useState(false);

  const showSaved = () => { setSavedFlash(true); setTimeout(() => setSavedFlash(false), 1500); };

  const sections = [
    { id:'profile',       label:'Profile',       Icon:User },
    { id:'appearance',    label:'Appearance',    Icon:Sun },
    { id:'model',         label:'AI Model',      Icon:Cpu },
    { id:'apikeys',       label:'API Keys',      Icon:Key },
    { id:'oauth',         label:'OAuth',         Icon:Globe },
    { id:'mcp',           label:'MCP Servers',   Icon:Bot },
    { id:'notifications', label:'Notifications', Icon:Bell },
  ];

  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden' }}>
      {/* Settings nav */}
      <div style={{
        width:230, borderRight:`1px solid ${C.border}`, padding:'28px 14px',
        background:C.surface, flexShrink:0
      }}>
        <h1 style={{
          fontFamily:"'Bricolage Grotesque', sans-serif", fontSize:20, fontWeight:700,
          color:C.text, margin:'0 0 18px 8px', letterSpacing:'-0.02em'
        }}>Settings</h1>
        <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
          {sections.map(s => (
            <button key={s.id} onClick={() => setSection(s.id)} style={{
              display:'flex', alignItems:'center', gap:10, padding:'9px 11px', borderRadius:8,
              border:'none', cursor:'pointer', textAlign:'left', fontFamily:'inherit',
              background: section === s.id ? C.violetLight : 'transparent',
              color: section === s.id ? C.violet : C.textSub,
              fontSize:13, fontWeight: section === s.id ? 700 : 500
            }}>
              <s.Icon size={14} />{s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Settings body */}
      <div style={{ flex:1, overflow:'auto', padding:'32px 40px', position:'relative' }}>
        {savedFlash && (
          <div style={{
            position:'absolute', top:24, right:24,
            background:`${C.green}1A`, border:`1px solid ${C.green}55`,
            borderRadius:8, padding:'7px 12px',
            fontSize:12, fontWeight:700, color:C.green,
            display:'flex', alignItems:'center', gap:6
          }}>
            <Check size={12} />Saved
          </div>
        )}

        {section === 'profile' && (
          <SettingsSection title="Profile" desc="Your information shown across Brainstorm." C={C}>
            <Field label="Full name" C={C}>
              <input value={user?.name || ''}
                onChange={e => { setUser({ ...user, name:e.target.value }); showSaved(); }}
                style={inputStyle(C)} />
            </Field>
            <Field label="Role" C={C}>
              <select value={user?.role || ''}
                onChange={e => { setUser({ ...user, role:e.target.value }); showSaved(); }}
                style={inputStyle(C)}>
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </Field>
            <Field label="Type" C={C}>
              <div style={{ display:'flex', gap:8 }}>
                {TYPES.map(t => (
                  <button key={t.value} onClick={() => { setUser({ ...user, type:t.value }); showSaved(); }}
                    style={{
                      flex:1, padding:'10px 14px', borderRadius:9, fontSize:12, fontWeight:700,
                      cursor:'pointer', fontFamily:'inherit', textAlign:'left',
                      background: user?.type === t.value ? C.violetLight : C.card,
                      border: `1px solid ${user?.type === t.value ? C.violetBorder : C.border}`,
                      color: user?.type === t.value ? C.violet : C.text
                    }}>
                    {t.label}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Team" C={C}>
              <select value={user?.team || ''}
                onChange={e => { setUser({ ...user, team:e.target.value }); showSaved(); }}
                style={inputStyle(C)}>
                {TEAMS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="AI proficiency" C={C}>
              <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                {PROFICIENCY.map(p => (
                  <button key={p.value}
                    onClick={() => { setUser({ ...user, proficiency:p.value }); showSaved(); }}
                    style={{
                      flex:'1 1 120px', padding:'9px 12px', borderRadius:8, fontSize:12, fontWeight:700,
                      cursor:'pointer', fontFamily:'inherit',
                      background: user?.proficiency === p.value ? C.violetLight : C.card,
                      border: `1px solid ${user?.proficiency === p.value ? C.violetBorder : C.border}`,
                      color: user?.proficiency === p.value ? C.violet : C.textSub
                    }}>{p.label}</button>
                ))}
              </div>
            </Field>
            <Field label="Self-assessed level" C={C}>
              {user?.selfAssessedLevel ? (
                <div style={{
                  padding:'12px 14px', background:C.card, border:`1px solid ${C.border}`,
                  borderRadius:9, fontSize:13, color:C.text
                }}>
                  L{user.selfAssessedLevel} · {LEVELS.find(l => l.num === user.selfAssessedLevel)?.name}
                  <div style={{ fontSize:11, color:C.textDim, marginTop:4 }}>
                    Captured at onboarding. Not used to set starting level.
                  </div>
                </div>
              ) : (
                <div style={{ fontSize:12, color:C.textDim, padding:'12px 14px', background:C.card, border:`1px dashed ${C.border}`, borderRadius:9 }}>
                  Not set
                </div>
              )}
            </Field>
          </SettingsSection>
        )}

        {section === 'appearance' && (
          <SettingsSection title="Appearance" desc="How Brainstorm looks for you." C={C}>
            <Field label="Theme" C={C}>
              <div style={{ display:'flex', gap:10 }}>
                {[
                  { k:'dark',  label:'Dark',  Icon:Moon, available:true },
                  { k:'light', label:'Light', Icon:Sun,  available:false }
                ].map(t => (
                  <button key={t.k}
                    onClick={() => t.available && (setTheme(t.k), showSaved())}
                    disabled={!t.available}
                    style={{
                      flex:1, padding:'18px 16px', borderRadius:11, cursor: t.available ? 'pointer' : 'default',
                      display:'flex', flexDirection:'column', alignItems:'center', gap:8,
                      fontFamily:'inherit', position:'relative',
                      background: theme === t.k ? C.violetLight : C.card,
                      border: `1.5px solid ${theme === t.k ? C.violet : C.border}`,
                      opacity: t.available ? 1 : 0.5
                    }}>
                    <t.Icon size={22} color={theme === t.k ? C.violet : C.textSub} />
                    <span style={{ fontSize:13, fontWeight:700, color: theme === t.k ? C.violet : C.text }}>
                      {t.label}
                    </span>
                    {theme === t.k && (
                      <span style={{ fontSize:10, fontWeight:700, color:C.violet, letterSpacing:'0.08em', textTransform:'uppercase' }}>
                        Active
                      </span>
                    )}
                    {!t.available && (
                      <span style={{ fontSize:10, fontWeight:700, color:C.textDim, letterSpacing:'0.08em', textTransform:'uppercase' }}>
                        Coming soon
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Density" C={C}>
              <div style={{ display:'flex', gap:6 }}>
                {['Comfortable','Compact'].map(d => (
                  <button key={d} disabled style={{
                    flex:1, padding:'9px 11px', borderRadius:8, fontSize:12, fontWeight:700,
                    cursor:'default', fontFamily:'inherit',
                    background: d === 'Comfortable' ? C.violetLight : C.card,
                    border: `1px solid ${d === 'Comfortable' ? C.violetBorder : C.border}`,
                    color: d === 'Comfortable' ? C.violet : C.textDim,
                    opacity: d === 'Compact' ? 0.5 : 1
                  }}>{d}{d === 'Compact' && ' (soon)'}</button>
                ))}
              </div>
            </Field>
          </SettingsSection>
        )}

        {section === 'model' && (
          <SettingsSection title="AI Model" desc="The model used by the Content Engine to synthesize modules." C={C}>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {[
                { id:'claude-opus-4-5',          name:'Claude Opus 4.5',   desc:'Most capable. Best for nuanced curriculum design.', tag:'Recommended', tagColor:C.violet },
                { id:'claude-sonnet-4-5',        name:'Claude Sonnet 4.5', desc:'Balanced speed and capability. Strong default.',     tag:'Fast',        tagColor:C.green },
                { id:'claude-haiku-4-5',         name:'Claude Haiku 4.5',  desc:'Fastest, most affordable. Great for high-volume.',    tag:'Cheapest',    tagColor:C.pinkRose },
                { id:'claude-sonnet-4-20250514', name:'Claude Sonnet 4',   desc:'Stable production version.',                          tag:'Stable',      tagColor:C.textSub },
              ].map(m => (
                <button key={m.id} onClick={() => { setModel(m.id); showSaved(); }}
                  style={{
                    textAlign:'left', padding:'16px 18px', borderRadius:12, cursor:'pointer',
                    fontFamily:'inherit', display:'flex', alignItems:'flex-start', gap:14,
                    background: model === m.id ? C.violetLight : C.card,
                    border: `1.5px solid ${model === m.id ? C.violet : C.border}`
                  }}>
                  <div style={{
                    width:18, height:18, borderRadius:'50%', flexShrink:0, marginTop:3,
                    border:`2px solid ${model === m.id ? C.violet : C.border}`,
                    display:'flex', alignItems:'center', justifyContent:'center'
                  }}>
                    {model === m.id && <div style={{ width:9, height:9, borderRadius:'50%', background:C.violet }} />}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                      <span style={{
                        fontFamily:"'Bricolage Grotesque', sans-serif",
                        fontSize:15, fontWeight:700, color:C.text, letterSpacing:'-0.01em'
                      }}>{m.name}</span>
                      <span style={{
                        fontSize:10, fontWeight:700, color:m.tagColor,
                        background:`${m.tagColor}22`, padding:'2px 8px', borderRadius:5,
                        letterSpacing:'0.04em', textTransform:'uppercase'
                      }}>{m.tag}</span>
                    </div>
                    <div style={{ fontSize:12, color:C.textSub, marginBottom:5, lineHeight:1.5 }}>{m.desc}</div>
                    <div style={{ fontSize:10, color:C.textDim, fontFamily:'monospace' }}>{m.id}</div>
                  </div>
                </button>
              ))}
            </div>
          </SettingsSection>
        )}

        {section === 'apikeys' && (
          <SettingsSection title="API Keys" desc="Manage credentials for connected services." C={C}>
            {[
              { name:'Anthropic API Key', val:'sk-ant-•••••••••••••••••••XYZ4', status:'active' },
              { name:'OpenAI API Key',    val:'Not configured',                  status:'missing' },
              { name:'Google AI Key',     val:'•••••••••••••••••••••AB12',       status:'active' },
            ].map(k => (
              <div key={k.name} style={{
                background:C.card, border:`1px solid ${C.border}`, borderRadius:11,
                padding:'14px 16px', marginBottom:9
              }}>
                <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
                  <Key size={18} color={k.status === 'active' ? C.violet : C.textDim} style={{ flexShrink:0, marginTop:2 }} />
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:3 }}>
                      <span style={{ fontSize:13, fontWeight:700, color:C.text }}>{k.name}</span>
                      <span style={{
                        fontSize:10, fontWeight:700,
                        color: k.status === 'active' ? C.green : '#FFB347',
                        background: k.status === 'active' ? `${C.green}1A` : 'rgba(255, 179, 71, 0.12)',
                        padding:'2px 7px', borderRadius:4,
                        letterSpacing:'0.04em', textTransform:'uppercase'
                      }}>{k.status}</span>
                    </div>
                    <div style={{ fontSize:12, color:C.textSub, fontFamily:'monospace' }}>{k.val}</div>
                  </div>
                  <Btn C={C} variant="secondary" size="sm">Update</Btn>
                </div>
              </div>
            ))}
          </SettingsSection>
        )}

        {section === 'oauth' && (
          <SettingsSection title="OAuth Connections" desc="Sign-in providers for Brainstorm." C={C}>
            {[
              { name:'Google Workspace', desc:'Sign in with @gong.io accounts', status:'active' },
              { name:'Okta SSO',         desc:'Enterprise identity provider',    status:'active' },
              { name:'Microsoft Entra',  desc:'For partner organizations',        status:'inactive' },
            ].map(o => (
              <div key={o.name} style={{
                background:C.card, border:`1px solid ${C.border}`, borderRadius:11,
                padding:'14px 16px', marginBottom:9, display:'flex', alignItems:'center', gap:14
              }}>
                <Globe size={20} color={o.status === 'active' ? C.violet : C.textDim} style={{ flexShrink:0 }} />
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:3 }}>
                    <span style={{ fontSize:13, fontWeight:700, color:C.text }}>{o.name}</span>
                    <span style={{
                      fontSize:10, fontWeight:700,
                      color: o.status === 'active' ? C.green : C.textDim,
                      background: o.status === 'active' ? `${C.green}1A` : C.cardAlt,
                      padding:'2px 7px', borderRadius:4,
                      letterSpacing:'0.04em', textTransform:'uppercase'
                    }}>{o.status}</span>
                  </div>
                  <div style={{ fontSize:12, color:C.textSub }}>{o.desc}</div>
                </div>
                <Btn C={C} variant="secondary" size="sm">{o.status === 'active' ? 'Configure' : 'Connect'}</Btn>
              </div>
            ))}
          </SettingsSection>
        )}

        {section === 'mcp' && (
          <SettingsSection title="MCP Servers" desc="Model Context Protocol connections that extend what the Content Engine can reach." C={C}>
            {[
              { name:'Gong API',             desc:'Calls, deals, accounts',                    status:'active', tools:8 },
              { name:'Internal Wiki',        desc:"Pull from Gong's internal documentation",  status:'active', tools:2 },
              { name:'Salesforce',           desc:'CRM data and opportunities',                status:'active', tools:5 },
              { name:'Slack',                desc:'Read team channels for context',           status:'inactive', tools:0 },
            ].map(m => (
              <div key={m.name} style={{
                background:C.card, border:`1px solid ${C.border}`, borderRadius:11,
                padding:'14px 16px', marginBottom:9
              }}>
                <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
                  <Bot size={20} color={m.status === 'active' ? C.violet : C.textDim} style={{ flexShrink:0, marginTop:2 }} />
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:3 }}>
                      <span style={{ fontSize:13, fontWeight:700, color:C.text }}>{m.name}</span>
                      <span style={{
                        fontSize:10, fontWeight:700,
                        color: m.status === 'active' ? C.green : C.textDim,
                        background: m.status === 'active' ? `${C.green}1A` : C.cardAlt,
                        padding:'2px 7px', borderRadius:4,
                        letterSpacing:'0.04em', textTransform:'uppercase'
                      }}>{m.status}</span>
                    </div>
                    <div style={{ fontSize:12, color:C.textSub, marginBottom:4 }}>{m.desc}</div>
                    <div style={{ fontSize:11, color:C.textDim }}>{m.tools} tools available</div>
                  </div>
                  <Btn C={C} variant="secondary" size="sm">Configure</Btn>
                </div>
              </div>
            ))}
            <Btn C={C} variant="secondary" size="sm" icon={<Plus size={12} />}>Add MCP server</Btn>
          </SettingsSection>
        )}

        {section === 'notifications' && (
          <SettingsSection title="Notifications" desc="When and where Brainstorm reaches you." C={C}>
            {[
              { name:'Achievement unlocked',     desc:'When you earn a new badge',           email:true,  slack:true },
              { name:'Weekly digest',            desc:'Your progress summary every Monday',  email:true,  slack:false },
              { name:'New module published',     desc:'When a module is added to your path', email:false, slack:true },
              { name:'Team activity',            desc:'Big moments from your teammates',     email:false, slack:true },
            ].map(n => (
              <div key={n.name} style={{
                background:C.card, border:`1px solid ${C.border}`, borderRadius:11,
                padding:'14px 16px', marginBottom:9, display:'flex', alignItems:'center', gap:14
              }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:3 }}>{n.name}</div>
                  <div style={{ fontSize:12, color:C.textSub }}>{n.desc}</div>
                </div>
                <div style={{ display:'flex', gap:14 }}>
                  {[['Email', n.email], ['Slack', n.slack]].map(([k, v]) => (
                    <label key={k} style={{ display:'flex', alignItems:'center', gap:7, cursor:'pointer' }}>
                      <div style={{
                        width:34, height:18, borderRadius:10, position:'relative',
                        background: v ? C.violet : C.border, transition:'background 0.15s'
                      }}>
                        <div style={{
                          position:'absolute', top:2, left: v ? 18 : 2,
                          width:14, height:14, borderRadius:'50%', background:'#fff',
                          transition:'left 0.15s'
                        }} />
                      </div>
                      <span style={{ fontSize:11, fontWeight:600, color:C.textSub }}>{k}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </SettingsSection>
        )}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN APP · state machine, persistence, screen routing
// ═══════════════════════════════════════════════════════════════════════════

export default function App() {
  const [hydrated, setHydrated] = useState(false);
  const [step, setStep] = useState(initialState.step);
  const [appScreen, setAppScreen] = useState(initialState.appScreen);
  const [user, setUser] = useState(initialState.user);
  const [progress, setProgress] = useState(initialState.progress);
  const [level, setLevel] = useState(initialState.level);
  const [achievements, setAchievements] = useState(initialState.achievements);
  const [modulesCompletedInJourney, setModulesCompletedInJourney] = useState(initialState.modulesCompletedInJourney);
  const [activeModuleId, setActiveModuleId] = useState('M01');
  const [lastScore, setLastScore] = useState(0);
  const [selectedModel, setSelectedModel] = useState(initialState.selectedModel);
  const [drafts, setDrafts] = useState(initialState.drafts);
  const [published, setPublished] = useState(initialState.published);
  const [theme, setTheme] = useState(initialState.theme);

  const C = theme === 'light' ? LIGHT : DARK;

  // Hydrate from window.storage on first load
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const saved = await loadState();
      if (cancelled) return;
      if (saved && saved.user) {
        // User has been onboarded before. Resume in app state.
        setStep('app');
        setAppScreen(saved.appScreen === 'lesson' || saved.appScreen === 'check' || saved.appScreen === 'completion' ? 'dashboard' : (saved.appScreen || 'dashboard'));
        setUser(saved.user);
        setProgress(saved.progress || {});
        setLevel(saved.level || 1);
        setAchievements(saved.achievements || []);
        setModulesCompletedInJourney(saved.modulesCompletedInJourney || 0);
        setSelectedModel(saved.selectedModel || initialState.selectedModel);
        setDrafts(saved.drafts || []);
        setPublished(saved.published || []);
        setTheme(saved.theme || 'dark');
      }
      setHydrated(true);
    })();
    return () => { cancelled = true; };
  }, []);

  // Persist to window.storage on relevant changes
  useEffect(() => {
    if (!hydrated) return;
    saveState({
      step, appScreen, user, progress, level, achievements,
      modulesCompletedInJourney, selectedModel, drafts, published, theme
    });
  }, [hydrated, step, appScreen, user, progress, level, achievements, modulesCompletedInJourney, selectedModel, drafts, published, theme]);

  // ═══ Transition handlers ═══

  const handleLogin = () => setStep('onboarding');

  const handleOnboardingComplete = (data) => {
    // Everyone starts at L1. selfAssessedLevel is captured for data only.
    setUser({
      name:data.name,
      role:data.role,
      type:data.type,
      team:data.team,
      proficiency:data.proficiency,
      selfAssessedLevel:data.selfAssessedLevel
    });
    setLevel(1);
    setStep('app');
    setAppScreen('dashboard');
  };

  const handleSelectModule = (moduleId) => {
    setActiveModuleId(moduleId);
    setAppScreen('lesson');
  };

  const handleStartCheck = () => setAppScreen('check');

  const handleBackToLesson = () => setAppScreen('lesson');

  const handleBackToDashboard = () => setAppScreen('dashboard');

  const handleCheckComplete = (score) => {
    setLastScore(score);
    const newProgress = {
      ...progress,
      [activeModuleId]:{ score, completedAt:new Date().toISOString() }
    };
    setProgress(newProgress);
    const newAchievements = [...new Set([...achievements, 'foundations-started'])];
    setAchievements(newAchievements);
    const completedCount = Object.keys(newProgress).length;
    setModulesCompletedInJourney(completedCount);
    setAppScreen('completion');
  };

  const handleCompletionContinue = () => setAppScreen('dashboard');

  const handleReset = async () => {
    await clearState();
    setStep('login');
    setAppScreen('dashboard');
    setUser(null);
    setProgress({});
    setLevel(1);
    setAchievements([]);
    setModulesCompletedInJourney(0);
    setSelectedModel(initialState.selectedModel);
    setDrafts([]);
    setPublished([]);
    setTheme('dark');
  };

  // Determine if sidebar should show
  const sidebarHidden = step === 'login' || step === 'onboarding' || appScreen === 'completion';

  return (
    <>
      <FontAndAnimations C={C} />
      {!hydrated ? (
        <div style={{
          minHeight:'100vh', background:C.bg, display:'flex', alignItems:'center', justifyContent:'center'
        }}>
          <div style={{
            width:24, height:24, border:`2px solid ${C.violet}`, borderTopColor:'transparent',
            borderRadius:'50%'
          }} className="bs-spin" />
        </div>
      ) : step === 'login' ? (
        <LoginScreen onLogin={handleLogin} C={C} />
      ) : step === 'onboarding' ? (
        <OnboardingScreen onComplete={handleOnboardingComplete} C={C} />
      ) : (
        <div style={{ display:'flex', height:'100vh', overflow:'hidden', background:C.bg }}>
          {!sidebarHidden && (
            <Sidebar
              screen={appScreen} setScreen={setAppScreen}
              C={C} user={user} level={level}
              modulesCompletedInJourney={modulesCompletedInJourney}
              achievements={achievements}
            />
          )}
          <div style={{ flex:1, overflow:'hidden', background:C.bg, minWidth:0 }}>
            {appScreen === 'home' && (
              <HomeScreen user={user} C={C} />
            )}
            {appScreen === 'dashboard' && (
              <DashboardScreen
                user={user} progress={progress} level={level}
                achievements={achievements}
                modulesCompletedInJourney={modulesCompletedInJourney}
                onSelectModule={handleSelectModule} C={C} />
            )}
            {appScreen === 'lesson' && (
              <LessonScreen user={user} onBack={handleBackToDashboard} onStartCheck={handleStartCheck} C={C} />
            )}
            {appScreen === 'check' && (
              <KnowledgeCheckScreen onComplete={handleCheckComplete} onBack={handleBackToLesson} C={C} />
            )}
            {appScreen === 'completion' && (
              <CompletionScreen score={lastScore} onContinue={handleCompletionContinue} C={C} />
            )}
            {appScreen === 'paths' && (
              <PathsScreen user={user} modulesCompletedInJourney={modulesCompletedInJourney} C={C} />
            )}
            {appScreen === 'achievements' && (
              <AchievementsScreen achievements={achievements} C={C} />
            )}
            {appScreen === 'content' && (
              <ContentPage C={C} model={selectedModel}
                drafts={drafts} setDrafts={setDrafts}
                published={published} setPublished={setPublished} />
            )}
            {appScreen === 'insights' && (
              <InsightsPage C={C} drafts={drafts} published={published} />
            )}
            {appScreen === 'settings' && (
              <SettingsPage C={C} theme={theme} setTheme={setTheme}
                user={user} setUser={setUser}
                model={selectedModel} setModel={setSelectedModel} />
            )}
          </div>
        </div>
      )}
      {hydrated && <ResetControl onReset={handleReset} C={C} />}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// GLOBAL CSS · fonts, scrollbars, animations
// ═══════════════════════════════════════════════════════════════════════════

const FontAndAnimations = ({ C }) => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Manrope:wght@300;400;500;600;700;800&display=swap');

    * { box-sizing:border-box; margin:0; padding:0; }
    html, body, #root { height:100%; }
    body {
      background:${C.bg};
      font-family: 'Manrope', system-ui, -apple-system, sans-serif;
      font-feature-settings: "ss01", "cv11";
      color:${C.text};
      -webkit-font-smoothing:antialiased;
      -moz-osx-font-smoothing:grayscale;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: 'Bricolage Grotesque', system-ui, sans-serif;
    }

    button { font-family: inherit; }
    input, textarea, select { font-family: inherit; }
    input::placeholder, textarea::placeholder { color:${C.textDim}; }
    select {
      appearance:none; -webkit-appearance:none;
      background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%23${C.textSub.slice(1)}' d='M0 0l5 6 5-6z'/%3E%3C/svg%3E");
      background-repeat:no-repeat;
      background-position:right 12px center;
      padding-right:30px !important;
    }

    ::-webkit-scrollbar { width:6px; height:6px; }
    ::-webkit-scrollbar-track { background:transparent; }
    ::-webkit-scrollbar-thumb { background:${C.borderLight}; border-radius:6px; }
    ::-webkit-scrollbar-thumb:hover { background:${C.border}; }

    ::selection { background:${C.violet}33; color:${C.text}; }

    @keyframes bs-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .bs-spin { animation: bs-spin 1.2s linear infinite; }

    @keyframes bs-fade {
      from { opacity:0; transform: translateY(8px); }
      to { opacity:1; transform: translateY(0); }
    }
    .bs-fade {
      animation: bs-fade 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
    }

    @keyframes bs-float {
      0%, 100% { transform: translateY(0px); opacity:0.4; }
      50%      { transform: translateY(-12px); opacity:0.7; }
    }
    .bs-float { animation: bs-float 6s ease-in-out infinite; }
  `}</style>
);
