import { getBitcoinPriceForCurrency } from "./../../../shared/utils/getBitcoinPriceForCurrency";
import { FormattedCurrency } from "../types/index";
import { Currency } from "../types";

export const formatCurrencies = (
  currencies: Currency[],
  userCurrency: string
): FormattedCurrency[] =>
  currencies.map((currency) => {
    const price = getBitcoinPriceForCurrency(currency, userCurrency);

    return {
      name: currency.name,
      userCurrency: userCurrency.toUpperCase(),
      ticker: currency.ticker,
      price: price.toFixed(2),
      isDown: currency.isDown,
    };
  });
