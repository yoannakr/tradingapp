import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../app/hooks";
import { BOStarFilled } from "../../../../shared/components/antd/General/Icon/StarFilled/BOStarFilled";
import { FAVORITES } from "../../../../shared/utils/constants";
import {
  filterCurrencies,
  selectFavorites,
  selectShowOnlyFavorites,
  setFavorites,
  setCurrencyIsFavorite,
} from "../../currenciesPairsSlice";
import { FormattedCurrency } from "../../types";
import { getValueFromLocalStorage } from "../../utils/getValueFromLocalStorage";
import { setValueAtLocalStorage } from "../../utils/setValueAtLocalStorage";

interface Props {
  currency: FormattedCurrency;
  isFavorite: boolean;
}

export const Favorites = (props: Props) => {
  const dispatch = useAppDispatch();
  const { currency, isFavorite } = props;
  const textColor = isFavorite ? "#f1bd11" : "#838995";
  const favorites = useSelector(selectFavorites);
  const showOnlyFavorites = useSelector(selectShowOnlyFavorites);

  useEffect(() => {
    const favoritesInLocalStorage = getValueFromLocalStorage(FAVORITES, []);
    dispatch(setFavorites(favoritesInLocalStorage));

    // eslint-disable-next-line
  }, []);

  const handleFavoriteStateChange = () => {
    let newFavorites = [...favorites];

    if (newFavorites.includes(currency.ticker)) {
      newFavorites = newFavorites.filter(
        (favorite) => favorite.toLowerCase() !== currency.ticker.toLowerCase()
      );
    } else {
      newFavorites.push(currency.ticker);
    }

    dispatch(
      setCurrencyIsFavorite({
        ticker: currency.ticker,
        isFavorite: !currency.isFavorite,
      })
    );
    dispatch(setFavorites(newFavorites));
    dispatch(filterCurrencies(showOnlyFavorites));
    setValueAtLocalStorage(FAVORITES, newFavorites);
  };

  return (
    <BOStarFilled
      style={{ color: textColor }}
      onClick={handleFavoriteStateChange}
    />
  );
};
