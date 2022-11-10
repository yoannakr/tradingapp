import { ColumnsType } from "antd/lib/table";
import { Favorite } from "../features/Favorite/Favorite";
import { FormattedCurrency } from "../types";

export const tableColumns: ColumnsType<FormattedCurrency> = [
  {
    title: "Favorites",
    dataIndex: "favorites",
    key: "favorites",
    render: (_, row: FormattedCurrency) => <Favorite currency={row} />,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (_, row: FormattedCurrency) => (
      <>
        <span style={{ color: "#c1c6cc" }}>{`${row.name}`}</span>
        <span style={{ color: "#6d717a" }}>{`/${row.userCurrency}`}</span>
      </>
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (_, row: FormattedCurrency) => {
      const textColor = row.isDown ? "red" : "green";
      return (
        <div style={{ textAlign: "center" }}>
          <span style={{ color: textColor }}>{`${row.price}`}</span>
        </div>
      );
    },
  },
];
