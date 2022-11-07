import { ColumnsType } from "antd/lib/table";
import { FormattedCurrency } from "../types";

export const tableColumns: ColumnsType<FormattedCurrency> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
];
