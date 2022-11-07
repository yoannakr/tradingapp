import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../shared/store/store";
import { BitcoinAvailability } from "./types";

export interface WalletState {
  bitcoinsAvailability: BitcoinAvailability[];
}

const initialState: WalletState = {
  bitcoinsAvailability: [],
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    incrementBitcoinAvailability(
      state,
      action: PayloadAction<BitcoinAvailability>
    ) {
      const { ticker, name, availableCount } = action.payload;
      const bitcoinAvailability = state.bitcoinsAvailability.find(
        (bitcoinAvailability) =>
          bitcoinAvailability.ticker.toLowerCase() === ticker.toLowerCase()
      );

      if (bitcoinAvailability) {
        bitcoinAvailability.availableCount += availableCount;
      } else {
        state.bitcoinsAvailability.push({
          ticker,
          name,
          availableCount,
        });
      }
    },
    decrementBitcoinAvailability(
      state,
      action: PayloadAction<BitcoinAvailability>
    ) {
      const { ticker, availableCount } = action.payload;
      const bitcoinAvailability = state.bitcoinsAvailability.find(
        (bitcoinAvailability) =>
          bitcoinAvailability.ticker.toLowerCase() === ticker.toLowerCase()
      );

      if (bitcoinAvailability) {
        bitcoinAvailability.availableCount -= availableCount;

        // remove bitcoin from wallet if count is zero
        if (bitcoinAvailability.availableCount <= 0) {
          state.bitcoinsAvailability = state.bitcoinsAvailability.filter(
            (storeBitcoinAvailability) =>
              storeBitcoinAvailability.ticker.toLowerCase() !==
              bitcoinAvailability.ticker.toLowerCase()
          );
        }
      }
    },
    resetState: () => initialState,
  },
});

export const {
  incrementBitcoinAvailability,
  decrementBitcoinAvailability,
  resetState,
} = walletSlice.actions;

export const selectBitcoinsAvailability = (state: RootState) =>
  state.rootReducer.wallet.bitcoinsAvailability;

export default walletSlice.reducer;
