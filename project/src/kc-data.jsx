// Knowledge checks for AI 101, M01–M07.
// Structure per check: 2 MCQ + 1 multi/scenario + 1 applied free-response.
// Pass = all MCQ/multi correct OR ≥3/4 rubric criteria on the applied task.
// Rubrics shown UPFRONT for free-response (per design decision).

// ───────────── M01 — What is AI? ─────────────
const KC_M01 = [
  {
    id:'m01q1',
    type:'mc',
    question:'You open Claude.ai in your browser and type a question. Which part of that interaction is the *model*?',
    options:[
      'The browser tab and chat UI you\'re typing into',
      'The neural network that processes your text and generates a response',
      'The prompt you typed',
      'The text response that appears'
    ],
    correctIndex:1,
    explanation:"The model is the underlying neural network (Claude, GPT-4, Gemini, etc.). The chat interface is the *application* wrapped around it. Your input is the *prompt*, what comes back is the *output*. Same model can power many different apps."
  },
  {
    id:'m01q2',
    type:'mc',
    question:'An AI *agent* differs from a plain LLM chat in one fundamental way:',
    options:[
      'It uses a faster model under the hood',
      'It can take actions — call APIs, write files, browse — without you typing each step',
      'It has access to the public internet',
      'It only works for code-related tasks'
    ],
    correctIndex:1,
    explanation:'An agent is an LLM given the ability to *act* — execute tools, chain steps, work toward a goal. A chat model only outputs text. The capability ladder is: model → chat assistant → agent.'
  },
  {
    id:'m01q3',
    type:'multi',
    question:'Which of these are reasons your *data* directly affects the quality of any AI output you ship? (Select all that apply.)',
    options:[
      'The model uses the data you give it as part of its context — bad data in, bad output out',
      'Most enterprise models retrain on your data each time you prompt them',
      'Garbage in your CRM means the agent\'s pre-call brief will reflect that garbage',
      'The model has perfect memory of every customer regardless of what you provide'
    ],
    correctIndices:[0, 2],
    explanation:"Data is the lever most people skip. The model only knows what you put in its context — it doesn't have a magic memory of your customers, and most enterprise tools (Claude, Gong AI) explicitly don't retrain on your data. Output quality is bottlenecked by the data you feed in."
  },
  {
    id:'m01q4',
    type:'free',
    question:'Pick a real task from your week. In ~150 words, label which parts of the task map to *data*, *prompt*, *model*, and *output*. Then identify one place where AI could help, and one place where it shouldn\'t.',
    rubric:[
      'Names a specific real task (not "writing emails" — name the email)',
      'Correctly identifies at least 3 of the 4 components (data, prompt, model, output)',
      'Identifies a clear AI-help opportunity with reasoning',
      'Identifies a clear AI-don\'t-help boundary with reasoning'
    ],
    sample:'Task: writing the renewal proposal for ACME ($210k, due Friday). Data: their usage report, last year\'s contract, the QBR notes from March. Prompt: "Draft a 3-section renewal proposal — value summary, expansion case, pricing. Use last year\'s contract as the structure. Match the tone of the March QBR." Model: Claude (long context, good at structured docs). Output: the 3-section draft. AI helps with structure and first-pass language. AI shouldn\'t set the price — that\'s a judgment call about the relationship and what I think they\'ll accept.'
  }
];

// ───────────── M02 — How did we get here? ─────────────
const KC_M02 = [
  {
    id:'m02q1',
    type:'mc',
    question:'Pre-2020 ML systems were mostly _____. Today\'s LLMs are _____.',
    options:[
      'Slow / fast',
      'Narrow (one task per model) / general (one model, many tasks)',
      'Open-source / closed-source',
      'Statistical / symbolic'
    ],
    correctIndex:1,
    explanation:'Generality is the core leap. A 2018 ML model did one thing: classify images, or transcribe audio, or rank search results. A modern LLM can summarize, draft, code, analyze, and translate from one weights file. That\'s the unlock.'
  },
  {
    id:'m02q2',
    type:'mc',
    question:'What technical breakthrough around 2017 set the stage for GPT-class models?',
    options:[
      'The transformer architecture (the "attention" paper)',
      'Cheaper GPUs',
      'The web getting bigger',
      'Reinforcement learning being invented'
    ],
    correctIndex:0,
    explanation:'The 2017 "Attention Is All You Need" paper introduced the transformer, which made it practical to train models on internet-scale text. Cheap GPUs and big web were *enablers*, but transformers were the trigger.'
  },
  {
    id:'m02q3',
    type:'mc',
    question:'A skeptical colleague says: "AI hype comes and goes. Remember the chatbot wave in 2017? Same thing." Strongest counter:',
    options:[
      '"This time it\'s different because the models are bigger."',
      '"Generality. 2017 chatbots solved one task each. Today\'s LLMs do hundreds of tasks zero-shot — without being retrained for each one."',
      '"Investment is much higher this cycle."',
      '"The interfaces are better now."'
    ],
    correctIndex:1,
    explanation:'"It\'s bigger" and "more investment" are weak — they\'re true of every hype cycle. Generality is the technical claim that holds up: one model, many tasks, with no per-task training.'
  },
  {
    id:'m02q4',
    type:'free',
    question:'Explain to a skeptical peer in ~100 words why this AI moment is different from past hype cycles. Use at least one concrete example. Acknowledge what *is* hype, too.',
    rubric:[
      'Names a specific past hype cycle (chatbots, IBM Watson, expert systems, .com, crypto)',
      'Identifies the technical inflection (transformers, scale, RLHF, generality)',
      'Provides a concrete example of what\'s now possible that wasn\'t 5 years ago',
      'Acknowledges parts of the hype that are overblown — calibrated, not zealot'
    ],
    sample:'Remember IBM Watson in 2014? Beat humans at Jeopardy, then flopped at hospitals. It was hand-tuned per task. Today\'s LLMs are different in one specific way: generality. The same Claude model that drafts your emails also debugs your SQL and summarizes a 30-min call — no retraining, no per-task wiring. Five years ago that took a team of ML engineers per use case. The hype that *is* overblown: "AI will replace your job in 6 months." It won\'t. But the floor of what one person can do has moved meaningfully, and that\'s real.'
  }
];

// ───────────── M03 — Where is this going? ─────────────
const KC_M03 = [
  {
    id:'m03q1',
    type:'mc',
    question:'Which of these is *least* likely to be true 24 months from now?',
    options:[
      'Most knowledge workers use AI as part of daily workflow',
      'Foundation model performance plateaus — no further capability gains',
      'Multi-agent systems are routine in enterprises',
      'Cost per token continues to drop'
    ],
    correctIndex:1,
    explanation:'Adoption rising, costs dropping, agents shipping — all observed trends. A capability plateau in 24 months would require an industry-wide reversal that no current evidence supports. (Doesn\'t mean it can\'t happen — just least likely of the four.)'
  },
  {
    id:'m03q2',
    type:'mc',
    question:'The most defensible 2-year skill premium for an individual is:',
    options:[
      'Faster typing',
      'Specializing in one tool (e.g. only Claude)',
      'Judgment — knowing when AI output is wrong, when not to use AI at all',
      'Memorizing more prompts'
    ],
    correctIndex:2,
    explanation:'Tool-specific skill ages fast. Prompts get commoditized. Typing was never the bottleneck. Judgment — pattern-matching what good output looks like, and the discipline to verify — compounds.'
  },
  {
    id:'m03q3',
    type:'multi',
    question:'Which of these are red-flag signals that an AI claim is hype, not signal? (Select all that apply.)',
    options:[
      'Demo only works on cherry-picked inputs',
      'Vendor refuses to show production usage data',
      'The tool requires ongoing human review of its outputs',
      'Claim is "we\'ll replace 90% of your team in 3 months"'
    ],
    correctIndices:[0, 1, 3],
    explanation:'A, B, and D are classic hype tells. C is the *opposite* — human-in-the-loop is a sign of mature deployment, not a weakness. Real production AI almost always has a verification layer.'
  },
  {
    id:'m03q4',
    type:'free',
    question:'Name one workflow you do today you expect to *not* exist in 2 years, and one that absolutely will. Defend both. ~150 words.',
    rubric:[
      'Names a specific, concrete current workflow (not abstract)',
      'Provides reasoning for why it disappears (cost, generality, automation pressure)',
      'Names a workflow that persists with reasoning rooted in human judgment, accountability, or relationship',
      'Acknowledges uncertainty appropriately — no overconfidence either way'
    ],
    sample:'Disappears: writing the first draft of a discovery-call recap. Today I spend 20 min after every call recapping in SF. In 2 years, an agent listens to the Gong call, drafts the summary against my voice, files it in SF, and surfaces the 3 things that need my attention. That workflow loses to cost — no human time will be cheap enough to justify it. Persists: the actual conversation about price with my CFO sponsor. The judgment call about whether to walk away. Even with perfect AI, the customer wants to feel the weight of a human decision behind the number. I\'d also flag I\'m wrong if AI gets dramatically better at relational judgment — possible, not likely on a 2-yr horizon.'
  }
];

// ───────────── M04 — Prompting best practices ─────────────
// (extends the existing M04_KC with an applied compounding-patterns question)
const KC_M04 = [
  {
    id:'m04q1',
    type:'mc',
    question:'A teammate writes: "Help me prepare for my call with Acme tomorrow." The output is generic. Which part of the four-part frame is *most* missing?',
    options:[
      'Role — the model doesn\'t know it\'s a senior AE',
      'Context — Acme details, prior calls, what to avoid',
      'Format — no constraint on length or structure',
      'Task — "prepare" is too broad'
    ],
    correctIndex:1,
    explanation:"Both Task and Context are weak, but Context is the bigger lever. The model has no way to know what makes Acme *Acme* without you saying so. Most reps think they have a prompting problem when they actually have a context problem."
  },
  {
    id:'m04q2',
    type:'multi',
    question:'Which of these are the three compounding patterns that make any prompt better? (Select all that apply.)',
    options:[
      'Show, don\'t tell — paste examples of "good" before asking for output',
      'Iterate, don\'t restart — tell the model what to keep and change',
      'Always make prompts as long as possible',
      'Ask the model to plan first, then execute'
    ],
    correctIndices:[0, 1, 3],
    explanation:'Show / Iterate / Plan-first — three moves that compound. "Make prompts longer" is the trap; longer prompts often add noise. Better is *more specific*, not *longer*.'
  },
  {
    id:'m04q3',
    type:'mc',
    question:'You ask Claude for a 3-step launch plan. Step 1 is wrong. Highest-leverage next move:',
    options:[
      'Re-prompt from scratch with more detail',
      "Tell Claude what's wrong with step 1, ask it to fix it, keep steps 2–3",
      'Try a different model',
      'Accept it and edit by hand'
    ],
    correctIndex:1,
    explanation:'Iterate, don\'t restart. Tell the model what to keep and what to change. Restarting throws away the 70% that was right and burns time, tokens, and your patience.'
  },
  {
    id:'m04q4',
    type:'free',
    question:'Rewrite this prompt using the four-part frame: "Write me an email to the prospect."',
    rubric:[
      'Names a role (e.g. AE, RA, CSM)',
      'Names a specific task (length, ask, intent)',
      'Provides at least two pieces of real context (industry, past convo, objection)',
      'Specifies format constraints (length, structure, tone)'
    ],
    sample:'You are an enterprise AE following up after a discovery call. Write a 5-sentence email to the Director of RevOps at a mid-market SaaS company. They asked about Gong\'s forecast accuracy on small deal sizes (<$25k). Reference our discussion of their pipeline drift problem. Tone: confident, specific, no filler. End with a question that invites a 15-minute follow-up.',
    explanation:'Strong rewrites name the role, get specific about the ask, surface the context only you have, and shape the output. Yours doesn\'t need to match the sample — it just needs all four parts.'
  }
];

// ───────────── M05 — Avoiding hallucinations ─────────────
const KC_M05 = [
  {
    id:'m05q1',
    type:'mc',
    question:'A "hallucination" in AI output is best defined as:',
    options:[
      'An output that\'s grammatically wrong',
      'An output the model presents as fact, but is fabricated or unsupported',
      'A model that runs slowly',
      'A model that refuses to answer'
    ],
    correctIndex:1,
    explanation:'Hallucination = confidently wrong. The output reads true and authoritative; it isn\'t. Fluency is not the same as accuracy. This is the single biggest failure mode of LLMs.'
  },
  {
    id:'m05q2',
    type:'mc',
    question:'You ask Claude for a customer\'s recent earnings figures. It gives you specific numbers with confident sources. Your move:',
    options:[
      'Trust it — Claude shows sources',
      'Verify every number against the actual earnings doc before using',
      'Use the numbers but flag them as "AI-generated"',
      'Re-ask the same question to a different model'
    ],
    correctIndex:1,
    explanation:'Confident sources are exactly what hallucinations look like. Numbers are the highest-risk category — verify them at the source (the actual 10-K, earnings release, or transcript) before they go anywhere a customer or your manager will see.'
  },
  {
    id:'m05q3',
    type:'multi',
    question:'Which conditions make hallucinations *more* likely? (Select all that apply.)',
    options:[
      'You ask about something rare or specific',
      'The model is set to high temperature (more creative)',
      'You ask the model for specific numbers, dates, or quoted text',
      'You ask the model to summarize a document you provide'
    ],
    correctIndices:[0, 1, 2],
    explanation:'Rare topics = sparse training data = more guessing. High temperature = more creative output, including more invention. Specific numbers/dates/quotes = high-risk because the model interpolates plausible-looking values. Summarizing a doc *you* provide grounds the model in real source material — that\'s the *opposite* condition: hallucination is reduced.'
  },
  {
    id:'m05q4',
    type:'free',
    question:'Read this AI-generated paragraph carefully:\n\n"Snowflake\'s Q3 2024 earnings showed revenue of $943M, up 32% YoY, with CFO Mike Scarpelli highlighting 127% net revenue retention. Their Cortex AI product line grew 240% to $89M ARR, citing enterprise demand from the financial services vertical."\n\nIdentify which specific claims are highest-risk for hallucination, and explain how you\'d verify each in under 90 seconds.',
    rubric:[
      'Identifies at least one specific claim that is high-risk (a number, name, or quote)',
      'Names a verification source (10-K, earnings release, IR page, transcript)',
      'Quantifies a verification approach with rough time (e.g. "30s on Yahoo Finance")',
      'Distinguishes high-stakes claims (numbers in customer email) from low-stakes (background context)'
    ],
    sample:'High-risk: the specific revenue ($943M), the growth rate (32%), the NRR (127%), and especially the Cortex breakout ($89M ARR, 240%). Numbers are the easiest thing for a model to fabricate plausibly. Verify revenue + NRR in 20s on the Snowflake IR page or their last 10-Q. The Cortex breakout is the riskiest — Snowflake doesn\'t always disclose product-level ARR; if I can\'t find it in the earnings release, I cut it. CFO name is verifiable in 5s on LinkedIn. If this email goes to my CFO sponsor, the bar is "every number traceable to a primary source." If it\'s a internal brain-dump, looser is fine.'
  }
];

// ───────────── M06 — Right tool for the job ─────────────
const KC_M06 = [
  {
    id:'m06q1',
    type:'mc',
    question:'Which of the following is the most accurate framing of the differences between major frontier AI models in 2026?',
    options:[
      'The differences are massive; choosing the wrong tool will dramatically hurt your output',
      'The models are all essentially identical; tool choice doesn\'t matter',
      'The differences are real but generally smaller than the public discourse suggests; for most tasks, frontier models produce comparable output',
      'Only Anthropic\'s Claude is good for serious work'
    ],
    correctIndex:2,
    explanation:'This is the honest framing. Real differences exist on specific axes, but for the bulk of L2 use cases, any frontier model will produce comparable output. People who paralyze themselves picking "the best" tool are usually optimizing for the wrong thing.'
  },
  {
    id:'m06q2',
    type:'mc',
    question:'Which of these is generally considered a strength of Claude?',
    options:[
      'Native image generation',
      'Deep integration with Google Workspace',
      'Long-form writing, careful reasoning, and a tendency to flag its own uncertainty',
      'The largest ecosystem of third-party plugins'
    ],
    correctIndex:2,
    explanation:'Each model has tendencies. Native image generation is generally a GPT strength (DALL·E integration). Google Workspace integration is Gemini\'s. Long-form writing and uncertainty-flagging is Claude\'s. The largest plugin ecosystem is generally GPT\'s. None of these are absolute, but they\'re the patterns most users notice.'
  },
  {
    id:'m06q3',
    type:'mc',
    question:'When should you reach for Gong AI rather than a general-purpose model like Claude or GPT?',
    options:[
      'Never; general-purpose models are always better',
      'For tasks specifically about revenue conversation analysis, deal intelligence, and call coaching, where Gong AI has structural advantages',
      'Only for very simple tasks',
      'Whenever you want to feel loyal to your employer'
    ],
    correctIndex:1,
    explanation:'Gong AI is purpose-built for revenue conversation analysis. It has access to your call data and deal data, and it\'s designed for the specific patterns of B2B revenue work. For tasks in that domain, it has structural advantages over general models. The principle generalizes: specialized tools usually beat general models on the tasks they were specialized for.'
  },
  {
    id:'m06q4',
    type:'mc',
    question:'The decision framework from this module recommends:',
    options:[
      'Always use the most expensive model',
      'Always use whichever model is newest',
      '(1) Use a specialized tool if one exists and fits. (2) Use the tool with the specific capability you need if the task requires it. (3) Otherwise, use whatever you have open',
      'Switch tools mid-task to compare outputs every time'
    ],
    correctIndex:2,
    explanation:'This three-step framework keeps you from over-thinking tool choice while also catching the cases where it matters. Most tasks fall into Step 3 (use whatever\'s open), and that\'s fine.'
  },
  {
    id:'m06q5',
    type:'mc',
    question:'"Don\'t switch tools mid-task to compare" is a recommendation because:',
    options:[
      'The tools don\'t allow it',
      'It\'s a productivity trap; you\'ll spend more time comparing outputs than improving them',
      'Switching tools is technically difficult',
      'It violates company policy'
    ],
    correctIndex:1,
    explanation:'Pick a tool, do the work, evaluate the result, decide if a different tool is needed for next time. Constant comparison during a task burns time without proportionally improving output.'
  },
  {
    id:'m06q6',
    type:'mc',
    question:'The biggest variable in the quality of your AI output is:',
    options:[
      'Which model you use',
      'How much you spend on AI tools',
      'You: your skill in writing prompts, evaluating output, and iterating',
      'The time of day you use AI'
    ],
    correctIndex:2,
    explanation:'This is the quiet truth that most "best AI tool" content avoids saying. The skills covered across AI 101 transfer across tools. Someone using GPT well will outperform someone using Claude poorly, and vice versa. Build the skill, then worry about the tool.'
  },
  {
    id:'m06q7',
    type:'mc',
    question:'Which of these is *not* a category of specialized AI tools mentioned in this module?',
    options:[
      'Code-focused tools (GitHub Copilot, Cursor, Claude Code)',
      'Image generation tools (Midjourney, DALL·E)',
      'Meeting and transcription tools (Otter, Fireflies, Gong)',
      'Frontier general-purpose models (Claude, GPT, Gemini)'
    ],
    correctIndex:3,
    explanation:'Frontier general-purpose models are the *default* tools, not specialized ones. The specialized categories are code-focused, image generation, and meeting/transcription tools, plus search/research tools and domain-specific tools.'
  },
  {
    id:'m06q8',
    type:'mc',
    question:'Which of these patterns should you actively avoid?',
    options:[
      'Building comfort with one or two tools you trust and using them consistently',
      'Picking tools by hype and chasing every new release',
      'Asking, before reaching for AI, whether a specialized tool exists for the task',
      'Trusting your own evaluation against your own work'
    ],
    correctIndex:1,
    explanation:'Hype-chasing is a productivity drain. The discourse moves faster than capability moves in real life. Stable, reliable use of one tool typically produces more value than constantly chasing the latest model. The other options are all good practices.'
  },
  {
    id:'m06q9',
    type:'mc',
    question:'Why does this module describe itself as "the most likely to go stale fastest" in the course?',
    options:[
      'Because the underlying frameworks are weak',
      'Because the AI tool landscape is changing quickly, so specific tool capabilities and rankings will shift; the frameworks for choosing will outlast any specific product detail',
      'Because Anthropic plans to discontinue Claude',
      'Because tool choice will become unimportant'
    ],
    correctIndex:1,
    explanation:'Specific model capabilities and product features will change. The framework for choosing between tools (specialized first, capability-required second, default otherwise) is more durable. Hold the specifics loosely.'
  },
  {
    id:'m06q10',
    type:'mc',
    question:'The right mental frame for an L2 user thinking about AI tool choice is:',
    options:[
      'Spend significant time researching the optimal tool for every task',
      'Always use the same single tool no matter what',
      'Pick a primary tool you trust, know when to reach for a specialized one, and otherwise focus on getting better at the underlying craft',
      'Avoid AI tools until the market settles'
    ],
    correctIndex:2,
    explanation:'This is the L2 move. The skills (prompting, verification, iteration, judgment) transfer across tools. The tool choice matters in specific cases, but most of the time the right answer is "the one I\'m comfortable with."'
  }
];

// ───────────── M07 — Owning AI outputs ─────────────
const KC_M07 = [
  {
    id:'m07q1',
    type:'mc',
    question:'Which of the following is the most accurate statement of the accountability principle?',
    options:[
      'AI shares responsibility with the user for any output it produces',
      'When something goes wrong, you can blame the AI as long as you disclose its involvement',
      'AI is a draft, never a decision. You own the work that AI helped you produce, fully and without exception',
      'AI accountability is a legal question with no clear answer'
    ],
    correctIndex:2,
    explanation:'This is the principle the rest of the module builds on. The AI doesn\'t share accountability with you, because the AI doesn\'t have a name, a job, or a stake in the outcome. The work is yours when you ship it.'
  },
  {
    id:'m07q2',
    type:'mc',
    question:'Which of these is the *opposite* of the L2 stance?',
    options:[
      'Treating AI output as a starting point that needs your judgment layered on top',
      'Saying "sorry, the AI drafted that" when something AI-assisted goes wrong',
      'Running a verification check before shipping AI-assisted work',
      'Editing AI output until it sounds like your own voice'
    ],
    correctIndex:1,
    explanation:'This pattern is exactly what the L2 user avoids. Whether said as a joke, a deflection, or an honest explanation, the framing is wrong. The AI didn\'t send the email; the person did. The other options are all part of the L2 practice.'
  },
  {
    id:'m07q3',
    type:'mc',
    question:'Why does the accountability problem get *harder* as AI gets more capable, not easier?',
    options:[
      'Because more capable AI is more dangerous',
      'Because polished AI output looks finished, which makes it tempting to ship with less of your own thinking layered on top',
      'Because the legal frameworks haven\'t caught up',
      'It doesn\'t get harder; it gets easier'
    ],
    correctIndex:1,
    explanation:'This is the trap. As AI improves, the temptation grows to ship its output as-is, because it feels finished. The L2 user inverts the instinct: better AI requires more deliberate ownership, not less.'
  },
  {
    id:'m07q4',
    type:'mc',
    question:'The pre-publish ritual from this module includes asking:',
    options:[
      '"Has the AI signed off on this?"',
      '"Did I add my own thinking? Have I verified load-bearing claims? Does the tone match? Am I shipping anything I wouldn\'t say in my own voice? Would I be comfortable having this attributed to me with AI assistance invisible?"',
      '"How long did the AI take to produce this?"',
      '"What model produced this output?"'
    ],
    correctIndex:1,
    explanation:'These five questions take a few minutes for most pieces of work. After a few weeks of deliberate practice, they collapse into a single quick instinct: *would I defend this as mine?*'
  },
  {
    id:'m07q5',
    type:'mc',
    question:'Which of these is *not* recommended in the pre-publish ritual?',
    options:[
      'Verifying load-bearing claims like numbers, dates, citations, and quotes',
      'Editing AI output until the voice sounds like yours',
      'Sending AI-assisted work without changes, because the AI\'s first draft is usually fine',
      'Checking that the tone matches the relationship and the audience'
    ],
    correctIndex:2,
    explanation:'Sending AI output unedited is the L1 trap. The polish makes it feel finished, but polish isn\'t the same as yours. The other options are all part of the ritual.'
  },
  {
    id:'m07q6',
    type:'mc',
    question:'Why does data handling matter when using AI tools?',
    options:[
      'It doesn\'t really; AI tools are all secure',
      'Because pasting things into a prompt is, in many cases, equivalent to putting that information into a third-party system, and different tools have different policies about what happens to that data',
      'Only because of GDPR',
      'Because AI tools are slow with large amounts of data'
    ],
    correctIndex:1,
    explanation:'Treating data input casually is one of the highest-risk L1 mistakes. Tools approved for enterprise use with specific data protections behave differently from consumer-facing tools. The L2 reflex is to know which is which before pasting.'
  },
  {
    id:'m07q7',
    type:'mc',
    question:'Which categories of information warrant extra care when deciding what to put into an AI tool?',
    options:[
      'Customer-identifying information, confidential internal information, legal or compliance-sensitive content, contractually-restricted data, and personal data covered by privacy regulations',
      'Only customer credit card numbers',
      'Only information explicitly marked "confidential"',
      'Nothing; treat all data the same'
    ],
    correctIndex:0,
    explanation:'All five categories warrant extra caution. The line isn\'t always obvious; many things that aren\'t formally marked confidential clearly are. When in doubt, a two-minute check with security or legal beats a much bigger conversation later.'
  },
  {
    id:'m07q8',
    type:'mc',
    question:'The right mental frame for AI tools approved by Gong (vs. personal AI accounts on consumer tools) is:',
    options:[
      'They\'re identical; treat them the same',
      'Gong-approved tools have been configured with policies that make them safer for sensitive data; personal accounts on consumer tools should be treated more cautiously, like anything you might post on a public forum',
      'Personal accounts are always safer than enterprise tools',
      'Both are unsafe; avoid AI for any sensitive work'
    ],
    correctIndex:1,
    explanation:'The Gong-approved tools have been thought through. Personal consumer accounts have different defaults. The L2 reflex is to know the difference and act accordingly.'
  },
  {
    id:'m07q9',
    type:'mc',
    question:'The principle that holds across all disclosure decisions is:',
    options:[
      'Always disclose every AI use, no matter how routine',
      'Never disclose AI use; the work is yours regardless',
      'Honesty: never imply that work is more "yours" than it is in a way that misleads someone making a decision based on that. Beyond that, the specific norms are judgment calls',
      'Only disclose if asked'
    ],
    correctIndex:2,
    explanation:'The clear cases on either end are easy. Academic work probably warrants disclosure. Routine spell-check-equivalent uses don\'t. The middle ground is judgment, anchored to honesty: don\'t mislead someone about how the work was produced if it would change their understanding of it.'
  },
  {
    id:'m07q10',
    type:'mc',
    question:'The most lasting outcome from completing AI 101 should be:',
    options:[
      'A list of facts you can recall on a quiz',
      'A set of practices you actually use, including a personal AI policy that captures how you\'ll use AI going forward',
      'Comfort using one specific AI tool',
      'A general feeling of optimism about AI'
    ],
    correctIndex:1,
    explanation:'Facts go stale. Practices compound. The course is designed to give you working habits that transfer across tools and across the technology\'s continued evolution. The personal AI policy is the document that makes those habits explicit.'
  }
];

// Module metadata for the check screen header
const KC_META = {
  M01: { num:'01', title:'What is AI?',              kicker:'Foundation' },
  M02: { num:'02', title:'How did we get here?',     kicker:'Foundation' },
  M03: { num:'03', title:'Where is this going?',     kicker:'Foundation' },
  M04: { num:'04', title:'Prompting best practices', kicker:'Craft' },
  M05: { num:'05', title:'Avoiding hallucinations',  kicker:'Craft' },
  M06: { num:'06', title:'Right tool for the job',   kicker:'Craft' },
  M07: { num:'07', title:'Owning AI outputs',        kicker:'Judgment' },
};

const KC_BY_MODULE = {
  M01: KC_M01, M02: KC_M02, M03: KC_M03, M04: KC_M04,
  M05: KC_M05, M06: KC_M06, M07: KC_M07
};

window.BrKC = { KC_BY_MODULE, KC_META };
