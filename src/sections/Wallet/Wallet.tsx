import { useSelector } from "react-redux";
import { BOTable } from "../../shared/components/antd";
import { tableColumns } from "./utils/tableColumns";
import { selectBitcoinsAvailability } from "./walletSlice";

export const Wallet = () => {
  const bitcoinsAvailability = useSelector(selectBitcoinsAvailability);

  // TODO: styled component
  return (
    <div
      style={{
        backgroundColor: "#16191e",
        width: "100%",
        border: "1px solid grey",
      }}
    >
      <div style={{ color: "white", marginLeft: "1em", marginTop: "1em" }}>
        Wallet
      </div>
      <BOTable
        rowKey={"ticker"}
        columns={tableColumns}
        dataSource={bitcoinsAvailability}
        showHeader={false}
      />
    </div>
  );
};
