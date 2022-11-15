import { useAppSelector } from "../../app/hooks";
import { getBitcoinPriceForCurrency } from "../../shared/utils/getBitcoinPriceForCurrency";
import { selectCryptoCurrency } from "../CurrenciesPairs/currenciesPairsSlice";
import { selectCurrency } from "../Header/headerSlice";
import { PriceWrapper } from "./styled";

export const Price = () => {
  const selectedCryptoCurrency = useAppSelector(selectCryptoCurrency);
  const selectedCurrency = useAppSelector(selectCurrency);

  const price = getBitcoinPriceForCurrency(
    selectedCryptoCurrency,
    selectedCurrency
  );

  return (
    <PriceWrapper>
      <div style={{ fontSize: "2em" }}>{price.toFixed(2)}</div>
      <div style={{ fontSize: "0.5em" }}>{selectedCryptoCurrency?.name}</div>
    </PriceWrapper>
  );
};
