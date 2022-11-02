import { FIAT, ALL_CURRENCIES } from "./constants";

export const generatedCurrencies = () => {
  const response = ALL_CURRENCIES.map((currency) => {
    const basePrice = Math.random() * 1000;

    const prices: any = {};

    Object.keys(FIAT).forEach((currencyCode: string) => {
      prices[currencyCode] =
        basePrice / FIAT[currencyCode as keyof typeof FIAT];
    });

    return {
      ...currency,
      price: prices,
      sentiment: Math.random() * (0.6 - 0.4) + 0.4,
    };
  });

  return response.reduce((hashmap: any, currency: any) => {
    hashmap[currency.ticker] = currency;

    return hashmap;
  }, {});
};
