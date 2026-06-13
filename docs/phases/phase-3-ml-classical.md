# Phase 3 — Classical ML with scikit-learn (Month 3-4)

> **Goal:** Understand the ML workflow, build classical ML models, evaluate them properly.
> **Time:** ~2 hrs/day, 6 days/week
> **Output:** 2-3 ML projects on GitHub

---

## 🎯 Why this phase matters

Before you can do Deep Learning, you need to understand the fundamentals:
- Train/test split, cross-validation
- Overfitting, underfitting, bias/variance
- Feature engineering
- Evaluation metrics (accuracy is NOT enough)

**Skipping this = your DL will be a black box. Don't.**

---

## 📅 Week-by-week

### Week 17 — ML concepts (theory)

- [ ] What is ML? Supervised vs unsupervised vs reinforcement
- [ ] Train/validation/test split
- [ ] Overfitting vs underfitting
- [ ] Bias-variance tradeoff
- [ ] Cross-validation: k-fold
- [ ] **Resource:** [Andrew Ng — Machine Learning Specialization, Course 1](https://www.coursera.org/specializations/machine-learning-introduction) (audit free). Week 1-3 only.

### Week 18 — Linear & Logistic Regression

- [ ] Linear regression from scratch (use NumPy)
- [ ] Logistic regression from scratch
- [ ] Loss functions: MSE, cross-entropy
- [ ] Gradient descent (you learned this in Phase 1)
- [ ] **Mini project:** Predict house prices (Boston housing or California housing). Compare to scikit-learn's implementation.

**Resource:** StatQuest — Linear Regression, Logistic Regression videos.

### Week 19 — scikit-learn workflow

- [ ] `fit`, `predict`, `score`
- [ ] Pipelines (`sklearn.pipeline.Pipeline`)
- [ ] `ColumnTransformer` for mixed numeric/categorical data
- [ ] **Mini project:** Titanic dataset — predict survival. Use a proper pipeline.

### Week 20 — Trees & Ensembles

- [ ] Decision trees: how they split
- [ ] Random Forest
- [ ] XGBoost, LightGBM (these win most Kaggle tabular comps)
- [ ] Feature importance
- [ ] **Mini project:** Titanic with XGBoost. Compare to logistic regression. Why is XGBoost better?

**Resource:** [StatQuest — Random Forest](https://www.youtube.com/watch?v=J4Wdy0Wc_xQ), [XGBoost explained](https://www.youtube.com/watch?v=OtD8wVaFm6E)

### Week 21 — Classification metrics

- [ ] Accuracy, precision, recall, F1
- [ ] Confusion matrix
- [ ] ROC curve, AUC
- [ ] When to use what (imbalanced classes!)
- [ ] **Mini project:** Take any classification problem, report ALL metrics, not just accuracy.

### Week 22 — Feature engineering

- [ ] One-hot encoding, label encoding
- [ ] Scaling: StandardScaler, MinMaxScaler
- [ ] Feature creation, feature selection
- [ ] Handling imbalance: SMOTE, class weights
- [ ] **Mini project:** Take a messy dataset, do feature engineering, show 5%+ improvement.

### Week 23 — Unsupervised learning

- [ ] K-means clustering
- [ ] PCA (dimensionality reduction)
- [ ] t-SNE, UMAP (visualization)
- [ ] **Mini project:** Cluster customers, visualize with t-SNE.

### Week 24 — Capstone: End-to-end ML project

**Build ONE polished ML project:**

- [ ] Pick a problem (real-world, interesting)
- [ ] Get the data (Kaggle, UCI, or scrape)
- [ ] EDA, cleaning, feature engineering
- [ ] Try 3+ models, compare properly
- [ ] Hyperparameter tune the best one
- [ ] **Deploy it as a REST API with FastAPI**
- [ ] Host on Hugging Face Spaces (free) or Render
- [ ] Great README with: problem, data, approach, results, how to run
- [ ] LinkedIn post + tweet

**Suggested projects:**
- Loan default prediction
- Customer churn
- Credit card fraud
- Movie recommendation
- Real estate price predictor

---

## 🏆 Phase 3 done = you have:

- [ ] Deep understanding of classical ML
- [ ] Comfortable with scikit-learn pipelines
- [ ] Built and deployed an ML model as an API
- [ ] Can explain bias/variance, overfitting, and evaluation metrics
- [ ] GitHub: 2-3 ML projects

---

## 📚 Resource priority

| # | Resource | Cost | Time |
|---|----------|------|------|
| 1 | Andrew Ng — ML Specialization Course 1 | Free (audit) | 15 hrs |
| 2 | scikit-learn official tutorial | Free | 4 hrs |
| 3 | StatQuest ML playlist | Free | 8 hrs |
| 4 | Hands-On ML with scikit-learn book (Aurélien Géron) | ~$30 | 30 hrs (read selectively) |
| 5 | Kaggle competitions (try 1-2) | Free | as much as you want |

---

## 🛠️ Key libraries to learn

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from sklearn.metrics import classification_report, roc_auc_score
from sklearn.pipeline import Pipeline
```

---

## ⚠️ Common mistakes

1. ❌ **Reporting only accuracy.** Always show precision/recall/F1.
2. ❌ **Not doing train/test split BEFORE preprocessing.** Data leakage kills models.
3. ❌ **Using deep learning for tabular data.** XGBoost still wins 90% of the time. Use it.
4. ❌ **Not deploying.** A model in a notebook is worth 1/10th of a deployed model.
5. ❌ **No baseline.** Always start with a simple model (logistic regression) as baseline.

---

## 💡 Pro tips

> *"Before deep learning, prove a simple model can't solve it."* — most senior ML engs

> *"Feature engineering beats model choice 80% of the time."* — Kaggle grandmaster

---

## 🎯 End-of-phase check

- [ ] Can build a sklearn pipeline from scratch in <30 min
- [ ] Can explain bias-variance to a non-technical friend
- [ ] Have a deployed ML API on the internet
- [ ] 80+ commits total
- [ ] LinkedIn post: "I deployed my first ML model"

**All checked? Move to Phase 4 — Deep Learning.**

---

> **Next:** [Phase 4 — Deep Learning with PyTorch →](phase-4-deep-learning.md)
