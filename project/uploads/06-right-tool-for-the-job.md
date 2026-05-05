# M06 · Right Tool for the Job

**AI 101 · Module 6 of 7**
**Estimated time: 30 minutes content + 10 to 15 minute knowledge check + applied activity**
**Level transition: This module builds the judgment of choosing between AI tools, which is the early Delegation muscle from the 4Ds framework.**

---

## Module brief

Up to this point, AI 101 has mostly treated "AI" as a single thing. In practice you'll have access to several different AI tools, and learning to pick the right one for a given task is part of the L2 transition.

Here's the good news up front: at the L1/L2 level, the differences between major AI tools matter less than the public discourse suggests. The frontier models from Anthropic (Claude), OpenAI (GPT), and Google (Gemini) are all very capable at most knowledge work tasks, and most days, the tool you happen to have open is going to be perfectly adequate for what you're doing. People who paralyze themselves trying to pick the "best" AI tool for every task are usually optimizing for the wrong thing.

That said, the differences are real. Each tool has genuine strengths, distinct quirks, and specific contexts where it's a notably better or worse choice. Knowing the broad shape of those differences, plus when to reach for a specialized tool like Gong AI, will save you time and produce better work than blindly defaulting to whichever tool you used last.

In the 4Ds framework, this module is your first real exposure to **Delegation**: deciding what work to do with AI, and specifically *which* AI. Delegation goes deeper in 201+ when we get into role-specific workflows, but the foundation starts here.

This module is also the most likely to go stale fastest in the course, because the AI tool landscape is changing quickly. Treat the specific tool descriptions as a snapshot, not a permanent reference. The frameworks for choosing will outlast any specific product detail.

## Learning objectives

By the end of this module you should be able to:

1. Describe the broad strengths and characteristic styles of the major frontier models (Claude, GPT, Gemini) without overclaiming.
2. Recognize when to reach for a specialized tool (like Gong AI) instead of a general-purpose model.
3. Apply a simple decision framework for choosing between tools without getting paralyzed.
4. Hold the right mental model: the choice matters less than the principle-based skills you bring to whichever tool you use.

---

## Lesson 1: The frontier model landscape

There are currently three companies producing what are usually called "frontier" models: AI systems at the leading edge of capability that get used as general-purpose assistants. They are:

**Claude** (made by Anthropic). The model family this course's source material comes from. Available via Claude.ai, the Claude apps, and integrated into various tools including Brainstorm.

**GPT** (made by OpenAI). The most consumer-recognizable family because of ChatGPT, which made AI broadly visible to the public in late 2022.

**Gemini** (made by Google). Integrated deeply into Google's ecosystem, including Workspace tools.

All three are very capable. All three are continuously improving. All three can do most knowledge work tasks at a quality level that's genuinely useful. The differences below are the ones that matter at the L2 level, but they should be held loosely. The companies leapfrog each other on specific benchmarks, and what's true today may shift in six months.

### Where Claude tends to be strong

Claude is generally considered strong at long-form writing, careful reasoning, and coding. It has a reputation for being more verbose by default and more inclined to ask clarifying questions or note its uncertainty. Anthropic places particular emphasis on safety and honesty in its training, which translates into a model that's somewhat more inclined to push back, hedge appropriately, and decline tasks it sees as risky. Some users prefer this; some find it too conservative. Both reactions are reasonable.

If you're doing extended writing, working through complex reasoning, or want a model that errs toward flagging its own uncertainty, Claude tends to be a strong default.

### Where GPT tends to be strong

GPT (especially via ChatGPT) has a large ecosystem around it: plugins, custom GPTs, image generation, web search, voice, and a wide third-party integration footprint. The product surface is broad, and OpenAI has often led on multimodal capabilities (image, audio, video). GPT models tend to be more direct and brief by default, and the default ChatGPT product is widely used as a general-purpose assistant.

If you want web-connected search alongside conversation, image generation, or any of the broader tooling around the GPT family, that's where it has real advantages.

### Where Gemini tends to be strong

Gemini's clearest advantage is integration with Google's ecosystem. If you're already in Google Workspace (Docs, Sheets, Gmail, Drive), Gemini can work with your content directly without copy-paste. It also has Google Search baked in natively, which makes it well-suited for tasks that benefit from current information.

If your workflow centers on Google products, Gemini removes friction that the other tools have to work around.

### What this means in practice

Here's the honest summary: most of the time, you'll be fine with whichever tool you have access to. The cases where the tool choice meaningfully changes the outcome are narrower than people think. Specific writing styles, specific code performance on hard problems, specific integration needs: those matter. For "summarize this," "draft an email," "explain this concept," "rewrite this," any frontier model will produce comparable output.

The L2 move is to develop a working sense of when the differences matter and when they don't, which mostly comes from trying the same task across two tools occasionally and noticing where the output is meaningfully different.

> **Try this (3 minutes).** Take one of the prompts you've worked with so far in this course (from M04 ideally) and run it on two different AI tools you have access to. If you only have access to one, pick a different recent task. Compare the outputs side by side. What's different about the style, the structure, the tone? What's similar? Notice your own reactions. Sometimes the "better" output is a matter of preference, not capability.

---

## Lesson 2: Specialized tools and when they beat general ones

Frontier models are general-purpose. They're trained on broad text and can handle a wide range of tasks. But for some tasks, a specialized tool that's purpose-built for that domain will outperform a general model.

The clearest example for your work is **Gong AI**, which is purpose-built for revenue conversation analysis. Gong AI is trained on call data, deal data, and the specific patterns of B2B sales and customer success conversations. For tasks like:

- Summarizing a customer call accurately
- Identifying coaching moments from a rep's calls
- Surfacing risk signals across deals
- Tracking topic patterns across customer conversations

Gong AI has structural advantages over a general model. It has access to data the general model doesn't have. It's designed for the workflow you're already in. It connects directly to your CRM and call recordings. For these tasks, reaching for a general model means giving up real value.

The principle generalizes: any time a tool is purpose-built for the specific task you're doing, and you have access to it, that's usually the right tool. General models are great defaults, but specialization wins on the tasks it was specialized for.

### Other specialized tools worth knowing

The landscape of specialized AI tools is broad and growing. Some categories worth being aware of:

**Code-focused tools** (GitHub Copilot, Cursor, Claude Code). Built specifically for software development, with deep integrations into the code editing environment.

**Image generation tools** (Midjourney, DALL·E, Stable Diffusion). Built for visual content, not text.

**Meeting and transcription tools** (Otter, Fireflies, Gong). Built for capturing and analyzing spoken conversations.

**Search and research tools** (Perplexity). Built around AI-augmented web search, blending generation with sourcing.

**Domain-specific tools** (legal AI, medical AI, financial AI). Built for the specific data, terminology, and risk profiles of their domain.

You don't need to know all of these. The point is to know that specialization exists and to ask, when reaching for AI: *is there a tool built specifically for what I'm trying to do, and do I have access to it?*

---

## Lesson 3: A simple decision framework

Here's a working framework for choosing between tools that doesn't require you to memorize every model's strengths.

### Step 1: Is there a specialized tool built for this exact task that I have access to?

If yes, use it. Gong AI for revenue conversation analysis. A code-focused tool for serious programming work. A purpose-built tool will almost always outperform a general model on the task it was purpose-built for.

### Step 2: Does the task require capabilities only one tool has?

A few examples that matter at the L2 level:
- Working directly with a Google Doc without copy-paste? Gemini has the integration advantage.
- Generating an image as part of the task? GPT (via ChatGPT) has DALL·E integration.
- Need a model with strong default verbosity for long-form analysis? Claude has a reputation for that.
- Need access to current web information? Whichever tool has search enabled in your workflow.

If the task requires a specific capability, that decides it.

### Step 3: Otherwise, use whatever you have open.

Most of the time, this is the answer. Frontier models are close enough on most tasks that the friction cost of switching tools usually outweighs the marginal output difference. The L2 user does not optimize tool choice for every interaction. They build comfort with one or two tools they trust and use them consistently.

### What not to do

A few patterns to actively avoid.

**Don't switch tools mid-task to "see if the other one is better."** This is a productivity trap. You'll spend more time comparing outputs than improving them. Pick a tool, do the work, evaluate the result, decide if a different tool is needed.

**Don't assume newer means better.** Every few months, one company releases a model that beats the others on a specific benchmark, and there's a wave of "X is now the best AI." For the kind of work you're doing, the practical difference is often small. Stable, reliable use of one tool tends to produce more value than chasing the latest release.

**Don't pick tools by hype.** The discourse moves on capability before capability moves in real life. Trust your own evaluation against your own work.

> **Try this (2 minutes).** Pick three real tasks you've used AI for in the past month. For each one, ask: would a specialized tool have been better? Would a different general model have been better? Or was whatever I used fine? Most honest answers will be "fine." That's a useful calibration point.

---

## Lesson 4: The thing that matters more than tool choice

Here's the quiet truth that most "best AI tool" content avoids saying. The biggest variable in the quality of your AI output isn't the tool. It's you.

Every module in this course so far has been about skills that work across tools. Knowing what AI is and isn't (M01). Having historical context (M02). Staying oriented to the trajectory (M03). Writing clear prompts (M04). Verifying output (M05). None of those skills are tool-specific. They transfer.

The implication is liberating: you don't have to be optimizing tool choice. You have to be building skill. Someone using GPT well will outperform someone using Claude poorly, and vice versa. The skill is the thing.

This is also why principle-based learning matters more than tool-based learning. Tools change. Skills compound. The L2 user has a working sense of the tool landscape, knows when to reach for a specialized tool, and otherwise focuses on getting better at the underlying craft regardless of which interface they're typing into.

This is the right mental frame to carry into the rest of your work. Pick a primary tool you trust. Know when to reach for a specialized one. Stop optimizing the tool choice. Start optimizing the skill.

---

## Key takeaways

- The three frontier models, **Claude (Anthropic)**, **GPT (OpenAI)**, and **Gemini (Google)**, are all very capable at most knowledge work tasks. The differences are real but smaller than the public discourse suggests.
- General tendencies: Claude tends to favor long-form writing, careful reasoning, and uncertainty-flagging. GPT has a broad ecosystem with strong multimodal and web tooling. Gemini integrates deeply with Google Workspace. Hold these as tendencies, not absolutes.
- **Specialized tools** like Gong AI outperform general models on the tasks they're purpose-built for. Always ask whether a specialized tool exists for what you're doing.
- The decision framework: (1) Use a specialized tool if one exists and fits. (2) Use the tool with the specific capability you need if the task requires it. (3) Otherwise, use whatever you have open.
- Avoid common traps: don't switch tools mid-task to compare, don't assume newer means better, don't pick tools by hype.
- The biggest variable in output quality is **you**, not the tool. Skills transfer across tools; tools change. Focus on building skill, not on optimizing tool selection for every interaction.

---

## Knowledge Check

10 questions. Aim to answer in 10 to 15 minutes. Each question has one best answer; explanations follow each.

**1. Which of the following is the most accurate framing of the differences between major frontier AI models in 2026?**
A) The differences are massive; choosing the wrong tool will dramatically hurt your output
B) The models are all essentially identical; tool choice doesn't matter
C) The differences are real but generally smaller than the public discourse suggests; for most tasks, frontier models produce comparable output
D) Only Anthropic's Claude is good for serious work

> **Correct: C.** This is the honest framing. Real differences exist on specific axes, but for the bulk of L2 use cases, any frontier model will produce comparable output. People who paralyze themselves picking "the best" tool are usually optimizing for the wrong thing.

**2. Which of these is generally considered a strength of Claude?**
A) Native image generation
B) Deep integration with Google Workspace
C) Long-form writing, careful reasoning, and a tendency to flag its own uncertainty
D) The largest ecosystem of third-party plugins

> **Correct: C.** Each model has tendencies. A is generally a GPT strength (DALL·E integration). B is Gemini's. C is Claude's. D is generally GPT's. None of these are absolute, but they're the patterns most users notice.

**3. When should you reach for Gong AI rather than a general-purpose model like Claude or GPT?**
A) Never; general-purpose models are always better
B) For tasks specifically about revenue conversation analysis, deal intelligence, and call coaching, where Gong AI has structural advantages
C) Only for very simple tasks
D) Whenever you want to feel loyal to your employer

> **Correct: B.** Gong AI is purpose-built for revenue conversation analysis. It has access to your call data and deal data, and it's designed for the specific patterns of B2B revenue work. For tasks in that domain, it has structural advantages over general models. The principle generalizes: specialized tools usually beat general models on the tasks they were specialized for.

**4. The decision framework from this module recommends:**
A) Always use the most expensive model
B) Always use whichever model is newest
C) (1) Use a specialized tool if one exists and fits. (2) Use the tool with the specific capability you need if the task requires it. (3) Otherwise, use whatever you have open
D) Switch tools mid-task to compare outputs every time

> **Correct: C.** This three-step framework keeps you from over-thinking tool choice while also catching the cases where it matters. Most tasks fall into Step 3 (use whatever's open), and that's fine.

**5. "Don't switch tools mid-task to compare" is a recommendation because:**
A) The tools don't allow it
B) It's a productivity trap; you'll spend more time comparing outputs than improving them
C) Switching tools is technically difficult
D) It violates company policy

> **Correct: B.** Pick a tool, do the work, evaluate the result, decide if a different tool is needed for next time. Constant comparison during a task burns time without proportionally improving output.

**6. The biggest variable in the quality of your AI output is:**
A) Which model you use
B) How much you spend on AI tools
C) You: your skill in writing prompts, evaluating output, and iterating
D) The time of day you use AI

> **Correct: C.** This is the quiet truth that most "best AI tool" content avoids saying. The skills covered across AI 101 transfer across tools. Someone using GPT well will outperform someone using Claude poorly, and vice versa. Build the skill, then worry about the tool.

**7. Which of these is *not* a category of specialized AI tools mentioned in this module?**
A) Code-focused tools (GitHub Copilot, Cursor, Claude Code)
B) Image generation tools (Midjourney, DALL·E)
C) Meeting and transcription tools (Otter, Fireflies, Gong)
D) Frontier general-purpose models (Claude, GPT, Gemini)

> **Correct: D.** Frontier general-purpose models are the *default* tools, not specialized ones. The specialized categories are A, B, and C, plus search/research tools and domain-specific tools.

**8. Which of these patterns should you actively avoid?**
A) Building comfort with one or two tools you trust and using them consistently
B) Picking tools by hype and chasing every new release
C) Asking, before reaching for AI, whether a specialized tool exists for the task
D) Trusting your own evaluation against your own work

> **Correct: B.** Hype-chasing is a productivity drain. The discourse moves faster than capability moves in real life. Stable, reliable use of one tool typically produces more value than constantly chasing the latest model. A, C, and D are all good practices.

**9. Why does this module describe itself as "the most likely to go stale fastest" in the course?**
A) Because the underlying frameworks are weak
B) Because the AI tool landscape is changing quickly, so specific tool capabilities and rankings will shift; the frameworks for choosing will outlast any specific product detail
C) Because Anthropic plans to discontinue Claude
D) Because tool choice will become unimportant

> **Correct: B.** Specific model capabilities and product features will change. The framework for choosing between tools (specialized first, capability-required second, default otherwise) is more durable. Hold the specifics loosely.

**10. The right mental frame for an L2 user thinking about AI tool choice is:**
A) Spend significant time researching the optimal tool for every task
B) Always use the same single tool no matter what
C) Pick a primary tool you trust, know when to reach for a specialized one, and otherwise focus on getting better at the underlying craft
D) Avoid AI tools until the market settles

> **Correct: C.** This is the L2 move. The skills (prompting, verification, iteration, judgment) transfer across tools. The tool choice matters in specific cases, but most of the time the right answer is "the one I'm comfortable with."

---

## Applied Activity: "Side by Side"

**Estimated time: 30 to 40 minutes**
**Submission: a side-by-side comparison + a short reflection**
**Graded against the rubric below**

### What you'll do

Take one real task. Run it on two different AI tools. Document the differences honestly, decide which one you'd use for that task going forward, and explain why.

The point isn't to declare a "winner." It's to build real intuition about how tool choice affects output, so the next time you're choosing, you're drawing on actual experience rather than discourse.

### Step 1: Pick the task

Pick one task that's substantive enough that the output quality will actually matter. Not "say hello." Something like:
- Drafting a piece of analysis you'd actually use
- Summarizing a document where the summary needs to be accurate and useful
- Writing an explanation of something complex for a specific audience
- Generating ideas for a project where the quality of the ideas matters

Use the same prompt for both tools. Same context, same role, same task, same format constraints. Be disciplined about this; if you let yourself adjust the prompt between tools, you're testing different prompts, not different tools.

### Step 2: Run the task on two tools

Use any two AI tools you have access to. Possible pairings:
- Claude.ai vs. ChatGPT
- Claude.ai vs. Gemini
- ChatGPT vs. Gemini
- General model vs. Gong AI (if the task is conversation/deal-related)
- Any frontier model vs. a specialized tool relevant to your task

Run the prompt. Save both outputs.

### Step 3: Compare them

Read both outputs carefully. Then write a structured comparison. For each output, note:
- What's strong about it
- What's weak about it
- Notable stylistic differences (tone, length, structure)
- Anything either model added that the other didn't, or got wrong that the other got right

Be specific. "It was better" is not a comparison. "It was 30% shorter, dropped two of the four sections I wanted, but had a sharper opening" is a comparison.

### Step 4: Decide and explain

For *this specific task*, which tool would you use going forward? It's fine if the answer depends on context; just be specific about what context. Spend two or three sentences explaining your decision.

### Step 5: Reflect

Write a short reflection (about 100 words) on what surprised you. Were the differences bigger than you expected? Smaller? Did one tool fail in a way you didn't expect? Did your prior assumptions about either tool hold up?

### Submission

Submit a single document containing:
1. The task description (one or two sentences)
2. The exact prompt used (the same one on both tools)
3. Output from Tool A (with the tool named)
4. Output from Tool B (with the tool named)
5. The structured comparison
6. The decision and explanation
7. The 100-word reflection

### Rubric

You'll be graded on four dimensions, each on a 1 to 5 scale, for a composite out of 20.

| Dimension | 1: Minimal | 3: Solid | 5: Excellent |
|---|---|---|---|
| **Discipline of the comparison** | Different prompts used; no real apples-to-apples | Same prompt on both tools; comparison is fair | Same prompt, same conditions; comparison is rigorous and isolated to tool differences |
| **Specificity of observations** | "One was better than the other"; no concrete details | At least three specific differences identified, with examples | Detailed, specific observations on style, structure, accuracy, and tone, with concrete examples from the output |
| **Decision quality** | Decision is arbitrary or unsupported | Decision is tied to specific observations; reasoning is sound | Decision is precise about context (e.g., "for this task in these conditions, X is better"); reasoning shows real judgment |
| **Quality of reflection** | Generic; no surprise or insight identified | Identifies at least one specific surprise or shifted assumption | Reflection shows real updating; the learner has new, durable intuition about tool selection |

**Composite scoring:**
- 17 to 20: Mastery. The L2 tool-selection muscle is working; the learner can navigate the choice without paralysis.
- 13 to 16: Solid. Frame is right, with room to deepen on rigor or specificity.
- 9 to 12: Developing. The exercise was completed but the comparison wasn't disciplined enough to be informative. Try again with the same prompt.
- Below 9: Restart. Read through the module again and run the activity fresh.

---

## Sources and attribution

This module draws on the following Anthropic-published material and general industry knowledge:

- **Models overview** (Claude API documentation). Source for accurate framing of Claude's positioning and capabilities. https://platform.claude.com/docs/en/about-claude/models/overview
- **AI Fluency: Framework & Foundations** (Dakan, Feller & Anthropic, 2025). Source for the framing of Delegation as a core competency. Released under CC BY-NC-SA 4.0. https://anthropic.skilljar.com/ai-fluency-framework-foundations

General descriptions of OpenAI's GPT family and Google's Gemini are based on public information about these products as of the course's writing. Specific capabilities will continue to evolve; treat the descriptions as a snapshot rather than a permanent reference.

The 4D AI Fluency Framework (Delegation, Description, Discernment, Diligence) was developed by Prof. Rick Dakan (Ringling College of Art and Design) and Prof. Joseph Feller (University College Cork) in collaboration with Anthropic. Released under CC BY-NC-SA 4.0.

This module is part of the Gong Brainstorm program. Gong-specific framing (level transitions, learner journey, GTM context, Gong AI as the in-stack specialized tool) added by the program team.
