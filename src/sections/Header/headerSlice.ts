import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../shared/store/store";
import { generateUserBalances } from "../../shared/utils/generateBalances";
import { AmountWithCurrency } from "../../shared/types/AmountWithCurrency";
import { mapObjectToBalanceWithCurrencies } from "../../shared/utils/mapObjectToBalanceWithCurrencies";

export interface HeaderState {
  hasFetched: boolean;
  loading: boolean;
  currency: string;
  balanceWithCurrencies: AmountWithCurrency[];
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
      const balanceWithCurrencies = action.payload as AmountWithCurrency[];
      state.balanceWithCurrencies = balanceWithCurrencies;

      if (balanceWithCurrencies.length !== 0) {
        state.currency = balanceWithCurrencies[0].currency;
        state.balance = balanceWithCurrencies[0].amount;
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
        )?.amount ?? 0;

      state.currency = action.payload;
      state.balance = balance;
    },
    updateBalance(state, action) {
      state.balance = action.payload;
    },
    resetState: () => initialState,
  },
});

export const {
  fetchBalanceForEachCurrencyInit,
  fetchBalanceForEachCurrencySuccess,
  fetchBalanceForEachCurrencyFailure,
  changeSelectedCurrency,
  updateBalance,
  resetState,
} = headerSlice.actions;

export const fetchBalanceForEachCurrency = () => async (dispatch: any) => {
  dispatch(fetchBalanceForEachCurrencyInit());
  try {
    const response = (await generateUserBalances()) as {
      data: [value: number];
    };

    const mappedBalanceWithCurrencies: AmountWithCurrency[] =
      mapObjectToBalanceWithCurrencies(response.data);

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
