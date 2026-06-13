# 🔍 RAG Patterns — Production-Ready

> **RAG is the most common AI Engineer interview topic. Master these patterns.**

---

## 🎯 What is RAG (recap)

**Retrieval-Augmented Generation.** Ground LLM answers in your data.

```
User question
    ↓
[1. Embed question]
    ↓
[2. Search vector DB → top-k chunks]
    ↓
[3. Inject chunks into prompt]
    ↓
[4. LLM generates answer with sources]
    ↓
Answer (with citations)
```

**Why it matters:**
- Reduces hallucination
- Keeps knowledge up to date
- Works with private/proprietary data
- Cheaper than fine-tuning for "knowledge" tasks

---

## 🧱 Naive RAG (the starter)

```python
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI

# 1. Load
loader = PyPDFLoader("doc.pdf")
docs = loader.load()

# 2. Chunk
splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
chunks = splitter.split_documents(docs)

# 3. Embed + store
vectorstore = Chroma.from_documents(chunks, OpenAIEmbeddings())

# 4. Retrieve + generate
qa = RetrievalQA.from_chain_type(
    llm=OpenAI(),
    retriever=vectorstore.as_retriever(k=4)
)
answer = qa.run("What is the refund policy?")
```

**Problem:** This works 60% of the time. Production needs more.

---

## 🏗️ The 7 production patterns (in order of complexity)

### Pattern 1: Better chunking

**Naive:** Fixed-size chunks. Loses context at boundaries.

**Better:**

**Semantic chunking** — split based on meaning, not size
```python
from langchain_experimental.text_splitter import SemanticChunker
from langchain.embeddings import OpenAIEmbeddings

splitter = SemanticChunker(
    OpenAIEmbeddings(),
    breakpoint_threshold_type="percentile"
)
```

**Recursive character splitting** — split on natural boundaries
```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    separators=["\n\n", "\n", ". ", " ", ""]
)
```

**Late chunking** — embed full doc, then chunk in vector space (advanced)

**Pro tip:** Chunk size matters. 500-1500 tokens usually sweet spot. Test on YOUR data.

### Pattern 2: Hybrid search (BM25 + dense)

Dense embeddings miss exact keyword matches. BM25 catches them. Combine both.

```python
from langchain.retrievers import BM25Retriever, EnsembleRetriever
from langchain.vectorstores import Chroma

# BM25 (keyword)
bm25 = BM25Retriever.from_documents(chunks)
bm25.k = 5

# Dense (semantic)
dense = Chroma.from_documents(chunks, OpenAIEmbeddings()).as_retriever(k=5)

# Ensemble
hybrid = EnsembleRetriever(
    retrievers=[bm25, dense],
    weights=[0.3, 0.7]  # tune these
)
```

### Pattern 3: Reranking

Initial retrieval is fast but rough. Rerank with a slower, more accurate model.

```python
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import CohereRerank

compressor = CohereRerank(model="rerank-english-v3.0", top_n=3)
reranker = ContextualCompressionRetriever(
    base_compressor=compressor,
    base_retriever=hybrid  # from pattern 2
)

results = reranker.get_relevant_documents("What is the refund policy?")
```

**Why:** Top 10 might have noise. Reranker picks best 3. Quality boost of 10-30%.

### Pattern 4: Query transformation

User queries are messy. Improve them before searching.

**Multi-query:** Generate 3-4 variants of the question, search all, merge.
```python
from langchain.retrievers.multi_query import MultiQueryRetriever

retriever = MultiQueryRetriever.from_llm(
    retriever=base_retriever,
    llm=OpenAI()
)
```

**HyDE** (Hypothetical Document Embeddings): Generate a fake answer, embed THAT, search for similar real chunks.

**Step-back:** First answer a broader question, then the specific one.

### Pattern 5: Metadata filtering

Tag chunks with metadata. Filter before/after retrieval.

```python
chunks_with_meta = [
    Document(
        page_content="...",
        metadata={"source": "policy.pdf", "year": 2024, "category": "legal"}
    )
]

# Filter
results = vectorstore.similarity_search(
    query="refund policy",
    filter={"category": "legal", "year": 2024}
)
```

### Pattern 6: Conversational RAG

Add chat history to the retrieval query.

```python
from langchain.chains import create_history_aware_retriever

# Reformulates question based on chat history
retriever = create_history_aware_retriever(
    llm,
    base_retriever,
    prompt  # asks LLM to rephrase the question
)
```

### Pattern 7: Citation / source attribution

Force the model to cite which chunk each claim came from.

```python
system_prompt = """
Answer the question based ONLY on the context below.
For each claim, cite the source number in brackets [1], [2], etc.

Context:
[1] Refund policy: 30-day full refund...
[2] Pricing: $99/month...
[3] Support: 24/7 chat...

Question: What's the refund policy?
"""
```

Or use the `citation` flag in some LLM APIs (e.g., Anthropic).

---

## 📊 The RAG architecture diagram

```
                         User Query
                              │
                              ▼
                  ┌───────────────────────┐
                  │  Query Transformation │
                  │  (rewrite, expand)    │
                  └───────────┬───────────┘
                              │
                              ▼
                  ┌───────────────────────┐
                  │  Hybrid Retrieval     │
                  │  (BM25 + dense)       │
                  └───────────┬───────────┘
                              │
                              ▼ top-50 candidates
                  ┌───────────────────────┐
                  │  Reranking            │
                  │  (Cohere / cross-enc) │
                  └───────────┬───────────┘
                              │
                              ▼ top-5
                  ┌───────────────────────┐
                  │  Context Formatting   │
                  │  (prompt with chunks) │
                  └───────────┬───────────┘
                              │
                              ▼
                  ┌───────────────────────┐
                  │  LLM Generation       │
                  │  (with citations)     │
                  └───────────┬───────────┘
                              │
                              ▼
                      Answer + Sources
```

---

## 🛠️ Production checklist

### Before launch
- [ ] Eval set of 50+ questions with ground truth answers
- [ ] Tested with edge cases (empty queries, very long queries, weird queries)
- [ ] Citations work and are accurate
- [ ] Cost per query < your business threshold
- [ ] P95 latency < your SLA
- [ ] Streaming works
- [ ] Error handling for LLM API failures
- [ ] Fallback when no relevant docs found

### Observability
- [ ] Trace every step (use LangSmith or LangFuse)
- [ ] Log: question, retrieved chunks, prompt, response, cost, latency
- [ ] Dashboard: queries/day, success rate, avg cost, p95 latency
- [ ] Alerts: API failures, cost spikes, latency spikes

### Safety
- [ ] Prompt injection defense (delimiters, validation)
- [ ] PII detection/redaction
- [ ] Content moderation
- [ ] Rate limiting per user
- [ ] Allowlist of approved sources

---

## 💰 Cost optimization

A naive RAG can be $0.10+ per query. Production should be $0.001-0.01.

**Techniques:**

1. **Cache repeated queries** (exact match, semantic)
```python
import redis
cache = redis.Redis()

def cached_query(q, threshold=0.95):
    # Check exact match
    cached = cache.get(q)
    if cached:
        return cached

    # Check semantic match
    # (embed q, search cache for similar, return if above threshold)
```

2. **Use smaller embedding models** when possible
- `text-embedding-3-small` (1536 dim, $0.02/1M tokens) > `text-embedding-3-large` (3072 dim, $0.13/1M tokens) for most cases

3. **Use smaller LLMs** for first pass, escalate
```python
def rag_query(question):
    # First try with cheap model
    answer = call_llm("gpt-4o-mini", question, context)
    if is_confident(answer):
        return answer
    # Escalate
    return call_llm("gpt-4o", question, context)
```

4. **Reduce context size**
- Top-k = 3 instead of 10
- Smaller chunks (500 tokens vs 1500)
- Compress chunks before prompting

5. **Batch queries** when possible
- OpenAI Batch API: 50% discount, 24h SLA

---

## 📏 Evaluation (RAGAS)

```python
from ragas import evaluate
from ragas.metrics import (
    faithfulness,
    context_precision,
    context_recall,
    answer_relevancy
)

# Your eval set
eval_data = {
    "question": ["What's the refund policy?", "What's the price?"],
    "answer": ["30-day refund.", "$99/month."],
    "contexts": [["30-day full refund..."], ["$99/month..."]],
    "ground_truth": ["30-day full refund policy", "$99 per month"]
}

# Evaluate
result = evaluate(
    eval_data,
    metrics=[faithfulness, context_precision, context_recall, answer_relevancy]
)
print(result)
```

**Metrics explained:**

| Metric | What it measures | Target |
|--------|------------------|--------|
| **Faithfulness** | Is the answer grounded in the context? (no hallucination) | > 0.9 |
| **Context precision** | Are retrieved chunks relevant? | > 0.8 |
| **Context recall** | Did we retrieve all needed info? | > 0.8 |
| **Answer relevancy** | Does it answer the question? | > 0.85 |

---

## 🧪 A/B testing different pipelines

```python
import random

def rag_pipeline_v1(question):
    # Simple: dense retrieval, top-4, no rerank
    ...

def rag_pipeline_v2(question):
    # Hybrid + rerank, top-3
    ...

def answer(question):
    if random.random() < 0.5:
        return rag_pipeline_v1(question), "v1"
    else:
        return rag_pipeline_v2(question), "v2"

# Log which version was used
# Compare evals after 1000+ queries
```

---

## 🛢️ Vector DB comparison

| DB | Type | Free tier | Best for |
|----|------|-----------|----------|
| **Chroma** | Local-first, embedded | Yes (unlimited local) | Prototypes, small prod |
| **Pinecone** | Cloud, managed | 1M vectors, 1 index | Production, scale |
| **Weaviate** | Self-host or cloud | Yes | Hybrid search, complex queries |
| **Qdrant** | Self-host or cloud | Yes | Fast, Rust-based |
| **pgvector** | Postgres extension | Yes (Postgres) | Existing Postgres users |
| **Milvus** | Self-host or cloud | Yes | Massive scale |

**For most projects:** Start with Chroma (local), move to Pinecone for production.

---

## 🐛 Common failure modes

1. **Chunk too small** → loses context, model can't answer
2. **Chunk too large** → mixes multiple topics, confuses retrieval
3. **No overlap** → context lost at boundaries
4. **Embedding wrong content** → garbage in, garbage out
5. **Top-k too small** → misses info
6. **Top-k too large** → confuses model with noise
7. **No reranking** → noise in top results
8. **No eval** → can't tell if it's getting better
9. **No citations** → users don't trust answers
10. **Hallucinated citations** → even worse, model cites chunk that doesn't support claim

**Solution for #10:** Extract citations AFTER generation, not as part of it. Validate that cited chunks actually support the claim.

---

## 📚 RAG project ideas (for portfolio)

1. **PDF Q&A for your domain** (legal, medical, finance, code)
2. **Documentation chatbot** (for a popular open-source project)
3. **Customer support agent** (for a niche product)
4. **Research assistant** (paper search + summarization)
5. **Internal company knowledge base** (HR, IT, policies)
6. **Codebase Q&A** (search your own repos)
7. **News Q&A** (RAG over real-time articles)
8. **Multilingual RAG** (Hindi, Tamil, etc.)

---

## 🎯 TL;DR — The 5 things to do for production RAG

1. **Hybrid search** (BM25 + dense)
2. **Reranking** (Cohere or cross-encoder)
3. **Eval suite** (RAGAS, 50+ questions)
4. **Observability** (LangSmith, log everything)
5. **Cost optimization** (cache, smaller models, semantic dedup)

If you have these, you're in the top 10% of RAG practitioners.

---

> **Back to:** [LLM Concepts ←](llm-concepts.md) | [Prompt Engineering ←](prompt-engineering.md)
