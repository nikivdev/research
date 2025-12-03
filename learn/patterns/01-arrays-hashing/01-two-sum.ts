/**
 * LeetCode 1: Two Sum
 * https://leetcode.com/problems/two-sum/
 *
 * Given an array of integers nums and an integer target,
 * return indices of the two numbers such that they add up to target.
 *
 * PATTERN: Hash Map for O(1) lookups
 *
 * KEY INSIGHT: Instead of checking every pair (O(n^2)),
 * we can ask: "Have I seen the complement (target - current) before?"
 */

// Brute Force - O(n^2) time, O(1) space
// Check every pair - what most people write first
function twoSumBrute(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}

// Optimal - O(n) time, O(n) space
// Use a hash map to remember what we've seen
function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>(); // value -> index

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (seen.has(complement)) {
      return [seen.get(complement)!, i];
    }

    seen.set(nums[i], i);
  }

  return [];
}

// Tests
console.log("Two Sum Tests:");
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1] because 2 + 7 = 9
console.log(twoSum([3, 2, 4], 6)); // [1, 2] because 2 + 4 = 6
console.log(twoSum([3, 3], 6)); // [0, 1] because 3 + 3 = 6

/**
 * WALKTHROUGH with [2, 7, 11, 15], target = 9:
 *
 * i=0: num=2, complement=7, seen={}, 7 not in seen, add {2:0}
 * i=1: num=7, complement=2, seen={2:0}, 2 IS in seen! Return [0, 1]
 *
 * WHY THIS WORKS:
 * - We need a + b = target
 * - Rearranging: b = target - a
 * - For each number, we check if we've already seen its complement
 * - Hash map gives O(1) lookup instead of O(n) linear search
 *
 * INTERVIEW TIPS:
 * 1. Always clarify: Can there be duplicates? Multiple solutions?
 * 2. Start with brute force, explain why it's slow
 * 3. Identify the bottleneck (the inner loop searching for complement)
 * 4. Use hash map to eliminate the inner loop
 */

export { twoSum, twoSumBrute };
