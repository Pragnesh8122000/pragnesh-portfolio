# Phase 6 — RAG & Agents (Month 6-8)

> **Goal:** Build production-grade RAG systems and AI agents. This is the rarest skill in 2026.
> **Time:** ~2 hrs/day, 6 days/week
> **Output:** 2 production-quality projects (RAG + Agent)

---

## 🎯 Why this is the highest-paid phase

RAG and Agents are the **two skills that command 25-50 LPA in India right now**. Most AI Engineers can call an LLM API. Few can build:
- Production RAG with proper eval and monitoring
- Multi-step agents that actually work
- Cost-optimized systems at scale

**Master this and you're top 5% of applicants.**

---

## 📅 Week-by-week

### Week 42 — Production RAG deep dive

- [ ] Document parsing: PDF (PyMuPDF, Unstructured), HTML, DOCX
- [ ] Advanced chunking: semantic chunking, late chunking
- [ ] Metadata filtering, hybrid search (BM25 + dense)
- [ ] Reranking: Cohere, cross-encoders, ColBERT
- [ ] **Mini project:** Build a RAG over 100+ PDFs. Compare 4 chunking strategies with RAGAS metrics.

**Resource:** [RAGAS documentation](https://docs.ragas.io/) — learn it, love it.

### Week 43 — RAG evaluation

- [ ] RAGAS metrics: faithfulness, context precision, context recall, answer relevancy
- [ ] Build a golden eval dataset
- [ ] A/B test different pipelines
- [ ] **Mini project:** Take any RAG app. Build a 50-question eval set. Score it. Improve. Re-score. Show progress.

### Week 44 — Production concerns

- [ ] Caching (Redis) for repeated queries
- [ ] Streaming responses (SSE)
- [ ] Rate limiting, cost tracking
- [ ] Observability: LangSmith, LangFuse, Helicone
- [ ] **Mini project:** Add LangSmith tracing to your RAG app. Add cost tracking. Add Redis caching.

### Week 45 — Agents fundamentals

- [ ] What is an agent? ReAct loop
- [ ] Tools: function calling, structured outputs
- [ ] Planning: CoT, ReAct, plan-and-execute
- [ ] **Resource:** [Anthropic — Building Effective Agents](https://www.anthropic.com/research/building-effective-agents) (free, 30 min read)

### Week 46 — LangGraph

- [ ] State machines, nodes, edges
- [ ] Conditional edges, cycles
- [ ] Human-in-the-loop
- [ ] **Mini project:** Build a research agent that: takes a question → plans sub-questions → searches each → synthesizes → cites.

**Resource:** [LangGraph docs](https://langchain-ai.github.io/langgraph/) + [DeepLearning.AI course](https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/)

### Week 47 — Multi-agent systems

- [ ] CrewAI, AutoGen, or LangGraph multi-agent
- [ ] When multi-agent helps vs hurts
- [ ] **Mini project:** Build a 3-agent system: Researcher → Writer → Critic. They iterate on a blog post.

### Week 48 — Agent evaluation

- [ ] Trajectory evaluation (did it follow the right path?)
- [ ] Outcome evaluation (did it get the right answer?)
- [ ] Tool use accuracy
- [ ] **Mini project:** Build an eval harness for your agent. Track: success rate, cost, time, # of tool calls.

### Week 49 — Memory & context

- [ ] Short-term memory: conversation history
- [ ] Long-term memory: vector store of past interactions
- [ ] Context engineering: what to put in the prompt
- [ ] **Mini project:** Add long-term memory to your agent. It remembers user preferences across sessions.

### Week 50 — Real-time & multimodal

- [ ] Web search tools (Tavily, Exa, SerpAPI)
- [ ] Code execution tools (E2B)
- [ ] Vision: GPT-4V, Claude vision, Llama 3.2 vision
- [ ] **Mini project:** Build an agent that can: search the web, run code, and analyze an image.

### Week 51 — Capstone 1: Production RAG

**Build a portfolio-grade RAG system:**

- [ ] Real problem (legal docs, medical papers, company knowledge base, etc.)
- [ ] Stack: FastAPI + LangChain + OpenAI + Pinecone + Redis + LangSmith
- [ ] Features:
  - Document upload + processing
  - Streaming responses
  - Source citations
  - Conversation history
  - Cost tracking
  - Observability
  - Eval suite (50+ questions)
- [ ] Frontend: Next.js (your edge!)
- [ ] Deploy: Vercel + Render + Pinecone
- [ ] README with: architecture diagram, screenshots, demo video
- [ ] **LinkedIn post + Twitter thread + blog post**

### Week 52 — Capstone 2: AI Agent

**Build a portfolio-grade AI agent:**

- [ ] Real problem (research assistant, code reviewer, data analyst, etc.)
- [ ] Stack: LangGraph + multiple LLM providers + web search + code execution
- [ ] Features:
  - Multi-step planning
  - Tool use (5+ tools)
  - Streaming
  - Eval suite
  - Cost monitoring
  - Memory (long + short term)
- [ ] Frontend: Next.js with chat UI
- [ ] Deploy
- [ ] **LinkedIn post + Twitter thread + blog post**

---

## 🏆 Phase 6 done = you have:

- [ ] Built a production RAG system
- [ ] Built a production AI agent
- [ ] Deep understanding of evals
- [ ] Can build cost-optimized AI systems
- [ ] **This is what 25-40 LPA candidates look like**

---

## 🛠️ Key tools to master

| Tool | Use | Free? |
|------|-----|-------|
| LangChain / LangGraph | Orchestration | Yes |
| LlamaIndex | Alternative to LangChain | Yes |
| Pinecone | Vector DB | Yes (limited) |
| Weaviate | Vector DB | Yes |
| Chroma | Local vector DB | Yes |
| LangSmith | Observability | Yes (limited) |
| LangFuse | Open source observability | Yes |
| RAGAS | RAG evaluation | Yes |
| Helicone | LLM cost + observability | Yes |
| E2B | Code execution sandbox | Yes |
| Tavily | Web search for agents | Yes |
| Instructor | Structured outputs | Yes |

---

## 📚 Resource priority

| # | Resource | Cost | Time |
|---|----------|------|------|
| 1 | Anthropic — "Building Effective Agents" essay | Free | 30 min |
| 2 | DeepLearning.AI — AI Agents in LangGraph | Free | 5 hrs |
| 3 | LangGraph docs + tutorials | Free | 10 hrs |
| 4 | LangSmith tutorials | Free | 3 hrs |
| 5 | RAGAS docs + examples | Free | 4 hrs |
| 6 | "AI Engineering" book (Chip Huyen) | ~$40 | reference |

---

## ⚠️ Common mistakes

1. ❌ **No eval set.** If you can't measure it, you can't improve it.
2. ❌ **Over-engineering agents.** Single agent with good tools > multi-agent mess.
3. ❌ **Ignoring cost.** A naive agent can burn $50 in 5 minutes. Set limits.
4. ❌ **No observability.** Use LangSmith from day 1. Debugging blind is hell.
5. ❌ **No safety guardrails.** Agents can do real things (send emails, run code). Add allowlists.

---

## 💡 Pro tips

> *"RAG and Agents are the two skills where the supply-demand imbalance is most extreme in 2026. Master them."* — Aravind Srinivas, Perplexity CEO

> *"Most AI Engineers can't build a RAG that beats 80% accuracy. If you can, you're in the top 1%."* — Senior eng at a unicorn

---

## 🎯 End-of-phase check

- [ ] Production RAG with eval, cost tracking, observability
- [ ] Multi-step agent with planning + tool use
- [ ] 200+ commits, polished GitHub
- [ ] 2 strong portfolio projects
- [ ] 3+ LinkedIn posts about these projects

**All checked? You're ready for Phase 7 — Job hunt.**

---

> **Next:** [Phase 7 — Projects + Job Hunt →](phase-7-projects-job-hunt.md)
