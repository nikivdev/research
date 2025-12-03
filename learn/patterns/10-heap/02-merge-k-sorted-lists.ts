/**
 * LeetCode 23: Merge k Sorted Lists
 * https://leetcode.com/problems/merge-k-sorted-lists/
 *
 * Merge k sorted linked lists into one sorted linked list.
 *
 * PATTERN: Min Heap for k-way merge
 *
 * KEY INSIGHT: Keep one node from each list in the heap.
 * Pop the smallest, add its next to the heap.
 */

import { MinHeap } from "./MinHeap";

// ListNode definition
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// Helper to create list
function createList(arr: number[]): ListNode | null {
  if (arr.length === 0) return null;
  const head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

// Helper to convert list to array
function listToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  while (head) {
    result.push(head.val);
    head = head.next;
  }
  return result;
}

// Approach 1: Min Heap - O(n log k) time, O(k) space
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  // Min heap ordered by node value
  const heap = new MinHeap<ListNode>((a, b) => a.val - b.val);

  // Add the head of each non-empty list to the heap
  for (const list of lists) {
    if (list) {
      heap.push(list);
    }
  }

  const dummy = new ListNode(-1);
  let current = dummy;

  while (heap.size > 0) {
    // Get the smallest node
    const smallest = heap.pop()!;
    current.next = smallest;
    current = current.next;

    // If this node has a next, add it to the heap
    if (smallest.next) {
      heap.push(smallest.next);
    }
  }

  return dummy.next;
}

// Approach 2: Divide and Conquer - O(n log k) time, O(log k) space
function mergeKListsDivideConquer(lists: Array<ListNode | null>): ListNode | null {
  if (lists.length === 0) return null;
  if (lists.length === 1) return lists[0];

  function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const dummy = new ListNode(-1);
    let current = dummy;

    while (l1 && l2) {
      if (l1.val <= l2.val) {
        current.next = l1;
        l1 = l1.next;
      } else {
        current.next = l2;
        l2 = l2.next;
      }
      current = current.next;
    }

    current.next = l1 || l2;
    return dummy.next;
  }

  // Merge pairs until one list remains
  while (lists.length > 1) {
    const merged: Array<ListNode | null> = [];

    for (let i = 0; i < lists.length; i += 2) {
      const l1 = lists[i];
      const l2 = i + 1 < lists.length ? lists[i + 1] : null;
      merged.push(mergeTwoLists(l1, l2));
    }

    lists = merged;
  }

  return lists[0];
}

// Tests
console.log("Merge K Sorted Lists Tests:");

const lists = [createList([1, 4, 5]), createList([1, 3, 4]), createList([2, 6])];

console.log("Input lists:");
lists.forEach((list, i) => console.log(`List ${i}:`, listToArray(list)));

const merged = mergeKLists(lists);
console.log("Merged:", listToArray(merged));
// [1, 1, 2, 3, 4, 4, 5, 6]

/**
 * WALKTHROUGH with [[1,4,5], [1,3,4], [2,6]]:
 *
 * Initial heap: [1(list0), 1(list1), 2(list2)]
 *
 * Pop 1(list0): result=[1], add 4(list0), heap=[1,2,4]
 * Pop 1(list1): result=[1,1], add 3(list1), heap=[2,3,4]
 * Pop 2(list2): result=[1,1,2], add 6(list2), heap=[3,4,6]
 * Pop 3(list1): result=[1,1,2,3], add 4(list1), heap=[4,4,6]
 * Pop 4(list0): result=[1,1,2,3,4], add 5(list0), heap=[4,5,6]
 * Pop 4(list1): result=[1,1,2,3,4,4], no next, heap=[5,6]
 * Pop 5(list0): result=[1,1,2,3,4,4,5], no next, heap=[6]
 * Pop 6(list2): result=[1,1,2,3,4,4,5,6], no next, heap=[]
 *
 * WHY HEAP IS O(n log k)?
 * - n = total number of nodes
 * - k = number of lists
 * - Each node is pushed/popped from heap once
 * - Each heap operation is O(log k) because heap has at most k elements
 *
 * DIVIDE AND CONQUER:
 * - Merge pairs: k lists -> k/2 lists -> k/4 lists -> ... -> 1 list
 * - log k rounds, each round processes all n nodes
 * - Total: O(n log k)
 *
 * HEAP VS DIVIDE AND CONQUER:
 * - Heap: Simple, works with streaming input
 * - D&C: No extra heap structure needed, good cache locality
 */

export { mergeKLists };
