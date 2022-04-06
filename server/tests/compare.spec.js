import { compare } from "../src/utils/compare.js";

/* 
If a letter is included and on the right index, it should give result: Correct. If a letter is not included at all, it should give result: Incorrect
  Input: Guess: AXA, Answer: AAA
  Output: 
    A: correct
    X: incorrect
    A: correct
*/

test("Should return correct when letter is included and on right index, else if not included return incorrect", () => {
  const guess = "AXA";
  const answer = "AAA";
  const result = compare(guess, answer);

  expect(result[0].result).toEqual("correct");
  expect(result[1].result).toEqual("incorrect");
  expect(result[2].result).toEqual("correct");
});

/* 
If a letter is included but on wrong index, it should give result: Misplaced
  Input: Guess: AXA, Answer: AAX
  Output:
    A: correct
    X: misplaced
    A: misplaced
*/

test("Should return misplaced when letter is included but on wrong index", () => {
  const guess = "AXA";
  const answer = "AAX";
  const result = compare(guess, answer);

  expect(result[0].result).toEqual("correct");
  expect(result[1].result).toEqual("misplaced");
  expect(result[2].result).toEqual("misplaced");
});

/* 
The guess includes same letter twice on wrong index, but the correct answer only includes the letter once.
Should give the result: Misplaced on the first one and Incorrect on the second one. 
  Input: Guess: AXAX, Answer: AAXA
  Output:
    A: correct
    X: misplaced
    A: misplaced
    X: incorrect
*/

test("Should return misplaced only once, if the guess includes same letter twice but answer only once and incorrect on second letter", () => {
  const guess = "AXAX";
  const answer = "AAXA";
  const result = compare(guess, answer);

  expect(result[0].result).toEqual("correct");
  expect(result[1].result).toEqual("misplaced");
  expect(result[2].result).toEqual("misplaced");
  expect(result[3].result).toEqual("incorrect");
});

/* 
The guess includes same letter twice, the first one on correct index. The correct answer only includes the letter once.
Should give the result: Correct and Incorrect
  Input: Guess: AXAX, Answer: AXAA
  Output:
    A: correct
    X: correct
    A: correct
    X: incorrect
*/

test("Guess includes same letter twice first one on correct index, correct answer includes the letter only once", () => {
  const guess = "AXAX";
  const answer = "AXAA";
  const result = compare(guess, answer);

  expect(result[0].result).toEqual("correct");
  expect(result[1].result).toEqual("correct");
  expect(result[2].result).toEqual("correct");
  expect(result[3].result).toEqual("incorrect");
});

test("Richard test", () => {
  const guess = "HALLÅ";
  const answer = "CYKLA";
  const result = compare(guess, answer);

  expect(result[0].result).toEqual("incorrect");
  expect(result[1].result).toEqual("misplaced");
  expect(result[2].result).toEqual("incorrect");
  expect(result[3].result).toEqual("correct");
  expect(result[4].result).toEqual("incorrect");
});
