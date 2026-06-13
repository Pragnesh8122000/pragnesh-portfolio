# 🐍 Python for ML — Quick Reference

> **For Node/React devs.** JavaScript to Python translation, plus the ML-specific stuff.

---

## JS → Python cheat sheet

| JavaScript | Python | Notes |
|------------|--------|-------|
| `const x = 5` | `x = 5` | No const/let, just convention |
| `let x = 5` | `x = 5` | Same |
| `x = null` | `x = None` | |
| `x = true` | `x = True` | Capitalized |
| `arr = [1,2,3]` | `arr = [1,2,3]` | Same |
| `obj = {a: 1}` | `obj = {"a": 1}` | Always quotes for keys |
| `arr.map(x => x*2)` | `[x*2 for x in arr]` | List comprehension |
| `arr.filter(x => x>0)` | `[x for x in arr if x>0]` | |
| `arr.reduce((a,b) => a+b, 0)` | `sum(arr)` | Built-in sum |
| `arr.forEach(x => print(x))` | `[print(x) for x in arr]` | Or just `for x in arr: print(x)` |
| `console.log(x)` | `print(x)` | |
| `Math.max(a,b)` | `max(a,b)` | |
| `Math.random()` | `random.random()` | |
| `JSON.parse(s)` | `json.loads(s)` | |
| `JSON.stringify(o)` | `json.dumps(o)` | |
| `require('lodash')` | `import lodash` | |
| `setTimeout(f, 1000)` | `await asyncio.sleep(1)` | Need async context |
| `Promise` | `await future` | Use `asyncio` |
| `try { } catch(e) { }` | `try: ... except Exception as e: ...` | |
| `class Foo {}` | `class Foo:` | |
| `this.x` | `self.x` | First arg of method is always `self` |
| `arr.length` | `len(arr)` | Function, not property |
| `arr.push(x)` | `arr.append(x)` | |
| `arr.slice(1,3)` | `arr[1:3]` | Slicing! |
| `arr.includes(x)` | `x in arr` | |
| `Object.keys(o)` | `o.keys()` | |
| `string.includes("foo")` | `"foo" in string` | Or `"foo" in string` |
| `string.split(",")` | `string.split(",")` | Same! |
| `string.trim()` | `string.strip()` | |
| `string.toUpperCase()` | `string.upper()` | |
| `parseInt("5")` | `int("5")` | |
| `parseFloat("5.5")` | `float("5.5")` | |
| `Number.isInteger(x)` | `isinstance(x, int)` | |
| `Array.from({length: 5})` | `[None] * 5` | |
| `===` | `==` | (Python's == is JS's ===) |
| `==` (loose) | Don't use it | Just don't. Always use ==. |
| `x ?? y` | `x if x is not None else y` | |
| `x && y` | `x and y` | |
| `x \|\| y` | `x or y` | |
| `!x` | `not x` | |

---

## 🐍 The 30 Python things you actually need

### 1. Variables, types
```python
name = "Pragnesh"           # str
age = 30                     # int
salary = 12.5                # float
is_eng = True                # bool
nothing = None               # NoneType

# Type check
isinstance(x, int)           # True/False
type(x)                      # <class 'int'>
```

### 2. Strings
```python
s = "hello world"
s.upper()                    # "HELLO WORLD"
s.lower()                    # "hello world"
s.split()                    # ["hello", "world"]
s.replace("hello", "hi")     # "hi world"
s.startswith("hello")        # True
s.endswith("world")          # True
f"My name is {name}"         # f-string (use this)
"  spaces  ".strip()         # "spaces"
len(s)                       # 11
```

### 3. Lists
```python
arr = [1, 2, 3, 4, 5]
arr.append(6)                # [1,2,3,4,5,6]
arr.pop()                    # returns 6, arr is [1,2,3,4,5]
arr[0]                       # 1
arr[-1]                      # 5
arr[1:3]                     # [2, 3] (slice)
arr[::-1]                    # [5,4,3,2,1] (reverse)
arr.sort()                   # in-place
sorted(arr)                  # returns new list
sum(arr)                     # 15
min(arr), max(arr)           # 1, 5
len(arr)                     # 5
arr + [6, 7]                 # [1,2,3,4,5,6,7]
arr * 2                      # [1,2,3,4,5,1,2,3,4,5]
```

### 4. List comprehension (MUST MASTER)
```python
# JS: arr.map(x => x*2)
squares = [x**2 for x in range(10)]

# JS: arr.filter(x => x > 0)
positives = [x for x in arr if x > 0]

# Nested
matrix = [[i*j for j in range(5)] for i in range(5)]

# Dict comprehension
squares_dict = {x: x**2 for x in range(10)}
```

### 5. Dicts (like JS objects)
```python
d = {"name": "Alice", "age": 30}
d["name"]                   # "Alice"
d.get("age", 0)             # 30 (default if missing)
d.keys()                    # dict_keys
d.values()                  # dict_values
d.items()                   # (key, value) pairs
"name" in d                 # True
d.update({"city": "NYC"})   # merge
del d["age"]                # delete

# Iterate
for key, value in d.items():
    print(f"{key}: {value}")
```

### 6. Tuples (immutable lists)
```python
t = (1, 2, 3)
t[0]                        # 1
x, y, z = t                 # unpacking
```

### 7. Sets
```python
s = {1, 2, 3, 3}            # {1, 2, 3} (unique)
s.add(4)
1 in s                      # True
s1 | s2                     # union
s1 & s2                     # intersection
```

### 8. Control flow
```python
if x > 0:
    print("positive")
elif x < 0:
    print("negative")
else:
    print("zero")

# Ternary
result = "yes" if x > 0 else "no"

# Loops
for i in range(10):         # 0..9
    print(i)

for item in arr:
    print(item)

for i, item in enumerate(arr):
    print(i, item)

i = 0
while i < 10:
    i += 1
```

### 9. Functions
```python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}"

greet("Alice")                      # "Hello, Alice"
greet("Bob", greeting="Hi")         # "Hi, Bob"

# *args, **kwargs
def func(*args, **kwargs):
    print(args)      # tuple
    print(kwargs)    # dict

# Lambda
square = lambda x: x**2
square(5)                            # 25

# Map, filter (avoid these, use comprehensions)
list(map(lambda x: x*2, [1,2,3]))    # [2, 4, 6]
```

### 10. Classes
```python
class Dog:
    # Class attribute
    species = "Canis familiaris"

    # Constructor
    def __init__(self, name, age):
        self.name = name        # instance attribute
        self.age = age

    def bark(self):
        return f"{self.name} says woof!"

dog = Dog("Rex", 5)
dog.bark()                      # "Rex says woof!"
```

### 11. File I/O
```python
# Read
with open("file.txt", "r") as f:
    content = f.read()         # entire file
    # or
    lines = f.readlines()      # list of lines

# Write
with open("file.txt", "w") as f:
    f.write("hello\n")

# CSV
import csv
with open("data.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row)

# JSON
import json
data = json.loads('{"a": 1}')
json_str = json.dumps(data)
```

### 12. Error handling
```python
try:
    risky_operation()
except ValueError as e:
    print(f"Bad value: {e}")
except Exception as e:
    print(f"Something broke: {e}")
finally:
    cleanup()
```

### 13. Imports
```python
import os                          # full module
from pathlib import Path           # specific
import numpy as np                 # alias
from typing import List, Dict      # types
```

### 14. Virtual envs (CRITICAL)
```bash
# Create
python -m venv venv

# Activate
# Mac/Linux:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Install
pip install requests

# Save deps
pip freeze > requirements.txt

# Install from file
pip install -r requirements.txt

# Better: use poetry or uv (modern)
```

### 15. Type hints (use them!)
```python
from typing import List, Dict, Optional

def process(items: List[str]) -> Dict[str, int]:
    return {item: len(item) for item in items}

def maybe_value(x: Optional[int] = None) -> int:
    return x if x is not None else 0
```

---

## 🔢 NumPy essentials

```python
import numpy as np

# Create arrays
arr = np.array([1, 2, 3])             # 1D
matrix = np.array([[1, 2], [3, 4]])  # 2D
zeros = np.zeros((3, 4))             # 3x4 zeros
ones = np.ones((3, 4))               # 3x4 ones
arange = np.arange(0, 10, 2)         # [0, 2, 4, 6, 8]
linspace = np.linspace(0, 1, 5)      # [0, 0.25, 0.5, 0.75, 1]
random = np.random.rand(3, 4)        # 3x4 random [0, 1)

# Properties
arr.shape                            # (3,) — dimensions
arr.dtype                            # int64
arr.size                             # 3 — total elements

# Indexing & slicing (like lists)
arr[0]                               # first element
arr[1:3]                             # elements at index 1, 2
matrix[0, :]                         # first row
matrix[:, 0]                         # first column
matrix[matrix > 2]                   # boolean indexing

# Operations (vectorized — FAST)
arr * 2                              # multiply all
arr + 10                             # add 10 to all
arr1 + arr2                          # element-wise
arr1 @ arr2                          # matrix multiply
arr.sum(), arr.mean(), arr.std()
arr.max(), arr.min()
arr.argmax()                         # index of max

# Reshape
arr.reshape(3, 1)                    # reshape
arr.flatten()                        # to 1D
arr.T                                # transpose

# Useful
np.dot(a, b)                         # dot product
np.matmul(a, b)                      # matrix multiply
np.concatenate([a, b])               # join
np.unique(arr)                       # unique values
```

---

## 🐼 Pandas essentials

```python
import pandas as pd

# Read
df = pd.read_csv("data.csv")
df = pd.read_json("data.json")
df = pd.read_excel("data.xlsx")
df = pd.read_sql(query, connection)

# Inspect
df.head()                            # first 5 rows
df.tail(3)                           # last 3
df.info()                            # column types, nulls
df.describe()                        # stats
df.shape                             # (rows, cols)
df.columns                           # column names
df.dtypes                            # types

# Select
df["col"]                            # single column (Series)
df[["col1", "col2"]]                 # multiple columns (DataFrame)
df.loc[0]                            # by label
df.iloc[0]                           # by position
df.loc[0:5, ["col1", "col2"]]       # rows + cols
df[df["age"] > 30]                   # boolean filter
df[(df["a"] > 5) & (df["b"] < 10)]  # multiple conditions

# Modify
df["new_col"] = df["a"] + df["b"]    # add column
df.drop("col", axis=1)               # drop column
df.drop(0, axis=0)                   # drop row
df.rename(columns={"old": "new"})    # rename
df.fillna(0)                         # fill missing
df.dropna()                          # drop missing
df["col"].fillna(df["col"].mean())   # fill with mean

# Aggregate
df.groupby("category").sum()         # group by
df.groupby("cat").agg({"val": "mean"})  # custom agg
df.pivot_table(values="val", index="cat", aggfunc="mean")

# Sort
df.sort_values("col")                # ascending
df.sort_values("col", ascending=False)

# Apply
df["col"].apply(lambda x: x*2)       # apply function
df["col"].map({"a": 1, "b": 2})      # map values

# Merge / join
pd.merge(df1, df2, on="key")
df1.join(df2)

# Save
df.to_csv("out.csv", index=False)
df.to_json("out.json")
df.to_parquet("out.parquet")         # efficient
```

---

## ⚡ Async (for streaming LLM responses)

```python
import asyncio

async def main():
    await asyncio.sleep(1)
    print("done")

asyncio.run(main())

# Multiple parallel calls
async def fetch(i):
    await asyncio.sleep(1)
    return i

async def main():
    results = await asyncio.gather(*[fetch(i) for i in range(10)])

asyncio.run(main())
```

---

## 🧪 Testing (pytest)

```python
# test_mycode.py
def add(a, b):
    return a + b

def test_add():
    assert add(2, 3) == 5

def test_add_strings():
    assert add("a", "b") == "ab"
```

Run: `pytest test_mycode.py`

---

## 📦 Common ML packages (install list)

```bash
pip install numpy pandas matplotlib seaborn scikit-learn
pip install torch torchvision torchaudio
pip install transformers datasets accelerate
pip install openai anthropic langchain langgraph langchain-community
pip install langchain-openai langchain-anthropic
pip install chromadb pinecone-client weaviate-client
pip install fastapi uvicorn pydantic
pip install jupyter ipython
pip install pytest black ruff
pip install huggingface_hub
pip install instructor  # structured outputs
pip install ragas  # RAG evaluation
pip install wandb mlflow  # tracking
```

---

## 💡 Best practices

1. **Use virtual envs.** Always. `venv` per project.
2. **Use type hints.** Saves debugging time.
3. **Use f-strings, not `.format()` or `%`.**
4. **Prefer list comprehension** over map/filter.
5. **EAFP over LBYL** (try/except instead of checking first)
6. **`with` for files.** Always.
7. **Use `pathlib.Path`** over `os.path`.
8. **Don't use mutable default args** (classic bug):
   ```python
   def f(x, items=[]):     # BAD
       items.append(x)
       return items
   def f(x, items=None):   # GOOD
       if items is None:
           items = []
       items.append(x)
       return items
   ```
9. **`if __name__ == "__main__":`** for scripts.
10. **Black formatter + Ruff linter.** Install both.

---

> **Next cheatsheet:** [Math Essentials →](math-essentials.md)
