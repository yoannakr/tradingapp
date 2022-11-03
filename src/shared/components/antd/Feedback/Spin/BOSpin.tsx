import { Spin, SpinProps } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export const BOSpin = (props: SpinProps) => (
  <Spin indicator={<LoadingOutlined />} {...props} />
);
