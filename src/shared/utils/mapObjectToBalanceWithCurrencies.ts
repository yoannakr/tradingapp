import { AmountWithCurrency } from "../types/AmountWithCurrency";

export const mapObjectToBalanceWithCurrencies = (
  object: Object
): AmountWithCurrency[] => {
  const mappedBalanceWithCurrencies: AmountWithCurrency[] = [];

  Object.entries(object).forEach(([key, value]) => {
    mappedBalanceWithCurrencies.push({
      currency: key.toUpperCase(),
      amount: value,
    });
  });

  return mappedBalanceWithCurrencies;
};
