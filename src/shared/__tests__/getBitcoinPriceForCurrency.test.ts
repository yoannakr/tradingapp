import { getBitcoinPriceForCurrency } from "../utils/getBitcoinPriceForCurrency";
const bitcoin = {
  name: "Ethereum",
  prices: [
    {
      currency: "BGN",
      amount: 0,
    },
  ],
  sentiment: 0,
  ticker: "ETH",
  isDown: true,
  isFavorite: true,
};

const currency = "BGN";

test("should be zero when bitcoin is undefined(false)", () => {
  const balance = getBitcoinPriceForCurrency(undefined, currency);
  expect(balance).toBe(0);
});

test("should be zero when currency is empty(false)", () => {
  bitcoin.prices[0].amount = 256.89;

  const balance = getBitcoinPriceForCurrency(bitcoin, "");
  expect(balance).toBe(0);
});

test.each([
  [1, 1],
  [156.48, 156.48],
])(
  "getBitcoinPriceForCurrency %p expecting %p",
  (price: number, result: number) => {
    bitcoin.prices[0].amount = price;

    const balance = getBitcoinPriceForCurrency(bitcoin, currency);
    expect(balance).toBe(result);
  }
);
