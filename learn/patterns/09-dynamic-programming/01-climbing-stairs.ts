/**
 * LeetCode 70: Climbing Stairs
 * https://leetcode.com/problems/climbing-stairs/
 *
 * You can climb 1 or 2 steps at a time. How many distinct ways to reach the top?
 *
 * PATTERN: 1D Dynamic Programming (Fibonacci-like)
 *
 * KEY INSIGHT: Ways to reach step n = ways to reach (n-1) + ways to reach (n-2)
 * Because you can get to step n from step n-1 (one step) or n-2 (two steps).
 */

// Recursive (exponential - BAD) - O(2^n) time
function climbStairsRecursive(n: number): number {
  if (n <= 2) return n;
  return climbStairsRecursive(n - 1) + climbStairsRecursive(n - 2);
}

// Memoization (top-down DP) - O(n) time, O(n) space
function climbStairsMemo(n: number): number {
  const memo = new Map<number, number>();

  function dp(step: number): number {
    if (step <= 2) return step;
    if (memo.has(step)) return memo.get(step)!;

    const result = dp(step - 1) + dp(step - 2);
    memo.set(step, result);
    return result;
  }

  return dp(n);
}

// Tabulation (bottom-up DP) - O(n) time, O(n) space
function climbStairsDP(n: number): number {
  if (n <= 2) return n;

  const dp = new Array(n + 1);
  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

// Space Optimized - O(n) time, O(1) space
function climbStairs(n: number): number {
  if (n <= 2) return n;

  let prev2 = 1; // dp[i-2]
  let prev1 = 2; // dp[i-1]

  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}

// Tests
console.log("Climbing Stairs Tests:");
console.log(climbStairs(2)); // 2: (1+1), (2)
console.log(climbStairs(3)); // 3: (1+1+1), (1+2), (2+1)
console.log(climbStairs(5)); // 8
console.log(climbStairs(10)); // 89

/**
 * WALKTHROUGH for n=5:
 *
 * Step 1: 1 way  (just step 1)
 * Step 2: 2 ways (1+1, 2)
 * Step 3: dp[2] + dp[1] = 2 + 1 = 3 ways
 * Step 4: dp[3] + dp[2] = 3 + 2 = 5 ways
 * Step 5: dp[4] + dp[3] = 5 + 3 = 8 ways
 *
 * This is the Fibonacci sequence! F(n) = F(n-1) + F(n-2)
 *
 * DP THINKING FRAMEWORK:
 *
 * 1. DEFINE STATE: What does dp[i] represent?
 *    Here: dp[i] = number of ways to reach step i
 *
 * 2. IDENTIFY TRANSITIONS: How do I get to dp[i]?
 *    Here: dp[i] = dp[i-1] + dp[i-2]
 *
 * 3. BASE CASES: What are the starting values?
 *    Here: dp[1] = 1, dp[2] = 2
 *
 * 4. COMPUTE ORDER: In what order do we fill the DP table?
 *    Here: i = 3 to n (increasing)
 *
 * 5. ANSWER: Where is the final answer?
 *    Here: dp[n]
 *
 * TOP-DOWN vs BOTTOM-UP:
 * - Top-down (memoization): Start from n, recurse down, cache results
 * - Bottom-up (tabulation): Start from base cases, build up to n
 * - Bottom-up is usually faster (no recursion overhead)
 */

export { climbStairs };
