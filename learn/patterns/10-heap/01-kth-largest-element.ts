/**
 * LeetCode 215: Kth Largest Element in an Array
 * https://leetcode.com/problems/kth-largest-element-in-an-array/
 *
 * Find the kth largest element in an unsorted array.
 *
 * PATTERN: Heap for maintaining k elements / QuickSelect
 *
 * KEY INSIGHT: Use a min-heap of size k. The top is the kth largest.
 */

import { MinHeap } from "./MinHeap";

// Approach 1: Sort - O(n log n) time, O(1) space
function findKthLargestSort(nums: number[], k: number): number {
  nums.sort((a, b) => b - a); // Sort descending
  return nums[k - 1];
}

// Approach 2: Min Heap of size k - O(n log k) time, O(k) space
function findKthLargest(nums: number[], k: number): number {
  const heap = new MinHeap<number>();

  for (const num of nums) {
    heap.push(num);

    // Keep only k largest elements
    if (heap.size > k) {
      heap.pop(); // Remove smallest
    }
  }

  // Top of min-heap is the kth largest
  return heap.peek()!;
}

// Approach 3: QuickSelect - O(n) average, O(n^2) worst case
function findKthLargestQuickSelect(nums: number[], k: number): number {
  // We want the (n - k)th smallest (0-indexed)
  const targetIndex = nums.length - k;

  function partition(left: number, right: number): number {
    const pivot = nums[right];
    let storeIndex = left;

    for (let i = left; i < right; i++) {
      if (nums[i] < pivot) {
        [nums[i], nums[storeIndex]] = [nums[storeIndex], nums[i]];
        storeIndex++;
      }
    }

    [nums[storeIndex], nums[right]] = [nums[right], nums[storeIndex]];
    return storeIndex;
  }

  function quickSelect(left: number, right: number): number {
    if (left === right) return nums[left];

    const pivotIndex = partition(left, right);

    if (pivotIndex === targetIndex) {
      return nums[pivotIndex];
    } else if (pivotIndex < targetIndex) {
      return quickSelect(pivotIndex + 1, right);
    } else {
      return quickSelect(left, pivotIndex - 1);
    }
  }

  return quickSelect(0, nums.length - 1);
}

// Tests
console.log("Kth Largest Element Tests:");
console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)); // 5
console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)); // 4

/**
 * WALKTHROUGH with [3, 2, 1, 5, 6, 4], k=2:
 *
 * Min-heap approach (keep k=2 largest):
 *
 * num=3: heap=[3], size=1
 * num=2: heap=[2,3], size=2
 * num=1: heap=[1,2,3], size=3 > k, pop min -> heap=[2,3]
 * num=5: heap=[2,3,5], size=3 > k, pop min -> heap=[3,5]
 * num=6: heap=[3,5,6], size=3 > k, pop min -> heap=[5,6]
 * num=4: heap=[4,5,6], size=3 > k, pop min -> heap=[5,6]
 *
 * heap.peek() = 5 (the 2nd largest!)
 *
 * WHY MIN-HEAP OF SIZE K?
 * - We want to keep the k largest elements
 * - Min-heap makes it easy to remove the smallest of the k
 * - After processing all elements, the k largest remain
 * - The root of min-heap is the smallest of the k largest = kth largest
 *
 * QUICKSELECT INTUITION:
 * - QuickSelect is like QuickSort but only recurses into one partition
 * - Average O(n) because: n + n/2 + n/4 + ... = 2n
 * - Use randomized pivot for better average case
 *
 * WHEN TO USE EACH:
 * - Heap: When k is small relative to n, or streaming data
 * - QuickSelect: When you need in-place and average O(n)
 * - Sort: When simplicity matters more than optimal complexity
 */

export { findKthLargest };
