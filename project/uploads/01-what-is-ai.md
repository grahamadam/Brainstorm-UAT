# M01 · What is AI?

**AI 101 · Module 1 of 7**
**Estimated time: 30 minutes content + 10 to 15 minute knowledge check + applied activity**
**Level transition: This module is your first real step from L1 (The Risk) toward L2 (The Novice)**

---

## Module brief

You almost certainly already use AI. You've probably typed something into ChatGPT, asked Claude to draft an email, or watched Gong's call summaries appear after a customer conversation. So in one sense, "what is AI?" is a strange question to start a course with. The answer is right there on your screen.

But there's a difference between *using* AI and *understanding what's happening when you use it*. Most people skip the second part, and that skip is what creates the L1 risks Brainstorm exists to address. People who don't have a working mental model for what an AI model is doing tend to do one of two things. They treat it like a search engine that always returns true facts (it isn't, and it doesn't), or they treat it like a sentient colleague who has thoughts and intentions (it doesn't, in the way you mean). Both of those framings get you in trouble.

This module gives you a third framing. One that's accurate enough to be useful and simple enough to actually carry around. By the end, you'll have a working answer to "what is this thing I'm using" that holds up under pressure, and you'll know enough vocabulary to have a real conversation about AI with anyone in the org without getting lost.

We're keeping this practical. There's no math, no architecture diagrams, and no philosophy about whether AI is "really" thinking. What we'll do is build a working model of how these systems behave, where they come from, and what that means for how you use them.

## Learning objectives

By the end of this module you should be able to:

1. Explain, in plain language, what people mean by "AI" today, and what they don't.
2. Describe what a large language model actually does when you send it a message.
3. Recognize and use the basic vocabulary: model, prompt, context, token, agent.
4. Articulate why data (both the data the model was trained on, and the data you give it) is the foundation of everything.

---

## Lesson 1: What we mean when we say "AI"

The word "AI" is doing a lot of work right now. People use it to mean self-driving cars, the recommendation engine on Netflix, ChatGPT, Gong's call analysis, and the imaginary robot from a science fiction movie, all in the same conversation. That's confusing, and it's part of why people end up with such different reactions to the technology. They're not actually talking about the same thing.

Here's a useful way to cut through it. "AI" (artificial intelligence) is a *category*. Inside that category there are many different technologies, and they're not all the same. The kind of AI that's reshaping work right now, and the kind this course is mostly about, is a specific type called a **large language model**, or LLM. When most people in your work life say "I used AI to do X," what they almost always mean is "I used an LLM."

Examples of LLMs you've probably heard of: Claude (made by Anthropic), GPT-5 (made by OpenAI, behind ChatGPT), and Gemini (made by Google). These are the consumer-facing names. Under the hood, they're all the same general kind of thing. Software trained on a huge amount of text that can read and produce human-like language.

Other things that get called "AI" but aren't LLMs: image generators (Midjourney, DALL·E), the algorithm that decides which posts you see on LinkedIn, fraud detection in your bank app, voice transcription, self-driving features in your car. Some of these use techniques that are related to LLMs. Others are completely different. For our purposes, and for what's about to change your day-to-day work, the LLM is the thing.

So when we say "AI" in this course, unless we specifically say otherwise, we mean a large language model. A piece of software that takes text in and produces text out, using patterns it learned from a very large amount of text it was trained on.

That's the working definition. We'll spend the next lesson unpacking what's actually happening inside it.

> **Try this (2 minutes).** Pause for a second and answer for yourself: in the past week, where did *you* use AI? Try to get specific. Not just "ChatGPT," but "I asked ChatGPT to rewrite a follow-up email." Now, for each one, was it an LLM, or something else? You probably won't be sure on a couple. That's fine. The goal of this exercise is to start noticing where AI shows up in your actual workflow, because that's where everything in this course is going to apply.

---

## Lesson 2: What an LLM actually does, in plain English

Here's the most important sentence in this entire course:

**A large language model is software that, when you give it some text, predicts what text should come next, one small piece at a time.**

That's it. That's the whole mechanism. Everything else is detail.

But that sentence is so simple that it sounds like it can't be the real answer. So let's slow down and actually look at what's happening, because this is the foundation that makes everything else in the course click.

### The training step

Before you ever type anything into Claude, the model has been *trained*. Training means the model was shown an enormous amount of text (books, articles, websites, code, conversations) and learned the statistical patterns of how language works. Not memorized, exactly. Learned. It picked up that "the cat sat on the" is very likely to be followed by "mat" or "couch" and not "refrigerator." It picked up that questions in customer support emails tend to be followed by certain kinds of responses. It picked up grammar, tone, style, factual associations, code structure, and a thousand other things, all from the patterns in the text.

The training is done before you ever interact with it. By the time you open Claude.ai, the model is already trained. You're not teaching it anything new in your conversation, and we'll come back to what that means in Lesson 4.

### The "predict the next piece" step

Now you type something. The model takes your message, plus everything else in the conversation, and it asks itself a very specific question: *given everything I've seen so far, what's the most likely next piece of text?*

It picks a piece, adds it to what's been written, and then asks the same question again. *Now, given everything so far including the piece I just added, what's the most likely next piece?* And again. And again. Until it's done.

It's worth slowing down on this for a second. The model isn't planning out a whole answer and then writing it. It's not looking up an answer in a database. It's generating the response one small piece at a time, where each piece is just the most probable continuation of everything that came before.

> **Try this (3 minutes).** Open Claude.ai (or whichever AI tool you have access to) and send this exact message: *"Tell me a short, surprising fact about octopuses, and then explain how you know it."* Read what comes back. Then ask a follow-up: *"How did you generate that answer? Walk me through what you actually did, step by step."* You'll get the model's own (somewhat humble) account of how it works. Notice how it talks about probability, training data, and patterns. It will not say "I looked it up" or "I checked a database," because those things didn't happen.

### Why this matters

Once you understand that the model is generating text one piece at a time based on patterns it learned, several things start to make sense.

**Why it can sound confident about wrong things.** The model isn't checking facts as it writes. It's producing text that's *statistically likely*. Sometimes the statistically likely text is also true. Sometimes it isn't. The confidence and the correctness aren't connected the way they would be if a human were writing. We'll go deep on this in M05.

**Why the same prompt can give different answers.** There's a small amount of randomness in how the model picks each next piece, which is actually useful. Without it, every answer would be identical and robotic. But it does mean Claude's answer to "what should I say in this email?" might be different the second time you ask. That's not a bug. It's how the system works.

**Why context matters so much.** Because the model is predicting based on everything it's been given, the more relevant context you provide, the better its predictions get. A vague prompt gives the model less to work with. A specific prompt, with role, task, format, examples, narrows the prediction toward what you actually want. This is what M04 is all about.

**Why it can't "remember" things between conversations by default.** Each conversation typically starts fresh. The model doesn't have a memory of you across sessions unless something has been built specifically to give it one. Brainstorm has a memory layer. Raw Claude.ai conversations historically didn't. If you tell Claude something about yourself today, by default it won't be in tomorrow's conversation. (Memory features are increasingly common, but you should always check what a given tool does.)

### The honest part: nobody fully understands the inside

Here's something that doesn't get said enough. Even the people who *built* these models don't fully understand how they work on the inside. The training process produces a model with billions of internal parameters, and those parameters encode the patterns the model uses, but they're not human-readable. Anthropic itself has published [research](https://www.anthropic.com/research/tracing-thoughts-language-model) using a technique they call "circuit tracing" specifically because, as they put it, even they don't have a clear picture of what's happening inside.

What they've found is genuinely interesting. The models do appear to do something more than blind word-prediction in some cases. There's evidence that when Claude writes a poem, it plans the rhyming word at the end of a line *before* it starts writing the line. There's evidence of something like a shared internal "concept space" that exists across languages. And when you ask the model to explain its reasoning, the explanation it gives doesn't always match what's actually happening inside it.

You don't need to memorize any of that. But it's worth knowing because it pushes back on two extreme views: "it's just predicting words" (true mechanically, but it underestimates what falls out of that) and "it really thinks like a human" (also wrong, in different ways).

The right working stance is somewhere in between. It's a powerful pattern-matcher trained on a huge amount of human text. It often produces output that's startlingly good. It also has failure modes that are worth knowing about and habits worth building around. The next few modules are about learning those habits.

---

## Lesson 3: The vocabulary, demystified

When people talk about AI, they throw around terms that can make it feel more complicated than it is. Here's a working glossary of the terms you'll keep hearing. Don't memorize these. Just read through and notice the shape of each one. They'll show up over and over in the rest of the course.

**Model.** The trained system itself. "Claude Opus 4.7" is a model. "GPT-5" is a model. When people say "the model said something weird," they mean the underlying AI, not the website you used to talk to it. Models come in different sizes and capabilities. Bigger models are usually more capable but slower and more expensive to run. Different model families (Claude vs. GPT vs. Gemini) have different strengths, which we'll cover in M06.

**Prompt.** What you send to the model. The text in the chat box, plus any instructions or context you provide. Your prompt is the single biggest lever you have over the quality of the output. M04 is entirely about getting good at writing prompts.

**Context (or context window).** Everything the model can "see" at once when generating a response. This includes your current message, the conversation history, any files you've attached, and any system instructions that have been set up. Context is finite. Every model has a limit on how much it can hold at once. When that limit fills up, older parts of the conversation effectively fall out of view. Think of context like the model's working memory: it only knows what's in there right now.

**Token.** The small pieces the model actually processes. A token is roughly a word, or part of a word. "Running" might be one token, but "antidisestablishmentarianism" might be six. You don't usually need to think about tokens directly, but it's why people sometimes talk about "the cost per token" or "how many tokens fit in the context window." It's the model's basic unit.

**Training data.** The text the model was trained on before you ever saw it. Training data shapes everything the model does: what it knows, what it doesn't know, what biases it has, what styles it can produce. Different models are trained on different data, which is part of why Claude, ChatGPT, and Gemini have slightly different personalities and strengths. We'll touch on this more in Lesson 4.

**Knowledge cutoff.** The date past which the model wasn't trained on new information. If a model has a January 2026 knowledge cutoff, it doesn't natively know about events from February 2026 onward. Modern AI tools often pair the model with web search to get around this, but the underlying model itself has a cutoff. This is why asking an LLM "what happened yesterday in the news" without web search enabled gives you nothing useful.

**Hallucination.** When the model produces something that sounds confident and plausible but is actually wrong or made up. This is the single most important failure mode to understand. M05 is all about it.

**Agent.** A model that's been set up to take actions in the world, not just respond to your messages. An agent can do things like browse the web, send an email, run code, or update a file, within whatever permissions it's been given. Agents are a more advanced topic that you don't need to worry about at the 101 level. For now, just know the word: when someone says "AI agent," they mean an AI system that can do things, not just talk.

**Multimodal.** Models that can work with more than just text. Also images, audio, video. Modern frontier models like Claude and GPT-5 are multimodal. You can paste in a screenshot of a deck and ask questions about it. You can attach a PDF. The basic mechanics are the same. The model just has the ability to "read" more than text alone.

> **Try this (2 minutes).** Without scrolling back up, write down your own one-sentence definitions of: *prompt*, *context*, *training data*, *hallucination*. Don't worry about getting them word-perfect. Just check that you can produce a definition that would actually help a colleague understand. If any of them feel fuzzy, scroll back and re-read the entry. The goal isn't memorization. It's that you can use the word in a sentence and know what it means.

---

## Lesson 4: Why data is the whole game

If you take only one thing from this lesson, it's this: **AI is a data problem before it is anything else.** The quality of what you get out is shaped, almost entirely, by two kinds of data. What the model was trained on, and what you give it in the moment.

### Training data shapes the model itself

The model only "knows" things it saw patterns for during training. If a topic was well-represented in the training data, the model is likely to handle it well. If it wasn't, the model is likely to struggle, hedge, or, worst case, confidently make something up.

This has practical consequences:

- A model trained mostly on English will be stronger in English than in other languages, even if it can produce other languages.
- A model trained on data through January 2026 will be unreliable about anything from February 2026 onward unless given fresh information in the prompt or via web search.
- A model trained on public internet data has *not* seen Gong's internal documents, Salesforce data, or your team's Slack history. It can't draw on what it never saw.
- A model trained on data with biases (and all training data has biases) can reproduce those biases in its outputs. This is a real and well-documented issue, not a hypothetical one.

The practical implication: when you're using AI, you should always have a rough sense of whether what you're asking is the kind of thing it would have seen a lot of in training. "Help me restructure this awkward sentence." Yes, tons of patterns in training data. "Tell me what our specific Gong customer XYZ is currently focused on this quarter." No, that data was never in training. The first request is well within the model's wheelhouse. The second one, asked of a raw model with no extra context, will produce something fluent, confident, and almost certainly wrong.

### The data you provide in the moment

The second kind of data is the data *you* give the model. Your prompt, the documents you attach, the context you set up. Because the model only knows what's in its training data plus what's in the current conversation, the data you provide is your only way to bring information from your specific world into the picture.

If you're asking Claude to help you draft a follow-up to a customer call, and you don't paste in or describe the call, Claude has to make up plausible context. It will produce something fluent. But it'll be generic, because that's all it has to work with. If you paste in the call summary and the customer's last email, suddenly the model has real context and the output gets sharply better. Same model. Same prompt template. Different data in.

This is why prompting is so much more about *information* than it is about *clever wording*. The "magic" is mostly in giving the model what it needs to do the job. The wording matters too (that's M04), but it's downstream of having the right data in the conversation in the first place.

### A note on your data and where it goes

This is a 101 course, so we'll be brief, but it's worth flagging: when you put information into an AI tool, you should know what happens to it.

For Brainstorm and other Gong-approved tools, this has been thought through. There are policies about what data can go where, and the tools you have access to inside Gong are configured for safe use. But if you're using a personal AI account on something like consumer ChatGPT, the data handling is different, and pasting in customer-identifying or confidential information can be a real problem. The L1 → L2 transition includes building the reflex of *checking what tool you're using and what its data policies are* before you paste anything sensitive in.

We'll cover this more directly in M07 when we talk about owning AI outputs and the responsibility that comes with them. For now, the foundation is: data is what makes the system work, and the data you provide is the part you control.

> **Try this (3 minutes).** Think of one specific thing you did at work last week that involved AI, or that *could* have. Now ask yourself: what data did the AI need that it couldn't have known on its own? (e.g., the customer's name, the deal's stage, last week's call notes.) If you didn't provide that data, what gaps would the AI have had to fill in by guessing? This question (*what does the model not know that I'd need to give it?*) is a habit worth building. It's the seed of good prompting.

---

## Key takeaways

- "AI" is a category. The kind reshaping your work is specifically a **large language model**: software trained on enormous amounts of text that produces text in response to text input.
- An LLM works by **predicting the most likely next piece of text**, one piece at a time, based on everything it's seen so far. It is not looking things up. It is not reasoning the way a human does, even when its output looks like reasoning.
- The model's confidence and the correctness of its output **are not connected the way they would be in a human**. This is the root cause of hallucinations, which we'll cover in M05.
- The basic vocabulary you need: **model**, **prompt**, **context**, **token**, **training data**, **knowledge cutoff**, **hallucination**, **agent**. You don't need to memorize definitions. You need to be able to use the words in conversation.
- Everything an LLM does is shaped by **two kinds of data**: what it was trained on (which you don't control) and what you give it in the moment (which you do). The latter is your most important lever.
- Your starting move with any AI task should be: *what does the model not know that I'd need to give it?* That single question separates L1 use from L2 use.

---

## Knowledge Check

10 questions. Aim to answer in 10 to 15 minutes. Each question has one best answer; explanations follow each.

**1. Which of these is the most accurate working definition of "AI" as the term is being used in your day-to-day work?**
A) A robot or system that has achieved human-like consciousness
B) A category that includes many technologies, most prominently large language models
C) Any computer program that automates a task
D) Software specifically designed to replace human workers

> **Correct: B.** "AI" is a broad category, and the kind reshaping knowledge work most directly is the large language model. Option A is science fiction; C is too broad (a calculator isn't AI); D is a narrative claim, not a definition.

**2. What does a large language model actually do when you send it a prompt?**
A) Searches the internet in real time and summarizes what it finds
B) Looks up answers in a structured database and returns them
C) Predicts what text should come next, one small piece at a time, based on patterns it learned during training
D) Reasons through the problem the way a human would and writes out a solution

> **Correct: C.** This is the core mechanic. Some tools layer web search on top of the model (and that can change what's available in the prompt), but the underlying model itself is a next-token predictor. It is not searching, looking up, or reasoning in the human sense, even when its output mimics those processes.

**3. You ask Claude the same question twice and get two slightly different answers. What's the most likely explanation?**
A) Claude is making a mistake one of the times
B) There's a small amount of randomness in how the model picks each next piece of text, which is normal and expected
C) Someone updated the model between your two questions
D) The model is malfunctioning and should be reported

> **Correct: B.** A small amount of variation between responses is built into how these models generate output. It's not a bug. The same input will rarely produce a perfectly identical output, and that's fine. Sometimes one of the variants is even better than the others.

**4. What is a "prompt"?**
A) The model itself (e.g., Claude or GPT)
B) The text you send to a model, including any instructions, questions, or context
C) The training data the model was built on
D) The settings panel where you configure an AI tool

> **Correct: B.** A prompt is what you send to a model. It's the input that shapes the output, and getting good at writing prompts is one of the highest-leverage skills you can build. M04 is entirely about this.

**5. What is the "context window"?**
A) The user interface around the chat box in an AI tool
B) The window of time during which the model is available to use
C) The amount of text the model can "see" at once when generating a response: your message, conversation history, and any attached materials
D) The list of approved use cases for the model

> **Correct: C.** Context window is the model's working memory for a given response. It's finite, and when it fills up, earlier parts of the conversation effectively drop out of view. Understanding this helps you make sense of why very long conversations sometimes start to feel like the model "forgot" earlier parts.

**6. A model has a knowledge cutoff of January 2026. You ask it about a major event that happened in March 2026, with no web search enabled. What's most likely to happen?**
A) The model will refuse to answer
B) The model will accurately describe the event using its general knowledge
C) The model may produce something that sounds confident and plausible but is actually wrong or made up
D) The model will tell you it can't answer because the event is after its cutoff

> **Correct: C.** While well-tuned models will *often* flag that they don't know about recent events, they don't always, and the failure mode of confidently making something up (a "hallucination") is exactly what knowledge cutoff issues can produce. Verifying recency-sensitive answers is a basic L2 habit.

**7. Which of the following is NOT shaped by a model's training data?**
A) What topics the model handles well
B) What languages the model is strongest in
C) Whether the model knows about events from yesterday
D) The exact wording you choose to put in your prompt

> **Correct: D.** Your prompt is the data *you* contribute, in the moment. A, B, and C are all directly downstream of training data. D is the part you control.

**8. You're asking Claude to help draft a follow-up to a customer call. You don't paste in any notes from the call. What's most likely to happen?**
A) Claude will pull the call notes from Gong automatically
B) Claude will ask you a series of clarifying questions before writing anything
C) Claude will produce a fluent, generic email that doesn't reflect what actually happened on the call
D) Claude will refuse to help without more information

> **Correct: C.** This is the most common AI mistake at the L1 stage: forgetting that the model only knows what you give it. The output will *look* like a real email, but it'll be the model's best guess at what a generic customer follow-up should sound like. The fix is to give the model the data it needs: the call summary, the customer context, what was discussed.

**9. What is a "hallucination" in the AI sense?**
A) When a model crashes or produces no output
B) When a model produces something that sounds confident and plausible but is actually wrong or made up
C) When a model intentionally lies to test the user
D) When a model returns a warning about uncertain information

> **Correct: B.** Hallucinations are the most important failure mode to understand. The model isn't lying (there's no intent), it's producing statistically likely text that happens not to be true. M05 covers the patterns of when this is most likely and what to do about it.

**10. You're new to Claude and want to start using it well. Based on this module, which of these is the most important habit to build first?**
A) Memorizing which model versions are available
B) Asking yourself, before any task: *what does the model not know that I'd need to give it?*
C) Always using the longest, most detailed prompt possible
D) Using AI for as many tasks as possible to get reps in

> **Correct: B.** This single question is the seed of good prompting. It pushes you to think about the data the model needs, which is the single biggest lever on output quality. A, C, and D are all either trivial or actively unhelpful.

---

## Applied Activity: "Find the Seams"

**Estimated time: 20 to 25 minutes**
**Submission: a record of your three conversations + a 200 to 300 word reflection**
**Graded against the rubric below**

### What you'll do

Have three short conversations with Claude (or whichever AI tool you use day-to-day). Each one is designed to surface a different aspect of how the model actually works. Then write a short reflection on what you noticed.

This isn't about getting "right answers" from the AI. It's about noticing how it behaves so you build real intuition for what it is.

### The three conversations

**Conversation 1: Where it's strong.**
Pick a topic you know well. Something from your hobby, your background, your last role, anything where you can tell good output from bad. Ask the AI a substantive question about it. Read what it produces. Then ask one follow-up that pushes deeper. Notice: what does it do well? Where does it sound like it actually understands?

**Conversation 2: Where it might fabricate.**
Ask the AI for something specific that's hard to verify. A few options that work well:
- "Give me a quote from page 47 of [some specific obscure book]"
- "What's the population of [a small town you know]?"
- "Tell me about [a person whose name you make up]"
- "What did [a specific public figure] say in their speech on [a specific date]?"

Read what comes back. Then ask: "How confident are you in that answer? Could you have made any of it up?" Notice how the model talks about its own confidence, and whether that matches what it produced.

**Conversation 3: How it works.**
Ask directly: *"How do you generate your responses? Walk me through what actually happens, step by step, when I send you a message. Be honest about what you don't know about your own process."* Read carefully. The model's own account of itself is informative, and where it hedges is informative too.

### Submission

Save or copy the text of all three conversations (or screenshot them) into a single document. Underneath, write a 200 to 300 word reflection answering these questions:

1. **What did you observe about how the model produces output?** Did it match the "predicting the next piece based on patterns" frame from this module, or did parts of it surprise you?
2. **Where did the model seem genuinely strong, and where did it seem hesitant or possibly wrong?** Be specific.
3. **What's one habit you'll build going forward, based on what you noticed?**

### Rubric

You'll be graded on four dimensions, each on a 1 to 5 scale, for a composite out of 20.

| Dimension | 1: Minimal | 3: Solid | 5: Excellent |
|---|---|---|---|
| **Engagement with all three conversations** | Only one or two were attempted, or attempts were perfunctory (single short question with no follow-up) | All three were attempted with at least one meaningful follow-up each | All three were thoughtful, with multiple follow-ups that actually probe the model's behavior |
| **Observation of mechanics** | Reflection doesn't engage with how the model produces output, or restates the module instead of observing | Reflection identifies at least one specific behavior that maps to the next-token-prediction frame (e.g., "it didn't search the web, it pattern-matched") | Reflection makes specific, accurate observations about model behavior and ties them clearly to the underlying mechanism |
| **Recognition of fallibility** | No identification of where the model might be wrong; treats output as authoritative | Identifies at least one place where the output was potentially unreliable and explains why | Names specific failure patterns observed (e.g., confident fabrication, unwarranted certainty) and connects them to what they imply for trust and verification |
| **Practical insight** | No habit identified, or one that's generic ("I'll use AI more") | A specific habit tied to something observed (e.g., "I'll always check sources for any factual claim about specific people") | A clear, durable habit that addresses a real risk and is something the learner could realistically apply tomorrow |

**Composite scoring:**
- 17 to 20: Mastery. Strong evidence the foundational concepts have landed.
- 13 to 16: Solid. Concepts are taking hold, with room to deepen on one or two dimensions.
- 9 to 12: Developing. Mechanics are being grasped but discernment is shallow; revisit Lesson 2 and Lesson 4.
- Below 9: Restart. Work back through the module before moving to M02.

---

## Sources and attribution

This module draws on the following Anthropic-published material:

- **AI Fluency: Framework & Foundations** (Dakan, Feller & Anthropic, 2025). Released under CC BY-NC-SA 4.0. Source for the framing of AI fluency as effective, efficient, ethical, and safe collaboration. https://anthropic.skilljar.com/ai-fluency-framework-foundations
- **Anthropic Education Report: The AI Fluency Index** (Swanson et al., February 2026). Source for the empirical framing of iteration and refinement as the keystone fluency behavior. https://www.anthropic.com/research/AI-fluency-index
- **Tracing the thoughts of a large language model** (Anthropic, March 2025). Source for the "we don't fully understand the inside" framing and the planning-in-poems / shared concept space findings. https://www.anthropic.com/research/tracing-thoughts-language-model
- **Mapping the Mind of a Large Language Model** (Anthropic, May 2024). Additional source on interpretability and the black-box framing. https://www.anthropic.com/research/mapping-mind-language-model
- **Prompting best practices** (Claude API documentation). Source for the working framing of prompts as the lever on output quality. https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices

The 4D AI Fluency Framework (Delegation, Description, Discernment, Diligence) was developed by Prof. Rick Dakan (Ringling College of Art and Design) and Prof. Joseph Feller (University College Cork) in collaboration with Anthropic. Released under CC BY-NC-SA 4.0.

This module is part of the Gong Brainstorm program. Gong-specific framing (level transitions, learner journey, GTM context) added by the program team.
