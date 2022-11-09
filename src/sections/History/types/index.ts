export interface HistoryRecord {
  date: string;
  ticker: string;
  name: string;
  price: number;
  count: number;
  type: RecordType;
}

export enum RecordType {
  BUY = "Buy",
  SELL = "Sell",
}
