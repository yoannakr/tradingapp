import { useAppSelector } from "../../app/hooks";
import { BOTable } from "../../shared/components/antd";
import { WalletWrapper } from "./styled";
import { tableColumns } from "./utils/tableColumns";
import { selectBitcoinsAvailability } from "./walletSlice";

export const Wallet = () => {
  const bitcoinsAvailability = useAppSelector(selectBitcoinsAvailability);

  return (
    <WalletWrapper>
      <div
        style={{
          color: "white",
          marginLeft: "1em",
          marginTop: "1em",
          marginBottom: "1em",
        }}
      >
        Wallet
      </div>
      <BOTable
        rowKey={"ticker"}
        columns={tableColumns}
        dataSource={bitcoinsAvailability}
        showHeader={false}
        scroll={{ y: 180, x: "max-content" }}
        style={{ marginBottom: "1em" }}
      />
    </WalletWrapper>
  );
};
