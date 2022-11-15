import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { BORadioGroup } from "../../../../shared/components/antd";
import { changeSelectedCurrency, selectCurrency } from "../../headerSlice";
import { useCurrenciesOptions } from "../../hooks/currencies/useCurrenciesOptions";

export const CurrencySwitcher = () => {
  const dispatch = useAppDispatch();
  const selectedCurrency = useAppSelector(selectCurrency);

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
      optionType="button"
      buttonStyle="solid"
    />
  );
};
