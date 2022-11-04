import { FormattedCurrency } from "../types/index";
import { Currency } from "../types";

export const formatCurrencies = (
  currencies: Currency[],
  userCurrency: string
): FormattedCurrency[] =>
  currencies.map((currency) => {
    const price =
      currency.prices.find(
        (price) => price.currency.toLowerCase() === userCurrency.toLowerCase()
      )?.amount ?? 0;

    return {
      name: currency.name,
      ticker: currency.ticker,
      price: `${price.toFixed(2)} ${userCurrency.toUpperCase()}`,
      isDown: currency.isDown,
    };
  });