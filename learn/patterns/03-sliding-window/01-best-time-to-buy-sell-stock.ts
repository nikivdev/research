/**
 * LeetCode 121: Best Time to Buy and Sell Stock
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
 *
 * Find the maximum profit from buying on one day and selling on a future day.
 *
 * PATTERN: Sliding Window / One Pass with running minimum
 *
 * KEY INSIGHT: Track the minimum price seen so far, and at each point
 * calculate profit if we sold today.
 */

// Brute Force - O(n^2)
function maxProfitBrute(prices: number[]): number {
  let maxProfit = 0;

  for (let buy = 0; buy < prices.length; buy++) {
    for (let sell = buy + 1; sell < prices.length; sell++) {
      const profit = prices[sell] - prices[buy];
      maxProfit = Math.max(maxProfit, profit);
    }
  }

  return maxProfit;
}

// Optimal - O(n) time, O(1) space
function maxProfit(prices: number[]): number {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (const price of prices) {
    // Update minimum price seen so far
    minPrice = Math.min(minPrice, price);

    // Calculate profit if we sell today
    const profit = price - minPrice;
    maxProfit = Math.max(maxProfit, profit);
  }

  return maxProfit;
}

// Alternative view: Two Pointers / Sliding Window
function maxProfitTwoPointers(prices: number[]): number {
  let left = 0; // buy day
  let right = 1; // sell day
  let maxProfit = 0;

  while (right < prices.length) {
    if (prices[left] < prices[right]) {
      // Profitable trade
      const profit = prices[right] - prices[left];
      maxProfit = Math.max(maxProfit, profit);
    } else {
      // Found a lower buy price, move buy pointer
      left = right;
    }
    right++;
  }

  return maxProfit;
}

// Tests
console.log("Best Time to Buy and Sell Stock Tests:");
console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 5 (buy at 1, sell at 6)
console.log(maxProfit([7, 6, 4, 3, 1])); // 0 (prices only go down)

/**
 * WALKTHROUGH with [7, 1, 5, 3, 6, 4]:
 *
 * price=7: minPrice=7, profit=0, maxProfit=0
 * price=1: minPrice=1, profit=0, maxProfit=0 (found new low!)
 * price=5: minPrice=1, profit=4, maxProfit=4 (sell at 5)
 * price=3: minPrice=1, profit=2, maxProfit=4
 * price=6: minPrice=1, profit=5, maxProfit=5 (sell at 6!)
 * price=4: minPrice=1, profit=3, maxProfit=5
 *
 * WHY THIS WORKS:
 * - We want: max(prices[j] - prices[i]) where j > i
 * - For any selling day j, the best buy day is the minimum before j
 * - So we track running minimum and compute profit at each point
 *
 * SLIDING WINDOW INTUITION:
 * - Window starts at [buy, sell]
 * - If we find a lower buy price, we "slide" the window start there
 * - We're always looking for the max profit within our window
 */

export { maxProfit };
