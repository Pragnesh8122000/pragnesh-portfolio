# 🏆 Best Practices — The Meta Guide

> **These are the cross-cutting best practices that apply to EVERY phase.**
> **Read once. Re-read monthly. They compound.**

---

## 🧠 The 10 commandments of this roadmap

### 1. **Build in public**
- Every project goes on GitHub with a great README.
- Every project gets a LinkedIn post.
- Every month, write a "what I learned" post.
- This compounds. By month 12, you have a portfolio that speaks for itself.

### 2. **2 hours/day. No zero days.**
- 30 minutes counts. Show up daily.
- Consistency > intensity. 2 hrs/day for 365 days > 14 hrs once a week.
- If you miss a day, do 15 min of reading the next day. Don't let streaks break.

### 3. **Ship, don't study**
- 70% building, 30% learning.
- Stop a course at 30-50% to start applying. Don't get stuck in tutorial hell.
- A finished ugly project > 100 hours of half-watched courses.

### 4. **Network > Skills (at the 20 LPA level)**
- 50% of 20+ LPA jobs are filled via referral.
- 30% via inbound (recruiter reaches out to you).
- Only 20% via cold application.
- **Action:** 5 DMs, 5 comments, 1 post per week. Non-negotiable.

### 5. **Track everything**
- Daily tracker. Weekly review. Skills matrix. Job applications.
- If you don't write it down, you didn't do it.
- Spreadsheets are unsexy. They work.

### 6. **Pick boring tools (most of the time)**
- Use LangChain, OpenAI, Pinecone, Next.js. They're mainstream for a reason.
- Don't waste time on the "perfect" stack. The best stack is the one that ships.
- Go exotic only when boring tools don't work.

### 7. **Cost is a feature**
- In interviews, "how do you reduce LLM costs" is asked at 30+ LPA roles.
- Build with cost in mind from day 1: caching, smaller models, batching.
- A $5 demo shows you understand production. A $500 demo shows you don't.

### 8. **Eval > "feels good"**
- "It works" is not enough. Measure.
- Build eval sets early (50+ questions). Track metrics. Improve.
- RAGAS for RAG. Custom evals for agents. Human eval for everything.

### 9. **Read code, not just docs**
- Read the source of LangChain, LlamaIndex, FastAPI. They're well-written.
- Read papers (skim). Andrej Karpathy + Yannic Kilcher for video summaries.
- Read other people's project READMEs. Steal structure.

### 10. **Compounding > linear**
- This is a 12-month plan. Months 1-6 feel slow. Months 7-12 explode.
- Like interest, the gains compound. Stick with it through the slow phase.

---

## 🎯 Engineering best practices (the 80/20)

### Code
- ✅ Use virtual envs. Always. Per project.
- ✅ Use type hints (Python). Catches bugs early.
- ✅ Use Black + Ruff for formatting/linting.
- ✅ Write tests. Even a few. Pytest.
- ✅ Use `pathlib.Path`, not `os.path`.
- ✅ Use f-strings, not `.format()`.
- ✅ One file = one main class/function. Keep it small.
- ✅ Use `with` for files. Always.
- ✅ Don't commit secrets. Use `.env` + `python-dotenv`.

### Git
- ✅ Commit daily. Small, focused commits.
- ✅ Use conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`
- ✅ Write meaningful commit messages.
- ✅ Use branches for features: `feature/rag-pipeline`
- ✅ Write PR descriptions. Even for solo projects (future you will thank you).
- ✅ Add a `.gitignore` from day 1.
- ✅ Add a `LICENSE` (MIT is fine for portfolio).

### Project structure
```
project/
├── README.md
├── LICENSE
├── requirements.txt (or pyproject.toml)
├── .env.example
├── .gitignore
├── src/
│   └── project/
│       ├── __init__.py
│       ├── main.py
│       ├── api/
│       ├── core/
│       └── utils/
├── tests/
│   └── test_main.py
├── notebooks/  (for experiments)
├── data/       (gitignored)
└── docs/       (optional)
```

### Documentation
- ✅ README with: problem, demo, architecture, setup, usage
- ✅ Code comments for WHY, not WHAT
- ✅ Docstrings for functions/classes
- ✅ `CHANGELOG.md` for major changes
- ✅ Architecture diagram for non-trivial projects

### Deployment
- ✅ Never commit API keys. Use environment variables.
- ✅ Use `python-dotenv` to load `.env` locally.
- ✅ Add `Dockerfile` for reproducibility.
- ✅ Add `docker-compose.yml` if multiple services.
- ✅ Health check endpoint.
- ✅ Logging from day 1.
- ✅ Graceful error handling.

---

## 📚 Learning best practices

### The Feynman technique
For every concept you learn:
1. **Study it** (read, watch, code).
2. **Explain it** to a 12-year-old in plain English.
3. **Identify gaps** in your explanation.
4. **Simplify, simplify, simplify.**

If you can't explain it simply, you don't understand it.

### Active recall (better than re-reading)
- Read a concept. Close the book. Write what you remember.
- Compare. Fill gaps. Re-read the gaps only.
- Spaced repetition: review after 1 day, 3 days, 7 days, 30 days.

### Practice > theory
- Read 30% of a course, then build something.
- Get stuck, look up the rest as needed.
- Don't read the whole book, then try to build.

### Note-taking that works
- Keep a "concepts" file. One entry per concept, 1 page max.
- Include: definition, why it matters, example, gotchas.
- Review monthly. Re-write in your own words.

---

## 🤝 Career best practices

### Personal brand
- ✅ LinkedIn: optimize once, update monthly. Keep it evergreen.
- ✅ GitHub: green squares. Pinned repos. Profile README.
- ✅ Blog: 1 post/month. Quality > quantity.
- ✅ Twitter (optional): engage with AI community.

### Communication
- ✅ Write clearly. Short sentences. No jargon unless necessary.
- ✅ In interviews, structure answers (STAR for behavioral, framework for technical).
- ✅ In meetings, summarize your points in 1 sentence before going deep.
- ✅ Document decisions (ADRs — Architecture Decision Records).

### Time management
- ✅ Time-block. Use calendar.
- ✅ Deep work (4-5 hrs) in the morning. Meetings/email in the afternoon.
- ✅ Pomodoro (25 min focus, 5 min break) for solo learning.
- ✅ Single-task. No multitasking. Phone in another room.

### Saying no
- ✅ You don't have to attend every meeting.
- ✅ You don't have to reply to every email the same day.
- ✅ You don't have to learn every new framework.
- ✅ Focus is a feature.

---

## 💪 Mental health best practices

### Avoid burnout
- ✅ Take at least 1 full day off per week.
- ✅ Exercise 3-4x/week. Sleep 7+ hours.
- ✅ Maintain at least 1 non-AI hobby.
- ✅ See friends/family. Stay social.
- ✅ If motivation is gone for >1 week, take a real break.

### Handle setbacks
- ✅ Job rejections are normal. Expect 20-30 rejections before an offer.
- ✅ Failed interviews are learning opportunities. Note what went wrong.
- ✅ Bad weeks happen. Pick up the next day.
- ✅ Compare yourself to past you, not others.

### The "why" matters
- Why are you doing this?
- Write it down. Read it when motivation dips.
- Examples: family, financial freedom, intellectual curiosity, helping others, building cool stuff.

---

## 🧰 Tooling philosophy

### Boring > clever
- Use the popular tool. The community is bigger. The bugs are known.
- Save exotic for when you have a reason.

### Open source > proprietary
- Free, customizable, no lock-in.
- Build a portfolio of open-source contributions.

### Use what you know
- You know Node/React. Use Next.js for AI frontends.
- Use TypeScript for any frontend. Use Python for backend.
- Leverage your existing skills. Don't relearn everything.

### Invest in the right tools
- A good editor (Cursor or VS Code + Copilot).
- A good notebook setup (Obsidian, Notion, or just Markdown).
- A good terminal (iTerm2 + zsh on Mac, Windows Terminal on Windows).
- A good task manager (Todoist, Linear, or just a `.md` file).

---

## 🎯 The 5 things to do every week (non-negotiable)

These 5 things, every week, for 12 months, will get you to 20 LPA. No exceptions.

1. **5+ GitHub commits** — even small ones. Show consistency.
2. **1 LinkedIn post** — project update, learning, hot take. Show presence.
3. **1 connection request** to a senior AI person — with a personalized note.
4. **1 progress note in your weekly review** — what's working, what's not.
5. **30 min on a project** — keep building. No project should be dormant for 2+ weeks.

**If you do these 5 things weekly, you will:**
- Have a portfolio that speaks for itself
- Have a network that warms up referrals
- Have a track record that proves discipline
- Have 5+ shipped projects by month 12
- Be in the top 5% of people trying to break into AI

**The bar is not high. The bar is consistency.**

---

## 🧪 The "10x engineer" habits

1. **Automate boring stuff** — scripts, aliases, snippets.
2. **Write things down** — docs, READMEs, decision logs.
3. **Code review your own PRs** — pretend you're reviewing someone else's.
4. **Use git like a pro** — branches, meaningful commits, clean history.
5. **Read the source** — of libraries you use. You'll learn a lot.
6. **Type everything** — saves debugging time.
7. **Test critical paths** — at least smoke tests.
8. **Profile before optimizing** — don't guess.
9. **Keep a brag doc** — list wins weekly. Useful for performance reviews + LinkedIn.
10. **Sleep** — most bugs are solved in the shower or after sleep.

---

## ⚠️ The failure modes (avoid these)

### 1. Tutorial hell
- Watching 100 hours of YouTube, building nothing.
- **Fix:** Stop course at 30%. Start building. Look up the rest as needed.

### 2. Perfectionism
- Spending 3 months on a "perfect" README. Never shipping the project.
- **Fix:** Ship ugly. Iterate. v1 > v0.

### 3. Math anxiety
- "I need to learn all the math first." 6 months later, still no projects.
- **Fix:** Watch 3Blue1Brown. Get intuition. Move on.

### 4. Social comparison
- "Person X learned faster than me." / "I'm behind."
- **Fix:** Compare to past you. Period.

### 5. Stacking skills
- Learning 5 things at once. Mastering none.
- **Fix:** One skill at a time. 70% mastery > 30% of 5 things.

### 6. Tool-hopping
- Switching frameworks every week. Never shipping.
- **Fix:** Pick a stack. Commit for 3 months. Switch only if needed.

### 7. Isolation
- Coding alone, asking nobody, getting stuck for weeks.
- **Fix:** Join communities. Ask questions. Pair program.

### 8. Neglecting the current job
- Doing AI stuff at work when you have a Node/React job.
- **Fix:** Keep your current job stable. AI is for nights/weekends until offer letter.

### 9. "I'll start Monday"
- The classic. Monday never comes.
- **Fix:** Start today. 30 minutes. Open a file. Write a line of code.

### 10. Quitting at month 6
- The slow phase. No results yet. Motivation gone.
- **Fix:** This is when most people quit. Don't be most people. The explosion is in months 7-12.

---

## 🎯 TL;DR — The 7 meta-rules

1. **Show up daily** (no zero days)
2. **Ship projects** (not study)
3. **Build in public** (LinkedIn, GitHub)
4. **Network aggressively** (DMs, comments, posts)
5. **Track everything** (daily, weekly, monthly)
6. **Use boring tools** (mainstream = jobs)
7. **Compound** (months 1-6 are slow, 7-12 explode)

---

> *"The best time to start was 6 months ago. The second best time is now."*
>
> **Open `trackers/daily-tracker.md` and log today. Day 1 starts now.**
