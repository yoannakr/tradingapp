import { RadioChangeEvent } from "antd";
import "antd/dist/antd.css";
import { AntdRadioGroupProps, RadioGroup } from "./styled";

export interface BORadioGroupProps
  extends Omit<AntdRadioGroupProps, "onChange"> {
  onChange?: (value: string, name?: string) => void;
}

export const BORadioGroup = (props: BORadioGroupProps) => {
  const onChange = (e: RadioChangeEvent) => {
    props.onChange && props.onChange(e.target.value, props.name);
  };

  return <RadioGroup {...props} onChange={onChange} />;
};
