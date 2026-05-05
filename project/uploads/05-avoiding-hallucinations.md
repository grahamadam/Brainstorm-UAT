# M05 · Avoiding Hallucinations

**AI 101 · Module 5 of 7**
**Estimated time: 30 minutes content + 10 to 15 minute knowledge check + applied activity**
**Level transition: This module addresses the most consequential L1 → L2 shift. The L1 user trusts what the model produces. The L2 user verifies it.**

---

## Module brief

In M04 you learned how to get good output from an AI model. In M05 you're going to learn that "good output" and "true output" aren't the same thing.

The single most consequential failure mode of large language models is the hallucination: a confident, plausible, well-written claim that turns out to be factually wrong or made up. This isn't a bug that's about to be fixed. It's a structural feature of how these models work. Understanding why hallucinations happen, when they're most likely, and how to catch them isn't optional knowledge for an L2 user. It's the discipline that prevents real damage in your work.

In the 4Ds framework, this is the **Discernment** competency: evaluating what the model gives you with a critical eye. The AI Fluency Index research found that this is the area where most users fall furthest behind, especially when the AI produces output that looks polished. The good news is that discernment is learnable. There are specific patterns to look for, specific habits to build, and a verification practice that, once it's a reflex, will protect you from the kinds of mistakes that hurt customers and burn credibility.

This module is the most directly practical one in the literacy and craft halves combined. By the end, you should be able to look at any AI-generated output and have a working sense of where the risks are, what to verify, and how to verify it.

## Learning objectives

By the end of this module you should be able to:

1. Explain, in plain language, why language models hallucinate.
2. Identify the conditions under which hallucinations are most likely to occur.
3. Recognize the specific signals that flag potential hallucinations in real output.
4. Apply a consistent verification practice to any AI-generated work before you ship it under your name.

---

## Lesson 1: Why models hallucinate

Recall from M01 that an LLM works by predicting the most likely next piece of text, one piece at a time, based on patterns it learned during training. Sit with that for a moment, because the answer to "why do they hallucinate" is hiding in plain sight in that definition.

The model is producing **statistically likely text**. Sometimes the statistically likely text is also true. Often, when the topic is well-represented in training data and the answer is unambiguous, it is. But the model is not checking whether the text is true as it writes. It's checking whether the text is *probable*. Those are not the same standard, and that gap is where hallucinations live.

Anthropic's own [interpretability research](https://www.anthropic.com/research/tracing-thoughts-language-model) has uncovered a more specific picture. Researchers have found that inside the model there are two competing mechanisms at play. One identifies "known entities" that the model has seen patterns about during training. Another corresponds to "I don't know this" or "I can't answer this." Their correct interplay is what guards models from hallucinating.

When this works, asking about a topic the model wasn't well-trained on triggers the "I don't know" response. But the mechanism can misfire. As Anthropic puts it, sometimes Claude recognizes a name but doesn't know much else about that person. In those cases, the "known entity" feature can fire and incorrectly suppress the "don't know" feature. The model then proceeds to confabulate, generating a plausible but unfortunately untrue response.

The takeaway for you isn't the technical detail. It's this: hallucinations aren't the model "lying" or "trying to deceive." There's no intent. The model is producing statistically likely text under conditions where its internal "I don't know this" signal failed to override its "I can answer this" signal. The output is wrong, but it's wrong the same way a confidently incorrect human is wrong: it filled in a gap with something that sounded right.

This framing matters because it changes how you respond. You don't argue with the model. You verify the output.

> **Try this (3 minutes).** Open Claude.ai and ask it: *"Why do AI models hallucinate? Explain in your own words, then specifically address: is the model 'lying' when it does this? What's actually happening inside?"* Read the answer. Notice that the model itself can articulate this clearly. The fact that it can describe the failure mode doesn't prevent the failure mode from happening. Self-awareness about the limitation isn't the same as the limitation going away.

---

## Lesson 2: When hallucinations are most likely

Hallucinations are not equally likely across all kinds of questions. There are specific patterns that make them dramatically more probable, and recognizing those patterns is half the battle. Here are the conditions under which you should be on highest alert.

### Specific factual claims about obscure things

The model is most likely to hallucinate when asked for specific facts about things it didn't see much of in training. The population of a small town. A quote from a specific page of a specific book. The contents of an obscure paper. Statistics about a niche topic. These are exactly the kinds of questions where the "known entity" mechanism is most likely to misfire. The model recognizes that there's a real thing being asked about, but it doesn't actually have reliable information, so it generates plausible-sounding content to fill the gap.

If you're asking AI for specific numbers, dates, quotes, or names from a low-traffic topic area, treat the output as a hypothesis until verified. Always.

### Citations and sources

This is one of the most common and most dangerous patterns. AI models are infamous for inventing citations: plausible-sounding paper titles, author names, journal names, page numbers, and DOIs that simply don't exist. The format is right. The content is fabricated. Lawyers have been sanctioned for filing AI-generated briefs containing fake case citations. Researchers have published papers with invented references. This isn't a hypothetical risk. It happens often.

If you ever ask AI to provide sources or citations, the verification rule is non-negotiable: **check every single one** before relying on it. Don't trust the URL. Don't trust the author name. Click through, search the actual journal, confirm the source exists and says what the model claims it says.

### Recent events past the knowledge cutoff

Models have a knowledge cutoff. Without web search enabled, anything that happened after that date is territory where the model has no real information but may still produce confident answers about it. M01 covered this in the vocabulary, and M03 covered the broader trend. The risk for verification is straightforward: anything time-sensitive or news-related needs to be cross-checked, period.

### Anything you don't have your own knowledge of

This one is the most uncomfortable, but the most important. Hallucinations are easier to spot when you know enough about the topic to recognize that something is off. They're hardest to spot when the model is your only source of information, because you have no way to evaluate what you're reading.

The implication is sobering: **you are most at risk of accepting hallucinations in exactly the topic areas where you most need help.** This is why discernment isn't just a check after the fact. It's a habit of asking, before you trust any output: do I have enough independent knowledge to evaluate this, or am I taking it on faith?

### Polished, confident-sounding output

The AI Fluency Index research found that when AI produces output that *looks* finished (working code, a clean document, a confident analysis), users actually evaluate it less critically than they evaluate rougher output. This is the polished output trap from M04, and it shows up here too. Polish is not accuracy. The cleaner the output looks, the more disciplined you have to be about checking it.

> **Try this (3 minutes).** Pick a topic you genuinely don't know much about. Ask AI for five specific factual claims about it (e.g., "give me five specific facts about the history of [obscure topic]"). Now try to verify each one. Use Wikipedia, primary sources, search engines, whatever you have. Notice how much friction there is in verification, and how easily it would have been to just accept the AI's output as fact. That gap is the hallucination risk in your daily work.

---

## Lesson 3: The signals that flag possible hallucinations

You won't always have time to verify everything in everything you generate. So part of L2 discernment is developing pattern recognition for the specific signals that suggest "this might be a hallucination, slow down and check."

Here are the signals worth training yourself to notice.

**Suspiciously specific details about a topic that's hard to verify.** When the model offers a precise number, a specific date, or a granular detail that would require external checking and has no obvious source, treat it with extra suspicion. The very specificity that makes it sound credible is what should make you skeptical.

**Round numbers in surprising places.** Real statistics tend to be messy. "23.7% of customers" is plausible. "25% of customers" is suspicious unless there's a clear reason it'd be a round number. The model has a tendency to generate round numbers when it's filling in a gap because round numbers feel canonical.

**Confident attribution to "studies show" or "research finds" without specifics.** If the model says "studies show that X" without naming the study, the year, the researchers, or providing a citation, the cited finding may not exist. If you ask for the source and it produces one immediately and confidently, that source still needs to be checked. Confident-sounding sources are the most likely category to be fabricated.

**Quotes attributed to real people.** If the model produces a direct quote attributed to a real person, especially a specific quote about a specific topic, the verification bar should be very high. Real quotes can be checked. Fabricated ones often can't, and the model is happy to produce convincing-sounding quotes that the supposed speaker never said.

**Detailed descriptions of obscure things.** If the model produces a richly detailed description of something niche (a conference, a product, a person, a paper), and you can't easily verify the basic existence of the thing being described, the details are likely fabricated even if the existence isn't.

**Confidence that doesn't match the difficulty of the question.** This is more of a feel than a checklist item, but it matters. When you ask a hard question and get back a smooth, confident, well-structured answer with no caveats, that's a signal. Real expertise tends to come with hedges and qualifications. Hallucinations often don't.

**A mismatch between the topic's complexity and the response's tidiness.** Reality is messy. If the model gives you a clean, simple answer to a question that should have nuance, ambiguity, or competing perspectives, the cleanness might be artificial.

> **Try this (3 minutes).** Pick a piece of AI-generated work you've created recently. Read through it slowly, looking specifically for the signals above. How many do you notice? For each one you notice, ask yourself: did I verify that, or did I take it on faith? You don't need to fix anything yet. Just calibrate your eye.

---

## Lesson 4: The verification practice

Knowing the signals is half the work. The other half is having a verification practice that you actually run, every time, before AI output goes out under your name.

Here's a simple practice you can adopt today.

### The pre-publish checklist

Before you ship anything that AI helped you produce, run through this:

1. **What in this output would matter if it were wrong?** Identify the load-bearing claims: facts, numbers, quotes, citations, names, dates. Anything that, if false, would damage credibility or cause harm.

2. **What of that have I personally verified?** Be honest. Verification means you checked an independent source, not just that the output sounded right.

3. **What can be verified now, in the next few minutes?** Anything verifiable should be verified. Citations: click through. Numbers: search for the source. Quotes: find the original. Names: confirm spelling and identity.

4. **What can't be verified, and what does that mean for the output?** Sometimes you can't fully verify a claim in the time available. Then your options are: cut it, soften it ("typically" instead of a specific stat), or flag the uncertainty in the output itself.

5. **Does the polished surface match the actual confidence I have?** This is the gut-check. If the output is written confidently but you can't actually back the claims, that gap is your problem to close.

This whole pass takes a few minutes for most pieces of work. It's not optional. The cost of skipping it shows up the moment something wrong reaches a customer or a teammate.

### Specific techniques from Anthropic's documentation

A few techniques from Anthropic's [hallucination guidance](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations) work directly in your prompt to reduce the rate of hallucinations in the first place:

**Give the model permission to say "I don't know."** This sounds obvious, but it matters. Models are sometimes biased toward producing an answer rather than admitting uncertainty. Adding "if you don't know or aren't sure, say so" to your prompts reduces fabrication rates.

**Ask for source quotes when working with documents.** If you've given the model a long document to work with, ask it to extract relevant direct quotes from the document before producing its analysis. This grounds the response in the actual text and makes it harder for the model to drift into fabrication.

**Ask for citations alongside claims.** Have the model cite its sources for each significant claim, then verify the citations. If the model can't produce a citation, it has to retract the claim.

**Compare multiple outputs.** Run the same prompt twice (or use a different model the second time). If the answers are inconsistent on a factual claim, that's a signal that one of them is fabricated.

**Ask the model to verify itself.** After producing an output, ask: "Look back at what you just wrote. Are there any specific factual claims you're not actually confident about? Mark them." The model is sometimes able to flag its own uncertainty when explicitly asked.

These techniques don't eliminate hallucinations. Nothing does. But they significantly reduce the rate, and combined with the pre-publish checklist, they make hallucinations a manageable risk rather than a constant exposure.

### The mindset to carry forward

The L2 mindset on output is: trust nothing on first read. This sounds harsh, but it's the practical reality, and once it becomes a habit, it stops feeling like extra work. It's just how you work.

You're not paranoid. You're a professional who knows the failure mode of the tool you're using and adjusts accordingly. The same way a doctor double-checks a dosage, the same way a pilot runs a pre-flight checklist, the same way a lawyer cite-checks a brief. The work is part of using the tool well.

---

## Key takeaways

- Hallucinations are a structural feature of how language models work, not a bug. The model produces statistically likely text, which is sometimes (but not always) the same as true text.
- Anthropic's interpretability research has identified specific internal mechanisms that produce hallucinations, including a misfire of the "known entity" feature when the model recognizes a name but lacks deeper information about it.
- Hallucinations are most likely in: **specific factual claims about obscure topics**, **citations and sources**, **recent events past the knowledge cutoff**, **topics you don't have independent knowledge of**, and **polished, confident-sounding output** of any kind.
- Specific signals to watch for: **suspiciously specific details**, **round numbers in surprising places**, **vague "studies show" claims**, **direct quotes attributed to real people**, **detailed descriptions of obscure things**, and **confidence that doesn't match the difficulty of the question**.
- The L2 verification practice has a pre-publish checklist: identify load-bearing claims, verify what's verifiable, cut or soften what isn't, and gut-check whether the polished surface matches your actual confidence.
- Specific in-prompt techniques reduce the rate of hallucinations: **give the model permission to say "I don't know"**, **ask for source quotes from documents**, **request citations**, **compare multiple outputs**, and **ask the model to flag its own uncertainty**.
- The mindset: trust nothing on first read. Verify before you ship. This is professional practice, not paranoia.

---

## Knowledge Check

10 questions. Aim to answer in 10 to 15 minutes. Each question has one best answer; explanations follow each.

**1. Why do AI models hallucinate?**
A) They're intentionally trying to deceive users
B) They're producing statistically likely text, and sometimes the statistically likely text is not true. There's no fact-checking step in the underlying mechanism
C) The internet has too much misinformation in it
D) Hallucinations only happen with poorly trained models; well-trained models don't hallucinate

> **Correct: B.** This is the core mechanism. The model is predicting probable text, not checking truth. Sometimes those align; often enough they don't, especially in the conditions covered in Lesson 2. This isn't a flaw that's about to be patched. It's structural.

**2. According to Anthropic's interpretability research, what's one of the specific mechanisms behind hallucinations?**
A) The model's training data contains intentional falsehoods
B) A misfire where the "known entity" feature fires (because the model recognizes a name) but the "I don't know this" feature fails to also fire (because the model doesn't actually have deep information), leading to confabulation
C) A bug in the transformer architecture
D) Random noise in the GPU computation

> **Correct: B.** Anthropic has published research mapping this specific failure pattern. The takeaway isn't the technical detail; it's that hallucinations are an emergent property of how the model handles uncertainty internally, not a sign of malice or carelessness.

**3. Which type of question is most likely to produce a hallucination?**
A) "What's the capital of France?"
B) "Help me restructure this awkward sentence"
C) "Give me a quote from page 47 of [a specific obscure book]"
D) "Summarize the following email I'm pasting in"

> **Correct: C.** Specific factual claims about obscure things, especially with precise details that sound verifiable, are exactly the conditions where hallucination rates spike. A and B are well within the model's reliable range. D is bounded by the input you provide.

**4. AI-generated citations (paper titles, author names, journal references) should be:**
A) Trusted, since the model has access to academic databases
B) Treated with extreme suspicion. Every single citation should be verified independently before being used
C) Trusted if they look correctly formatted
D) Trusted if the model says they're real when asked

> **Correct: B.** AI models routinely invent plausible-sounding citations. This has caused real-world incidents: lawyers sanctioned for fake citations in briefs, researchers retracting papers. The verification rule for citations is non-negotiable: check every single one.

**5. The most uncomfortable but important truth about hallucinations is:**
A) They only happen in very specific edge cases
B) You are most at risk of accepting hallucinations in exactly the topic areas where you most need help, because you don't have the independent knowledge to evaluate the output
C) They're easy to spot if you read carefully
D) They're decreasing rapidly and will be gone within a year

> **Correct: B.** This is the discomfort that makes discernment so important. The natural use case for AI is to help you with things you don't know well, but those are exactly the cases where you can't independently evaluate the output. It's why a verification practice has to be a habit, not a judgment call.

**6. According to the AI Fluency Index, when AI produces polished-looking output, users tend to:**
A) Evaluate it more critically
B) Evaluate it less critically, even though polish is not the same as accuracy
C) Always verify it before using it
D) Reject it as suspicious

> **Correct: B.** This is the polished output trap. The cleaner the output looks, the more disciplined you have to be. The data shows users do the opposite: they slack off on verification when output looks finished. The L2 move is to invert that instinct.

**7. Which of the following is a signal that an AI-generated claim might be a hallucination?**
A) The output uses good grammar
B) The output is well-structured
C) The output presents a confident, smooth, clean answer to a hard question with no hedges or caveats
D) The output is longer than 200 words

> **Correct: C.** Real expertise tends to come with qualifications. When you ask a hard question and get back a too-clean answer, that's a signal that the model may have papered over uncertainty rather than actually knowing the answer. Mismatch between question difficulty and response confidence is one of the better hallucination signals.

**8. Which of the following is *not* a recommended technique for reducing hallucinations?**
A) Giving the model permission to say "I don't know"
B) Asking for direct quotes from the source documents you've provided
C) Asking the model to be as confident as possible to avoid wishy-washy outputs
D) Comparing multiple outputs from the same prompt to catch inconsistencies

> **Correct: C.** Asking for confidence is the *opposite* of what helps. Confidence in the model's output is exactly the signal you can't trust. Anthropic's documentation specifically recommends giving the model permission to admit uncertainty as one of the most effective hallucination-reduction techniques.

**9. The pre-publish checklist for AI-generated work includes which of the following?**
A) Checking that it sounds confident
B) Identifying the load-bearing claims, verifying what can be verified, cutting or softening what can't, and gut-checking whether the polished surface matches your actual confidence in the content
C) Always running it through a second AI to fact-check
D) Trusting it if you can't immediately spot anything wrong

> **Correct: B.** This is the L2 practice. It takes a few minutes for most work, and it's not optional. The cost of skipping it shows up the moment something wrong reaches a customer.

**10. The L2 mindset on AI output is:**
A) Trust the model; it's smarter than you in most domains
B) Trust nothing on first read. Verify what's verifiable before you ship anything under your name. This isn't paranoia; it's professional practice
C) Reject AI output entirely; it's not safe to use
D) Use AI output but don't worry about verification; readers will catch errors

> **Correct: B.** This is the discipline that prevents real damage. It sounds harsh in the abstract, but in practice it's just how you work, the same way other professionals build verification into their workflows. The L1 user assumes the output is right unless something obvious is wrong. The L2 user assumes the output is a hypothesis until verified.

---

## Applied Activity: "The Annotated Output"

**Estimated time: 30 to 40 minutes**
**Submission: an annotated piece of AI-generated work + a short reflection**
**Graded against the rubric below**

### What you'll do

Take a real piece of work that AI helped you produce. Annotate every factual claim. Identify what you actually verified versus what you took on faith, and find at least one error or weak claim.

This is a discernment exercise, and it's the most directly practical activity in the course. The goal is to make verification a reflex, and the only way to build that reflex is to do it deliberately a few times until it's automatic.

### Step 1: Pick the work

Choose a piece of AI-generated work that contains at least 5 factual or substantive claims. Examples:
- A summary of an article or report
- A research note on an account, market, or topic
- A draft analysis or recommendation
- An informational document with specific facts in it

If you don't have something handy, generate one fresh: ask AI for a 300-400 word briefing on a specific topic in your domain, with at least 5 specific factual claims included.

### Step 2: Annotate

Go through the piece sentence by sentence. For every factual claim, mark it with one of the following:

- **[Verified]** You independently checked this and it's correct
- **[Took on faith]** You trusted it without checking
- **[Suspicious]** Something about this raises a hallucination signal (specificity, round numbers, citation, quote, etc.)
- **[Wrong]** You verified it and it's actually incorrect

Be honest. The point isn't to look good. It's to notice the actual ratio of verified-to-not-verified content in real AI-generated work.

### Step 3: Find at least one error

If you don't find any errors on the first pass, go deeper. Pick the claims you're least sure about and verify them. Check citations. Cross-check numbers. Search for quotes. The goal is to find at least one thing that's actually wrong, weak, or unverifiable.

If after thorough checking you genuinely can't find any errors, that's a meaningful result. Note that in your reflection, and explain how you verified.

### Step 4: Write the reflection

Write 200-300 words answering:

1. What did the verification process reveal? Specifically, what was the ratio of verified to taken-on-faith claims in the original?
2. What error or weak claim did you find, and what would have happened if you'd shipped it?
3. What's one specific habit you'll build going forward?

### Submission

Submit a single document containing:
1. The original AI-generated piece (or a copy of it)
2. The annotated version, with every factual claim marked
3. A note on what you found wrong, weak, or unverifiable
4. The 200-300 word reflection

### Rubric

You'll be graded on four dimensions, each on a 1 to 5 scale, for a composite out of 20.

| Dimension | 1: Minimal | 3: Solid | 5: Excellent |
|---|---|---|---|
| **Thoroughness of annotation** | Many factual claims left unmarked; reflection shows the learner skimmed | All substantive claims are marked with one of the four categories | Every factual claim is marked; the annotation shows real diagnostic care |
| **Honesty about what was verified** | Most claims marked "verified" without evidence of actual verification | Honest split between verified and taken-on-faith, reflecting real practice | Honest assessment with specific notes on how verification was done for each |
| **Identification of an error or weak claim** | No error found, no real verification effort visible | At least one error or weak claim identified, with explanation of why it was suspect | At least one error found, with detail on how it was caught and what would have happened if shipped |
| **Quality of the reflection** | Generic, surface-level reflection | Identifies a specific habit to build going forward, tied to something concrete from the exercise | Reflection shows real meta-awareness; the habit identified is durable and tied to a specific risk the learner now sees clearly |

**Composite scoring:**
- 17 to 20: Mastery. Discernment is a working reflex, not just a concept.
- 13 to 16: Solid. The frame is right, with room to deepen on thoroughness or honesty.
- 9 to 12: Developing. The exercise was completed but the verification habit isn't quite landing yet. Revisit Lesson 4.
- Below 9: Restart. Work through the module again before moving to M06.

---

## Sources and attribution

This module draws on the following Anthropic-published material:

- **Reduce hallucinations** (Claude API documentation). Source for the basic and advanced techniques: permission to say "I don't know," direct quote grounding, citation verification, chain-of-thought verification, best-of-N comparison, iterative refinement, and external knowledge restriction. https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
- **Tracing the thoughts of a large language model** (Anthropic, March 2025). Source for the interpretability findings on the "known entity" feature, the "I don't know" feature, and the misfire pattern that produces confabulation. https://www.anthropic.com/research/tracing-thoughts-language-model
- **Anthropic Education Report: The AI Fluency Index** (Swanson et al., February 2026). Source for the polished output trap and the empirical patterns of decreased critical evaluation when AI produces polished outputs. https://www.anthropic.com/research/AI-fluency-index

The 4D AI Fluency Framework (Delegation, Description, Discernment, Diligence) was developed by Prof. Rick Dakan (Ringling College of Art and Design) and Prof. Joseph Feller (University College Cork) in collaboration with Anthropic. Released under CC BY-NC-SA 4.0.

This module is part of the Gong Brainstorm program. Gong-specific framing (level transitions, learner journey, GTM context) added by the program team.
