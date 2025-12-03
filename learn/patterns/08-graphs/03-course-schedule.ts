/**
 * LeetCode 207: Course Schedule
 * https://leetcode.com/problems/course-schedule/
 *
 * There are numCourses courses labeled 0 to numCourses-1.
 * prerequisites[i] = [a, b] means you must take course b before course a.
 * Return true if you can finish all courses.
 *
 * PATTERN: Topological Sort / Cycle Detection in Directed Graph
 *
 * KEY INSIGHT: You can finish all courses if and only if the prerequisite
 * graph has no cycles. This is the classic topological sort problem.
 */

// DFS Cycle Detection - O(V + E) time, O(V + E) space
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  // Build adjacency list
  const graph: number[][] = Array.from({ length: numCourses }, () => []);
  for (const [course, prereq] of prerequisites) {
    graph[course].push(prereq);
  }

  // States: 0 = unvisited, 1 = visiting (in current path), 2 = visited (completed)
  const state = new Array(numCourses).fill(0);

  function hasCycle(course: number): boolean {
    if (state[course] === 1) return true; // Found cycle! (back edge)
    if (state[course] === 2) return false; // Already processed, no cycle

    state[course] = 1; // Mark as visiting

    // Check all prerequisites
    for (const prereq of graph[course]) {
      if (hasCycle(prereq)) return true;
    }

    state[course] = 2; // Mark as completed
    return false;
  }

  // Check each course (graph might be disconnected)
  for (let course = 0; course < numCourses; course++) {
    if (hasCycle(course)) return false;
  }

  return true;
}

// BFS Topological Sort (Kahn's Algorithm) - O(V + E)
function canFinishBFS(numCourses: number, prerequisites: number[][]): boolean {
  // Build adjacency list and in-degree count
  const graph: number[][] = Array.from({ length: numCourses }, () => []);
  const inDegree = new Array(numCourses).fill(0);

  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course); // prereq -> course
    inDegree[course]++;
  }

  // Start with courses that have no prerequisites
  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  let completed = 0;

  while (queue.length > 0) {
    const course = queue.shift()!;
    completed++;

    // "Complete" this course - reduce in-degree of dependent courses
    for (const nextCourse of graph[course]) {
      inDegree[nextCourse]--;
      if (inDegree[nextCourse] === 0) {
        queue.push(nextCourse);
      }
    }
  }

  // If we completed all courses, no cycle exists
  return completed === numCourses;
}

// Tests
console.log("Course Schedule Tests:");

console.log(canFinish(2, [[1, 0]])); // true: take 0 then 1
console.log(canFinish(2, [[1, 0], [0, 1]])); // false: cycle (0 needs 1, 1 needs 0)
console.log(canFinish(3, [[1, 0], [2, 1]])); // true: 0 -> 1 -> 2

/**
 * WALKTHROUGH with [[1, 0], [0, 1]] (cycle):
 *
 * Graph: 0 -> 1 (course 1 needs 0)
 *        1 -> 0 (course 0 needs 1)
 *
 * DFS from course 0:
 *   state[0] = 1 (visiting)
 *   Check prereq 1:
 *     state[1] = 1 (visiting)
 *     Check prereq 0:
 *       state[0] === 1 (already visiting!) -> CYCLE DETECTED
 *
 * TOPOLOGICAL SORT CONCEPTS:
 *
 * 1. Topological order: Linear ordering of vertices such that for every
 *    directed edge (u, v), u comes before v.
 *
 * 2. Only possible if graph is a DAG (Directed Acyclic Graph)
 *
 * 3. Two approaches:
 *    - DFS: Process nodes in reverse post-order (or detect cycle)
 *    - BFS (Kahn's): Start with nodes of in-degree 0, remove edges
 *
 * THREE-COLOR DFS (for cycle detection):
 * - WHITE (0): Unvisited
 * - GRAY (1): Currently in recursion stack (visiting)
 * - BLACK (2): Fully processed (visited)
 *
 * A cycle exists if we reach a GRAY node from another GRAY node.
 *
 * VARIATIONS:
 * - Course Schedule II: Return the actual ordering
 * - Parallel Courses: Find minimum semesters (longest path in DAG)
 */

export { canFinish };
