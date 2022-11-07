import { combineReducers } from "@reduxjs/toolkit";
import currenciesPairsReducer from "../../sections/CurrenciesPairs/currenciesPairsSlice";
import headerReducer from "../../sections/Header/headerSlice";
import walletReducer from "../../sections/Wallet/walletSlice";

export const rootReducer = combineReducers({
  header: headerReducer,
  currenciesPairs: currenciesPairsReducer,
  wallet: walletReducer,
});
