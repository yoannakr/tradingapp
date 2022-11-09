import styled from "styled-components";
import {
  Slider as AntdSlider,
  SliderSingleProps as AntdSliderSingleProps,
} from "antd";

export type { AntdSliderSingleProps };

export const Slider = styled(AntdSlider)<AntdSliderSingleProps>`
  .ant-slider-mark-text {
    display: none;
  }
  .ant-slider-rail {
    background-color: #464d57;
  }
  .ant-slider-track {
    background-color: rgb(183, 189, 198);
  }
  .ant-slider&:hover .ant-slider-rail {
    background-color: #464d57;
  }
  .ant-slider&:hover .ant-slider-handle {
    border-color: rgb(245, 245, 245);
  }
  .ant-slider&:hover .ant-slider-track {
    background-color: rgb(183, 189, 198);
  }
  .ant-slider-dot,
  .ant-slider-handle {
    border-radius: 0%;
    transform: translateX(-50%) rotate(45deg) !important;
  }
  .ant-slider-dot-active {
    background-color: rgb(183, 189, 198);
    color: rgb(132, 142, 156);
    border-color: white;
    width: 8px;
    height: 8px;
  }
  .ant-slider-handle {
    background-color: rgb(43, 49, 57);
    border: 4px solid rgb(245, 245, 245);
    z-index: 20;
    width: 16px;
    height: 16px;
  }
  /* //TODO: rhombus
  .ant-slider-dot {
    box-sizing: content-box;
    position: absolute;
    transform: translateX(-50%) rotate(45deg) !important;
    color: rgb(132, 142, 156);
    width: 6px;
    height: 6px;
    border: 2px solid rgb(71, 77, 87);
    z-index: 10;
    overflow: visible;
    cursor: pointer;
    margin: 0px 0px 0px 25%;
  } */
`;
