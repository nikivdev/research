/**
 * LeetCode 217: Contains Duplicate
 * https://leetcode.com/problems/contains-duplicate/
 *
 * Given an integer array nums, return true if any value appears
 * at least twice in the array.
 *
 * PATTERN: Set for O(1) existence checks
 *
 * KEY INSIGHT: A Set automatically handles uniqueness
 */

// Approach 1: Brute Force - O(n^2) time
function containsDuplicateBrute(nums: number[]): boolean {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) return true;
    }
  }
  return false;
}

// Approach 2: Sorting - O(n log n) time, O(1) space
function containsDuplicateSort(nums: number[]): boolean {
  nums.sort((a, b) => a - b);
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) return true;
  }
  return false;
}

// Approach 3: Hash Set - O(n) time, O(n) space (OPTIMAL)
function containsDuplicate(nums: number[]): boolean {
  const seen = new Set<number>();

  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }

  return false;
}

// One-liner (clever but explain the above in interview)
function containsDuplicateOneLiner(nums: number[]): boolean {
  return new Set(nums).size !== nums.length;
}

// Tests
console.log("Contains Duplicate Tests:");
console.log(containsDuplicate([1, 2, 3, 1])); // true
console.log(containsDuplicate([1, 2, 3, 4])); // false
console.log(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])); // true

/**
 * INTERVIEW TIPS:
 * 1. Know all 3 approaches and their trade-offs
 * 2. Set vs Map: Use Set when you only care about existence
 * 3. The one-liner is clever but always explain the explicit version first
 *
 * COMMON FOLLOW-UP: "What if we need to find which elements are duplicated?"
 * Answer: Return the duplicates instead of boolean, use Map to count occurrences
 */

export { containsDuplicate };
