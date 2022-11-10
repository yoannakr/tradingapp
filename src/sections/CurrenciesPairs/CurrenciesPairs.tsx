import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { BOTable } from "../../shared/components/antd/DataDisplay/Table/BOTable";
import { BOStarFilled } from "../../shared/components/antd/General/Icon/StarFilled/BOStarFilled";
import { SHOW_ONLY_FAVORITES } from "../../shared/utils/constants";
import { PriceSimulator } from "../../shared/utils/PriceSimulator";
import { selectCurrency } from "../Header/headerSlice";
import {
  filterCurrencies,
  resetState,
  selectFavorites,
  selectFilteredCurrencies,
  selectShowOnlyFavorites,
  selectTicker,
  setShowOnlyFavorites,
  setTickerCurrency,
} from "./currenciesPairsSlice";
import { CurrenciesPairsWrapper } from "./styled";
import { FormattedCurrency } from "./types";
import { formatCurrencies } from "./utils/formatCurrencies";
import { getValueFromLocalStorage } from "./utils/getValueFromLocalStorage";
import { setValueAtLocalStorage } from "./utils/setValueAtLocalStorage";
import { tableColumns } from "./utils/tableColumns";

export const CurrenciesPairs = () => {
  const dispatch = useAppDispatch();
  const selectedCurrency = useSelector(selectCurrency);
  const filteredCurrencies = useSelector(selectFilteredCurrencies);
  const selectedTicker = useSelector(selectTicker);
  const favorites = useSelector(selectFavorites);
  const showOnlyFavorites = useSelector(selectShowOnlyFavorites);

  const currenciesToDisplay = useMemo<FormattedCurrency[]>(
    () => formatCurrencies(favorites, filteredCurrencies, selectedCurrency),
    [favorites, filteredCurrencies, selectedCurrency]
  );

  useEffect(() => {
    PriceSimulator.subscribe();
    const showOnlyFavoritesInLocalStorage = getValueFromLocalStorage(
      SHOW_ONLY_FAVORITES,
      false
    );
    dispatch(setShowOnlyFavorites(showOnlyFavoritesInLocalStorage));

    return () => {
      PriceSimulator.stop();
      dispatch(resetState());
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!selectedTicker && filteredCurrencies.length !== 0) {
      dispatch(setTickerCurrency(filteredCurrencies[0].ticker));
    }
    // eslint-disable-next-line
  }, [filteredCurrencies, selectedTicker]);

  const handleRowClick = (row: FormattedCurrency) => {
    dispatch(setTickerCurrency(row.ticker));
  };

  const handleShowOnlyFavorites = () => {
    const newShowOnlyFavorites = !showOnlyFavorites;

    dispatch(setShowOnlyFavorites(newShowOnlyFavorites));
    dispatch(filterCurrencies(newShowOnlyFavorites));
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
        scroll={{ y: 677, x: "max-content" }}
        style={{ height: "651px" }}
      />
    </CurrenciesPairsWrapper>
  );
};
