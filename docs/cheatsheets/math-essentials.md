# 🔢 Math Essentials for AI — Just What You Need

> **You need INTUITION, not a math degree.** This is the minimum viable math.

---

## 📐 Linear Algebra

### Vectors
A list of numbers. Think of it as a point in space.
```python
import numpy as np
v = np.array([1, 2, 3])        # 3D vector
```

**Why you care:** Words, images, audio — everything in ML is a vector. Embeddings are vectors.

### Matrices
A 2D array of numbers. A spreadsheet of vectors.
```python
M = np.array([[1, 2, 3],
              [4, 5, 6]])       # 2x3 matrix
```

**Why you care:** A batch of data is a matrix. Weights in neural nets are matrices.

### Operations you MUST know

**Dot product** (most important)
```python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
np.dot(a, b)                    # 1*4 + 2*5 + 3*6 = 32
```
Used in: attention, similarity, embeddings, regression.

**Matrix multiplication**
```python
A = np.array([[1, 2], [3, 4]])  # 2x2
B = np.array([[5, 6], [7, 8]])  # 2x2
A @ B                            # 2x2 result
```
Used in: every neural network layer.

**Transpose** (flip rows/cols)
```python
A = np.array([[1, 2, 3],
              [4, 5, 6]])       # 2x3
A.T                              # 3x2
```

**Broadcasting** (NumPy auto-expands shapes)
```python
a = np.array([1, 2, 3])         # (3,)
a + 10                           # [11, 12, 13] — works!
```

### Norms (magnitudes)
- **L1 norm:** sum of absolute values. `np.linalg.norm(v, ord=1)`
- **L2 norm:** Euclidean distance. `np.linalg.norm(v)`
- **Cosine similarity:** dot product / (norms). Used everywhere in embeddings.

### Eigenvalues / eigenvectors
For PCA. You don't need to compute these by hand.

---

## 📈 Calculus

### Derivative
"How does y change when x changes a little?"

```
f(x) = x²
f'(x) = 2x     (derivative)
```

### Partial derivative
Derivative with respect to one variable, holding others fixed.
```
f(x, y) = x² + xy
∂f/∂x = 2x + y
∂f/∂y = x
```

### Chain rule
Derivative of composite functions. **This IS backprop.**
```
f(g(x))' = f'(g(x)) * g'(x)
```

### Gradient descent (the core of training)
```python
# Pseudocode
w = random_init()
for step in range(num_steps):
    gradient = compute_gradient(loss, w)
    w = w - learning_rate * gradient
```
You keep sliding "downhill" until you find the minimum.

**Why you care:** Every neural network learns via gradient descent. This is THE algorithm.

---

## 📊 Statistics

### Central tendency
- **Mean:** average. Sensitive to outliers.
- **Median:** middle value. Robust to outliers.
- **Mode:** most common value.

### Spread
- **Variance:** average of (x - mean)². Tells you how spread out.
- **Std dev (σ):** square root of variance. Same unit as data.
- **Percentiles:** P95 = 95% of data is below this.

```python
np.mean(arr)
np.median(arr)
np.std(arr)
np.percentile(arr, 95)
```

### Distributions

**Normal (Gaussian):**
- Bell curve
- Mean μ, std dev σ
- 68% within 1σ, 95% within 2σ, 99.7% within 3σ

**Bernoulli:**
- 0 or 1 (yes/no, click/no-click)
- One parameter: p (probability of 1)

**Uniform:**
- All values equally likely
- E.g., random initialization of weights

### Hypothesis testing
You don't need this deeply. Just know:
- **p-value:** probability of seeing this result if the null is true
- **p < 0.05:** "statistically significant" (in old-school stats)

### Correlation vs Causation
- Correlation: variables move together
- Causation: one causes the other
- **Ice cream sales and drownings correlate.** Both caused by summer. Neither causes the other.

---

## 🧮 Probability for ML

### Joint, marginal, conditional
- P(A, B): probability of both A and B
- P(A): probability of A
- P(A | B): probability of A given B happened

### Bayes' theorem (in interviews, sometimes)
```
P(A | B) = P(B | A) * P(A) / P(B)
```
Used in: Naive Bayes classifier, Bayesian inference.

### Cross-entropy loss (THE loss for classification)
```
loss = -sum(y_true * log(y_pred))
```
- Penalizes confident wrong predictions heavily
- Use this for multi-class classification

### KL divergence
How different two distributions are. Used in RLHF, VAEs.

---

## 🎯 Quick reference: the 10 math concepts in interviews

| Concept | Used in | Intuition |
|---------|---------|-----------|
| Vector dot product | Attention, similarity | "How aligned are two vectors?" |
| Matrix multiplication | Every neural net | "Linear transformation of input" |
| Softmax | Classification output | "Convert scores to probabilities" |
| Cross-entropy | Classification loss | "Penalty for wrong predictions" |
| Gradient descent | All training | "Walk downhill to find minimum" |
| Chain rule | Backpropagation | "How change propagates through layers" |
| Normal distribution | Weight init, noise | "Bell curve" |
| Cosine similarity | Embeddings, search | "Angle between vectors" |
| L1/L2 regularization | Avoid overfitting | "Penalty for large weights" |
| Bias-variance tradeoff | Model selection | "Underfit vs overfit balance" |

---

## 🛠️ Tools (you don't need to derive, just understand)

| Tool | What it does | When you use it |
|------|--------------|-----------------|
| `np.linalg.eig` | Eigenvalues/vectors | PCA |
| `np.linalg.norm` | Vector length | Distance, regularization |
| `np.linalg.inv` | Matrix inverse | Linear regression (analytical) |
| `scipy.optimize` | Find minimum | Gradient descent alternatives |
| `scipy.stats` | Distributions, tests | Hypothesis testing |
| `sklearn.decomposition.PCA` | PCA | Dimensionality reduction |
| `torch.autograd` | Auto differentiation | PyTorch training |

---

## 📺 Best math resources (watch, don't memorize)

| Resource | Time | What it covers |
|----------|------|----------------|
| [3Blue1Brown — Linear Algebra](https://www.3blue1brown.com/topics/linear-algebra) | 4 hrs | Vectors, matrices, transformations |
| [3Blue1Brown — Calculus](https://www.3blue1brown.com/topics/calculus) | 3 hrs | Derivatives, chain rule |
| [3Blue1Brown — Neural Networks](https://www.3blue1brown.com/topics/neural-networks) | 2 hrs | How NNs learn |
| [StatQuest — Stats](https://www.youtube.com/c/joshstarmer) | 8 hrs | Stats fundamentals |
| [Khan Academy — Linear Algebra](https://www.khanacademy.org/math/linear-algebra) | 20 hrs | Deeper, slower |

**Minimum viable math: Watch all 3Blue1Brown series (9 hrs total). Stop there for interviews.**

---

## ⚠️ What to SKIP

- ❌ Manual matrix inversion (use NumPy)
- ❌ Deriving backprop by hand
- ❌ Eigenvalue decomposition by hand
- ❌ Probability proofs
- ❌ Topology, measure theory, abstract algebra
- ❌ 3B1B's "Differential Equations" (unless you love it)

---

## 💡 The "good enough" math mindset

**Goal:** You should be able to:
- Look at a formula and know what it does
- Explain it to a smart non-technical person
- Debug when the math is "off" (e.g., exploding gradients)
- Read a paper and follow the math

**Not the goal:**
- Derive everything from scratch
- Pass a math olympiad
- Get a math PhD

---

> **Next cheatsheet:** [LLM Concepts →](llm-concepts.md)
