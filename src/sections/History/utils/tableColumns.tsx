import { ColumnsType } from "antd/lib/table";
import { HistoryRecord, RecordType } from "../types";

export const tableColumns: ColumnsType<HistoryRecord> = [
  // {
  //   title: "Date",
  //   dataIndex: "date",
  //   key: "date",
  //   render: (date: moment.Moment) => date.format("DD/MM/yyyy HH:mm"),
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
