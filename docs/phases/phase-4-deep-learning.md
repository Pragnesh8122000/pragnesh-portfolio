# Phase 4 — Deep Learning with PyTorch (Month 4-5)

> **Goal:** Understand how neural networks work. Build CNNs, RNNs, and Transformers.
> **Time:** ~2 hrs/day, 6 days/week
> **Output:** A trained deep learning model + solid understanding of backprop

---

## 🎯 Why this phase matters

LLMs are deep learning. If you don't understand backprop, attention, embeddings, you'll be a tourist in the AI world — not a practitioner.

But you don't need to memorize formulas. You need to **understand the WHY**.

---

## 📅 Week-by-week

### Week 25 — Neural networks from scratch

- [ ] Perceptron, multi-layer perceptron (MLP)
- [ ] Forward pass, backward pass (backprop)
- [ ] Activation functions: ReLU, sigmoid, tanh
- [ ] **Code from scratch:** A 2-layer NN in NumPy to classify MNIST
- [ ] **Resource:** [3Blue1Brown — Neural Networks](https://www.3blue1brown.com/topics/neural-networks) (all 6 videos)

### Week 26 — PyTorch fundamentals

- [ ] Tensors, autograd, `nn.Module`
- [ ] `DataLoader`, `Dataset`
- [ ] Training loop: forward, loss, backward, optimizer step
- [ ] GPU acceleration (`to('cuda')`)
- [ ] **Mini project:** Same MNIST, but in PyTorch. Should be 5x faster and cleaner.

**Resource:** [PyTorch official tutorial — 60 Minute Blitz](https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html)

### Week 27 — Training tricks

- [ ] Optimizers: SGD, Adam, AdamW
- [ ] Learning rate scheduling
- [ ] Batch normalization, dropout
- [ ] Weight initialization
- [ ] **Mini project:** Train MNIST with 3 different optimizers. Plot loss curves. Compare.

### Week 28 — CNNs for images

- [ ] Convolution, pooling, stride, padding
- [ ] ResNet, VGG, EfficientNet (high level)
- [ ] Transfer learning: take a pretrained model, fine-tune on your data
- [ ] **Mini project:** Use a pretrained ResNet to classify cats vs dogs. <2 hours, 95%+ accuracy.

**Resource:** [PyTorch transfer learning tutorial](https://pytorch.org/tutorials/beginner/transfer_learning_tutorial.html)

### Week 29 — RNNs, LSTMs, GRUs

- [ ] Why sequence matters
- [ ] RNN, LSTM, GRU architectures
- [ ] Vanishing gradients (intuition)
- [ ] **Mini project:** Text generation with LSTM on Shakespeare
- [ ] **Important:** Don't get stuck here. Modern AI is all transformers.

### Week 30 — Transformers (the big one)

- [ ] Self-attention, multi-head attention
- [ ] Positional encoding
- [ ] Encoder vs decoder
- [ ] **This is the architecture behind ChatGPT, BERT, Gemini, etc.**
- [ ] **Resource:** [Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) (read 3x)
- [ ] [Andrej Karpathy — Let's build GPT from scratch](https://www.youtube.com/watch?v=kCc8FmEb1nY) (4 hrs, REWATCH this multiple times)

### Week 31 — Hugging Face Transformers

- [ ] `pipeline()` API (easiest way)
- [ ] AutoModel, AutoTokenizer
- [ ] Loading pretrained models (BERT, GPT-2, etc.)
- [ ] **Mini project:** Use Hugging Face pipeline for: text classification, NER, summarization, translation, Q&A. All in 50 lines.

**Resource:** [HF course — Chapters 1-4](https://huggingface.co/learn/nlp-course) (free, gold standard)

### Week 32 — Capstone: Deep learning project

**Build ONE polished DL project:**

- [ ] Option A: **Image classifier** with transfer learning, deployed on Hugging Face Spaces (Gradio)
- [ ] Option B: **Sentiment analysis** with a fine-tuned BERT
- [ ] Option C: **Text generator** (small GPT, trained on a dataset you care about)
- [ ] Use a real dataset
- [ ] Document training process, metrics, results
- [ ] Deploy with a UI
- [ ] Great README + LinkedIn post

---

## 🏆 Phase 4 done = you have:

- [ ] Solid understanding of backprop, attention, transformers
- [ ] Comfortable with PyTorch
- [ ] Comfortable with Hugging Face
- [ ] Deployed a DL model with a UI
- [ ] Can explain transformers to a friend

---

## 📚 Resource priority

| # | Resource | Cost | Time | Why |
|---|----------|------|------|-----|
| 1 | 3Blue1Brown — Neural Networks | Free | 2 hrs | Best visual intro |
| 2 | Andrej Karpathy — "Let's build GPT" | Free | 4 hrs | **The single most important video for AI engineering** |
| 3 | Hugging Face NLP Course Ch 1-4 | Free | 8 hrs | Industry standard tooling |
| 4 | PyTorch 60-min blitz | Free | 1 hr | Quick onboarding |
| 5 | Fast.ai — Practical Deep Learning | Free | 20 hrs | Top-down approach (optional, comprehensive) |
| 6 | Illustrated Transformer | Free | 1 hr | Best diagram-based explanation |

---

## ⚠️ Common mistakes

1. ❌ **Memorizing formulas instead of building intuition.** Use 3Blue1Brown.
2. ❌ **Spending 3 months on CNN theory.** You don't need to be a vision expert. Be a generalist.
3. ❌ **Skipping Karpathy's "Let's build GPT."** Watch it. Twice. Code along.
4. ❌ **Not using Hugging Face.** It's the de-facto standard. Master it now.
5. ❌ **No GPU panic.** Most of your training can happen on Google Colab (free) or Kaggle (free).

---

## 💡 Pro tips

> *"You don't need to understand the math to use deep learning. You need to understand it to debug it."* — fast.ai

> *"Watch Karpathy's video. Then watch it again. Then code along. Then watch it a third time."* — every senior AI eng

---

## 🛠️ Setup checklist

- [ ] PyTorch installed: `pip install torch`
- [ ] Hugging Face account created
- [ ] Google Colab account (free GPU)
- [ ] Kaggle account (free GPU, 30 hrs/week)
- [ ] WandB account (free for personal) for experiment tracking

---

## 🎯 End-of-phase check

- [ ] Can explain self-attention in plain English
- [ ] Built and deployed a DL model with a UI
- [ ] Have 100+ commits total
- [ ] Comfortable using Hugging Face pipelines
- [ ] Can train a model on Colab/Kaggle

**All checked? Move to Phase 5 — LLMs and GenAI (the money phase).**

---

> **Next:** [Phase 5 — LLMs & GenAI →](phase-5-llms-genai.md)
