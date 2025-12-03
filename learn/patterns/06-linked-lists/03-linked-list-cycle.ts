/**
 * LeetCode 141: Linked List Cycle
 * https://leetcode.com/problems/linked-list-cycle/
 *
 * Detect if a linked list has a cycle.
 *
 * PATTERN: Floyd's Cycle Detection (Fast & Slow pointers)
 *
 * KEY INSIGHT: If there's a cycle, fast pointer will eventually
 * catch up to slow pointer (like runners on a circular track).
 */

import { ListNode, createList } from "./ListNode";

// Hash Set approach - O(n) time, O(n) space
function hasCycleSet(head: ListNode | null): boolean {
  const seen = new Set<ListNode>();

  let current = head;
  while (current !== null) {
    if (seen.has(current)) {
      return true; // We've seen this node before = cycle!
    }
    seen.add(current);
    current = current.next;
  }

  return false;
}

// Floyd's Algorithm - O(n) time, O(1) space (OPTIMAL)
function hasCycle(head: ListNode | null): boolean {
  if (head === null || head.next === null) {
    return false;
  }

  let slow: ListNode | null = head;
  let fast: ListNode | null = head;

  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true; // Pointers met = cycle exists
    }
  }

  return false; // Fast reached end = no cycle
}

// Tests
console.log("Linked List Cycle Tests:");

// Create a list with a cycle: 3 -> 2 -> 0 -> -4 -> (back to 2)
const cycleList = createList([3, 2, 0, -4]);
if (cycleList) {
  // Find the node with value 2
  let node2 = cycleList.next;
  // Find the tail (-4)
  let tail = cycleList;
  while (tail.next) tail = tail.next;
  // Create cycle: tail points back to node2
  tail.next = node2;
}
console.log("List with cycle:", hasCycle(cycleList)); // true

const noCycleList = createList([1, 2, 3, 4]);
console.log("List without cycle:", hasCycle(noCycleList)); // false

console.log("Empty list:", hasCycle(null)); // false

/**
 * WALKTHROUGH with cycle 3 -> 2 -> 0 -> -4 -> (back to 2):
 *
 * Position: 3 -> 2 -> 0 -> -4
 *               ^-----------'
 *
 * Step 0: slow=3, fast=3
 * Step 1: slow=2, fast=0 (fast moves 2 steps)
 * Step 2: slow=0, fast=2 (fast wraps around cycle)
 * Step 3: slow=-4, fast=-4 (they meet!)
 *
 * WHY DOES FAST ALWAYS CATCH SLOW?
 * - In a cycle, fast gains 1 position per iteration
 * - The gap closes by 1 each step
 * - Eventually gap becomes 0 (they meet)
 *
 * FLOYD'S ALGORITHM EXTENDED:
 * To find WHERE the cycle starts (LeetCode 142):
 * 1. After they meet, reset slow to head
 * 2. Move both one step at a time
 * 3. They'll meet at the cycle start!
 *
 * Math proof: distance from head to cycle start = distance from
 * meeting point to cycle start (going around the cycle)
 *
 * FAST/SLOW POINTER USES:
 * - Cycle detection
 * - Find middle of list (when fast reaches end, slow is at middle)
 * - Find nth from end (start fast n steps ahead)
 */

export { hasCycle };
