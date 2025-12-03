/**
 * LeetCode 1143: Longest Common Subsequence
 * https://leetcode.com/problems/longest-common-subsequence/
 *
 * Given two strings, return the length of their longest common subsequence.
 * A subsequence is derived by deleting some (or no) characters without
 * changing the relative order of remaining characters.
 *
 * PATTERN: 2D Dynamic Programming
 *
 * KEY INSIGHT: Compare characters. If match, LCS includes it.
 * If no match, take max of excluding each character.
 */

// Bottom-up 2D DP - O(m*n) time, O(m*n) space
function longestCommonSubsequence(text1: string, text2: string): number {
  const m = text1.length;
  const n = text2.length;

  // dp[i][j] = LCS of text1[0..i-1] and text2[0..j-1]
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0)
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        // Characters match: extend LCS by 1
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        // No match: take max of excluding one character from either string
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}

// Space optimized - O(m*n) time, O(min(m,n)) space
function longestCommonSubsequenceOptimized(text1: string, text2: string): number {
  // Make text2 the shorter one for space optimization
  if (text1.length < text2.length) {
    [text1, text2] = [text2, text1];
  }

  const n = text2.length;
  let prev = new Array(n + 1).fill(0);
  let curr = new Array(n + 1).fill(0);

  for (let i = 1; i <= text1.length; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        curr[j] = prev[j - 1] + 1;
      } else {
        curr[j] = Math.max(prev[j], curr[j - 1]);
      }
    }
    [prev, curr] = [curr, prev];
  }

  return prev[n];
}

// Top-down with memoization
function longestCommonSubsequenceMemo(text1: string, text2: string): number {
  const memo = new Map<string, number>();

  function dp(i: number, j: number): number {
    if (i === 0 || j === 0) return 0;

    const key = `${i},${j}`;
    if (memo.has(key)) return memo.get(key)!;

    let result: number;
    if (text1[i - 1] === text2[j - 1]) {
      result = dp(i - 1, j - 1) + 1;
    } else {
      result = Math.max(dp(i - 1, j), dp(i, j - 1));
    }

    memo.set(key, result);
    return result;
  }

  return dp(text1.length, text2.length);
}

// Tests
console.log("Longest Common Subsequence Tests:");
console.log(longestCommonSubsequence("abcde", "ace")); // 3 ("ace")
console.log(longestCommonSubsequence("abc", "abc")); // 3 ("abc")
console.log(longestCommonSubsequence("abc", "def")); // 0 (no common)

/**
 * WALKTHROUGH with text1="abcde", text2="ace":
 *
 * Build dp table (row = text1, col = text2):
 *
 *       ""  a  c  e
 *   ""   0  0  0  0
 *   a    0  1  1  1
 *   b    0  1  1  1
 *   c    0  1  2  2
 *   d    0  1  2  2
 *   e    0  1  2  3
 *
 * At (1,1): 'a'=='a', dp[1][1] = dp[0][0]+1 = 1
 * At (2,1): 'b'!='a', dp[2][1] = max(dp[1][1], dp[2][0]) = 1
 * At (3,2): 'c'=='c', dp[3][2] = dp[2][1]+1 = 2
 * At (5,3): 'e'=='e', dp[5][3] = dp[4][2]+1 = 3
 *
 * RECURRENCE:
 *
 * If text1[i-1] == text2[j-1]:
 *   dp[i][j] = dp[i-1][j-1] + 1  (extend LCS)
 * Else:
 *   dp[i][j] = max(dp[i-1][j], dp[i][j-1])  (skip one char)
 *
 * 2D DP PATTERNS:
 *
 * 1. String comparison (LCS, Edit Distance):
 *    - dp[i][j] compares prefixes text1[0..i], text2[0..j]
 *
 * 2. Grid path problems:
 *    - dp[i][j] = best way to reach cell (i,j)
 *
 * 3. Two sequences:
 *    - Process both sequences together
 *
 * RELATED PROBLEMS:
 * - Edit Distance: min operations to transform one string to another
 * - Longest Palindromic Subsequence: LCS of string and its reverse
 */

export { longestCommonSubsequence };
