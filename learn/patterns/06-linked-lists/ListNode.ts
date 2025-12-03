/**
 * Standard ListNode class used in most linked list problems.
 */
export class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// Helper: Create linked list from array
export function createList(arr: number[]): ListNode | null {
  if (arr.length === 0) return null;

  const head = new ListNode(arr[0]);
  let current = head;

  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }

  return head;
}

// Helper: Convert linked list to array (for testing)
export function listToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  let current = head;

  while (current) {
    result.push(current.val);
    current = current.next;
  }

  return result;
}

// Helper: Print linked list
export function printList(head: ListNode | null): void {
  console.log(listToArray(head).join(" -> ") || "empty");
}
