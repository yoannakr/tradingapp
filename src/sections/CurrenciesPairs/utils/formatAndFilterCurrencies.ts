import { CryptoCurrency } from "../types";
import { FormattedCurrency } from "../types/index";
import { getBitcoinPriceForCurrency } from "../../../shared/utils/getBitcoinPriceForCurrency";

export const formatAndFilterCurrencies = (
  showOnlyFavorites: boolean,
  currencies: CryptoCurrency[],
  userCurrency: string
): FormattedCurrency[] => {
  const currenciesForFormat = showOnlyFavorites
    ? currencies.filter((currency) => currency.isFavorite)
    : currencies;

  const formattedCurrencies = currenciesForFormat.map((currency) => {
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

  return formattedCurrencies;
};
