import { useSelector } from "react-redux";
import { selectCryptoCurrency } from "../CurrenciesPairs/currenciesPairsSlice";
import { selectCurrency } from "../Header/headerSlice";
import { PriceWrapper } from "./styled";

export const Price = () => {
  const selectedCryptoCurrency = useSelector(selectCryptoCurrency);
  const selectedCurrency = useSelector(selectCurrency);

  const price =
    selectedCryptoCurrency?.prices.find(
      (price) => price.currency.toLowerCase() === selectedCurrency.toLowerCase()
    )?.amount ?? 0;
  return <PriceWrapper>{price.toFixed(2)}</PriceWrapper>;
};
