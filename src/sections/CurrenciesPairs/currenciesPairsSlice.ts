import { getFavoriteTickers } from "./utils/getFavoriteTickers";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../shared/store/store";
import { CryptoCurrency } from "./types";
import { mapObjectToCurrencies } from "./utils/mapObjectToCurrencies";
import { setValueAtLocalStorage } from "./utils/setValueAtLocalStorage";
import { FAVORITES } from "../../shared/utils/constants";

export interface CurrenciesPairsState {
  currencies: CryptoCurrency[];
  ticker: string;
  favorites: string[];
  showOnlyFavorites: boolean;
}

const initialState: CurrenciesPairsState = {
  currencies: [],
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
    updateCurrencyFavorite(state, action) {
      const currency = state.currencies.find(
        (currency) => currency.ticker === action.payload
      );

      if (currency) {
        currency.isFavorite = !currency.isFavorite;
        state.favorites = getFavoriteTickers(state.currencies);
        setValueAtLocalStorage(FAVORITES, state.favorites);
      }
    },
    setShowOnlyFavorites(state, action) {
      state.showOnlyFavorites = action.payload;
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
    },
  },
});

export const {
  setTickerCurrency,
  setFavorites,
  updateCurrencyFavorite,
  setShowOnlyFavorites,
  resetState,
} = currenciesPairsSlice.actions;

export const selectCurrencies = (state: RootState) =>
  state.rootReducer.currenciesPairs.currencies;

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
