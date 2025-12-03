/**
 * LeetCode 155: Min Stack
 * https://leetcode.com/problems/min-stack/
 *
 * Design a stack that supports push, pop, top, and retrieving
 * the minimum element in constant time.
 *
 * PATTERN: Auxiliary data structure to track additional info
 *
 * KEY INSIGHT: Store the minimum alongside each element, or use
 * a separate stack that tracks the running minimum.
 */

// Approach 1: Store min with each element
class MinStack {
  private stack: Array<{ val: number; min: number }> = [];

  push(val: number): void {
    const currentMin =
      this.stack.length === 0
        ? val
        : Math.min(val, this.stack[this.stack.length - 1].min);

    this.stack.push({ val, min: currentMin });
  }

  pop(): void {
    this.stack.pop();
  }

  top(): number {
    return this.stack[this.stack.length - 1].val;
  }

  getMin(): number {
    return this.stack[this.stack.length - 1].min;
  }
}

// Approach 2: Two separate stacks (cleaner separation)
class MinStackTwoStacks {
  private stack: number[] = [];
  private minStack: number[] = [];

  push(val: number): void {
    this.stack.push(val);

    // Only push to minStack if it's a new minimum (or equal)
    if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
      this.minStack.push(val);
    }
  }

  pop(): void {
    const val = this.stack.pop();
    // If we're popping the current min, pop from minStack too
    if (val === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }
  }

  top(): number {
    return this.stack[this.stack.length - 1];
  }

  getMin(): number {
    return this.minStack[this.minStack.length - 1];
  }
}

// Tests
console.log("Min Stack Tests:");
const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin()); // -3
minStack.pop();
console.log(minStack.top()); // 0
console.log(minStack.getMin()); // -2

/**
 * WALKTHROUGH:
 *
 * push(-2): stack=[{val:-2, min:-2}]
 * push(0):  stack=[{val:-2, min:-2}, {val:0, min:-2}]
 * push(-3): stack=[..., {val:-3, min:-3}]
 * getMin(): return top.min = -3
 * pop():    stack=[{val:-2, min:-2}, {val:0, min:-2}]
 * top():    return top.val = 0
 * getMin(): return top.min = -2 (automatically correct!)
 *
 * WHY THIS WORKS:
 * - Each element "remembers" what the minimum was when it was pushed
 * - When we pop, the new top already has the correct minimum stored
 * - This is O(1) for all operations
 *
 * DESIGN PATTERN: When you need O(1) access to some aggregate (min, max, sum),
 * store it with each element or in a parallel structure.
 */

export { MinStack };
