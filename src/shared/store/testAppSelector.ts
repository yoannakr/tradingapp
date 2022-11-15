const state = {
  rootReducer: {
    header: {
      loading: false,
      currency: "",
      balanceWithCurrencies: [],
      balance: 0,
    },
    currenciesPairs: {
      currencies: [],
      ticker: "",
      favorites: [],
      showOnlyFavorites: false,
    },
  },
};

export const testUseAppSelector = (f: any, stateInput?: unknown) =>
  f(stateInput || state);
