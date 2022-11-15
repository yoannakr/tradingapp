import React from "react";
import { render, screen } from "@testing-library/react";
import { BuyCurrency } from "../sections/BuyCurrency/BuyCurrency";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { testUseAppSelector } from "../shared/store/testAppSelector";
import * as utils from "../sections/BuyCurrency/utils/calculateCryptoCurrencyCount";

jest.mock("../app/hooks");
beforeEach(() => {
  const mockDispatch = jest.fn();
  const mockUseAppDispatch = useAppDispatch as jest.MockedFunction<
    typeof useAppDispatch
  >;

  mockUseAppDispatch.mockReturnValue(mockDispatch);
});

afterEach(() => {
  jest.clearAllMocks();
});

test("display user balance with currency", () => {
  const mockUseAppSelector = useAppSelector as jest.MockedFunction<
    typeof useAppSelector
  >;

  const state = {
    rootReducer: {
      header: {
        loading: false,
        currency: "BGN",
        balanceWithCurrencies: [],
        balance: 20,
      },
      currenciesPairs: {
        currencies: [],
        ticker: "",
        favorites: [],
        showOnlyFavorites: false,
      },
    },
  };

  mockUseAppSelector.mockImplementation((selector) =>
    testUseAppSelector(selector, state)
  );

  render(<BuyCurrency />);

  const balance = screen.getByTestId("balance");
  expect(balance.textContent).toBe("20.00 BGN");
});

test("display crypto currency count", () => {
  const mockUseAppSelector = useAppSelector as jest.MockedFunction<
    typeof useAppSelector
  >;
  mockUseAppSelector.mockImplementation((selector) =>
    testUseAppSelector(selector)
  );
  const mockCount = 10.143;

  jest.spyOn(utils, "calculateCryptoCurrencyCount").mockReturnValue(mockCount);

  render(<BuyCurrency />);

  const cryptoCurrencyCount = screen.getByTestId("crypto-currency-count");
  expect(cryptoCurrencyCount).toHaveValue(`${mockCount}`);
});
