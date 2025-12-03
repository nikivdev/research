/**
 * LeetCode 49: Group Anagrams
 * https://leetcode.com/problems/group-anagrams/
 *
 * Given an array of strings, group the anagrams together.
 *
 * PATTERN: Use sorted string or character count as hash key
 *
 * KEY INSIGHT: Anagrams have the same characters, just rearranged.
 * If we sort them, they become identical!
 */

// Approach 1: Sort each string as key - O(n * k log k) where k = max string length
function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>();

  for (const str of strs) {
    // Sort the string to create a unique key for anagrams
    const key = str.split("").sort().join("");

    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key)!.push(str);
  }

  return Array.from(map.values());
}

// Approach 2: Character count as key - O(n * k) slightly better
// Uses the fact that we only have lowercase letters (26 chars)
function groupAnagramsCount(strs: string[]): string[][] {
  const map = new Map<string, string[]>();

  for (const str of strs) {
    // Count characters
    const count = new Array(26).fill(0);
    for (const char of str) {
      count[char.charCodeAt(0) - "a".charCodeAt(0)]++;
    }

    // Create key from counts: "1#0#0#..." represents character frequencies
    const key = count.join("#");

    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key)!.push(str);
  }

  return Array.from(map.values());
}

// Tests
console.log("Group Anagrams Tests:");
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// [["eat","tea","ate"], ["tan","nat"], ["bat"]]

console.log(groupAnagrams([""])); // [[""]]
console.log(groupAnagrams(["a"])); // [["a"]]

/**
 * WALKTHROUGH with ["eat", "tea", "tan", "ate", "nat", "bat"]:
 *
 * "eat" -> sorted "aet" -> map = {"aet": ["eat"]}
 * "tea" -> sorted "aet" -> map = {"aet": ["eat", "tea"]}
 * "tan" -> sorted "ant" -> map = {"aet": ["eat", "tea"], "ant": ["tan"]}
 * "ate" -> sorted "aet" -> map = {"aet": ["eat", "tea", "ate"], "ant": ["tan"]}
 * "nat" -> sorted "ant" -> map = {..., "ant": ["tan", "nat"]}
 * "bat" -> sorted "abt" -> map = {..., "abt": ["bat"]}
 *
 * INTERVIEW TIPS:
 * 1. The sorting approach is easier to explain and implement
 * 2. Mention the character count approach as an optimization
 * 3. Ask: "Are inputs lowercase only?" - affects which approach is better
 * 4. Time complexity: Sorting is O(n * k log k), counting is O(n * k)
 *
 * PATTERN RECOGNITION:
 * "Group things by some property" -> Use Map with computed key
 */

export { groupAnagrams, groupAnagramsCount };
