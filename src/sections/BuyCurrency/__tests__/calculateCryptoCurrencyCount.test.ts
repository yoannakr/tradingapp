import { calculateCryptoCurrencyCount } from "./../utils/calculateCryptoCurrencyCount";

test("should be zero when price is zero", () => {
  const price = 0;
  const amount = 20;

  const balance = calculateCryptoCurrencyCount(price, amount);
  expect(balance).toBe(0);
});

test("should be zero when amount is zero", () => {
  const price = 20;
  const amount = 0;

  const balance = calculateCryptoCurrencyCount(price, amount);
  expect(balance).toBe(0);
});

test.each([
  [[1, 2], 2],
  [[229.01, 466.27], 2.036024627745513],
])(
  "calculateCryptoCurrencyCount %p expecting %p",
  (numbers: number[], result: number) => {
    const [price, amount] = numbers;
    const balance = calculateCryptoCurrencyCount(price, amount);
    expect(balance).toBe(result);
  }
);
