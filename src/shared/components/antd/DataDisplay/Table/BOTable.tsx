import { AntdTableProps, Table } from "./styled";

interface Props {}

type BOTableProps = AntdTableProps<any> & Props;

export const BOTable = (props: BOTableProps) => {
  return <Table pagination={false} {...props} />;
};
