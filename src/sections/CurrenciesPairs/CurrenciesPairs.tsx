import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { BOTable } from "../../shared/components/antd/DataDisplay/Table/BOTable";
import { BOStarFilled } from "../../shared/components/antd/General/Icon/StarFilled/BOStarFilled";
import { FAVORITES, SHOW_ONLY_FAVORITES } from "../../shared/utils/constants";
import { PriceSimulator } from "../../shared/utils/PriceSimulator";
import { selectCurrency } from "../Header/headerSlice";
import {
  resetState,
  selectCurrencies,
  selectShowOnlyFavorites,
  selectTicker,
  setFavorites,
  setShowOnlyFavorites,
  setTickerCurrency,
} from "./currenciesPairsSlice";
import { CurrenciesPairsWrapper } from "./styled";
import { FormattedCurrency } from "./types";
import { formatAndFilterCurrencies } from "./utils/formatAndFilterCurrencies";
import { getValueFromLocalStorage } from "./utils/getValueFromLocalStorage";
import { setValueAtLocalStorage } from "./utils/setValueAtLocalStorage";
import { tableColumns } from "./utils/tableColumns";

export const CurrenciesPairs = () => {
  const dispatch = useAppDispatch();
  const selectedCurrency = useAppSelector(selectCurrency);
  const currencies = useAppSelector(selectCurrencies);
  const selectedTicker = useAppSelector(selectTicker);
  const showOnlyFavorites = useAppSelector(selectShowOnlyFavorites);

  const currenciesToDisplay = useMemo<FormattedCurrency[]>(
    () =>
      formatAndFilterCurrencies(
        showOnlyFavorites,
        currencies,
        selectedCurrency
      ),
    [showOnlyFavorites, currencies, selectedCurrency]
  );

  useEffect(() => {
    PriceSimulator.subscribe();
    const showOnlyFavoritesInLocalStorage = getValueFromLocalStorage(
      SHOW_ONLY_FAVORITES,
      false
    );
    dispatch(setShowOnlyFavorites(showOnlyFavoritesInLocalStorage));

    const favoritesInLocalStorage = getValueFromLocalStorage(FAVORITES, []);
    dispatch(setFavorites(favoritesInLocalStorage));

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

  const handleShowOnlyFavorites = () => {
    const newShowOnlyFavorites = !showOnlyFavorites;

    dispatch(setShowOnlyFavorites(newShowOnlyFavorites));
    setValueAtLocalStorage(SHOW_ONLY_FAVORITES, newShowOnlyFavorites);
  };

  return (
    <CurrenciesPairsWrapper>
      <div style={{ color: "white", marginLeft: "1em", marginTop: "1em" }}>
        <BOStarFilled
          style={{
            color: showOnlyFavorites ? "#f1bd11" : "#838995",
            marginRight: "1em",
          }}
          onClick={handleShowOnlyFavorites}
        />
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
        scroll={{ y: 600, x: "max-content" }}
      />
    </CurrenciesPairsWrapper>
  );
};
