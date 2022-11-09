import styled from "styled-components";
import { Button as AntdButton, ButtonProps as AntdButtonProps } from "antd";

export type { AntdButtonProps };

export const Button = styled(AntdButton)<AntdButtonProps>`
  background-color: #2a3139;
  border: none;
  color: rgb(240, 185, 11);
  &:hover,
  &:focus {
    background-color: #2a3139;
    color: rgb(240, 185, 11);
  }
  &[disabled],
  &[disabled]:hover {
    background-color: rgb(71, 77, 87) !important;
    color: rgb(94, 102, 115) !important;
  }
`;
