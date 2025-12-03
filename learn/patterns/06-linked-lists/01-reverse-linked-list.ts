/**
 * LeetCode 206: Reverse Linked List
 * https://leetcode.com/problems/reverse-linked-list/
 *
 * Reverse a singly linked list.
 *
 * PATTERN: Pointer manipulation - iterative or recursive
 *
 * KEY INSIGHT: Change each node's next pointer to point backwards.
 * Need to save the next node before we change the pointer!
 */

import { ListNode, createList, printList } from "./ListNode";

// Iterative - O(n) time, O(1) space
function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let current = head;

  while (current !== null) {
    const next = current.next; // Save next node
    current.next = prev; // Reverse the pointer
    prev = current; // Move prev forward
    current = next; // Move current forward
  }

  return prev; // prev is now the new head
}

// Recursive - O(n) time, O(n) space (call stack)
function reverseListRecursive(head: ListNode | null): ListNode | null {
  // Base case: empty list or single node
  if (head === null || head.next === null) {
    return head;
  }

  // Recursively reverse the rest
  const newHead = reverseListRecursive(head.next);

  // Current head's next node should point back to head
  head.next.next = head;
  head.next = null;

  return newHead;
}

// Tests
console.log("Reverse Linked List Tests:");

const list1 = createList([1, 2, 3, 4, 5]);
console.log("Original:");
printList(list1);

const reversed1 = reverseList(list1);
console.log("Reversed:");
printList(reversed1);

const list2 = createList([1, 2]);
const reversed2 = reverseListRecursive(list2);
console.log("Reversed [1,2]:");
printList(reversed2);

/**
 * WALKTHROUGH with 1 -> 2 -> 3 -> null:
 *
 * Initial: prev=null, current=1
 *
 * Step 1: next=2, 1.next=null, prev=1, current=2
 *         null <- 1    2 -> 3 -> null
 *                 ^    ^
 *              prev  current
 *
 * Step 2: next=3, 2.next=1, prev=2, current=3
 *         null <- 1 <- 2    3 -> null
 *                      ^    ^
 *                   prev  current
 *
 * Step 3: next=null, 3.next=2, prev=3, current=null
 *         null <- 1 <- 2 <- 3
 *                           ^
 *                         prev
 *
 * Return prev (which is 3, the new head)
 *
 * LINKED LIST TIPS:
 * 1. Always draw the pointers!
 * 2. Save next node before modifying pointers
 * 3. Use dummy nodes for edge cases (insert/delete at head)
 * 4. Two-pointer (slow/fast) for cycle detection, finding middle
 */

export { reverseList };
