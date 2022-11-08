import { ColumnsType } from "antd/lib/table";
import { BitcoinAvailability } from "../types";

export const tableColumns: ColumnsType<BitcoinAvailability> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Available count",
    dataIndex: "availableCount",
    key: "availableCount",
    render: (availableCount: number) => availableCount,
  },
];
