import { AntdButtonProps, Button } from "./styled";

interface Props {
  content?: string;
}

type BOButtonProps = AntdButtonProps & Props;

export const BOButton = (props: BOButtonProps) => {
  return (
    <Button size="large" {...props}>
      {props.content}
    </Button>
  );
};
