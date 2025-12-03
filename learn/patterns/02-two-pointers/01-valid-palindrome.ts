/**
 * LeetCode 125: Valid Palindrome
 * https://leetcode.com/problems/valid-palindrome/
 *
 * A phrase is a palindrome if, after converting all uppercase letters
 * to lowercase and removing all non-alphanumeric characters,
 * it reads the same forward and backward.
 *
 * PATTERN: Two Pointers from both ends moving inward
 *
 * KEY INSIGHT: Compare characters from outside moving in.
 * If left and right ever differ, it's not a palindrome.
 */

// Helper: check if character is alphanumeric
function isAlphaNumeric(char: string): boolean {
  const code = char.charCodeAt(0);
  return (
    (code >= 48 && code <= 57) || // 0-9
    (code >= 65 && code <= 90) || // A-Z
    (code >= 97 && code <= 122) // a-z
  );
}

// Two Pointers approach - O(n) time, O(1) space
function isPalindrome(s: string): boolean {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Skip non-alphanumeric from left
    while (left < right && !isAlphaNumeric(s[left])) {
      left++;
    }
    // Skip non-alphanumeric from right
    while (left < right && !isAlphaNumeric(s[right])) {
      right--;
    }

    // Compare characters (case-insensitive)
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

// Alternative: Clean string first (easier to write, uses O(n) space)
function isPalindromeClean(s: string): boolean {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === cleaned.split("").reverse().join("");
}

// Tests
console.log("Valid Palindrome Tests:");
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false
console.log(isPalindrome(" ")); // true (empty after cleaning)

/**
 * WALKTHROUGH with "A man, a plan, a canal: Panama":
 *
 * After cleaning: "amanaplanacanalpanama"
 *
 * Two pointers approach (on original string):
 * left=0 ('A'), right=29 ('a') -> 'a' == 'a' ✓
 * left=1 (' '), skip to left=2 ('m')
 * right=28 ('m') -> 'm' == 'm' ✓
 * ... continues until left >= right
 *
 * TWO POINTERS PATTERN:
 * 1. Initialize pointers at opposite ends (or same end)
 * 2. Move them toward each other (or same direction)
 * 3. Process elements as they meet/pass
 *
 * WHEN TO USE TWO POINTERS:
 * - Searching pairs in sorted array
 * - Palindrome problems
 * - Removing duplicates in-place
 * - Partitioning arrays
 */

export { isPalindrome };
