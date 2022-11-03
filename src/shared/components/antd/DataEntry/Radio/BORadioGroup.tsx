import { Radio, RadioGroupProps, RadioChangeEvent } from "antd";
import "antd/dist/antd.css";

export interface BORadioGroupProps extends Omit<RadioGroupProps, "onChange"> {
  onChange?: (value: string, name?: string) => void;
}

export const BORadioGroup = (props: BORadioGroupProps) => {
  const onChange = (e: RadioChangeEvent) => {
    props.onChange && props.onChange(e.target.value, props.name);
  };

  return <Radio.Group {...props} onChange={onChange} />;
};
