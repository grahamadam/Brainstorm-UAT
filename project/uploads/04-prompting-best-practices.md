# M04 · Prompting Best Practices

**AI 101 · Module 4 of 7**
**Estimated time: 30 minutes content + 10 to 15 minute knowledge check + applied activity**
**Level transition: This is the first module in the craft half of AI 101. It's the practical skill that separates an L2 user from an L1 user more than any other.**

---

## Module brief

If you stopped this course after M01 through M03, you'd have a working understanding of what AI is, where it came from, and where it's going. Useful, but it wouldn't make you measurably better at using AI in your actual work. M04 is where that changes.

This module is about prompting. Specifically, it's about treating prompting as a craft, not as an incantation. There's a popular myth that good AI use is about finding the right magic words, the right tricks, the right "jailbreaks." That framing makes for entertaining content, but it's mostly wrong. Real prompting is more like writing a clear brief for a brilliant new employee who has zero context on your work. The skills that make you good at one are the skills that make you good at the other.

In the 4Ds framework from M01, this is the **Description** competency: communicating clearly with AI so it understands what you actually want. It's the most learnable of the four, and the one that pays the highest immediate dividend in your day-to-day work. By the end of this module, you should be able to take any recurring task in your work and write a prompt that gets you a usable first draft most of the time.

## Learning objectives

By the end of this module you should be able to:

1. Treat prompting as a discipline of clarity rather than a search for magic words.
2. Use the four levers of effective prompts: Context, Role, Task, Format.
3. Use examples (few-shot prompting) when they help, and recognize when they don't.
4. Iterate on prompts as the actual core skill, treating your first prompt as a hypothesis rather than a final draft.

---

## Lesson 1: The mindset shift

Anthropic's own prompting guide opens with what it calls the **golden rule**: show your prompt to a colleague who has minimal context on the task. If they'd be confused, Claude will be too.

That's the whole game, in one sentence. Everything else in this module is just elaboration on it.

Here's why this matters. The most common mistake at the L1 stage isn't writing bad prompts. It's writing prompts that are perfectly clear *to the writer* but assume context the model doesn't have. You know what account you're working on. You know what the customer cares about. You know what your team's tone is. The model knows none of that.

Think of Claude as a brilliant but new employee who lacks context on your norms and workflows. The more precisely you explain what you want, the better the result. That framing, also from Anthropic's prompting documentation, captures the right mental model. The model is genuinely capable. It's not stupid. But it's working with whatever you give it, and only what you give it.

This means the move from L1 to L2 in prompting isn't about learning tricks. It's about learning to write down the context that's already in your head. The prompts that get good output aren't clever. They're complete.

> **Try this (3 minutes).** Open Claude.ai and try this experiment. Send this exact prompt: *"Write a follow-up email to the customer."* Read what you get. Now send this: *"Write a follow-up email to a procurement lead at a mid-market manufacturing company. We had a 30-minute discovery call yesterday where we walked through their current sales process and identified two pain points: their reps don't have visibility into deal stage changes, and their managers spend Monday mornings building forecast updates manually. Tone: professional, warm, not salesy. Format: 4-6 sentences, no bullet points."* Compare the two outputs. The second prompt didn't have a single clever trick. It just had the context the first one was missing. That's the entire shift.

---

## Lesson 2: The four levers

Most effective prompts have four ingredients, and naming them makes it easier to know what to add when output isn't landing. Anthropic's documentation lists similar techniques under different names, but the four below are a clean, practical framing you can use as a checklist.

### Lever 1: Context

Context is the background information the model needs to do the task well. Who is involved. What's the situation. What's already happened. What constraints apply. Most prompts that produce generic output are missing context. The fastest way to improve a prompt is usually to add more of it.

A few things to include in context:
- The audience you're writing for (who will read this, what do they care about)
- The situation or background (what led to this task)
- Anything specific about your organization, product, or work that the model wouldn't know
- Any constraints that matter (length, things to avoid, sensitivities)

Don't worry about being too verbose. Context isn't waste; it's fuel. The model uses it to make better predictions about what good output looks like.

### Lever 2: Role

Role is the perspective or expertise you want the model to bring. "You are a senior content strategist" produces different output than "you are a casual peer reviewer." This isn't about pretending. It's about narrowing the model's prediction toward a specific kind of output.

A few patterns that work:
- "You are a [specific expert role with relevant qualifications]"
- "Act as someone who has [specific experience that matters here]"
- "Approach this the way [a specific kind of professional] would"

Setting a role even in a single sentence makes a measurable difference. It's one of the cheapest, highest-leverage prompt moves you can make.

### Lever 3: Task

Task is the actual thing you want done, stated as specifically as you can. "Help me with this email" is not a task. "Rewrite this email to be more concise, keep the same tone, and add a single clear call to action at the end" is a task.

Some patterns:
- Use specific verbs: rewrite, summarize, analyze, draft, critique
- Specify what you want kept versus changed
- If there are multiple steps, list them as numbered steps so the order is unambiguous
- If completeness matters, say what "complete" looks like

The clearer your task, the less the model has to guess.

### Lever 4: Format

Format is the structure you want for the output. Length, layout, tone, what to include or exclude. Specifying format up front saves you from a back-and-forth where you have to keep asking for adjustments.

A few format moves:
- Length: "5-7 sentences" or "no longer than one paragraph"
- Structure: "use these headers" or "as a bulleted list" or "as continuous prose, no lists"
- Tone: "professional but warm," "concise and matter-of-fact," "match this example"
- What to exclude: "no preamble," "do not include caveats," "skip the introduction"

A useful tip from Anthropic's docs: tell the model what you *want* rather than what to avoid, where possible. "Use smoothly flowing prose paragraphs" works better than "don't use bullet points." Positive instructions tend to be more effective than negative ones.

> **Try this (5 minutes).** Pick a real task you might do this week. A meeting summary, an email, a piece of analysis, anything. Write a prompt that explicitly includes all four levers. Use these markers in your head: *Context: what does the model need to know? Role: what perspective should it bring? Task: what specifically am I asking for? Format: what should the output look like?* Run the prompt in Claude.ai. Save the prompt and the output. We'll come back to it in Lesson 4.

---

## Lesson 3: Examples (few-shot prompting)

Examples are one of the most reliable ways to steer a model's output. Instead of describing what you want in the abstract, you show one or two examples of what good output looks like, and the model uses those to calibrate.

This is called **few-shot prompting**, and it's underused at the L1 stage because it feels like extra work. It's actually the opposite. A good example is faster to produce than a perfect description, and it tends to land better.

### When examples help most

- When tone or voice matters and is hard to describe in words
- When the structure of the output needs to match a template
- When you've tried describing what you want and the output keeps drifting from what you have in mind
- When you have an existing piece of work that's similar to what you want now

### How to use them

The simplest format works: paste in the example, then ask for new output that follows the same pattern.

> *"Here's an example of the kind of follow-up email I want to write. The new email should follow the same structure, length, and tone, but adapted to the customer details below.*
>
> *Example: [paste example email]*
>
> *Customer details: [paste relevant context]"*

A few practical notes from Anthropic's documentation:
- Examples should be **relevant** (mirror your actual use case)
- Examples should be **diverse** (cover edge cases, vary enough that the model doesn't latch onto the wrong pattern)
- Three to five examples is usually the sweet spot, but even one good example is much better than none

You can also use examples in a *negative* way. "Here's an example of output I *didn't* want, and here's why." This is less common, but useful when the model keeps drifting in a specific bad direction.

> **Try this (3 minutes).** Take the prompt you wrote in Lesson 2. Add one example to it: a piece of similar work you've done before, or one you'd consider good. Run it again. Compare the new output to the original. The example almost always improves the result, especially around tone and structure.

---

## Lesson 4: Iteration is the actual core skill

Here's the part of prompting that's the hardest to teach in writing because it's mostly a habit, not a technique.

**Your first prompt is a hypothesis. Your second, third, and fourth prompts are where the real work happens.**

This is one of the most important findings from Anthropic's [AI Fluency Index research](https://www.anthropic.com/research/AI-fluency-index). The single strongest predictor of every other fluency behavior is whether someone iterates and refines in conversation, rather than accepting the first response and moving on. About 86% of the substantive conversations in their study showed iteration. Conversations with iteration showed roughly double the number of other fluency behaviors compared to single-shot use. The data is clean: people who iterate get better results. Period.

The L1 user pattern is: write a prompt, get output, take it or leave it, move on. The L2 user pattern is: write a prompt, get output, *engage with it*, refine, push back, ask follow-ups. The model is not a vending machine. It's a conversation partner. Treat it like one.

### What iteration looks like in practice

A few patterns that work:

**"That's close, but..."** When output is in the right direction but missing something, say so. "That's close, but the tone is too formal. Try again with the tone of a peer talking to a peer." The model uses your feedback to recalibrate.

**"Push back on my assumption"** Anthropic's research found that only about 30% of users tell the model how they want it to interact with them. That's a missed opportunity. Try adding instructions like "push back if my framing is wrong" or "tell me what you're uncertain about" or "walk me through your reasoning before giving the answer." Setting the terms of the collaboration up front changes the dynamic.

**"Show me your reasoning"** When you don't trust an output, ask the model to explain how it got there. This sometimes reveals faulty assumptions you can correct.

**"Try again, but..."** Sometimes the simplest move is to ask for a second attempt with a single specific change. "Try again, but make it half the length." "Try again, but for an executive audience instead." The model is good at targeted revisions when you're specific about what you want different.

### The "polished output" trap

There's an important warning from the AI Fluency Index research worth noting. When AI produces output that *looks* polished (a clean email, a well-structured document, working code), users tend to evaluate it less critically. Across the data, polished outputs were associated with *lower* rates of fact-checking, questioning the model's reasoning, and identifying missing context.

This is the L1 trap. The output looks done, so you treat it as done. The L2 move is the opposite: the more polished the output, the more you should slow down and verify. Polish is not the same as accuracy. We'll go deep on this in M05, which is entirely about hallucinations and the verification practice that catches them.

> **Try this (5 minutes).** Take the output you got from Lesson 3. Don't accept it. Pick one thing you'd change. Maybe the tone is slightly off, or one section is weaker than the rest, or you want it shorter. Send a single follow-up message asking for that specific change. Compare the second output to the first. Now ask for one more revision. By the third version, you should have something noticeably better than the first. That's the iteration loop. Build it into your reflexes.

---

## Key takeaways

- The golden rule of prompting: show your prompt to a colleague with minimal context on the task. If they'd be confused, the model will be too.
- The four levers of effective prompts: **Context** (background the model needs), **Role** (perspective to bring), **Task** (specifically what you want done), **Format** (what the output should look like).
- Tell the model what you *want* rather than what to avoid, where you can. Positive instructions land better than negative ones.
- **Examples** (few-shot prompting) are one of the most reliable ways to steer output, especially for tone, voice, and structure. One good example is much better than none.
- **Iteration is the actual core skill.** Your first prompt is a hypothesis. The L2 user engages with the output, pushes back, refines. The L1 user takes the first thing they get and moves on. This single behavior is the strongest predictor of every other fluency behavior in the data.
- Beware the **polished output trap**. The cleaner the output looks, the more careful you should be about verifying it. Polish is not the same as accuracy.

---

## Knowledge Check

10 questions. Aim to answer in 10 to 15 minutes. Each question has one best answer; explanations follow each.

**1. According to Anthropic's prompting documentation, what's the "golden rule" of prompting?**
A) Always use the most expensive model you have access to
B) Show your prompt to a colleague with minimal context. If they'd be confused, the model will be too
C) Write the shortest prompt possible to save tokens
D) Always include at least 100 words of background context

> **Correct: B.** This is the single most useful test for whether a prompt is good. If a smart colleague couldn't follow your instructions without asking questions, the model can't either.

**2. The four levers of effective prompts covered in this module are:**
A) Speed, accuracy, cost, latency
B) Context, role, task, format
C) Length, depth, breadth, tone
D) Question, command, request, follow-up

> **Correct: B.** Context (background), role (perspective), task (specifically what you want done), and format (what output should look like). Use them as a checklist when output isn't landing.

**3. You ask AI to "write a follow-up email to the customer" and get something generic and unusable. What's the most likely problem?**
A) The model is having a bad day
B) Your prompt is missing context. The model has no idea who the customer is, what was discussed, or what tone is appropriate
C) You should have used a different model
D) Email is something AI is bad at

> **Correct: B.** This is the most common L1 failure mode: writing prompts that are perfectly clear *to the writer* because they have all the context in their head, but useless to the model because that context isn't in the prompt.

**4. Which of these instructions tends to work better in a prompt?**
A) "Don't use bullet points"
B) "Use smoothly flowing prose paragraphs"
C) Both work equally well
D) Neither works; you should specify formatting some other way

> **Correct: B.** Telling the model what you *want* tends to be more effective than telling it what to avoid. Positive instructions land better than negative ones. This is consistent guidance across Anthropic's prompting documentation.

**5. What does "few-shot prompting" mean?**
A) Prompting the model in a hurry without thinking
B) Including one or more examples in your prompt to show the model what good output looks like
C) Using only a few words in your prompt
D) Only allowing the model a few attempts before moving on

> **Correct: B.** Examples (often called "shots") are one of the most reliable ways to steer output. One good example tends to outperform a paragraph of description, especially for tone or structure.

**6. According to the AI Fluency Index, what's the single strongest predictor of every other fluency behavior?**
A) The length of the user's prompts
B) The model the user is using
C) Whether the user iterates and refines in conversation, rather than accepting the first response
D) The user's years of experience with technology

> **Correct: C.** This is one of the most important findings in the research. About 86% of substantive conversations showed iteration. Conversations with iteration showed roughly double the number of other fluency behaviors compared to single-shot use. Iteration is the keystone habit.

**7. The "polished output trap" refers to what?**
A) Output that's literally too shiny on the screen
B) The pattern where AI-generated output that looks clean and well-structured is evaluated less critically by users, even when it might be wrong
C) Spending too much time polishing your prompts
D) A specific bug in older AI models

> **Correct: B.** This is one of the most important warnings in the AI Fluency research. The cleaner the output looks, the more careful you should be about verifying it. Polish is not the same as accuracy. M05 is entirely about catching what polished output hides.

**8. According to AI Fluency research, roughly what percentage of users explicitly tell the model how they want it to interact with them (e.g., "push back if my assumptions are wrong")?**
A) Less than 5%
B) About 30%
C) About 70%
D) Over 90%

> **Correct: B.** Most users don't set the terms of the collaboration up front, which is a missed opportunity. Telling the model "push back if my framing is wrong" or "walk me through your reasoning before giving the answer" can change the dynamic of the entire conversation.

**9. You write a prompt that includes role, task, and format, but the model's output is still off. What's the most likely missing piece?**
A) You probably need a more expensive model
B) You probably need to add context: background information about the situation, audience, or constraints
C) Prompting doesn't work consistently; that's just how AI is
D) You should rewrite the prompt from scratch

> **Correct: B.** When the four levers are diagnostic, missing context is the most common gap. Role, task, and format steer the form of the output, but context is what gives the model the substance to work with. If you have all four and the output is still off, you typically need more or better context.

**10. What's the right mental frame for treating AI in a conversation?**
A) A vending machine: you put in input, you get out output, end of transaction
B) A search engine: it retrieves answers from a database
C) A conversation partner: you write a prompt as a hypothesis, then engage with the response, refine, and push back
D) An autonomous worker: you give it the goal and it figures out the rest with no further input

> **Correct: C.** The vending machine model is the L1 pattern, and it's the single biggest reason people get mediocre results. The conversation-partner model is the L2 move, and the data shows it consistently produces better output.

---

## Applied Activity: "Build Your First Real Prompt"

**Estimated time: 30 to 40 minutes**
**Submission: a final prompt + a short iteration log**
**Graded against the rubric below**

### What you'll do

Take a recurring task in your actual work and build a real prompt for it. Not a hypothetical task. A real one you do regularly. Then iterate the prompt at least three times, document what changed and why, and submit the final version along with the iteration log.

The goal is to walk away from this activity with a prompt you'll actually keep using. Treat this as the start of your personal prompt library, not a one-time exercise.

### Step 1: Pick the task

Choose something you do at least monthly. Examples that work well:
- Drafting a particular kind of email (intro, follow-up, internal update)
- Summarizing a particular kind of document or meeting
- Generating a first-draft analysis of a recurring data set
- Rewriting messy notes into a clean format

Pick something where you'd genuinely benefit from a reusable prompt.

### Step 2: Write Version 1

Write the first version of your prompt using the four levers from Lesson 2: Context, Role, Task, Format. This is your hypothesis. Don't agonize over it. Just get it written.

Run it on Claude.ai (or your preferred AI tool). Save both the prompt and the output.

### Step 3: Iterate at least three times

Look at the output critically. What's off? What's missing? What's good but could be better?

For each iteration:
- Make a specific change to the prompt (add an example, sharpen the role, tighten the format constraint, add a context detail)
- Run the new version
- Note what changed in the output

Keep iterating until you get a prompt that produces output you'd actually use as a first draft.

### Step 4: Write the iteration log

For each version of your prompt, write 1-2 sentences explaining:
- What you changed
- Why you changed it
- What effect it had on the output

This log is the most important part of the activity. The point isn't just to end up with a good prompt. It's to build the habit of noticing what changes produce what effects, which is the muscle that makes you better at prompting over time.

### Submission

Submit a single document containing:
1. The task description (one or two sentences on what this prompt is for)
2. Each version of the prompt (V1, V2, V3, etc.)
3. The iteration log entries
4. The final output the best version produced
5. A short closing note (3-5 sentences) on what you learned

### Rubric

You'll be graded on four dimensions, each on a 1 to 5 scale, for a composite out of 20.

| Dimension | 1: Minimal | 3: Solid | 5: Excellent |
|---|---|---|---|
| **Use of the four levers** | One or two of the four levers are present; output is generic | All four levers (context, role, task, format) are present and reasonably specific | All four levers are present, specific, and well-tailored to the actual task |
| **Genuine iteration** | Only minor edits between versions; iteration log shows little real engagement | Three or more meaningful iterations with clear reasoning for each change | Iterations show real diagnostic thinking; each change is targeted and the log shows genuine learning |
| **Quality of the final prompt** | Final prompt is functional but not noticeably better than V1 | Final prompt produces output that's noticeably better than V1; would be reusable | Final prompt is precise, complete, and produces output the learner would confidently use as a first draft |
| **Reflection on what was learned** | Closing note is generic or absent | Closing note identifies at least one specific insight about prompting that the learner will carry forward | Closing note shows real meta-awareness of prompting patterns; the learner has clearly built a transferable skill, not just a one-off prompt |

**Composite scoring:**
- 17 to 20: Mastery. The L2 prompting move is solidly in place; the learner has a real skill to build on.
- 13 to 16: Solid. The frame is right, with room to deepen on iteration or specificity.
- 9 to 12: Developing. Mechanics are present but the learner is still treating prompting as a single-shot effort. Revisit Lesson 4.
- Below 9: Restart. Work through the module again before moving to M05.

---

## Sources and attribution

This module draws on the following Anthropic-published material:

- **Prompting best practices** (Claude API documentation). Source for the golden rule, the four-lever framing, the brilliant-new-employee analogy, the guidance on positive vs. negative instructions, and the patterns for using examples. https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
- **Anthropic Education Report: The AI Fluency Index** (Swanson et al., February 2026). Source for the empirical data on iteration as the keystone fluency behavior, the polished-output trap, and the 30% figure on users setting the terms of collaboration. https://www.anthropic.com/research/AI-fluency-index
- **AI Fluency: Framework & Foundations** (Dakan, Feller & Anthropic, 2025). Source for the framing of Description as a craft within the 4Ds. Released under CC BY-NC-SA 4.0. https://anthropic.skilljar.com/ai-fluency-framework-foundations

The 4D AI Fluency Framework (Delegation, Description, Discernment, Diligence) was developed by Prof. Rick Dakan (Ringling College of Art and Design) and Prof. Joseph Feller (University College Cork) in collaboration with Anthropic. Released under CC BY-NC-SA 4.0.

This module is part of the Gong Brainstorm program. Gong-specific framing (level transitions, learner journey, GTM context) added by the program team.
