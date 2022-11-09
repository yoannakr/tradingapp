import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../shared/store/store";
import { CryptoCurrency } from "./types";
import { mapObjectToCurrencies } from "./utils/mapObjectToCurrencies";

export interface CurrenciesPairsState {
  currencies: CryptoCurrency[];
  ticker: string;
  favorites: string[];
}

const initialState: CurrenciesPairsState = {
  currencies: [],
  ticker: "",
  favorites: [],
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
    resetState: () => initialState,
  },
  extraReducers: {
    NOTIFY_PRICE_CHANGES: (state, action) => {
      const mappedCurrencies: CryptoCurrency[] = mapObjectToCurrencies(
        action.payload
      );

      state.currencies = mappedCurrencies;
    },
  },
});

export const { setTickerCurrency, setFavorites, resetState } =
  currenciesPairsSlice.actions;

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

export default currenciesPairsSlice.reducer;
