/**
 * LeetCode 20: Valid Parentheses
 * https://leetcode.com/problems/valid-parentheses/
 *
 * Given a string s containing just '()', '{}', '[]',
 * determine if the input string is valid.
 *
 * PATTERN: Stack for matching pairs
 *
 * KEY INSIGHT: When you see an opening bracket, push it.
 * When you see a closing bracket, the top of the stack must match.
 */

function isValid(s: string): boolean {
  const stack: string[] = [];
  const pairs: Record<string, string> = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  for (const char of s) {
    if (char in pairs) {
      // Closing bracket: check if it matches the top
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    } else {
      // Opening bracket: push to stack
      stack.push(char);
    }
  }

  // Valid only if all brackets were matched
  return stack.length === 0;
}

// Tests
console.log("Valid Parentheses Tests:");
console.log(isValid("()")); // true
console.log(isValid("()[]{}")); // true
console.log(isValid("(]")); // false
console.log(isValid("([)]")); // false
console.log(isValid("{[]}")); // true

/**
 * WALKTHROUGH with "{[]}":
 *
 * char='{': opening, push, stack=['{']
 * char='[': opening, push, stack=['{', '[']
 * char=']': closing, pop='[', pairs[']']='[', match! stack=['{']
 * char='}': closing, pop='{', pairs['}']='{', match! stack=[]
 * stack is empty -> valid!
 *
 * WALKTHROUGH with "([)]":
 *
 * char='(': push, stack=['(']
 * char='[': push, stack=['(', '[']
 * char=')': pop='[', pairs[')']='(', NO MATCH! return false
 *
 * WHY STACK WORKS:
 * - Last In, First Out matches nested structure
 * - Most recent opening bracket must be closed first
 * - Stack naturally tracks the "current" nesting level
 */

export { isValid };
