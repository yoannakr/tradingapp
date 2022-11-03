import { combineReducers } from "@reduxjs/toolkit";
import headerReducer from "../../sections/Header/headerSlice";

export const rootReducer = combineReducers({
  header: headerReducer,
});
