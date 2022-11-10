import { ColumnsType } from "antd/lib/table";
import { HistoryRecord, RecordType } from "../types";

export const tableColumns: ColumnsType<HistoryRecord> = [
  {
    title: "",
    dataIndex: "type",
    key: "type",
    filters: [
      { text: "Buy", value: RecordType.BUY },
      { text: "Sell", value: RecordType.SELL },
    ],
    onFilter: (value: any, record: HistoryRecord) => record.type === value,
    render: (date: string) => "",
  },
  // {
  //   title: "Date",
  //   dataIndex: "date",
  //   key: "date",
  // },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (_, row: HistoryRecord) => {
      const textColor = row.type === RecordType.SELL ? "red" : "green";
      return (
        <div style={{ textAlign: "center" }}>
          <span style={{ color: textColor }}>{`${row.price.toFixed(2)}`}</span>
        </div>
      );
    },
  },
  {
    title: "Count",
    dataIndex: "count",
    key: "count",
    render: (count: number) => count.toFixed(8),
  },
];
