/**
 * Standard TreeNode class used in most binary tree problems.
 */
export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// Helper: Create tree from level-order array (null represents missing node)
export function createTree(arr: (number | null)[]): TreeNode | null {
  if (arr.length === 0 || arr[0] === null) return null;

  const root = new TreeNode(arr[0]);
  const queue: TreeNode[] = [root];
  let i = 1;

  while (i < arr.length) {
    const node = queue.shift()!;

    // Left child
    if (i < arr.length && arr[i] !== null) {
      node.left = new TreeNode(arr[i] as number);
      queue.push(node.left);
    }
    i++;

    // Right child
    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i] as number);
      queue.push(node.right);
    }
    i++;
  }

  return root;
}

// Helper: Print tree (simple representation)
export function printTree(root: TreeNode | null, prefix = "", isLeft = true): void {
  if (root === null) return;

  if (root.right) {
    printTree(root.right, prefix + (isLeft ? "│   " : "    "), false);
  }

  console.log(prefix + (isLeft ? "└── " : "┌── ") + root.val);

  if (root.left) {
    printTree(root.left, prefix + (isLeft ? "    " : "│   "), true);
  }
}
