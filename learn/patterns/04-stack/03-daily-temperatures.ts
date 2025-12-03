/**
 * LeetCode 739: Daily Temperatures
 * https://leetcode.com/problems/daily-temperatures/
 *
 * Given temperatures array, return array where answer[i] is the number
 * of days you have to wait until a warmer temperature.
 *
 * PATTERN: Monotonic Stack (decreasing)
 *
 * KEY INSIGHT: Use stack to track indices of temperatures waiting for
 * a warmer day. When we find a warmer day, pop and calculate distance.
 */

// Brute Force - O(n^2)
function dailyTemperaturesBrute(temperatures: number[]): number[] {
  const result = new Array(temperatures.length).fill(0);

  for (let i = 0; i < temperatures.length; i++) {
    for (let j = i + 1; j < temperatures.length; j++) {
      if (temperatures[j] > temperatures[i]) {
        result[i] = j - i;
        break;
      }
    }
  }

  return result;
}

// Monotonic Stack - O(n) time, O(n) space
function dailyTemperatures(temperatures: number[]): number[] {
  const result = new Array(temperatures.length).fill(0);
  const stack: number[] = []; // Stack of indices (decreasing temperatures)

  for (let i = 0; i < temperatures.length; i++) {
    // While current temp is warmer than temps on stack, pop and calculate
    while (
      stack.length > 0 &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      const prevIndex = stack.pop()!;
      result[prevIndex] = i - prevIndex;
    }

    stack.push(i);
  }

  // Anything left in stack has no warmer day (result stays 0)
  return result;
}

// Tests
console.log("Daily Temperatures Tests:");
console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));
// [1, 1, 4, 2, 1, 1, 0, 0]

console.log(dailyTemperatures([30, 40, 50, 60])); // [1, 1, 1, 0]
console.log(dailyTemperatures([30, 60, 90])); // [1, 1, 0]

/**
 * WALKTHROUGH with [73, 74, 75, 71, 69, 72, 76, 73]:
 *
 * i=0, temp=73: stack=[], push 0, stack=[0]
 * i=1, temp=74: 74 > 73, pop 0, result[0]=1-0=1, push 1, stack=[1]
 * i=2, temp=75: 75 > 74, pop 1, result[1]=2-1=1, push 2, stack=[2]
 * i=3, temp=71: 71 < 75, push 3, stack=[2,3]
 * i=4, temp=69: 69 < 71, push 4, stack=[2,3,4]
 * i=5, temp=72: 72 > 69, pop 4, result[4]=5-4=1
 *               72 > 71, pop 3, result[3]=5-3=2
 *               72 < 75, push 5, stack=[2,5]
 * i=6, temp=76: 76 > 72, pop 5, result[5]=6-5=1
 *               76 > 75, pop 2, result[2]=6-2=4
 *               push 6, stack=[6]
 * i=7, temp=73: 73 < 76, push 7, stack=[6,7]
 *
 * Stack is decreasing: [76, 73] at indices [6, 7]
 * No warmer day found for these, result stays 0.
 *
 * MONOTONIC STACK PATTERN:
 * - "Next Greater Element" problems -> Decreasing stack
 * - "Next Smaller Element" problems -> Increasing stack
 * - Stack maintains a monotonic property (all increasing or all decreasing)
 * - When an element breaks the pattern, we've found answers for popped elements
 *
 * WHY O(n)?
 * - Each element is pushed once and popped at most once
 * - Total operations = 2n = O(n)
 */

export { dailyTemperatures };
