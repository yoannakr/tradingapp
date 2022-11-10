import { CryptoCurrency } from "../types";
import { FormattedCurrency } from "../types/index";
import { getBitcoinPriceForCurrency } from "./../../../shared/utils/getBitcoinPriceForCurrency";

export const formatCurrencies = (
  favorites: string[],
  currencies: CryptoCurrency[],
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
      isFavorite: currency.isFavorite,
    };
  });
