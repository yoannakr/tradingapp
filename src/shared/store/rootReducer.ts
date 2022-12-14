import { combineReducers } from "@reduxjs/toolkit";
import currenciesPairsReducer from "../../sections/CurrenciesPairs/currenciesPairsSlice";
import headerReducer from "../../sections/Header/headerSlice";
import historyReducer from "../../sections/History/historySlice";
import walletReducer from "../../sections/Wallet/walletSlice";

export const rootReducer = combineReducers({
  header: headerReducer,
  currenciesPairs: currenciesPairsReducer,
  wallet: walletReducer,
  history: historyReducer,
});
