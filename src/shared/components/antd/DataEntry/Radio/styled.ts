import styled from "styled-components";
import {
  Radio as AntdRadio,
  RadioGroupProps as AntdRadioGroupProps,
} from "antd";

export type { AntdRadioGroupProps };

export const RadioGroup = styled(AntdRadio.Group)<AntdRadioGroupProps>`
  .ant-radio-button-wrapper-checked {
    background-color: #2a2d36 !important;
    border-color: white !important;
  }
`;
