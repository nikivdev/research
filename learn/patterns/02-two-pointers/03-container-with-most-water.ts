/**
 * LeetCode 11: Container With Most Water
 * https://leetcode.com/problems/container-with-most-water/
 *
 * Given n non-negative integers representing vertical lines,
 * find two lines that form a container holding the most water.
 *
 * PATTERN: Two Pointers moving inward, greedy choice
 *
 * KEY INSIGHT: Start with widest container, then try to find taller walls.
 * Always move the shorter wall because that's the only way to potentially
 * increase the area.
 */

// Brute Force - O(n^2)
function maxAreaBrute(height: number[]): number {
  let maxArea = 0;

  for (let i = 0; i < height.length; i++) {
    for (let j = i + 1; j < height.length; j++) {
      const width = j - i;
      const h = Math.min(height[i], height[j]);
      maxArea = Math.max(maxArea, width * h);
    }
  }

  return maxArea;
}

// Two Pointers - O(n) time, O(1) space
function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;

  while (left < right) {
    // Calculate area with current pointers
    const width = right - left;
    const h = Math.min(height[left], height[right]);
    const area = width * h;
    maxArea = Math.max(maxArea, area);

    // Move the shorter wall (greedy: this is the only way to potentially improve)
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxArea;
}

// Tests
console.log("Container With Most Water Tests:");
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49
console.log(maxArea([1, 1])); // 1

/**
 * WALKTHROUGH with [1, 8, 6, 2, 5, 4, 8, 3, 7]:
 *
 *          8       8
 *      8   |   5   |   7
 *      |   6   |   4   |
 *      |   |   |   |   3
 *      |   |   2   |   |
 *      |   |   |   |   |
 *  1   |   |   |   |   |
 *  |   |   |   |   |   |
 *  0   1   2   3   4   5   6   7   8  (indices)
 *
 * left=0, right=8: area = 8 * min(1,7) = 8, move left (1 < 7)
 * left=1, right=8: area = 7 * min(8,7) = 49, move right (8 > 7)
 * left=1, right=7: area = 6 * min(8,3) = 18, move right (8 > 3)
 * left=1, right=6: area = 5 * min(8,8) = 40, move right (equal, either works)
 * ... continues
 *
 * WHY MOVING SHORTER WALL WORKS:
 * - Area = width * min(left_height, right_height)
 * - When we move inward, width decreases
 * - Only chance to increase area is to find a taller wall
 * - Moving the taller wall can't help (min is limited by shorter wall)
 * - So we MUST move the shorter wall to have any chance of improvement
 *
 * This is a GREEDY choice - at each step, we make the locally optimal decision.
 *
 * INTERVIEW TIP: Draw the diagram! Visual proof is often clearer.
 */

export { maxArea };
