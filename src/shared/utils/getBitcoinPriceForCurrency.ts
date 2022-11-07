import { Currency } from "../../sections/CurrenciesPairs/types";

export const getBitcoinPriceForCurrency = (
  bitcoin: Currency,
  currency: string
) => {
  const price =
    bitcoin?.prices.find(
      (price) => price.currency.toLowerCase() === currency.toLowerCase()
    )?.amount ?? 0;

  return price;
};
