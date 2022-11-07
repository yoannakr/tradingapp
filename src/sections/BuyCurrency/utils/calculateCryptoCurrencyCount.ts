export const calculateCryptoCurrencyCount = (
  price: number,
  amount: number
): number => {
  if (price <= 0) {
    return 0;
  }
  return amount / price;
};
