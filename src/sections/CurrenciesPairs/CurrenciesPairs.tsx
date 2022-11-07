import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { BOTable } from "../../shared/components/antd/DataDisplay/Table/BOTable";
import { PriceSimulator } from "../../shared/utils/PriceSimulator";
import { selectCurrency } from "../Header/headerSlice";
import {
  chooseCurrency,
  resetState,
  selectCryptoCurrency,
  selectCurrencies,
} from "./currenciesPairsSlice";
import { FormattedCurrency } from "./types";
import { formatCurrencies } from "./utils/formatCurrencies";
import { tableColumns } from "./utils/tableColumns";

export const CurrenciesPairs = () => {
  const dispatch = useAppDispatch();
  const selectedCurrency = useSelector(selectCurrency);
  const selectedCryptoCurrency = useSelector(selectCryptoCurrency);
  const currencies = useSelector(selectCurrencies);

  const currenciesToDisplay = useMemo<FormattedCurrency[]>(
    () => formatCurrencies(currencies, selectedCurrency),
    [currencies, selectedCurrency]
  );

  useEffect(() => {
    PriceSimulator.subscribe();

    return () => {
      PriceSimulator.stop();
      dispatch(resetState());
    };
    // eslint-disable-next-line
  }, []);

  const handleRowClick = (row: FormattedCurrency) => {
    dispatch(chooseCurrency(row));
  };

  return (
    <BOTable
      rowSelection={{
        type: "radio",
        hideSelectAll: true,
        selectedRowKeys: [selectedCryptoCurrency.ticker],
      }}
      rowKey={"ticker"}
      columns={tableColumns}
      dataSource={currenciesToDisplay}
      showHeader={false}
      onRow={(row: FormattedCurrency, _) => {
        return {
          onClick: (_) => {
            handleRowClick(row);
          },
        };
      }}
      style={{ width: "100%" }}
    />
  );
};
