import styled from "styled-components";
import {
  InputNumber as AntdInputNumber,
  InputNumberProps as AntdInputNumberProps,
} from "antd";

export type { AntdInputNumberProps };

export const InputNumber = styled(AntdInputNumber)<AntdInputNumberProps>`
  .ant-input-number-handler-wrap {
    display: none;
  }
  .ant-input-number-input {
    color: white;
    text-align: end;
  }
  .ant-input-number-group-addon {
    background-color: transparent;
    border: none;
    color: white;
  }
`;

export const InputNumberWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #2a2d36;
  border-radius: 4px;
  width: 100%;
  height: 40px;
  margin-bottom: 1em;
  padding: 1em;
  &:hover {
    border: 1px solid rgb(240, 185, 11);
  }
`;

export const LabelWrapper = styled.label`
  color: #7f838c;
`;
