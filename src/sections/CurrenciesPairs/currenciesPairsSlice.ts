import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../shared/store/store";
import { CryptoCurrency } from "./types";
import { mapObjectToCurrencies } from "./utils/mapObjectToCurrencies";

export interface CurrenciesPairsState {
  currencies: CryptoCurrency[];
  filteredCurrencies: CryptoCurrency[];
  ticker: string;
  favorites: string[];
  showOnlyFavorites: boolean;
}

const initialState: CurrenciesPairsState = {
  currencies: [],
  filteredCurrencies: [],
  ticker: "",
  favorites: [],
  showOnlyFavorites: false,
};

export const currenciesPairsSlice = createSlice({
  name: "currenciesPairs",
  initialState,
  reducers: {
    setTickerCurrency(state, action) {
      state.ticker = action.payload;
    },
    setFavorites(state, action) {
      state.favorites = action.payload;
    },
    setCurrencyIsFavorite(state, action) {
      const { ticker, isFavorite } = action.payload;
      const currency = state.currencies.find(
        (currency) => currency.ticker === ticker
      );

      if (currency) {
        currency.isFavorite = isFavorite;
      }
    },
    setShowOnlyFavorites(state, action) {
      state.showOnlyFavorites = action.payload;
    },
    filterCurrencies(state, action) {
      state.filteredCurrencies = action.payload
        ? state.currencies.filter((mappedCurrency) => mappedCurrency.isFavorite)
        : state.currencies;
    },
    resetState: () => initialState,
  },
  extraReducers: {
    NOTIFY_PRICE_CHANGES: (state, action) => {
      const mappedCurrencies: CryptoCurrency[] = mapObjectToCurrencies(
        action.payload,
        state.favorites
      );

      state.currencies = mappedCurrencies;
      state.filteredCurrencies = state.showOnlyFavorites
        ? mappedCurrencies.filter((mappedCurrency) => mappedCurrency.isFavorite)
        : mappedCurrencies;
    },
  },
});

export const {
  setTickerCurrency,
  setFavorites,
  setCurrencyIsFavorite,
  setShowOnlyFavorites,
  filterCurrencies,
  resetState,
} = currenciesPairsSlice.actions;

export const selectFilteredCurrencies = (state: RootState) =>
  state.rootReducer.currenciesPairs.filteredCurrencies;

export const selectCryptoCurrency = (state: RootState) =>
  state.rootReducer.currenciesPairs.currencies.find(
    (cryptoCurrency) =>
      cryptoCurrency.ticker.toLowerCase() ===
      state.rootReducer.currenciesPairs.ticker.toLowerCase()
  );

export const selectTicker = (state: RootState) =>
  state.rootReducer.currenciesPairs.ticker;

export const selectFavorites = (state: RootState) =>
  state.rootReducer.currenciesPairs.favorites;

export const selectShowOnlyFavorites = (state: RootState) =>
  state.rootReducer.currenciesPairs.showOnlyFavorites;

export default currenciesPairsSlice.reducer;
