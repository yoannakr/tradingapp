export const isCurrencyFavorite = (
  favorites: string[],
  ticker: string
): boolean => {
  let isFavorite = false;

  if (favorites.length !== 0) {
    isFavorite = favorites.some(
      (favorite) => favorite.toLowerCase() === ticker.toLowerCase()
    );
  }

  return isFavorite;
};
