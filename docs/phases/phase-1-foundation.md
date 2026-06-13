# Phase 1 — Foundation (Month 1-2)

> **Goal:** Build the math, stats, and Python base you need to not struggle later.
> **Time:** ~2 hrs/day, 6 days/week
> **Output:** A `phase-1-foundation` GitHub repo with notes + small Python exercises

---

## 🎯 Why this phase matters

You will be tempted to skip this and go straight to "build a chatbot with ChatGPT." Don't.
- Without basic math, transformers will be magic.
- Without Python fluency, you'll fight the language, not learn the concepts.
- Without stats, you can't evaluate models or read papers.

**2 months of foundation = saves 6 months later.**

---

## 📅 Week-by-week breakdown

### Week 1 — Python crash course (you know JS, this is easy)

- [ ] Install Python 3.11+, set up `pyenv` or just system Python
- [ ] Install VS Code + Python extension + Jupyter extension
- [ ] Learn: variables, types, lists, dicts, loops, functions, list comprehensions
- [ ] Map JS concepts to Python: `const` → no need, `() => {}` → `lambda x: x`
- [ ] **Mini project:** rewrite 3 of your old Node utilities in Python

**Resource:** [Python for Everybody — Dr. Chuck](https://www.py4e.com/) (free) — first 5 chapters only.

### Week 2 — Python intermediate

- [ ] Classes, OOP, decorators, context managers (`with` statement)
- [ ] Virtual envs: `python -m venv venv` — **use this for EVERY project**
- [ ] `pip`, `requirements.txt`, `pyproject.toml`
- [ ] File I/O, JSON, CSV handling
- [ ] Error handling, testing with `pytest` (you know this from JS)
- [ ] **Mini project:** CLI tool that scrapes a website, saves to JSON, has tests

### Week 3 — Math: Linear Algebra basics

- [ ] Vectors, scalars, matrices
- [ ] Matrix multiplication (you'll see this 1000 times in DL)
- [ ] Dot product, transpose, broadcasting
- [ ] **Mini project:** Implement matrix multiplication and dot product from scratch in NumPy (no `@` operator)

**Resource:** 3Blue1Brown "Essence of Linear Algebra" — watch ALL 16 videos (4 hrs total). [Link](https://www.3blue1brown.com/topics/linear-algebra)

### Week 4 — Math: Calculus basics

- [ ] Derivatives, partial derivatives
- [ ] Chain rule (this IS backprop, intuitively)
- [ ] Gradient descent — what it does, why it works
- [ ] **Mini project:** Implement gradient descent from scratch to find the minimum of `f(x) = x² + 3x + 2`

**Resource:** 3Blue1Brown "Essence of Calculus" — first 8 videos. [Link](https://www.3blue1brown.com/topics/calculus)

### Week 5 — Stats basics

- [ ] Mean, median, mode, std dev, variance
- [ ] Distributions: normal, uniform, bernoulli
- [ ] Probability basics, conditional probability
- [ ] **Mini project:** Simulate 10,000 dice rolls, plot distribution. Compare to expected.

**Resource:** StatQuest with Josh Starmer — first 20 videos on YouTube. [Link](https://www.youtube.com/c/joshstarmer)

### Week 6 — Stats continued + NumPy

- [ ] Hypothesis testing, p-values (high-level)
- [ ] Correlation vs causation
- [ ] **NumPy:** arrays, slicing, broadcasting, vectorized ops
- [ ] **Mini project:** Load a CSV in NumPy, compute mean/median/correlation, plot

### Week 7 — Pandas intro

- [ ] Series, DataFrame
- [ ] Read CSV, Excel, JSON, SQL
- [ ] Filter, groupby, merge, pivot
- [ ] **Mini project:** Take any public dataset (Titanic, Iris, housing), do basic EDA in a Jupyter notebook

**Resource:** Kaggle's "Pandas" micro-course (4 hrs, free). [Link](https://www.kaggle.com/learn/pandas)

### Week 8 — Visualization + capstone

- [ ] Matplotlib basics: line, bar, scatter, histogram
- [ ] Seaborn for prettier plots
- [ ] **Capstone project:** Pick a dataset you care about (your own spending, IPL stats, GitHub stars). Do a full EDA in a notebook with 5+ insights. Push to GitHub with a great README.

---

## 🏆 Phase 1 done = you have:

- [ ] Python fluency (no Googling basic syntax)
- [ ] Math intuition for vectors, derivatives, distributions
- [ ] NumPy + Pandas basics
- [ ] One polished EDA notebook on GitHub
- [ ] Updated LinkedIn: "Learning Python for AI/ML"

---

## 📚 Resource priority list (use in this order)

| # | Resource | Cost | Time | Why |
|---|----------|------|------|-----|
| 1 | 3Blue1Brown — Linear Algebra | Free | 4 hrs | Best visual math on internet |
| 2 | 3Blue1Brown — Calculus | Free | 3 hrs | Same |
| 3 | StatQuest — first 20 videos | Free | 3 hrs | Best stats teacher |
| 4 | Python for Everybody | Free | 10 hrs | Solid Python foundation |
| 5 | Kaggle Pandas micro-course | Free | 4 hrs | Fastest Pandas onboarding |
| 6 | Kaggle Python micro-course | Free | 5 hrs | Optional backup |

**Total time for Phase 1: ~80 hours (2 months @ 10 hrs/week)**

---

## 🛠️ Setup checklist (do this in week 1)

- [ ] Python 3.11+ installed (`python --version`)
- [ ] VS Code with Python + Jupyter extensions
- [ ] Git configured with your name/email
- [ ] GitHub repo created: `phase-1-foundation`
- [ ] Folder structure: `notes/`, `exercises/`, `projects/`
- [ ] First commit: "Initial commit, starting AI journey"

---

## ⚠️ Common mistakes in Phase 1

1. ❌ **Spending 3 months on math.** You need INTUITION, not a degree. Stop at "I get it" not "I can prove it."
2. ❌ **Doing 5 courses in parallel.** Pick ONE, finish it, move on.
3. ❌ **No GitHub commits.** If it's not on GitHub, you didn't do it.
4. ❌ **No notes.** Write 1-page summaries of what you learned. Forces clarity.
5. ❌ **Not coding daily.** 30 min/day > 5 hrs once a week.

---

## 🎯 End-of-phase check

Before moving to Phase 2, you should be able to:
- [ ] Read a Pandas tutorial and follow along without StackOverflow
- [ ] Explain to a friend: what is gradient descent, what is a vector, what is std dev
- [ ] Have 50+ commits in your Phase 1 repo
- [ ] Have written and pushed 3 small Python projects

**If not: spend 2 more weeks. Don't rush. Foundation compounds.**

---

> **Next:** [Phase 2 — Python + Data Engineering →](phase-2-python-data.md)
