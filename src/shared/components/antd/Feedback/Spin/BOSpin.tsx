import { Spin, SpinProps } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface Props {
  style?: React.CSSProperties;
}

type BOSpinProps = SpinProps & Props;

export const BOSpin = (props: BOSpinProps) => (
  <Spin
    {...props}
    indicator={<LoadingOutlined />}
    style={{
      display: "flex",
      justifyContent: "center",
      padding: "1em",
      color: "#f1b70d",
      ...props.style,
    }}
  />
);
