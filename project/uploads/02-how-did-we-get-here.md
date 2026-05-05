# M02 · How did we get here?

**AI 101 · Module 2 of 7**
**Estimated time: 30 minutes content + 10 to 15 minute knowledge check + applied activity**
**Level transition: Continuing the L1 → L2 progression, this module builds the historical context that grounds your judgment**

---

## Module brief

In M01 you got a working definition of what AI actually is and a basic picture of how a large language model produces output. That's the *what*. This module is the *how did we get here*.

It matters because AI has a long history of overpromising. People who don't know that history can swing between two bad takes. They either treat the current moment as completely unprecedented (in which case they overestimate what's possible right now), or they treat it as another hype cycle that will fade (in which case they underestimate the shift that's actually happening). Both reactions get in the way of using the technology well.

The honest read sits between those extremes. AI as a field has existed for over 70 years. It has gone through real breakthrough moments and real disappointments. What's happening now is built on that long arc, which is part of why it's not just hype, but it's also genuinely different from previous waves in specific, identifiable ways. By the end of this module, you'll be able to explain to a thoughtful skeptic why this moment matters and what changed to make it possible.

We'll keep this practical, not academic. You don't need the full history of computer science. You need just enough context to make sense of where we are and to recognize what's actually new versus what's been promised before.

## Learning objectives

By the end of this module you should be able to:

1. Sketch the broad arc of AI as a research field, including the previous "AI winters" that followed earlier hype cycles.
2. Explain the shift from rule-based AI to machine learning, and why that shift mattered.
3. Identify the transformer architecture (2017) as the technical breakthrough that made modern LLMs possible, and explain in plain language what changed.
4. Articulate, to a skeptical colleague, why this AI moment is different from previous hype cycles. Without overclaiming, and without dismissing.

---

## Lesson 1: The long arc

The term "artificial intelligence" was coined in 1956, at a now-famous summer workshop at Dartmouth College. The researchers there genuinely thought they could solve most of the problem within a generation. They were wrong, but their ambition set the agenda for the field for decades.

The first 30 or 40 years of AI were dominated by a particular approach: try to encode human knowledge as explicit rules, then write programs that could reason over those rules. This is called **symbolic AI** or **rule-based AI**, and it produced some impressive achievements (early chess programs, expert systems for medical diagnosis, etc.) but also hit a wall pretty quickly. The world is messy. Encoding enough rules to capture human-level judgment turned out to be much harder than expected. Programs that worked beautifully in narrow domains fell apart the moment they encountered something the rules didn't cover.

When the gap between what AI promised and what it could actually do became too obvious, funding dried up, researchers left the field, and the term "AI" became something you'd avoid putting on your resume. There were two of these "AI winters," roughly in the late 1970s and again in the late 1980s and early 1990s. Each one followed a wave of hype that didn't deliver, and each one set the field back significantly.

This is the part of AI history most people don't know, and it's the part you most need to know. The reason the field has a credibility problem is that it has burned a lot of credibility before. If you've ever heard a thoughtful person say "I'll believe AI is real when I see it," they're often reacting (consciously or not) to that history. Their skepticism isn't unreasonable. It's based on track record.

So when we say this moment is different, we have to actually defend that claim. Not just assert it. The rest of this module is that defense.

> **Try this (2 minutes).** Before reading further, write down what *you* believed about AI five years ago, in 2021. What did you think it could do? What did you think it couldn't? Then, what's changed for you since? You don't need to share this. The point is to notice your own starting point so you can see your own movement through the rest of this module.

---

## Lesson 2: The shift to machine learning

Sometime in the 1990s and 2000s, AI research started to move away from the "encode rules" approach and toward something fundamentally different: **machine learning**.

The core idea is straightforward, even if the math underneath isn't. Instead of writing rules that tell a computer how to recognize a cat in a photo (which is essentially impossible to do well), you give the computer a large number of photos that are labeled "cat" or "not cat," and you let it figure out for itself what patterns reliably distinguish the two. The computer isn't programmed with rules about whiskers or fur. It learns the relevant patterns directly from the data.

This shift, from explicit rules to learned patterns, was the foundational move that everything since has built on. It worked because two things changed at the same time. First, we started accumulating massive amounts of digital data (photos online, written text, transactions, sensor readings). Second, computers got fast enough and cheap enough that we could actually train models on that data at scale. Neither piece works without the other.

The first big wins came in narrow domains: image recognition, speech recognition, recommendation systems. By the early 2010s, machine learning was quietly powering things you used every day, like the autocomplete on your phone, the recommendations on Netflix, fraud detection on your bank account. None of this looked like "AI" in the science fiction sense. It looked like things working slightly better than they used to. But it was the foundation.

What machine learning still couldn't do well, even by 2015 or 2016, was language. Translating between languages was getting better but was still clunky. Generating coherent paragraphs of text was a research problem with disappointing results. Understanding the meaning of a long document, in any deep sense, was beyond reach. Computers could recognize patterns in pixels much better than they could recognize patterns in language. Language was holding the field back.

That changed in 2017.

---

## Lesson 3: The transformer breakthrough

In June 2017, eight researchers at Google published a paper titled "Attention Is All You Need." The title was a deliberate provocation, because it was naming a single technical idea (attention) and claiming that idea alone could solve a problem the field had been struggling with. Most people in AI didn't believe it at first.

They were wrong to be skeptical. The paper introduced an architecture called the **transformer**, and the transformer turned out to be the missing piece that unlocked modern AI.

The technical details are beyond a 101 course, but the core idea is worth understanding because it explains everything that followed. Earlier approaches to language processing read text the way a human does, one word at a time, in order. This was slow and made it hard for the model to keep track of how words far apart in a sentence related to each other. The transformer threw that out and instead let the model look at all the words at once and figure out which ones were most relevant to each other. This single change, processing all of the text in parallel rather than sequentially, made the models radically more efficient to train and much better at capturing the meaning of language across long stretches of text.

What followed was a chain of fast developments built on that foundation:

- 2018: The first GPT model from OpenAI, with 117 million parameters. Decent but not impressive to anyone outside the field.
- 2019: GPT-2, with 1.5 billion parameters. Better, and the first model OpenAI was nervous enough about to delay releasing publicly.
- 2020: GPT-3, with 175 billion parameters. The first model where scale produced something that felt qualitatively different. It could write coherent essays, generate working code, summarize complex documents. People in the field knew something had shifted.
- November 2022: ChatGPT, a conversational interface built on top of GPT-3.5. It went from zero to a hundred million users faster than any product in history. This was the moment the broader public realized something was happening.

The thing to notice in that timeline is the role of *scale*. The architecture didn't change much between GPT-1 and GPT-3. What changed was how big the models got and how much data they were trained on. As they got bigger, they got better. Not just incrementally. They started to do things they couldn't do at smaller scales at all.

This pattern, where scale produces qualitative jumps in capability, is now known as **scaling laws**. The three main ingredients leading to predictable improvements in AI performance are training data, computation, and improved algorithms. Anthropic's co-founders were among the first researchers to formally document this in the mid-2010s, and it's been the engine driving the field ever since. Bigger models trained on more data with better algorithms have produced reliably better results, and that pattern has held for several years and many orders of magnitude of scale.

> **Try this (3 minutes).** Open Claude.ai (or whichever AI tool you use) and ask it: *"Briefly explain the difference between rule-based AI and machine learning, with an example of each. Then explain why the transformer architecture mattered."* Read what comes back. Notice how the model handles a question about its own technical history. This is exactly the kind of question modern LLMs are good at: well-documented technical content with lots of training material to draw from. Compare its answer to what you read in this lesson. Are they consistent? Is the model adding anything that surprises you?

---

## Lesson 4: Why this moment is different

Now we can answer the question that motivates the whole module: is this just another hype cycle, or is something genuinely new happening?

The honest answer is: something genuinely new is happening, but for specific reasons that are worth being able to name. There are at least four of them.

**Capabilities have crossed real thresholds.** Earlier AI could do narrow things well. Modern LLMs can do a wide range of cognitive tasks at a level that's useful for actual work. They can summarize, translate, draft, code, reason through problems, and explain things in different registers. The work isn't always perfect (M05 is about why), but it's qualitatively in a different category from what AI could do five years ago. This isn't a marketing claim. It's directly observable. You can verify it in five minutes by trying any frontier model.

**The economic value is real and measurable.** Previous AI hype cycles had impressive demos but limited real-world deployment. This one is different. About 49% of jobs have seen at least a quarter of their tasks performed using Claude. That's not adoption among AI enthusiasts. That's broad penetration into actual work, fast. 49% of all job categories have now seen at least a quarter of their tasks performed using Claude. That's not a niche tool anymore. That's infrastructure. When previous "AI" technologies were tested in real workflows, most of them washed out. This one isn't washing out. It's accelerating.

**The scaling pattern is unusually robust.** Most technologies hit limits fast, where additional investment stops producing additional capability. The scaling laws of LLMs have continued to hold over many orders of magnitude. As of 2026, the pattern is starting to mature in some ways (the gains are becoming more nuanced and harder to extract), but the core observation that bigger models trained on more data continue to get better has been remarkably consistent. Anthropic CEO Dario Amodei has written that behind the volatility and public speculation, there has been a smooth, unyielding increase in AI's cognitive capabilities.

**The technology is general-purpose, not narrow.** Earlier AI breakthroughs were specific to one task. Better speech recognition. Better image classification. Better game playing. LLMs are different. They're general-purpose tools that can be applied to almost any cognitive work that involves text, which turns out to be most of knowledge work. This generality is what makes them economically transformative in a way narrower AI tools weren't. It's also what makes them harder to predict.

So is this hype? There's hype around it, definitely. There's a lot of money being thrown at AI startups, a lot of overpromising in marketing, a lot of "AI" being slapped on products that barely use it. That part is the same as every hype cycle, and you should treat it the same way: with healthy skepticism.

But the underlying technology is doing real work for real people in measurable amounts. That's the part that's not hype. The honest stance for a thoughtful skeptic in 2026 is something like: "Yes, the technology is real and meaningful, *and* the marketing around it is often overheated." Both can be true. Holding both is the L2 move.

### What to do with this

The practical implication of the historical context is mostly about your own bearings. When you read a breathless article claiming AI will replace all coders within a year, you can put it in context: this is the genre of overpromising that has historically marked AI's hype peaks. When you read a dismissive article claiming it's all just word-prediction parlor tricks, you can put that in context too: this is the genre of underestimation that has historically followed disappointment, but the data on actual use says otherwise.

Both extremes are noise. The signal is the underlying capability and adoption trajectory, which has been remarkably consistent for several years now. That's what you orient to.

---

## Key takeaways

- AI as a field has existed since the 1950s and has gone through at least two major "AI winters" where hype outran reality and the field collapsed. The skepticism many people feel is partly based on this real track record.
- The shift from **rule-based AI** (encoding human knowledge as explicit rules) to **machine learning** (letting computers learn patterns from data) was the foundational move that everything modern is built on. It worked because we got both massive amounts of digital data and cheap, fast computation around the same time.
- The **transformer architecture**, introduced in 2017, was the specific technical breakthrough that made modern LLMs possible. It changed how models process language and unlocked the scaling pattern that's defined the field since.
- **Scaling laws** describe a pattern that's held for several years: bigger models, trained on more data, with better algorithms, reliably produce better results. This is the engine driving the current AI moment.
- This moment is different from previous AI hype cycles in four specific ways: real capability thresholds have been crossed, economic value is being created at measurable scale, the scaling pattern has been unusually robust, and the technology is general-purpose rather than narrow.
- The right L2 stance is to hold both truths at once: the technology is real and meaningful, *and* the marketing around it is often overheated. Both extremes (over-belief and dismissal) are noise.

---

## Knowledge Check

10 questions. Aim to answer in 10 to 15 minutes. Each question has one best answer; explanations follow each.

**1. The term "artificial intelligence" was coined in:**
A) 1996, with the rise of the internet
B) 1956, at a workshop at Dartmouth College
C) 2017, with the publication of the transformer paper
D) 2022, when ChatGPT launched

> **Correct: B.** AI as a research field is over 70 years old. Knowing this is the first step in understanding why thoughtful people are skeptical of bold AI claims: the field has a track record.

**2. What is an "AI winter"?**
A) A period when AI is too cold to function effectively
B) A research moratorium imposed by governments
C) A period when AI hype outran what the technology could actually deliver, leading to collapsed funding and lost momentum
D) A specific technical failure mode in older AI systems

> **Correct: C.** There were at least two AI winters in the field's history, roughly in the late 1970s and the late 1980s/early 1990s. Each followed a wave of overclaiming that didn't pan out. This is the real basis for some skepticism today.

**3. What was the dominant approach to AI for the first several decades of the field?**
A) Machine learning from large datasets
B) Encoding human knowledge as explicit rules and writing programs to reason over them
C) Quantum computing
D) Neural networks similar to today's models

> **Correct: B.** Symbolic or rule-based AI was the dominant approach until roughly the 1990s. It produced some narrow successes but hit a wall on tasks requiring broad world knowledge, which is why the field eventually shifted toward machine learning.

**4. What's the core idea of machine learning?**
A) Programming computers with explicit rules for every situation
B) Giving computers labeled data and letting them learn patterns directly from the data
C) Connecting computers to the internet so they can search for answers
D) Making computers process information faster than humans

> **Correct: B.** Machine learning flips the older approach: instead of writing rules, you provide examples and let the system learn the patterns. This shift, plus access to large datasets and cheap compute, made everything that came after possible.

**5. Why did machine learning take off when it did, in roughly the 2000s and 2010s?**
A) A single mathematical breakthrough made it suddenly possible
B) Two things came together at the same time: massive amounts of digital data became available, and computers got fast and cheap enough to actually train models at scale
C) The field's funding suddenly increased after a slow decade
D) A regulatory change in the US allowed AI research to proceed

> **Correct: B.** Neither piece works without the other. You need the data and the compute together. Both reaching critical mass at roughly the same time was the precondition for the rise of modern AI.

**6. What was the transformer, and why did it matter?**
A) A specific kind of GPU that made AI training possible
B) A robotic system developed at Boston Dynamics
C) A new neural network architecture introduced in 2017 that allowed models to process language much more effectively, becoming the foundation for modern LLMs
D) A regulatory framework adopted by the European Union

> **Correct: C.** The transformer, introduced in the 2017 paper "Attention Is All You Need," let models process all the words in a sequence at once rather than one at a time, and it became the architecture underlying GPT, Claude, Gemini, and most other modern LLMs. The "T" in "GPT" stands for transformer.

**7. What happened between GPT-1 (2018) and GPT-3 (2020)?**
A) The architecture was completely redesigned
B) The fundamental architecture stayed similar, but the models got dramatically bigger and were trained on much more data, which produced qualitatively new capabilities
C) The models were rewritten in a new programming language
D) The training process shifted from supervised learning to unsupervised learning

> **Correct: B.** The same basic architecture, scaled up significantly, started doing things smaller versions couldn't do at all. This is the practical demonstration of "scaling laws" that's defined the field since.

**8. What does "ChatGPT" stand for?**
A) Charged Generative Pre-trained Tool
B) Chat Generative Pre-trained Transformer
C) Conversational Heuristic Adaptive Text Generation Platform
D) Comprehensive Hypertext Algorithmic Translation Process

> **Correct: B.** The "T" in GPT and ChatGPT is "Transformer," which connects ChatGPT directly to the 2017 paper. Knowing this small fact reinforces the connection between the breakthrough architecture and the consumer product that made AI broadly visible.

**9. According to Anthropic's Economic Index research, roughly what percentage of jobs have seen at least a quarter of their tasks performed using Claude?**
A) Less than 5%
B) About 15%
C) About 49%
D) Over 90%

> **Correct: C.** As of early 2026, roughly half of jobs in the data have seen meaningful AI use across at least a quarter of their tasks. This is one of the most concrete signals that this moment is different from previous AI hype cycles. The technology is being used, broadly and quickly.

**10. What's the most accurate L2 stance on the current AI moment?**
A) It's all hype and will fade like every previous AI cycle
B) It will replace most jobs within a year and we should panic
C) The underlying technology is real and meaningful, *and* the marketing around it is often overheated; both can be true
D) AI is essentially unchanged from where it was in 2010, just with better marketing

> **Correct: C.** The L2 move is holding both truths at once. The technology is doing real work; the hype around it is often inflated. The signal is in the actual capability and adoption trajectory, not in the loudest claims on either side.

---

## Applied Activity: "The Skeptic's Briefing"

**Estimated time: 25 to 30 minutes**
**Submission: a 300 to 400 word written piece + a short reflection**
**Graded against the rubric below**

### What you'll do

Imagine that a thoughtful, skeptical colleague (or family member) has come to you and said: *"I keep hearing about AI. I think it's another hype cycle. Convince me otherwise, or convince me I'm right."* Your job is to write them a response.

The point isn't to "convert" them. It's to give them an honest, well-grounded picture of where AI came from, what's actually different now, and what's worth being skeptical of versus what's worth taking seriously. This is exactly the L2 move from this module: holding the nuance, neither overclaiming nor dismissing.

### Constraints

- **300 to 400 words.** Long enough to handle the substance, short enough to force precision.
- **Don't quote this module directly.** Write in your own voice, as you'd actually talk to this person.
- **You must include**: at least one reference to AI's history (the long arc, AI winters, or the rule-based-to-machine-learning shift), at least one reference to the transformer or scaling laws as what changed technically, and at least one acknowledgment of what's *legitimately* worth being skeptical of.
- **Pick a real person you actually know** to write to in your head, even if you don't send it. The specificity will make your writing better.

### After you write it

Add a short reflection (100 words is enough) answering one question: **What was the hardest thing to articulate, and why?** This isn't graded on the answer. It's graded on whether you actually noticed your own friction points.

### Submission

Submit the piece + the reflection as a single document.

### Rubric

You'll be graded on four dimensions, each on a 1 to 5 scale, for a composite out of 20.

| Dimension | 1: Minimal | 3: Solid | 5: Excellent |
|---|---|---|---|
| **Historical context** | No reference to AI's history, or references are inaccurate | Includes at least one accurate reference to the long arc, AI winters, or the rules-to-ML shift | Weaves historical context into the argument such that it actively strengthens the case, not just decoration |
| **Technical accuracy** | Misrepresents what the transformer is or what scaling laws are; or vague to the point of meaninglessness | Accurately references one of the key technical shifts (transformer or scaling laws) in plain language | Articulates the technical shift clearly enough that the skeptic could repeat it back, without overcomplicating |
| **Honest engagement with skepticism** | Dismisses the skeptic's view, or capitulates entirely | Acknowledges at least one legitimate reason for skepticism while still making the case for what's different | Engages the skeptic's strongest objection seriously and shows how the data or evidence answers it (or honestly admits where it doesn't) |
| **Quality of voice** | Reads like a textbook or a marketing brochure; not how the writer would actually talk | Sounds like a real person making a real argument; clear and conversational | Sounds distinctly like the writer; sharp, specific, and the kind of message a skeptical person would actually finish reading |

**Composite scoring:**
- 17 to 20: Mastery. The L2 move is clear; this person can hold nuance and articulate it.
- 13 to 16: Solid. The frame is right, with room to deepen on one or two dimensions.
- 9 to 12: Developing. Either too one-sided or too vague; revisit Lesson 4.
- Below 9: Restart. Work through the module again before moving to M03.

---

## Sources and attribution

This module draws on the following Anthropic-published material and credible secondary sources:

- **Core Views on AI Safety** (Anthropic, 2023). Source for the framing of training data, computation, and improved algorithms as the three ingredients of AI progress, and the early documentation of scaling laws. https://www.anthropic.com/research/core-views-on-ai-safety
- **The Adolescence of Technology** (Dario Amodei, 2025). Source for the framing of capability gains as a smooth underlying trend behind public volatility. https://www.darioamodei.com/essay/the-adolescence-of-technology
- **Anthropic Economic Index report: Learning curves** (March 2026). Source for the 49% jobs figure and the framing of AI as moving from niche tool to infrastructure. https://www.anthropic.com/research/economic-index-march-2026-report
- **Attention Is All You Need** (Vaswani et al., 2017). The original transformer paper, foundational reference for the technical shift. https://arxiv.org/abs/1706.03762

The 4D AI Fluency Framework (Delegation, Description, Discernment, Diligence) was developed by Prof. Rick Dakan (Ringling College of Art and Design) and Prof. Joseph Feller (University College Cork) in collaboration with Anthropic. Released under CC BY-NC-SA 4.0.

This module is part of the Gong Brainstorm program. Gong-specific framing (level transitions, learner journey, GTM context) added by the program team.
