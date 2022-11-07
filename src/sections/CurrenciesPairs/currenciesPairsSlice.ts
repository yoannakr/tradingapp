import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../shared/store/store";
import { Currency as CryptoCurrency } from "./types";
import { mapObjectToCurrencies } from "./utils/mapObjectToCurrencies";

export interface CurrenciesPairsState {
  currencies: CryptoCurrency[];
  cryptoCurrency: CryptoCurrency;
  ticker: string;
}

const initialState: CurrenciesPairsState = {
  currencies: [],
  cryptoCurrency: {
    name: "",
    prices: [],
    sentiment: 0,
    ticker: "",
    isDown: false,
  },
  ticker: "",
};

export const currenciesPairsSlice = createSlice({
  name: "currenciesPairs",
  initialState,
  reducers: {
    chooseCurrency(state, action) {
      const currency = state.currencies.find(
        (currency) =>
          currency.ticker.toLowerCase() === action.payload.ticker.toLowerCase()
      );

      state.ticker = action.payload.ticker.toLowerCase();
      if (currency) {
        state.cryptoCurrency = currency;
      }
    },
    resetState: () => initialState,
  },
  extraReducers: {
    NOTIFY_PRICE_CHANGES: (state, action) => {
      const mappedCurrencies: CryptoCurrency[] = mapObjectToCurrencies(
        action.payload
      );

      const currency = mappedCurrencies.find(
        (currency) =>
          currency.ticker.toLowerCase() === state.ticker.toLowerCase()
      );

      state.currencies = mappedCurrencies;
      if (currency) {
        state.cryptoCurrency = currency;
      }
    },
  },
});

export const { chooseCurrency, resetState } = currenciesPairsSlice.actions;

export const selectCurrencies = (state: RootState) =>
  state.rootReducer.currenciesPairs.currencies;

export const selectCryptoCurrency = (state: RootState) =>
  state.rootReducer.currenciesPairs.cryptoCurrency;

export default currenciesPairsSlice.reducer;
