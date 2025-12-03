/**
 * LeetCode 3: Longest Substring Without Repeating Characters
 * https://leetcode.com/problems/longest-substring-without-repeating-characters/
 *
 * Given a string s, find the length of the longest substring
 * without repeating characters.
 *
 * PATTERN: Sliding Window with Set/Map for tracking
 *
 * KEY INSIGHT: Expand window right, shrink from left when we see a duplicate.
 * The window always contains unique characters.
 */

// Sliding Window with Set - O(n) time, O(min(n, alphabet)) space
function lengthOfLongestSubstring(s: string): number {
  const seen = new Set<string>();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    // Shrink window until current char is not in window
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }

    // Add current character to window
    seen.add(s[right]);

    // Update max length
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

// Optimized with Map - O(n) time, can jump left pointer directly
function lengthOfLongestSubstringOptimized(s: string): number {
  const charIndex = new Map<string, number>(); // char -> last seen index
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    // If we've seen this char and it's within our window, jump left past it
    if (charIndex.has(s[right]) && charIndex.get(s[right])! >= left) {
      left = charIndex.get(s[right])! + 1;
    }

    charIndex.set(s[right], right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

// Tests
console.log("Longest Substring Without Repeating Tests:");
console.log(lengthOfLongestSubstring("abcabcbb")); // 3 ("abc")
console.log(lengthOfLongestSubstring("bbbbb")); // 1 ("b")
console.log(lengthOfLongestSubstring("pwwkew")); // 3 ("wke")
console.log(lengthOfLongestSubstring("")); // 0

/**
 * WALKTHROUGH with "abcabcbb":
 *
 * right=0 'a': seen={a}, window="a", len=1
 * right=1 'b': seen={a,b}, window="ab", len=2
 * right=2 'c': seen={a,b,c}, window="abc", len=3
 * right=3 'a': 'a' in seen! shrink: remove 'a', left=1, seen={b,c}
 *              add 'a', seen={b,c,a}, window="bca", len=3
 * right=4 'b': 'b' in seen! shrink: remove 'b', left=2, seen={c,a}
 *              add 'b', seen={c,a,b}, window="cab", len=3
 * right=5 'c': 'c' in seen! shrink: remove 'c', left=3, seen={a,b}
 *              add 'c', seen={a,b,c}, window="abc", len=3
 * right=6 'b': 'b' in seen! shrink: remove 'a', left=4, seen={b,c}
 *              'b' still in seen! remove 'b', left=5, seen={c}
 *              add 'b', seen={c,b}, window="cb", len=2
 * right=7 'b': 'b' in seen! shrink: remove 'c', left=6, seen={b}
 *              'b' still in seen! remove 'b', left=7, seen={}
 *              add 'b', seen={b}, window="b", len=1
 *
 * SLIDING WINDOW TEMPLATE:
 *
 * function slidingWindow(s) {
 *   let left = 0;
 *   let result = 0;
 *   let window = new Set/Map();
 *
 *   for (let right = 0; right < s.length; right++) {
 *     // 1. Add s[right] to window
 *
 *     // 2. While window is invalid, shrink from left
 *     while (windowIsInvalid) {
 *       // remove s[left] from window
 *       left++;
 *     }
 *
 *     // 3. Update result
 *     result = Math.max(result, right - left + 1);
 *   }
 *
 *   return result;
 * }
 *
 * WHEN TO USE SLIDING WINDOW:
 * - Contiguous subarray/substring problems
 * - "Longest/shortest with constraint"
 * - Problems involving a "window" of elements
 */

export { lengthOfLongestSubstring };
