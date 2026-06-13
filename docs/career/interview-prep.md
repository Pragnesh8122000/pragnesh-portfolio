# 🎤 Interview Prep — AI Engineer Roles @ 20+ LPA

> **Interview = 50% technical, 30% system design, 20% culture fit.**
> **Master these questions. You'll be in top 10% of candidates.**

---

## 📚 The 4-round structure (typical AI Engineer interview)

| Round | Focus | Duration | What they test |
|-------|-------|----------|----------------|
| 1 | Online assessment / DSA | 60-90 min | Coding, problem solving |
| 2 | Technical phone screen | 45-60 min | AI concepts, your projects |
| 3 | System design / Take-home | 60-90 min | Design an AI system end-to-end |
| 4 | Onsite (3-4 hours) | All of the above + behavior | Senior engineers, hiring manager |

---

## 🔢 Round 1: DSA / Coding (LeetCode)

**Target:** 200 problems solved. Pass rate jumps from 30% to 90%.

### The 75 problems you actually need

**Arrays & Hashing (15):**
- Two Sum, Contains Duplicate, Group Anagrams, Top K Frequent, Product of Array Except Self, etc.

**Strings (10):**
- Valid Anagram, Longest Substring Without Repeating, Longest Palindromic Substring, etc.

**Sliding Window (5):**
- Best Time to Buy and Sell Stock, Longest Repeating Character Replacement, etc.

**Linked Lists (5):**
- Reverse, Merge Two Sorted, Detect Cycle, etc.

**Trees (10):**
- Invert, Max Depth, Same Tree, Level Order, Validate BST, etc.

**Graphs (8):**
- Number of Islands, Clone Graph, Course Schedule, Pacific Atlantic Water Flow, etc.

**Dynamic Programming (10):**
- Climbing Stairs, Coin Change, Longest Increasing Subsequence, Word Break, etc.

**Backtracking (5):**
- Subsets, Permutations, Combination Sum, Word Search, etc.

**Heaps, Stacks, Queues (7):**
- Kth Largest Element, Valid Parentheses, Daily Temperatures, etc.

**Resources:**
- [NeetCode 75](https://neetcode.io/practice) — the curated list
- [Blind 75](https://www.teamblind.com/post/new-year-gift-blind-75) — alternative
- [LeetCode Patterns](https://seanprashad.com/leetcode-patterns/) — by topic

### Study plan
- **2 problems/day for 100 days** = 200 problems. Pass any coding interview.
- Spend 30 min trying. If stuck, read solution. Re-code from memory next day.
- Focus on **Medium** difficulty. Hard is bonus.

---

## 🤖 Round 2: AI/LLM Technical Questions

These are asked at EVERY AI Engineer interview. Memorize answers to these.

### Q1: "Explain the transformer architecture."

**Answer (2-3 min):**
> Transformers process sequences in parallel using self-attention. The key insight is that instead of processing tokens one by one (like RNNs), every token can "look at" every other token in the sequence simultaneously.
>
> The architecture has an encoder and decoder, both made of stacked blocks. Each block has:
> 1. **Multi-head self-attention** — each token creates query, key, value vectors. Attention is computed as `softmax(QK^T / sqrt(d_k)) * V`. Multiple heads let the model attend to different relationships.
> 2. **Feed-forward network** — applied position-wise.
> 3. **Residual connections + layer norm** — for training stability.
> 4. **Positional encoding** — added to embeddings to give the model position info.
>
> For LLMs like GPT, we use only the **decoder** part with causal (masked) attention — each token can only see previous tokens. Pre-training is next-token prediction on huge text corpora.
>
> The key advantage: parallelizable, captures long-range dependencies, scales with data + compute.

### Q2: "What is RAG? When do you use it vs fine-tuning?"

**Answer (3 min):**
> RAG = Retrieval-Augmented Generation. Instead of relying on the model's training data, we retrieve relevant documents at query time and inject them into the prompt.
>
> The flow: user query → embed query → search vector DB → get top-k chunks → put chunks in prompt → LLM generates answer with citations.
>
> **Use RAG when:**
> - Data changes frequently (news, docs, company knowledge)
> - You need citations / sources
> - You can't fine-tune (cost, time, expertise)
> - Data is too large to fit in context
> - Hallucination is unacceptable
>
> **Use fine-tuning when:**
> - You need the model to learn a specific style, format, or tone
> - You have a stable, curated dataset
> - You need to teach the model new skills, not facts
> - Latency is critical (fine-tuned small model > big model with RAG)
>
> **Best: combine both.** Fine-tune for style/format, RAG for facts.

### Q3: "How do you evaluate a RAG system?"

**Answer (3 min):**
> Eval has 3 dimensions:
>
> **1. Retrieval quality:**
> - Context precision: are the retrieved chunks relevant?
> - Context recall: did we retrieve ALL the relevant chunks?
> - Hit rate, MRR, NDCG
>
> **2. Generation quality:**
> - Faithfulness: is the answer grounded in the retrieved context? (no hallucination)
> - Answer relevancy: does it answer the actual question?
> - Answer correctness: vs ground truth
>
> **3. End-to-end:**
> - User feedback (thumbs up/down)
> - A/B testing different pipelines
> - Cost per query, latency
>
> **Tools:** RAGAS, LangSmith, custom eval sets.
>
> **Pro tip:** Always start with a 50-100 question golden eval set. Tweak the pipeline. Re-run eval. Track in a dashboard.

### Q4: "How do you reduce LLM costs in production?"

**Answer (3 min):**
> 1. **Use the right model size.** GPT-4o-mini / Claude Haiku for 80% of queries. Escalate to big models only for hard cases (router pattern).
>
> 2. **Cache aggressively.** Exact match cache (Redis) for repeated queries. Semantic cache for similar queries. Can cut costs 50-80%.
>
> 3. **Reduce prompt size.** Truncate context, summarize history, remove unnecessary system prompt parts.
>
> 4. **Streaming + early stopping.** Don't generate more tokens than needed.
>
> 5. **Batch API calls.** OpenAI offers 50% discount on batch jobs.
>
> 6. **Use embeddings, not LLMs, where possible.** Classification, similarity, search.
>
> 7. **Self-host smaller models.** Llama 3 8B on a GPU can be 10x cheaper than GPT-4 for simple tasks.
>
> 8. **Token budgets.** Set per-user limits. Alert on anomalies.
>
> Real example: a RAG system I built went from $2000/month to $300/month with semantic caching + smaller models + better chunking.

### Q5: "Explain self-attention."

**Answer (2 min):**
> Self-attention lets each token in a sequence "look at" every other token and decide how much to focus on each.
>
> For each token, we project its embedding into 3 vectors: **Query (Q), Key (K), Value (V)**.
>
> To compute attention for a token: take its Q, dot it with every K in the sequence, scale, softmax, then take weighted sum of V's.
>
> `Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) * V`
>
> Multi-head attention runs this in parallel with different learned projections, then concatenates — letting the model attend to different kinds of relationships (syntactic, semantic, positional) simultaneously.
>
> Why it works: it lets the model build context-aware representations. The word "bank" in "river bank" vs "savings bank" gets different representations because the attention weights to surrounding words are different.

### Q6: "What's the difference between encoder and decoder models?"

**Answer (1 min):**
> **Encoder (BERT, RoBERTa):** bidirectional attention, sees full context. Best for understanding tasks — classification, NER, embeddings, retrieval.
>
> **Decoder (GPT, Llama):** causal/masked attention, only sees left context. Best for generation — text, code, chat.
>
> **Encoder-decoder (T5, BART):** both. Best for seq2seq — translation, summarization, Q&A.

### Q7: "How does RLHF work?"

**Answer (2 min):**
> Reinforcement Learning from Human Feedback. 3 steps:
>
> 1. **Pretrain** a base LM on huge text (next token prediction).
> 2. **Collect human preferences.** Show humans two model outputs, ask which is better. Build a preference dataset.
> 3. **Train a reward model** on these preferences — it learns to predict what humans prefer.
> 4. **Fine-tune the LM with PPO** (RL algorithm) to maximize the reward model's score.
>
> Modern alternative: DPO (Direct Preference Optimization) — skip the reward model, optimize the LM directly on preferences. Simpler, more stable.

### Q8: "What are hallucinations? How do you reduce them?"

**Answer (2 min):**
> Hallucinations = model generates plausible but factually wrong or ungrounded content.
>
> **Causes:** training data gaps, model uncertainty, prompt ambiguity.
>
> **Reductions:**
> - **RAG** — ground answers in retrieved documents
> - **Citations** — force the model to cite sources
> - **Self-consistency** — generate multiple answers, take majority vote
> - **Lower temperature** — 0.0-0.3 for factual tasks
> - **Better prompts** — "If you don't know, say you don't know"
> - **Constrained decoding** — use JSON mode, schemas
> - **Eval** — measure faithfulness with RAGAS

---

## 🏗️ Round 3: System Design (AI-flavored)

### Q: "Design a chatbot for [company X]"

**Framework (use this structure):**

**1. Clarify (5 min):**
- "What's the chatbot's primary use case? Customer support? Sales? Internal?"
- "What's the expected traffic? 1k or 1M users?"
- "What channels? Web, WhatsApp, Slack?"
- "What's the latency budget? <1s or <5s?"

**2. High-level design (10 min):**
```
User → [Frontend: chat UI with streaming]
     → [API Gateway: rate limit, auth]
     → [Orchestrator: LangGraph / custom]
     → [Router: small LLM decides which agent]
     → [Tools: search, DB, external APIs]
     → [Vector DB: RAG over company docs]
     → [LLM: OpenAI / Claude / self-hosted]
     → [Cache: Redis for repeated queries]
     → [Observability: LangSmith / LangFuse]
     → Response (streamed)
```

**3. Components to discuss (15 min):**
- **Auth/sessions:** How do you track users? Where does history live?
- **RAG pipeline:** Chunking strategy, embedding model, vector DB, reranking
- **Agent design:** Single agent with tools vs multi-agent. When?
- **Memory:** Short-term (in-context) + long-term (vector store of past interactions)
- **Evals:** Golden set, online metrics, A/B testing
- **Cost:** Token budgets, model selection per query type
- **Latency:** Streaming, parallel tool calls, caching
- **Safety:** Prompt injection defense, PII detection, content moderation
- **Observability:** Trace every step (LangSmith). Debug is impossible without it.

**4. Trade-offs and follow-ups (10 min):**
- "What if traffic spikes 10x?" → autoscaling, queues, rate limits
- "What if LLM API is down?" → fallback model, graceful degradation
- "How do you improve over time?" → collect feedback, retrain, prompt iteration
- "How do you handle multilingual?" → multilingual embeddings, translation
- "What about compliance?" → data residency, PII redaction, audit logs

### Q: "Design a RAG system for 1M documents"

**Answer structure:**
- **Preprocessing pipeline:** chunking, embedding, indexing in vector DB
- **Retrieval:** hybrid search (BM25 + dense), reranking, query transformation
- **Generation:** LLM with retrieved context, streaming response
- **Scaling:** Pinecone/Weaviate for vector DB, Redis for caching, async workers
- **Evals:** RAGAS on golden set, online metrics, A/B testing
- **Cost:** per-doc indexing cost, per-query retrieval cost
- **Updates:** incremental indexing, version control of docs

### Q: "Design an agent that books meetings"

**Answer structure:**
- **Tools:** calendar API (read free slots), email API (send invite), CRM API (lookup contact)
- **Planning:** LangGraph with state machine — receive request → parse → check calendar → find slot → confirm with user → book → send invite
- **Memory:** user preferences (timezone, working hours)
- **Safety:** confirm before booking, never book without explicit user OK
- **Evals:** success rate (booking made), tool call accuracy, user satisfaction

---

## 🗣️ Round 4: Behavioral / Culture Fit

### Use STAR (Situation, Task, Action, Result) for every answer.

**Q: "Tell me about a hard project."**

> **S:** At my current job, we had a Node.js service that was hitting performance limits at 10k concurrent users.
> **T:** I was asked to redesign it for 100k users in 2 months.
> **A:** I profiled the bottlenecks (DB queries were 80% of latency), added Redis caching, switched to async workers for heavy work, and migrated the hot path to a queue-based system.
> **R:** Latency dropped from 800ms p95 to 150ms p95. Cost went down 30%. We handled Black Friday traffic with no downtime.

**Common questions + STAR answers to prep:**
- Tell me about a time you disagreed with a teammate.
- Tell me about a time you failed. What did you learn?
- Tell me about your most impressive project.
- Why AI engineering? Why this company?
- Where do you see yourself in 3 years?
- Why should we hire you?

---

## 📝 Take-home assignments

Common: "Build a small RAG app in 48 hours."

**What evaluators look for:**
- ✅ Working end-to-end (not just code that doesn't run)
- ✅ Good README with setup instructions
- ✅ Eval results (even simple)
- ✅ Thoughtful design choices
- ✅ Edge cases handled
- ❌ No README
- ❌ Doesn't run on their machine
- ❌ Generic "uses LangChain" with no depth
- ❌ No tests, no eval

**Pro tip:** Spend 10% of time on a **polished README + demo video**. This is what gets you the onsite.

---

## 🎯 Daily prep routine (2 hrs/day for 8 weeks before interview)

| Time | Activity |
|------|----------|
| 30 min | 2 LeetCode problems (Medium) |
| 30 min | 1 system design problem (write + draw) |
| 30 min | Re-read 1 section of these notes, practice explaining out loud |
| 30 min | Mock interview (with friend or pramp.com / interview.io) |

---

## 📚 Mock interview resources

- [Pramp](https://www.pramp.com/) — free peer mock interviews
- [Interviewing.io](https://interviewing.io/) — paid, real senior engineers
- [Exercism](https://exercism.org/) — for fundamentals
- [Hello Interview](https://www.hellointerview.com/) — system design practice
- [Reddit: cscareerquestions](https://www.reddit.com/r/cscareerquestions/) — interview experiences

---

## ⚠️ Common mistakes in AI interviews

1. ❌ **Memorizing answers.** Interviewers can tell. Practice explaining, not reciting.
2. ❌ **Not asking clarifying questions.** "Design a chatbot" needs clarification first.
3. ❌ **Jumping to code.** System design = discuss first, code last.
4. ❌ **No cost/latency discussion.** Interviewers want to hear "we considered..."
5. ❌ **Forgetting your own projects.** Be ready to deep-dive into any project on your resume.

---

## 🎯 The 24-hours-before interview checklist

- [ ] Re-read your resume. Be ready to talk about every line.
- [ ] Re-read your projects' READMEs. Be ready to deep-dive.
- [ ] Re-read your notes on transformers, RAG, agents.
- [ ] Practice 1 mock system design out loud.
- [ ] Get good sleep. Cramming doesn't work.
- [ ] Have water, notebook, pen ready (for in-person).
- [ ] Test your mic/camera (for video).

---

> **Next:** [Salary Negotiation →](salary-negotiation.md) | [Personal Branding →](personal-branding.md)
