import { useAppDispatch } from "../../../../app/hooks";
import { BOStarFilled } from "../../../../shared/components/antd/General/Icon/StarFilled/BOStarFilled";
import { updateCurrencyFavorite } from "../../currenciesPairsSlice";
import { FormattedCurrency } from "../../types";

interface Props {
  currency: FormattedCurrency;
}

export const Favorite = (props: Props) => {
  const dispatch = useAppDispatch();
  const { currency } = props;
  const textColor = currency.isFavorite ? "#f1bd11" : "#838995";

  const handleFavoriteStateChange = () => {
    dispatch(
      updateCurrencyFavorite({
        ticker: currency.ticker,
      })
    );
  };

  return (
    <BOStarFilled
      style={{ color: textColor }}
      onClick={handleFavoriteStateChange}
    />
  );
};
