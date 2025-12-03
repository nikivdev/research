/**
 * LeetCode 21: Merge Two Sorted Lists
 * https://leetcode.com/problems/merge-two-sorted-lists/
 *
 * Merge two sorted linked lists into one sorted list.
 *
 * PATTERN: Dummy head + Two pointers
 *
 * KEY INSIGHT: Use a dummy node to simplify edge cases.
 * Compare nodes from both lists, append smaller one.
 */

import { ListNode, createList, printList } from "./ListNode";

// Iterative with dummy head - O(n + m) time, O(1) space
function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  // Dummy node simplifies edge cases (no need to handle empty result)
  const dummy = new ListNode(-1);
  let current = dummy;

  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }

  // Append remaining nodes (one list might not be exhausted)
  current.next = list1 !== null ? list1 : list2;

  return dummy.next; // Skip the dummy node
}

// Recursive - O(n + m) time, O(n + m) space
function mergeTwoListsRecursive(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  if (list1 === null) return list2;
  if (list2 === null) return list1;

  if (list1.val <= list2.val) {
    list1.next = mergeTwoListsRecursive(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoListsRecursive(list1, list2.next);
    return list2;
  }
}

// Tests
console.log("Merge Two Sorted Lists Tests:");

const l1 = createList([1, 2, 4]);
const l2 = createList([1, 3, 4]);
console.log("List 1:");
printList(l1);
console.log("List 2:");
printList(l2);

const merged = mergeTwoLists(l1, l2);
console.log("Merged:");
printList(merged);

/**
 * WALKTHROUGH with [1,2,4] and [1,3,4]:
 *
 * dummy -> ?
 * l1: 1 -> 2 -> 4
 * l2: 1 -> 3 -> 4
 *
 * Compare 1 vs 1: l1.val <= l2.val, pick l1
 * dummy -> 1, l1 moves to 2
 *
 * Compare 2 vs 1: l2.val < l1.val, pick l2
 * dummy -> 1 -> 1, l2 moves to 3
 *
 * Compare 2 vs 3: l1.val < l2.val, pick l1
 * dummy -> 1 -> 1 -> 2, l1 moves to 4
 *
 * Compare 4 vs 3: l2.val < l1.val, pick l2
 * dummy -> 1 -> 1 -> 2 -> 3, l2 moves to 4
 *
 * Compare 4 vs 4: l1.val <= l2.val, pick l1
 * dummy -> 1 -> 1 -> 2 -> 3 -> 4, l1 becomes null
 *
 * l1 is null, append remaining l2: 4
 * dummy -> 1 -> 1 -> 2 -> 3 -> 4 -> 4
 *
 * DUMMY NODE PATTERN:
 * - Create dummy at start to avoid special-casing empty result
 * - Build result by appending to current.next
 * - Return dummy.next (skip the dummy)
 *
 * This pattern is useful for: merge, remove elements, partition, etc.
 */

export { mergeTwoLists };
