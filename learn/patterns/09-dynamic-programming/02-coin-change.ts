/**
 * LeetCode 322: Coin Change
 * https://leetcode.com/problems/coin-change/
 *
 * Given coins of different denominations and a total amount,
 * find the fewest number of coins needed to make up that amount.
 *
 * PATTERN: DP with "making change" / Unbounded Knapsack
 *
 * KEY INSIGHT: For each amount, try using each coin and take minimum.
 * dp[amount] = min(dp[amount - coin] + 1) for all valid coins
 */

// Bottom-up DP - O(amount * coins) time, O(amount) space
function coinChange(coins: number[], amount: number): number {
  // dp[i] = minimum coins needed to make amount i
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0; // 0 coins needed to make amount 0

  // Build up from amount 1 to target
  for (let i = 1; i <= amount; i++) {
    // Try each coin
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] !== Infinity) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

// Alternative: iterate coins first (same result, different order)
function coinChangeAlt(coins: number[], amount: number): number {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (const coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

// Top-down with memoization
function coinChangeMemo(coins: number[], amount: number): number {
  const memo = new Map<number, number>();

  function dp(remaining: number): number {
    if (remaining === 0) return 0;
    if (remaining < 0) return Infinity;
    if (memo.has(remaining)) return memo.get(remaining)!;

    let minCoins = Infinity;
    for (const coin of coins) {
      const result = dp(remaining - coin);
      minCoins = Math.min(minCoins, result + 1);
    }

    memo.set(remaining, minCoins);
    return minCoins;
  }

  const result = dp(amount);
  return result === Infinity ? -1 : result;
}

// Tests
console.log("Coin Change Tests:");
console.log(coinChange([1, 2, 5], 11)); // 3 (5 + 5 + 1)
console.log(coinChange([2], 3)); // -1 (can't make 3 with only 2s)
console.log(coinChange([1], 0)); // 0 (no coins needed)
console.log(coinChange([1, 2, 5], 100)); // 20 (20 * 5)

/**
 * WALKTHROUGH with coins=[1,2,5], amount=11:
 *
 * dp = [0, ∞, ∞, ∞, ∞, ∞, ∞, ∞, ∞, ∞, ∞, ∞]
 *
 * i=1: try coin 1: dp[1] = dp[0]+1 = 1
 * i=2: try coin 1: dp[2] = dp[1]+1 = 2
 *      try coin 2: dp[2] = min(2, dp[0]+1) = 1
 * i=3: try coin 1: dp[3] = dp[2]+1 = 2
 *      try coin 2: dp[3] = min(2, dp[1]+1) = 2
 * i=4: try coin 1: dp[4] = dp[3]+1 = 3
 *      try coin 2: dp[4] = min(3, dp[2]+1) = 2
 * i=5: try coin 1: dp[5] = dp[4]+1 = 3
 *      try coin 2: dp[5] = min(3, dp[3]+1) = 3
 *      try coin 5: dp[5] = min(3, dp[0]+1) = 1
 * ...
 * i=11: try coin 1: dp[11] = dp[10]+1 = 3
 *       try coin 2: dp[11] = min(3, dp[9]+1) = 3
 *       try coin 5: dp[11] = min(3, dp[6]+1) = 3
 *
 * Final: dp[11] = 3 (using 5 + 5 + 1)
 *
 * DP STATE DEFINITION:
 * dp[i] = minimum coins needed to make amount i
 *
 * TRANSITION:
 * dp[i] = min(dp[i - coin] + 1) for each coin where coin <= i
 *
 * This is a "minimization" DP:
 * - Initialize to Infinity (worst case)
 * - Take minimum over all choices
 *
 * SIMILAR PROBLEMS:
 * - Coin Change II: Count number of combinations (not minimum)
 * - Perfect Squares: Same idea with squares instead of coins
 */

export { coinChange };
