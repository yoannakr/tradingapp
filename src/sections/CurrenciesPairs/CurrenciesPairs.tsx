import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { BOTable } from "../../shared/components/antd/DataDisplay/Table/BOTable";
import { PriceSimulator } from "../../shared/utils/PriceSimulator";
import { selectCurrency } from "../Header/headerSlice";
import {
  resetState,
  selectCurrencies,
  selectFavorites,
  selectTicker,
  setTickerCurrency,
} from "./currenciesPairsSlice";
import { CurrenciesPairsWrapper } from "./styled";
import { FormattedCurrency } from "./types";
import { formatCurrencies } from "./utils/formatCurrencies";
import { tableColumns } from "./utils/tableColumns";

export const CurrenciesPairs = () => {
  const dispatch = useAppDispatch();
  const selectedCurrency = useSelector(selectCurrency);
  const currencies = useSelector(selectCurrencies);
  const selectedTicker = useSelector(selectTicker);
  const favorites = useSelector(selectFavorites);

  const currenciesToDisplay = useMemo<FormattedCurrency[]>(
    () => formatCurrencies(favorites, currencies, selectedCurrency),
    [favorites, currencies, selectedCurrency]
  );

  useEffect(() => {
    PriceSimulator.subscribe();

    return () => {
      PriceSimulator.stop();
      dispatch(resetState());
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!selectedTicker && currencies.length !== 0) {
      dispatch(setTickerCurrency(currencies[0].ticker));
    }
    // eslint-disable-next-line
  }, [currencies, selectedTicker]);

  const handleRowClick = (row: FormattedCurrency) => {
    dispatch(setTickerCurrency(row.ticker));
  };

  return (
    <CurrenciesPairsWrapper>
      <div style={{ color: "white", marginLeft: "1em", marginTop: "1em" }}>
        Pairs
      </div>
      <BOTable
        rowSelection={{
          type: "radio",
          hideSelectAll: true,
          selectedRowKeys: [selectedTicker],
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
        scroll={{ y: 677, x: "max-content" }}
      />
    </CurrenciesPairsWrapper>
  );
};
