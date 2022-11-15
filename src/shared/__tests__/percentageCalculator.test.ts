import { percentageCalculator } from "../utils/percentageCalculator";

test("should be zero when value is zero", () => {
  const result = percentageCalculator(0, 20);
  expect(result).toBe(0);
});

test.each([
  [[1, 1], 0.01],
  [[10.89, 16], 1.7424],
])(
  "percentageCalculator %p expecting %p",
  (numbers: number[], expectedResult: number) => {
    const [value, percentage] = numbers;
    const result = percentageCalculator(value, percentage);
    expect(result.toFixed(4)).toBe(expectedResult.toFixed(4));
  }
);
