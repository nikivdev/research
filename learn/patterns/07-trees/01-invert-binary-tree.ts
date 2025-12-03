/**
 * LeetCode 226: Invert Binary Tree
 * https://leetcode.com/problems/invert-binary-tree/
 *
 * Invert a binary tree (mirror it).
 *
 * PATTERN: DFS - process current node, recurse on children
 *
 * KEY INSIGHT: At each node, swap left and right children.
 * Then recursively invert the subtrees.
 */

import { TreeNode, createTree, printTree } from "./TreeNode";

// Recursive DFS - O(n) time, O(h) space (h = height)
function invertTree(root: TreeNode | null): TreeNode | null {
  if (root === null) return null;

  // Swap children
  const temp = root.left;
  root.left = root.right;
  root.right = temp;

  // Recursively invert subtrees
  invertTree(root.left);
  invertTree(root.right);

  return root;
}

// Alternative: Swap after recursion (same result)
function invertTreePostOrder(root: TreeNode | null): TreeNode | null {
  if (root === null) return null;

  const left = invertTreePostOrder(root.left);
  const right = invertTreePostOrder(root.right);

  root.left = right;
  root.right = left;

  return root;
}

// Iterative BFS - O(n) time, O(n) space
function invertTreeBFS(root: TreeNode | null): TreeNode | null {
  if (root === null) return null;

  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const node = queue.shift()!;

    // Swap children
    const temp = node.left;
    node.left = node.right;
    node.right = temp;

    // Add children to queue
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return root;
}

// Tests
console.log("Invert Binary Tree Tests:");

//     4            4
//    / \          / \
//   2   7   =>   7   2
//  /\   /\      /\   /\
// 1  3 6  9    9  6 3  1

const tree = createTree([4, 2, 7, 1, 3, 6, 9]);
console.log("Original:");
printTree(tree);

const inverted = invertTree(tree);
console.log("\nInverted:");
printTree(inverted);

/**
 * WALKTHROUGH with tree [4, 2, 7, 1, 3, 6, 9]:
 *
 * invertTree(4):
 *   swap: 4.left=7, 4.right=2
 *   invertTree(7):
 *     swap: 7.left=9, 7.right=6
 *     invertTree(9): null children, return
 *     invertTree(6): null children, return
 *   invertTree(2):
 *     swap: 2.left=3, 2.right=1
 *     invertTree(3): null children, return
 *     invertTree(1): null children, return
 *   return root
 *
 * TREE TRAVERSAL PATTERNS:
 *
 * 1. DFS (Depth-First Search):
 *    - Pre-order: process node, then children (root-left-right)
 *    - In-order: left, process node, right (gives sorted order for BST)
 *    - Post-order: children first, then process node
 *
 * 2. BFS (Breadth-First Search):
 *    - Level-order: process all nodes at depth d before depth d+1
 *    - Use a queue
 *
 * DFS TEMPLATE:
 * function dfs(node) {
 *   if (!node) return baseCase;
 *   // Pre-order: process here (before children)
 *   dfs(node.left);
 *   // In-order: process here (between children)
 *   dfs(node.right);
 *   // Post-order: process here (after children)
 *   return result;
 * }
 */

export { invertTree };
