export interface HistoryRecord {
  date: moment.Moment;
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
