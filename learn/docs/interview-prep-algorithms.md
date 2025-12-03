# Algorithm Interview Prep Guide

Master these 10 patterns and you'll be able to solve 90% of coding interview problems.

## How to Use This Guide

1. **Read the pattern explanation** - understand when and why to use it
2. **Study the code** - run each file, trace through the logic
3. **Practice without looking** - try to rewrite from memory
4. **Time yourself** - aim for 20-30 min per medium problem

```bash
# Run any solution
bun run patterns/01-arrays-hashing/01-two-sum.ts
```

---

## Pattern 1: Arrays & Hashing

**When to use:** Need O(1) lookup, finding pairs, grouping elements, counting

**Key insight:** Trade space for time. Hash maps turn O(n) searches into O(1).

### Core Problems

| Problem | Difficulty | Key Technique |
|---------|------------|---------------|
| [Two Sum](../patterns/01-arrays-hashing/01-two-sum.ts) | Easy | Map stores complement |
| [Contains Duplicate](../patterns/01-arrays-hashing/02-contains-duplicate.ts) | Easy | Set for uniqueness |
| [Group Anagrams](../patterns/01-arrays-hashing/03-group-anagrams.ts) | Medium | Sorted string as key |

### Pattern Recognition

Ask yourself:
- "Do I need to find if something exists?" → **Set**
- "Do I need to find something's position/count?" → **Map**
- "Am I checking every pair?" → **Hash map can eliminate inner loop**

### Template

```ts
// Finding complement (Two Sum pattern)
const map = new Map<number, number>();
for (let i = 0; i < nums.length; i++) {
  const complement = target - nums[i];
  if (map.has(complement)) {
    return [map.get(complement)!, i];
  }
  map.set(nums[i], i);
}
```

---

## Pattern 2: Two Pointers

**When to use:** Sorted arrays, palindromes, finding pairs, partitioning

**Key insight:** Two pointers can reduce O(n²) to O(n) by eliminating redundant comparisons.

### Core Problems

| Problem | Difficulty | Key Technique |
|---------|------------|---------------|
| [Valid Palindrome](../patterns/02-two-pointers/01-valid-palindrome.ts) | Easy | Pointers from both ends |
| [3Sum](../patterns/02-two-pointers/02-three-sum.ts) | Medium | Sort + fix one + two pointers |
| [Container With Most Water](../patterns/02-two-pointers/03-container-with-most-water.ts) | Medium | Move shorter pointer |

### Pattern Recognition

Ask yourself:
- "Is the array sorted or can I sort it?" → **Two pointers from ends**
- "Am I looking for pairs that satisfy a condition?" → **Two pointers**
- "Can I eliminate candidates by moving one pointer?" → **Two pointers**

### Template

```ts
// Opposite ends (sorted array)
let left = 0, right = arr.length - 1;
while (left < right) {
  const sum = arr[left] + arr[right];
  if (sum === target) return [left, right];
  if (sum < target) left++;
  else right--;
}
```

---

## Pattern 3: Sliding Window

**When to use:** Contiguous subarray/substring problems, "longest/shortest with constraint"

**Key insight:** Maintain a window that expands right and shrinks left to satisfy constraints.

### Core Problems

| Problem | Difficulty | Key Technique |
|---------|------------|---------------|
| [Best Time to Buy Stock](../patterns/03-sliding-window/01-best-time-to-buy-sell-stock.ts) | Easy | Track running minimum |
| [Longest Substring Without Repeating](../patterns/03-sliding-window/02-longest-substring-without-repeating.ts) | Medium | Set tracks window chars |

### Pattern Recognition

Ask yourself:
- "Is this about a contiguous sequence?" → **Sliding window**
- "Do I need longest/shortest satisfying X?" → **Sliding window**
- "Can I describe what makes a window valid?" → **Sliding window**

### Template

```ts
let left = 0;
let result = 0;
const window = new Set();

for (let right = 0; right < s.length; right++) {
  // Expand: add s[right] to window

  while (windowIsInvalid) {
    // Shrink: remove s[left] from window
    left++;
  }

  // Update result (window is valid here)
  result = Math.max(result, right - left + 1);
}
```

---

## Pattern 4: Stack

**When to use:** Matching pairs, nested structures, "next greater/smaller" problems

**Key insight:** Stack's LIFO property matches nested/paired structures naturally.

### Core Problems

| Problem | Difficulty | Key Technique |
|---------|------------|---------------|
| [Valid Parentheses](../patterns/04-stack/01-valid-parentheses.ts) | Easy | Push open, pop and match close |
| [Min Stack](../patterns/04-stack/02-min-stack.ts) | Medium | Store min with each element |
| [Daily Temperatures](../patterns/04-stack/03-daily-temperatures.ts) | Medium | Monotonic decreasing stack |

### Pattern Recognition

Ask yourself:
- "Do I need to match opening/closing things?" → **Stack**
- "Do I need the 'most recent' thing?" → **Stack**
- "Next greater/smaller element?" → **Monotonic stack**

### Template

```ts
// Monotonic stack (next greater element)
const stack: number[] = []; // stores indices
const result = new Array(n).fill(0);

for (let i = 0; i < nums.length; i++) {
  while (stack.length && nums[i] > nums[stack.at(-1)!]) {
    const idx = stack.pop()!;
    result[idx] = i - idx; // or nums[i] depending on problem
  }
  stack.push(i);
}
```

---

## Pattern 5: Binary Search

**When to use:** Sorted array, finding boundary, minimizing/maximizing with constraint

**Key insight:** Each comparison eliminates half the search space → O(log n).

### Core Problems

| Problem | Difficulty | Key Technique |
|---------|------------|---------------|
| [Binary Search](../patterns/05-binary-search/01-binary-search.ts) | Easy | Classic template |
| [Search Rotated Array](../patterns/05-binary-search/02-search-rotated-sorted-array.ts) | Medium | One half always sorted |
| [Find Minimum Rotated](../patterns/05-binary-search/03-find-minimum-rotated-sorted-array.ts) | Medium | Compare mid with right |

### Pattern Recognition

Ask yourself:
- "Is the array sorted?" → **Binary search**
- "Can I define a condition that's false then true (or vice versa)?" → **Binary search on answer**
- "Minimize maximum or maximize minimum?" → **Binary search on answer**

### Template

```ts
// Exact match
let left = 0, right = arr.length - 1;
while (left <= right) {
  const mid = Math.floor((left + right) / 2);
  if (arr[mid] === target) return mid;
  if (arr[mid] < target) left = mid + 1;
  else right = mid - 1;
}
return -1;

// Finding boundary (leftmost true)
while (left < right) {
  const mid = Math.floor((left + right) / 2);
  if (condition(mid)) right = mid;
  else left = mid + 1;
}
return left;
```

---

## Pattern 6: Linked Lists

**When to use:** In-place modifications, cycle detection, merging

**Key insight:** Draw pictures! Use dummy nodes for edge cases, fast/slow for cycles.

### Core Problems

| Problem | Difficulty | Key Technique |
|---------|------------|---------------|
| [Reverse Linked List](../patterns/06-linked-lists/01-reverse-linked-list.ts) | Easy | Save next before changing |
| [Merge Two Sorted](../patterns/06-linked-lists/02-merge-two-sorted-lists.ts) | Easy | Dummy head simplifies code |
| [Linked List Cycle](../patterns/06-linked-lists/03-linked-list-cycle.ts) | Easy | Fast/slow pointers |

### Pattern Recognition

Ask yourself:
- "Do I need to detect a cycle?" → **Fast/slow pointers**
- "Do I need the middle?" → **Fast/slow (when fast ends, slow is middle)**
- "Merging or reordering?" → **Dummy node + pointer manipulation**

### Template

```ts
// Reverse linked list
let prev = null, curr = head;
while (curr) {
  const next = curr.next;
  curr.next = prev;
  prev = curr;
  curr = next;
}
return prev;

// Cycle detection
let slow = head, fast = head;
while (fast && fast.next) {
  slow = slow.next;
  fast = fast.next.next;
  if (slow === fast) return true;
}
return false;
```

---

## Pattern 7: Trees

**When to use:** Hierarchical data, BST operations, path problems

**Key insight:** Most tree problems are recursive DFS. Think: what info do I need from children?

### Core Problems

| Problem | Difficulty | Key Technique |
|---------|------------|---------------|
| [Invert Binary Tree](../patterns/07-trees/01-invert-binary-tree.ts) | Easy | Swap children recursively |
| [Max Depth](../patterns/07-trees/02-max-depth-binary-tree.ts) | Easy | 1 + max(left, right) |
| [Level Order](../patterns/07-trees/03-level-order-traversal.ts) | Medium | BFS with level tracking |
| [Validate BST](../patterns/07-trees/04-validate-bst.ts) | Medium | Pass valid range down |

### Pattern Recognition

Ask yourself:
- "Do I need info from subtrees?" → **DFS (post-order)**
- "Do I need to process level by level?" → **BFS**
- "Is order important (BST)?" → **In-order traversal or range validation**

### Template

```ts
// DFS template
function dfs(node: TreeNode | null): number {
  if (!node) return 0; // base case

  const left = dfs(node.left);
  const right = dfs(node.right);

  return 1 + Math.max(left, right); // combine
}

// BFS level order
const queue = [root], result = [];
while (queue.length) {
  const level = [];
  const size = queue.length;
  for (let i = 0; i < size; i++) {
    const node = queue.shift()!;
    level.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  result.push(level);
}
```

---

## Pattern 8: Graphs

**When to use:** Networks, grids, dependencies, paths between nodes

**Key insight:** Graph = nodes + edges. Most problems are DFS/BFS with visited tracking.

### Core Problems

| Problem | Difficulty | Key Technique |
|---------|------------|---------------|
| [Number of Islands](../patterns/08-graphs/01-number-of-islands.ts) | Medium | Grid DFS/flood fill |
| [Clone Graph](../patterns/08-graphs/02-clone-graph.ts) | Medium | Map original → clone |
| [Course Schedule](../patterns/08-graphs/03-course-schedule.ts) | Medium | Cycle detection / topological sort |

### Pattern Recognition

Ask yourself:
- "Is this a grid?" → **Treat cells as nodes, adjacent cells as edges**
- "Do I need shortest path?" → **BFS (unweighted) or Dijkstra (weighted)**
- "Dependency ordering?" → **Topological sort**
- "Is something reachable?" → **DFS/BFS**

### Template

```ts
// Grid DFS
const dirs = [[1,0], [-1,0], [0,1], [0,-1]];

function dfs(r: number, c: number) {
  if (r < 0 || r >= rows || c < 0 || c >= cols) return;
  if (grid[r][c] !== '1') return;

  grid[r][c] = '0'; // mark visited
  for (const [dr, dc] of dirs) {
    dfs(r + dr, c + dc);
  }
}

// Cycle detection (3-color DFS)
// 0=unvisited, 1=visiting, 2=done
function hasCycle(node: number): boolean {
  if (state[node] === 1) return true;  // back edge
  if (state[node] === 2) return false; // already done

  state[node] = 1;
  for (const neighbor of graph[node]) {
    if (hasCycle(neighbor)) return true;
  }
  state[node] = 2;
  return false;
}
```

---

## Pattern 9: Dynamic Programming

**When to use:** Optimization problems, counting ways, problems with overlapping subproblems

**Key insight:** DP = recursion + memoization. Define state, find transitions, identify base cases.

### Core Problems

| Problem | Difficulty | Key Technique |
|---------|------------|---------------|
| [Climbing Stairs](../patterns/09-dynamic-programming/01-climbing-stairs.ts) | Easy | dp[i] = dp[i-1] + dp[i-2] |
| [Coin Change](../patterns/09-dynamic-programming/02-coin-change.ts) | Medium | Min coins for each amount |
| [Longest Common Subsequence](../patterns/09-dynamic-programming/03-longest-common-subsequence.ts) | Medium | 2D DP on two strings |

### Pattern Recognition

Ask yourself:
- "Can I break this into smaller subproblems?" → **DP**
- "Are there overlapping subproblems?" → **DP with memoization**
- "Count ways / find min/max?" → **DP**

### DP Framework

1. **Define state**: What does `dp[i]` represent?
2. **Find transition**: How does `dp[i]` relate to previous states?
3. **Base cases**: What are the starting values?
4. **Compute order**: Bottom-up (iterative) or top-down (recursive)?
5. **Space optimization**: Can I use O(1) instead of O(n)?

### Template

```ts
// 1D DP
const dp = new Array(n + 1).fill(0);
dp[0] = baseCase;

for (let i = 1; i <= n; i++) {
  dp[i] = /* transition using dp[i-1], dp[i-2], etc. */;
}
return dp[n];

// 2D DP (two sequences)
const dp = Array.from({length: m+1}, () => Array(n+1).fill(0));

for (let i = 1; i <= m; i++) {
  for (let j = 1; j <= n; j++) {
    if (s1[i-1] === s2[j-1]) {
      dp[i][j] = dp[i-1][j-1] + 1;
    } else {
      dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
    }
  }
}
```

---

## Pattern 10: Heap / Priority Queue

**When to use:** K largest/smallest, merge K things, scheduling, median

**Key insight:** Heap gives O(log n) insert and O(1) access to min/max.

### Core Problems

| Problem | Difficulty | Key Technique |
|---------|------------|---------------|
| [Kth Largest Element](../patterns/10-heap/01-kth-largest-element.ts) | Medium | Min-heap of size k |
| [Merge K Sorted Lists](../patterns/10-heap/02-merge-k-sorted-lists.ts) | Hard | Heap holds one from each list |

### Pattern Recognition

Ask yourself:
- "Do I need k largest/smallest?" → **Min/max heap of size k**
- "Merging k sorted things?" → **Heap with one element from each**
- "Need to repeatedly get min/max?" → **Heap**

### Template

```ts
// Kth largest using min-heap of size k
const heap = new MinHeap();
for (const num of nums) {
  heap.push(num);
  if (heap.size > k) heap.pop();
}
return heap.peek(); // kth largest

// Merge k sorted lists
const heap = new MinHeap((a, b) => a.val - b.val);
for (const list of lists) {
  if (list) heap.push(list);
}

while (heap.size) {
  const node = heap.pop();
  // add node to result
  if (node.next) heap.push(node.next);
}
```

---

## Study Plan

### Week 1: Foundations (Easy patterns)
- Day 1-2: Arrays & Hashing (3 problems)
- Day 3-4: Two Pointers (3 problems)
- Day 5: Sliding Window (2 problems)
- Day 6-7: Review + practice variants

### Week 2: Data Structures
- Day 1-2: Stack (3 problems)
- Day 3-4: Linked Lists (3 problems)
- Day 5-6: Trees (4 problems)
- Day 7: Review + practice variants

### Week 3: Advanced
- Day 1-2: Binary Search (3 problems)
- Day 3-4: Graphs (3 problems)
- Day 5-6: Dynamic Programming (3 problems)
- Day 7: Heap (2 problems) + Review

### Week 4: Integration
- Practice mixed problems
- Time yourself (25-30 min per problem)
- Practice explaining your approach out loud

---

## Interview Day Tips

### Before You Code

1. **Clarify the problem**
   - Input/output format?
   - Constraints (size, range)?
   - Edge cases (empty, single element)?

2. **Work through examples**
   - Trace through 2-3 examples by hand
   - Include an edge case

3. **Explain your approach**
   - Start with brute force
   - Identify the bottleneck
   - Propose optimization

### While Coding

4. **Write clean code**
   - Meaningful variable names
   - Break into helper functions if complex

5. **Talk through your code**
   - Explain what each part does
   - Mention why you made certain choices

### After Coding

6. **Test your solution**
   - Trace through with an example
   - Check edge cases
   - Verify complexity matches what you claimed

---

## Complexity Cheat Sheet

| Pattern | Time | Space |
|---------|------|-------|
| Hash lookup | O(1) | O(n) |
| Two pointers | O(n) | O(1) |
| Sliding window | O(n) | O(k) |
| Binary search | O(log n) | O(1) |
| DFS/BFS tree | O(n) | O(h) |
| DFS/BFS graph | O(V+E) | O(V) |
| Heap operations | O(log n) | O(n) |
| DP | O(states × transitions) | O(states) |

---

## Quick Reference

```
Need O(1) lookup?         → Hash Map/Set
Sorted array + pairs?     → Two Pointers
Contiguous subarray?      → Sliding Window
Sorted + search?          → Binary Search
Matching/nesting?         → Stack
Next greater element?     → Monotonic Stack
Cycle detection?          → Fast/Slow Pointers
Tree property?            → DFS recursion
Level by level?           → BFS queue
Grid traversal?           → DFS/BFS + visited
Dependencies?             → Topological Sort
K largest/smallest?       → Heap
Optimization?             → Dynamic Programming
```

Good luck with your interview! 🚀
