import { useSelector } from "react-redux";
import { BOTable } from "../../shared/components/antd";
import { tableColumns } from "./utils/tableColumns";
import { selectBitcoinsAvailability } from "./walletSlice";

export const Wallet = () => {
  const bitcoinsAvailability = useSelector(selectBitcoinsAvailability);

  return (
    <BOTable
      rowKey={"ticker"}
      columns={tableColumns}
      dataSource={bitcoinsAvailability}
      style={{ width: "100%" }}
    />
  );
};
