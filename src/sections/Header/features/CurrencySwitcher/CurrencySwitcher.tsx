import { useDispatch, useSelector } from "react-redux";
import { BORadioGroup } from "../../../../shared/components/antd";
import { changeSelectedCurrency, selectCurrency } from "../../headerSlice";
import { useCurrenciesOptions } from "../../hooks/currencies/useCurrenciesOptions";

export const CurrencySwitcher = () => {
  const dispatch = useDispatch();
  const selectedCurrency = useSelector(selectCurrency);

  const { currenciesOptions, error } = useCurrenciesOptions();
  const handleCurrencyChange = (value: string) =>
    dispatch(changeSelectedCurrency(value));

  if (error) {
    return <span>{error}</span>;
  }

  return (
    <BORadioGroup
      options={currenciesOptions}
      value={selectedCurrency}
      onChange={handleCurrencyChange}
      buttonStyle="solid"
      optionType="button"
    />
  );
};
