import { mapObjectToBalanceWithCurrencies } from "../../../shared/utils/mapObjectToBalanceWithCurrencies";
import { CryptoCurrency } from "../types";
import { isCurrencyFavorite } from "./isCurrencyFavorite";

export const mapObjectToCurrencies = (
  object: Object,
  favorites: string[]
): CryptoCurrency[] => {
  const mappedCurrencies: CryptoCurrency[] = [];

  Object.entries(object).forEach(([_, value]) => {
    mappedCurrencies.push({
      name: value.name,
      prices: mapObjectToBalanceWithCurrencies(value.price),
      sentiment: value.sentiment,
      ticker: value.ticker,
      isDown: value.isDown,
      isFavorite: isCurrencyFavorite(favorites, value.ticker),
    });
  });

  return mappedCurrencies;
};
