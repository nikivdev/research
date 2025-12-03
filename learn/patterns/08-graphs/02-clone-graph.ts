/**
 * LeetCode 133: Clone Graph
 * https://leetcode.com/problems/clone-graph/
 *
 * Given a reference of a node in a connected undirected graph,
 * return a deep copy (clone) of the graph.
 *
 * PATTERN: Graph traversal with HashMap for tracking cloned nodes
 *
 * KEY INSIGHT: Use a map from original node to cloned node.
 * When you encounter a node, either clone it or return existing clone.
 */

// Graph Node definition
class GraphNode {
  val: number;
  neighbors: GraphNode[];

  constructor(val?: number, neighbors?: GraphNode[]) {
    this.val = val === undefined ? 0 : val;
    this.neighbors = neighbors === undefined ? [] : neighbors;
  }
}

// DFS approach with HashMap - O(V + E) time, O(V) space
function cloneGraph(node: GraphNode | null): GraphNode | null {
  if (node === null) return null;

  // Map: original node -> cloned node
  const cloned = new Map<GraphNode, GraphNode>();

  function dfs(original: GraphNode): GraphNode {
    // If already cloned, return the clone
    if (cloned.has(original)) {
      return cloned.get(original)!;
    }

    // Create clone (without neighbors initially)
    const copy = new GraphNode(original.val);
    cloned.set(original, copy);

    // Clone all neighbors
    for (const neighbor of original.neighbors) {
      copy.neighbors.push(dfs(neighbor));
    }

    return copy;
  }

  return dfs(node);
}

// BFS approach - same complexity
function cloneGraphBFS(node: GraphNode | null): GraphNode | null {
  if (node === null) return null;

  const cloned = new Map<GraphNode, GraphNode>();
  const queue: GraphNode[] = [node];

  // Create clone of starting node
  cloned.set(node, new GraphNode(node.val));

  while (queue.length > 0) {
    const original = queue.shift()!;
    const copy = cloned.get(original)!;

    for (const neighbor of original.neighbors) {
      // Clone neighbor if not already cloned
      if (!cloned.has(neighbor)) {
        cloned.set(neighbor, new GraphNode(neighbor.val));
        queue.push(neighbor);
      }

      // Connect clone to cloned neighbor
      copy.neighbors.push(cloned.get(neighbor)!);
    }
  }

  return cloned.get(node)!;
}

// Tests
console.log("Clone Graph Tests:");

// Create graph: 1 -- 2
//               |    |
//               4 -- 3
const n1 = new GraphNode(1);
const n2 = new GraphNode(2);
const n3 = new GraphNode(3);
const n4 = new GraphNode(4);

n1.neighbors = [n2, n4];
n2.neighbors = [n1, n3];
n3.neighbors = [n2, n4];
n4.neighbors = [n1, n3];

const clonedGraph = cloneGraph(n1);

console.log("Original node 1 val:", n1.val);
console.log("Cloned node 1 val:", clonedGraph?.val);
console.log("Are they same object?", n1 === clonedGraph); // false
console.log("Original neighbors:", n1.neighbors.map((n) => n.val));
console.log("Cloned neighbors:", clonedGraph?.neighbors.map((n) => n.val));

/**
 * WALKTHROUGH with graph 1-2-3-4:
 *
 * dfs(1):
 *   Create clone of 1, map = {1: 1'}
 *   Process neighbor 2: dfs(2)
 *     Create clone of 2, map = {1: 1', 2: 2'}
 *     Process neighbor 1: already cloned, return 1'
 *     Process neighbor 3: dfs(3)
 *       Create clone of 3, map = {..., 3: 3'}
 *       Process neighbor 2: already cloned, return 2'
 *       Process neighbor 4: dfs(4)
 *         Create clone of 4, map = {..., 4: 4'}
 *         Process neighbor 1: already cloned, return 1'
 *         Process neighbor 3: already cloned, return 3'
 *         4'.neighbors = [1', 3']
 *         return 4'
 *       3'.neighbors = [2', 4']
 *       return 3'
 *     2'.neighbors = [1', 3']
 *     return 2'
 *   Process neighbor 4: already cloned, return 4'
 *   1'.neighbors = [2', 4']
 *   return 1'
 *
 * KEY INSIGHT:
 * The map serves two purposes:
 * 1. Avoid infinite loops (if we've seen a node, use existing clone)
 * 2. Ensure each node is cloned exactly once
 *
 * GRAPH CLONING PATTERN:
 * - Use HashMap: original -> clone
 * - Before cloning, check if already cloned
 * - Clone node first (without edges), then recursively clone neighbors
 */

export { cloneGraph, GraphNode };
