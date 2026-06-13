# Phase 2 — Python + Data Engineering (Month 2-3)

> **Goal:** Be productive with real data. SQL, Pandas power-user, basic data pipelines.
> **Time:** ~2 hrs/day, 6 days/week
> **Output:** A `data-pipeline` project + strong SQL skills

---

## 🎯 Why this phase matters

AI is 80% data work. If you can't wrangle messy data, you can't build AI products.
- 90% of an AI Engineer's job is data cleaning, not modeling.
- SQL is the most-tested skill in AI interviews (after Python).
- "Data engineer who knows ML" is one of the highest-paid roles.

---

## 📅 Week-by-week

### Week 9 — SQL deep dive (you know JS, SQL is short)

- [ ] SELECT, WHERE, GROUP BY, ORDER BY, LIMIT
- [ ] JOINs: INNER, LEFT, RIGHT, FULL, SELF
- [ ] Aggregates: COUNT, SUM, AVG, MIN, MAX
- [ ] Subqueries, CTEs, window functions (`ROW_NUMBER`, `RANK`, `LAG`)
- [ ] **Practice:** [SQL Murder Mystery](https://mystery.knightlab.com/), [HackerRank SQL](https://www.hackerrank.com/domains/sql) (Easy + Medium only)
- [ ] **Mini project:** Write 20 SQL queries against a public dataset (Sakila, Northwind, or your own)

**Resource:** [Mode Analytics SQL Tutorial](https://mode.com/sql-tutorial/) — free, 4 hrs.

### Week 10 — Pandas power user

- [ ] Multi-index, pivot tables, melt
- [ ] `apply`, `map`, `applymap`, vectorized ops (always prefer vectorized)
- [ ] Handling missing data: `fillna`, `dropna`, interpolation
- [ ] String ops, datetime ops
- [ ] **Mini project:** Take a messy real-world CSV (with missing values, weird dates, mixed types). Clean it. Document every step in a notebook.

**Resource:** [Pandas official docs](https://pandas.pydata.org/docs/user_guide/10min.html) — search-as-you-need.

### Week 11 — Data visualization

- [ ] When to use line, bar, scatter, histogram, box plot
- [ ] Matplotlib customization (labels, legends, subplots)
- [ ] Seaborn: `pairplot`, `heatmap`, `catplot`
- [ ] One chart per insight — never "chart for the sake of chart"
- [ ] **Mini project:** Reproduce 3 charts from a famous article (e.g., NYT, FT) using the same data

### Week 12 — Web scraping + APIs

- [ ] `requests` library: GET, POST, headers, auth
- [ ] BeautifulSoup basics: parse HTML
- [ ] JSON APIs: how to call them, rate limit, paginate
- [ ] **Mini project:** Scrape a public site (quotes.toscrape.com, books.toscrape.com) into a clean CSV. Push to GitHub.

### Week 13 — Data pipelines

- [ ] ETL vs ELT
- [ ] Write a pipeline: extract from API → transform with Pandas → load to SQLite/Postgres
- [ ] Scheduling: `cron` basics (you know this from Linux)
- [ ] **Mini project:** Build a daily pipeline that fetches GitHub trending repos, saves to a SQLite DB, generates a summary report. Run it for 7 days.

### Week 14 — Working with databases

- [ ] SQLite (local, easy)
- [ ] PostgreSQL basics (`brew install postgresql` or use Docker)
- [ ] Connect Python to DB with `sqlalchemy` or `psycopg2`
- [ ] **Mini project:** Take your Phase 1 EDA dataset, load into Postgres, query it 10 different ways

### Week 15 — Cloud data basics

- [ ] AWS S3: upload/download files with `boto3`
- [ ] BigQuery or Snowflake free tier — just connect, run a query
- [ ] **Mini project:** Store your GitHub pipeline output in S3 instead of local. Compare costs (use free tier).

### Week 16 — Capstone: Data Engineering Project

**Build a complete data pipeline project:**

- [ ] Source: pick a public API (weather, crypto, GitHub, Twitter)
- [ ] Extract: fetch daily, handle rate limits, errors
- [ ] Transform: clean, enrich, aggregate
- [ ] Load: Postgres or S3
- [ ] Orchestrate: `cron` or `prefect` (free tier)
- [ ] Monitor: log errors, alert on failure (email or Slack)
- [ ] Document: great README with architecture diagram (draw.io is free)
- [ ] **Push to GitHub. Write a LinkedIn post about it.**

---

## 🏆 Phase 2 done = you have:

- [ ] Strong SQL (joins, window functions, CTEs)
- [ ] Pandas power user
- [ ] Built and deployed a working data pipeline
- [ ] Comfortable with at least one cloud provider's basics
- [ ] GitHub: `data-pipeline-project` with great README

---

## 🛠️ Tools to install this phase

- [ ] PostgreSQL (or use Docker)
- [ ] DBeaver (free DB GUI)
- [ ] `boto3` (AWS SDK)
- [ ] `sqlalchemy`
- [ ] `requests`, `beautifulsoup4`
- [ ] Draw.io for architecture diagrams

---

## ⚠️ Common mistakes

1. ❌ **Skipping SQL practice.** It's the #1 interview skill.
2. ❌ **Only doing Kaggle-clean data.** Real data is UGLY. Get used to it now.
3. ❌ **Not learning any cloud.** Pick ONE (AWS or GCP), get the free tier.
4. ❌ **Over-engineering pipelines.** A cron + script is fine. Don't jump to Airflow yet.

---

## 💡 Pro tips from senior AI Engineers

> *"AI Engineers spend more time on data than on models. Get good at data work first."* — Hamza Ahmed (YouTube)

> *"If you can write a SQL query with 3 JOINs and 2 window functions in 5 minutes, you can pass 80% of AI interviews."* — Random senior eng on Twitter

---

## 🎯 End-of-phase check

- [ ] Can write window functions from memory
- [ ] Built a working pipeline that runs on a schedule
- [ ] Comfortable with at least one cloud provider
- [ ] 70+ commits in Phase 2 repo
- [ ] LinkedIn post about your pipeline

**All checked? Move to Phase 3.**

---

> **Next:** [Phase 3 — Classical ML with scikit-learn →](phase-3-ml-classical.md)
