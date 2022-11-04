import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { BOTable } from "../../shared/components/antd/DataDisplay/Table/BOTable";
import { PriceSimulator } from "../../shared/utils/PriceSimulator";
import { selectCurrency } from "../Header/headerSlice";
import { resetState, selectCurrencies } from "./currenciesPairsSlice";
import { FormattedCurrency } from "./types";
import { formatCurrencies } from "./utils/formatCurrencies";
import { tableColumns } from "./utils/tableColumns";
import styles from "./CurrenciesPairs.module.scss";

export const CurrenciesPairs = () => {
  const dispatch = useAppDispatch();
  const selectedCurrency = useSelector(selectCurrency);
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

  const rowClasses = (row: any) => {
    let classes = "";
    if (row.isDown !== undefined) {
      classes += row.isDown ? `${styles.CurrencyDown}` : `${styles.CurrencyUp}`;
    }

    return classes;
  };

  const handleRowSelection = (_: {}, selectedRows: any) => {
    //console.log(selectedRows);
  };

  return (
    <BOTable
      rowSelection={{
        onChange: handleRowSelection,
        type: "radio",
        hideSelectAll: true,
      }}
      rowKey={"ticker"}
      rowClassName={rowClasses}
      columns={tableColumns}
      dataSource={currenciesToDisplay}
    />
  );
};