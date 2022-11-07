import { Input, InputProps } from "antd";
import { InputWrapper } from "./styled";

interface Props {
  label?: string;
  style?: React.CSSProperties;
  onChange?: (value: string) => void;
}

type BOInputProps = InputProps & Props;

export const BOInput = (props: BOInputProps) => {
  const onChange = (e: any) => {
    props.onChange && props.onChange(e.target.value);
  };

  return (
    <InputWrapper>
      {props.label && <label>{props.label}</label>}
      <Input {...props} onChange={onChange} />
    </InputWrapper>
  );
};
