/**
 * LeetCode 153: Find Minimum in Rotated Sorted Array
 * https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
 *
 * Find the minimum element in a rotated sorted array.
 *
 * PATTERN: Binary Search for boundary/inflection point
 *
 * KEY INSIGHT: The minimum is where the "rotation break" happens.
 * Compare mid with right to decide which half contains the minimum.
 */

function findMin(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;

  // If array is not rotated (or rotated n times)
  if (nums[left] < nums[right]) {
    return nums[left];
  }

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[right]) {
      // Mid is in the "higher" part, minimum is to the right
      left = mid + 1;
    } else {
      // Mid is in the "lower" part (or is the minimum)
      right = mid; // Keep mid as potential answer
    }
  }

  return nums[left];
}

// Alternative: More explicit about finding pivot
function findMinExplicit(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    // If mid element is greater than right element,
    // the minimum must be in the right half (after mid)
    if (nums[mid] > nums[right]) {
      left = mid + 1;
    }
    // If mid element is less than right element,
    // the minimum is in the left half (including mid)
    else {
      right = mid;
    }
  }

  return nums[left];
}

// Tests
console.log("Find Minimum in Rotated Sorted Array Tests:");
console.log(findMin([3, 4, 5, 1, 2])); // 1
console.log(findMin([4, 5, 6, 7, 0, 1, 2])); // 0
console.log(findMin([11, 13, 15, 17])); // 11 (not rotated)

/**
 * WALKTHROUGH with [4, 5, 6, 7, 0, 1, 2]:
 *
 * Array visualization:
 *     7
 *   6   |
 * 5     |     2
 * 4     |   1
 *       | 0
 *       ^minimum (pivot point)
 *
 * left=0, right=6, mid=3, nums[mid]=7
 *   7 > 2 (nums[right]) -> minimum is to the right
 *   left = 4
 *
 * left=4, right=6, mid=5, nums[mid]=1
 *   1 < 2 (nums[right]) -> minimum is to the left (including mid)
 *   right = 5
 *
 * left=4, right=5, mid=4, nums[mid]=0
 *   0 < 1 (nums[right]) -> minimum is to the left (including mid)
 *   right = 4
 *
 * left=4, right=4, loop ends, return nums[4] = 0
 *
 * WHY COMPARE WITH RIGHT (not left)?
 * - Comparing with nums[right] consistently tells us which "side" mid is on
 * - If nums[mid] > nums[right]: mid is in higher segment, min is right
 * - If nums[mid] < nums[right]: mid is in lower segment, min is left (including mid)
 *
 * BOUNDARY BINARY SEARCH TEMPLATE:
 * When looking for a boundary (not exact match):
 *
 * while (left < right) {  // Note: < not <=
 *   mid = (left + right) / 2;
 *   if (condition) {
 *     left = mid + 1;     // Exclude mid
 *   } else {
 *     right = mid;        // Include mid as potential answer
 *   }
 * }
 * return left;  // left == right at the boundary
 */

export { findMin };
