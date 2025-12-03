# Interview Patterns Cheat Sheet

## Quick Pattern Recognition

| Problem Type | Pattern | Data Structure |
|-------------|---------|----------------|
| Find pair with sum | Hash Map | `Map<value, index>` |
| Find duplicates | Hash Set | `Set<value>` |
| Sorted array search | Two Pointers / Binary Search | Array |
| Subarray/substring | Sliding Window | `left, right` pointers |
| Parentheses/nesting | Stack | `[]` array as stack |
| Next greater element | Monotonic Stack | `[]` decreasing stack |
| Linked list cycle | Fast/Slow Pointers | Two pointers |
| Tree traversal | DFS (recursion) or BFS (queue) | Call stack / Queue |
| Graph traversal | DFS/BFS + visited set | `Set` or modify in place |
| Shortest path | BFS (unweighted) / Dijkstra (weighted) | Queue / Heap |
| K largest/smallest | Heap | MinHeap of size k |
| Optimization with choices | Dynamic Programming | `dp[]` or `dp[][]` |

## Pattern Templates

### Hash Map (Two Sum pattern)
```ts
const map = new Map<number, number>();
for (let i = 0; i < nums.length; i++) {
  const complement = target - nums[i];
  if (map.has(complement)) return [map.get(complement)!, i];
  map.set(nums[i], i);
}
```

### Two Pointers (opposite ends)
```ts
let left = 0, right = arr.length - 1;
while (left < right) {
  // process arr[left] and arr[right]
  if (condition) left++;
  else right--;
}
```

### Sliding Window
```ts
let left = 0;
for (let right = 0; right < s.length; right++) {
  // expand: add s[right] to window
  while (windowInvalid) {
    // shrink: remove s[left] from window
    left++;
  }
  // update result
}
```

### Binary Search
```ts
let left = 0, right = arr.length - 1;
while (left <= right) {
  const mid = Math.floor((left + right) / 2);
  if (arr[mid] === target) return mid;
  if (arr[mid] < target) left = mid + 1;
  else right = mid - 1;
}
```

### DFS Tree
```ts
function dfs(node: TreeNode | null): ResultType {
  if (!node) return baseCase;
  const left = dfs(node.left);
  const right = dfs(node.right);
  return combine(node.val, left, right);
}
```

### BFS Level Order
```ts
const queue = [root];
while (queue.length) {
  const levelSize = queue.length;
  for (let i = 0; i < levelSize; i++) {
    const node = queue.shift()!;
    // process node
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
}
```

### Grid DFS
```ts
function dfs(r: number, c: number) {
  if (r < 0 || r >= rows || c < 0 || c >= cols) return;
  if (grid[r][c] !== target) return;
  grid[r][c] = visited; // mark visited
  dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1);
}
```

### DP Framework
```ts
// 1. Define state: dp[i] = ...
// 2. Base cases: dp[0] = ...
// 3. Transition: dp[i] = f(dp[i-1], dp[i-2], ...)
// 4. Answer: dp[n]
```

## Time Complexity Quick Reference

| Operation | Array | Hash | Heap | BST |
|-----------|-------|------|------|-----|
| Access | O(1) | O(1) | - | O(log n) |
| Search | O(n) | O(1) | O(n) | O(log n) |
| Insert | O(n) | O(1) | O(log n) | O(log n) |
| Delete | O(n) | O(1) | O(log n) | O(log n) |

## Common Mistakes to Avoid

1. **Off-by-one errors**: Double-check loop bounds, `<=` vs `<`
2. **Integer overflow**: Use `left + (right - left) / 2` for binary search
3. **Forgetting edge cases**: Empty input, single element, all same elements
4. **Not handling null**: Check for null before accessing properties
5. **Modifying while iterating**: Use copy or iterate backwards
6. **Greedy isn't always optimal**: Verify with counterexamples

## Interview Approach

1. **Clarify**: Ask about input size, constraints, edge cases
2. **Examples**: Walk through 2-3 examples by hand
3. **Brute Force**: Start with obvious solution, explain complexity
4. **Optimize**: Identify bottleneck, apply pattern
5. **Code**: Write clean code, use meaningful names
6. **Test**: Trace through with example, check edge cases

## Run a specific pattern

```bash
bun run patterns/01-arrays-hashing/01-two-sum.ts
```
