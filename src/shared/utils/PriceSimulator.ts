import { createAction } from "@reduxjs/toolkit";
import { store } from "../store/configureStore";
import { generatedCurrencies } from "./generatePairs";

// custom actions
export const notifyPriceChange = createAction<any>("NOTIFY_PRICE_CHANGES");

class _PriceSimulator {
  private PRICE_FACTOR = 1;
  private INTERVAL = 1500;

  intervalId: any = null;

  currentState: any = {};

  constructor() {
    this.currentState = generatedCurrencies();
    store.dispatch(notifyPriceChange(this.currentState));
  }

  private updatePrices() {
    const nextState = Object.keys(this.currentState).reduce(
      (hashmap: any, currentTicker: any) => {
        const nextCurrency: any = {
          ...this.currentState[currentTicker],
          price: { ...this.currentState[currentTicker].price },
        };

        const factor = (Math.random() * this.PRICE_FACTOR) / 100;
        const isDown = Math.random() > nextCurrency.sentiment;

        Object.keys(nextCurrency.price).forEach((currentCurrency: any) => {
          const currentPrice = nextCurrency.price[currentCurrency];
          const change = currentPrice * factor;

          const nextPrice = isDown
            ? currentPrice - change
            : currentPrice + change;

          nextCurrency.price[currentCurrency] = nextPrice;
        });

        hashmap[currentTicker] = {
          ...nextCurrency,
          isDown,
        };

        return hashmap;
      },
      {}
    );

    this.currentState = nextState;

    store.dispatch(notifyPriceChange(nextState));
  }

  public subscribe() {
    this.intervalId = setInterval(() => {
      this.updatePrices();
    }, this.INTERVAL);
  }

  public stop() {
    clearInterval(this.intervalId);
  }
}

export const PriceSimulator = new _PriceSimulator();
