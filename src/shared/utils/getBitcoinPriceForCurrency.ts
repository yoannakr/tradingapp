import { CryptoCurrency } from "../../sections/CurrenciesPairs/types";

export const getBitcoinPriceForCurrency = (
  bitcoin: CryptoCurrency | undefined,
  currency: string
) => {
  if (!bitcoin || !currency) {
    return 0;
  }

  const price =
    bitcoin?.prices.find(
      (price) => price.currency.toLowerCase() === currency.toLowerCase()
    )?.amount ?? 0;

  return price;
};
