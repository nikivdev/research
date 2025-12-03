/**
 * LeetCode 704: Binary Search
 * https://leetcode.com/problems/binary-search/
 *
 * Given a sorted array and target, return the index of target or -1.
 *
 * PATTERN: Classic Binary Search
 *
 * KEY INSIGHT: Each comparison eliminates half the search space.
 * O(log n) time complexity.
 */

function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    // Prevent overflow: mid = left + (right - left) / 2
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1; // Target is in right half
    } else {
      right = mid - 1; // Target is in left half
    }
  }

  return -1; // Not found
}

// Tests
console.log("Binary Search Tests:");
console.log(search([-1, 0, 3, 5, 9, 12], 9)); // 4
console.log(search([-1, 0, 3, 5, 9, 12], 2)); // -1

/**
 * WALKTHROUGH with [-1, 0, 3, 5, 9, 12], target=9:
 *
 * left=0, right=5, mid=2, nums[2]=3 < 9, left=3
 * left=3, right=5, mid=4, nums[4]=9 == 9, return 4!
 *
 * BINARY SEARCH TEMPLATE (for exact match):
 *
 * while (left <= right) {
 *   mid = Math.floor((left + right) / 2);
 *   if (nums[mid] === target) return mid;
 *   if (nums[mid] < target) left = mid + 1;
 *   else right = mid - 1;
 * }
 * return -1;
 *
 * COMMON BUGS:
 * 1. while (left < right) vs while (left <= right)
 *    - Use <= when searching for exact match
 *    - Use < when finding a boundary
 *
 * 2. left = mid vs left = mid + 1
 *    - Always move by at least 1 to avoid infinite loops
 *
 * 3. Integer overflow: (left + right) / 2 can overflow in some languages
 *    - Use: left + (right - left) / 2
 */

export { search };
