# AI Trainer — Content Engine Flow

## Overview

The content engine is the admin-side pipeline that converts a raw source (URL or document) into a published learning module. It involves four systems: the admin UI, the Supabase database, the Anthropic API, and the live learner content tables.

---

## Full Flow (step by step)

```
Graham on /admin/content
        │
        ▼
Step 1: Source Ingestion
SourceIngestion component
— Graham pastes a URL or uploads a document
— Selects tier (1, 2, or 3)
— Hits "Generate Module"
        │
        ▼
Step 2: Source saved first
POST /api/content/generate
— Creates a row in sources table
  { url, tier, source_type: 'url', ingested_by: userId }
— Server fetches the URL content (fetch() + HTML parsing)
  or reads the uploaded document
— Saves raw_content to the sources row
        │
        ▼
Step 3: Anthropic API call
Still inside /api/content/generate
— Constructs the prompt (see Prompt Structure below)
— Calls Claude with the raw source content
— Receives structured JSON back
— Creates a row in content_drafts table
  { source_id, generated_content: <Claude's JSON>, status: 'pending_review' }
— Returns { draftId } to the frontend
        │
        ▼
Step 4: Redirect to review
Frontend receives draftId
— Navigates to /admin/content/review/[draftId]
        │
        ▼
Step 5: Graham reviews
ModuleReview component renders the draft
— Left panel: source summary or link
— Right panel: structured module preview
  (module title, lessons, lesson content, knowledge check questions)
— Graham can edit inline (title, lesson text, question wording)
— Graham selects which journey this belongs to (dropdown)
— Hits "Approve and Publish"
        │
        ▼
Step 6: Publish
POST /api/content/publish
— Receives: draftId, journeyId, any edits Graham made
— Reads content_drafts row
— Writes structured content into real tables (in a transaction):
    1. INSERT into modules (linked to journeyId, sourceId)
    2. For each lesson: INSERT into lessons (linked to moduleId)
    3. For each knowledge check: INSERT into knowledge_checks (linked to lessonId)
    4. Updates content_drafts.status = 'approved'
— Returns success
        │
        ▼
Module is now live for learners
```

---

## Prompt Structure

### System Prompt

```
You are a curriculum designer creating training modules for GTM professionals
at a B2B SaaS company. Your job is to synthesize provided source content into
structured learning modules.

You must respond with ONLY valid JSON in the following exact structure —
no preamble, no explanation, no markdown fences:

{
  "module": {
    "title": "string",
    "description": "string (2-3 sentences)",
    "estimated_total_minutes": number,
    "lessons": [
      {
        "title": "string",
        "order_index": number (starting at 1),
        "estimated_minutes": number,
        "content": "string (markdown formatted lesson body)",
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
- Create 2-4 lessons per module
- Each lesson should have 1-2 knowledge check questions
- Write for GTM professionals (AEs, CSMs, SDRs) — practical, not academic
- Lesson content should be scannable: use headers, bullets, short paragraphs
- Knowledge check questions should test application, not just recall
- Keep lesson content focused: one core concept per lesson
```

### User Prompt (constructed per request)

```
Source tier: [1 | 2 | 3]
[If tier 3]: This is proprietary internal content — treat with highest relevance.

Source content:
[raw_content from sources table]

Generate a training module from this content following the exact JSON structure specified.
```

### Why JSON-only with a strict system prompt

If Claude responds conversationally and you try to extract the module from prose, you'll eventually get a response that breaks your parser. The system prompt that demands JSON-only output is your contract with the API. When it breaks on edge case inputs, catch it in the API route's error handling and surface it to Graham in the review UI rather than crashing silently.

---

## Publish Operation (pseudocode)

```typescript
// /api/content/publish

const draft = await getDraft(draftId)
const content = draft.generated_content  // JSON Claude produced

// Run everything inside a Postgres transaction
// All-or-nothing: if anything fails, nothing is written

// 1. Create the module row
const module = await insertModule({
  journey_id: journeyId,
  source_id: draft.source_id,
  title: content.module.title,
  description: content.module.description,
  order_index: await getNextModuleOrder(journeyId),
  is_published: true
})

// 2. Create each lesson row
for (const lesson of content.module.lessons) {
  const lessonRow = await insertLesson({
    module_id: module.id,
    title: lesson.title,
    content: lesson.content,
    order_index: lesson.order_index,
    estimated_minutes: lesson.estimated_minutes,
    is_published: true
  })

  // 3. Create knowledge check rows
  for (const kc of lesson.knowledge_checks) {
    await insertKnowledgeCheck({
      lesson_id: lessonRow.id,
      question: kc.question,
      options: kc.options,        // stored as jsonb
      correct_index: kc.correct_index,
      explanation: kc.explanation,
      order_index: kc.order_index
    })
  }
}

// 4. Mark draft as approved
await updateDraft(draftId, {
  status: 'approved',
  reviewed_by: userId,
  reviewed_at: now()
})
```

**Critical:** The entire publish operation must be wrapped in a Postgres transaction. Either all rows are written or none are. A half-published module (module row exists, lessons don't) would corrupt the learner experience. Use Supabase RPC (stored procedure) or the Supabase JS client's transaction support.

---

## Generated Content JSON Shape

This is what Claude returns and what gets stored in `content_drafts.generated_content`:

```json
{
  "module": {
    "title": "Understanding Large Language Models",
    "description": "An introduction to how LLMs work and why they matter for GTM teams.",
    "estimated_total_minutes": 20,
    "lessons": [
      {
        "title": "What is an LLM?",
        "order_index": 1,
        "estimated_minutes": 8,
        "content": "## What is a Large Language Model?\n\nA large language model is...",
        "knowledge_checks": [
          {
            "question": "Which best describes how an LLM generates a response?",
            "options": [
              "It searches a database of pre-written answers",
              "It predicts the most likely next token based on context",
              "It connects to the internet to find information",
              "It follows a set of hard-coded rules"
            ],
            "correct_index": 1,
            "explanation": "LLMs work by predicting the next token in a sequence based on patterns learned during training — not by searching or following rules.",
            "order_index": 1
          }
        ]
      }
    ]
  }
}
```

---

## Files Involved

| File | Role |
|---|---|
| `app/admin/content/page.tsx` | Source ingestion UI |
| `app/admin/content/review/[draftId]/page.tsx` | Review and approve UI |
| `components/admin/SourceIngestion.tsx` | URL/file input component |
| `components/admin/ModuleReview.tsx` | Draft review component |
| `components/admin/PublishControls.tsx` | Approve/reject action bar |
| `app/api/content/generate/route.ts` | Save source + call Claude + create draft |
| `app/api/content/publish/route.ts` | Promote draft to live content tables |
| `lib/anthropic/client.ts` | Anthropic client, system prompt, user prompt builder |
