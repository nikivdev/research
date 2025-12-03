/**
 * LeetCode 33: Search in Rotated Sorted Array
 * https://leetcode.com/problems/search-in-rotated-sorted-array/
 *
 * Array was sorted then rotated at some pivot.
 * Search for target in O(log n) time.
 *
 * PATTERN: Modified Binary Search
 *
 * KEY INSIGHT: At least one half is always sorted.
 * Determine which half is sorted, then check if target is in that half.
 */

function searchRotated(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    // Determine which half is sorted
    if (nums[left] <= nums[mid]) {
      // Left half is sorted
      if (nums[left] <= target && target < nums[mid]) {
        // Target is in sorted left half
        right = mid - 1;
      } else {
        // Target is in right half
        left = mid + 1;
      }
    } else {
      // Right half is sorted
      if (nums[mid] < target && target <= nums[right]) {
        // Target is in sorted right half
        left = mid + 1;
      } else {
        // Target is in left half
        right = mid - 1;
      }
    }
  }

  return -1;
}

// Tests
console.log("Search in Rotated Sorted Array Tests:");
console.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 0)); // 4
console.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 3)); // -1
console.log(searchRotated([1], 0)); // -1

/**
 * WALKTHROUGH with [4, 5, 6, 7, 0, 1, 2], target=0:
 *
 * Original sorted: [0, 1, 2, 4, 5, 6, 7]
 * Rotated at 4:    [4, 5, 6, 7, 0, 1, 2]
 *                   ^pivot
 *
 * left=0, right=6, mid=3, nums[mid]=7
 *   nums[0]=4 <= nums[3]=7 -> left half [4,5,6,7] is sorted
 *   Is 0 in [4, 7)? No (0 < 4)
 *   Search right half: left=4
 *
 * left=4, right=6, mid=5, nums[mid]=1
 *   nums[4]=0 <= nums[5]=1 -> left half [0,1] is sorted
 *   Is 0 in [0, 1)? Yes!
 *   Search left half: right=4
 *
 * left=4, right=4, mid=4, nums[mid]=0 == target, return 4!
 *
 * KEY OBSERVATION:
 * After rotation, the array looks like two sorted subarrays:
 * [larger values...] [smaller values...]
 *
 * At any mid point, one half is completely sorted (no rotation in it).
 * We can identify which half is sorted by comparing endpoints.
 * Then we can check if target falls within that sorted range.
 */

export { searchRotated };
