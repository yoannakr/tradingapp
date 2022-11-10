import { AmountWithCurrency } from "../../../shared/types/AmountWithCurrency";

export interface CryptoCurrency {
  name: string;
  prices: AmountWithCurrency[];
  sentiment: number;
  ticker: string;
  isDown: boolean;
  isFavorite: boolean;
}

export interface FormattedCurrency {
  name: string;
  userCurrency: string;
  ticker: string;
  price: string;
  isDown: boolean;
  isFavorite: boolean;
}
