import { mapObjectToBalanceWithCurrencies } from "../../../shared/utils/mapObjectToBalanceWithCurrencies";
import { CryptoCurrency } from "../types";

export const mapObjectToCurrencies = (object: Object): CryptoCurrency[] => {
  const mappedCurrencies: CryptoCurrency[] = [];

  Object.entries(object).forEach(([_, value]) => {
    mappedCurrencies.push({
      name: value.name,
      prices: mapObjectToBalanceWithCurrencies(value.price),
      sentiment: value.sentiment,
      ticker: value.ticker,
      isDown: value.isDown,
    });
  });

  return mappedCurrencies;
};
