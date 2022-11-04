import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../shared/store/store";
import { Currency } from "./types";
import { mapObjectToCurrencies } from "./utils/mapObjectToCurrencies";

export interface CurrenciesPairsState {
  currencies: Currency[];
}

const initialState: CurrenciesPairsState = {
  currencies: [],
};

export const currenciesPairsSlice = createSlice({
  name: "currenciesPairs",
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: {
    NOTIFY_PRICE_CHANGES: (state, action) => {
      const mappedCurrencies: Currency[] = mapObjectToCurrencies(
        action.payload
      );

      state.currencies = mappedCurrencies;
    },
  },
});

export const { resetState } = currenciesPairsSlice.actions;

export const selectCurrencies = (state: RootState) =>
  state.rootReducer.currenciesPairs.currencies;

export default currenciesPairsSlice.reducer;
