import { Slider, AntdSliderSingleProps } from "./styled";

export const BOSlider = (props: AntdSliderSingleProps) => {
  return <Slider {...props} style={{ marginBottom: "1em" }} step={1} />;
};
