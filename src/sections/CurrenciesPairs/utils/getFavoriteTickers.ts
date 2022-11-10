import { CryptoCurrency } from "../types";

export const getFavoriteTickers = (currencies: CryptoCurrency[]): string[] => {
  const favoriteTickers: string[] = currencies.reduce(
    (previousFavoriteTickers: string[], currency: CryptoCurrency) => {
      if (currency.isFavorite) {
        return [...previousFavoriteTickers, currency.ticker];
      }
      return previousFavoriteTickers;
    },
    []
  );

  return favoriteTickers;
};
