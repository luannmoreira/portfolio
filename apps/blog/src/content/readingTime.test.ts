import { estimateReadingTime } from "./readingTime";

test("rounds up to the nearest minute", () => {
  const text = Array(250).fill("word").join(" "); // 250 words

  expect(estimateReadingTime(text)).toBe("2 min read");
});

test("never reports less than 1 minute", () => {
  expect(estimateReadingTime("a few words")).toBe("1 min read");
});

test("ignores extra whitespace between words", () => {
  const text = Array(400).fill("word").join("   \n  "); // 400 words

  expect(estimateReadingTime(text)).toBe("2 min read");
});
