import { BalanceWithCurrency } from "./types/index";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../shared/store/store";
import { generateUserBalances } from "../../shared/utils/generateBalances";

export interface HeaderState {
  hasFetched: boolean;
  loading: boolean;
  currency: string;
  balanceWithCurrencies: BalanceWithCurrency[];
  balance: number;
}

const initialState: HeaderState = {
  hasFetched: false,
  loading: false,
  currency: "",
  balanceWithCurrencies: [],
  balance: 0,
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    fetchBalanceForEachCurrencyInit(state) {
      state.loading = true;
    },
    fetchBalanceForEachCurrencySuccess(state, action) {
      const balanceWithCurrencies = action.payload as BalanceWithCurrency[];
      state.balanceWithCurrencies = balanceWithCurrencies;

      if (balanceWithCurrencies.length !== 0) {
        state.currency = balanceWithCurrencies[0].currency;
        state.balance = balanceWithCurrencies[0].balance;
      }

      state.loading = false;
      state.hasFetched = true;
    },
    fetchBalanceForEachCurrencyFailure(state, action) {
      state.loading = false;
    },
    changeSelectedCurrency(state, action) {
      const balance =
        state.balanceWithCurrencies.find(
          (balanceWithCurrency) =>
            balanceWithCurrency.currency === action.payload
        )?.balance ?? 0;

      state.currency = action.payload;
      state.balance = balance;
    },

    resetState: () => initialState,
  },
});

export const {
  fetchBalanceForEachCurrencyInit,
  fetchBalanceForEachCurrencySuccess,
  fetchBalanceForEachCurrencyFailure,
  changeSelectedCurrency,
  resetState,
} = headerSlice.actions;

export const fetchBalanceForEachCurrency = () => async (dispatch: any) => {
  dispatch(fetchBalanceForEachCurrencyInit());
  try {
    const response = (await generateUserBalances()) as {
      data: [value: number];
    };

    const mappedBalanceWithCurrencies: BalanceWithCurrency[] = [];
    Object.entries(response.data).forEach(([key, value]) => {
      mappedBalanceWithCurrencies.push({
        currency: key.toUpperCase(),
        balance: value,
      });
    });

    dispatch(fetchBalanceForEachCurrencySuccess(mappedBalanceWithCurrencies));
  } catch (error) {
    dispatch(
      fetchBalanceForEachCurrencyFailure(
        "Failed to fetch balance for each currency."
      )
    );
  }
};

export const selectLoading = (state: RootState) =>
  state.rootReducer.header.loading;

export const selectCurrency = (state: RootState) =>
  state.rootReducer.header.currency;

export const selectBalance = (state: RootState) =>
  state.rootReducer.header.balance;

export default headerSlice.reducer;
