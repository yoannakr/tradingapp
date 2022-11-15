import { useAppSelector } from "../../app/hooks";
import { BOTable } from "../../shared/components/antd";
import { selectRecords } from "./historySlice";
import { tableColumns } from "./utils/tableColumns";

export const History = () => {
  const records = useAppSelector(selectRecords);

  return (
    <div style={{ backgroundColor: "#16191e" }}>
      <BOTable
        rowKey={"date"}
        columns={tableColumns}
        dataSource={records}
        showHeader={true}
        scroll={{ y: 800, x: "max-content" }}
        style={{ height: "100vh" }}
      />
    </div>
  );
};
