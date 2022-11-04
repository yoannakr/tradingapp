import { mapObjectToBalanceWithCurrencies } from "../../../shared/utils/mapObjectToBalanceWithCurrencies";
import { Currency } from "../types";

export const mapObjectToCurrencies = (object: Object): Currency[] => {
  const mappedCurrencies: Currency[] = [];
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
