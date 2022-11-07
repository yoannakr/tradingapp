import {
  InputNumber,
  AntdInputNumberProps,
  InputNumberWrapper,
  LabelWrapper,
} from "./styled";

interface Props {
  label?: string;
}

type BOInputNumberProps = AntdInputNumberProps & Props;

export const BOInputNumber = (props: BOInputNumberProps) => {
  return (
    <InputNumberWrapper>
      {props.label && (
        <LabelWrapper>
          <label>{props.label}</label>
        </LabelWrapper>
      )}
      <InputNumber
        style={{ background: "white" }}
        bordered={false}
        {...props}
      />
    </InputNumberWrapper>
  );
};
