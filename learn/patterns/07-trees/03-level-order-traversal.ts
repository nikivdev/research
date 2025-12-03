/**
 * LeetCode 102: Binary Tree Level Order Traversal
 * https://leetcode.com/problems/binary-tree-level-order-traversal/
 *
 * Return level order traversal of nodes (by level from left to right).
 *
 * PATTERN: BFS with level tracking
 *
 * KEY INSIGHT: Use queue, process one level at a time by tracking queue size.
 */

import { TreeNode, createTree, printTree } from "./TreeNode";

// BFS - O(n) time, O(n) space
function levelOrder(root: TreeNode | null): number[][] {
  if (root === null) return [];

  const result: number[][] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel: number[] = [];

    // Process all nodes at current level
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      currentLevel.push(node.val);

      // Add children for next level
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
  }

  return result;
}

// DFS approach (less intuitive but works)
function levelOrderDFS(root: TreeNode | null): number[][] {
  const result: number[][] = [];

  function dfs(node: TreeNode | null, level: number): void {
    if (node === null) return;

    // Ensure array exists for this level
    if (result.length === level) {
      result.push([]);
    }

    result[level].push(node.val);

    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  }

  dfs(root, 0);
  return result;
}

// Tests
console.log("Binary Tree Level Order Traversal Tests:");

//     3
//    / \
//   9  20
//      /\
//     15 7

const tree = createTree([3, 9, 20, null, null, 15, 7]);
console.log("Tree:");
printTree(tree);

console.log("Level order:", levelOrder(tree));
// [[3], [9, 20], [15, 7]]

/**
 * WALKTHROUGH with tree [3, 9, 20, null, null, 15, 7]:
 *
 * Initial: queue = [3], result = []
 *
 * Level 0: levelSize = 1
 *   Process 3: currentLevel = [3], add 9, 20 to queue
 *   result = [[3]], queue = [9, 20]
 *
 * Level 1: levelSize = 2
 *   Process 9: currentLevel = [9], no children
 *   Process 20: currentLevel = [9, 20], add 15, 7 to queue
 *   result = [[3], [9, 20]], queue = [15, 7]
 *
 * Level 2: levelSize = 2
 *   Process 15: currentLevel = [15], no children
 *   Process 7: currentLevel = [15, 7], no children
 *   result = [[3], [9, 20], [15, 7]], queue = []
 *
 * BFS LEVEL-ORDER TEMPLATE:
 *
 * function levelOrder(root) {
 *   if (!root) return [];
 *   const result = [];
 *   const queue = [root];
 *
 *   while (queue.length > 0) {
 *     const levelSize = queue.length;  // KEY: capture size before modifications
 *     const currentLevel = [];
 *
 *     for (let i = 0; i < levelSize; i++) {
 *       const node = queue.shift();
 *       currentLevel.push(node.val);
 *       if (node.left) queue.push(node.left);
 *       if (node.right) queue.push(node.right);
 *     }
 *
 *     result.push(currentLevel);
 *   }
 *
 *   return result;
 * }
 *
 * VARIATIONS:
 * - Zigzag level order: alternate direction each level
 * - Right side view: take last element of each level
 * - Average of levels: compute average instead of collecting
 */

export { levelOrder };
