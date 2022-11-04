import { TableProps, Table } from "antd";

interface Props {}

type BOTableProps = TableProps<any> & Props;

export const BOTable = (props: BOTableProps) => {
  return <Table pagination={false} {...props} />;
};
