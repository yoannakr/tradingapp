import { AmountWithCurrency } from "../../../shared/types/AmountWithCurrency";

export interface Currency {
  name: string;
  prices: AmountWithCurrency[];
  sentiment: number;
  ticker: string;
  isDown: boolean;
}

export interface FormattedCurrency {
  name: string;
  userCurrency: string;
  ticker: string;
  price: string;
  isDown: boolean;
}
