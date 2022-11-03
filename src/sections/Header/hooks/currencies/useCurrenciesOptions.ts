import { useEffect, useState } from "react";
import { FIAT } from "../../../../shared/utils/constants";

export interface CurrencyOption {
  label: string;
  value: string;
}

export const useCurrenciesOptions = () => {
  const [currenciesOptions, setCurrenciesOptions] = useState<CurrencyOption[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchCurrenciesOptions = async () => {
      setLoading(true);
      try {
        const mappedOptions: CurrencyOption[] = [];
        Object.keys(FIAT).forEach((currencyCode: string) => {
          mappedOptions.push({
            label: currencyCode,
            value: currencyCode.toUpperCase(),
          });
        });

        setCurrenciesOptions(mappedOptions);
      } catch (_) {
        setError("Error fetching currencies");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrenciesOptions();
  }, []);

  return { currenciesOptions, loading, error };
};
