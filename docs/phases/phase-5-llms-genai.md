# Phase 5 — LLMs & GenAI (Month 5-7)

> **Goal:** Master working with LLMs via APIs, fine-tuning, prompt engineering.
> **Time:** ~2 hrs/day, 6 days/week
> **Output:** 2-3 LLM-powered projects

---

## 🎯 Why this is the MONEY phase

This is where 20 LPA jobs live. AI Engineers in India doing exactly what's in this phase are getting 18-30 LPA offers RIGHT NOW. Master this.

---

## 📅 Week-by-week

### Week 33 — LLM APIs

- [ ] OpenAI API: chat completions, streaming, function calling
- [ ] Anthropic Claude API
- [ ] Google Gemini API
- [ ] Mistral, Groq (fast + cheap)
- [ ] **Mini project:** Build a CLI chatbot that uses 3 different LLM providers, lets you switch between them

**Cost awareness:** Never use GPT-4 by default. Use GPT-4o-mini, Claude Haiku, or Gemini Flash for dev. Save the big models for production edge cases.

### Week 34 — Prompt engineering

- [ ] Zero-shot, few-shot, chain-of-thought
- [ ] System prompts: how to structure them
- [ ] ReAct, ReWOO prompting
- [ ] **Mini project:** Take 5 tasks (summarization, extraction, classification, Q&A, code gen). Write 3 prompts for each. Measure which works best. Document results.

**Resource:** [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering) + [Anthropic Prompt Library](https://docs.anthropic.com/en/prompt-library)

### Week 35 — Function calling & tool use

- [ ] What is function calling? Why it matters
- [ ] OpenAI tool use API
- [ ] Anthropic tool use API
- [ ] **Mini project:** Build a chatbot that can call 3 real tools: get_weather, get_stock_price, send_email. Just mock the data.

### Week 36 — Structured outputs

- [ ] JSON mode in OpenAI
- [ ] Pydantic for response validation
- [ ] Instructor library (game-changer)
- [ ] **Mini project:** Extract structured data (name, email, sentiment, intent) from 100 customer support messages. Compare with/without structured output.

**Resource:** [Instructor docs](https://python.useinstructor.com/) — read the whole thing, it's short.

### Week 37 — Embeddings & vector search

- [ ] What are embeddings? Why they work
- [ ] OpenAI embeddings API
- [ ] Cosine similarity
- [ ] **Mini project:** Take 1000 articles. Embed them. Build a "find similar" search. Deploy as a small web app.

### Week 38 — RAG basics (Retrieval-Augmented Generation)

- [ ] What is RAG? Why it solves hallucinations
- [ ] Vector databases: Pinecone, Weaviate, Chroma, pgvector
- [ ] Chunking strategies: fixed size, semantic, recursive
- [ ] **Mini project:** **Document Q&A** — upload a PDF, ask questions, get cited answers. This is the #1 AI Engineer interview project.

**Resource:** [LangChain RAG tutorial](https://python.langchain.com/docs/tutorials/rag/)

### Week 39 — Advanced RAG

- [ ] Hybrid search (BM25 + vector)
- [ ] Reranking with Cohere / cross-encoders
- [ ] Query transformation (HyDE, multi-query)
- [ ] Evaluation: RAGAS framework
- [ ] **Mini project:** Take your basic RAG, add reranking, evaluate with RAGAS. Show measurable improvement.

### Week 40 — Fine-tuning

- [ ] When to fine-tune vs prompt
- [ ] LoRA, QLoRA (parameter-efficient fine-tuning)
- [ ] Datasets format, training
- [ ] **Mini project:** Fine-tune Llama 3 8B on a custom dataset (customer support, code, domain knowledge). Use QLoRA so it fits on Colab.

**Resource:** [Hugging Face PEFT library](https://huggingface.co/docs/peft) + [Axolotl](https://github.com/axolotl-ai-cloud/axolotl) for easier fine-tuning.

### Week 41 — Capstone: Production LLM project

**Build a portfolio-grade LLM application:**

- [ ] Idea: pick a real problem (not "another chatbot")
- [ ] Stack: Next.js (your edge!) + FastAPI + OpenAI/Anthropic + vector DB
- [ ] Features: streaming responses, source citations, conversation history, user auth
- [ ] Deploy: Vercel (frontend) + Render/Railway (backend) + Pinecone
- [ ] Cost: keep API spend < $5/month for demo
- [ ] README: architecture diagram, screenshots, demo link
- [ ] LinkedIn post: launch announcement

**Suggested projects:**
- **AI tutor** for a specific subject (JEE, GRE, coding)
- **Contract analyzer** for legal docs
- **Research assistant** that summarizes papers
- **Customer support bot** for a niche domain
- **Code reviewer** for a specific language/framework

---

## 🏆 Phase 5 done = you have:

- [ ] Strong prompt engineering skills
- [ ] Built a working RAG system
- [ ] Fine-tuned a model
- [ ] Deployed an LLM app to production
- [ ] **This is now your "main portfolio project"**

---

## 🛠️ Tools to master

| Tool | Why | Free tier? |
|------|-----|------------|
| OpenAI API | Industry standard | $5 free credit |
| Anthropic API | Best for long context | $5 free credit |
| LangChain | Most popular framework | Yes |
| LlamaIndex | Alternative to LangChain | Yes |
| Pinecone | Vector DB, easy | Yes |
| Chroma | Vector DB, local | Yes |
| pgvector | Postgres + vectors | Yes |
| Instructor | Structured outputs | Yes |
| LiteLLM | Unified LLM API | Yes |
| RAGAS | RAG evaluation | Yes |

---

## 📚 Resource priority

| # | Resource | Cost | Time |
|---|----------|------|------|
| 1 | DeepLearning.AI — "AI Agents in LangGraph" | Free | 5 hrs |
| 2 | DeepLearning.AI — "Building Systems with LLM" | Free | 5 hrs |
| 3 | LangChain docs + tutorials | Free | 10 hrs |
| 4 | Anthropic prompt engineering course | Free | 4 hrs |
| 5 | OpenAI cookbook (GitHub) | Free | reference |
| 6 | "Designing Machine Learning Systems" book (Huyen) | ~$30 | 30 hrs (skim) |

---

## ⚠️ Common mistakes

1. ❌ **Defaulting to GPT-4.** Use smaller models first, upgrade only when needed.
2. ❌ **No evaluation.** "It works" is not enough. Measure with RAGAS or similar.
3. ❌ **Ignoring cost.** A bad prompt can cost $1000/day. Always think about tokens.
4. ❌ **No streaming.** Users want streaming responses. Implement it.
5. ❌ **Skip fine-tuning entirely.** OR fine-tune everything. Both are wrong. Know when to use which.

---

## 💡 Pro tips

> *"The best AI Engineers in 2026 know how to cut LLM costs by 80% with caching, batching, and smaller models. That skill alone gets you hired."* — Hiring manager at top AI startup

> *"If you can ship a production RAG app with evals and cost monitoring, you're top 10% of applicants."* — Recruiter, Anthropic

---

## 🎯 End-of-phase check

- [ ] Built and deployed an LLM app
- [ ] Understand RAG deeply
- [ ] Have fine-tuned a model
- [ ] Can talk about cost optimization
- [ ] 150+ commits, polished GitHub

**All checked? Move to Phase 6 — RAG and Agents (the part that gets you 30+ LPA).**

---

> **Next:** [Phase 6 — RAG & Agents →](phase-6-rag-agents.md)
