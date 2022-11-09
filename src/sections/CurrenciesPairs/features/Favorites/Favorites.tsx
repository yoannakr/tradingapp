import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../app/hooks";
import { BOStarFilled } from "../../../../shared/components/antd/General/Icon/StarFilled/BOStarFilled";
import { FAVORITES } from "../../../../shared/utils/constants";
import { selectFavorites, setFavorites } from "../../currenciesPairsSlice";
import { getValueFromLocalStorage } from "../../utils/getValueFromLocalStorage";
import { setValueAtLocalStorage } from "../../utils/setValueAtLocalStorage";

interface Props {
  ticker: string;
  isFavorite: boolean;
}

export const Favorites = (props: Props) => {
  const dispatch = useAppDispatch();
  const { ticker, isFavorite } = props;
  const textColor = isFavorite ? "#f1bd11" : "#838995";
  const favorites = useSelector(selectFavorites);

  useEffect(() => {
    const favoritesInLocalStorage = getValueFromLocalStorage(FAVORITES, []);
    dispatch(setFavorites(favoritesInLocalStorage));

    // eslint-disable-next-line
  }, []);

  const handleFavoriteStateChange = () => {
    let newFavorites = [...favorites];

    if (newFavorites.includes(ticker)) {
      newFavorites = newFavorites.filter(
        (favorite) => favorite.toLowerCase() !== ticker.toLowerCase()
      );
    } else {
      newFavorites.push(ticker);
    }

    dispatch(setFavorites(newFavorites));
    setValueAtLocalStorage(FAVORITES, newFavorites);
  };

  return (
    <BOStarFilled
      style={{ color: textColor }}
      onClick={handleFavoriteStateChange}
    />
  );
};
