/**
 * LeetCode 98: Validate Binary Search Tree
 * https://leetcode.com/problems/validate-binary-search-tree/
 *
 * Determine if a binary tree is a valid BST.
 * BST property: left < node < right (for ALL nodes in subtree)
 *
 * PATTERN: DFS with valid range / In-order traversal
 *
 * KEY INSIGHT: Each node must be within a valid range determined
 * by its ancestors. OR: In-order traversal of BST gives sorted order.
 */

import { TreeNode, createTree, printTree } from "./TreeNode";

// Approach 1: Valid Range DFS - O(n) time, O(h) space
function isValidBST(root: TreeNode | null): boolean {
  function validate(
    node: TreeNode | null,
    min: number,
    max: number
  ): boolean {
    if (node === null) return true;

    // Node must be within valid range
    if (node.val <= min || node.val >= max) {
      return false;
    }

    // Left subtree: all values must be < node.val
    // Right subtree: all values must be > node.val
    return (
      validate(node.left, min, node.val) &&
      validate(node.right, node.val, max)
    );
  }

  return validate(root, -Infinity, Infinity);
}

// Approach 2: In-order Traversal - O(n) time, O(h) space
// BST in-order traversal produces sorted sequence
function isValidBSTInorder(root: TreeNode | null): boolean {
  let prev = -Infinity;

  function inorder(node: TreeNode | null): boolean {
    if (node === null) return true;

    // Check left subtree
    if (!inorder(node.left)) return false;

    // Check current node (must be greater than previous)
    if (node.val <= prev) return false;
    prev = node.val;

    // Check right subtree
    return inorder(node.right);
  }

  return inorder(root);
}

// Approach 3: Iterative In-order with Stack
function isValidBSTIterative(root: TreeNode | null): boolean {
  const stack: TreeNode[] = [];
  let prev = -Infinity;
  let current = root;

  while (current !== null || stack.length > 0) {
    // Go to leftmost node
    while (current !== null) {
      stack.push(current);
      current = current.left;
    }

    current = stack.pop()!;

    // Check if in-order sequence is sorted
    if (current.val <= prev) return false;
    prev = current.val;

    current = current.right;
  }

  return true;
}

// Tests
console.log("Validate Binary Search Tree Tests:");

//     2      Valid BST
//    / \
//   1   3
const validBST = createTree([2, 1, 3]);
console.log("Valid BST:");
printTree(validBST);
console.log("Is valid:", isValidBST(validBST)); // true

//     5      Invalid BST (4 is in right subtree but 4 < 5)
//    / \
//   1   4
//      / \
//     3   6
const invalidBST = createTree([5, 1, 4, null, null, 3, 6]);
console.log("\nInvalid BST:");
printTree(invalidBST);
console.log("Is valid:", isValidBST(invalidBST)); // false

/**
 * WALKTHROUGH with valid BST [2, 1, 3]:
 *
 * validate(2, -∞, +∞): 2 in range? Yes
 *   validate(1, -∞, 2): 1 in range? Yes
 *     validate(null): true
 *     validate(null): true
 *     return true
 *   validate(3, 2, +∞): 3 in range? Yes
 *     validate(null): true
 *     validate(null): true
 *     return true
 *   return true && true = true
 *
 * WALKTHROUGH with invalid BST [5, 1, 4, null, null, 3, 6]:
 *
 * validate(5, -∞, +∞): 5 in range? Yes
 *   validate(1, -∞, 5): 1 in range? Yes, returns true
 *   validate(4, 5, +∞): 4 in range (5, +∞)? NO! 4 < 5
 *   return false
 *
 * COMMON MISTAKE:
 * Only checking node.left.val < node.val < node.right.val is NOT enough!
 * All nodes in left SUBTREE must be less than node.
 *
 * Example of this mistake:
 *     5
 *    / \
 *   1   6
 *      / \
 *     4   7   <- 4 < 5, but it's in right subtree! Invalid.
 *
 * BST PROPERTIES TO REMEMBER:
 * - In-order traversal gives sorted sequence
 * - Can use range validation (each node inherits constraints from ancestors)
 * - Search, insert, delete are O(h) where h is height
 */

export { isValidBST };
