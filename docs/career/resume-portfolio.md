# 📄 Resume & Portfolio — Get to 20 LPA

> **Your resume is a sales document, not a CV.** Every line should pass the "so what?" test.

---

## 🎯 The 5-second rule

Recruiters spend **5-7 seconds** on your resume. If they don't see "AI Engineer + LLM + RAG" in that time, you're filtered out.

**Every section must scream:** "I build AI systems that ship."

---

## 📄 Resume structure (1 page, always)

```
┌─────────────────────────────────────────────┐
│  NAME                                        │
│  AI Engineer | LLM Apps, RAG, Agents          │ ← target this title
│  City · Email · Phone · LinkedIn · GitHub    │
├─────────────────────────────────────────────┤
│  SUMMARY (3 lines)                           │
│  AI Engineer with 3 years building production│
│  web apps (Node/React) and shipping LLM-     │
│  powered products. Built 5+ GenAI projects   │
│  including RAG systems and multi-step agents.│
│  Looking to apply full-stack + AI skills.    │
├─────────────────────────────────────────────┤
│  SKILLS                                      │
│  AI/LLM: OpenAI, Anthropic, LangChain,       │
│    LangGraph, RAG, vector DBs (Pinecone,      │
│    pgvector), prompt engineering, evals       │
│  ML: PyTorch, Hugging Face, scikit-learn,     │
│    XGBoost                                    │
│  Languages: Python, TypeScript, SQL           │
│  Infra: Docker, AWS, FastAPI, PostgreSQL,    │
│    Redis, GitHub Actions                      │
│  Web (3 yr): React, Next.js, Node.js         │
├─────────────────────────────────────────────┤
│  EXPERIENCE                                  │
│  Software Engineer · [Company] · 2022-Now     │
│  • Built [X] that [result with number]        │
│  • Led [Y] which [result with number]         │
│  • Spearheaded AI initiative: [project]       │
│    using LLM, [outcome]                       │
│                                              │
│  Software Engineer · [Prev Company] · 2021-22 │
│  • [X] that [result with number]              │
│  • [Y] that [result with number]              │
├─────────────────────────────────────────────┤
│  PROJECTS                                    │
│  AI Doc Q&A · github.com/me/ai-doc-qa         │
│  RAG system over PDFs with citations, eval,   │
│  cost tracking. Stack: LangChain, OpenAI,     │
│  Pinecone, Next.js. Live at: [url]            │
│                                              │
│  Research Agent · github.com/me/research-agent│
│  Multi-step agent that plans, searches web,   │
│  and synthesizes answers. Eval suite: 85%     │
│  success rate. Stack: LangGraph, Claude.      │
│                                              │
│  [2-3 more projects]                          │
├─────────────────────────────────────────────┤
│  EDUCATION                                   │
│  B.Tech Computer Science · University · 2021 │
│  GPA: 8.5/10                                 │
├─────────────────────────────────────────────┤
│  ACHIEVEMENTS (optional)                     │
│  • Top 10% in [Kaggle/hackathon]              │
│  • 1000+ LinkedIn followers in AI             │
│  • [Open source contributor]                  │
└─────────────────────────────────────────────┘
```

---

## ✍️ Writing tips (AI resume specific)

### Use the "X, Y, Z" formula for bullets:
> **"Accomplished [X] as measured by [Y] by doing [Z]."**

**Examples:**
- ❌ "Built RAG system" → too vague
- ✅ "Built RAG system for legal documents serving 50+ daily users, reducing research time by 70% using LangChain + GPT-4 + Pinecone"
- ❌ "Worked on React app" → not relevant anymore
- ✅ "Led migration to Next.js 14 serving 100k MAU, improving LCP by 40%"
- ❌ "Did fine-tuning" → vague
- ✅ "Fine-tuned Llama 3 8B on 5k customer support tickets (QLoRA), achieving 92% intent-classification accuracy vs 78% with prompt-only baseline"

### Quantify everything:
- Performance improvements (% latency, accuracy)
- User impact (MAU, DAU, users)
- Cost savings ($, %)
- Scale (requests/sec, GB, M documents)
- Time saved (hours, days)

### Include AI in your current role:
If your current company uses AI at all, mention it. Even if you "experimented with GPT-4 to improve customer support response time by 20%" — that counts.

---

## 🌐 Portfolio (your GitHub README profile)

### 1. Set up a profile README
Create a repo named after your username: `github.com/YOUR_USERNAME/YOUR_USERNAME`

**README.md:**
```markdown
# Hi, I'm [Name] 👋

## AI Engineer | Building LLM apps, RAG systems, and agents

I'm a software engineer with 3 years of experience building production web apps. 
Now I'm focused on AI engineering — shipping LLM-powered products.

### 🛠️ Tech I work with
![Python](https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white)
![LangChain](https://img.shields.io/badge/-LangChain-121212)
![OpenAI](https://img.shields.io/badge/-OpenAI-412991)
![PyTorch](https://img.shields.io/badge/-PyTorch-EE4C2C)
![Next.js](https://img.shields.io/badge/-Next.js-000000)

### 🚀 Featured projects
- 🤖 [AI Doc Q&A](https://github.com/me/ai-doc-qa) — RAG over PDFs, 92% eval score
- 🧠 [Research Agent](https://github.com/me/research-agent) — Multi-step LangGraph agent
- 📊 [ML Pipeline](https://github.com/me/ml-pipeline) — Production ML with MLflow

### 📝 Latest writing
- [How to build a production RAG](link)
- [RAGAS: evaluating RAG systems](link)

### 📫 Reach me
[LinkedIn](link) · [Email](link) · [Blog](link)
```

### 2. Pin your best 6 repos
Pin 6 repos at the top of your profile. Make sure they have:
- Great README (problem, solution, screenshots, results)
- Clean code (no commented-out junk)
- Recent commits
- A live demo link or video

### 3. Make your project READMEs excellent

**Template for project README:**
```markdown
# Project Name

> One-line description of what it does

![Demo GIF or screenshot]

## 🎯 Problem
What problem does this solve? For whom?

## 🏗️ Architecture
[Architecture diagram, draw.io, or Mermaid]

## ✨ Features
- Feature 1
- Feature 2
- Feature 3

## 🛠️ Tech stack
- Frontend: Next.js 14, TypeScript
- Backend: FastAPI, Python 3.11
- AI: OpenAI GPT-4, LangChain, Pinecone
- Infra: Docker, AWS, Vercel

## 📊 Results
- 92% accuracy on eval set
- 200ms p95 latency
- $0.02 per query

## 🚀 Quick start
\`\`\`bash
git clone ...
cd project
pip install -r requirements.txt
export OPENAI_API_KEY=...
python main.py
\`\`\`

## 📚 Learn more
[Blog post] · [Demo video] · [Twitter thread]

## 📝 License
MIT
```

---

## 📂 Portfolio website (optional but powerful)

A simple portfolio site helps a LOT. Use your existing Next.js skills!

**Stack:** Next.js + Tailwind + MDX

**Pages:**
- Home (1-pager, your pitch, links to projects)
- Projects (cards linking to GitHub/live demos)
- Blog (optional, but shows depth)
- About (your story, why AI)
- Contact

**Free hosting:** Vercel.

---

## 🧪 The "AI Engineer Resume Audit"

Print your resume. Read it. Ask:
- [ ] Can a recruiter tell I do AI in 5 seconds? (Look for: LLM, RAG, AI, agents in top 1/3)
- [ ] Are there numbers in every bullet? (%, $, users, scale)
- [ ] Is it 1 page? (Yes, even with 3 yrs)
- [ ] Does it link to GitHub + LinkedIn?
- [ ] Are 3+ AI projects featured with live links?
- [ ] Is the summary 3 lines, sharp, and AI-focused?
- [ ] Did I cut anything that doesn't help me get THIS job?

If you answer "no" to any: fix it before sending.

---

## 📝 Resume versions (don't use 1 version)

**Create 3 versions:**
1. **AI Engineer** — focus on LLM, RAG, agents (primary)
2. **ML Engineer** — focus on ML pipelines, PyTorch, deployment
3. **Full-Stack AI** — for startups wanting both web + AI

Tailor the summary + skills + featured project for each.

---

## 📚 Resources

- [Overleaf resume templates](https://www.overleaf.com/) — LaTeX templates, look polished
- [JSON Resume](https://jsonresume.org/) — structured, version control your resume
- [Reactive Resume](https://rxresu.me/) — free, open source, ATS-friendly

**Don't:** Use MS Word, fancy templates, or 2-column layouts. They break ATS (Applicant Tracking Systems).

**Do:** Use a clean, single-column, ATS-friendly format. Plain Markdown → PDF works great.

---

> **Next:** [Interview Prep →](interview-prep.md) | [Salary Negotiation →](salary-negotiation.md)
