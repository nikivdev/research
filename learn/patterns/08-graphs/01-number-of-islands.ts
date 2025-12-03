/**
 * LeetCode 200: Number of Islands
 * https://leetcode.com/problems/number-of-islands/
 *
 * Given a 2D grid of '1's (land) and '0's (water), count the number of islands.
 * An island is surrounded by water and formed by connecting adjacent lands
 * horizontally or vertically.
 *
 * PATTERN: Graph DFS/BFS - Grid traversal with flood fill
 *
 * KEY INSIGHT: Each island is a connected component. When we find a '1',
 * we've found a new island - mark all connected '1's as visited.
 */

// DFS approach - O(m*n) time, O(m*n) space worst case
function numIslands(grid: string[][]): number {
  if (grid.length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let islands = 0;

  // DFS to mark all connected land as visited
  function dfs(r: number, c: number): void {
    // Boundary check and water/visited check
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== "1") {
      return;
    }

    // Mark as visited (change to '0' or use a separate visited set)
    grid[r][c] = "0";

    // Explore all 4 directions
    dfs(r + 1, c); // down
    dfs(r - 1, c); // up
    dfs(r, c + 1); // right
    dfs(r, c - 1); // left
  }

  // Scan entire grid
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") {
        islands++;
        dfs(r, c); // Mark entire island as visited
      }
    }
  }

  return islands;
}

// BFS approach - same complexity, iterative
function numIslandsBFS(grid: string[][]): number {
  if (grid.length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let islands = 0;

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function bfs(startR: number, startC: number): void {
    const queue: [number, number][] = [[startR, startC]];
    grid[startR][startC] = "0";

    while (queue.length > 0) {
      const [r, c] = queue.shift()!;

      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;

        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === "1") {
          grid[nr][nc] = "0";
          queue.push([nr, nc]);
        }
      }
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") {
        islands++;
        bfs(r, c);
      }
    }
  }

  return islands;
}

// Tests
console.log("Number of Islands Tests:");

const grid1 = [
  ["1", "1", "1", "1", "0"],
  ["1", "1", "0", "1", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "0", "0", "0"],
];
console.log("Grid 1: 1 island");
console.log(numIslands(grid1)); // 1

const grid2 = [
  ["1", "1", "0", "0", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "1", "0", "0"],
  ["0", "0", "0", "1", "1"],
];
console.log("Grid 2: 3 islands");
console.log(numIslands(grid2)); // 3

/**
 * WALKTHROUGH with grid1:
 *
 * 1 1 1 1 0
 * 1 1 0 1 0
 * 1 1 0 0 0
 * 0 0 0 0 0
 *
 * Find '1' at (0,0), islands=1, start DFS:
 * - Mark (0,0)=0, explore neighbors
 * - (1,0) is '1', mark it, continue DFS
 * - (0,1) is '1', mark it, continue DFS
 * - Eventually all connected '1's become '0'
 *
 * Continue scanning, all remaining are '0', return 1
 *
 * GRID GRAPH TEMPLATE:
 *
 * function gridDFS(grid) {
 *   const rows = grid.length, cols = grid[0].length;
 *   const visited = new Set();  // or modify grid in place
 *
 *   function dfs(r, c) {
 *     // 1. Check bounds
 *     if (r < 0 || r >= rows || c < 0 || c >= cols) return;
 *     // 2. Check if valid cell to visit
 *     if (grid[r][c] !== target || visited.has(`${r},${c}`)) return;
 *     // 3. Mark as visited
 *     visited.add(`${r},${c}`);
 *     // 4. Visit neighbors
 *     dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1);
 *   }
 * }
 *
 * 4 DIRECTIONS: [[1,0], [-1,0], [0,1], [0,-1]]
 * 8 DIRECTIONS (with diagonals): add [1,1], [1,-1], [-1,1], [-1,-1]
 */

export { numIslands };
