import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../shared/store/store";
import { CryptoCurrency } from "./types";
import { mapObjectToCurrencies } from "./utils/mapObjectToCurrencies";

export interface CurrenciesPairsState {
  currencies: CryptoCurrency[];
  ticker: string;
}

const initialState: CurrenciesPairsState = {
  currencies: [],
  ticker: "",
};

export const currenciesPairsSlice = createSlice({
  name: "currenciesPairs",
  initialState,
  reducers: {
    setTickerCurrency(state, action) {
      state.ticker = action.payload;
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

export const { setTickerCurrency, resetState } = currenciesPairsSlice.actions;

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

export default currenciesPairsSlice.reducer;
