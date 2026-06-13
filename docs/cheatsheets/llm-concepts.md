# 🤖 LLM Concepts — Quick Reference

> **Save this for interview prep and quick review.** Covers 95% of LLM questions you'll get.

---

## 🧠 What is an LLM?

**LLM = Large Language Model.** A neural network trained on massive text to do next-token prediction.

```python
# What an LLM does, simplified:
def predict_next_token(context: str) -> str:
    return most_likely_next_word_given(context)
```

GPT, Claude, Gemini, Llama, Mistral — all LLMs.

---

## 🏗️ The Transformer (the architecture)

### The big picture

```
Input tokens
    ↓
[Token embedding + positional encoding]
    ↓
[Transformer block × N] (12, 24, 96 layers depending on size)
    ↓
[Output: probability distribution over next token]
```

### Transformer block

```
Input
  ↓
[Multi-Head Self-Attention] ──→ (residual + layer norm)
  ↓
[Feed-Forward Network]      ──→ (residual + layer norm)
  ↓
Output
```

### Self-Attention (the key idea)

Every token "looks at" every other token and decides what to focus on.

**Step by step:**

1. For each token, create 3 vectors from its embedding:
   - **Query (Q):** "what am I looking for?"
   - **Key (K):** "what do I contain?"
   - **Value (V):** "what info do I provide?"

2. For each pair of tokens (i, j), compute:
   ```
   attention_score(i, j) = Q_i · K_j / sqrt(d_k)
   ```

3. Apply softmax to get attention weights (sum to 1).

4. Output for token i = weighted sum of all V's, using these weights.

**Formula:**
```
Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) * V
```

**Why it works:**
- "Bank" in "river bank" attends to "river"
- "Bank" in "savings bank" attends to "savings"
- Same word, different context, different representation

### Multi-Head Attention

Run multiple attention "heads" in parallel, each learning a different kind of relationship. Concatenate results.

```python
# Pseudocode
heads = [attention(Q, K, V) for _ in range(num_heads)]
output = concat(heads) @ W_O
```

### Positional encoding

Transformers process all tokens in parallel — they have no inherent notion of order. So we add positional info to each embedding.

```python
# Sinusoidal (original) or learned (modern)
# Token embedding + positional encoding → input to first layer
```

---

## 🔄 Encoder vs Decoder vs Encoder-Decoder

| Type | Attention | Examples | Best for |
|------|-----------|----------|----------|
| **Encoder** | Bidirectional (sees full context) | BERT, RoBERTa | Classification, NER, embeddings, search |
| **Decoder** | Causal/masked (sees only left) | GPT, Llama, Claude | Generation, chat |
| **Encoder-Decoder** | Both | T5, BART | Translation, summarization |

**Causal mask:** upper triangular of zeros, prevents token from "looking ahead."

```python
# Causal mask
mask = np.triu(np.ones((seq_len, seq_len)), k=1) * -1e9
# Add to attention scores before softmax
```

---

## 🏋️ How LLMs are trained

### 1. Pre-training (the expensive part)

- **Data:** Trillions of tokens from the web, books, code
- **Objective:** Next token prediction
- **Cost:** Millions of dollars
- **Duration:** Weeks to months on thousands of GPUs
- **Result:** Base model. Knows language, but not "chatty"

```python
# Training objective (simplified)
loss = cross_entropy(model_output, actual_next_token)
```

### 2. Fine-tuning (Supervised Fine-Tuning / SFT)

- **Data:** Thousands of high-quality (prompt, response) pairs
- **Objective:** Generate the response given the prompt
- **Cost:** Thousands of dollars
- **Result:** Model that follows instructions

### 3. RLHF (Reinforcement Learning from Human Feedback)

Three steps:
1. Collect human preferences: "which of these 2 responses is better?"
2. Train a **reward model** to predict human preferences
3. Fine-tune the LM with PPO to maximize the reward model's score

**Modern alternative: DPO (Direct Preference Optimization)**
- Skip the reward model
- Directly optimize LM on preference data
- Simpler, more stable, often better

### 4. Modern alternatives

- **RLAIF:** Use AI to generate preferences (cheaper)
- **Constitutional AI:** AI critiques itself based on principles
- **Self-play / RLAIF:** Model improves by competing with itself
- **Process reward models:** Reward reasoning steps, not just final answer

---

## 📏 Key numbers you should know

| Parameter | Model | Date |
|-----------|-------|------|
| 117M | GPT-1 | 2018 |
| 1.5B | GPT-2 | 2019 |
| 175B | GPT-3 | 2020 |
| 7B-70B | Llama 2 | 2023 |
| 8B, 70B, 405B | Llama 3 | 2024 |
| ~1.76T | GPT-4 (rumored) | 2023 |
| 8B, 70B | Mistral, Mixtral | 2023-24 |
| 3.8B, 27B | Phi-3 | 2024 |

| Context length | Model |
|----------------|-------|
| 2K | Original GPT-3 |
| 4K-8K | GPT-3.5, Llama 2 |
| 32K | Llama 2 32k, Claude 2 |
| 128K | GPT-4, Claude 3 |
| 200K | Claude 3.5 |
| 1M-2M | Gemini 1.5 Pro |

---

## 🎓 Core LLM terms

**Token:** ~4 characters of English text. "Hello" = 1 token. "Tokenizer" = 2 tokens.

**Context window:** Max tokens the model can see at once. 128K = ~100K words ≈ a small book.

**Embeddings:** Vector representation of text. Similar text → similar vectors.
```python
embedding = model.encode("hello world")  # e.g., 1536-dim vector
```

**Temperature:** Controls randomness. 0 = deterministic, 1 = default, 2 = chaotic.
- 0.0-0.3: factual, code, classification
- 0.7-1.0: creative writing

**Top-p (nucleus sampling):** Sample from the smallest set of tokens whose probabilities sum to p.
- 0.1 = very focused
- 0.9 = more diverse

**Top-k:** Sample from the k most likely tokens.
- top-k=1 = greedy (always pick best)
- top-k=40 = default-ish

**System prompt:** Instructions that shape model behavior. Set once, persistent.

**Few-shot prompting:** Give examples in the prompt. Helps with format/pattern.

**Zero-shot:** No examples. Just ask.

**Chain-of-thought (CoT):** Ask the model to "think step by step." Improves reasoning.

**ReAct:** Reason + Act. Agent loops: think → act → observe → repeat.

**Hallucination:** Model generates plausible but false information.

---

## 🛠️ Common LLM operations

### Completion / chat
```python
from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

### Streaming
```python
stream = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[...],
    stream=True
)
for chunk in stream:
    print(chunk.choices[0].delta.content or "", end="")
```

### Function calling / tools
```python
tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "Get weather for a city",
        "parameters": {
            "type": "object",
            "properties": {
                "city": {"type": "string"}
            }
        }
    }
}]
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[...],
    tools=tools
)
```

### Structured output (JSON mode)
```python
from pydantic import BaseModel
from openai import OpenAI
import instructor

client = instructor.from_openai(OpenAI())

class User(BaseModel):
    name: str
    age: int
    email: str

user = client.chat.completions.create(
    model="gpt-4o-mini",
    response_model=User,
    messages=[{"role": "user", "content": "Extract: John, 30, john@example.com"}]
)
```

### Embeddings
```python
response = client.embeddings.create(
    model="text-embedding-3-small",
    input="Hello world"
)
vector = response.data[0].embedding  # list of 1536 floats
```

---

## 🔍 RAG (Retrieval-Augmented Generation)

**Why:** LLMs hallucinate. RAG grounds answers in real documents.

**Flow:**
```
User question
    ↓
[1. Embed question] → vector
    ↓
[2. Search vector DB] → top-k similar chunks
    ↓
[3. Put chunks in prompt]
    ↓
[4. LLM generates answer with citations]
    ↓
Answer (with sources)
```

**Components:**
- **Chunking:** Split docs into 500-2000 token chunks
- **Embedding model:** text-embedding-3-small, BGE, etc.
- **Vector DB:** Pinecone, Weaviate, Chroma, pgvector
- **Reranker:** Cohere, cross-encoder (improves quality)
- **LLM:** GPT-4, Claude, etc.

**When to use RAG:**
- ✅ Data changes frequently
- ✅ Need citations
- ✅ Knowledge is too large for context
- ✅ Want to update without retraining

**When NOT to use RAG:**
- ❌ Style/format transfer (use fine-tuning)
- ❌ Real-time events (use tools)
- ❌ Math/logic (use chain-of-thought + tools)

See [rag-patterns.md](rag-patterns.md) for production patterns.

---

## 🤖 Agents

**An agent = LLM + loop + tools + memory.**

```
┌─────────────────────────────────┐
│                                 │
│    ┌──────────┐                 │
│    │   LLM    │                 │
│    └────┬─────┘                 │
│         │                       │
│         ▼                       │
│   [Plan next step]              │
│         │                       │
│         ▼                       │
│   [Call tool]                   │
│         │                       │
│         ▼                       │
│   [Observe result]              │
│         │                       │
│         ▼                       │
│   [Done? → Return answer]       │
│   [No?   → Loop back]           │
│                                 │
└─────────────────────────────────┘
```

**Frameworks:**
- **LangGraph:** State machines. Production-grade.
- **CrewAI:** Multi-agent "crews" with roles.
- **AutoGen:** Microsoft. Multi-agent conversations.
- **LlamaIndex Agents:** Simpler, less popular for complex agents.

**Patterns:**
- **ReAct:** Reason + Act loop
- **Plan-and-Execute:** Plan all steps, execute
- **Multi-agent:** Specialized agents collaborate
- **Reflection:** Agent critiques its own work

**Production concerns:**
- **Cost:** Agents can burn $50 in 5 min without guardrails
- **Latency:** Multi-step = slow. Add timeouts.
- **Safety:** Confirm before destructive actions
- **Eval:** Success rate, cost per task, tool call accuracy

---

## 💡 Fine-tuning vs RAG vs Prompting

| Approach | Use when | Cost | Time |
|----------|----------|------|------|
| **Prompting** | Most cases | $0 | Minutes |
| **RAG** | Need current/private data | $$ | Hours |
| **Fine-tuning** | Need new style/skill/format | $$$ | Days |
| **Pre-training** | Foundation models only | $$$$$$ | Months |

**Rule of thumb:** Always start with prompting. Add RAG when you need facts. Fine-tune only when prompting + RAG aren't enough.

---

## 📊 Common model sizes & use cases

| Size | Use case | Self-hostable? |
|------|----------|----------------|
| <1B | Embedding, classification | Yes (CPU) |
| 1-3B | Simple chat, on-device | Yes (laptop GPU) |
| 7-8B | Good chat, instruction following | Yes (1 GPU) |
| 13-30B | Strong chat, code | Yes (1-2 GPUs) |
| 70B | Near GPT-4 quality | Yes (multi-GPU, expensive) |
| 100B+ | Frontier | OpenAI, Anthropic, Google only |

---

## 💰 Cost comparison (per 1M tokens, 2026 estimates)

| Model | Input | Output | Notes |
|-------|-------|--------|-------|
| GPT-4o-mini | $0.15 | $0.60 | Best $/quality for most tasks |
| GPT-4o | $2.50 | $10.00 | Frontier |
| Claude 3.5 Haiku | $0.80 | $4.00 | Fast, good |
| Claude 3.5 Sonnet | $3.00 | $15.00 | Top coding |
| Gemini 1.5 Flash | $0.075 | $0.30 | Cheapest |
| Mistral Large | $2.00 | $6.00 | European, strong |
| Llama 3 70B (self-host) | ~$0.50 | ~$0.50 | One-time setup + GPU |

---

## 🧪 Evaluation

**Why evals matter:** "It feels good" is not enough. You need numbers.

**For RAG:**
- **Faithfulness:** Is the answer in the context? (no hallucination)
- **Answer relevancy:** Does it answer the question?
- **Context precision:** Are retrieved chunks relevant?
- **Context recall:** Did we retrieve everything needed?

**Tool: RAGAS** — generates test sets, scores your RAG.

**For agents:**
- **Task success rate:** % of tasks completed correctly
- **Tool call accuracy:** % of correct tool calls
- **Cost per task**
- **Latency**

**For fine-tuned models:**
- Compare to base model on a held-out set
- Human eval (often gold standard)

---

## ⚠️ Common gotchas in production

1. **Token costs add up fast.** Always set budgets.
2. **Latency.** Streaming is critical. Cache where possible.
3. **Prompt injection.** Users will try to break your system. Defend.
4. **Hallucinations.** Always validate critical outputs.
5. **Context overflow.** Summarize or truncate history.
6. **Rate limits.** Implement backoff, queues.
7. **Reproducibility.** Pin model versions, log all params.

---

> **Next cheatsheet:** [Prompt Engineering →](prompt-engineering.md)
