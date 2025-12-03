/**
 * LeetCode 15: 3Sum
 * https://leetcode.com/problems/3sum/
 *
 * Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]]
 * such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
 * The solution must not contain duplicate triplets.
 *
 * PATTERN: Sort + Fix one element + Two Pointers for remaining two
 *
 * KEY INSIGHT: This is Two Sum but with an extra dimension.
 * Fix one number, then use two pointers to find the other two.
 */

function threeSum(nums: number[]): number[][] {
  const result: number[][] = [];

  // Sort first! This enables two pointers and easy duplicate skipping
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicates for i
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    // Early termination: if smallest is positive, no solution possible
    if (nums[i] > 0) break;

    // Two pointers for the remaining two numbers
    let left = i + 1;
    let right = nums.length - 1;
    const target = -nums[i]; // We need left + right = -nums[i]

    while (left < right) {
      const sum = nums[left] + nums[right];

      if (sum === target) {
        result.push([nums[i], nums[left], nums[right]]);

        // Skip duplicates for left and right
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;

        left++;
        right--;
      } else if (sum < target) {
        left++; // Need bigger sum
      } else {
        right--; // Need smaller sum
      }
    }
  }

  return result;
}

// Tests
console.log("3Sum Tests:");
console.log(threeSum([-1, 0, 1, 2, -1, -4]));
// [[-1, -1, 2], [-1, 0, 1]]

console.log(threeSum([0, 1, 1])); // [] no triplet sums to 0
console.log(threeSum([0, 0, 0])); // [[0, 0, 0]]

/**
 * WALKTHROUGH with [-1, 0, 1, 2, -1, -4]:
 *
 * After sorting: [-4, -1, -1, 0, 1, 2]
 *
 * i=0, nums[i]=-4, target=4, left=1, right=5
 *   sum = -1 + 2 = 1 < 4, left++
 *   sum = -1 + 2 = 1 < 4, left++
 *   sum = 0 + 2 = 2 < 4, left++
 *   sum = 1 + 2 = 3 < 4, left++
 *   left >= right, done
 *
 * i=1, nums[i]=-1, target=1, left=2, right=5
 *   sum = -1 + 2 = 1 == 1 ✓ Found [-1, -1, 2]
 *   skip duplicates, left=3, right=4
 *   sum = 0 + 1 = 1 == 1 ✓ Found [-1, 0, 1]
 *
 * i=2, nums[i]=-1, SKIP (duplicate of i=1)
 *
 * i=3, nums[i]=0, target=0, left=4, right=5
 *   sum = 1 + 2 = 3 > 0, right--
 *   left >= right, done
 *
 * WHY SORTING HELPS:
 * 1. Enables two pointers (need sorted for directional movement)
 * 2. Makes duplicate detection easy (duplicates are adjacent)
 * 3. Allows early termination optimizations
 *
 * TIME: O(n^2) - for loop * two pointers
 * SPACE: O(1) ignoring output (or O(log n) for sorting)
 */

export { threeSum };
