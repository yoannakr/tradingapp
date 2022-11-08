import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../shared/store/store";
import { HistoryRecord } from "./types";

export interface HistoryState {
  records: HistoryRecord[];
}

const initialState: HistoryState = {
  records: [],
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addRecord(state, action: PayloadAction<HistoryRecord>) {
      state.records.push(action.payload);
    },
    resetState: () => initialState,
  },
});

export const { addRecord, resetState } = historySlice.actions;

export const selectRecords = (state: RootState) =>
  state.rootReducer.history.records;

export default historySlice.reducer;
