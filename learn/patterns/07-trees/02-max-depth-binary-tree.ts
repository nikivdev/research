/**
 * LeetCode 104: Maximum Depth of Binary Tree
 * https://leetcode.com/problems/maximum-depth-of-binary-tree/
 *
 * Find the maximum depth (number of nodes from root to deepest leaf).
 *
 * PATTERN: DFS with return value aggregation
 *
 * KEY INSIGHT: Depth of a node = 1 + max(depth of left, depth of right)
 */

import { TreeNode, createTree, printTree } from "./TreeNode";

// Recursive DFS - O(n) time, O(h) space
function maxDepth(root: TreeNode | null): number {
  if (root === null) return 0;

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return 1 + Math.max(leftDepth, rightDepth);
}

// One-liner version (same logic)
const maxDepthOneLiner = (root: TreeNode | null): number =>
  root === null ? 0 : 1 + Math.max(maxDepthOneLiner(root.left), maxDepthOneLiner(root.right));

// Iterative BFS - count levels
function maxDepthBFS(root: TreeNode | null): number {
  if (root === null) return 0;

  const queue: TreeNode[] = [root];
  let depth = 0;

  while (queue.length > 0) {
    const levelSize = queue.length;
    depth++;

    // Process all nodes at current level
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return depth;
}

// Iterative DFS with stack
function maxDepthDFS(root: TreeNode | null): number {
  if (root === null) return 0;

  const stack: Array<{ node: TreeNode; depth: number }> = [{ node: root, depth: 1 }];
  let maxD = 0;

  while (stack.length > 0) {
    const { node, depth } = stack.pop()!;
    maxD = Math.max(maxD, depth);

    if (node.right) stack.push({ node: node.right, depth: depth + 1 });
    if (node.left) stack.push({ node: node.left, depth: depth + 1 });
  }

  return maxD;
}

// Tests
console.log("Maximum Depth of Binary Tree Tests:");

//     3
//    / \
//   9  20
//      /\
//     15 7
// Depth = 3

const tree = createTree([3, 9, 20, null, null, 15, 7]);
console.log("Tree:");
printTree(tree);

console.log("Max depth:", maxDepth(tree)); // 3
console.log("Max depth (BFS):", maxDepthBFS(tree)); // 3

/**
 * WALKTHROUGH with tree [3, 9, 20, null, null, 15, 7]:
 *
 * maxDepth(3)
 *   maxDepth(9)
 *     maxDepth(null) = 0
 *     maxDepth(null) = 0
 *     return 1 + max(0, 0) = 1
 *   maxDepth(20)
 *     maxDepth(15)
 *       return 1 + max(0, 0) = 1
 *     maxDepth(7)
 *       return 1 + max(0, 0) = 1
 *     return 1 + max(1, 1) = 2
 *   return 1 + max(1, 2) = 3
 *
 * COMMON TREE PROBLEMS PATTERN:
 *
 * "Property of tree" problems:
 * - Compute property for left subtree
 * - Compute property for right subtree
 * - Combine results with current node
 *
 * Examples:
 * - maxDepth: 1 + max(left, right)
 * - size: 1 + left + right
 * - sum: node.val + left + right
 * - diameter: max(leftDepth + rightDepth, ...)
 */

export { maxDepth };
