import { Button, Divider, Segmented, Tooltip } from "antd";

type ToolTipProps = {
  placement?:
    | "topLeft"
    | "top"
    | "topRight"
    | "leftTop"
    | "left"
    | "leftBottom"
    | "rightTop"
    | "rightTop"
    | "right"
    | "rightBottom"
    | "bottomLeft"
    | "bottom"
    | "bottomRight"
    | undefined;
  text?: string;
  children?: string | React.ReactNode | React.ReactElement;
};

const ToolTip = ({
  placement = "top",
  text = "ToolTip",
  children,
}: ToolTipProps) => {
  return (
    <Tooltip placement={placement} title={text}>
      {children ? children : "Tooltip"}
    </Tooltip>
  );
};

export default ToolTip;
