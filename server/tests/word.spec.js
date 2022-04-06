import { randomize } from "../src/utils/randomize.js";

/* 
Returns a word that match the required length
  Input: words: AA, AAA, AAAA. length: 3
  Output: AAA
*/

test("Should return word with required length", () => {
  const words = ["AA", "AAA", "AAAA"];
  const length = 3;
  const result = randomize(words, length);

  expect(result).toEqual("AAA");
});

/* 
If the unique-parameter is true, return word with unique letters
  Input: words: AA, AC, BB. unique: true
  Output: AC
*/

test("Should return word with unique letters", () => {
  const words = ["AA", "AC", "BB"];
  const unique = true;
  const result = randomize(words, 2, unique);

  expect(result).toEqual("AC");
});

/* 
Returns a random word from the list that meets the criteria
  Input: words: AA, AAB, AABC, ABCD, DCBA. length: 4. unique: true
  Output: ABCD or DCBA
*/

test("Should return random word from the list that meets the criteria", () => {
  const words = ["AA", "AAB", "AABC", "ABCD", "DCBA"];
  const length = 4;
  const unique = true;
  const result = randomize(words, length, unique);

  expect(result === "ABCD" || result === "DCBA").toBeTruthy();
});

/* 
If no word meets the criterias return a string "No word available"
  Input: words: AAAB, AABC, ABBC. length: 4. unique: true
  Output: "No words available with those criterias"
*/

test("No word meets the criteras", () => {
  const words = ["AAAB", "AABC", "ABBC"];
  const length = 4;
  const unique = true;
  const result = randomize(words, length, unique);

  expect(result).toEqual(null);
});
